import {
  MODELS_KV_KEYS,
  ModelsPayloadSchema,
  type ModelsPayload,
} from "../../../frontend/EasyGoVibeCoding/lib/model-schema"

const HISTORY_KEY_REGEX = /^models:history:(\d{4}-\d{2})$/

export async function readLatest(kv: KVNamespace): Promise<ModelsPayload | null> {
  const raw = await kv.get(MODELS_KV_KEYS.latest)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    const result = ModelsPayloadSchema.safeParse(parsed)
    if (!result.success) return null
    return result.data
  } catch {
    return null
  }
}

export async function writeLatest(
  kv: KVNamespace,
  payload: ModelsPayload,
  previous: ModelsPayload | null,
): Promise<void> {
  if (previous) {
    await kv.put(MODELS_KV_KEYS.previous, JSON.stringify(previous))
  }
  await kv.put(MODELS_KV_KEYS.latest, JSON.stringify(payload))
  const key = `${MODELS_KV_KEYS.historyPrefix}${monthKey(payload.updatedAt)}`
  await appendHistory(kv, key, payload)
}

export async function writeError(
  kv: KVNamespace,
  nowISO: string,
  details: { message: string; rawText?: string },
): Promise<void> {
  const key = `${MODELS_KV_KEYS.errorPrefix}${nowISO}`
  const body = {
    at: nowISO,
    message: details.message,
    rawTextPreview: details.rawText?.slice(0, 2000),
  }
  await kv.put(key, JSON.stringify(body), {
    expirationTtl: 60 * 60 * 24 * 30,
  })
}

export async function pruneHistory(
  kv: KVNamespace,
  monthsToKeep: number,
): Promise<number> {
  const list = await kv.list({ prefix: MODELS_KV_KEYS.historyPrefix })
  const cutoff = cutoffMonth(monthsToKeep)
  let pruned = 0
  for (const item of list.keys) {
    const match = item.name.match(HISTORY_KEY_REGEX)
    if (!match) continue
    if (match[1] < cutoff) {
      await kv.delete(item.name)
      pruned += 1
    }
  }
  return pruned
}

async function appendHistory(
  kv: KVNamespace,
  key: string,
  payload: ModelsPayload,
): Promise<void> {
  const existingRaw = await kv.get(key)
  let bucket: ModelsPayload[] = []
  if (existingRaw) {
    try {
      const parsed = JSON.parse(existingRaw)
      if (Array.isArray(parsed)) {
        bucket = parsed.filter(
          (item) => ModelsPayloadSchema.safeParse(item).success,
        ) as ModelsPayload[]
      }
    } catch {
      bucket = []
    }
  }
  bucket.push(payload)
  if (bucket.length > 120) {
    bucket = bucket.slice(-120)
  }
  await kv.put(key, JSON.stringify(bucket))
}

function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

function cutoffMonth(monthsToKeep: number): string {
  const now = new Date()
  now.setUTCMonth(now.getUTCMonth() - monthsToKeep)
  const year = now.getUTCFullYear().toString().padStart(4, "0")
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0")
  return `${year}-${month}`
}
