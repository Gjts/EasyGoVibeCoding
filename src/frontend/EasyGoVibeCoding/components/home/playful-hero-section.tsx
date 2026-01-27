import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code2, Users, Rocket, Star } from "lucide-react"
import Link from "next/link"

export function PlayfulHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-6 py-2 text-sm font-medium text-purple-600 shadow-lg border-2 border-purple-200">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>EasyGoVibeCoding</span>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-balance mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI 编程工具
            </span>
            <br />
            <span className="text-gray-800">
              不是魔法，是工程
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-xl leading-8 text-gray-700 max-w-2xl mx-auto text-pretty font-medium">
            理解机制才能驾驭工具。从零基础入门到企业级实践，
            <br />
            系统掌握 Cursor、Copilot、Claude Code 等主流 AI 编程工具。
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              asChild 
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 rounded-2xl"
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
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md border-2 border-purple-300 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 rounded-2xl font-semibold"
            >
              <Link href="/ecosystem">
                探索工具生态
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { label: "课程模块", value: "6+", icon: Code2, color: "from-pink-400 to-rose-400" },
              { label: "实战项目", value: "10+", icon: Rocket, color: "from-purple-400 to-indigo-400" },
              { label: "工具覆盖", value: "20+", icon: Code2, color: "from-blue-400 to-cyan-400" },
              { label: "企业案例", value: "6+", icon: Users, color: "from-green-400 to-emerald-400" },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div 
                  key={stat.label} 
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border-2 border-white/50 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</span>
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
