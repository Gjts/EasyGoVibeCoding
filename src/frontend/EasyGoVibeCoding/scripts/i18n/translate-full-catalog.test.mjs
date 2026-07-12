import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, isAbsolute, join, resolve } from "node:path"
import test from "node:test"

import { createTranslationCacheKey } from "./translation-client.mjs"

const TARGET_LOCALES = ["ja", "en", "fr", "de"]
const SETTINGS = {
  baseUrl: "https://relay.example.invalid/v1",
  apiKey: "sk-task-3-test-secret",
  model: "gpt-5.4-mini",
}

async function loadRunner() {
  try {
    return await import("./translate-full-catalog.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
    return {}
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function translatedBatch(entries, targetLocales = TARGET_LOCALES) {
  return Object.fromEntries(
    Object.entries(entries).map(([id, source]) => [
      id,
      Object.fromEntries(targetLocales.map((locale) => [locale, `${locale}:${source}`])),
    ]),
  )
}

async function createFixture(t, entries, targetLocales = TARGET_LOCALES) {
  const root = await mkdtemp(join(tmpdir(), "egvc-full-i18n-"))
  t.after(() => rm(root, { recursive: true, force: true }))

  const inputPath = join(root, "source.zh-CN.json")
  const outputDir = join(root, "catalog", "messages")
  const manifestPath = join(root, "catalog", "manifest.json")
  const cacheDir = join(root, "cache")
  const source = {
    sourceLocale: "zh-CN",
    targetLocales,
    glossary: { EasyGoVibeCoding: "EasyGoVibeCoding" },
    entries,
  }
  const sourceRaw = `${JSON.stringify(source, null, 2)}\n`
  await writeFile(inputPath, sourceRaw, "utf8")

  return {
    root,
    inputPath,
    outputDir,
    manifestPath,
    cacheDir,
    source,
    sourceRaw,
  }
}

function runnerOptions(fixture, overrides = {}) {
  return {
    inputPath: fixture.inputPath,
    outputDir: fixture.outputDir,
    manifestPath: fixture.manifestPath,
    cacheDir: fixture.cacheDir,
    settings: SETTINGS,
    logger: () => {},
    ...overrides,
  }
}

async function pathExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function readPublishedRelease(fixture) {
  const manifestRaw = await readFile(fixture.manifestPath)
  const manifest = JSON.parse(manifestRaw)
  const localePaths = TARGET_LOCALES.map((locale) => {
    const relativePath = manifest.outputs[locale].path
    assert.equal(typeof relativePath, "string")
    assert.equal(isAbsolute(relativePath), false)
    assert.equal(relativePath.includes("\\"), false)
    assert.equal(relativePath.split("/").includes(".."), false)
    assert.match(relativePath, new RegExp(`^messages/[a-f0-9]{64}/${locale}\\.json$`))
    return resolve(dirname(fixture.manifestPath), relativePath)
  })

  return {
    manifest,
    manifestRaw,
    localePaths,
    releasePaths: [...localePaths, fixture.manifestPath],
  }
}

async function readPublishedLocale(fixture, locale) {
  const release = await readPublishedRelease(fixture)
  const index = TARGET_LOCALES.indexOf(locale)
  return JSON.parse(await readFile(release.localePaths[index], "utf8"))
}

function publicationFixture(label) {
  const localeFiles = Object.fromEntries(
    TARGET_LOCALES.map((locale) => [
      locale,
      `${JSON.stringify({ message: `${locale}-${label}` }, null, 2)}\n`,
    ]),
  )
  return {
    localeFiles,
    manifest: {
      schemaVersion: 1,
      marker: label,
      targetLocales: TARGET_LOCALES,
      outputs: Object.fromEntries(
        TARGET_LOCALES.map((locale) => [
          locale,
          { sha256: sha256(localeFiles[locale]), count: 1 },
        ]),
      ),
    },
  }
}

async function assertPublishedManifest(manifestPath, expectedMarker) {
  const raw = await readFile(manifestPath, "utf8")
  const manifest = JSON.parse(raw)
  assert.equal(manifest.marker, expectedMarker)
  for (const locale of TARGET_LOCALES) {
    const output = manifest.outputs[locale]
    assert.match(output.path, new RegExp(`^messages/[a-f0-9]{64}/${locale}\\.json$`))
    assert.equal(isAbsolute(output.path), false)
    assert.equal(output.path.includes("\\"), false)
    assert.equal(output.path.split("/").includes(".."), false)
    const content = await readFile(resolve(dirname(manifestPath), output.path))
    assert.equal(sha256(content), output.sha256)
    assert.equal(Object.keys(JSON.parse(content)).length, output.count)
    assert.equal(JSON.parse(content).message, `${locale}-${expectedMarker}`)
  }
  return manifest
}

test("reuses and verifies an immutable same-content snapshot before manifest publication", async (t) => {
  const { publishReleaseSnapshot } = await loadRunner()
  assert.equal(typeof publishReleaseSnapshot, "function")

  const root = await mkdtemp(join(tmpdir(), "egvc-publication-reuse-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const outputDir = join(root, "catalog", "messages")
  const manifestPath = join(root, "catalog", "manifest.json")
  const publication = publicationFixture("same")

  const first = await publishReleaseSnapshot({ outputDir, manifestPath, ...publication })
  const firstManifestRaw = await readFile(manifestPath)
  assert.match(first.releaseId, /^[a-f0-9]{64}$/)
  assert.deepEqual(await readdir(outputDir), [first.releaseId])
  await assertPublishedManifest(manifestPath, "same")

  const second = await publishReleaseSnapshot({ outputDir, manifestPath, ...publication })
  assert.equal(second.releaseId, first.releaseId)
  assert.deepEqual(await readFile(manifestPath), firstManifestRaw)
  assert.deepEqual(await readdir(outputDir), [first.releaseId])

  await writeFile(join(outputDir, first.releaseId, "en.json"), "corrupted\n", "utf8")
  await assert.rejects(
    publishReleaseSnapshot({ outputDir, manifestPath, ...publication }),
    /immutable snapshot.*en.*does not match/i,
  )
  assert.deepEqual(await readFile(manifestPath), firstManifestRaw)
})

test("keeps the manifest entirely old or entirely new across publication faults", async (t) => {
  const { publishReleaseSnapshot } = await loadRunner()
  assert.equal(typeof publishReleaseSnapshot, "function")
  const boundaries = [
    "after-snapshot-files-flushed",
    "after-snapshot-commit",
    "before-manifest-commit",
    "after-manifest-commit",
  ]
  const runnerUrl = new URL("./translate-full-catalog.mjs", import.meta.url).href
  const childScript = `
    import { readFile } from "node:fs/promises"
    const payload = JSON.parse(await readFile(process.argv[1], "utf8"))
    const { publishReleaseSnapshot } = await import(payload.runnerUrl)
    await publishReleaseSnapshot({
      outputDir: payload.outputDir,
      manifestPath: payload.manifestPath,
      localeFiles: payload.localeFiles,
      manifest: payload.manifest,
      faultInjector(boundary) {
        if (boundary === payload.boundary) process.exit(86)
      },
    })
  `

  for (const boundary of boundaries) {
    await t.test(boundary, async (t) => {
      const root = await mkdtemp(join(tmpdir(), "egvc-publication-fault-"))
      t.after(() => rm(root, { recursive: true, force: true }))
      const outputDir = join(root, "catalog", "messages")
      const manifestPath = join(root, "catalog", "manifest.json")

      const oldPublication = publicationFixture("old")
      const oldResult = await publishReleaseSnapshot({
        outputDir,
        manifestPath,
        ...oldPublication,
      })
      const oldManifest = await assertPublishedManifest(manifestPath, "old")
      const payloadPath = join(root, "fault-payload.json")
      await writeFile(
        payloadPath,
        JSON.stringify({
          runnerUrl,
          outputDir,
          manifestPath,
          ...publicationFixture("new"),
          boundary,
        }),
        "utf8",
      )

      const child = spawnSync(
        process.execPath,
        ["--input-type=module", "-e", childScript, payloadPath],
        { encoding: "utf8" },
      )
      assert.equal(child.status, 86, child.stderr)
      const expectedMarker = boundary === "after-manifest-commit" ? "new" : "old"
      await assertPublishedManifest(manifestPath, expectedMarker)

      assert.equal(await pathExists(join(outputDir, oldResult.releaseId)), true)
      for (const locale of TARGET_LOCALES) {
        const oldOutput = oldManifest.outputs[locale]
        const oldContent = await readFile(resolve(dirname(manifestPath), oldOutput.path))
        assert.equal(sha256(oldContent), oldOutput.sha256)
      }
    })
  }
})

test("chunks deterministically at exact entry and Unicode character boundaries", async () => {
  const { chunkEntries } = await loadRunner()
  assert.equal(typeof chunkEntries, "function")

  const reverseInserted = Object.fromEntries(
    Array.from({ length: 41 }, (_, index) => {
      const id = `entry-${String(40 - index).padStart(2, "0")}`
      return [id, "字"]
    }),
  )
  const entryLimited = chunkEntries(reverseInserted, {
    maxEntries: 40,
    maxCharacters: 6_000,
  })
  const defaultLimited = chunkEntries(reverseInserted)

  assert.deepEqual(entryLimited.map((batch) => Object.keys(batch).length), [40, 1])
  assert.deepEqual(defaultLimited.map((batch) => Object.keys(batch).length), [20, 20, 1])
  assert.deepEqual(Object.keys(entryLimited[0]), Object.keys(reverseInserted).sort().slice(0, 40))

  const characterLimited = chunkEntries(
    {
      c: "x",
      b: "中".repeat(3_000),
      a: "😀".repeat(3_000),
    },
    { maxEntries: 40, maxCharacters: 6_000 },
  )

  assert.deepEqual(characterLimited.map((batch) => Object.keys(batch)), [["a", "b"], ["c"]])
})

test("rejects invalid batch limits and an oversized single entry", async () => {
  const { chunkEntries } = await loadRunner()
  assert.equal(typeof chunkEntries, "function")

  assert.doesNotThrow(() =>
    chunkEntries({ title: "字".repeat(6_000) }, { maxEntries: 40, maxCharacters: 6_000 }),
  )

  for (const maxEntries of [0, -1, 1.5, Number.NaN]) {
    assert.throws(
      () => chunkEntries({ title: "标题" }, { maxEntries, maxCharacters: 6_000 }),
      /maxEntries.*positive integer/i,
    )
  }
  for (const maxCharacters of [0, -1, 1.5, Number.NaN]) {
    assert.throws(
      () => chunkEntries({ title: "标题" }, { maxEntries: 40, maxCharacters }),
      /maxCharacters.*positive integer/i,
    )
  }
  assert.throws(
    () => chunkEntries({ title: "标题" }, { maxEntries: 41, maxCharacters: 6_000 }),
    /maxEntries.*at most 40/i,
  )
  assert.throws(
    () => chunkEntries({ title: "标题" }, { maxEntries: 40, maxCharacters: 6_001 }),
    /maxCharacters.*at most 6000/i,
  )

  assert.throws(
    () =>
      chunkEntries(
        { oversized: "字".repeat(6_001) },
        { maxEntries: 40, maxCharacters: 6_000 },
      ),
    /oversized.*6001.*6000/i,
  )
})

test("runner rejects limits above hard caps before cache or relay access", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const fixture = await createFixture(t, { title: "标题" })
  let requests = 0

  await assert.rejects(
    translateFullCatalog(
      runnerOptions(fixture, {
        maxEntries: 41,
        translateImpl: async () => {
          requests += 1
          return {}
        },
      }),
    ),
    /maxEntries.*at most 40/i,
  )
  await assert.rejects(
    translateFullCatalog(
      runnerOptions(fixture, {
        maxCharacters: 6_001,
        translateImpl: async () => {
          requests += 1
          return {}
        },
      }),
    ),
    /maxCharacters.*at most 6000/i,
  )

  assert.equal(requests, 0)
  assert.equal(await pathExists(fixture.cacheDir), false)
  assert.equal(await pathExists(fixture.manifestPath), false)
})

test("aliases fresh IDs deterministically and restores exact original-ID parity", async () => {
  const { aliasBatchEntries, restoreAliasedCatalog } = await loadRunner()
  assert.equal(typeof aliasBatchEntries, "function")
  assert.equal(typeof restoreAliasedCatalog, "function")

  const originalEntries = {
    ["f".repeat(64)]: "第三",
    ["0".repeat(64)]: "第一，{name}",
    ["a".repeat(64)]: "第二",
  }
  const aliased = aliasBatchEntries(originalEntries)

  assert.deepEqual(Object.keys(aliased.entries), ["m000", "m001", "m002"])
  assert.deepEqual(Object.values(aliased.entries), ["第一，{name}", "第二", "第三"])
  assert.deepEqual(aliased.aliasToOriginalId, {
    m000: "0".repeat(64),
    m001: "a".repeat(64),
    m002: "f".repeat(64),
  })

  const aliasCatalog = translatedBatch(aliased.entries)
  const restored = restoreAliasedCatalog({
    catalog: aliasCatalog,
    originalEntries,
    targetLocales: TARGET_LOCALES,
  })
  assert.deepEqual(Object.keys(restored), Object.keys(originalEntries).sort())
  assert.equal(restored["0".repeat(64)].en, "en:第一，{name}")
  assert.equal(Object.keys(restored).some((id) => /^m\d{3}$/.test(id)), false)

  assert.throws(
    () =>
      restoreAliasedCatalog({
        catalog: translatedBatch({ m999: "错误别名" }),
        originalEntries,
        targetLocales: TARGET_LOCALES,
      }),
    /IDs do not match/i,
  )

  const duplicateAliasCatalog = Object.fromEntries([
    ["m000", aliasCatalog.m000],
    ["m000", aliasCatalog.m001],
    ["m002", aliasCatalog.m002],
  ])
  assert.throws(
    () =>
      restoreAliasedCatalog({
        catalog: duplicateAliasCatalog,
        originalEntries,
        targetLocales: TARGET_LOCALES,
      }),
    /IDs do not match/i,
  )
})

test("validates and applies deterministic locale overrides after cached translation", async () => {
  const { applyCatalogOverrides } = await loadRunner()
  assert.equal(typeof applyCatalogOverrides, "function")

  const entries = { a: "你好，{name}", b: "标题" }
  const catalog = translatedBatch(entries)
  const overrides = {
    schemaVersion: 1,
    locales: {
      ja: { b: "レビュー済みのタイトル" },
      en: { a: "Hello, {name}" },
      fr: {},
      de: {},
    },
  }
  const applied = applyCatalogOverrides({
    catalog,
    entries,
    targetLocales: TARGET_LOCALES,
    overrides,
  })

  assert.equal(applied.count, 2)
  assert.deepEqual(Object.keys(applied.catalog), ["a", "b"])
  assert.equal(applied.catalog.a.en, "Hello, {name}")
  assert.equal(applied.catalog.b.ja, "レビュー済みのタイトル")
  assert.equal(applied.catalog.a.fr, catalog.a.fr)
  assert.equal(catalog.a.en, "en:你好，{name}")

  const invalidCases = [
    {
      name: "schema",
      overrides: { ...overrides, schemaVersion: 2 },
      pattern: /schemaVersion.*1/i,
    },
    {
      name: "missing locale",
      overrides: {
        ...overrides,
        locales: { ja: {}, en: {}, fr: {} },
      },
      pattern: /locale.*exact/i,
    },
    {
      name: "extra locale",
      overrides: {
        ...overrides,
        locales: { ...overrides.locales, es: {} },
      },
      pattern: /locale.*exact/i,
    },
    {
      name: "unknown ID",
      overrides: {
        ...overrides,
        locales: { ...overrides.locales, en: { unknown: "Unknown" } },
      },
      pattern: /unknown.*source ID/i,
    },
    {
      name: "empty value",
      overrides: {
        ...overrides,
        locales: { ...overrides.locales, en: { b: "" } },
      },
      pattern: /non-empty string/i,
    },
    {
      name: "changed placeholder",
      overrides: {
        ...overrides,
        locales: { ...overrides.locales, en: { a: "Hello" } },
      },
      pattern: /preserve placeholders/i,
    },
  ]
  for (const invalidCase of invalidCases) {
    assert.throws(
      () =>
        applyCatalogOverrides({
          catalog,
          entries,
          targetLocales: TARGET_LOCALES,
          overrides: invalidCase.overrides,
        }),
      invalidCase.pattern,
      invalidCase.name,
    )
  }
})

test("hashes override provenance and republishes byte-identically from cache", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const fixture = await createFixture(t, { title: "标题", greeting: "你好，{name}" })
  const overridesPath = join(fixture.root, "overrides.json")
  const overrides = {
    schemaVersion: 1,
    locales: {
      ja: {},
      en: { title: "Reviewed title" },
      fr: { greeting: "Bonjour, {name}" },
      de: {},
    },
  }
  const overridesRaw = `${JSON.stringify(overrides, null, 2)}\n`
  await writeFile(overridesPath, overridesRaw, "utf8")
  const options = runnerOptions(fixture, {
    overridesPath,
    translateImpl: async ({ entries, targetLocales }) =>
      translatedBatch(entries, targetLocales),
  })

  await translateFullCatalog(options)
  const firstRelease = await readPublishedRelease(fixture)
  const releasePaths = firstRelease.releasePaths
  const firstBytes = await Promise.all(releasePaths.map((path) => readFile(path)))
  const english = JSON.parse(firstBytes[1].toString("utf8"))
  const french = JSON.parse(firstBytes[2].toString("utf8"))
  const manifest = firstRelease.manifest

  assert.equal(english.title, "Reviewed title")
  assert.equal(french.greeting, "Bonjour, {name}")
  assert.deepEqual(manifest.overrides, {
    sha256: sha256(overridesRaw),
    count: 2,
  })

  const rerun = await translateFullCatalog({
    ...options,
    cacheOnly: true,
    translateImpl: async () => {
      throw new Error("override cache-only rerun must not call the relay")
    },
  })
  const secondRelease = await readPublishedRelease(fixture)
  const secondBytes = await Promise.all(secondRelease.releasePaths.map((path) => readFile(path)))
  assert.equal(rerun.cacheMisses, 0)
  assert.deepEqual(secondBytes, firstBytes)
})

test("translates sequentially and resumes an interrupted run from cached batches", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const fixture = await createFixture(t, {
    "id-05": "第五",
    "id-01": "第一",
    "id-03": "第三",
    "id-02": "第二",
    "id-04": "第四",
  })
  const firstCalls = []
  let active = 0
  let maxActive = 0
  const interruptingTranslator = async ({ entries, targetLocales }) => {
    active += 1
    maxActive = Math.max(maxActive, active)
    const sourceValues = Object.values(entries)
    firstCalls.push(sourceValues)
    await Promise.resolve()
    active -= 1
    if (sourceValues[0] === "第三") throw new Error("intentional interruption")
    return translatedBatch(entries, targetLocales)
  }

  await assert.rejects(
    translateFullCatalog(
      runnerOptions(fixture, {
        maxEntries: 2,
        maxCharacters: 100,
        concurrency: 1,
        translateImpl: interruptingTranslator,
      }),
    ),
    /batch 2\/3 failed/i,
  )
  assert.deepEqual(firstCalls, [["第一", "第二"], ["第三", "第四"]])
  assert.equal(maxActive, 1)
  assert.equal((await readdir(fixture.cacheDir)).length, 1)
  assert.equal(await pathExists(fixture.outputDir), false)
  assert.equal(await pathExists(fixture.manifestPath), false)

  const resumedCalls = []
  const resumed = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 2,
      maxCharacters: 100,
      concurrency: 1,
      translateImpl: async ({ entries, targetLocales }) => {
        resumedCalls.push(Object.values(entries))
        return translatedBatch(entries, targetLocales)
      },
    }),
  )

  assert.deepEqual(resumedCalls, [["第三", "第四"], ["第五"]])
  assert.equal(resumed.cacheHits, 1)
  assert.equal(resumed.cacheMisses, 2)
  assert.equal((await readdir(fixture.cacheDir)).length, 3)
})

