"use client"

import { useEffect, useState } from "react"
import { ExternalLink, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  formatUpdatedAt,
  getLatestModels,
  getModelsByTier,
  seedPayload,
  type GetLatestResult,
} from "@/lib/models"
import type { ModelEntry } from "@/lib/model-schema"

const TIER_META: Array<{
  tier: 1 | 2 | 3
  title: string
  description: string
  tone: "primary" | "default" | "default"
  advice: string
}> = [
  {
    tier: 1,
    title: "第一梯队（复杂任务首选）",
    description: "适合复杂推理、架构设计、大型代码库分析等任务：",
    tone: "primary",
    advice: "只在复杂任务时使用，避免成本浪费",
  },
  {
    tier: 2,
    title: "第二梯队（日常开发）",
    description: "适合日常代码编写、代码审查、文档生成等任务：",
    tone: "default",
    advice: "日常开发的主力模型",
  },
  {
    tier: 3,
    title: "第三梯队（轻量任务）",
    description: "适合简单补全、格式化、基础问答等任务：",
    tone: "default",
    advice: "成本敏感场景，简单任务",
  },
]

export function ModelTierList() {
  const [state, setState] = useState<GetLatestResult>({
    payload: seedPayload,
    from: "seed",
    fetchedAt: seedPayload.updatedAt,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      setLoading(true)
      try {
        const result = await getLatestModels(controller.signal)
        setState(result)
      } finally {
        setLoading(false)
      }
    }
    void run()
    return () => controller.abort()
  }, [])

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          数据更新：
          <span className="font-mono ml-1">
            {formatUpdatedAt(state.payload.updatedAt)}
          </span>
          <span className="mx-1">·</span>
          <span>来源：{state.from === "api" ? "实时 API" : "静态种子"}</span>
        </span>
        {loading ? (
          <span className="inline-flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" />
            同步中
          </span>
        ) : null}
      </div>

      {TIER_META.map((meta) => (
        <TierCard
          key={meta.tier}
          title={meta.title}
          description={meta.description}
          advice={meta.advice}
          tone={meta.tone}
          models={getModelsByTier(state.payload, meta.tier)}
        />
      ))}
    </div>
  )
}

interface TierCardProps {
  title: string
  description: string
  advice: string
  tone: "primary" | "default"
  models: ModelEntry[]
}

function TierCard({ title, description, advice, tone, models }: TierCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border",
        tone === "primary"
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-card",
      )}
    >
      <h3 className="font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {models.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          本梯队暂无数据，等待下一次定时同步。
        </p>
      ) : (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {models.map((m) => (
            <li key={m.name}>
              <span>• </span>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1"
              >
                {m.name}
                <ExternalLink className="h-3 w-3" />
              </a>
              <span>
                ：{m.highlights[0] ?? m.description}
                {m.contextWindow ? `，${m.contextWindow}上下文` : ""}
              </span>
            </li>
          ))}
          <li>
            • <strong>使用建议</strong>：{advice}
          </li>
        </ul>
      )}
    </div>
  )
}
