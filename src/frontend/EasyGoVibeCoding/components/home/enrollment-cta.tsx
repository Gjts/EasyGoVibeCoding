"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle2, Rocket, Gift, Users } from "lucide-react"
import Link from "next/link"

const benefits = [
  "6+ 完整课程模块",
  "10+ 实战项目案例",
  "20+ AI 工具深度解析",
  "企业级最佳实践",
  "终身学习支持",
  "社区交流与答疑",
]

export function EnrollmentCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Main CTA card */}
          <div className={`
            relative rounded-[3rem] p-8 sm:p-12
            bg-white/80 backdrop-blur-xl
            border-2 border-white/50
            shadow-[0_20px_60px_0_rgba(0,0,0,0.15)]
            overflow-hidden
          `}>
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-semibold">限时优惠</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    开始你的 AI 编程之旅
                  </span>
                </h2>
                <p className="text-xl text-gray-700 font-medium">
                  加入数千名开发者，一起掌握 AI 编程工具
                </p>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Users, value: "5000+", label: "学员", color: "from-blue-400 to-cyan-400" },
                  { icon: Rocket, value: "98%", label: "满意度", color: "from-purple-400 to-pink-400" },
                  { icon: Sparkles, value: "24/7", label: "支持", color: "from-orange-400 to-amber-400" },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} shadow-md mb-2`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg px-10 py-7 rounded-2xl font-bold"
                >
                  <Link href="/basics">
                    立即开始学习
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-md border-2 border-purple-300 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg px-10 py-7 rounded-2xl font-semibold"
                >
                  <Link href="/ecosystem">
                    了解更多
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">30 天无理由退款</span> · 支持分期付款 · 企业团购优惠
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>安全支付</span>
                  <span>·</span>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>即时开通</span>
                  <span>·</span>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>永久访问</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
