import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import test from "node:test"

async function loadExtractor() {
  try {
    return await import("./source-extractor.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
    return {}
  }
}

test("extracts Chinese JSX text, display strings, and template patterns", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const source = [
    '"use client"',
    '"顶层中文指令"',
    'import guide from "./中文模块"',
    '// 被忽略的中文注释',
    'export { guide } from "./中文导出"',
    'const labels = { "中文键": "展示文案", plain: "辅助说明" }',
    'type Topic = "中文类型"',
    'export function Welcome({ name }) {',
    '  "函数中文指令"',
    '  return (',
    '    <section aria-label="课程卡片">',
    '      <h1>欢迎学习</h1>',
    '      <p>{`欢迎，${name}`}</p>',
    '    </section>',
    '  )',
    '}',
  ].join("\n")

  const occurrences = extractTranslationUnitsFromText({
    file: "app/page.tsx",
    source,
  })
  const bySource = new Map(occurrences.map((occurrence) => [occurrence.source, occurrence]))

  assert.deepEqual([...bySource.keys()].sort(), [
    "展示文案",
    "辅助说明",
    "课程卡片",
    "欢迎学习",
    "欢迎，{p0}",
  ].sort())
  assert.equal(bySource.get("欢迎学习").kind, "jsx-text")
  assert.equal(bySource.get("展示文案").kind, "string")
  assert.equal(bySource.get("欢迎，{p0}").kind, "template")
  assert.deepEqual(bySource.get("欢迎，{p0}").expressions, ["name"])
  const templateStart = source.indexOf("`欢迎")
  const expressionStart = source.indexOf("name", templateStart)
  assert.deepEqual(bySource.get("欢迎，{p0}").expressionRanges, [
    { start: expressionStart, end: expressionStart + "name".length },
  ])

  for (const occurrence of occurrences) {
    assert.equal(occurrence.file, "app/page.tsx")
    assert.equal(Number.isInteger(occurrence.start), true)
    assert.equal(Number.isInteger(occurrence.end), true)
    assert.equal(occurrence.end > occurrence.start, true)
    assert.equal(source.slice(occurrence.start, occurrence.end).length > 0, true)
    if (occurrence.kind !== "template") {
      assert.deepEqual(occurrence.expressions, [])
      assert.deepEqual(occurrence.expressionRanges, [])
    }
  }
  assert.equal(
    source.slice(bySource.get("展示文案").start, bySource.get("展示文案").end),
    '"展示文案"',
  )
  assert.equal(
    source.slice(bySource.get("欢迎，{p0}").start, bySource.get("欢迎，{p0}").end),
    '`欢迎，${name}`',
  )

  const excludedSource = occurrences.map((occurrence) => occurrence.source).join("\n")
  assert.doesNotMatch(
    excludedSource,
    /use client|顶层中文指令|函数中文指令|中文模块|中文导出|中文键|中文类型|中文注释/,
  )
})

test("extracts JSON string values recursively but never JSON keys", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const source = '{"中文键":"主标题","nested":{"说明":"嵌套说明"},"list":["列表项"]}'
  const occurrences = extractTranslationUnitsFromText({
    file: "data/content.json",
    source,
  })

  assert.deepEqual(
    occurrences.map((occurrence) => occurrence.source),
    ["主标题", "嵌套说明", "列表项"],
  )
  assert.equal(occurrences.every((occurrence) => occurrence.kind === "json-string"), true)
  assert.equal(occurrences.every((occurrence) => occurrence.expressions.length === 0), true)
  for (const occurrence of occurrences) assert.deepEqual(occurrence.expressionRanges, [])
  assert.equal(
    occurrences.every(
      (occurrence) => source.slice(occurrence.start, occurrence.end) === `"${occurrence.source}"`,
    ),
    true,
  )
})

