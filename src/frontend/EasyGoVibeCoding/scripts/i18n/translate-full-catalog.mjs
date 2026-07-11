import { createHash, randomUUID } from "node:crypto"
import {
  mkdir,
  readFile,
  rename,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises"
import { basename, dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import {
  createTranslationCacheKey,
  loadTranslationSettings,
  parseTranslationResponse,
  TranslationValidationError,
  translateCatalog,
} from "./translation-client.mjs"
import { readTranslationCache, writeTranslationCache } from "./translation-cache.mjs"
import { splitCatalogByLocale, validateSourceCatalog } from "./translation-catalog.mjs"

const DEFAULT_MAX_ENTRIES = 20
const DEFAULT_MAX_CHARACTERS = 6_000
const DEFAULT_PROGRESS_EVERY = 25
const DEFAULT_CONCURRENCY = 4
const FRESH_VALIDATION_MAX_ATTEMPTS = 3

function assertPositiveInteger(value, name) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`)
  }
}

function unicodeLength(value) {
  return Array.from(value).length
}

function sortObject(value) {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right, "en")),
  )
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function validateBatchCatalog({ catalog, entries, targetLocales }) {
  return parseTranslationResponse({
    responseBody: {
      choices: [{ message: { content: JSON.stringify(catalog) } }],
    },
    entries,
    targetLocales,
  })
}

function redactErrorMessage(error, settings) {
  let message = error instanceof Error ? error.message : "Unknown translation error"
  for (const sensitiveValue of [settings.apiKey, settings.baseUrl]) {
    if (typeof sensitiveValue === "string" && sensitiveValue.length > 0) {
      message = message.replaceAll(sensitiveValue, "[redacted]")
    }
  }
  message = message.replace(/\s+/g, " ").trim()
  return message.length > 240 ? `${message.slice(0, 237)}...` : message
}

function assertNoSensitiveMaterial(value, settings) {
  const serialized = typeof value === "string" ? value : JSON.stringify(value)
  for (const sensitiveValue of [settings.apiKey, settings.baseUrl]) {
    if (typeof sensitiveValue === "string" && sensitiveValue && serialized.includes(sensitiveValue)) {
      throw new Error("Generated translation data contains forbidden credential material")
    }
  }
}

async function exists(path) {
  try {
    await readFile(path)
    return true
  } catch (error) {
    if (error?.code === "EISDIR") return true
    if (error?.code === "ENOENT") return false
    throw error
  }
}

async function removeIfPresent(path) {
  await unlink(path).catch((error) => {
    if (error?.code !== "ENOENT") throw error
  })
}

async function writeReleaseAtomically({ outputDir, manifestPath, localeFiles, manifestRaw }) {
  const outputParent = dirname(outputDir)
  const manifestParent = dirname(manifestPath)
  const token = `${process.pid}.${randomUUID()}`
  const stagingDir = join(outputParent, `.${basename(outputDir)}.${token}.staging`)
  const backupDir = join(outputParent, `.${basename(outputDir)}.${token}.backup`)
  const temporaryManifest = join(
    manifestParent,
    `.${basename(manifestPath)}.${token}.tmp`,
  )
  const backupManifest = join(
    manifestParent,
    `.${basename(manifestPath)}.${token}.backup`,
  )
  let outputBackedUp = false
  let stagedOutputPublished = false
  let manifestBackedUp = false

  await mkdir(stagingDir, { recursive: true })
  await mkdir(manifestParent, { recursive: true })

  try {
    await Promise.all(
      Object.entries(localeFiles).map(([locale, raw]) =>
        writeFile(join(stagingDir, `${locale}.json`), raw, "utf8"),
      ),
    )
    await writeFile(temporaryManifest, manifestRaw, "utf8")

    if (await exists(manifestPath)) {
      await rename(manifestPath, backupManifest)
      manifestBackedUp = true
    }
    if (await exists(outputDir)) {
      await rename(outputDir, backupDir)
      outputBackedUp = true
    }

    await rename(stagingDir, outputDir)
    stagedOutputPublished = true
    await rename(temporaryManifest, manifestPath)

    await rm(backupDir, { recursive: true, force: true }).catch(() => {})
    await removeIfPresent(backupManifest).catch(() => {})
  } catch (error) {
    if (stagedOutputPublished) {
      await rm(outputDir, { recursive: true, force: true }).catch(() => {})
    }
    if (outputBackedUp) {
      await rename(backupDir, outputDir).catch(() => {})
    }
    if (manifestBackedUp) {
      await rename(backupManifest, manifestPath).catch(() => {})
    }
    throw error
  } finally {
    await rm(stagingDir, { recursive: true, force: true }).catch(() => {})
    await rm(backupDir, { recursive: true, force: true }).catch(() => {})
    await removeIfPresent(temporaryManifest).catch(() => {})
    await removeIfPresent(backupManifest).catch(() => {})
  }
}

export function chunkEntries(
  entries,
  { maxEntries = DEFAULT_MAX_ENTRIES, maxCharacters = DEFAULT_MAX_CHARACTERS } = {},
) {
  assertPositiveInteger(maxEntries, "maxEntries")
  assertPositiveInteger(maxCharacters, "maxCharacters")
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) {
    throw new Error("entries must be a JSON object")
  }

  const batches = []
  let current = {}
  let currentCharacters = 0

  for (const [id, source] of Object.entries(sortObject(entries))) {
    if (typeof source !== "string") {
      throw new Error(`Translation entry ${id} must be a string`)
    }
    const characters = unicodeLength(source)
    if (characters > maxCharacters) {
      throw new Error(
        `Translation entry ${id} has ${characters} Unicode characters, exceeding maxCharacters ${maxCharacters}`,
      )
    }

    if (
      Object.keys(current).length >= maxEntries ||
      (Object.keys(current).length > 0 && currentCharacters + characters > maxCharacters)
    ) {
      batches.push(current)
      current = {}
      currentCharacters = 0
    }

    current[id] = source
    currentCharacters += characters
  }

  if (Object.keys(current).length > 0) batches.push(current)
  return batches
}

export function aliasBatchEntries(originalEntries) {
  const entries = {}
  const aliasToOriginalId = {}

  Object.entries(sortObject(originalEntries)).forEach(([originalId, source], index) => {
    const alias = `m${String(index).padStart(3, "0")}`
    entries[alias] = source
    aliasToOriginalId[alias] = originalId
  })

  return { entries, aliasToOriginalId }
}

export function restoreAliasedCatalog({ catalog, originalEntries, targetLocales }) {
  const aliased = aliasBatchEntries(originalEntries)
  const validatedAliases = validateBatchCatalog({
    catalog,
    entries: aliased.entries,
    targetLocales,
  })
  const restored = {}
  const restoredIds = new Set()

  for (const alias of Object.keys(aliased.entries)) {
    const originalId = aliased.aliasToOriginalId[alias]
    if (restoredIds.has(originalId)) {
      throw new TranslationValidationError(
        `Translation aliases map to duplicate source ID: ${originalId}`,
      )
    }
    restoredIds.add(originalId)
    restored[originalId] = validatedAliases[alias]
  }

  return validateBatchCatalog({
    catalog: restored,
    entries: sortObject(originalEntries),
    targetLocales,
  })
}

export function applyCatalogOverrides({ catalog, entries, targetLocales, overrides }) {
  if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
    throw new Error("Overrides must be a JSON object")
  }
  if (overrides.schemaVersion !== 1) {
    throw new Error("Override schemaVersion must be 1")
  }
  if (!overrides.locales || typeof overrides.locales !== "object" || Array.isArray(overrides.locales)) {
    throw new Error("Override locales must be a JSON object")
  }

  const expectedLocales = [...targetLocales].sort()
  const actualLocales = Object.keys(overrides.locales).sort()
  if (JSON.stringify(actualLocales) !== JSON.stringify(expectedLocales)) {
    throw new Error("Override locales must exactly match target locales")
  }

  const orderedEntries = sortObject(entries)
  const validatedCatalog = validateBatchCatalog({
    catalog,
    entries: orderedEntries,
    targetLocales,
  })
  const applied = Object.fromEntries(
    Object.keys(orderedEntries).map((id) => [
      id,
      Object.fromEntries(targetLocales.map((locale) => [locale, validatedCatalog[id][locale]])),
    ]),
  )
  let count = 0

  for (const locale of targetLocales) {
    const localeOverrides = overrides.locales[locale]
    if (!localeOverrides || typeof localeOverrides !== "object" || Array.isArray(localeOverrides)) {
      throw new Error(`Override locale ${locale} must be a JSON object`)
    }
    for (const [id, value] of Object.entries(localeOverrides)) {
      if (!Object.hasOwn(orderedEntries, id)) {
        throw new Error(`Override locale ${locale} contains unknown source ID: ${id}`)
      }
      if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Override ${id}.${locale} must be a non-empty string`)
      }
      applied[id][locale] = value
      count += 1
    }
  }

  return {
    catalog: validateBatchCatalog({ catalog: applied, entries: orderedEntries, targetLocales }),
    count,
  }
}

