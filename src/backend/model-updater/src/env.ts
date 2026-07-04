/**
 * Worker 运行时注入的环境
 *
 * - SITE_STATS_KV：与 Pages 共享的 KV 命名空间
 * - LLM_PROVIDER：选择调用哪个 LLM，默认 openrouter
 * - *_API_KEY：通过 `wrangler secret put` 注入，不入库
 */
export interface Env {
  SITE_STATS_KV: KVNamespace;

  LLM_PROVIDER?: string;
  LLM_MODEL?: string;
  LLM_MODEL_FALLBACKS?: string;
  HISTORY_MONTHS_TO_KEEP?: string;

  PERPLEXITY_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_SITE_URL?: string;
  OPENROUTER_APP_TITLE?: string;
  OPENROUTER_MODEL_TIMEOUT_MS?: string;
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
  RUN_TOKEN?: string;
}

export type ProviderId =
  | "perplexity"
  | "anthropic"
  | "openrouter"
  | "openai"
  | "gemini"
  | "seed";

export function resolveProvider(env: Env): ProviderId {
  const raw = (env.LLM_PROVIDER || "openrouter").toLowerCase().trim();
  if (raw === "seed") return "seed";
  if (raw === "openrouter") return "openrouter";
  if (raw === "anthropic") return "anthropic";
  if (raw === "openai") return "openai";
  if (raw === "gemini") return "gemini";
  return "perplexity";
}

export function resolveHistoryMonths(env: Env): number {
  const raw = env.HISTORY_MONTHS_TO_KEEP;
  if (!raw) return 6;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 1) return 6;
  if (parsed > 36) return 36;
  return parsed;
}
