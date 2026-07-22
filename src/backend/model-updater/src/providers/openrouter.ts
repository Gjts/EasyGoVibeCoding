import type { Env } from "../env"
import { buildSystemPrompt, buildUserPrompt, type PromptInput } from "../prompt"
import { extractJsonString, type LlmProvider, type ProviderResult } from "./types"
import {
  fetchOpenAiReleases,
  openAiModelUrl,
  type OpenAiRelease,
} from "./openai-releases"

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
const OFFICIAL_SEARCH_DOMAINS = [
  "openai.com",
  "developers.openai.com",
  "anthropic.com",
  "platform.claude.com",
  "ai.google.dev",
  "blog.google",
  "alibabacloud.com",
  "qwenlm.github.io",
  "bigmodel.cn",
  "kimi.ai",
  "deepseek.com",
  "x.ai",
  "about.fb.com",
]
const PRIMARY_FLAGSHIP_PROVIDERS = ["anthropic", "openai", "x-ai", "google"]
const RELEASE_HISTORY_LIMIT = 60

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
  benchmarks?: {
    artificial_analysis?: {
      intelligence_index?: number | null
      coding_index?: number | null
      agentic_index?: number | null
    }
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
  intelligenceIndex?: number
  codingIndex?: number
  agenticIndex?: number
  url: string
  dateKind: "official-release" | "catalog-observed"
  releaseSourceUrl?: string
}

type ModelTier = 1 | 2 | 3

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
    const [catalogSnapshot, openAiReleases] = await Promise.all([
      fetchCatalogSnapshot(key),
      fetchOpenAiReleases(),
    ])
    const catalog = applyOpenAiReleaseMetadata(
      catalogSnapshot,
      openAiReleases,
    )
    const catalogContext = formatCatalogContext(catalog)
    let lastError: unknown = null
    const errors: string[] = []

    for (const model of models) {
      try {
        const result = await fetchWithModel(
          env,
          input,
          key,
          model,
          timeoutMs,
          catalogContext,
        )
        return attachCatalogReleases(result, catalog, input.nowISO)
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

function attachCatalogReleases(
  result: ProviderResult,
  catalog: CatalogModel[],
  nowISO: string,
): ProviderResult {
  if (!result.parsedJson || typeof result.parsedJson !== "object") return result
  const payload = result.parsedJson as Record<string, unknown>
  const generatedReleases = Array.isArray(payload.releases)
    ? payload.releases
    : []
  const catalogReleases = selectRecentReleases(catalog, nowISO).map((model) =>
    toModelEntry(model, nowISO),
  )

  return {
    ...result,
    parsedJson: {
      ...payload,
      releases: [...generatedReleases, ...catalogReleases].slice(0, 120),
    },
  }
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
      plugins: [
        {
          id: "web",
          max_results: 10,
          include_domains: OFFICIAL_SEARCH_DOMAINS,
          search_prompt:
            "仅使用下列厂商官方页面核验模型名称、发布日期、能力分层与来源链接。",
        },
      ],
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
      .filter(isConcreteCatalogModel)
      .filter((model) => model.architecture?.output_modalities?.includes("text"))
      .sort((a, b) => (b.created || 0) - (a.created || 0))
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
        intelligenceIndex:
          model.benchmarks?.artificial_analysis?.intelligence_index ?? undefined,
        codingIndex: model.benchmarks?.artificial_analysis?.coding_index ?? undefined,
        agenticIndex:
          model.benchmarks?.artificial_analysis?.agentic_index ?? undefined,
        url: `https://openrouter.ai/${model.id}`,
        dateKind: "catalog-observed" as const,
      }))
  } catch {
    return []
  }
}

function applyOpenAiReleaseMetadata(
  catalog: CatalogModel[],
  releases: Map<string, OpenAiRelease>,
): CatalogModel[] {
  return catalog.map((model) => {
    const openAiModelId = model.id.startsWith("openai/")
      ? model.id.slice("openai/".length)
      : ""
    const match = findOpenAiRelease(openAiModelId, releases)
    if (!match) return model
    const { release } = match
    return {
      ...model,
      createdDate: release.releaseDate,
      url: openAiModelUrl(openAiModelId),
      dateKind: "official-release",
      releaseSourceUrl: release.sourceUrl,
    }
  })
}

