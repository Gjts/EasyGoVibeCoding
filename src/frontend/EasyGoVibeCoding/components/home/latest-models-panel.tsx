"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  RefreshCw,
  Sparkles,
  Zap,
  Trophy,
  History,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  formatUpdatedAt,
  getLatestModels,
  getLatestNews,
  refreshLatestModels,
  seedPayload,
  type GetLatestResult,
} from "@/lib/models"

const MAX_NEWS = 5
const POLL_INTERVAL_MS = 5 * 60 * 1000

const PROVIDER_STYLES: Record<
  string,
  { chip: string; ring: string; glow: string; medal: string }
> = {
  Anthropic: {
    chip: "bg-orange-100 text-orange-700 border-orange-200",
    ring: "ring-orange-200",
    glow: "from-orange-200/60 via-amber-100/60 to-rose-100/60",
    medal: "from-orange-400 to-rose-400",
  },
  OpenAI: {
    chip: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ring: "ring-emerald-200",
    glow: "from-emerald-200/60 via-teal-100/60 to-cyan-100/60",
    medal: "from-emerald-400 to-teal-400",
  },
  Google: {
    chip: "bg-blue-100 text-blue-700 border-blue-200",
    ring: "ring-blue-200",
    glow: "from-blue-200/60 via-sky-100/60 to-indigo-100/60",
    medal: "from-blue-400 to-indigo-400",
  },
  Moonshot: {
    chip: "bg-violet-100 text-violet-700 border-violet-200",
    ring: "ring-violet-200",
    glow: "from-violet-200/60 via-purple-100/60 to-fuchsia-100/60",
    medal: "from-violet-400 to-fuchsia-400",
  },
  Zhipu: {
    chip: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    ring: "ring-fuchsia-200",
    glow: "from-fuchsia-200/60 via-pink-100/60 to-rose-100/60",
    medal: "from-fuchsia-400 to-pink-400",
  },
  Alibaba: {
    chip: "bg-amber-100 text-amber-700 border-amber-200",
    ring: "ring-amber-200",
    glow: "from-amber-200/60 via-yellow-100/60 to-orange-100/60",
    medal: "from-amber-400 to-orange-400",
  },
  DeepSeek: {
    chip: "bg-slate-100 text-slate-700 border-slate-200",
    ring: "ring-slate-200",
    glow: "from-slate-200/60 via-gray-100/60 to-zinc-100/60",
    medal: "from-slate-400 to-zinc-400",
  },
}

function providerStyle(name: string) {
  return PROVIDER_STYLES[name] ?? PROVIDER_STYLES.DeepSeek
}

function isSeedSource(source: string) {
  return source.includes("seed")
}

function sourceLabel(source: string) {
  if (source === "seed-static-fallback") return "静态校验兜底"
  if (source === "openrouter-catalog+openai-official") {
    return "OpenRouter 目录 + OpenAI 官方发布记录"
  }
  if (source === "openrouter-catalog") return "OpenRouter 模型目录"
  if (source.startsWith("openrouter-")) return "OpenRouter 实时检索"
  if (source.startsWith("perplexity-")) return "Perplexity 实时检索"
  if (source.startsWith("anthropic-")) return "Anthropic 实时检索"
  return source
}

