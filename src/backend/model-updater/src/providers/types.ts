import type { ModelsPayload } from "../../../../frontend/EasyGoVibeCoding/lib/model-schema"
import type { Env } from "../env"
import type { PromptInput } from "../prompt"

export interface ProviderResult {
  /** provider 唯一标识，写入 payload.source */
  sourceLabel: string
  /** 未经 zod 校验的原始返回字符串（用于失败时排查） */
  rawText: string
  /** 已解析但未经 zod 校验的对象（上层会再 parse） */
  parsedJson: unknown
}

export interface LlmProvider {
  readonly id: "perplexity" | "anthropic" | "openai" | "gemini"
  /** 调用 LLM API，要求返回 JSON；上层负责 zod 校验 */
  fetchPayload(env: Env, input: PromptInput): Promise<ProviderResult>
}

export interface ProviderRunContext {
  env: Env
  previousPayload: ModelsPayload | null
  nowISO: string
}

/** 从可能带 markdown 包裹的 LLM 输出中提取纯 JSON 字符串 */
export function extractJsonString(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.startsWith("{")) return trimmed

  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenceMatch && fenceMatch[1]) {
    return fenceMatch[1].trim()
  }

  const firstBrace = trimmed.indexOf("{")
  const lastBrace = trimmed.lastIndexOf("}")
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1)
  }

  return trimmed
}
