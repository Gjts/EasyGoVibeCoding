"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  formatUpdatedAt,
  getLatestModels,
  getLatestNews,
  seedPayload,
  type GetLatestResult,
} from "@/lib/models"

const MAX_NEWS = 4

export function LatestModelsPanel() {
  const [state, setState] = useState<GetLatestResult>({
    payload: seedPayload,
    from: "seed",
    fetchedAt: seedPayload.updatedAt,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (signal?: AbortSignal) => {
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

  useEffect(() => {
    const controller = new AbortController()
    void refresh(controller.signal)
    return () => controller.abort()
  }, [refresh])

  const news = getLatestNews(state.payload, MAX_NEWS)
  const topModels = state.payload.models
    .filter((m) => m.tier === 1)
    .slice(0, 3)

  return (
    <section className="py-24 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              模型动态（每 6 小时自动更新）
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              最新模型发布追踪
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              自动汇总 Anthropic / OpenAI / Google / 国产厂商 最新旗舰模型与发布动态，
              帮你随时掌握选型依据。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SourceBadge from={state.from} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refresh()}
              disabled={loading}
              aria-label="手动刷新模型数据"
            >
              <RefreshCw
                className={cn("h-4 w-4 mr-2", loading && "animate-spin")}
              />
              {loading ? "刷新中..." : "刷新"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              最近发布
            </h3>
            {news.length === 0 ? (
              <p className="text-sm text-muted-foreground">暂无最近发布条目。</p>
            ) : (
              <ul className="space-y-4">
                {news.map((item) => (
                  <li
                    key={`${item.provider}-${item.date}-${item.title}`}
                    className="group flex items-start gap-4 p-3 -mx-3 rounded-lg hover:bg-secondary/60 transition-colors"
                  >
                    <div className="shrink-0 w-20 text-xs text-muted-foreground font-mono pt-1">
                      {item.date}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary text-foreground font-medium">
                          {item.provider}
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-primary inline-flex items-center gap-1"
                        >
                          {item.title}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              第一梯队（旗舰）
            </h3>
            <ul className="space-y-3">
              {topModels.map((m) => (
                <li
                  key={m.name}
                  className="p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
                    >
                      {m.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-xs text-muted-foreground">
                      {m.contextWindow}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {m.highlights[0] ?? m.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            数据更新时间：
            <span className="font-mono text-foreground ml-1">
              {formatUpdatedAt(state.payload.updatedAt)}
            </span>
            <span className="ml-2">· 数据源：{state.payload.source}</span>
            {error ? (
              <span className="ml-2 text-destructive">（刷新失败：{error}）</span>
            ) : null}
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/ecosystem">
              查看完整生态
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function SourceBadge({ from }: { from: GetLatestResult["from"] }) {
  if (from === "api") {
    return (
      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
        实时数据
      </span>
    )
  }
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
      静态种子数据
    </span>
  )
}
