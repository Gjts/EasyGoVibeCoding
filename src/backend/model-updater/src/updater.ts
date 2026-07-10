import {
  ModelsPayloadSchema,
  type ModelsPayload,
} from "../../../frontend/EasyGoVibeCoding/lib/model-schema"
import type { Env } from "./env"
import { resolveHistoryMonths } from "./env"
import { pickProvider } from "./providers"
import type { ProviderResult } from "./providers/types"
import { pruneHistory, readLatest, writeError, writeLatest } from "./kv"

const MAX_RETRIES = 1

export interface UpdateOutcome {
  status: "updated" | "skipped" | "failed"
  nowISO: string
  source?: string
  modelsCount?: number
  newsCount?: number
  error?: string
}

export async function runUpdate(env: Env): Promise<UpdateOutcome> {
  const nowISO = new Date().toISOString()
  const provider = pickProvider(env)
  const previous = await readLatest(env.SITE_STATS_KV)

  const attemptOnce = () =>
    provider.fetchPayload(env, {
      previousPayload: previous,
      nowISO,
      providerSource: `${provider.id}-${env.LLM_MODEL || "default"}`,
    })

  let lastErr: unknown = null
  let lastRaw = ""
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const result = await attemptOnce()
      lastRaw = result.rawText
      const payload = buildValidatedPayload(result, nowISO, previous)
      await writeLatest(env.SITE_STATS_KV, payload, previous)
      await pruneHistory(env.SITE_STATS_KV, resolveHistoryMonths(env))
      return {
        status: "updated",
        nowISO,
        source: payload.source,
        modelsCount: payload.models.length,
        newsCount: payload.news.length,
      }
    } catch (error) {
      lastErr = error
      if (attempt >= MAX_RETRIES) break
    }
  }

  const message = lastErr instanceof Error ? lastErr.message : String(lastErr)
  await writeError(env.SITE_STATS_KV, nowISO, {
    message,
    rawText: lastRaw,
  })
  return { status: "failed", nowISO, error: message }
}

function buildValidatedPayload(
  result: ProviderResult,
  nowISO: string,
  previous: ModelsPayload | null,
): ModelsPayload {
  const normalizedJson = coerceSourceAndTimestamp(
    result.parsedJson,
    result.sourceLabel,
    nowISO,
  )
  const parsed = ModelsPayloadSchema.safeParse(normalizedJson)
  if (!parsed.success) {
    const issues = parsed.error.issues
      .slice(0, 5)
      .map((i) => `${i.path.join(".")} - ${i.message}`)
      .join("; ")
    throw new Error(`Payload failed schema validation: ${issues}`)
  }
  const current = {
    ...parsed.data,
    models: balanceFlagshipProviders(parsed.data.models),
  }
  return { ...current, releases: mergeReleases(current, previous) }
}

function balanceFlagshipProviders(
  models: ModelsPayload["models"],
): ModelsPayload["models"] {
  const tierOne = models.filter((model) => model.tier === 1)
  const preferred = ["Anthropic", "OpenAI", "Google"]
    .map((provider) => tierOne.find((model) => model.provider === provider))
    .filter((model): model is ModelsPayload["models"][number] => Boolean(model))
  const preferredKeys = new Set(
    preferred.map((model) => `${model.provider}:${model.name}`),
  )
  const remainingTierOne = tierOne.filter(
    (model) => !preferredKeys.has(`${model.provider}:${model.name}`),
  )
  const otherTiers = models.filter((model) => model.tier !== 1)
  return [...preferred, ...remainingTierOne, ...otherTiers]
}

function mergeReleases(
  current: ModelsPayload,
  previous: ModelsPayload | null,
): ModelsPayload["releases"] {
  const candidates = [
    ...current.releases,
    ...current.models,
    ...(previous?.releases || []),
    ...(previous?.models || []),
  ]
  const releases = new Map<string, ModelsPayload["releases"][number]>()
  for (const model of candidates) {
    const key = `${model.provider}:${model.name}`.toLowerCase()
    const current = releases.get(key)
    if (!current || dateQuality(model) > dateQuality(current)) {
      releases.set(key, model)
    }
  }

  return [...releases.values()]
    .sort((a, b) => {
      const dateOrder = b.releaseDate.localeCompare(a.releaseDate)
      if (dateOrder !== 0) return dateOrder
      return `${a.provider}:${a.name}`.localeCompare(`${b.provider}:${b.name}`)
    })
    .slice(0, 120)
}

function dateQuality(model: ModelsPayload["releases"][number]): number {
  if (model.dateKind === "official-release") return 2
  if (model.dateKind === "unverified") return 1
  return 0
}

function coerceSourceAndTimestamp(
  value: unknown,
  source: string,
  nowISO: string,
): unknown {
  if (!value || typeof value !== "object") return value
  const v = value as Record<string, unknown>
  return {
    ...v,
    source,
    updatedAt:
      typeof v.updatedAt === "string" && v.updatedAt ? v.updatedAt : nowISO,
    releases: Array.isArray(v.releases) ? v.releases : [],
    news: Array.isArray(v.news) ? v.news : [],
  }
}
