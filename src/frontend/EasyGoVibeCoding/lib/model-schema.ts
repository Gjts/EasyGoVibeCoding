import { z } from "zod"

/**
 * 模型动态信息共享数据契约
 *
 * 所有生产者（Worker / 种子 JSON / Pages Function / 前端 lib）都必须
 * 遵守该 Schema，以保证三端字段一致。Worker 写入 KV 前会做一次 parse，
 * Pages Function 读取 KV 后会再做一次 safeParse，前端 fetch 后再次 safeParse，
 * 三层校验确保脏数据不落地也不渲染。
 */

export const MODEL_PROVIDERS = [
  "Anthropic",
  "OpenAI",
  "Google",
  "Alibaba",
  "Zhipu",
  "Moonshot",
  "DeepSeek",
  "xAI",
  "Meta",
  "Other",
] as const

export const MODEL_TIERS = [1, 2, 3] as const

export const MODEL_CATEGORIES = [
  "ide",
  "web",
  "cli",
  "design",
  "model",
] as const

export const ModelEntrySchema = z.object({
  provider: z.string().min(1),
  name: z.string().min(1),
  releaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "releaseDate must be YYYY-MM-DD"),
  contextWindow: z.string().min(1),
  highlights: z.array(z.string().min(1)).max(8),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  url: z.string().url(),
  category: z.enum(MODEL_CATEGORIES).default("model"),
  tags: z.array(z.string().min(1)).max(6).default([]),
  description: z.string().max(200).default(""),
})

export const NewsEntrySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "news date must be YYYY-MM-DD"),
  provider: z.string().min(1),
  title: z.string().min(1).max(120),
  summary: z.string().min(1).max(240),
  url: z.string().url(),
})

export const ModelsPayloadSchema = z.object({
  updatedAt: z.string().datetime(),
  source: z.string().min(1),
  models: z.array(ModelEntrySchema).min(1),
  news: z.array(NewsEntrySchema).max(30).default([]),
})

export type ModelEntry = z.infer<typeof ModelEntrySchema>
export type NewsEntry = z.infer<typeof NewsEntrySchema>
export type ModelsPayload = z.infer<typeof ModelsPayloadSchema>

export const MODELS_KV_KEYS = {
  latest: "models:latest",
  previous: "models:previous",
  errorPrefix: "models:error:",
  historyPrefix: "models:history:",
} as const
