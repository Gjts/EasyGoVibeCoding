import { z } from "zod"

interface Env {
  SUPER_INDIVIDUAL_AI_BASE_URL?: string
  SUPER_INDIVIDUAL_AI_API_KEY?: string
  SUPER_INDIVIDUAL_AI_MODEL?: string
}

interface HandlerContext {
  request: Request
  env: Env
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
}

const requestSchema = z.object({
  locale: z.string().trim().min(2).max(16),
  stageId: z.enum([
    "discover", "validate", "mvp", "build", "backend",
    "deploy", "payments", "analytics", "automation", "iterate",
  ]),
  answers: z
    .record(z.string().max(8_000))
    .refine((value) => Object.keys(value).length <= 20, "Too many answers"),
  candidateTools: z.array(z.string().trim().min(1).max(80)).max(3),
  action: z.enum(["feedback", "questions", "summary"]),
})

const coachResponseSchema = z.object({
  feedback: z.string().trim().min(1).max(4_000),
  followUpQuestions: z.array(z.string().trim().min(1).max(500)).max(5),
  missingConsiderations: z.array(z.string().trim().min(1).max(500)).max(8),
  suggestedArtifact: z.string().trim().min(1).max(4_000),
  disclaimer: z.string().trim().max(1_000).optional(),
})

const openAIResponseSchema = z.object({
  choices: z.array(
    z.object({ message: z.object({ content: z.string() }) }),
  ).min(1),
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS },
  })
}

function safeBaseUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const parsed = new URL(value)
    if (parsed.protocol !== "https:") return null
    return parsed.toString().replace(/\/+$/, "")
  } catch {
    return null
  }
}

function systemPrompt(locale: string): string {
  return [
    "You are the EasyGoVibeCoding solo-product course coach.",
    `Reply in locale ${locale} as one JSON object only.`,
    "Explain tradeoffs and ask evidence-seeking questions.",
    "Never guarantee payment eligibility, account approval, legal compliance, tax treatment, or financial outcomes.",
    "Treat candidate tools as the only tools you may discuss.",
    "Return keys: feedback, followUpQuestions, missingConsiderations, suggestedArtifact, disclaimer.",
  ].join(" ")
}

export function createCoachHandler({
  fetchImpl = fetch,
}: {
  fetchImpl?: typeof fetch
} = {}) {
  return async ({ request, env }: HandlerContext): Promise<Response> => {
    const baseUrl = safeBaseUrl(env.SUPER_INDIVIDUAL_AI_BASE_URL)
    const apiKey = env.SUPER_INDIVIDUAL_AI_API_KEY?.trim()
    if (!baseUrl || !apiKey) {
      return json({ success: false, code: "unconfigured" }, 503)
    }

    let raw = ""
    try {
      raw = await request.text()
    } catch {
      return json({ success: false, code: "invalid-request" }, 400)
    }
    if (new TextEncoder().encode(raw).byteLength > 16_384) {
      return json({ success: false, code: "request-too-large" }, 413)
    }

    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(raw)
    } catch {
      return json({ success: false, code: "invalid-json" }, 400)
    }
    const parsed = requestSchema.safeParse(parsedJson)
    if (!parsed.success) {
      return json({ success: false, code: "invalid-request" }, 400)
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20_000)
    try {
      const response = await fetchImpl(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: env.SUPER_INDIVIDUAL_AI_MODEL?.trim() || "gpt-5.4-mini",
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt(parsed.data.locale) },
            { role: "user", content: JSON.stringify(parsed.data) },
          ],
        }),
      })
      if (!response.ok) {
        return json(
          { success: false, code: response.status === 429 ? "rate-limited" : "upstream-failed" },
          response.status === 429 ? 429 : 502,
        )
      }
      const upstream = openAIResponseSchema.safeParse(await response.json())
      if (!upstream.success) return json({ success: false, code: "invalid-response" }, 502)

      let content: unknown
      try {
        content = JSON.parse(upstream.data.choices[0].message.content)
      } catch {
        return json({ success: false, code: "invalid-response" }, 502)
      }
      const coach = coachResponseSchema.safeParse(content)
      if (!coach.success) return json({ success: false, code: "invalid-response" }, 502)
      return json({ success: true, data: coach.data })
    } catch (error) {
      const code = error instanceof DOMException && error.name === "AbortError" ? "timeout" : "upstream-failed"
      return json({ success: false, code }, code === "timeout" ? 504 : 502)
    } finally {
      clearTimeout(timeout)
    }
  }
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: CORS_HEADERS })

export const onRequestPost = createCoachHandler({ fetchImpl: fetch })
