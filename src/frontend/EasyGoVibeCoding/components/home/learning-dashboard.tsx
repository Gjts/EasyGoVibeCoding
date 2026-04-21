"use client"

import Link from "next/link"
import { useMemo } from "react"
import {
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  GaugeCircle,
  History,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  useFrameworksRecommendation,
  useLearningProgress,
} from "@/lib/use-learning-progress"
import {
  countByCategory,
  type LearningCategory,
  type VisitRecord,
} from "@/lib/learning-progress"

/**
 * 每个篇章的"页数基准"，用于进度条估算。
 * 不要求精确，用于给用户一个"已走多远"的视觉反馈。
 */
const CATEGORY_TOTALS: Partial<Record<LearningCategory, number>> = {
  basics: 7,
  advanced: 15,
  tools: 8,
  architecture: 10,
  practice: 13,
  team: 11,
  "super-individual": 6,
  "ai-frameworks": 6,
}

const CATEGORY_META: Record<
  LearningCategory,
  {
    label: string
    href: string
    gradient: string
    showOnDashboard: boolean
  }
> = {
  basics: {
    label: "基础篇",
    href: "/basics",
    gradient: "from-blue-400 to-cyan-400",
    showOnDashboard: true,
  },
  tools: {
    label: "工具篇",
    href: "/tools",
    gradient: "from-orange-400 to-amber-400",
    showOnDashboard: true,
  },
  advanced: {
    label: "进阶篇",
    href: "/advanced",
    gradient: "from-purple-400 to-pink-400",
    showOnDashboard: true,
  },
  architecture: {
    label: "架构篇",
    href: "/architecture",
    gradient: "from-indigo-400 to-purple-400",
    showOnDashboard: true,
  },
  practice: {
    label: "实践篇",
    href: "/practice",
    gradient: "from-red-400 to-rose-400",
    showOnDashboard: true,
  },
  team: {
    label: "团队篇",
    href: "/team",
    gradient: "from-green-400 to-emerald-400",
    showOnDashboard: true,
  },
  "super-individual": {
    label: "超级个体篇",
    href: "/super-individual",
    gradient: "from-violet-400 to-fuchsia-400",
    showOnDashboard: true,
  },
  "ai-frameworks": {
    label: "AI 框架专题",
    href: "/advanced/ai-frameworks",
    gradient: "from-fuchsia-400 to-pink-400",
    showOnDashboard: true,
  },
  ecosystem: {
    label: "生态导航",
    href: "/ecosystem",
    gradient: "from-pink-400 to-purple-400",
    showOnDashboard: false,
  },
  resources: {
    label: "资源库",
    href: "/resources",
    gradient: "from-indigo-400 to-blue-400",
    showOnDashboard: false,
  },
  other: {
    label: "其他",
    href: "/",
    gradient: "from-gray-400 to-slate-400",
    showOnDashboard: false,
  },
}

