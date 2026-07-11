import { readFile, mkdir, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import {
  createTranslationCacheKey,
  loadTranslationSettings,
  translateCatalog,
} from "./translation-client.mjs"
import { readTranslationCache, writeTranslationCache } from "./translation-cache.mjs"
import { splitCatalogByLocale, validateSourceCatalog } from "./translation-catalog.mjs"

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

export async function translateCatalogFile({
  inputPath,
  outputDir,
  cacheDir,
  settings = loadTranslationSettings(),
  fetchImpl = fetch,
}) {
  const source = validateSourceCatalog(JSON.parse(await readFile(inputPath, "utf8")))
  const glossary = source.glossary ?? {}
  const cacheKey = createTranslationCacheKey({
    baseUrl: settings.baseUrl,
    model: settings.model,
    sourceLocale: source.sourceLocale,
    targetLocales: source.targetLocales,
    entries: source.entries,
    glossary,
  })

  let catalog = await readTranslationCache({ cacheDir, key: cacheKey })
  const cacheHit = catalog !== null
  if (!catalog) {
    catalog = await translateCatalog({
      ...settings,
      sourceLocale: source.sourceLocale,
      targetLocales: source.targetLocales,
      entries: source.entries,
      glossary,
      fetchImpl,
    })
    await writeTranslationCache({ cacheDir, key: cacheKey, catalog })
  }

  const byLocale = splitCatalogByLocale({
    catalog,
    targetLocales: source.targetLocales,
  })
  await Promise.all(
    source.targetLocales.map((locale) =>
      writeJson(join(outputDir, `${locale}.json`), byLocale[locale]),
    ),
  )
  await writeJson(join(outputDir, "manifest.json"), {
    sourceLocale: source.sourceLocale,
    targetLocales: source.targetLocales,
    model: settings.model,
    cacheKey,
  })

  return { cacheHit, cacheKey, outputDir }
}

const currentFile = fileURLToPath(import.meta.url)
if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  const projectRoot = process.cwd()
  const result = await translateCatalogFile({
    inputPath: join(projectRoot, "i18n", "pilot", "source.zh-CN.json"),
    outputDir: join(projectRoot, "i18n", "pilot", "messages"),
    cacheDir: join(projectRoot, ".cache", "translations"),
  })
  console.log(
    result.cacheHit
      ? `Translation cache hit: ${result.cacheKey}`
      : `Translation generated and cached: ${result.cacheKey}`,
  )
}
