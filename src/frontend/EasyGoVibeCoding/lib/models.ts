import seedData from "@/data/models.json"
import {
  ModelsPayloadSchema,
  type ModelEntry,
  type ModelsPayload,
  type NewsEntry,
} from "@/lib/model-schema"
import { siteLocale } from "@/lib/i18n-routing"

const API_ENDPOINT = "/api/models"
const REFRESH_ENDPOINT = "/api/models/refresh"

export const seedPayload: ModelsPayload = parseSeedOrThrow(seedData)

export interface GetLatestResult {
  payload: ModelsPayload
  from: "api" | "seed"
  fetchedAt: string
}

/**
 * 客户端获取最新模型数据：优先 fetch /api/models，失败则回退到构建时种子。
 * 构建时/SSG 环境下应直接使用 `seedPayload`。
 */
export async function getLatestModels(
  signal?: AbortSignal,
): Promise<GetLatestResult> {
  const fetchedAt = new Date().toISOString()
  if (siteLocale !== "zh-CN") {
    return { payload: seedPayload, from: "seed", fetchedAt }
  }
  try {
    const res = await fetch(API_ENDPOINT, {
      signal,
      headers: { accept: "application/json" },
    })
    if (!res.ok) {
      return { payload: seedPayload, from: "seed", fetchedAt }
    }
    const body = (await res.json()) as { data?: unknown }
    const parsed = ModelsPayloadSchema.safeParse(body?.data)
    if (!parsed.success) {
      return { payload: seedPayload, from: "seed", fetchedAt }
    }
    return { payload: parsed.data, from: "api", fetchedAt }
  } catch {
    return { payload: seedPayload, from: "seed", fetchedAt }
  }
}

/**
 * 手动刷新：生产环境通过 Pages Function 触发 model-updater Worker，
 * Worker 写入 KV 后同一响应返回最新 payload。Next dev 没有 Pages
 * Functions 时，404 会回退为普通读取，方便本地开发。
 */
export async function refreshLatestModels(
  signal?: AbortSignal,
): Promise<GetLatestResult> {
  const fetchedAt = new Date().toISOString()
  if (siteLocale !== "zh-CN") {
    return { payload: seedPayload, from: "seed", fetchedAt }
  }
  const res = await fetch(REFRESH_ENDPOINT, {
    method: "POST",
    signal,
    headers: { accept: "application/json" },
  })

  if (res.status === 404) {
    return getLatestModels(signal)
  }

  const body = (await res.json().catch(() => null)) as {
    data?: unknown
    error?: string
    details?: string
  } | null

  if (!res.ok) {
    const details = body?.details ? `：${body.details}` : ""
    throw new Error(`${body?.error || "模型刷新失败"}${details}`)
  }

  const parsed = ModelsPayloadSchema.safeParse(body?.data)
  if (!parsed.success) {
    throw new Error("模型刷新返回的数据未通过校验")
  }

  return { payload: parsed.data, from: "api", fetchedAt }
}

export function getModelsByTier(
  payload: ModelsPayload,
  tier: 1 | 2 | 3,
): ModelEntry[] {
  return payload.models.filter((m) => m.tier === tier)
}

export function getLatestNews(
  payload: ModelsPayload,
  limit: number,
): NewsEntry[] {
  const sorted = [...payload.news].sort((a, b) => b.date.localeCompare(a.date))
  return sorted.slice(0, Math.max(1, limit))
}

export function formatUpdatedAt(iso: string): string {
  try {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return iso
    return new Intl.DateTimeFormat(siteLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Shanghai",
      hour12: false,
    }).format(date)
  } catch {
    return iso
  }
}

function parseSeedOrThrow(raw: unknown): ModelsPayload {
  const result = ModelsPayloadSchema.safeParse(raw)
  if (!result.success) {
    const issues = result.error.issues
      .slice(0, 3)
      .map((i) => `${i.path.join(".")} - ${i.message}`)
      .join("; ")
    throw new Error(`data/models.json failed schema validation: ${issues}`)
  }
  return result.data
}
