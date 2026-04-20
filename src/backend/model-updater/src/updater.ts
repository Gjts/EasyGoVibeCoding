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
      const payload = buildValidatedPayload(result, nowISO)
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
  return parsed.data
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
    source: typeof v.source === "string" && v.source ? v.source : source,
    updatedAt:
      typeof v.updatedAt === "string" && v.updatedAt ? v.updatedAt : nowISO,
    news: Array.isArray(v.news) ? v.news : [],
  }
}
