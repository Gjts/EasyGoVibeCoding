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
import { createBuildPlan, executeBuildPlan } from "./build-static-deployment.mjs"

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
  await assert.rejects(executeBuildPlan([{ ...plan[1], basePath: "/wrong" }], async () => 0), /Invalid/)
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
  await file(builds.en, "functions/api.js", "localized")
  await file(builds.en, "robots.txt", "localized")
  const result = await mergeStaticOutputs({ builds, output, academyRoutes: ["/", "/deep/page"] })
  assert.equal(await readFile(join(output, "en/academy/index.html"), "utf8"), "en")
  assert.equal(await readFile(join(output, "en/academy/deep/page.html"), "utf8"), "en")
  assert.equal(await readFile(join(output, "en/academy/_next/static/chunks/app.js"), "utf8"), "en")
  assert.equal(await readFile(join(output, "functions/api.js"), "utf8"), "root")
  assert.ok(result.manifest.builds.find(({ locale }) => locale === "en").excludedGlobalFiles.includes("functions/api.js"))
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