test("reuses an original-ID cache without sending aliases to the relay", async (t) => {
  const { chunkEntries, translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const originalId = "b".repeat(64)
  const fixture = await createFixture(t, { [originalId]: "标题" })
  const [originalEntries] = chunkEntries(fixture.source.entries, {
    maxEntries: 40,
    maxCharacters: 6_000,
  })
  const key = createTranslationCacheKey({
    ...SETTINGS,
    sourceLocale: fixture.source.sourceLocale,
    targetLocales: fixture.source.targetLocales,
    entries: originalEntries,
    glossary: fixture.source.glossary,
  })
  await mkdir(fixture.cacheDir, { recursive: true })
  await writeFile(
    join(fixture.cacheDir, `${key}.json`),
    `${JSON.stringify(translatedBatch(originalEntries))}\n`,
    "utf8",
  )
  let requests = 0

  const result = await translateFullCatalog(
    runnerOptions(fixture, {
      translateImpl: async () => {
        requests += 1
        return {}
      },
    }),
  )
  const english = await readPublishedLocale(fixture, "en")

  assert.equal(result.cacheHits, 1)
  assert.equal(requests, 0)
  assert.deepEqual(Object.keys(english), [originalId])
  assert.equal(english[originalId], "en:标题")
})

test("reuses a validated published seed and requests only new source IDs", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const existingEntries = {
    ["a".repeat(64)]: "已有标题",
    ["b".repeat(64)]: "已有说明",
  }
  const newId = "c".repeat(64)
  const fixture = await createFixture(t, { ...existingEntries, [newId]: "新增文案" })
  const requests = []

  const result = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 3,
      seedCatalog: translatedBatch(existingEntries),
      translateImpl: async ({ entries, targetLocales }) => {
        requests.push(Object.values(entries))
        return translatedBatch(entries, targetLocales)
      },
    }),
  )
  const english = await readPublishedLocale(fixture, "en")

  assert.deepEqual(requests, [["新增文案"]])
  assert.equal(result.seededEntries, 2)
  assert.deepEqual(Object.keys(english), Object.keys(fixture.source.entries).sort())
  assert.equal(english["a".repeat(64)], "en:已有标题")
  assert.equal(english[newId], "en:新增文案")
})

