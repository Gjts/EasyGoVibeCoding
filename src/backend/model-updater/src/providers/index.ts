import type { Env, ProviderId } from "../env"
import { resolveProvider } from "../env"
import { AnthropicProvider } from "./anthropic"
import { PerplexityProvider } from "./perplexity"
import type { LlmProvider } from "./types"

const REGISTRY: Record<ProviderId, LlmProvider> = {
  perplexity: PerplexityProvider,
  anthropic: AnthropicProvider,
  openai: PerplexityProvider,
  gemini: PerplexityProvider,
}

export function pickProvider(env: Env): LlmProvider {
  const id = resolveProvider(env)
  const provider = REGISTRY[id]
  if (!provider) {
    throw new Error(`No provider registered for id=${id}`)
  }
  return provider
}

export type { LlmProvider } from "./types"
