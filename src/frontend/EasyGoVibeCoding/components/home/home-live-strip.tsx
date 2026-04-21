"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Compass,
  Github,
  Radar,
  Library,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getLatestModels, seedPayload } from "@/lib/models"
import { HOME_STATS } from "@/lib/home-teasers-data"

type ChipTone = "sky" | "violet" | "slate" | "emerald" | "amber"

interface ChipItem {
  href: string
  icon: typeof BookOpen
  value: string
  label: string
  tone: ChipTone
  highlight?: boolean
}

const TONE_STYLES: Record<ChipTone, { bg: string; text: string; border: string; dot: string }> = {
  sky: {
    bg: "bg-sky-50/80",
    text: "text-sky-700",
    border: "border-sky-200/70",
    dot: "bg-gradient-to-br from-sky-400 to-cyan-400",
  },
  violet: {
    bg: "bg-violet-50/80",
    text: "text-violet-700",
    border: "border-violet-200/70",
    dot: "bg-gradient-to-br from-violet-400 to-fuchsia-400",
  },
  slate: {
    bg: "bg-slate-50/80",
    text: "text-slate-700",
    border: "border-slate-200/70",
    dot: "bg-gradient-to-br from-slate-600 to-slate-800",
  },
  emerald: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200/70",
    dot: "bg-gradient-to-br from-emerald-400 to-teal-400",
  },
  amber: {
    bg: "bg-amber-50/80",
    text: "text-amber-700",
    border: "border-amber-200/70",
    dot: "bg-gradient-to-br from-amber-400 to-orange-400",
  },
}

function formatRelativeTime(iso: string): string {
  try {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return "最近"
    const diffMs = Date.now() - date.getTime()
    const diffMin = Math.round(diffMs / 60000)
    if (diffMin < 1) return "刚刚"
    if (diffMin < 60) return `${diffMin} 分钟前`
    const diffHr = Math.round(diffMin / 60)
    if (diffHr < 24) return `${diffHr} 小时前`
    const diffDay = Math.round(diffHr / 24)
    if (diffDay < 30) return `${diffDay} 天前`
    const diffMonth = Math.round(diffDay / 30)
    return `${diffMonth} 个月前`
  } catch {
    return "最近"
  }
}

/**
 * 首页 Hero 下方的"实时摘要条"：展示关键数字让用户一眼看到本站的"活货"。
 * 优先走 /api/models 获取模型最新更新时间，失败则回退到构建时种子。
 */
export function HomeLiveStrip() {
  const [updatedAt, setUpdatedAt] = useState<string>(seedPayload.updatedAt)

  useEffect(() => {
    const controller = new AbortController()
    getLatestModels(controller.signal).then((r) => {
      setUpdatedAt(r.payload.updatedAt)
    })
    return () => controller.abort()
  }, [])

  const relTime = useMemo(() => formatRelativeTime(updatedAt), [updatedAt])

  const chips: ChipItem[] = [
    {
      href: "/basics",
      icon: BookOpen,
      value: `${HOME_STATS.courseTracks} 篇`,
      label: "课程模块",
      tone: "violet",
    },
    {
      href: "/ecosystem",
      icon: Compass,
      value: `${HOME_STATS.ecosystemTools}+`,
      label: "工具生态",
      tone: "sky",
    },
    {
      href: "/github-hot",
      icon: Github,
      value: `${HOME_STATS.githubFeatured}`,
      label: "GitHub 精选",
      tone: "slate",
    },
    {
      href: "/resources",
      icon: Library,
      value: `${HOME_STATS.resourceCategories} 类`,
      label: "精选资源",
      tone: "amber",
    },
    {
      href: "/ecosystem",
      icon: Radar,
      value: relTime,
      label: "模型动态",
      tone: "emerald",
      highlight: true,
    },
  ]

  return (
    <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {chips.map((chip) => {
        const Icon = chip.icon
        const tone = TONE_STYLES[chip.tone]
        return (
          <Link
            key={`${chip.label}-${chip.href}`}
            href={chip.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-2xl border-2 px-4 py-3 backdrop-blur-md transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-lg",
              tone.bg,
              tone.border,
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm",
                tone.dot,
              )}
            >
              <Icon className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-bold",
                  tone.text,
                )}
              >
                <span className="truncate">{chip.value}</span>
                {chip.highlight ? (
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                ) : null}
              </div>
              <div className="truncate text-xs font-medium text-gray-600">
                {chip.label}
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        )
      })}
    </div>
  )
}