test("runs at default concurrency four and honors the configurable 1-4 bound", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const entries = Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [`id-${index}`, `消息 ${index}`]),
  )
  const defaultFixture = await createFixture(t, entries)
  let defaultActive = 0
  let defaultMaximum = 0
  const defaultResult = await translateFullCatalog(
    runnerOptions(defaultFixture, {
      maxEntries: 1,
      translateImpl: async ({ entries: batchEntries, targetLocales }) => {
        defaultActive += 1
        defaultMaximum = Math.max(defaultMaximum, defaultActive)
        await new Promise((resolve) => setTimeout(resolve, 25))
        defaultActive -= 1
        return translatedBatch(batchEntries, targetLocales)
      },
    }),
  )

  assert.equal(defaultMaximum, 4)
  assert.equal(defaultResult.concurrency, 4)

  const boundedFixture = await createFixture(t, entries)
  let boundedActive = 0
  let boundedMaximum = 0
  const boundedResult = await translateFullCatalog(
    runnerOptions(boundedFixture, {
      maxEntries: 1,
      concurrency: 2,
      translateImpl: async ({ entries: batchEntries, targetLocales }) => {
        boundedActive += 1
        boundedMaximum = Math.max(boundedMaximum, boundedActive)
        await new Promise((resolve) => setTimeout(resolve, 25))
        boundedActive -= 1
        return translatedBatch(batchEntries, targetLocales)
      },
    }),
  )

  assert.equal(boundedMaximum, 2)
  assert.equal(boundedResult.concurrency, 2)

  for (const concurrency of [0, 5, 1.5, Number.NaN]) {
    await assert.rejects(
      translateFullCatalog(runnerOptions(boundedFixture, { concurrency })),
      /concurrency.*integer.*1.*4/i,
    )
  }
})

