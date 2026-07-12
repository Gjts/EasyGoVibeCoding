import type { ModelEntry, ModelsPayload, NewsEntry } from "./model-schema"

const PREFERRED_FLAGSHIP_PROVIDERS = ["Anthropic", "OpenAI", "Google"]
const OFFICIAL_VERIFIED_SUFFIX = "+official-verified"

const DATE_KIND_QUALITY: Record<ModelEntry["dateKind"], number> = {
  "official-release": 2,
  "catalog-observed": 1,
  unverified: 0,
}

/**
 * Runtime catalogs are useful for discovery, but they can lag an already
 * verified vendor release. Keep the runtime payload while overlaying the
 * build-time official baseline for flagship ordering and release news.
 */
export function reconcileModelPayload(
  runtime: ModelsPayload,
  verified: ModelsPayload,
): ModelsPayload {
  const verifiedFlagships = verified.models.filter(
    (model) => model.tier === 1 && model.dateKind === "official-release",
  )
  const models = mergeModels([...runtime.models, ...verifiedFlagships])

  return {
    ...runtime,
    source: markOfficialVerification(runtime.source),
    models: balanceFlagshipProviders(models),
    releases: mergeModels([...runtime.releases, ...verified.releases])
      .sort(compareReleaseDate)
      .slice(0, 120),
    news: mergeNews([...runtime.news, ...verified.news])
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 30),
  }
}

function mergeModels(models: ModelEntry[]): ModelEntry[] {
  const merged = new Map<string, ModelEntry>()

  for (const model of models) {
    const key = modelKey(model)
    const current = merged.get(key)
    if (!current || compareVerification(model, current) >= 0) {
      merged.set(key, model)
    }
  }

  return [...merged.values()]
}

function balanceFlagshipProviders(models: ModelEntry[]): ModelEntry[] {
  const tierOne = models.filter((model) => model.tier === 1)
  const preferred = PREFERRED_FLAGSHIP_PROVIDERS
    .map((provider) => bestModel(tierOne.filter((model) => model.provider === provider)))
    .filter((model): model is ModelEntry => Boolean(model))
  const preferredKeys = new Set(preferred.map(modelKey))

  return [
    ...preferred,
    ...tierOne.filter((model) => !preferredKeys.has(modelKey(model))),
    ...models.filter((model) => model.tier !== 1),
  ]
}

function bestModel(models: ModelEntry[]): ModelEntry | undefined {
  return models.reduce<ModelEntry | undefined>((best, model) => {
    if (!best || compareVerification(model, best) > 0) return model
    return best
  }, undefined)
}

function compareVerification(candidate: ModelEntry, current: ModelEntry): number {
  const qualityDelta =
    DATE_KIND_QUALITY[candidate.dateKind] - DATE_KIND_QUALITY[current.dateKind]
  if (qualityDelta !== 0) return qualityDelta
  return candidate.releaseDate.localeCompare(current.releaseDate)
}

function mergeNews(news: NewsEntry[]): NewsEntry[] {
  const merged = new Map<string, NewsEntry>()

  for (const item of news) {
    const key = `${item.provider}:${item.title}:${item.url}`.toLowerCase()
    const current = merged.get(key)
    if (!current || item.date > current.date) merged.set(key, item)
  }

  return [...merged.values()]
}

function compareReleaseDate(a: ModelEntry, b: ModelEntry): number {
  const dateOrder = b.releaseDate.localeCompare(a.releaseDate)
  if (dateOrder !== 0) return dateOrder
  return modelKey(a).localeCompare(modelKey(b))
}

function modelKey(model: Pick<ModelEntry, "provider" | "name">): string {
  return `${model.provider}:${model.name}`.toLowerCase()
}

function markOfficialVerification(source: string): string {
  return source.endsWith(OFFICIAL_VERIFIED_SUFFIX)
    ? source
    : `${source}${OFFICIAL_VERIFIED_SUFFIX}`
}
