import { createHash, randomUUID } from "node:crypto"
import {
  mkdir,
  open,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  unlink,
} from "node:fs/promises"
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path"
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
const MAX_BATCH_ENTRIES = 40
const MAX_BATCH_CHARACTERS = 6_000
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
    await stat(path)
    return true
  } catch (error) {
    if (error?.code === "ENOENT") return false
    throw error
  }
}

async function removeIfPresent(path) {
  await unlink(path).catch((error) => {
    if (error?.code !== "ENOENT") throw error
  })
}

async function writeFileDurably(path, raw) {
  const handle = await open(path, "wx")
  try {
    await handle.writeFile(raw, "utf8")
    await handle.sync()
  } finally {
    await handle.close()
  }
}

async function syncDirectory(path) {
  let handle
  try {
    handle = await open(path, "r")
    await handle.sync()
  } catch (error) {
    if (!["EISDIR", "EINVAL", "ENOTSUP", "EPERM"].includes(error?.code)) throw error
  } finally {
    await handle?.close()
  }
}

function validatePublication({ localeFiles, manifest }) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("Publication manifest must be a JSON object")
  }
  if (!Array.isArray(manifest.targetLocales) || manifest.targetLocales.length === 0) {
    throw new Error("Publication manifest targetLocales must be a non-empty array")
  }

  const targetLocales = [...manifest.targetLocales]
  if (new Set(targetLocales).size !== targetLocales.length) {
    throw new Error("Publication manifest targetLocales must be unique")
  }
  for (const locale of targetLocales) {
    if (typeof locale !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(locale)) {
      throw new Error(`Publication locale is not a safe file name: ${String(locale)}`)
    }
  }

  const expectedLocales = [...targetLocales].sort()
  const fileLocales = Object.keys(localeFiles ?? {}).sort()
  const outputLocales = Object.keys(manifest.outputs ?? {}).sort()
  if (JSON.stringify(fileLocales) !== JSON.stringify(expectedLocales)) {
    throw new Error("Publication locale files must exactly match targetLocales")
  }
  if (JSON.stringify(outputLocales) !== JSON.stringify(expectedLocales)) {
    throw new Error("Publication manifest outputs must exactly match targetLocales")
  }

  for (const locale of targetLocales) {
    const raw = localeFiles[locale]
    const output = manifest.outputs[locale]
    if (typeof raw !== "string") {
      throw new Error(`Publication locale ${locale} must be serialized text`)
    }
    if (output?.sha256 !== sha256(raw)) {
      throw new Error(`Publication hash does not match locale ${locale}`)
    }
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      throw new Error(`Publication locale ${locale} is not valid JSON`)
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Publication locale ${locale} must contain a JSON object`)
    }
    if (output.count !== Object.keys(parsed).length) {
      throw new Error(`Publication count does not match locale ${locale}`)
    }
  }

  return targetLocales
}

function releaseIdFor(localeFiles, targetLocales) {
  return sha256(
    JSON.stringify(
      [...targetLocales]
        .sort()
        .map((locale) => ({ locale, sha256: sha256(localeFiles[locale]) })),
    ),
  )
}

async function verifyImmutableSnapshot(snapshotDir, localeFiles, targetLocales) {
  const expectedNames = targetLocales.map((locale) => `${locale}.json`).sort()
  const actualNames = (await readdir(snapshotDir)).sort()
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    throw new Error(`Immutable snapshot ${basename(snapshotDir)} file set does not match`)
  }

  for (const locale of targetLocales) {
    const actual = await readFile(join(snapshotDir, `${locale}.json`))
    if (sha256(actual) !== sha256(localeFiles[locale])) {
      throw new Error(
        `Immutable snapshot ${basename(snapshotDir)} locale ${locale} does not match`,
      )
    }
  }
}

function manifestPathFor(manifestParent, snapshotDir, locale) {
  const nativePath = relative(manifestParent, join(snapshotDir, `${locale}.json`))
  if (isAbsolute(nativePath) || nativePath.split(/[\\/]/u).includes("..")) {
    throw new Error("Published snapshot must be inside the manifest directory")
  }
  return nativePath.replaceAll("\\", "/")
}

export async function publishReleaseSnapshot({
  outputDir,
  manifestPath,
  localeFiles,
  manifest,
  faultInjector = () => {},
}) {
  const targetLocales = validatePublication({ localeFiles, manifest })
  const manifestParent = dirname(manifestPath)
  const releaseId = releaseIdFor(localeFiles, targetLocales)
  const snapshotDir = join(outputDir, releaseId)
  const token = `${process.pid}.${randomUUID()}`
  const stagingDir = join(outputDir, `.${releaseId}.${token}.staging`)
  const temporaryManifest = join(
    manifestParent,
    `.${basename(manifestPath)}.${token}.tmp`,
  )
  let stagingCreated = false

  await mkdir(outputDir, { recursive: true })
  await mkdir(manifestParent, { recursive: true })

  try {
    if (await exists(snapshotDir)) {
      await verifyImmutableSnapshot(snapshotDir, localeFiles, targetLocales)
    } else {
      await mkdir(stagingDir)
      stagingCreated = true
      await Promise.all(
        targetLocales.map((locale) =>
          writeFileDurably(join(stagingDir, `${locale}.json`), localeFiles[locale]),
        ),
      )
      await syncDirectory(stagingDir)
      await faultInjector("after-snapshot-files-flushed")

      try {
        await rename(stagingDir, snapshotDir)
        stagingCreated = false
      } catch (error) {
        if (!(await exists(snapshotDir))) throw error
        await verifyImmutableSnapshot(snapshotDir, localeFiles, targetLocales)
      }
      await syncDirectory(outputDir)
      await faultInjector("after-snapshot-commit")
    }

    const publishedManifest = {
      ...manifest,
      outputs: Object.fromEntries(
        targetLocales.map((locale) => [
          locale,
          {
            path: manifestPathFor(manifestParent, snapshotDir, locale),
            sha256: manifest.outputs[locale].sha256,
            count: manifest.outputs[locale].count,
          },
        ]),
      ),
    }
    const manifestRaw = serializeJson(publishedManifest)

    if (await exists(manifestPath)) {
      const currentManifest = await readFile(manifestPath, "utf8")
      if (currentManifest === manifestRaw) {
        return { releaseId, manifest: publishedManifest, manifestRaw }
      }
    }

    await writeFileDurably(temporaryManifest, manifestRaw)
    await faultInjector("before-manifest-commit")
    await rename(temporaryManifest, manifestPath)
    await syncDirectory(manifestParent)
    await faultInjector("after-manifest-commit")
    return { releaseId, manifest: publishedManifest, manifestRaw }
  } finally {
    if (stagingCreated) {
      await rm(stagingDir, { recursive: true, force: true }).catch(() => {})
    }
    await removeIfPresent(temporaryManifest).catch(() => {})
  }
}

export function chunkEntries(
  entries,
  { maxEntries = DEFAULT_MAX_ENTRIES, maxCharacters = DEFAULT_MAX_CHARACTERS } = {},
) {
  assertPositiveInteger(maxEntries, "maxEntries")
  assertPositiveInteger(maxCharacters, "maxCharacters")
  if (maxEntries > MAX_BATCH_ENTRIES) {
    throw new Error(`maxEntries must be at most ${MAX_BATCH_ENTRIES}`)
  }
  if (maxCharacters > MAX_BATCH_CHARACTERS) {
    throw new Error(`maxCharacters must be at most ${MAX_BATCH_CHARACTERS}`)
  }
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

export async function readPublishedTranslationSeed(manifestPath) {
  if (!(await exists(manifestPath))) return undefined

  const manifestParent = dirname(manifestPath)
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
  if (!Array.isArray(manifest.targetLocales) || !manifest.outputs) {
    throw new Error("Published translation manifest is invalid")
  }

  const localeCatalogs = {}
  for (const locale of manifest.targetLocales) {
    const outputPath = manifest.outputs[locale]?.path
    if (typeof outputPath !== "string" || isAbsolute(outputPath)) {
      throw new Error(`Published translation path is invalid for ${locale}`)
    }
    const resolvedPath = resolve(manifestParent, outputPath)
    const relativePath = relative(manifestParent, resolvedPath)
    if (relativePath.split(/[\\/]/u).includes("..")) {
      throw new Error(`Published translation path escapes the catalog for ${locale}`)
    }
    const catalog = JSON.parse(await readFile(resolvedPath, "utf8"))
    if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
      throw new Error(`Published translation catalog is invalid for ${locale}`)
    }
    localeCatalogs[locale] = catalog
  }

  const firstLocale = manifest.targetLocales[0]
  return Object.fromEntries(
    Object.keys(localeCatalogs[firstLocale] ?? {}).flatMap((id) => {
      const translations = Object.fromEntries(
        manifest.targetLocales.map((locale) => [locale, localeCatalogs[locale][id]]),
      )
      return Object.values(translations).every((value) => typeof value === "string")
        ? [[id, translations]]
        : []
    }),
  )
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
  seedCatalog,
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
  let seededEntries = 0
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
      return { catalog, cacheHit: true, seededEntries: 0 }
    }

    const seededBatch = {}
    const missingBatch = {}
    for (const [id, sourceText] of Object.entries(batchEntries)) {
      const candidate = seedCatalog?.[id]
      if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
        try {
          const validated = validateBatchCatalog({
            catalog: { [id]: candidate },
            entries: { [id]: sourceText },
            targetLocales: source.targetLocales,
          })
          seededBatch[id] = validated[id]
          continue
        } catch {
          // A stale or malformed seed is ignored and translated again.
        }
      }
      missingBatch[id] = sourceText
    }

    if (Object.keys(seededBatch).length > 0) {
      if (Object.keys(missingBatch).length === 0) {
        assertNoSensitiveMaterial(seededBatch, settings)
        await writeTranslationCache({ cacheDir, key: cacheKey, catalog: seededBatch })
        return {
          catalog: seededBatch,
          cacheHit: true,
          seededEntries: Object.keys(seededBatch).length,
        }
      }
      const translated = await translateOrReuseEntries(missingBatch, rootIndex)
      catalog = mergeBatchCatalogs({
        batches: [seededBatch, translated.catalog],
        entries: batchEntries,
        targetLocales: source.targetLocales,
      })
      assertNoSensitiveMaterial(catalog, settings)
      await writeTranslationCache({ cacheDir, key: cacheKey, catalog })
      return {
        catalog,
        cacheHit: false,
        seededEntries: Object.keys(seededBatch).length + translated.seededEntries,
      }
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
    return { catalog, cacheHit: false, seededEntries: 0 }
  }

  async function processBatch(index) {
    const result = await translateOrReuseEntries(batches[index], index)
    if (result.cacheHit) cacheHits += 1
    else cacheMisses += 1
    seededEntries += result.seededEntries

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
  assertNoSensitiveMaterial(localeFiles, settings)
  assertNoSensitiveMaterial(manifest, settings)
  const publication = await publishReleaseSnapshot({
    outputDir,
    manifestPath,
    localeFiles,
    manifest,
  })
  assertNoSensitiveMaterial(publication.manifestRaw, settings)

  return {
    inputPath,
    outputDir,
    manifestPath,
    releaseId: publication.releaseId,
    sourceEntryCount: manifest.sourceEntryCount,
    sourceCatalogSha256: manifest.sourceCatalogSha256,
    batchCount: batches.length,
    concurrency,
    overrideCount: appliedOverrides.count,
    overrideSha256: manifest.overrides.sha256,
    cacheHits,
    cacheMisses,
    seededEntries,
    outputSha256: Object.fromEntries(
      source.targetLocales.map((locale) => [locale, outputs[locale].sha256]),
    ),
  }
}

const currentFile = fileURLToPath(import.meta.url)
if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  const projectRoot = process.cwd()
  try {
    const manifestPath = join(projectRoot, "i18n", "catalog", "manifest.json")
    const result = await translateFullCatalog({
      inputPath: join(projectRoot, "i18n", "catalog", "source.zh-CN.json"),
      outputDir: join(projectRoot, "i18n", "catalog", "messages"),
      manifestPath,
      overridesPath: join(projectRoot, "i18n", "catalog", "overrides.json"),
      cacheDir: join(projectRoot, ".cache", "translations"),
      concurrency: Number(process.env.TRANSLATION_CONCURRENCY ?? DEFAULT_CONCURRENCY),
      cacheOnly: process.env.I18N_CACHE_ONLY === "1",
      seedCatalog: await readPublishedTranslationSeed(manifestPath),
      logger: (message) => console.log(message),
    })
    console.log(
      `Translation complete: ${result.sourceEntryCount} entries in ${result.batchCount} batches (${result.cacheHits} cached, ${result.cacheMisses} requested, ${result.seededEntries} existing entries reused)`,
    )
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Full catalog translation failed")
    process.exitCode = 1
  }
}