test("assigns one content-addressed ID to repeated identical messages", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const occurrences = extractTranslationUnitsFromText({
    file: "components/repeated.tsx",
    source: "export const Repeated = () => <><p>重复消息</p><p>重复消息</p></>",
  })

  assert.equal(occurrences.length, 2)
  assert.equal(occurrences[0].id, occurrences[1].id)
  assert.match(occurrences[0].id, /^[a-f0-9]{64}$/)
  for (const occurrence of occurrences) assert.deepEqual(occurrence.expressionRanges, [])
})

test("extracts Han literals nested inside a Han-bearing template expression", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const expression = 'allowed ? "是" : "否"'
  const source = `export const message = \`状态：\${${expression}}\``
  const occurrences = extractTranslationUnitsFromText({
    file: "app/api/example/route.ts",
    source,
  })

  assert.deepEqual(
    occurrences.map((occurrence) => occurrence.source),
    ["状态：{p0}", "是", "否"],
  )
  const parent = occurrences[0]
  const expressionStart = source.indexOf(expression)
  assert.deepEqual(parent.expressions, [expression])
  assert.deepEqual(parent.expressionRanges, [
    { start: expressionStart, end: expressionStart + expression.length },
  ])
  assert.equal(
    occurrences.slice(1).every(
      (occurrence) =>
        occurrence.start >= parent.expressionRanges[0].start &&
        occurrence.end <= parent.expressionRanges[0].end,
    ),
    true,
  )
})

test("preserves meaningful template layout while normalizing line endings", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const occurrences = extractTranslationUnitsFromText({
    file: "app/snippet.tsx",
    source: "export const snippet = `第一行\r\n  第二行`",
  })

  assert.equal(occurrences.length, 1)
  assert.equal(occurrences[0].source, "第一行\n  第二行")
})

test("writes byte-identical, sorted full extraction outputs", async (t) => {
  const { writeExtractionOutputs } = await loadExtractor()
  assert.equal(typeof writeExtractionOutputs, "function")

  const projectRoot = await mkdtemp(join(tmpdir(), "egvc-source-extractor-"))
  t.after(() => rm(projectRoot, { recursive: true, force: true }))
  await Promise.all(
    ["app", "app/ja", "components", "components/ja", "lib", "lib/ja", "data"].map(
      (directory) => mkdir(join(projectRoot, directory), { recursive: true }),
    ),
  )
  await Promise.all([
    writeFile(
      join(projectRoot, "app", "page.tsx"),
      "export default function Page() { return <><h1>共同消息</h1><p>首页说明</p></> }",
      "utf8",
    ),
    writeFile(
      join(projectRoot, "components", "card.tsx"),
      'export const cardLabel = "组件说明"',
      "utf8",
    ),
    writeFile(
      join(projectRoot, "data", "content.json"),
      '{"中文键":"共同消息","nested":"数据说明"}',
      "utf8",
    ),
    writeFile(join(projectRoot, "app", "ja", "page.tsx"), "export default () => <p>销售页面</p>", "utf8"),
    writeFile(join(projectRoot, "components", "ja", "card.tsx"), "export const label = '销售卡片'", "utf8"),
    writeFile(join(projectRoot, "lib", "ja", "course.ts"), "export const title = '日本市場の販売文'", "utf8"),
    writeFile(join(projectRoot, "components", "card.test.tsx"), "export const label = '测试文案'", "utf8"),
    writeFile(join(projectRoot, "components", "fixture.generated.tsx"), "export const label = '生成文案'", "utf8"),
  ])

  const outputDir = join(projectRoot, "i18n", "catalog")
  const options = {
    projectRoot,
    roots: ["app", "components", "lib", "data"],
    outputDir,
  }
  const firstSummary = await writeExtractionOutputs(options)
  const firstCatalogBytes = await readFile(join(outputDir, "source.zh-CN.json"))
  const firstOccurrenceBytes = await readFile(join(outputDir, "occurrences.json"))
  const secondSummary = await writeExtractionOutputs(options)
  const secondCatalogBytes = await readFile(join(outputDir, "source.zh-CN.json"))
  const secondOccurrenceBytes = await readFile(join(outputDir, "occurrences.json"))

  assert.deepEqual(firstSummary, {
    files: 3,
    uniqueMessages: 4,
    occurrences: 5,
    hanCharacters: 16,
  })
  assert.deepEqual(secondSummary, firstSummary)
  assert.equal(firstCatalogBytes.equals(secondCatalogBytes), true)
  assert.equal(firstOccurrenceBytes.equals(secondOccurrenceBytes), true)

  const catalog = JSON.parse(firstCatalogBytes.toString("utf8"))
  const storedOccurrences = JSON.parse(firstOccurrenceBytes.toString("utf8"))
  assert.equal(catalog.sourceLocale, "zh-CN")
  assert.deepEqual(catalog.targetLocales, ["ja", "en", "fr", "de"])
  assert.deepEqual(catalog.glossary, {})
  assert.deepEqual(Object.keys(catalog.entries), Object.keys(catalog.entries).sort())
  assert.equal(Object.values(catalog.entries).filter((message) => message === "共同消息").length, 1)
  assert.deepEqual(
    storedOccurrences.map((occurrence) => occurrence.file),
    [
      "app/page.tsx",
      "app/page.tsx",
      "components/card.tsx",
      "data/content.json",
      "data/content.json",
    ],
  )
  assert.doesNotMatch(
    JSON.stringify(storedOccurrences),
    /销售页面|销售卡片|日本市場の販売文|测试文案|生成文案/,
  )
})

