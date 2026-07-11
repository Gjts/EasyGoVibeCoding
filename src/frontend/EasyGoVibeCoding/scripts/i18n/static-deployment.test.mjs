import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rename, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import {
  BUILD_MATRIX,
  buildBusinessRouteMatrix,
  deriveAcademyRoutes,
  mergeStaticOutputs,
  validateBuildPair,
} from "./static-deployment.mjs"
import { collectForbiddenMarkers, createBuildPlan, executeBuildPlan } from "./build-static-deployment.mjs"

async function file(root, path, contents = path) {
  const target = join(root, ...path.split("/"))
  await mkdir(join(target, ".."), { recursive: true })
  await writeFile(target, contents)
}

test("build matrix has exact locale and base-path pairs and rejects invalid pairs", () => {
  assert.deepEqual(BUILD_MATRIX, [
    { locale: "zh-CN", basePath: "" },
    { locale: "ja", basePath: "/ja/academy" },
    { locale: "en", basePath: "/en/academy" },
    { locale: "fr", basePath: "/fr/academy" },
    { locale: "de", basePath: "/de/academy" },
  ])
  assert.doesNotThrow(() => validateBuildPair("fr", "/fr/academy"))
  assert.throws(() => validateBuildPair("fr", "/en/academy"), /Invalid/)
})

test("build orchestrator emits five explicit cwd/env pairs without shell strings", async () => {
  const plan = createBuildPlan("C:/project")
  assert.equal(plan.length, 5)
  assert.deepEqual(plan.map(({ locale, basePath }) => [locale, basePath]), BUILD_MATRIX.map(({ locale, basePath }) => [locale, basePath]))
  const calls = []
  await executeBuildPlan(plan, async (call) => { calls.push(call); return 0 })
  assert.equal(calls.length, 5)
  assert.ok(calls.every(({ args }) => Array.isArray(args) && args.slice(-2).join(" ") === "run build"))
  assert.ok(calls.every(({ shell }) => shell === false))
  assert.ok(calls.every(({ env }) => ["TRANSLATION_API_BASE_URL", "TRANSLATION_API_KEY", "OPENAI_API_KEY", "RESEND_API_KEY"].every((name) => env[name] === "")))
  await assert.rejects(executeBuildPlan([{ ...plan[1], basePath: "/wrong" }], async () => 0), /Invalid/)
})

test("reads configured secret markers without exposing dotenv values to child builds", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-secrets-"))
  await file(root, ".env.local", "TRANSLATION_API_KEY=dotenv-only-marker\n")
  const markers = await collectForbiddenMarkers(root, {
    OPENAI_API_KEY: "environment-only-marker",
  })
  assert.deepEqual(markers.map(({ name }) => name).sort(), ["OPENAI_API_KEY", "TRANSLATION_API_KEY"])
  const calls = []
  await executeBuildPlan(createBuildPlan(root), async (call) => { calls.push(call); return 0 }, {
    parentEnv: { TRANSLATION_API_KEY: "environment-would-override", OPENAI_API_KEY: "environment-only-marker" },
  })
  assert.ok(calls.every(({ env }) => env.TRANSLATION_API_KEY === "" && env.OPENAI_API_KEY === ""))
})

test("derives exactly 79 canonical routes and a 316-pair localized matrix", async () => {
  const root = await mkdtemp(join(tmpdir(), "academy-routes-"))
  await file(root, "app/page.tsx")
  for (let index = 1; index < 79; index += 1) await file(root, `app/r${index}/page.tsx`)
  await file(root, "app/ja/page.tsx")
  const routes = await deriveAcademyRoutes(root)
  assert.equal(routes.length, 79)
  const matrix = buildBusinessRouteMatrix(routes)
  assert.equal(matrix.localized.length, 316)
  assert.equal(matrix.academy.length, 395)
  assert.equal(matrix.salesLegal.length, 5)
  assert.equal(matrix.total, 400)
})

test("merge mounts localized roots, deep pages and nested _next assets", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-merge-"))
  const output = join(root, "deploy")
  const builds = {}
  for (const { locale } of BUILD_MATRIX) {
    builds[locale] = join(root, locale)
    await file(builds[locale], "index.html", locale)
    await file(builds[locale], "deep/page.html", locale)
    await file(builds[locale], "_next/static/chunks/app.js", locale)
  }
  await file(builds["zh-CN"], "functions/api.js", "root")
  await file(builds.en, "Functions/api.js", "localized")
  await file(builds.en, "robots.txt", "localized")
  const result = await mergeStaticOutputs({ builds, output, academyRoutes: ["/", "/deep/page"] })
  assert.equal(await readFile(join(output, "en/academy/index.html"), "utf8"), "en")
  assert.equal(await readFile(join(output, "en/academy/deep/page.html"), "utf8"), "en")
  assert.equal(await readFile(join(output, "en/academy/_next/static/chunks/app.js"), "utf8"), "en")
  assert.equal(await readFile(join(output, "functions/api.js"), "utf8"), "root")
  assert.ok(result.manifest.builds.find(({ locale }) => locale === "en").excludedGlobalFiles.includes("Functions/api.js"))
})

