import type { Env } from "./env"
import { runUpdate } from "./updater"

/**
 * Cloudflare Worker 入口
 *
 * - scheduled: 由 [triggers] crons 每 6 小时触发
 * - fetch: 保留两个 HTTP 端点用于手动测试
 *     GET  /health   存活探针
 *     POST /__run    手动触发一次同步（可加 ?token= 鉴权，见 README）
 */

export default {
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(
      runUpdate(env).then((outcome) => {
        console.log("[model-updater] scheduled result:", JSON.stringify(outcome))
      }),
    )
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        ok: true,
        now: new Date().toISOString(),
        provider: env.LLM_PROVIDER || "perplexity",
        model: env.LLM_MODEL || "default",
      })
    }

    if (request.method === "POST" && url.pathname === "/__run") {
      const authError = authorizeRun(request, env)
      if (authError) return authError

      const outcome = await runUpdate(env)
      const status = outcome.status === "updated" ? 200 : 500
      return json(outcome, status)
    }

    return json(
      {
        error: "Not Found",
        hint: "GET /health | POST /__run",
      },
      404,
    )
  },
} satisfies ExportedHandler<Env>

function authorizeRun(request: Request, env: Env): Response | null {
  const expectedToken = env.RUN_TOKEN?.trim()

  if (!expectedToken) {
    return json(
      {
        error: "RUN_TOKEN is not configured",
        hint: "Set RUN_TOKEN as a Worker secret before exposing POST /__run",
      },
      503,
    )
  }

  const url = new URL(request.url)
  const bearer = request.headers.get("authorization") || ""
  const headerToken = bearer.startsWith("Bearer ") ? bearer.slice(7).trim() : ""
  const queryToken = url.searchParams.get("token")?.trim() || ""
  const provided = headerToken || queryToken

  if (provided !== expectedToken) {
    return json({ error: "Unauthorized" }, 401)
  }

  return null
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
