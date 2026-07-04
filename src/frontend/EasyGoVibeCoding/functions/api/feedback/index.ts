interface Env {
  FEEDBACK_KV?: KVNamespace
  SITE_STATS_KV?: KVNamespace
}

interface PublicFeedbackItem {
  id: string
  displayName: string
  role: string
  excerpt: string
  receivedAt: string
  source: "email"
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
}

const CONFIRMED_INDEX_KEY = "email-feedback:confirmed:index"
const CONFIRMED_PREFIX = "email-feedback:confirmed:"

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...(init?.headers || {}),
    },
  })
}

function getFeedbackKv(env: Env): KVNamespace | undefined {
  return env.FEEDBACK_KV || env.SITE_STATS_KV
}

function isPublicFeedbackItem(value: unknown): value is PublicFeedbackItem {
  if (!value || typeof value !== "object") return false

  const item = value as Partial<PublicFeedbackItem>
  return (
    typeof item.id === "string" &&
    typeof item.displayName === "string" &&
    typeof item.role === "string" &&
    typeof item.excerpt === "string" &&
    typeof item.receivedAt === "string" &&
    item.source === "email"
  )
}

async function readConfirmedIndex(kv: KVNamespace): Promise<string[]> {
  const raw = (await kv.get(CONFIRMED_INDEX_KEY, {
    type: "json",
  })) as string[] | null

  if (!Array.isArray(raw)) return []

  const seen = new Set<string>()
  return raw.filter((id) => {
    if (typeof id !== "string" || id.length === 0 || seen.has(id)) {
      return false
    }
    seen.add(id)
    return true
  })
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}

export const onRequestGet = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  const kv = getFeedbackKv(env)
  if (!kv) {
    return json({
      success: true,
      configured: false,
      data: [],
    })
  }

  const url = new URL(request.url)
  const limitValue = Number(url.searchParams.get("limit") || 24)
  const limit = Number.isFinite(limitValue)
    ? Math.min(Math.max(limitValue, 1), 36)
    : 24

  const ids = (await readConfirmedIndex(kv)).slice(0, limit)
  const values = await Promise.all(
    ids.map((id) => kv.get(`${CONFIRMED_PREFIX}${id}`, { type: "json" })),
  )
  const data = values.filter(isPublicFeedbackItem)

  return json({
    success: true,
    configured: true,
    data,
  })
}
