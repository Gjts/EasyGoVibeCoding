import {
  buildSponsorInquiryHtml,
  isValidSponsorEmail,
  parseSponsorInquiry,
} from "../_shared/sponsor-inquiry.ts"
import { readBodyWithinLimit } from "../_shared/sponsor-event.ts"

interface Env {
  RESEND_API_KEY?: string
  SPONSOR_INBOX_EMAIL?: string
}

interface SponsorEmailConfiguration {
  apiKey: string
  inboxEmail: string
}

const MAX_BODY_BYTES = 8192
const RESEND_EMAILS_URL = "https://api.resend.com/emails"

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

function accepted(): Response {
  return json({ success: true }, 202)
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  return origin === new URL(request.url).origin
}

function hasJsonMediaType(request: Request): boolean {
  const mediaType = (request.headers.get("content-type") || "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase()
  return mediaType === "application/json"
}

function getEmailConfiguration(env: Env): SponsorEmailConfiguration | null {
  if (
    typeof env.RESEND_API_KEY !== "string" ||
    typeof env.SPONSOR_INBOX_EMAIL !== "string"
  ) {
    return null
  }

  const apiKey = env.RESEND_API_KEY.trim()
  const inboxEmail = env.SPONSOR_INBOX_EMAIL.trim().toLowerCase()
  if (
    !apiKey ||
    /[\u0000-\u001f\u007f]/.test(apiKey) ||
    /[\u0000-\u001f\u007f]/.test(env.SPONSOR_INBOX_EMAIL) ||
    !isValidSponsorEmail(inboxEmail)
  ) {
    return null
  }

  return { apiKey, inboxEmail }
}

function getHoneypot(input: unknown): string | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return ""

  const website = (input as Record<string, unknown>).website
  if (website === undefined) return ""
  return typeof website === "string" ? website.trim() : null
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  if (!hasSameOrigin(request)) {
    return json({ error: "Forbidden" }, 403)
  }
  if (!hasJsonMediaType(request)) {
    return json({ error: "Invalid request" }, 400)
  }

  let rawBody: string | null
  try {
    rawBody = await readBodyWithinLimit(request.body, MAX_BODY_BYTES)
  } catch {
    return json({ error: "Invalid request" }, 400)
  }
  if (rawBody === null) {
    return json({ error: "Payload too large" }, 413)
  }

  let input: unknown
  try {
    input = JSON.parse(rawBody) as unknown
  } catch {
    return json({ error: "Invalid request" }, 400)
  }

  const configuration = getEmailConfiguration(env)
  if (!configuration) {
    return json({ error: "Internal server error" }, 500)
  }

  const honeypot = getHoneypot(input)
  const inquiry = parseSponsorInquiry(input)
  if (honeypot === null || !inquiry) {
    return json({ error: "Invalid request" }, 400)
  }
  if (honeypot) return accepted()

  let providerResponse: Response
  try {
    providerResponse = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "EasyGoVibeCoding Sponsor <onboarding@resend.dev>",
        to: [configuration.inboxEmail],
        reply_to: inquiry.email,
        subject: `[广告合作] ${inquiry.company} / ${inquiry.productName}`,
        html: buildSponsorInquiryHtml(inquiry),
      }),
    })
    await providerResponse.text()
  } catch {
    return json({ error: "Upstream email service unavailable" }, 502)
  }

  if (!providerResponse.ok) {
    return json({ error: "Upstream email service unavailable" }, 502)
  }

  return accepted()
}