test("keeps stored occurrences aligned with LF-normalized source files", async () => {
  const { extractTranslationUnitsFromText } = await loadExtractor()
  assert.equal(typeof extractTranslationUnitsFromText, "function")

  const projectRoot = resolve(import.meta.dirname, "../..")
  const storedOccurrences = JSON.parse(
    await readFile(join(projectRoot, "i18n/catalog/occurrences.json"), "utf8"),
  )
  const occurrenceFiles = [...new Set(storedOccurrences.map(({ file }) => file))].sort()

  for (const file of occurrenceFiles) {
    const source = (await readFile(join(projectRoot, file), "utf8")).replace(/\r\n?/gu, "\n")
    const extractedOccurrences = extractTranslationUnitsFromText({ file, source })
    const expectedOccurrences = storedOccurrences.filter((occurrence) => occurrence.file === file)
    assert.deepEqual(expectedOccurrences, extractedOccurrences, `${file} occurrence catalog is stale`)
  }
})

test("fails a full extraction when no translation entries are found", async (t) => {
  const { extractTranslationUnits } = await loadExtractor()
  assert.equal(typeof extractTranslationUnits, "function")

  const projectRoot = await mkdtemp(join(tmpdir(), "egvc-empty-extractor-"))
  t.after(() => rm(projectRoot, { recursive: true, force: true }))
  await mkdir(join(projectRoot, "app"), { recursive: true })
  await writeFile(
    join(projectRoot, "app", "page.tsx"),
    "export default function Page() { return <p>Hello</p> }",
    "utf8",
  )

  await assert.rejects(
    extractTranslationUnits({ projectRoot, roots: ["app"] }),
    /no translatable Chinese messages/i,
  )
})

test("fails a full extraction when a scanned source contains CRLF", async (t) => {
  const { extractTranslationUnits } = await loadExtractor()
  assert.equal(typeof extractTranslationUnits, "function")

  const projectRoot = await mkdtemp(join(tmpdir(), "egvc-crlf-extractor-"))
  t.after(() => rm(projectRoot, { recursive: true, force: true }))
  await mkdir(join(projectRoot, "app"), { recursive: true })
  await writeFile(
    join(projectRoot, "app", "page.tsx"),
    "export default function Page() {\r\n  return <p>换行文案</p>\r\n}\r\n",
    "utf8",
  )

  await assert.rejects(
    extractTranslationUnits({ projectRoot, roots: ["app"] }),
    /app\/page\.tsx.*LF-only/i,
  )
})
