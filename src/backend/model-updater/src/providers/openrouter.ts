import type { Env } from "../env"
import { buildSystemPrompt, buildUserPrompt, type PromptInput } from "../prompt"
import { extractJsonString, type LlmProvider, type ProviderResult } from "./types"

const API_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODELS_API_URL = "https://openrouter.ai/api/v1/models"
const DEFAULT_MODELS = [
  "openrouter/free",
  "openai/gpt-oss-120b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
]
const DEFAULT_SITE_URL = "https://easy-go-vibe-coding.pages.dev"
const DEFAULT_APP_TITLE = "EasyGoVibeCoding"
const DEFAULT_MODEL_TIMEOUT_MS = 14_000
const MAX_OUTPUT_TOKENS = 5_000

interface OpenRouterResponse {
  choices?: Array<{
    message?: { content?: string }
  }>
}

interface OpenRouterModelEntry {
  id?: string
  name?: string
  created?: number
  description?: string
  context_length?: number
  pricing?: {
    prompt?: string
    completion?: string
  }
  architecture?: {
    input_modalities?: string[]
    output_modalities?: string[]
  }
}

interface OpenRouterModelsResponse {
  data?: OpenRouterModelEntry[]
}

interface CatalogModel {
  id: string
  name: string
  createdDate: string
  contextWindow: number | "unknown"
  promptPrice?: string
  completionPrice?: string
  modalities?: string[]
  description?: string
  url: string
}

export const OpenRouterProvider: LlmProvider = {
  id: "openrouter",
  async fetchPayload(env: Env, input: PromptInput): Promise<ProviderResult> {
    const key = env.OPENROUTER_API_KEY?.trim()
    if (!key) {
      throw new Error(
        "OPENROUTER_API_KEY missing. Set via `wrangler secret put OPENROUTER_API_KEY`.",
      )
    }

    const models = resolveModelCandidates(env)
    const timeoutMs = resolveModelTimeout(env)
    const catalog = await fetchCatalogSnapshot(key)
    const catalogContext = formatCatalogContext(catalog)
    let lastError: unknown = null
    const errors: string[] = []

    for (const model of models) {
      try {
        return await fetchWithModel(env, input, key, model, timeoutMs, catalogContext)
      } catch (error) {
        lastError = error
        errors.push(`${model}: ${errorMessage(error)}`)
      }
    }

    if (catalog.length > 0) {
      return buildCatalogFallback(input, catalog, errors)
    }

    const message = errorMessage(lastError)
    const details = errors.join(" | ").slice(0, 800)
    throw new Error(`OpenRouter model fallback exhausted: ${message}; ${details}`)
  },
}

function resolveModelCandidates(env: Env): string[] {
  const configured = [
    env.LLM_MODEL,
    ...(env.LLM_MODEL_FALLBACKS?.split(",") || []),
  ]
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item))

  const models = configured.length > 0 ? configured : DEFAULT_MODELS
  return Array.from(new Set(models))
}

function resolveModelTimeout(env: Env): number {
  const parsed = Number.parseInt(env.OPENROUTER_MODEL_TIMEOUT_MS || "", 10)
  if (Number.isNaN(parsed) || parsed < 5_000) return DEFAULT_MODEL_TIMEOUT_MS
  return Math.min(parsed, 30_000)
}

async function fetchWithModel(
  env: Env,
  input: PromptInput,
  key: string,
  model: string,
  timeoutMs: number,
  catalogContext: string,
): Promise<ProviderResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const body = {
      model,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: `${buildUserPrompt(input)}\n\n${catalogContext}` },
      ],
      temperature: 0.1,
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "HTTP-Referer": env.OPENROUTER_SITE_URL || DEFAULT_SITE_URL,
        "X-OpenRouter-Title": env.OPENROUTER_APP_TITLE || DEFAULT_APP_TITLE,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => "")
      throw new Error(
        `OpenRouter API ${res.status} ${res.statusText}: ${errText.slice(0, 300)}`,
      )
    }

    const data = (await res.json()) as OpenRouterResponse
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      throw new Error("OpenRouter response missing choices[0].message.content")
    }

    const jsonStr = extractJsonString(content)
    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(jsonStr)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "parse error"
      throw new Error(`OpenRouter returned invalid JSON: ${msg}`)
    }

    return {
      sourceLabel: `openrouter-${model}`,
      rawText: content,
      parsedJson,
    }
  } finally {
    clearTimeout(timer)
  }
}

