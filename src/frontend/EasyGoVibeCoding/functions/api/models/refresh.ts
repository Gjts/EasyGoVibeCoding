/**
 * Pages Function: POST /api/models/refresh
 *
 * 手动触发 model-updater Worker 更新 KV，并在同一个响应里返回最新
 * models:latest。生产环境需要配置：
 * - MODEL_UPDATER service binding: 内部调用 model-updater Worker
 * - MODEL_UPDATER_TOKEN: 与 model-updater Worker RUN_TOKEN 一致
 * - MODEL_UPDATER_URL: 可选 fallback，未配置 service binding 时使用
 */

interface Env {
  SITE_STATS_KV?: KVNamespace
  MODEL_UPDATER?: {
    fetch(input: Request | string, init?: RequestInit): Promise<Response>
  }
  MODEL_UPDATER_URL?: string
  MODEL_UPDATER_TOKEN?: string
}

type MinimalPayload = {
  updatedAt: string
  source: string
  models: Array<Record<string, unknown>>
  news?: Array<Record<string, unknown>>
}

type UpdaterOutcome = {
  status?: string
  nowISO?: string
  source?: string
  modelsCount?: number
  newsCount?: number
  error?: string
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

const LATEST_KEY = "models:latest"
const REFRESH_TIMEOUT_MS = 90_000

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...(init?.headers || {}),
    },
  })
}

function isValidPayload(value: unknown): value is MinimalPayload {
  if (!value || typeof value !== "object") return false

  const item = value as Partial<MinimalPayload>
  return (
    typeof item.updatedAt === "string" &&
    typeof item.source === "string" &&
    Array.isArray(item.models) &&
    item.models.length > 0
  )
}

function readRefreshConfig(env: Env) {
  const updaterUrl = env.MODEL_UPDATER_URL?.trim()
  const token = env.MODEL_UPDATER_TOKEN?.trim()

  if (!token || (!env.MODEL_UPDATER && !updaterUrl)) {
    return {
      ok: false as const,
      response: json(
        {
          error: "Model refresh is not configured",
          details:
            "Set MODEL_UPDATER service binding and MODEL_UPDATER_TOKEN in Cloudflare Pages.",
        },
        { status: 501 },
      ),
    }
  }

  return { ok: true as const, service: env.MODEL_UPDATER, updaterUrl, token }
}

async function postUpdater({
  service,
  updaterUrl,
  token,
}: {
  service?: Env["MODEL_UPDATER"]
  updaterUrl?: string
  token: string
}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS)

  try {
    const target = updaterUrl || "https://model-updater/__run"
    const fetcher = service || { fetch }
    const response = await fetcher.fetch(target, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    })

    const text = await response.text()
    let outcome: UpdaterOutcome | null = null
    if (text) {
      try {
        outcome = JSON.parse(text) as UpdaterOutcome
      } catch {
        outcome = { error: text.slice(0, 500) }
      }
    }

    if (!response.ok || outcome?.status !== "updated") {
      return {
        ok: false as const,
        response: json(
          {
            error: "Model updater failed",
            status: response.status,
            outcome,
          },
          { status: 502 },
        ),
      }
    }

    return { ok: true as const, outcome }
  } finally {
    clearTimeout(timer)
  }
}

async function readLatestPayload(kv: KVNamespace) {
  const raw = await kv.get(LATEST_KEY)
  if (!raw) {
    return {
      ok: false as const,
      response: json(
        {
          error: "models:latest not found after refresh",
          details: "Updater completed but KV does not contain models:latest.",
        },
        { status: 502 },
      ),
    }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {
      ok: false as const,
      response: json(
        { error: "Stored models:latest is not valid JSON" },
        { status: 502 },
      ),
    }
  }

  if (!isValidPayload(parsed)) {
    return {
      ok: false as const,
      response: json(
        { error: "Stored models:latest failed shape check" },
        { status: 502 },
      ),
    }
  }

  return { ok: true as const, payload: parsed }
}

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export const onRequestPost = async ({ env }: { env: Env }) => {
  if (!env.SITE_STATS_KV) {
    return json(
      {
        error: "SITE_STATS_KV is not configured",
        hint: "Bind SITE_STATS_KV namespace in Cloudflare Pages project.",
      },
      { status: 500 },
    )
  }

  const config = readRefreshConfig(env)
  if (!config.ok) return config.response

  const updater = await postUpdater(config)
  if (!updater.ok) return updater.response

  const latest = await readLatestPayload(env.SITE_STATS_KV)
  if (!latest.ok) return latest.response

  return json(
    {
      success: true,
      refreshed: true,
      outcome: updater.outcome,
      data: latest.payload,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}
