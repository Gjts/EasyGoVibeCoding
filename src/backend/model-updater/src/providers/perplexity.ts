import type { Env } from "../env"
import { buildSystemPrompt, buildUserPrompt, type PromptInput } from "../prompt"
import { extractJsonString, type LlmProvider, type ProviderResult } from "./types"

const API_URL = "https://api.perplexity.ai/chat/completions"
const DEFAULT_MODEL = "sonar-pro"

interface PerplexityResponse {
  choices?: Array<{
    message?: { content?: string }
  }>
}

export const PerplexityProvider: LlmProvider = {
  id: "perplexity",
  async fetchPayload(env: Env, input: PromptInput): Promise<ProviderResult> {
    const key = env.PERPLEXITY_API_KEY
    if (!key) {
      throw new Error(
        "PERPLEXITY_API_KEY missing. Set via `wrangler secret put PERPLEXITY_API_KEY`.",
      )
    }

    const model = env.LLM_MODEL || DEFAULT_MODEL
    const body = {
      model,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(input) },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => "")
      throw new Error(
        `Perplexity API ${res.status} ${res.statusText}: ${errText.slice(0, 300)}`,
      )
    }

    const data = (await res.json()) as PerplexityResponse
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      throw new Error("Perplexity response missing choices[0].message.content")
    }

    const jsonStr = extractJsonString(content)
    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(jsonStr)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "parse error"
      throw new Error(`Perplexity returned invalid JSON: ${msg}`)
    }

    return {
      sourceLabel: `perplexity-${model}`,
      rawText: content,
      parsedJson,
    }
  },
}