async function fetchCatalogSnapshot(key: string): Promise<CatalogModel[]> {
  try {
    const response = await fetch(MODELS_API_URL, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    })
    if (!response.ok) return []

    const json = (await response.json()) as OpenRouterModelsResponse
    return (json.data || [])
      .filter((model) => model.id && model.name)
      .filter((model) => model.architecture?.output_modalities?.includes("text"))
      .sort((a, b) => (b.created || 0) - (a.created || 0))
      .slice(0, 36)
      .map((model) => ({
        id: model.id || "",
        name: model.name || model.id || "",
        createdDate: model.created
          ? new Date(model.created * 1000).toISOString().slice(0, 10)
          : "unknown",
        contextWindow: model.context_length || ("unknown" as const),
        promptPrice: model.pricing?.prompt,
        completionPrice: model.pricing?.completion,
        modalities: model.architecture?.input_modalities,
        description: model.description?.slice(0, 260),
        url: `https://openrouter.ai/${model.id}`,
      }))
  } catch {
    return []
  }
}

function formatCatalogContext(catalog: CatalogModel[]): string {
  if (catalog.length === 0) {
    return "OpenRouter 模型目录快照：获取失败，请仅根据可确认信息输出。"
  }

  const promptModels = catalog.slice(0, 24)
  return [
    "OpenRouter 官方模型目录快照（来自 https://openrouter.ai/api/v1/models）：",
    "请优先根据下列快照识别最近发布/更新的主流模型；url 可使用条目中的 OpenRouter 模型页。",
    JSON.stringify(promptModels, null, 2),
  ].join("\n")
}

function buildCatalogFallback(
  input: PromptInput,
  catalog: CatalogModel[],
  errors: string[],
): ProviderResult {
  const nowDate = input.nowISO.slice(0, 10)
  const selectedModels = catalog.slice(0, 8)
  const selectedNews = catalog.slice(0, 10)
  const payload = {
    updatedAt: input.nowISO,
    source: "openrouter-catalog",
    models: selectedModels.map((model, index) => {
      const provider = inferProvider(model.id)
      const releaseDate = model.createdDate === "unknown" ? nowDate : model.createdDate
      return {
        provider,
        name: model.name,
        releaseDate,
        contextWindow: formatContextWindow(model.contextWindow),
        highlights: buildHighlights(model),
        tier: index < 3 ? 1 : index < 6 ? 2 : 3,
        url: model.url,
        category: "model",
        tags: buildTags(model, provider),
        description:
          model.description?.slice(0, 190) ||
          "OpenRouter 官方模型目录收录的文本模型，可用于观察近期模型发布与可用性。",
      }
    }),
    news: selectedNews.map((model) => {
      const provider = inferProvider(model.id)
      const date = model.createdDate === "unknown" ? nowDate : model.createdDate
      return {
        date,
        provider,
        title: `${model.name} 被 OpenRouter 官方目录收录`,
        summary: `${model.name} 当前在 OpenRouter 官方模型目录可见，模型 ID 为 ${model.id}，上下文窗口为 ${formatContextWindow(
          model.contextWindow,
        )}。`,
        url: model.url,
      }
    }),
  }

  const rawText = JSON.stringify(
    {
      ...payload,
      fallbackReason: errors.join(" | ").slice(0, 800),
    },
    null,
    2,
  )

  return {
    sourceLabel: "openrouter-catalog",
    rawText,
    parsedJson: payload,
  }
}

function inferProvider(modelId: string): string {
  const vendor = modelId.split("/")[0]?.toLowerCase() || "other"
  const known: Record<string, string> = {
    anthropic: "Anthropic",
    openai: "OpenAI",
    google: "Google",
    "google-ai-studio": "Google",
    "meta-llama": "Meta",
    "x-ai": "xAI",
    deepseek: "DeepSeek",
    qwen: "Alibaba",
    alibaba: "Alibaba",
    moonshotai: "Moonshot",
    moonshot: "Moonshot",
    "z-ai": "Zhipu",
    zhipu: "Zhipu",
  }

  return known[vendor] || vendor.replace(/(^|-)([a-z])/g, (_, sep: string, char: string) =>
    `${sep ? " " : ""}${char.toUpperCase()}`,
  )
}

function formatContextWindow(value: CatalogModel["contextWindow"]): string {
  if (value === "unknown") return "unknown"
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return String(value)
}

function buildHighlights(model: CatalogModel): string[] {
  const highlights = [
    `OpenRouter 模型 ID：${model.id}`,
    `上下文窗口：${formatContextWindow(model.contextWindow)}`,
  ]

  if (model.promptPrice && model.completionPrice) {
    highlights.push(`OpenRouter 标价：输入 ${model.promptPrice} / 输出 ${model.completionPrice}`)
  }

  if (model.modalities && model.modalities.length > 0) {
    highlights.push(`输入模态：${model.modalities.join(", ")}`)
  }

  return highlights.slice(0, 4)
}

function buildTags(model: CatalogModel, provider: string): string[] {
  const parts = model.id.split("/")
  const slug = parts[1] || parts[0] || "model"
  const tags = [provider, "OpenRouter", slug.split(":")[0]]

  if (slug.includes("free") || model.promptPrice === "0") {
    tags.push("free")
  }

  return Array.from(new Set(tags)).slice(0, 6)
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