function formatRelative(ts: number): string {
  const diffMs = Date.now() - ts
  const diffMin = Math.round(diffMs / 60000)
  if (diffMin < 1) return "刚刚"
  if (diffMin < 60) return `${diffMin} 分钟前`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr} 小时前`
  const diffDay = Math.round(diffHr / 24)
  if (diffDay < 30) return `${diffDay} 天前`
  return `${Math.round(diffDay / 30)} 个月前`
}

function prettifyPath(path: string): string {
  if (path === "/") return "首页"
  const trimmed = path.replace(/^\//, "").replace(/\/$/, "")
  return trimmed
    .split("/")
    .map((s) => s.replace(/-/g, " "))
    .join(" · ")
}

export function LearningDashboard() {
  const progress = useLearningProgress()
  const recommendation = useFrameworksRecommendation()

  const counts = useMemo(() => countByCategory(progress), [progress])
  const totalPages = useMemo(
    () => Object.keys(progress.visits).length,
    [progress.visits],
  )

  const recentVisits: VisitRecord[] = useMemo(() => {
    return Object.values(progress.visits)
      .sort((a, b) => b.lastSeen - a.lastSeen)
      .slice(0, 4)
  }, [progress.visits])

  const categoryProgress = useMemo(() => {
    return (Object.keys(CATEGORY_META) as LearningCategory[])
      .filter((k) => CATEGORY_META[k].showOnDashboard)
      .map((k) => {
        const visited = counts[k] ?? 0
        const total = CATEGORY_TOTALS[k] ?? 1
        const pct = Math.min(100, Math.round((visited / total) * 100))
        return { category: k, visited, total, pct, ...CATEGORY_META[k] }
      })
      .sort((a, b) => b.visited - a.visited)
  }, [counts])

  const isFirstVisit = totalPages === 0

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-white/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
            <GaugeCircle className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">
              学习仪表盘 · 数据仅保存在你的浏览器
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {isFirstVisit ? "准备好开始你的学习旅程了吗？" : "继续你的学习旅程"}
            </span>
          </h2>
          <p className="mt-3 text-sm font-medium text-gray-700 sm:text-base">
            {isFirstVisit
              ? "随机选一个入口先逛一下，我们只在你本地记录访问过的页面，不上传任何信息。"
              : `已访问 ${totalPages} 个页面 · 每一页都只记录在你的浏览器`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left & Middle: Category progress */}
          <div className="lg:col-span-2 rounded-3xl border-2 border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
              <BookOpen className="h-5 w-5 text-purple-500" />
              各篇章访问情况
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categoryProgress.map((item) => (
                <Link
                  key={item.category}
                  href={item.href}
                  className="group rounded-2xl border border-white/70 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-purple-600">
                      {item.label}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      {item.visited} / {item.total}
                    </span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                        item.gradient,
                      )}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Recent + Recommendation */}
          <div className="space-y-4">
            {/* Next recommendation */}
            <div className="rounded-3xl border-2 border-white/60 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 p-6 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                <h3 className="text-base font-bold">下一步推荐</h3>
              </div>
              {isFirstVisit ? (
                <>
                  <p className="mb-4 text-sm leading-6 opacity-95">
                    新朋友建议从
                    <span className="mx-1 font-extrabold">基础篇</span>
                    或
                    <span className="mx-1 font-extrabold">工具篇</span>
                    开始，了解 AI 编程工具的基本概念。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/basics"
                      className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur transition-colors hover:bg-white/30"
                    >
                      <Rocket className="h-3 w-3" />
                      基础篇
                    </Link>
                    <Link
                      href="/tools"
                      className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur transition-colors hover:bg-white/30"
                    >
                      <Target className="h-3 w-3" />
                      工具篇
                    </Link>
                  </div>
                </>
              ) : recommendation.recommend ? (
                <>
                  <p className="mb-3 text-sm leading-6 opacity-95">
                    {recommendation.reason}
                  </p>
                  <Link
                    href="/advanced/ai-frameworks"
                    className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-2 text-sm font-bold backdrop-blur transition-all hover:bg-white/40"
                  >
                    <Sparkles className="h-4 w-4" />
                    五大 AI 框架详解
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="mb-3 text-sm leading-6 opacity-95">
                    已走过 {recommendation.readCount} 页，试试逛逛
                    <Link
                      href="/ecosystem"
                      className="mx-1 underline underline-offset-2"
                    >
                      生态导航
                    </Link>
                    或
                    <Link
                      href="/github-hot"
                      className="mx-1 underline underline-offset-2"
                    >
                      GitHub 热门
                    </Link>
                    获取灵感。
                  </p>
                  <Link
                    href="/ecosystem"
                    className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-2 text-sm font-bold backdrop-blur transition-all hover:bg-white/40"
                  >
                    <Compass className="h-4 w-4" />
                    探索生态
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>

            {/* Recent visits */}
            <div className="rounded-3xl border-2 border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
                <History className="h-5 w-5 text-orange-500" />
                最近访问
              </h3>
              {recentVisits.length === 0 ? (
                <p className="text-sm text-gray-500">
                  还没有访问记录 · 随便逛逛就能看到你走过的路
                </p>
              ) : (
                <ul className="space-y-2">
                  {recentVisits.map((v) => (
                    <li key={v.path}>
                      <Link
                        href={v.path}
                        className="group flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-orange-50"
                      >
                        <span className="min-w-0 truncate text-sm font-semibold text-gray-800 group-hover:text-orange-600">
                          {prettifyPath(v.path)}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatRelative(v.lastSeen)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