function findOpenAiRelease(
  modelId: string,
  releases: Map<string, OpenAiRelease>,
): { familyId: string; release: OpenAiRelease } | undefined {
  const exact = releases.get(modelId)
  if (exact) return { familyId: modelId, release: exact }

  const family = [...releases.entries()]
    .filter(([familyId]) =>
      new RegExp(`^${escapeRegex(familyId)}-(sol|terra|luna)$`).test(modelId),
    )
    .sort(([a], [b]) => b.length - a.length)[0]
  return family ? { familyId: family[0], release: family[1] } : undefined
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function isConcreteCatalogModel(model: OpenRouterModelEntry): boolean {
  const id = model.id?.toLowerCase() || ""
  const name = model.name?.toLowerCase() || ""
  const description = model.description?.toLowerCase() || ""

  if (id.startsWith("~")) return false
  if (id.endsWith("-latest") || id.includes("-latest:")) return false
  if (name.includes(" latest")) return false
  if (description.includes("always redirects")) return false

  return true
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
  const selectedModels = selectCapabilityRankedModels(catalog, 8)
  const selectedNews = catalog.slice(0, 10)
  const releases = selectRecentReleases(catalog, input.nowISO)
  const hasOfficialOpenAiData = catalog.some((model) =>
    model.url.startsWith("https://developers.openai.com/"),
  )
  const source = hasOfficialOpenAiData
    ? "openrouter-catalog+openai-official"
    : "openrouter-catalog"
  const payload = {
    updatedAt: input.nowISO,
    source,
    models: selectedModels.map((model) => toModelEntry(model, input.nowISO)),
    releases: releases.map((model) => toModelEntry(model, input.nowISO)),
    news: selectedNews.map((model) => {
      const provider = inferProvider(model.id)
      const date = releaseDateOrFallback(model, input.nowISO)
      const displayName = displayModelName(model, provider)
      const officialOpenAi = model.url.startsWith(
        "https://developers.openai.com/",
      )
      return {
        date,
        provider,
        title: officialOpenAi
          ? `${displayName} 由 OpenAI 官方发布源确认`
          : `${displayName} 被 OpenRouter 模型目录收录`,
        summary: officialOpenAi
          ? `${displayName} 的发布日期已由 OpenAI 官方产品发布源校验，模型 ID 为 ${model.id}。`
          : `${displayName} 当前在 OpenRouter 模型目录可见，模型 ID 为 ${model.id}，上下文窗口为 ${formatContextWindow(
              model.contextWindow,
            )}。`,
        url: model.releaseSourceUrl || model.url,
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
    sourceLabel: source,
    rawText,
    parsedJson: payload,
  }
}

function toModelEntry(model: CatalogModel, nowISO: string) {
  const provider = inferProvider(model.id)
  return {
    provider,
    name: displayModelName(model, provider),
    releaseDate: releaseDateOrFallback(model, nowISO),
    contextWindow: formatContextWindow(model.contextWindow),
    highlights: buildHighlights(model),
    tier: classifyTierByCapability(scoreModelCapability(model)),
    url: model.url,
    dateKind: model.dateKind,
    category: "model" as const,
    tags: buildTags(model, provider),
    description:
      model.description?.slice(0, 190) ||
      "模型目录收录的文本模型，可用于观察近期模型发布与可用性。",
  }
}

function releaseDateOrFallback(model: CatalogModel, nowISO: string): string {
  return model.createdDate === "unknown" ? nowISO.slice(0, 10) : model.createdDate
}

function selectRecentReleases(
  catalog: CatalogModel[],
  nowISO: string,
): CatalogModel[] {
  const cutoff = new Date(nowISO)
  cutoff.setUTCMonth(cutoff.getUTCMonth() - 6)
  const cutoffDate = cutoff.toISOString().slice(0, 10)

  const recent = catalog
    .filter((model) => model.createdDate !== "unknown")
    .filter((model) => model.createdDate >= cutoffDate)
  return dedupeCatalogAliases(recent).slice(0, RELEASE_HISTORY_LIMIT)
}

function dedupeCatalogAliases(catalog: CatalogModel[]): CatalogModel[] {
  const availableIds = new Set(
    catalog.map((model) => model.id.replace(/:.+$/, "")),
  )
  const selected = new Map<string, CatalogModel>()

  for (const model of catalog) {
    const baseId = model.id.replace(/:.+$/, "")
    const withoutPro = baseId.replace(/-pro$/, "")
    const key = availableIds.has(withoutPro) ? withoutPro : baseId
    const current = selected.get(key)
    if (!current || releaseQuality(model) > releaseQuality(current)) {
      selected.set(key, model)
    }
  }

  return [...selected.values()]
}

function releaseQuality(model: CatalogModel): number {
  let quality = model.dateKind === "official-release" ? 2 : 0
  if (!model.id.includes(":")) quality += 1
  if (!model.id.endsWith("-pro")) quality += 1
  return quality
}

function selectCapabilityRankedModels(
  catalog: CatalogModel[],
  limit: number,
): CatalogModel[] {
  const ranked = [...catalog].sort(compareCapabilityThenDate)
  const picked: CatalogModel[] = []
  const pickedIds = new Set<string>()

  const add = (model: CatalogModel | undefined) => {
    if (!model || picked.length >= limit || pickedIds.has(model.id)) return
    picked.push(model)
    pickedIds.add(model.id)
  }

  const addTier = (tier: ModelTier, count: number) => {
    for (const model of ranked) {
      if (picked.length >= limit || count <= 0) return
      if (pickedIds.has(model.id)) continue
      if (classifyTierByCapability(scoreModelCapability(model)) !== tier) continue
      picked.push(model)
      pickedIds.add(model.id)
      count -= 1
    }
  }

  for (const provider of PRIMARY_FLAGSHIP_PROVIDERS) {
    add(pickProviderFlagship(ranked, provider))
  }
  addTier(1, Math.max(0, 5 - picked.length))
  addTier(2, 2)
  addTier(3, 1)

  for (const model of ranked) {
    if (picked.length >= limit) break
    if (pickedIds.has(model.id)) continue
    picked.push(model)
    pickedIds.add(model.id)
  }

  return picked
}

function pickProviderFlagship(
  ranked: CatalogModel[],
  provider: string,
): CatalogModel | undefined {
  const providerModels = dedupeCatalogAliases(
    ranked.filter((model) => catalogProviderId(model.id) === provider),
  )
  const fullSizeModels = providerModels.filter(
    (model) => !isLightweightOrSpecialized(model),
  )
  return (fullSizeModels.length > 0 ? fullSizeModels : providerModels).sort(
    (a, b) =>
      dateRank(b.createdDate) - dateRank(a.createdDate) ||
      compareCapabilityThenDate(a, b),
  )[0]
}

function catalogProviderId(modelId: string): string {
  return modelId.split("/")[0]?.toLowerCase() || "other"
}

function isLightweightOrSpecialized(model: CatalogModel): boolean {
  const value = `${model.id} ${model.name}`.toLowerCase()
  return /(?:^|[-\s])(free|mini|nano|lite|small|xs|fast|luna|terra|image|realtime|audio|embedding|moderation)(?:$|[-\s])/.test(
    value,
  )
}

function compareCapabilityThenDate(a: CatalogModel, b: CatalogModel): number {
  const scoreDelta = scoreModelCapability(b) - scoreModelCapability(a)
  if (scoreDelta !== 0) return scoreDelta
  return dateRank(b.createdDate) - dateRank(a.createdDate)
}

function scoreModelCapability(model: CatalogModel): number {
  const haystack = [
    model.id,
    model.name,
    model.description || "",
    inferProvider(model.id),
  ]
    .join(" ")
    .toLowerCase()

  let score = 0
  const leaderboardScore = averageBenchmarkScore(model)
  if (leaderboardScore !== null) {
    score += Math.round(leaderboardScore)
  }

  if (model.url.startsWith("https://developers.openai.com/")) {
    score += 16
  }

  if (/(anthropic|openai|google|deepseek|x-ai|meta-llama|qwen|z-ai|moonshot)/.test(haystack)) {
    score += 8
  }

  if (/(claude|gpt|gemini|grok|deepseek|qwen|glm|kimi|llama|command|mistral)/.test(haystack)) {
    score += 8
  }

  if (
    /(opus|sonnet 5|sonnet-5|gpt-5|gpt-oss-120b|o3|gemini-(?:3(?:\.\d+)?)-(?:pro|flash)|gemini 3(?:\.\d+)? (?:pro|flash)|grok-4|deepseek-r2|qwen3-max|glm-5\.2|kimi-k2|llama-4|ultra|max)/.test(
      haystack,
    )
  ) {
    score += 24
  }

  if (/(flagship|frontier|most capable|state of the art|advanced|reasoning|agentic|coding)/.test(haystack)) {
    score += 8
  }

  if (model.contextWindow !== "unknown") {
    if (model.contextWindow >= 1_000_000) score += 8
    else if (model.contextWindow >= 200_000) score += 4
    else if (model.contextWindow >= 100_000) score += 2
  }

  const outputPrice = Number.parseFloat(model.completionPrice || "")
  if (!Number.isNaN(outputPrice)) {
    if (outputPrice >= 0.00001) score += 8
    else if (outputPrice >= 0.000003) score += 4
    else if (outputPrice > 0) score += 1
  }

  if (/(free|mini|lite|nano|small|xs|tiny|flash|fast|8b|7b|3b|a3b)/.test(haystack)) {
    score -= 14
  }

  if (/(image|embedding|rerank|moderation|tts|audio|speech)/.test(haystack)) {
    score -= 8
  }

  return score
}

function classifyTierByCapability(score: number): ModelTier {
  if (score >= 34) return 1
  if (score >= 16) return 2
  return 3
}

function averageBenchmarkScore(model: CatalogModel): number | null {
  const values = [
    model.intelligenceIndex,
    model.codingIndex,
    model.agenticIndex,
  ].filter((value): value is number => typeof value === "number")

  if (values.length === 0) return null
  return values.reduce((sum, value) => sum + value, 0) / values.length
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

function displayModelName(model: CatalogModel, provider: string): string {
  const vendorPrefix = `${provider}: `
  if (model.name.startsWith(vendorPrefix)) return model.name.slice(vendorPrefix.length)
  if (model.name.startsWith("Z.ai: ")) return model.name.slice("Z.ai: ".length)
  if (model.name.startsWith("MoonshotAI: ")) {
    return model.name.slice("MoonshotAI: ".length)
  }
  return model.name
}

function formatContextWindow(value: CatalogModel["contextWindow"]): string {
  if (value === "unknown") return "unknown"
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return String(value)
}

function dateRank(date: string): number {
  const timestamp = Date.parse(date)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function buildHighlights(model: CatalogModel): string[] {
  const highlights = [
    buildCapabilityRationale(model),
    `榜单依据：OpenRouter Artificial Analysis / 目录基准信号`,
    `上下文窗口：${formatContextWindow(model.contextWindow)}`,
    `OpenRouter 模型 ID：${model.id}`,
  ]

  if (model.promptPrice && model.completionPrice) {
    highlights.push(`OpenRouter 标价：输入 ${model.promptPrice} / 输出 ${model.completionPrice}`)
  }

  if (model.modalities && model.modalities.length > 0) {
    highlights.push(`输入模态：${model.modalities.join(", ")}`)
  }

  return highlights.slice(0, 4)
}

function buildCapabilityRationale(model: CatalogModel): string {
  if (model.url.startsWith("https://developers.openai.com/")) {
    return "发布日期由 OpenAI 官方产品发布源校验"
  }

  if (model.description) {
    return model.description.slice(0, 90)
  }

  return "基于榜单、模型家族、上下文和官方目录信号综合判断"
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
