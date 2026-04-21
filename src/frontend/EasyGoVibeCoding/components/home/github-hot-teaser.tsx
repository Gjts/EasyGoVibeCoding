import Link from "next/link"
import { ArrowRight, ExternalLink, Flame, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  featuredGithubRepos,
  GITHUB_HOT_TOTAL_FEATURED,
} from "@/lib/home-teasers-data"

export function GithubHotTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -right-10 h-80 w-80 rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute -bottom-16 left-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md">
              <Flame className="h-4 w-4 text-rose-500" />
              GitHub 热门 · 精选深度项目
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="bg-gradient-to-r from-slate-900 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                把热门开源项目变成你的能力
              </span>
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              {GITHUB_HOT_TOTAL_FEATURED} 个精选深度项目 · 4 个 Trending 入口 · 4 个高 Star
              方向搜索，首页先看缩略，详情去
              <Link
                href="/github-hot"
                className="ml-1 font-semibold text-purple-700 underline-offset-2 hover:underline"
              >
                GitHub 热门
              </Link>
              。
            </p>
          </div>
          <Link
            href="/github-hot"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-800 to-slate-600 px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            查看全部精选
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredGithubRepos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border-2 border-white/70 bg-white/80 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md bg-gradient-to-br",
                      repo.gradient,
                    )}
                  >
                    <Github className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                      {repo.title}
                    </h3>
                    <p className="truncate text-xs font-medium text-gray-600">
                      {repo.subtitle}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-700 line-clamp-2">
                {repo.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-lg bg-gradient-to-r px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm",
                      repo.gradient,
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
