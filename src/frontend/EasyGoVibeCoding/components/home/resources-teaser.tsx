import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Building2,
  FileText,
  Library,
  Mail,
  Podcast,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { resourceCategoryTeasers } from "@/lib/home-teasers-data"

const ICON_MAP = {
  blog: Building2,
  podcast: Podcast,
  report: FileText,
  newsletter: Mail,
  community: Users,
  learning: BookOpen,
} as const

export function ResourcesTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-indigo-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-md">
              <Library className="h-4 w-4 text-indigo-500" />
              精选资源 · {resourceCategoryTeasers.length} 个类别
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                让好内容主动来找你
              </span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              顶级技术博客、AI 播客、行业报告、Newsletter、开发者社区与优质课程，按类别精选常用链接。
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            进入资源库
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCategoryTeasers.map((cat) => {
            const Icon = ICON_MAP[cat.iconKey]
            return (
              <Link
                key={cat.title}
                href="/resources"
                className="group rounded-2xl border-2 border-white/70 bg-white/80 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl shadow-md bg-gradient-to-br",
                      cat.gradient,
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-600">
                      {cat.itemCount} 条精选
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
