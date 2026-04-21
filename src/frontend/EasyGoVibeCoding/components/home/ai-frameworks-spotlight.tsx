"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { track } from "@vercel/analytics"
import {
  ArrowRight,
  Bot,
  BookOpen,
  Flame,
  GitBranch,
  Link2,
  Sparkles,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useFrameworksRecommendation } from "@/lib/use-learning-progress"

type FrameworkCard = {
  key: string
  name: string
  tagline: string
  description: string
  icon: typeof Link2
  href: string
  image: string
  gradient: string
  bgColor: string
  accent: string
}

const frameworks: FrameworkCard[] = [
  {
    key: "langchain",
    name: "LangChain",
    tagline: "AI 应用编排框架",
    description: "Chain + Agent + Tools + Memory，把 LLM 能力拼装成应用。",
    icon: Link2,
    href: "/advanced/ai-frameworks/langchain",
    image: "/images/ai-frameworks/langchain.png",
    gradient: "from-rose-400 via-pink-400 to-red-400",
    bgColor: "bg-rose-50",
    accent: "text-rose-600",
  },
  {
    key: "llamaindex",
    name: "LlamaIndex",
    tagline: "数据连接与 RAG 引擎",
    description: "Data → Index → Retrieve → Generate，喂私有知识给 LLM。",
    icon: BookOpen,
    href: "/advanced/ai-frameworks/llamaindex",
    image: "/images/ai-frameworks/llamaindex.png",
    gradient: "from-sky-400 via-blue-400 to-cyan-400",
    bgColor: "bg-sky-50",
    accent: "text-sky-600",
  },
  {
    key: "langgraph",
    name: "LangGraph",
    tagline: "图式 Agent 编排",
    description: "Graph + State + Edge + Checkpoint，构建有状态的复杂流程。",
    icon: GitBranch,
    href: "/advanced/ai-frameworks/langgraph",
    image: "/images/ai-frameworks/langgraph.png",
    gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
    bgColor: "bg-violet-50",
    accent: "text-violet-600",
  },
  {
    key: "autogpt",
    name: "AutoGPT",
    tagline: "自主执行 AI 智能体",
    description: "Goal → Plan → Execute → Reflect，让 AI 自己干活。",
    icon: Bot,
    href: "/advanced/ai-frameworks/autogpt",
    image: "/images/ai-frameworks/autogpt.png",
    gradient: "from-amber-400 via-orange-400 to-yellow-400",
    bgColor: "bg-amber-50",
    accent: "text-amber-600",
  },
  {
    key: "metagpt",
    name: "MetaGPT",
    tagline: "多智能体协作框架",
    description: "Multi-Agent + SOP，AI 团队按流程分工完成项目。",
    icon: Users,
    href: "/advanced/ai-frameworks/metagpt",
    image: "/images/ai-frameworks/metagpt.png",
    gradient: "from-emerald-400 via-green-400 to-teal-400",
    bgColor: "bg-emerald-50",
    accent: "text-emerald-600",
  },
]

function safeTrack(event: string, payload: Record<string, string>) {
  try {
    track(event, payload)
  } catch {
    // 无埋点环境（dev/无网络）下静默忽略
  }
}