export function LatestModelsPanel() {
  const [state, setState] = useState<GetLatestResult>({
    payload: seedPayload,
    from: "seed",
    fetchedAt: seedPayload.updatedAt,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadLatest = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getLatestModels(signal)
      setState(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : "获取失败"
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await refreshLatestModels()
      setState(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : "刷新失败"
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let controller = new AbortController()
    const poll = () => {
      controller.abort()
      controller = new AbortController()
      void loadLatest(controller.signal)
    }

    poll()
    const interval = window.setInterval(poll, POLL_INTERVAL_MS)
    return () => {
      window.clearInterval(interval)
      controller.abort()
    }
  }, [loadLatest])

  const news = getLatestNews(state.payload, MAX_NEWS)
  const topModels = state.payload.models.filter((m) => m.tier === 1).slice(0, 3)
  const releaseKeys = new Set<string>()
  const releaseHistory = [
    ...state.payload.releases,
    ...state.payload.models,
  ].filter((model) => {
    const key = `${model.provider}:${model.name}`.toLowerCase()
    if (releaseKeys.has(key)) return false
    releaseKeys.add(key)
    return true
  }).sort((a, b) => {
    const dateOrder = b.releaseDate.localeCompare(a.releaseDate)
    return dateOrder !== 0 ? dateOrder : a.name.localeCompare(b.name)
  })

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-sky-50 via-cyan-50 to-indigo-50">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-cyan-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              模型动态 · 每 6 小时自动更新
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                最新模型发布追踪
              </span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              自动尝试读取最新模型数据，优先采用官方模型页/API 文档口径；如果接口不可用，会明确回退到静态种子，不把未验证内容当作最新。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SourceBadge from={state.from} source={state.payload.source} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refresh()}
              disabled={loading}
              aria-label="手动刷新模型数据"
              className="rounded-full border-2 border-cyan-200 bg-white/80 font-semibold text-cyan-700 shadow-sm backdrop-blur hover:bg-white hover:text-cyan-800"
            >
              <RefreshCw
                className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
              />
              {loading ? "请求中..." : "请求最新"}
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-100 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
              <RefreshCw className="h-4 w-4 text-cyan-600" />
              更新机制
            </div>
            <p className="text-xs leading-6 text-gray-600">
              打开页面会优先请求 <span className="font-mono">/api/models</span>；点击“请求最新”会触发一次 <span className="font-mono">/api/models/refresh</span>。
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
              <Database className="h-4 w-4 text-blue-600" />
              当前数据源
            </div>
            <p className="text-xs leading-6 text-gray-600">
              {isSeedSource(state.payload.source)
                ? "当前页面已读取线上 API 的静态校验兜底数据；配置外部检索 key 后会切换为实时更新。"
                : "当前页面已读取线上模型 API 的实时检索数据。"}
              <span className="ml-1 font-mono text-gray-900">
                {sourceLabel(state.payload.source)}
              </span>
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
              <History className="h-4 w-4 text-indigo-600" />
              历史可追溯
            </div>
            <p className="text-xs leading-6 text-gray-600">
              已收录 {releaseHistory.length} 个模型发布时间，下面可以滚动查看历史记录和官方入口。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* News card */}
          <div className="group relative rounded-3xl border-2 border-white bg-white/80 p-7 shadow-lg backdrop-blur-xl lg:col-span-2">
            <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-200/60 to-blue-200/40 blur-2xl" />
            <div className="relative">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md">
                  <Zap className="h-5 w-5" />
                </span>
                最近发布
              </h3>
              {news.length === 0 ? (
                <p className="text-sm text-gray-500">暂无最近发布条目。</p>
              ) : (
                <ul className="space-y-3">
                  {news.map((item) => {
                    const ps = providerStyle(item.provider)
                    return (
                      <li
                        key={`${item.provider}-${item.date}-${item.title}`}
                        className="group/item flex items-start gap-4 rounded-2xl border border-transparent bg-white/60 p-3 transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-md"
                      >
                        <div className="w-20 shrink-0 pt-1 font-mono text-xs text-gray-500">
                          {item.date}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                ps.chip,
                              )}
                            >
                              {item.provider}
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {item.title}
                              <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/item:opacity-100" />
                            </a>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                            {item.summary}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Top tier card */}
          <div className="group relative rounded-3xl border-2 border-white bg-white/80 p-7 shadow-lg backdrop-blur-xl">
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200/60 to-fuchsia-200/40 blur-2xl" />
            <div className="relative">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                  <Trophy className="h-5 w-5" />
                </span>
                第一梯队（旗舰）
              </h3>
              <ul className="space-y-3">
                {topModels.map((m, idx) => {
                  const ps = providerStyle(m.provider)
                  return (
                    <li
                      key={m.name}
                      className={cn(
                        "rounded-2xl border bg-gradient-to-br p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                        ps.glow,
                        "border-white",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                              ps.medal,
                            )}
                          >
                            {idx + 1}
                          </span>
                          <div>
                            <a
                              href={m.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-gray-900 hover:text-blue-600"
                            >
                              {m.name}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <div className="mt-0.5">
                              <span
                                className={cn(
                                  "rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
                                  ps.chip,
                                )}
                              >
                                {m.provider}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-xs font-mono font-semibold text-gray-700 shadow-sm">
                          {m.contextWindow}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-700">
                        {m.highlights[0] ?? m.description}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border-2 border-white bg-white/80 p-6 shadow-lg backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                  <History className="h-5 w-5" />
                </span>
                历史模型时间线
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                官方发布日期优先；无法官方核验的条目标为目录收录时间。
              </p>
            </div>
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
              可滚动查看全部
            </span>
          </div>

          <div className="max-h-[360px] overflow-y-auto pr-2" aria-label="历史模型时间线列表">
            <ol className="relative space-y-3 border-l-2 border-indigo-100 pl-5">
              {releaseHistory.map((model) => {
                const ps = providerStyle(model.provider)
                return (
                  <li key={`${model.provider}-${model.name}-${model.releaseDate}`} className="relative">
                    <span className="absolute -left-[29px] top-4 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 shadow-sm" />
                    <a
                      href={model.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-2xl border border-transparent bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700">
                              {model.releaseDate}
                            </span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                model.dateKind === "official-release"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : model.dateKind === "catalog-observed"
                                    ? "border-amber-200 bg-amber-50 text-amber-700"
                                    : "border-gray-200 bg-gray-50 text-gray-600",
                              )}
                            >
                              {model.dateKind === "official-release"
                                ? "官方发布"
                                : model.dateKind === "catalog-observed"
                                  ? "目录收录"
                                  : "待核验"}
                            </span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                ps.chip,
                              )}
                            >
                              {model.provider}
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                              T{model.tier}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1 font-bold text-gray-900 group-hover:text-blue-600">
                            {model.name}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </div>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {model.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-mono font-semibold text-indigo-700">
                          {model.contextWindow}
                        </span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs leading-6 text-gray-600">
          数据更新时间：
          <span className="ml-1 font-mono font-semibold text-gray-900">
            {formatUpdatedAt(state.payload.updatedAt)}
          </span>
          <span className="ml-2">
            · 本次请求：{formatUpdatedAt(state.fetchedAt)}
          </span>
          <span className="ml-2">· 数据源：{sourceLabel(state.payload.source)}</span>
          {error ? (
            <span className="ml-2 text-rose-600">（刷新失败：{error}）</span>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function SourceBadge({
  from,
  source,
}: {
  from: GetLatestResult["from"]
  source: string
}) {
  if (from === "api" && !isSeedSource(source)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        实时数据
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      静态校验数据
    </span>
  )
}