test("retries only fresh validation failures three times before caching or failing", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const { TranslationValidationError } = await import("./translation-client.mjs")
  assert.equal(typeof translateFullCatalog, "function")
  assert.equal(typeof TranslationValidationError, "function")

  const fixture = await createFixture(t, { title: "标题" })
  const delays = []
  const cacheSnapshots = []
  let calls = 0
  const recovered = await translateFullCatalog(
    runnerOptions(fixture, {
      validationSleepImpl: async (milliseconds) => delays.push(milliseconds),
      translateImpl: async ({ entries, targetLocales }) => {
        calls += 1
        cacheSnapshots.push(
          (await pathExists(fixture.cacheDir))
            ? (await readdir(fixture.cacheDir)).length
            : 0,
        )
        if (calls === 1) {
          return translatedBatch({ wrong: "错误 ID" }, targetLocales)
        }
        if (calls === 2) {
          throw new TranslationValidationError("response content has an invalid shape")
        }
        return translatedBatch(entries, targetLocales)
      },
    }),
  )

  assert.equal(recovered.cacheMisses, 1)
  assert.equal(calls, 3)
  assert.deepEqual(delays, [250, 500])
  assert.deepEqual(cacheSnapshots, [0, 0, 0])
  assert.equal((await readdir(fixture.cacheDir)).length, 1)

  const failingFixture = await createFixture(t, { title: "标题" })
  const failureDelays = []
  let failureCalls = 0
  let failure
  await assert.rejects(
    translateFullCatalog(
      runnerOptions(failingFixture, {
        validationSleepImpl: async (milliseconds) => failureDelays.push(milliseconds),
        translateImpl: async () => {
          failureCalls += 1
          return translatedBatch({ wrong: SETTINGS.apiKey })
        },
      }),
    ),
    (error) => {
      failure = error
      return true
    },
  )

  assert.equal(failureCalls, 3)
  assert.deepEqual(failureDelays, [250, 500])
  assert.match(failure.message, /batch 1\/1 failed after 3 invalid fresh responses/i)
  assert.doesNotMatch(failure.message, new RegExp(SETTINGS.apiKey, "g"))
  assert.doesNotMatch(failure.message, new RegExp(SETTINGS.baseUrl, "g"))
  assert.equal(await pathExists(failingFixture.cacheDir), false)
})

