import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { HomeLiveStrip } from "./home-live-strip"

export function PlayfulHeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-300/30 blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/80 px-5 py-1.5 text-sm font-medium text-purple-600 shadow-lg backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>EasyGoVibeCoding</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="mb-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI 编程工具
            </span>
            <span className="text-gray-800"> · 不是魔法，是工程</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-pretty text-base font-medium leading-7 text-gray-700 sm:text-lg">
            理解机制才能驾驭工具。从零基础入门到企业级实践，
            系统掌握 Cursor、Copilot、Claude Code 等主流 AI 编程工具。
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="w-full transform rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-5 text-base text-white shadow-xl transition-all duration-200 hover:scale-105 hover:from-pink-600 hover:to-purple-600 hover:shadow-2xl sm:w-auto"
            >
              <Link href="/basics">
                开始学习
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full transform rounded-2xl border-2 border-purple-300 bg-white/80 px-7 py-5 text-base font-semibold text-purple-600 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-purple-50 hover:shadow-xl sm:w-auto"
            >
              <Link href="/ecosystem">探索工具生态</Link>
            </Button>
          </div>

          {/* Live summary strip: replaces the old hardcoded 4-stat grid */}
          <HomeLiveStrip />
        </div>
      </div>
    </section>
  )
}
