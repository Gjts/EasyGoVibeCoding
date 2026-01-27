import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code2, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>EasyGoVibeCoding</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            <span className="text-muted-foreground">AI 编程工具</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              不是魔法，是工程
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
            理解机制才能驾驭工具。从零基础入门到企业级实践，
            系统掌握 Cursor、Copilot、Claude Code 等主流 AI 编程工具。
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/basics">
                开始学习
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/ecosystem">
                探索工具生态
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
            {[
              { label: "课程模块", value: "6+", icon: Code2 },
              { label: "实战项目", value: "10+", icon: Sparkles },
              { label: "工具覆盖", value: "20+", icon: Code2 },
              { label: "企业案例", value: "6+", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border/50">
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