test("synthesizes a stable parent cache from sequential children after parent validation retries", async (t) => {
  const { chunkEntries, translateFullCatalog } = await loadRunner()
  const entries = { d: "丁", b: "乙", a: "甲", c: "丙" }
  const fixture = await createFixture(t, entries)
  const requestSizes = []
  let relayCalls = 0

  const first = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 4,
      concurrency: 1,
      validationSleepImpl: async () => {},
      translateImpl: async ({ entries: requestEntries, targetLocales }) => {
        relayCalls += 1
        requestSizes.push(Object.keys(requestEntries).length)
        if (Object.keys(requestEntries).length === 4) {
          return translatedBatch({ wrong: "错误 ID" }, targetLocales)
        }
        return translatedBatch(requestEntries, targetLocales)
      },
    }),
  )

  assert.deepEqual(requestSizes, [4, 4, 4, 2, 2])
  assert.equal(first.batchCount, 1)
  assert.equal(first.cacheMisses, 1)
  assert.equal((await readdir(fixture.cacheDir)).length, 3)

  const [parentEntries] = chunkEntries(entries, { maxEntries: 4, maxCharacters: 6_000 })
  const parentKey = createTranslationCacheKey({
    ...SETTINGS,
    sourceLocale: fixture.source.sourceLocale,
    targetLocales: fixture.source.targetLocales,
    entries: parentEntries,
    glossary: fixture.source.glossary,
  })
  const cachedParent = JSON.parse(
    await readFile(join(fixture.cacheDir, `${parentKey}.json`), "utf8"),
  )
  const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"))
  assert.deepEqual(Object.keys(cachedParent), ["a", "b", "c", "d"])
  assert.deepEqual(manifest.batchCacheKeys, [parentKey])

  const second = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 4,
      concurrency: 1,
      cacheOnly: true,
      translateImpl: async () => {
        relayCalls += 1
        throw new Error("cache-only rerun must not call the relay")
      },
    }),
  )
  assert.equal(second.cacheHits, 1)
  assert.equal(second.cacheMisses, 0)
  assert.equal(relayCalls, 5)
})

