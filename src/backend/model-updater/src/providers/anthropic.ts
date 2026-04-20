import type { Env } from "../env"
import { buildSystemPrompt, buildUserPrompt, type PromptInput } from "../prompt"
import { extractJsonString, type LlmProvider, type ProviderResult } from "./types"

const API_URL = "https://api.anthropic.com/v1/messages"
const DEFAULT_MODEL = "claude-sonnet-4-5"
const ANTHROPIC_VERSION = "2023-06-01"

interface AnthropicTextBlock {
  type: string
  text?: string
}

interface AnthropicResponse {
  content?: AnthropicTextBlock[]
}

export const AnthropicProvider: LlmProvider = {
  id: "anthropic",
  async fetchPayload(env: Env, input: PromptInput): Promise<ProviderResult> {
    const key = env.ANTHROPIC_API_KEY
    if (!key) {
      throw new Error(
        "ANTHROPIC_API_KEY missing. Set via `wrangler secret put ANTHROPIC_API_KEY`.",
      )
    }

    const model = env.LLM_MODEL || DEFAULT_MODEL
    const body = {
      model,
      max_tokens: 4096,
      system: buildSystemPrompt(),
      temperature: 0.1,
      messages: [{ role: "user", content: buildUserPrompt(input) }],
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 5,
        },
      ],
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => "")
      throw new Error(
        `Anthropic API ${res.status} ${res.statusText}: ${errText.slice(0, 300)}`,
      )
    }

    const data = (await res.json()) as AnthropicResponse
    const textBlock = data.content?.find(
      (b) => b.type === "text" && typeof b.text === "string" && b.text.length > 0,
    )
    const content = textBlock?.text
    if (!content) {
      throw new Error("Anthropic response missing text content block")
    }

    const jsonStr = extractJsonString(content)
    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(jsonStr)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "parse error"
      throw new Error(`Anthropic returned invalid JSON: ${msg}`)
    }

    return {
      sourceLabel: `anthropic-${model}`,
      rawText: content,
      parsedJson,
    }
  },
}