test("rejects configured secret marker bytes without echoing their values", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-secret-leak-"))
  const output = join(root, "deploy")
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const path of Object.values(builds)) await file(path, "index.html", "ok")
  const markerValue = "test-only-secret-marker"
  await file(builds.en, "leak.txt", `prefix:${markerValue}:suffix`)
  let caught
  try {
    await mergeStaticOutputs({ builds, output, academyRoutes: ["/"], forbiddenMarkers: [{ name: "TRANSLATION_API_KEY", value: markerValue }] })
  } catch (error) {
    caught = error
  }
  assert.match(caught?.message ?? "", /TRANSLATION_API_KEY.*en:leak\.txt/)
  assert.doesNotMatch(caught?.message ?? "", new RegExp(markerValue))
})

test("uses case-equivalent destination keys for collisions and honest deduplications", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-casefold-"))
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const path of Object.values(builds)) {
    await file(path, "index.html", "route")
    await file(path, "asset.txt", "same")
  }
  const mapDestination = ({ locale, relativePath, destination }) => relativePath !== "asset.txt"
    ? destination
    : locale === "zh-CN" ? "Foo.txt" : locale === "ja" ? "foo.txt" : destination
  const result = await mergeStaticOutputs({ builds, output: join(root, "same"), academyRoutes: ["/"], mapDestination })
  const jaDedup = result.manifest.builds.find(({ locale }) => locale === "ja").deduplications
  assert.equal(jaDedup.length, 1)
  assert.deepEqual({ ...jaDedup[0], sha256: undefined }, { destination: "Foo.txt", incomingDestination: "foo.txt", source: "ja:asset.txt", sha256: undefined })
  assert.match(jaDedup[0].sha256, /^[a-f0-9]{64}$/u)
  await file(builds.ja, "asset.txt", "different")
  await assert.rejects(mergeStaticOutputs({ builds, output: join(root, "different"), academyRoutes: ["/"], mapDestination }), /collision.*Foo\.txt.*foo\.txt/i)
})

test("records stable project-relative source output provenance", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-provenance-"))
  const labels = {
    "zh-CN": "out",
    ja: ".cache/i18n-build/ja/out",
    en: ".cache/i18n-build/en/out",
    fr: ".cache/i18n-build/fr/out",
    de: ".cache/i18n-build/de/out",
  }
  const builds = Object.fromEntries(Object.entries(labels).map(([locale, label]) => [locale, join(root, ...label.split("/"))]))
  for (const path of Object.values(builds)) await file(path, "index.html", "route")
  const result = await mergeStaticOutputs({ projectRoot: root, sourceLabels: labels, builds, output: join(root, ".cache/deploy"), academyRoutes: ["/"] })
  assert.deepEqual(Object.fromEntries(result.manifest.builds.map(({ locale, sourceOutput }) => [locale, sourceOutput])), labels)
  await assert.rejects(mergeStaticOutputs({ projectRoot: root, sourceLabels: { ...labels, en: "../outside" }, builds, output: join(root, ".cache/bad"), academyRoutes: ["/"] }), /source label/i)
})

test("accepts identical duplicates but rejects non-identical collisions", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-collision-"))
  const output = join(root, "deploy")
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const path of Object.values(builds)) await file(path, "index.html", "same")
  await mergeStaticOutputs({ builds, output, academyRoutes: ["/"] })
  await file(builds.en, "index.html", "different")
  await assert.rejects(
    mergeStaticOutputs({ builds, output, academyRoutes: ["/"], mapDestination: () => "same.html" }),
    /collision/i,
  )
})

test("failed publication preserves the previous deployment", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-atomic-"))
  const output = join(root, "deploy")
  await file(output, "sentinel.txt", "good")
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const path of Object.values(builds)) await file(path, "index.html", "new")
  let renameCount = 0
  await assert.rejects(
    mergeStaticOutputs({ builds, output, academyRoutes: ["/"], publishRename: async (source, target) => {
      renameCount += 1
      if (renameCount === 2) throw new Error("interrupt")
      await rename(source, target)
    } }),
    /interrupt/,
  )
  assert.equal(renameCount, 3)
  assert.equal(await readFile(join(output, "sentinel.txt"), "utf8"), "good")
})

test("rejects symlink or junction escapes", async (context) => {
  const root = await mkdtemp(join(tmpdir(), "static-link-"))
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const path of Object.values(builds)) await file(path, "index.html", "ok")
  const outside = await mkdtemp(join(tmpdir(), "outside-"))
  try {
    await symlink(outside, join(builds.en, "escape"), process.platform === "win32" ? "junction" : "dir")
  } catch (error) {
    context.skip(`symlink unavailable: ${error.code}`)
    return
  }
  await assert.rejects(mergeStaticOutputs({ builds, output: join(root, "deploy"), academyRoutes: ["/"] }), /symbolic|link|real path/i)
})

test("manifest bytes and hashes are deterministic", async () => {
  const root = await mkdtemp(join(tmpdir(), "static-deterministic-"))
  const builds = Object.fromEntries(BUILD_MATRIX.map(({ locale }) => [locale, join(root, locale)]))
  for (const [locale, path] of Object.entries(builds)) await file(path, "index.html", locale)
  const one = await mergeStaticOutputs({ builds, output: join(root, "one"), academyRoutes: ["/"] })
  const two = await mergeStaticOutputs({ builds, output: join(root, "two"), academyRoutes: ["/"] })
  assert.equal(one.manifestSha256, two.manifestSha256)
  assert.deepEqual(one.manifest, two.manifest)
})