export function AIFrameworksSpotlight() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const recommendation = useFrameworksRecommendation()

  // IntersectionObserver 进场动画：section 进入视口 15% 后触发；
  // 不支持 IO 的环境通过 rAF 异步 setState 回退为直接可见。
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      const raf = window.requestAnimationFrame(() => setVisible(true))
      return () => window.cancelAnimationFrame(raf)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const impressionSent = useRef(false)
  useEffect(() => {
    if (!visible || impressionSent.current) return
    impressionSent.current = true
    safeTrack("ai_frameworks_spotlight_impression", {
      recommended: recommendation.recommend ? "yes" : "no",
      visited_frameworks: recommendation.visitedFrameworks ? "yes" : "no",
    })
  }, [visible, recommendation])

  const showRecommendBadge = recommendation.recommend
  const recommendReason = recommendation.reason

  const cards = useMemo(() => frameworks, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ease-out",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-violet-200 shadow-lg">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span className="text-sm font-semibold text-violet-600">
              专题推荐 · NEW
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              五大 AI 应用框架详解
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium">
            一图看懂主流 AI 框架的分工与协作
          </p>
          <p className="mt-2 text-sm text-gray-600">
            每个框架都配有高清信息图 + Code Map + 代码示例，点击进入对应详解页。
          </p>

          {/* 个性化推荐 Banner */}
          {showRecommendBadge && recommendReason && (
            <div
              className={cn(
                "mt-6 mx-auto max-w-2xl rounded-2xl border-2 border-orange-300/70",
                "bg-gradient-to-r from-orange-100 via-rose-100 to-amber-100",
                "px-5 py-3 shadow-[0_6px_24px_-8px_rgba(251,146,60,0.45)]",
                "flex items-center gap-3 text-left",
                "transition-all duration-700 ease-out",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2",
              )}
              style={{ transitionDelay: visible ? "120ms" : "0ms" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 shadow-md">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-orange-900">
                  下一步推荐 · 为你定制
                </div>
                <div className="text-xs text-orange-800/80 truncate">
                  {recommendReason}
                </div>
              </div>
              <Link
                href="/advanced/ai-frameworks"
                onClick={() =>
                  safeTrack("ai_frameworks_recommend_cta", {
                    source: "banner",
                    reason: recommendReason,
                  })
                }
                className="shrink-0 inline-flex items-center gap-1 rounded-full bg-orange-600 hover:bg-orange-700 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors"
              >
                进入学习
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Frameworks grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((fw, index) => {
            const Icon = fw.icon
            return (
              <Link
                key={fw.key}
                href={fw.href}
                onClick={() =>
                  safeTrack("ai_framework_card_click", {
                    framework: fw.key,
                    position: String(index + 1),
                    recommended: showRecommendBadge ? "yes" : "no",
                  })
                }
                className={cn(
                  "group relative transition-all duration-700 ease-out",
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
                style={{
                  transitionDelay: visible
                    ? `${180 + index * 80}ms`
                    : "0ms",
                }}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300",
                    "bg-white/70 backdrop-blur-xl",
                    "border-2 border-white/50",
                    "shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]",
                    "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]",
                    "hover:-translate-y-2 hover:scale-[1.02]",
                    fw.bgColor,
                  )}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-white/60 bg-white">
                    <Image
                      src={fw.image}
                      alt={`${fw.name} 详解信息图`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className={cn(
                        "absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg",
                        "bg-gradient-to-br",
                        fw.gradient,
                        "transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {fw.name}
                      </h3>
                      <span
                        className={cn(
                          "text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                          fw.gradient,
                        )}
                      >
                        {fw.tagline}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-4">
                      {fw.description}
                    </p>

                    <div
                      className={cn(
                        "mt-auto flex items-center gap-2 text-sm font-semibold",
                        "bg-gradient-to-r bg-clip-text text-transparent",
                        fw.gradient,
                        "group-hover:gap-3 transition-all duration-300",
                      )}
                    >
                      查看详解
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl",
                      "bg-gradient-to-br transition-opacity duration-300",
                      fw.gradient,
                      "group-hover:opacity-40",
                    )}
                  />
                </div>
              </Link>
            )
          })}

          {/* 第 6 个位置：总览入口 */}
          <Link
            href="/advanced/ai-frameworks"
            onClick={() =>
              safeTrack("ai_frameworks_overview_cta", {
                position: "grid-last",
                recommended: showRecommendBadge ? "yes" : "no",
              })
            }
            className={cn(
              "group relative transition-all duration-700 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
            style={{
              transitionDelay: visible
                ? `${180 + cards.length * 80}ms`
                : "0ms",
            }}
          >
            <div
              className={cn(
                "relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-center transition-all duration-300",
                "bg-gradient-to-br from-gray-900 via-violet-900 to-rose-900 text-white",
                "border-2 border-white/20",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
                "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.3)]",
                "hover:-translate-y-2 hover:scale-[1.02]",
              )}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">一图速览全景</h3>
              <p className="text-sm text-white/80 mb-6 max-w-xs">
                查看五大框架对比表、选型指南，以及完整的 Code Map 全景图。
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 text-sm font-semibold group-hover:bg-white/30 transition-colors">
                进入全景页
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>

              <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-violet-400/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-rose-400/30 blur-3xl" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
