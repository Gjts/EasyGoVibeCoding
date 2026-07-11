export function validateSourceCatalog(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Source catalog must be a JSON object")
  }
  if (typeof value.sourceLocale !== "string" || value.sourceLocale.trim().length === 0) {
    throw new Error("sourceLocale must be a non-empty string")
  }
  if (!Array.isArray(value.targetLocales) || value.targetLocales.length === 0) {
    throw new Error("targetLocales must be a non-empty array")
  }

  const uniqueLocales = new Set(value.targetLocales)
  if (
    uniqueLocales.size !== value.targetLocales.length ||
    value.targetLocales.some(
      (locale) => typeof locale !== "string" || locale.trim().length === 0,
    )
  ) {
    throw new Error("targetLocales must contain unique non-empty strings")
  }
  if (uniqueLocales.has(value.sourceLocale)) {
    throw new Error("targetLocales must not include sourceLocale")
  }

  if (!value.entries || typeof value.entries !== "object" || Array.isArray(value.entries)) {
    throw new Error("entries must be a JSON object")
  }
  const entryPairs = Object.entries(value.entries)
  if (entryPairs.length === 0) {
    throw new Error("entries must contain at least one translation entry")
  }
  for (const [id, text] of entryPairs) {
    if (id.trim().length === 0 || typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Every translation entry ID and value must be a non-empty string")
    }
  }

  return value
}

export function splitCatalogByLocale({ catalog, targetLocales }) {
  const byLocale = Object.fromEntries(targetLocales.map((locale) => [locale, {}]))

  for (const [id, translations] of Object.entries(catalog)) {
    for (const locale of targetLocales) {
      byLocale[locale][id] = translations[locale]
    }
  }

  return byLocale
}