test("recursively halves invalid batches until singleton translations succeed", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const fixture = await createFixture(t, { d: "丁", b: "乙", a: "甲", c: "丙" })
  const requestSizes = []

  const result = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 4,
      concurrency: 1,
      validationSleepImpl: async () => {},
      translateImpl: async ({ entries, targetLocales }) => {
        const size = Object.keys(entries).length
        requestSizes.push(size)
        if (size > 1) return translatedBatch({ wrong: "错误 ID" }, targetLocales)
        return translatedBatch(entries, targetLocales)
      },
    }),
  )

  assert.deepEqual(requestSizes, [4, 4, 4, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1])
  assert.equal(result.cacheMisses, 1)
  assert.equal((await readdir(fixture.cacheDir)).length, 7)
  const english = await readPublishedLocale(fixture, "en")
  assert.deepEqual(Object.keys(english), ["a", "b", "c", "d"])
})

test("fails a terminal singleton without writing invalid caches or release files", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const fixture = await createFixture(t, { only: "唯一" })
  let calls = 0

  await assert.rejects(
    translateFullCatalog(
      runnerOptions(fixture, {
        validationSleepImpl: async () => {},
        translateImpl: async () => {
          calls += 1
          return translatedBatch({ wrong: "错误 ID" })
        },
      }),
    ),
    /singleton.*3 strict validation attempts/i,
  )

  assert.equal(calls, 3)
  assert.equal(await pathExists(fixture.cacheDir), false)
  assert.equal(await pathExists(fixture.outputDir), false)
  assert.equal(await pathExists(fixture.manifestPath), false)
})

test("keeps split work sequential per parent and global relay concurrency at four", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  const entries = Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [
      `id-${index}`,
      `group-${Math.floor(index / 2)} item-${index}`,
    ]),
  )
  const fixture = await createFixture(t, entries)
  const activeByGroup = new Map()
  const maximumByGroup = new Map()
  let active = 0
  let maximum = 0

  const result = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 2,
      concurrency: 4,
      validationSleepImpl: async () => {},
      translateImpl: async ({ entries: requestEntries, targetLocales }) => {
        const sourceValues = Object.values(requestEntries)
        const group = sourceValues[0].match(/group-(\d+)/)?.[1]
        active += 1
        maximum = Math.max(maximum, active)
        activeByGroup.set(group, (activeByGroup.get(group) ?? 0) + 1)
        maximumByGroup.set(
          group,
          Math.max(maximumByGroup.get(group) ?? 0, activeByGroup.get(group)),
        )
        await new Promise((resolve) => setTimeout(resolve, 10))
        active -= 1
        activeByGroup.set(group, activeByGroup.get(group) - 1)

        if (sourceValues.length > 1) {
          return translatedBatch({ wrong: "错误 ID" }, targetLocales)
        }
        return translatedBatch(requestEntries, targetLocales)
      },
    }),
  )

  assert.equal(result.batchCount, 4)
  assert.equal(maximum, 4)
  assert.ok([...maximumByGroup.values()].every((value) => value === 1))
})

