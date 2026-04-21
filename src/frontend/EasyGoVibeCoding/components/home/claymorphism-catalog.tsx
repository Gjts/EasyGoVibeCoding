"use client"

import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Rocket,
  Wrench,
  Layers,
  Code,
  Users,
  Sparkles,
  Target,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLearningProgress } from "@/lib/use-learning-progress"
import {
  countByCategory,
  type LearningCategory,
} from "@/lib/learning-progress"

type TrackKey = "entry" | "engineering" | "scale"

interface Course {
  title: string
  subtitle: string
  description: string
  icon: typeof BookOpen
  href: string
  gradient: string
  bgColor: string
  chapters: number
  duration: string
  track: TrackKey
  category: LearningCategory
}

const courses: Course[] = [
  {
    title: "基础篇",
    subtitle: "零基础入门",
    description:
      "从未写过代码？没关系。理解 AI 编程工具，掌握基础使用，做出第一个作品。",
    icon: BookOpen,
    href: "/basics",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    bgColor: "bg-blue-50",
    chapters: 4,
    duration: "8小时",
    track: "entry",
    category: "basics",
  },
  {
    title: "工具篇",
    subtitle: "深度解析",
    description:
      "系统掌握 Cursor、Windsurf、Claude Code 等工具，了解 MCP、Skill、Agent 核心技术。",
    icon: Wrench,
    href: "/tools",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    bgColor: "bg-orange-50",
    chapters: 8,
    duration: "15小时",
    track: "entry",
    category: "tools",
  },
  {
    title: "进阶篇",
    subtitle: "从工具到架构",
    description:
      "深入了解 AI 编程工具原理和高级特性，掌握企业级实践与架构权衡思维。",
    icon: Rocket,
    href: "/advanced",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    bgColor: "bg-purple-50",
    chapters: 6,
    duration: "12小时",
    track: "entry",
    category: "advanced",
  },
  {
    title: "架构篇",
    subtitle: "大模型架构",
    description:
      "理解 Transformer、Mamba、MoE、RAG 等架构，掌握架构选型思维。",
    icon: Layers,
    href: "/architecture",
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    bgColor: "bg-indigo-50",
    chapters: 5,
    duration: "10小时",
    track: "engineering",
    category: "architecture",
  },
  {
    title: "实践篇",
    subtitle: "项目实战",
    description:
      "通过真实项目掌握 AI 编程工具，积累从需求到交付的完整实战经验。",
    icon: Code,
    href: "/practice",
    gradient: "from-red-400 via-rose-400 to-pink-400",
    bgColor: "bg-red-50",
    chapters: 10,
    duration: "20小时",
    track: "engineering",
    category: "practice",
  },
  {
    title: "团队篇",
    subtitle: "打造 AI 团队",
    description:
      "组建 AI 团队、建立工作流程、打造学习型组织，企业级 AI 团队建设指南。",
    icon: Users,
    href: "/team",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    bgColor: "bg-green-50",
    chapters: 6,
    duration: "12小时",
    track: "scale",
    category: "team",
  },
  {
    title: "超级个体篇",
    subtitle: "个人能力规模化",
    description:
      "把你的能力变成可交付、可复制、可复利的系统：定位 → 产品化 → 自动化 → 增长 → 复盘。",
    icon: Target,
    href: "/super-individual",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-400",
    bgColor: "bg-violet-50",
    chapters: 6,
    duration: "10小时",
    track: "scale",
    category: "super-individual",
  },
]

const TRACKS: Record<
  TrackKey,
  { title: string; subtitle: string; accent: string }
> = {
  entry: {
    title: "入门线",
    subtitle: "从零基础到掌握主流 AI 工具",
    accent: "from-blue-500 via-cyan-500 to-teal-500",
  },
  engineering: {
    title: "工程线",
    subtitle: "理解架构原理，做出真正能落地的项目",
    accent: "from-indigo-500 via-purple-500 to-pink-500",
  },
  scale: {
    title: "规模化线",
    subtitle: "把能力产品化，从个人到团队再到商业化",
    accent: "from-emerald-500 via-teal-500 to-violet-500",
  },
}

export function ClaymorphismCatalog() {
  const progress = useLearningProgress()
  const visitsByCategory = countByCategory(progress)

  const renderTrack = (trackKey: TrackKey) => {
    const trackCourses = courses.filter((c) => c.track === trackKey)
    const trackMeta = TRACKS[trackKey]

    return (
      <div key={trackKey} className="mb-14 last:mb-0">
        {/* Track header */}
        <div className="mb-6 flex items-baseline gap-3 border-b-2 border-white/70 pb-3">
          <h3
            className={cn(
              "bg-gradient-to-r bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl",
              trackMeta.accent,
            )}
          >
            {trackMeta.title}
          </h3>
          <span className="text-sm font-medium text-gray-600">
            {trackMeta.subtitle}
          </span>
          <span className="ml-auto text-xs font-semibold text-gray-500">
            {trackCourses.length} 篇
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trackCourses.map((course, index) => {
            const Icon = course.icon
            const visitCount = visitsByCategory[course.category] ?? 0
            return (
              <Link
                key={course.title}
                href={course.href}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    "relative h-full rounded-3xl p-6 transition-all duration-300",
                    "bg-white/70 backdrop-blur-xl",
                    "border-2 border-white/50",
                    "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                    "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]",
                    "hover:-translate-y-2 hover:scale-[1.02]",
                    "before:absolute before:inset-0 before:rounded-3xl",
                    "before:bg-gradient-to-br before:from-white/50 before:to-transparent",
                    "before:opacity-0 before:transition-opacity before:duration-300",
                    "group-hover:before:opacity-100",
                    course.bgColor,
                  )}
                >
                  {/* Visited badge */}
                  {visitCount > 0 ? (
                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border-2 border-white/80 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-md backdrop-blur">
                      <CheckCircle2 className="h-3 w-3" />
                      已看 {visitCount} 页
                    </div>
                  ) : null}

                  <div
                    className={cn(
                      "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                      "bg-gradient-to-br shadow-lg",
                      course.gradient,
                      "transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110",
                    )}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="mb-3">
                    <h3 className="mb-1 text-xl font-bold text-gray-900">
                      {course.title}
                    </h3>
                    <span
                      className={cn(
                        "bg-gradient-to-r bg-clip-text text-sm font-semibold text-transparent",
                        course.gradient,
                      )}
                    >
                      {course.subtitle}
                    </span>
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                    {course.description}
                  </p>

                  <div className="mb-4 flex items-center gap-4 text-xs font-medium text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.chapters} 章节
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-2 text-sm font-semibold",
                      "bg-gradient-to-r bg-clip-text text-transparent",
                      course.gradient,
                      "transition-all duration-300 group-hover:gap-3",
                    )}
                  >
                    {visitCount > 0 ? "继续学习" : "开始学习"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  <div
                    className={cn(
                      "absolute right-4 top-4 h-20 w-20 rounded-full opacity-10 blur-xl",
                      "bg-gradient-to-br transition-opacity duration-300",
                      course.gradient,
                      "group-hover:opacity-20",
                    )}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section
      id="catalog"
      className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600">
              课程目录 · 7 篇 · 三条学习线
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              选择你的学习路径
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            入门上手 → 工程落地 → 规模化变现，三条线一目了然
          </p>
        </div>

        {renderTrack("entry")}
        {renderTrack("engineering")}
        {renderTrack("scale")}
      </div>
    </section>
  )
}
