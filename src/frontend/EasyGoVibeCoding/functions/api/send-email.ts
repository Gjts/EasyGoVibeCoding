interface Env {
  RESEND_API_KEY?: string
  FEEDBACK_KV?: KVNamespace
  SITE_STATS_KV?: KVNamespace
}

interface EmailPayload {
  from: string
  to: string[]
  reply_to?: string
  subject: string
  html: string
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

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

const OWNER_EMAIL = "1301385382gjts@gmail.com"
const FEEDBACK_CONSENT_VERSION = "email-feedback-public-v1"
const PENDING_FEEDBACK_TTL_SECONDS = 60 * 60 * 24 * 14
const PENDING_PREFIX = "email-feedback:pending:"

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

function normalizeText(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function redactPrivateText(value: string): string {
  return value
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[邮箱已隐藏]")
    .replace(/https?:\/\/\S+/g, "[链接已隐藏]")
    .replace(/\b(?:\+?\d[\d\s-]{7,}\d)\b/g, "[联系方式已隐藏]")
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatReceivedAt(value: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(value))
    .replace(/\//g, "-")
}

function createFeedbackToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  )
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

function createPublicFeedbackItem({
  id,
  name,
  message,
  submittedAt,
}: {
  id: string
  name: string
  message: string
  submittedAt: string
}): PublicFeedbackItem {
  return {
    id,
    displayName:
      redactPrivateText(normalizeText(name, 24)) || "邮箱反馈用户",
    role: "邮箱确认用户",
    excerpt:
      redactPrivateText(normalizeText(message, 180)) ||
      "这条反馈已完成邮箱确认，但公开摘录内容为空。",
    receivedAt: formatReceivedAt(submittedAt),
    source: "email",
  }
}

function getFeedbackKv(env: Env): KVNamespace | undefined {
  return env.FEEDBACK_KV || env.SITE_STATS_KV
}

async function sendEmail(apiKey: string, payload: EmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const responseText = await response.text()
  let responseData: { id?: string; message?: string } | null = null
  if (responseText) {
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = null
    }
  }

  if (!response.ok) {
    const details =
      responseData?.message || responseText || `HTTP ${response.status}`
    throw new Error(details)
  }

  return responseData
}

function buildOwnerEmailHtml({
  name,
  email,
  message,
  allowPublicDisplay,
  publicDisplayStatus,
}: {
  name: string
  email: string
  message: string
  allowPublicDisplay: boolean
  publicDisplayStatus: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
        EasyGoVibeCoding 新消息
      </h2>
      <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>姓名 / Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>邮箱 / Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>允许脱敏后公开展示 / Public display allowed:</strong> ${allowPublicDisplay ? "是 / Yes" : "否 / No"}</p>
        <p><strong>公开展示状态 / Public display status:</strong> ${escapeHtml(publicDisplayStatus)}</p>
        <p><strong>消息 / Message:</strong></p>
        <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4;">${escapeHtml(message)}</p>
      </div>
      <p style="color: #71717a; font-size: 12px;">
        This message was sent from EasyGoVibeCoding contact form (Cloudflare Pages Function).
      </p>
    </div>
  `
}

function buildConfirmationEmailHtml({
  displayName,
  excerpt,
  confirmUrl,
  expiresAt,
}: {
  displayName: string
  excerpt: string
  confirmUrl: string
  expiresAt: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
      <h2 style="color: #2563eb;">确认公开展示你的反馈</h2>
      <p>你在 EasyGoVibeCoding 反馈表单中勾选了“允许脱敏后公开展示”。请确认下面这条摘录可以展示在网站的反馈滚动区。</p>
      <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p><strong>展示称呼：</strong>${escapeHtml(displayName)}</p>
        <p><strong>公开摘录：</strong>${escapeHtml(excerpt)}</p>
      </div>
      <p>
        <a href="${escapeHtml(confirmUrl)}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700;">
          确认允许公开展示
        </a>
      </p>
      <p style="font-size: 13px; color: #64748b;">确认链接有效期至 ${escapeHtml(formatReceivedAt(expiresAt))}。如果你没有提交过反馈，忽略这封邮件即可。</p>
    </div>
  `
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  try {
    const apiKey = env.RESEND_API_KEY

    if (!apiKey) {
      return json(
        {
          error: "Email service is not configured",
          details:
            "RESEND_API_KEY environment variable is missing. Please configure it in Cloudflare Pages settings.",
        },
        { status: 500 },
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return json({ error: "Invalid request body" }, { status: 400 })
    }

    const name = normalizeText(body.name, 80)
    const email = normalizeText(body.email, 160).toLowerCase()
    const message = normalizeText(body.message, 2000)
    const allowPublicDisplay = Boolean(body.allowPublicDisplay)

    if (!name || !email || !message) {
      return json(
        {
          error: "Missing required fields",
          details: `Missing: ${!name ? "name " : ""}${!email ? "email " : ""}${!message ? "message" : ""}`.trim(),
        },
        { status: 400 },
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email format" }, { status: 400 })
    }

    const kv = getFeedbackKv(env)
    const submittedAt = new Date().toISOString()
    let publicDisplayStatus = allowPublicDisplay
      ? "等待用户邮箱确认 / Waiting for email confirmation"
      : "未请求公开展示 / Not requested"
    let confirmationPayload: EmailPayload | undefined

    if (allowPublicDisplay) {
      if (!kv) {
        publicDisplayStatus =
          "公开反馈 KV 未配置，暂不进入滚动展示 / Feedback KV is not configured"
      } else {
        const token = createFeedbackToken()
        const tokenHash = await sha256(token)
        const expiresAt = new Date(
          Date.now() + PENDING_FEEDBACK_TTL_SECONDS * 1000,
        ).toISOString()
        const item = createPublicFeedbackItem({
          id: `email-${tokenHash.slice(0, 16)}`,
          name,
          message,
          submittedAt,
        })
        const pending: PendingFeedbackRecord = {
          tokenHash,
          email,
          item,
          consentVersion: FEEDBACK_CONSENT_VERSION,
          submittedAt,
          expiresAt,
        }
        const confirmUrl = new URL(
          `/api/feedback/confirm?token=${token}`,
          request.url,
        ).toString()

        await kv.put(`${PENDING_PREFIX}${tokenHash}`, JSON.stringify(pending), {
          expirationTtl: PENDING_FEEDBACK_TTL_SECONDS,
        })

        confirmationPayload = {
          from: "EasyGoVibeCoding Contact <onboarding@resend.dev>",
          to: [email],
          subject: "确认公开展示你的 EasyGoVibeCoding 反馈",
          html: buildConfirmationEmailHtml({
            displayName: item.displayName,
            excerpt: item.excerpt,
            confirmUrl,
            expiresAt,
          }),
        }
      }
    }

    const data = await sendEmail(apiKey, {
      from: "EasyGoVibeCoding Contact <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: `[EasyGoVibeCoding] New message from ${name}`,
      html: buildOwnerEmailHtml({
        name,
        email,
        message,
        allowPublicDisplay,
        publicDisplayStatus,
      }),
    })

    if (confirmationPayload) {
      await sendEmail(apiKey, confirmationPayload)
    }

    return json({
      success: true,
      data,
      publicDisplayStatus: allowPublicDisplay
        ? "confirmation_required"
        : "not_requested",
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error"
    return json(
      {
        error: "Internal server error",
        details: message,
      },
      { status: 500 },
    )
  }
}
