"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Monitor,
  Globe,
  Terminal,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  featuredEcosystemTools,
  type EcosystemToolItem,
} from "@/lib/home-teasers-data"
import { formatUpdatedAt, getLatestModels, seedPayload } from "@/lib/models"

const CATEGORY_META: Record<
  EcosystemToolItem["category"],
  { icon: typeof Monitor; label: string }
> = {
  ide: { icon: Monitor, label: "IDE 类" },
  web: { icon: Globe, label: "网页编辑" },
  cli: { icon: Terminal, label: "命令行" },
  design: { icon: Palette, label: "设计工具" },
}

export function EcosystemTeaser() {
  const [updatedAt, setUpdatedAt] = useState<string>(seedPayload.updatedAt)
  const [source, setSource] = useState<"api" | "seed">("seed")

  useEffect(() => {
    const controller = new AbortController()
    getLatestModels(controller.signal).then((r) => {
      setUpdatedAt(r.payload.updatedAt)
      setSource(r.from)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute bottom-10 -left-10 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-pink-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-pink-700 shadow-sm backdrop-blur-md">
              <Compass className="h-4 w-4 text-pink-500" />
              生态导航 · 精选预览
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                AI 编程工具一张图看全
              </span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              IDE / 网页 / CLI / 设计工具 + 主流大模型 · 模型数据
              <span className="mx-1 font-mono text-xs text-gray-900">
                {formatUpdatedAt(updatedAt)}
              </span>
              · 来源
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  source === "api"
                    ? "bg-emerald-500/15 text-emerald-700"
                    : "bg-amber-500/15 text-amber-700",
                )}
              >
                {source === "api" ? "实时 API" : "静态种子"}
              </span>
            </p>
          </div>
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            查看完整生态
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEcosystemTools.map((tool) => {
            const CategoryIcon = CATEGORY_META[tool.category].icon
            return (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border-2 border-white/50 bg-white/70 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl shadow-md bg-gradient-to-br",
                        tool.gradient,
                      )}
                    >
                      <span className="text-sm font-bold text-white">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                        {tool.name}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                        <CategoryIcon className="h-3 w-3" />
                        {CATEGORY_META[tool.category].label}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mb-3 text-sm leading-relaxed text-gray-700">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-lg bg-gradient-to-r px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm",
                        tool.gradient,
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
