import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { execFile } from "node:child_process"
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  stat,
  symlink,
  writeFile,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path"
import { promisify } from "node:util"
import test from "node:test"
import ts from "typescript"

import { extractTranslationUnitsFromText } from "./source-extractor.mjs"

const execFileAsync = promisify(execFile)
const SUPPORTED_LOCALES = ["ja", "en", "fr", "de"]

async function loadTransformer() {
  try {
    return await import("./source-transformer.mjs")
  } catch {
    return {}
  }
}

async function loadWorktreeCreator() {
  try {
    return await import("./create-locale-worktree.mjs")
  } catch {
    return {}
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function occurrencesFor(file, source) {
  return extractTranslationUnitsFromText({ file, source })
}

function messagesFor(occurrences, translations) {
  assert.equal(occurrences.length, translations.length)
  return Object.fromEntries(
    occurrences.map((occurrence, index) => [occurrence.id, translations[index]]),
  )
}

function transpileJsxPropValue(source, component, prop) {
  const output = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.None,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const React = {
    createElement(type, props) {
      return { type, props }
    },
  }
  return Function(
    "React",
    component,
    `${output}\nreturn View().props[${JSON.stringify(prop)}]`,
  )(React, function Component() {})
}

function injectedError(message) {
  return Object.assign(new Error(message), { code: "EIO" })
}

function assertContainedPath(root, target) {
  const nested = relative(resolve(root), resolve(target))
  assert.equal(nested.length > 0 && nested !== ".." && !nested.startsWith("../"), true)
  assert.equal(isAbsolute(nested), false)
}

function setTestEnvironment(t, values) {
  const previous = Object.fromEntries(
    Object.keys(values).map((name) => [name, process.env[name]]),
  )
  Object.assign(process.env, values)
  t.after(() => {
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  })
}

test("rewrites plain, JSON, JSX, and both template literal forms safely", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const tsxSource = [
    'const title = "普通字符串"',
    "const note = `无替换模板`",
    "export function Card({ name }) {",
    "  return <><h1>可见文本</h1><p>{`欢迎，${name}`}</p></>",
    "}",
  ].join("\n")
  const tsxOccurrences = occurrencesFor("app/card/page.tsx", tsxSource)
  const tsxOutput = applyTranslationsToText({
    source: tsxSource,
    occurrences: tsxOccurrences,
    messages: messagesFor(tsxOccurrences, [
      "Plain string",
      "Template without substitution",
      "Visible text",
      "Welcome, {p0}",
    ]),
    file: "app/card/page.tsx",
  })

  assert.match(tsxOutput, /const title = "Plain string"/)
  assert.match(tsxOutput, /const note = `Template without substitution`/)
  assert.match(tsxOutput, /<h1>Visible text<\/h1>/)
  assert.match(tsxOutput, /`Welcome, \$\{name\}`/)

  const jsonSource = '{"title":"中文标题","nested":{"body":"中文正文"}}'
  const jsonOccurrences = occurrencesFor("data/content.json", jsonSource)
  const jsonOutput = applyTranslationsToText({
    source: jsonSource,
    occurrences: jsonOccurrences,
    messages: messagesFor(jsonOccurrences, ["Localized title", "Localized body"]),
    file: "data/content.json",
  })
  assert.deepEqual(JSON.parse(jsonOutput), {
    title: "Localized title",
    nested: { body: "Localized body" },
  })
})

test("escapes quotes, slashes, newlines, backticks, literal interpolation, and JSX syntax", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = [
    'const label = "转义字符串"',
    "const code = `模板内容`",
    "export const View = () => <p>界面文本</p>",
  ].join("\n")
  const occurrences = occurrencesFor("components/escaping.tsx", source)
  const output = applyTranslationsToText({
    source,
    occurrences,
    messages: messagesFor(occurrences, [
      'quote " and slash \\ and\nnewline',
      "tick ` slash \\ literal ${danger}",
      "A & <B> {C}",
    ]),
    file: "components/escaping.tsx",
  })

  assert.match(output, /quote \\" and slash \\\\ and\\nnewline/)
  assert.match(output, /`tick \\` slash \\\\ literal \\\$\{danger\}`/)
  assert.match(output, /<p>A &amp; &lt;B&gt; &#123;C&#125;<\/p>/)
})

test("preserves JSX entity semantics in quoted attributes with raw syntax characters", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = 'const View = () => <Hero summary="中文摘要" />'
  const occurrences = occurrencesFor("components/hero.tsx", source)
  const output = applyTranslationsToText({
    source,
    occurrences,
    messages: messagesFor(occurrences, [
      'English &amp; tools "quoted" & raw <tag> {braces}',
    ]),
    file: "components/hero.tsx",
  })

  assert.match(
    output,
    /summary="English &amp; tools &quot;quoted&quot; &amp; raw &lt;tag&gt; &#123;braces&#125;"/,
  )
  assert.equal(
    transpileJsxPropValue(output, "Hero", "summary"),
    'English & tools "quoted" & raw <tag> {braces}',
  )
})

test("preserves existing JSX character entities without double encoding them", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = "export const View = () => <p>案例 &amp; 工具 &lt;提示&gt;</p>"
  const occurrences = occurrencesFor("components/entities.tsx", source)
  const output = applyTranslationsToText({
    source,
    occurrences,
    messages: messagesFor(occurrences, ["Cases &amp; tools &lt;tips&gt;"]),
    file: "components/entities.tsx",
  })

  assert.equal(output, "export const View = () => <p>Cases &amp; tools &lt;tips&gt;</p>")
  assert.doesNotMatch(output, /&amp;(?:amp|lt|gt);/)
})

test("preserves valid numeric JSX entities and escapes invalid Unicode scalars", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = 'const View = () => <Hero summary="数字实体" />'
  const occurrences = occurrencesFor("components/numeric-entities.tsx", source)
  const output = applyTranslationsToText({
    source,
    occurrences,
    messages: messagesFor(occurrences, [
      "valid &#65; &#x1F600; invalid &#0; &#1114112; &#x110000; &#55296; &#xD800;",
    ]),
    file: "components/numeric-entities.tsx",
  })

  assert.match(output, /valid &#65; &#x1F600;/)
  assert.match(
    output,
    /invalid &amp;#0; &amp;#1114112; &amp;#x110000; &amp;#55296; &amp;#xD800;/,
  )
  assert.equal(
    transpileJsxPropValue(output, "Hero", "summary"),
    "valid A 😀 invalid &#0; &#1114112; &#x110000; &#55296; &#xD800;",
  )
})

test("allows target languages to reorder template placeholders", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = "export const sentence = `你好${first}，再见${second}`"
  const occurrences = occurrencesFor("lib/reorder.ts", source)
  const output = applyTranslationsToText({
    source,
    occurrences,
    messages: messagesFor(occurrences, ["{p1} puis {p0}"]),
    file: "lib/reorder.ts",
  })

  assert.equal(output, "export const sentence = `${second} puis ${first}`")
})

test("recursively reconstructs the real send-email template expression children", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const projectRoot = resolve(import.meta.dirname, "../..")
  const file = "app/api/send-email/route.ts"
  const [source, storedOccurrences, releaseManifest] = await Promise.all([
    readFile(join(projectRoot, file), "utf8"),
    readFile(join(projectRoot, "i18n/catalog/occurrences.json"), "utf8").then(JSON.parse),
    readFile(join(projectRoot, "i18n/catalog/manifest.json"), "utf8").then(JSON.parse),
  ])
  const occurrences = storedOccurrences.filter((occurrence) => occurrence.file === file)
  const localePath = resolve(
    projectRoot,
    "i18n/catalog",
    releaseManifest.outputs.en.path,
  )
  const localeMessages = JSON.parse(await readFile(localePath, "utf8"))
  const messages = Object.fromEntries(
    [...new Set(occurrences.map((occurrence) => occurrence.id))].map((id) => [
      id,
      localeMessages[id],
    ]),
  )

  const output = applyTranslationsToText({ source, occurrences, messages, file })

  for (const child of occurrences.slice(1)) {
    assert.equal(output.includes(child.source), false)
    assert.equal(output.split(localeMessages[child.id]).length - 1, 1)
  }
  assert.match(output, /allowPublicDisplay\s*\?\s*/)
  assert.match(output, /allowPublicDisplay\s*\n\s*\?/)
  assert.match(output, /escapeHtml\(normalizedName\)/)
  assert.match(output, /escapeHtml\(normalizedMessage\)/)
})

test("rejects invalid overlaps and source offset mismatches", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = 'export const status = `状态：${allowed ? "是" : "否"}`'
  const occurrences = occurrencesFor("lib/status.ts", source)
  const messages = messagesFor(occurrences, ["Status: {p0}", "Yes", "No"])
  const invalidOverlap = occurrences.map((occurrence) => ({ ...occurrence }))
  invalidOverlap[1] = {
    ...invalidOverlap[1],
    start: invalidOverlap[0].start + 1,
    end: invalidOverlap[0].start + 4,
  }

  assert.throws(
    () =>
      applyTranslationsToText({
        source,
        occurrences: invalidOverlap,
        messages,
        file: "lib/status.ts",
      }),
    /overlap/i,
  )

  const mismatched = occurrences.map((occurrence) => ({ ...occurrence }))
  mismatched[2] = { ...mismatched[2], start: mismatched[2].start - 1 }
  assert.throws(
    () =>
      applyTranslationsToText({
        source,
        occurrences: mismatched,
        messages,
        file: "lib/status.ts",
      }),
    /offset|source region|occurrence/i,
  )
})

test("rejects missing, extra, empty, unsupported, and placeholder-invalid translations", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = "export const greeting = `你好${name}`"
  const occurrences = occurrencesFor("lib/greeting.ts", source)
  const id = occurrences[0].id
  const options = { source, occurrences, file: "lib/greeting.ts" }

  assert.throws(() => applyTranslationsToText({ ...options, messages: {} }), /missing/i)
  assert.throws(
    () => applyTranslationsToText({ ...options, messages: { [id]: "Hello {p0}", extra: "x" } }),
    /extra/i,
  )
  assert.throws(
    () => applyTranslationsToText({ ...options, messages: { [id]: "  " } }),
    /non-empty/i,
  )
  assert.throws(
    () => applyTranslationsToText({ ...options, messages: { [id]: "Hello" } }),
    /placeholder/i,
  )
  assert.throws(
    () =>
      applyTranslationsToText({
        ...options,
        occurrences: [{ ...occurrences[0], kind: "comment" }],
        messages: { [id]: "Hello {p0}" },
      }),
    /supported kind/i,
  )
})

test("rejects expression metadata mismatches and syntax-invalid source", async () => {
  const { applyTranslationsToText } = await loadTransformer()
  assert.equal(typeof applyTranslationsToText, "function")

  const source = "export const greeting = `你好${name}`"
  const occurrences = occurrencesFor("lib/greeting.ts", source)
  const messages = messagesFor(occurrences, ["Hello {p0}"])
  const invalidMetadata = [
    { ...occurrences[0], expressionRanges: [] },
  ]
  assert.throws(
    () =>
      applyTranslationsToText({
        source,
        occurrences: invalidMetadata,
        messages,
        file: "lib/greeting.ts",
      }),
    /expression.*range/i,
  )
  assert.throws(
    () =>
      applyTranslationsToText({
        source: `${source}\nconst =`,
        occurrences,
        messages,
        file: "lib/greeting.ts",
      }),
    /parse|syntax/i,
  )
})

async function writeFixtureFile(projectRoot, relativePath, contents) {
  const absolutePath = join(projectRoot, relativePath)
  await mkdir(dirname(absolutePath), { recursive: true })
  await writeFile(absolutePath, contents)
}

async function createFixtureRepository(t) {
  const projectRoot = await mkdtemp(join(tmpdir(), "egvc-locale-tree-"))
  t.after(() => rm(projectRoot, { recursive: true, force: true }))
  await execFileAsync("git", ["init", "-q"], { cwd: projectRoot })

  await writeFixtureFile(
    projectRoot,
    ".gitignore",
    [".env*", "!.env.example", ".cache/", ".next/", "out/", "build/", "node_modules/"].join("\n") + "\n",
  )
  await writeFixtureFile(projectRoot, ".env.example", "PUBLIC_EXAMPLE=placeholder\n")
  await writeFixtureFile(projectRoot, "README.md", "eligible tracked file\n")

  const sourceFile = "app/course-001/page.tsx"
  const source = "export default function Page() { return <h1>中文首页</h1> }\n"
  await writeFixtureFile(
    projectRoot,
    "app/page.tsx",
    "export default function Page() { return <p>Root academy page</p> }\n",
  )
  for (let index = 1; index <= 78; index += 1) {
    const file = `app/course-${String(index).padStart(3, "0")}/page.tsx`
    await writeFixtureFile(
      projectRoot,
      file,
      index === 1
        ? source
        : `export default function Page() { return <p>Course ${index}</p> }\n`,
    )
  }
  await writeFixtureFile(
    projectRoot,
    "app/ja/page.tsx",
    "export default function Page() { return <p>古い日本語ページ</p> }\n",
  )

  const occurrences = occurrencesFor(sourceFile, source)
  const sourceCatalog = {
    sourceLocale: "zh-CN",
    targetLocales: SUPPORTED_LOCALES,
    glossary: {},
    entries: Object.fromEntries(occurrences.map(({ id, source: value }) => [id, value])),
  }
  const sourceCatalogBytes = `${JSON.stringify(sourceCatalog, null, 2)}\n`
  const occurrenceBytes = `${JSON.stringify(occurrences, null, 2)}\n`
  await writeFixtureFile(projectRoot, "i18n/catalog/source.zh-CN.json", sourceCatalogBytes)
  await writeFixtureFile(projectRoot, "i18n/catalog/occurrences.json", occurrenceBytes)

  const outputs = {}
  const localeBytes = {}
  for (const locale of SUPPORTED_LOCALES) {
    const messages = { [occurrences[0].id]: `${locale.toUpperCase()} home` }
    const bytes = `${JSON.stringify(messages, null, 2)}\n`
    const relativePath = `messages/release/${locale}.json`
    localeBytes[locale] = bytes
    outputs[locale] = { path: relativePath, sha256: sha256(bytes), count: 1 }
    await writeFixtureFile(projectRoot, `i18n/catalog/${relativePath}`, bytes)
  }
  const manifest = {
    schemaVersion: 1,
    sourceLocale: "zh-CN",
    targetLocales: SUPPORTED_LOCALES,
    sourceCatalogSha256: sha256(sourceCatalogBytes),
    sourceEntryCount: 1,
    outputs,
  }
  await writeFixtureFile(
    projectRoot,
    "i18n/catalog/manifest.json",
    `${JSON.stringify(manifest, null, 2)}\n`,
  )

  await mkdir(join(projectRoot, "node_modules"), { recursive: true })
  await writeFile(join(projectRoot, "node_modules", "junction-sentinel.txt"), "real dependency")
  await execFileAsync("git", ["add", "--", "."], { cwd: projectRoot })

  await writeFixtureFile(projectRoot, "eligible-untracked.txt", "eligible untracked file\n")
  await writeFixtureFile(
    projectRoot,
    ".env.local",
    "TRANSLATION_API_BASE_URL=https://fixture.invalid\nTRANSLATION_API_KEY=fixture-secret\n",
  )
  await writeFixtureFile(projectRoot, ".cache/translations/batch.json", '{"secret":"fixture-secret"}\n')
  await writeFixtureFile(projectRoot, ".next/server/app.js", "compiled output")
  await writeFixtureFile(projectRoot, "out/index.html", "built output")

  return {
    projectRoot,
    sourceFile,
    source,
    occurrences,
    sourceCatalogBytes,
    manifest,
    localeBytes,
  }
}

test("creates an eligible-only 79-page staging tree, junction, and deterministic manifest", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  const canonicalHash = sha256(await readFile(join(fixture.projectRoot, fixture.sourceFile)))
  await writeFixtureFile(fixture.projectRoot, ".ENV.EXAMPLE", "PUBLIC_UPPERCASE=placeholder\n")
  await execFileAsync("git", ["add", "-f", "--", ".ENV.EXAMPLE"], {
    cwd: fixture.projectRoot,
  })

  const stagingRoot = await createLocaleBuildTree({
    projectRoot: fixture.projectRoot,
    locale: "en",
  })
  assert.equal(stagingRoot, join(fixture.projectRoot, ".cache/i18n-build/en"))
  assert.equal(await readFile(join(stagingRoot, "eligible-untracked.txt"), "utf8"), "eligible untracked file\n")
  await assert.rejects(stat(join(stagingRoot, ".env.example")))
  await assert.rejects(stat(join(stagingRoot, ".ENV.EXAMPLE")))
  await assert.rejects(stat(join(stagingRoot, ".env.local")))
  await assert.rejects(stat(join(stagingRoot, ".cache/translations/batch.json")))
  await assert.rejects(stat(join(stagingRoot, ".next/server/app.js")))
  await assert.rejects(stat(join(stagingRoot, "out/index.html")))
  await assert.rejects(stat(join(stagingRoot, "app/ja")))
  assert.match(await readFile(join(stagingRoot, fixture.sourceFile), "utf8"), /EN home/)

  const dependencyLink = join(stagingRoot, "node_modules")
  assert.equal((await lstat(dependencyLink)).isSymbolicLink(), true)
  assert.equal(await realpath(dependencyLink), await realpath(join(fixture.projectRoot, "node_modules")))

  const stagingManifestBytes = await readFile(
    join(stagingRoot, "i18n-build-manifest.json"),
    "utf8",
  )
  assert.deepEqual(JSON.parse(stagingManifestBytes), {
    locale: "en",
    sourceCatalogSha256: fixture.manifest.sourceCatalogSha256,
    localeCatalogSha256: fixture.manifest.outputs.en.sha256,
    transformedFileCount: 1,
    appliedOccurrenceCount: 1,
    pageCount: 79,
  })
  assert.doesNotMatch(stagingManifestBytes, /fixture-secret|egvc-locale-tree-|[A-Z]:\\/i)
  assert.equal(sha256(await readFile(join(fixture.projectRoot, fixture.sourceFile))), canonicalHash)

  const firstPage = await readFile(join(stagingRoot, fixture.sourceFile))
  const firstManifest = await readFile(join(stagingRoot, "i18n-build-manifest.json"))
  const recreatedRoot = await createLocaleBuildTree({
    projectRoot: fixture.projectRoot,
    locale: "en",
  })
  assert.equal(recreatedRoot, stagingRoot)
  assert.equal((await readFile(join(recreatedRoot, fixture.sourceFile))).equals(firstPage), true)
  assert.equal(
    (await readFile(join(recreatedRoot, "i18n-build-manifest.json"))).equals(firstManifest),
    true,
  )
  assert.equal(sha256(await readFile(join(fixture.projectRoot, fixture.sourceFile))), canonicalHash)
})

test("fails closed for invalid locales, cache roots, and manifest snapshots", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  const outsideRoot = await mkdtemp(join(tmpdir(), "egvc-outside-cache-"))
  t.after(() => rm(outsideRoot, { recursive: true, force: true }))
  const sentinel = join(outsideRoot, "sentinel.txt")
  await writeFile(sentinel, "do not delete")

  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "zh-CN" }),
    /supported locale/i,
  )
  await assert.rejects(
    createLocaleBuildTree({
      projectRoot: fixture.projectRoot,
      locale: "en",
      cacheRoot: outsideRoot,
    }),
    /cache root|i18n-build|contain/i,
  )
  assert.equal(await readFile(sentinel, "utf8"), "do not delete")

  const manifestPath = join(fixture.projectRoot, "i18n/catalog/manifest.json")
  const traversalManifest = structuredClone(fixture.manifest)
  traversalManifest.outputs.en.path = "../../outside.json"
  await writeFile(manifestPath, `${JSON.stringify(traversalManifest, null, 2)}\n`)
  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /snapshot|messages|contain/i,
  )

  const hashManifest = structuredClone(fixture.manifest)
  hashManifest.outputs.en.sha256 = "0".repeat(64)
  await writeFile(manifestPath, `${JSON.stringify(hashManifest, null, 2)}\n`)
  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /sha-?256|hash/i,
  )

  const countManifest = structuredClone(fixture.manifest)
  countManifest.outputs.en.count = 2
  await writeFile(manifestPath, `${JSON.stringify(countManifest, null, 2)}\n`)
  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /count/i,
  )

  const parityBytes = `${JSON.stringify({ extra: "Extra" }, null, 2)}\n`
  await writeFixtureFile(fixture.projectRoot, "i18n/catalog/messages/release/bad-en.json", parityBytes)
  const parityManifest = structuredClone(fixture.manifest)
  parityManifest.outputs.en = {
    path: "messages/release/bad-en.json",
    sha256: sha256(parityBytes),
    count: 1,
  }
  await writeFile(manifestPath, `${JSON.stringify(parityManifest, null, 2)}\n`)
  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /key parity/i,
  )
})

test("rejects a cache root that escapes through a parent directory junction", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  const outsideRoot = await mkdtemp(join(tmpdir(), "egvc-junction-cache-"))
  t.after(() => rm(outsideRoot, { recursive: true, force: true }))
  const sentinel = join(outsideRoot, "sentinel.txt")
  await writeFile(sentinel, "outside cache must remain untouched")
  await rm(join(fixture.projectRoot, ".cache"), { recursive: true, force: true })
  await symlink(
    outsideRoot,
    join(fixture.projectRoot, ".cache"),
    process.platform === "win32" ? "junction" : "dir",
  )

  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /cache root|cache ancestors|real path|junction|symbolic/i,
  )
  assert.equal(await readFile(sentinel, "utf8"), "outside cache must remain untouched")
  await assert.rejects(stat(join(outsideRoot, "i18n-build")))
})

test("rejects case-insensitive selected environment files", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  await writeFixtureFile(fixture.projectRoot, ".ENV", "TRANSLATION_API_KEY=selected-secret\n")
  await execFileAsync("git", ["add", "-f", "--", ".ENV"], { cwd: fixture.projectRoot })

  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /environment file/i,
  )
})

test("rejects every non-empty configured translation credential found in an eligible file", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  setTestEnvironment(t, {
    TRANSLATION_API_BASE_URL: "¤",
    TRANSLATION_API_KEY: "§",
  })
  await writeFixtureFile(
    fixture.projectRoot,
    "config-leak.txt",
    "base=¤\nkey=§\n",
  )

  await assert.rejects(
    createLocaleBuildTree({ projectRoot: fixture.projectRoot, locale: "en" }),
    /relay URL|API key|credential/i,
  )
  await assert.rejects(stat(join(fixture.projectRoot, ".cache/i18n-build/en")))
})

test("preserves the old locale tree when old-to-backup publication fails", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  const stagingRoot = await createLocaleBuildTree({
    projectRoot: fixture.projectRoot,
    locale: "en",
  })
  const marker = join(stagingRoot, "old-tree-marker.txt")
  await writeFile(marker, "old bytes")
  const outsideRoot = await mkdtemp(join(tmpdir(), "egvc-publish-outside-"))
  t.after(() => rm(outsideRoot, { recursive: true, force: true }))
  const outsideSentinel = join(outsideRoot, "sentinel.txt")
  await writeFile(outsideSentinel, "outside bytes")
  const cacheRoot = join(fixture.projectRoot, ".cache/i18n-build")
  const moves = []

  await assert.rejects(
    createLocaleBuildTree({
      projectRoot: fixture.projectRoot,
      locale: "en",
      publishRename: async (source, target) => {
        moves.push({ source, target })
        if (resolve(source) === resolve(stagingRoot) && basename(target).startsWith(".en-backup-")) {
          throw injectedError("injected old-to-backup failure")
        }
        await rename(source, target)
      },
    }),
    /injected old-to-backup failure/,
  )

  assert.equal(await readFile(marker, "utf8"), "old bytes")
  assert.equal(await readFile(outsideSentinel, "utf8"), "outside bytes")
  for (const move of moves) {
    assertContainedPath(cacheRoot, move.source)
    assertContainedPath(cacheRoot, move.target)
  }
  assert.deepEqual((await readdir(cacheRoot)).sort(), ["en"])
})

test("rolls the old locale tree back when temp-to-target publication fails", async (t) => {
  const { createLocaleBuildTree } = await loadWorktreeCreator()
  assert.equal(typeof createLocaleBuildTree, "function")
  const fixture = await createFixtureRepository(t)
  const stagingRoot = await createLocaleBuildTree({
    projectRoot: fixture.projectRoot,
    locale: "en",
  })
  const marker = join(stagingRoot, "old-tree-marker.txt")
  await writeFile(marker, "old bytes")
  const outsideRoot = await mkdtemp(join(tmpdir(), "egvc-rollback-outside-"))
  t.after(() => rm(outsideRoot, { recursive: true, force: true }))
  const outsideSentinel = join(outsideRoot, "sentinel.txt")
  await writeFile(outsideSentinel, "outside bytes")
  const cacheRoot = join(fixture.projectRoot, ".cache/i18n-build")
  const moves = []

  await assert.rejects(
    createLocaleBuildTree({
      projectRoot: fixture.projectRoot,
      locale: "en",
      publishRename: async (source, target) => {
        moves.push({ source, target })
        if (
          basename(source).startsWith(".en-build-") &&
          resolve(target) === resolve(stagingRoot)
        ) {
          throw injectedError("injected temp-to-target failure")
        }
        await rename(source, target)
      },
    }),
    /injected temp-to-target failure/,
  )

  assert.equal(await readFile(marker, "utf8"), "old bytes")
  assert.equal(await readFile(outsideSentinel, "utf8"), "outside bytes")
  for (const move of moves) {
    assertContainedPath(cacheRoot, move.source)
    assertContainedPath(cacheRoot, move.target)
  }
  assert.deepEqual((await readdir(cacheRoot)).sort(), ["en"])
})
