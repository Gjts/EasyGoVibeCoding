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

interface PendingFeedbackRecord {
  tokenHash: string
  email: string
  item: PublicFeedbackItem
  consentVersion: string
  submittedAt: string
  expiresAt: string
}

const PENDING_PREFIX = "email-feedback:pending:"
const CONFIRMED_PREFIX = "email-feedback:confirmed:"
const CONFIRMED_INDEX_KEY = "email-feedback:confirmed:index"

function getFeedbackKv(env: Env): KVNamespace | undefined {
  return env.FEEDBACK_KV || env.SITE_STATS_KV
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

function htmlPage(title: string, message: string, status = 200) {
  return new Response(
    `<!doctype html>
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>
          body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #eff6ff, #faf5ff, #fdf2f8); color: #111827; }
          main { width: min(92vw, 560px); border: 1px solid rgba(255,255,255,.8); border-radius: 24px; padding: 32px; background: rgba(255,255,255,.86); box-shadow: 0 24px 80px rgba(15,23,42,.12); }
          h1 { margin: 0 0 12px; font-size: 28px; }
          p { line-height: 1.8; color: #475569; }
          a { display: inline-block; margin-top: 16px; border-radius: 999px; padding: 10px 16px; background: #2563eb; color: white; text-decoration: none; font-weight: 700; }
        </style>
      </head>
      <body>
        <main>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(message)}</p>
          <a href="/">返回首页</a>
        </main>
      </body>
    </html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  )
}

function isPendingFeedbackRecord(
  value: unknown,
): value is PendingFeedbackRecord {
  if (!value || typeof value !== "object") return false

  const record = value as Partial<PendingFeedbackRecord>
  return (
    typeof record.tokenHash === "string" &&
    typeof record.email === "string" &&
    typeof record.submittedAt === "string" &&
    typeof record.expiresAt === "string" &&
    typeof record.item?.id === "string" &&
    typeof record.item.displayName === "string" &&
    typeof record.item.role === "string" &&
    typeof record.item.excerpt === "string" &&
    typeof record.item.receivedAt === "string" &&
    record.item.source === "email"
  )
}

async function readConfirmedIndex(kv: KVNamespace): Promise<string[]> {
  const raw = (await kv.get(CONFIRMED_INDEX_KEY, {
    type: "json",
  })) as string[] | null

  return Array.isArray(raw)
    ? raw.filter((id) => typeof id === "string" && id.length > 0)
    : []
}

async function addConfirmedFeedback(kv: KVNamespace, item: PublicFeedbackItem) {
  const index = await readConfirmedIndex(kv)
  const nextIndex = [item.id, ...index.filter((id) => id !== item.id)].slice(
    0,
    100,
  )

  await Promise.all([
    kv.put(`${CONFIRMED_PREFIX}${item.id}`, JSON.stringify(item)),
    kv.put(CONFIRMED_INDEX_KEY, JSON.stringify(nextIndex)),
  ])
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
    return htmlPage(
      "反馈存储未配置",
      "当前站点还没有绑定 FEEDBACK_KV，无法完成公开展示确认。",
      500,
    )
  }

  const token = new URL(request.url).searchParams.get("token")
  if (!token) {
    return htmlPage("确认链接无效", "缺少确认 token，无法公开展示反馈。", 400)
  }

  const tokenHash = await sha256(token)
  const pending = (await kv.get(`${PENDING_PREFIX}${tokenHash}`, {
    type: "json",
  })) as unknown

  if (!isPendingFeedbackRecord(pending)) {
    return htmlPage(
      "确认链接已失效",
      "这条反馈可能已经确认、过期，或确认链接不完整。",
      404,
    )
  }

  if (new Date(pending.expiresAt).getTime() < Date.now()) {
    await kv.delete(`${PENDING_PREFIX}${tokenHash}`)
    return htmlPage("确认链接已过期", "请重新提交反馈并勾选公开展示授权。", 410)
  }

  await addConfirmedFeedback(kv, pending.item)
  await kv.delete(`${PENDING_PREFIX}${tokenHash}`)

  return htmlPage(
    "反馈展示授权已确认",
    "你的反馈已完成邮箱确认，并会以脱敏摘录的形式出现在网站反馈滚动区。",
  )
}
