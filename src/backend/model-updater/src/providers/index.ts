import type { Env, ProviderId } from "../env"
import { resolveProvider } from "../env"
import { AnthropicProvider } from "./anthropic"
import { OpenRouterProvider } from "./openrouter"
import { PerplexityProvider } from "./perplexity"
import { SeedProvider } from "./seed"
import type { LlmProvider } from "./types"

const REGISTRY: Record<ProviderId, LlmProvider> = {
  perplexity: PerplexityProvider,
  anthropic: AnthropicProvider,
  openrouter: OpenRouterProvider,
  openai: SeedProvider,
  gemini: SeedProvider,
  seed: SeedProvider,
}

export function pickProvider(env: Env): LlmProvider {
  const id = resolveProvider(env)
  if (id === "perplexity" && !env.PERPLEXITY_API_KEY?.trim()) {
    return SeedProvider
  }
  if (id === "anthropic" && !env.ANTHROPIC_API_KEY?.trim()) {
    return SeedProvider
  }
  if (id === "openrouter" && !env.OPENROUTER_API_KEY?.trim()) {
    return SeedProvider
  }
  const provider = REGISTRY[id]
  if (!provider) {
    throw new Error(`No provider registered for id=${id}`)
  }
  return provider
}

export type { LlmProvider } from "./types"
