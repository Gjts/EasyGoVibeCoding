"use client"

import Link from "next/link"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { ArrowRight, CheckCircle2, Circle, GaugeCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLearningProgress } from "@/lib/use-learning-progress"
import {
  classifyPath,
  countCompletedByCategory,
  getCategoryTotal,
  getLearningTitle,
  getNextLearningRoute,
  isPathCompleted,
  toggleComplete,
  type LearningCategory,
} from "@/lib/learning-progress"

const CATEGORY_LABELS: Record<LearningCategory, string> = {
  basics: "基础篇",
  advanced: "进阶篇",
  architecture: "架构篇",
  tools: "工具篇",
  practice: "实践篇",
  team: "团队篇",
  "super-individual": "超级个体篇",
  ecosystem: "生态导航",
  resources: "资源库",
  "ai-frameworks": "AI 框架专题",
  other: "其他",
}

export function LearningProgressControl() {
  const pathname = usePathname()
  const progress = useLearningProgress()
  const path = pathname ?? ""
  const category = classifyPath(path)

  const completed = useMemo(() => {
    return path ? isPathCompleted(progress, path) : false
  }, [path, progress])

  const categoryStats = useMemo(() => {
    if (!category) return null
    const completedByCategory = countCompletedByCategory(progress)
    const total = getCategoryTotal(category)
    const done = completedByCategory[category] ?? 0
    return {
      done,
      total,
      pct: total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100)),
    }
  }, [category, progress])

  const nextRoute = useMemo(() => {
    if (!category) return null
    return getNextLearningRoute(progress, path)
  }, [category, path, progress])

  if (!category || !categoryStats) return null

  const title = getLearningTitle(path)

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 z-40 flex items-center gap-2 rounded-2xl border border-orange-200/80 bg-white/95 p-2 shadow-[0_12px_40px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:block sm:w-[360px] sm:p-4"
    >
      <div className="mb-0 flex min-w-0 flex-1 items-start justify-between gap-3 sm:mb-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold text-orange-800">
            <GaugeCircle className="h-4 w-4 shrink-0" />
            <span>{CATEGORY_LABELS[category]}</span>
            <span className="text-orange-700">·</span>
            <span>
              {categoryStats.done}/{categoryStats.total} 完成
            </span>
          </div>
          <h2 className="hidden truncate text-sm font-extrabold text-gray-950 sm:block">
            {title}
          </h2>
        </div>
        {completed ? (
          <CheckCircle2 className="mt-0.5 hidden h-5 w-5 shrink-0 text-emerald-500 sm:block" />
        ) : (
          <Circle className="mt-0.5 hidden h-5 w-5 shrink-0 text-gray-300 sm:block" />
        )}
      </div>

      <div className="mb-3 hidden h-2 overflow-hidden rounded-full bg-orange-100 sm:block">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 transition-all duration-500"
          style={{ width: `${categoryStats.pct}%` }}
        />
      </div>

      <div className="flex shrink-0 flex-row gap-1 sm:gap-2">
        <Button
          type="button"
          size="sm"
          variant={completed ? "ghost" : "default"}
          onClick={() => toggleComplete(path)}
          className={
            completed
              ? "border border-emerald-300 bg-white text-emerald-800 shadow-xs hover:bg-emerald-50 hover:text-emerald-900"
              : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600"
          }
        >
          {completed ? "取消完成" : "标记完成"}
        </Button>
        {nextRoute ? (
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="justify-center gap-1 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
          >
            <Link href={nextRoute.path} aria-label="下一章">
              <span className="hidden sm:inline">下一章</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </aside>
  )
}