export function mergeBatchCatalogs({ batches, entries, targetLocales }) {
  const expectedIds = Object.keys(sortObject(entries))
  const expectedIdSet = new Set(expectedIds)
  const merged = {}

  for (const batch of batches) {
    if (!batch || typeof batch !== "object" || Array.isArray(batch)) {
      throw new Error("Every translated batch must be a JSON object")
    }
    for (const [id, translations] of Object.entries(batch)) {
      if (!expectedIdSet.has(id)) {
        throw new Error(`Merged catalog has extra source ID: ${id}`)
      }
      if (Object.hasOwn(merged, id)) {
        throw new Error(`Merged catalog has duplicate source ID: ${id}`)
      }
      merged[id] = translations
    }
  }

  const missingIds = expectedIds.filter((id) => !Object.hasOwn(merged, id))
  if (missingIds.length > 0) {
    throw new Error(`Merged catalog is missing source IDs: ${missingIds.join(", ")}`)
  }

  const ordered = Object.fromEntries(expectedIds.map((id) => [id, merged[id]]))
  return validateBatchCatalog({ catalog: ordered, entries: sortObject(entries), targetLocales })
}

export async function translateFullCatalog({
  inputPath,
  outputDir,
  manifestPath = join(dirname(outputDir), "manifest.json"),
  overridesPath,
  overrides,
  cacheDir,
  settings = loadTranslationSettings(),
  maxEntries = DEFAULT_MAX_ENTRIES,
  maxCharacters = DEFAULT_MAX_CHARACTERS,
  concurrency = DEFAULT_CONCURRENCY,
  cacheOnly = false,
  translateImpl = translateCatalog,
  logger = () => {},
  progressEvery = DEFAULT_PROGRESS_EVERY,
  timeoutMs = 120_000,
  maxAttempts = 3,
  validationSleepImpl = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds)),
}) {
  assertPositiveInteger(progressEvery, "progressEvery")
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 4) {
    throw new Error("concurrency must be an integer between 1 and 4")
  }
  const sourceRaw = await readFile(inputPath, "utf8")
  const source = validateSourceCatalog(JSON.parse(sourceRaw))
  const entries = sortObject(source.entries)
  const glossary = source.glossary ?? {}
  if (overridesPath && overrides !== undefined) {
    throw new Error("Provide overridesPath or overrides, not both")
  }
  let overridesRaw
  let overrideDocument
  if (overridesPath) {
    overridesRaw = await readFile(overridesPath, "utf8")
    try {
      overrideDocument = JSON.parse(overridesRaw)
    } catch {
      throw new Error("Override catalog is not valid JSON")
    }
  } else {
    overrideDocument =
      overrides ?? {
        schemaVersion: 1,
        locales: Object.fromEntries(source.targetLocales.map((locale) => [locale, {}])),
      }
    overridesRaw = serializeJson(overrideDocument)
  }
  const batches = chunkEntries(entries, { maxEntries, maxCharacters })
  const cacheKeys = batches.map((batchEntries) =>
    createTranslationCacheKey({
      baseUrl: settings.baseUrl,
      model: settings.model,
      sourceLocale: source.sourceLocale,
      targetLocales: source.targetLocales,
      entries: batchEntries,
      glossary,
    }),
  )
  const translatedBatches = []
  let cacheHits = 0
  let cacheMisses = 0
  let completed = 0
  let nextIndex = 0
  let firstFailure

  function cacheKeyFor(batchEntries) {
    return createTranslationCacheKey({
      baseUrl: settings.baseUrl,
      model: settings.model,
      sourceLocale: source.sourceLocale,
      targetLocales: source.targetLocales,
      entries: batchEntries,
      glossary,
    })
  }

  function halveEntries(batchEntries) {
    const orderedPairs = Object.entries(sortObject(batchEntries))
    const midpoint = Math.floor(orderedPairs.length / 2)
    return [
      Object.fromEntries(orderedPairs.slice(0, midpoint)),
      Object.fromEntries(orderedPairs.slice(midpoint)),
    ]
  }

  async function translateOrReuseEntries(batchEntries, rootIndex) {
    const cacheKey = cacheKeyFor(batchEntries)
    let catalog = await readTranslationCache({
      cacheDir,
      key: cacheKey,
      rejectCorrupt: true,
    })

    if (catalog !== null) {
      catalog = validateBatchCatalog({
        catalog,
        entries: batchEntries,
        targetLocales: source.targetLocales,
      })
      assertNoSensitiveMaterial(catalog, settings)
      return { catalog, cacheHit: true }
    }

    if (cacheOnly) {
      throw new Error(
        `Cache-only translation is missing batch ${rootIndex + 1}/${batches.length}`,
      )
    }

    const aliasedBatch = aliasBatchEntries(batchEntries)
    let lastValidationError
    for (
      let validationAttempt = 1;
      validationAttempt <= FRESH_VALIDATION_MAX_ATTEMPTS;
      validationAttempt += 1
    ) {
      try {
        catalog = await translateImpl({
          ...settings,
          sourceLocale: source.sourceLocale,
          targetLocales: source.targetLocales,
          glossary,
          entries: aliasedBatch.entries,
          timeoutMs,
          maxAttempts,
        })
        catalog = validateBatchCatalog({
          catalog,
          entries: aliasedBatch.entries,
          targetLocales: source.targetLocales,
        })
        catalog = restoreAliasedCatalog({
          catalog,
          originalEntries: batchEntries,
          targetLocales: source.targetLocales,
        })
        lastValidationError = undefined
        break
      } catch (error) {
        if (!(error instanceof TranslationValidationError)) {
          throw new Error(
            `Translation batch ${rootIndex + 1}/${batches.length} failed: ${redactErrorMessage(error, settings)}`,
          )
        }
        lastValidationError = error
        if (validationAttempt < FRESH_VALIDATION_MAX_ATTEMPTS) {
          await validationSleepImpl(250 * 2 ** (validationAttempt - 1))
        }
      }
    }

    if (lastValidationError) {
      if (Object.keys(batchEntries).length === 1) {
        throw new Error(
          `Translation batch ${rootIndex + 1}/${batches.length} failed after ${FRESH_VALIDATION_MAX_ATTEMPTS} invalid fresh responses; singleton exhausted ${FRESH_VALIDATION_MAX_ATTEMPTS} strict validation attempts: ${redactErrorMessage(lastValidationError, settings)}`,
        )
      }

      const [leftEntries, rightEntries] = halveEntries(batchEntries)
      const left = await translateOrReuseEntries(leftEntries, rootIndex)
      const right = await translateOrReuseEntries(rightEntries, rootIndex)
      catalog = mergeBatchCatalogs({
        batches: [left.catalog, right.catalog],
        entries: batchEntries,
        targetLocales: source.targetLocales,
      })
    }

    assertNoSensitiveMaterial(catalog, settings)
    await writeTranslationCache({ cacheDir, key: cacheKey, catalog })
    return { catalog, cacheHit: false }
  }

  async function processBatch(index) {
    const result = await translateOrReuseEntries(batches[index], index)
    if (result.cacheHit) cacheHits += 1
    else cacheMisses += 1

    const catalog = result.catalog
    translatedBatches[index] = catalog
    completed += 1
    if (completed % progressEvery === 0 || completed === batches.length) {
      logger(
        `Translation progress ${completed}/${batches.length}: ${cacheHits} cached, ${cacheMisses} requested`,
      )
    }
  }

  async function worker() {
    while (!firstFailure) {
      const index = nextIndex
      nextIndex += 1
      if (index >= batches.length) return

      try {
        await processBatch(index)
      } catch (error) {
        if (!firstFailure) firstFailure = error
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, batches.length) }, () => worker()),
  )
  if (firstFailure) throw firstFailure

  const mergedWithoutOverrides = mergeBatchCatalogs({
    batches: translatedBatches,
    entries,
    targetLocales: source.targetLocales,
  })
  const appliedOverrides = applyCatalogOverrides({
    catalog: mergedWithoutOverrides,
    entries,
    targetLocales: source.targetLocales,
    overrides: overrideDocument,
  })
  const merged = appliedOverrides.catalog
  const byLocale = splitCatalogByLocale({
    catalog: merged,
    targetLocales: source.targetLocales,
  })
  const localeFiles = Object.fromEntries(
    source.targetLocales.map((locale) => [locale, serializeJson(byLocale[locale])]),
  )
  const outputs = Object.fromEntries(
    source.targetLocales.map((locale) => [
      locale,
      {
        sha256: sha256(localeFiles[locale]),
        count: Object.keys(byLocale[locale]).length,
      },
    ]),
  )
  const manifest = {
    schemaVersion: 1,
    sourceLocale: source.sourceLocale,
    targetLocales: source.targetLocales,
    model: settings.model,
    sourceCatalogSha256: sha256(sourceRaw),
    sourceEntryCount: Object.keys(entries).length,
    batchLimits: { maxEntries, maxCharacters },
    batchCount: batches.length,
    batchCacheKeys: cacheKeys,
    overrides: {
      sha256: sha256(overridesRaw),
      count: appliedOverrides.count,
    },
    outputs,
  }
  const manifestRaw = serializeJson(manifest)
  assertNoSensitiveMaterial(localeFiles, settings)
  assertNoSensitiveMaterial(manifestRaw, settings)
  await writeReleaseAtomically({ outputDir, manifestPath, localeFiles, manifestRaw })

  return {
    inputPath,
    outputDir,
    manifestPath,
    sourceEntryCount: manifest.sourceEntryCount,
    sourceCatalogSha256: manifest.sourceCatalogSha256,
    batchCount: batches.length,
    concurrency,
    overrideCount: appliedOverrides.count,
    overrideSha256: manifest.overrides.sha256,
    cacheHits,
    cacheMisses,
    outputSha256: Object.fromEntries(
      source.targetLocales.map((locale) => [locale, outputs[locale].sha256]),
    ),
  }
}

const currentFile = fileURLToPath(import.meta.url)
if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  const projectRoot = process.cwd()
  try {
    const result = await translateFullCatalog({
      inputPath: join(projectRoot, "i18n", "catalog", "source.zh-CN.json"),
      outputDir: join(projectRoot, "i18n", "catalog", "messages"),
      manifestPath: join(projectRoot, "i18n", "catalog", "manifest.json"),
      overridesPath: join(projectRoot, "i18n", "catalog", "overrides.json"),
      cacheDir: join(projectRoot, ".cache", "translations"),
      concurrency: Number(process.env.TRANSLATION_CONCURRENCY ?? DEFAULT_CONCURRENCY),
      cacheOnly: process.env.I18N_CACHE_ONLY === "1",
      logger: (message) => console.log(message),
    })
    console.log(
      `Translation complete: ${result.sourceEntryCount} entries in ${result.batchCount} batches (${result.cacheHits} cached, ${result.cacheMisses} requested)`,
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Full catalog translation failed")
    process.exitCode = 1
  }
}