test("rejects syntactically corrupt cached JSON instead of silently requesting it again", async (t) => {
  const { chunkEntries, translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const fixture = await createFixture(t, { title: "标题" })
  const [entries] = chunkEntries(fixture.source.entries, {
    maxEntries: 40,
    maxCharacters: 6_000,
  })
  const key = createTranslationCacheKey({
    ...SETTINGS,
    sourceLocale: fixture.source.sourceLocale,
    targetLocales: fixture.source.targetLocales,
    entries,
    glossary: fixture.source.glossary,
  })
  await mkdir(fixture.cacheDir, { recursive: true })
  await writeFile(join(fixture.cacheDir, `${key}.json`), "{not-json", "utf8")
  let requests = 0

  await assert.rejects(
    translateFullCatalog(
      runnerOptions(fixture, {
        translateImpl: async () => {
          requests += 1
          return {}
        },
      }),
    ),
    /cache.*valid JSON/i,
  )
  assert.equal(requests, 0)
})

test("rejects cached batches with corrupt shapes, wrong IDs or locales, empty values, or changed placeholders", async (t) => {
  const { chunkEntries, translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const cases = [
    {
      name: "corrupt shape",
      catalog: { greeting: "not-an-object" },
      pattern: /greeting.*object/i,
    },
    {
      name: "wrong IDs",
      catalog: { wrong: translatedBatch({ wrong: "你好，{name}" }).wrong },
      pattern: /IDs do not match/i,
    },
    {
      name: "wrong locales",
      catalog: {
        greeting: { ja: "ja:你好，{name}", en: "en:你好，{name}" },
      },
      pattern: /requested locales/i,
    },
    {
      name: "empty value",
      catalog: {
        greeting: {
          ...translatedBatch({ greeting: "你好，{name}" }).greeting,
          en: "",
        },
      },
      pattern: /non-empty string/i,
    },
    {
      name: "changed placeholder",
      catalog: {
        greeting: {
          ...translatedBatch({ greeting: "你好，{name}" }).greeting,
          en: "Hello",
        },
      },
      pattern: /preserve placeholders/i,
    },
  ]

  for (const cacheCase of cases) {
    await t.test(cacheCase.name, async (t) => {
      const fixture = await createFixture(t, { greeting: "你好，{name}" })
      const [entries] = chunkEntries(fixture.source.entries, {
        maxEntries: 40,
        maxCharacters: 6_000,
      })
      const key = createTranslationCacheKey({
        ...SETTINGS,
        sourceLocale: fixture.source.sourceLocale,
        targetLocales: fixture.source.targetLocales,
        entries,
        glossary: fixture.source.glossary,
      })
      await mkdir(fixture.cacheDir, { recursive: true })
      await writeFile(
        join(fixture.cacheDir, `${key}.json`),
        `${JSON.stringify(cacheCase.catalog)}\n`,
        "utf8",
      )
      let requests = 0

      await assert.rejects(
        translateFullCatalog(
          runnerOptions(fixture, {
            translateImpl: async () => {
              requests += 1
              return {}
            },
          }),
        ),
        cacheCase.pattern,
      )
      assert.equal(requests, 0)
    })
  }
})

test("strictly rejects duplicate, missing, and extra IDs while merging batches", async () => {
  const { mergeBatchCatalogs } = await loadRunner()
  assert.equal(typeof mergeBatchCatalogs, "function")

  const options = {
    entries: { a: "甲", b: "乙" },
    targetLocales: ["en"],
  }
  assert.throws(
    () =>
      mergeBatchCatalogs({
        ...options,
        batches: [{ a: { en: "A" } }, { a: { en: "Again" }, b: { en: "B" } }],
      }),
    /duplicate.*a/i,
  )
  assert.throws(
    () => mergeBatchCatalogs({ ...options, batches: [{ a: { en: "A" } }] }),
    /missing.*b/i,
  )
  assert.throws(
    () =>
      mergeBatchCatalogs({
        ...options,
        batches: [{ a: { en: "A" }, b: { en: "B" }, c: { en: "C" } }],
      }),
    /extra.*c/i,
  )
})

test("writes deterministic atomic catalogs and a hashed manifest across two cache-only reruns", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const fixture = await createFixture(t, {
    zeta: "结束",
    alpha: "你好，{name}",
    middle: "共 %d 项",
  })
  const first = await translateFullCatalog(
    runnerOptions(fixture, {
      maxEntries: 2,
      maxCharacters: 100,
      translateImpl: async ({ entries, targetLocales }) =>
        translatedBatch(entries, targetLocales),
    }),
  )
  const firstRelease = await readPublishedRelease(fixture)
  const releasePaths = firstRelease.releasePaths
  const firstBytes = await Promise.all(releasePaths.map((path) => readFile(path)))
  const manifest = firstRelease.manifest

  assert.equal(first.batchCount, 2)
  assert.match(first.releaseId, /^[a-f0-9]{64}$/)
  assert.equal(manifest.schemaVersion, 1)
  assert.equal(manifest.sourceLocale, "zh-CN")
  assert.deepEqual(manifest.targetLocales, TARGET_LOCALES)
  assert.equal(manifest.model, SETTINGS.model)
  assert.equal(manifest.sourceCatalogSha256, sha256(fixture.sourceRaw))
  assert.equal(manifest.sourceEntryCount, 3)
  assert.deepEqual(manifest.batchLimits, { maxEntries: 2, maxCharacters: 100 })
  assert.equal(manifest.batchCount, 2)
  assert.equal(manifest.batchCacheKeys.length, 2)
  assert.ok(manifest.batchCacheKeys.every((key) => /^[a-f0-9]{64}$/.test(key)))

  for (const [index, locale] of TARGET_LOCALES.entries()) {
    const catalog = JSON.parse(firstBytes[index].toString("utf8"))
    assert.deepEqual(Object.keys(catalog), ["alpha", "middle", "zeta"])
    assert.deepEqual(manifest.outputs[locale], {
      path: `messages/${first.releaseId}/${locale}.json`,
      sha256: sha256(firstBytes[index]),
      count: 3,
    })
  }

  const cacheOnlyOptions = runnerOptions(fixture, {
    maxEntries: 2,
    maxCharacters: 100,
    cacheOnly: true,
    translateImpl: async () => {
      throw new Error("cache-only rerun must never request the relay")
    },
  })
  const second = await translateFullCatalog(cacheOnlyOptions)
  const secondRelease = await readPublishedRelease(fixture)
  const secondBytes = await Promise.all(
    secondRelease.releasePaths.map((path) => readFile(path)),
  )
  const third = await translateFullCatalog(cacheOnlyOptions)
  const thirdRelease = await readPublishedRelease(fixture)
  const thirdBytes = await Promise.all(
    thirdRelease.releasePaths.map((path) => readFile(path)),
  )

  assert.equal(second.cacheHits, 2)
  assert.equal(second.cacheMisses, 0)
  assert.equal(third.cacheHits, 2)
  assert.equal(third.cacheMisses, 0)
  assert.equal(second.releaseId, first.releaseId)
  assert.equal(third.releaseId, first.releaseId)
  assert.deepEqual(secondBytes, firstBytes)
  assert.deepEqual(thirdBytes, firstBytes)
  assert.deepEqual(await readdir(fixture.outputDir), [first.releaseId])
  for (const locale of TARGET_LOCALES) {
    assert.equal(await pathExists(join(fixture.outputDir, `${locale}.json`)), false)
  }

  const catalogDirectoryEntries = await readdir(dirname(fixture.outputDir))
  assert.equal(
    catalogDirectoryEntries.some((name) => /\.tmp|backup|staging/i.test(name)),
    false,
  )
})

test("never exposes the API key or relay URL in release files, logs, or errors", async (t) => {
  const { translateFullCatalog } = await loadRunner()
  assert.equal(typeof translateFullCatalog, "function")

  const fixture = await createFixture(t, { title: "标题" })
  const logs = []
  const result = await translateFullCatalog(
    runnerOptions(fixture, {
      logger: (message) => logs.push(String(message)),
      translateImpl: async ({ entries, targetLocales }) =>
        translatedBatch(entries, targetLocales),
    }),
  )
  const release = await readPublishedRelease(fixture)
  const releaseText = (
    await Promise.all([
      ...release.localePaths.map((path) => readFile(path, "utf8")),
      readFile(fixture.manifestPath, "utf8"),
    ])
  ).join("\n")
  const successfulSurface = `${releaseText}\n${logs.join("\n")}\n${JSON.stringify(result)}`
  assert.doesNotMatch(successfulSurface, new RegExp(SETTINGS.apiKey, "g"))
  assert.doesNotMatch(successfulSurface, new RegExp(SETTINGS.baseUrl, "g"))

  const failingFixture = await createFixture(t, { title: "标题" })
  const failureLogs = []
  let failure
  await assert.rejects(
    translateFullCatalog(
      runnerOptions(failingFixture, {
        logger: (message) => failureLogs.push(String(message)),
        translateImpl: async () => {
          throw new Error(
            `relay rejected ${SETTINGS.apiKey} at ${SETTINGS.baseUrl}: full response body`,
          )
        },
      }),
    ),
    (error) => {
      failure = error
      return true
    },
  )
  const failureSurface = `${failure.message}\n${failureLogs.join("\n")}`
  assert.doesNotMatch(failureSurface, new RegExp(SETTINGS.apiKey, "g"))
  assert.doesNotMatch(failureSurface, new RegExp(SETTINGS.baseUrl, "g"))
  assert.equal(await pathExists(failingFixture.outputDir), false)
  assert.equal(await pathExists(failingFixture.manifestPath), false)
})

test("package script loads the ignored .env.local for the full translation command", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../../package.json", import.meta.url), "utf8"),
  )

  assert.equal(
    packageJson.scripts["i18n:translate:all"],
    "node --env-file=.env.local scripts/i18n/translate-full-catalog.mjs",
  )
})
