"use client"

import { CheckCircle2, Circle, Clock, Trophy, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const progressData = [
  {
    course: "基础篇",
    progress: 75,
    completed: 3,
    total: 4,
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-50",
  },
  {
    course: "进阶篇",
    progress: 50,
    completed: 3,
    total: 6,
    color: "from-purple-400 to-pink-400",
    bgColor: "bg-purple-50",
  },
  {
    course: "工具篇",
    progress: 25,
    completed: 2,
    total: 8,
    color: "from-orange-400 to-amber-400",
    bgColor: "bg-orange-50",
  },
]

const achievements = [
  { name: "完成基础篇", icon: Trophy, color: "text-yellow-500" },
  { name: "连续学习7天", icon: Target, color: "text-green-500" },
  { name: "完成第一个项目", icon: CheckCircle2, color: "text-blue-500" },
]

export function ProgressDemo() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-orange-200 shadow-lg">
            <Target className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">学习进度</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              跟踪你的学习进度
            </span>
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            可视化你的学习旅程，每一步都清晰可见
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress cards */}
          <div className="lg:col-span-2 space-y-4">
            {progressData.map((item, index) => (
              <div
                key={item.course}
                className={cn(
                  "relative rounded-3xl p-6 transition-all duration-300",
                  "bg-white/70 backdrop-blur-xl",
                  "border-2 border-white/50",
                  "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                  "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]",
                  "hover:-translate-y-1",
                  item.bgColor
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.course}</h3>
                  <span className="text-sm font-semibold text-gray-600">
                    {item.completed}/{item.total} 章节
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-4 bg-white/50 rounded-full overflow-hidden shadow-inner mb-2">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg",
                      item.color
                    )}
                    style={{ width: `${item.progress}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>

                {/* Progress percentage */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-medium text-gray-600">
                    {item.progress}% 完成
                  </span>
                  {item.progress === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {/* Decorative gradient */}
                <div className={cn(
                  "absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl",
                  "bg-gradient-to-br",
                  item.color
                )} />
              </div>
            ))}
          </div>

          {/* Achievements sidebar */}
          <div className="space-y-4">
            <div className={cn(
              "rounded-3xl p-6",
              "bg-white/70 backdrop-blur-xl",
              "border-2 border-white/50",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
            )}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                成就徽章
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.name}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className={cn(
                        "p-2 rounded-xl bg-white shadow-md",
                        achievement.color
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {achievement.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Overall progress */}
            <div className={cn(
              "rounded-3xl p-6",
              "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]",
              "text-white"
            )}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">总体进度</h3>
                <span className="text-2xl font-extrabold">50%</span>
              </div>
              <div className="relative h-3 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-white rounded-full shadow-lg" />
              </div>
              <p className="text-sm mt-3 opacity-90">
                继续加油！你正在成为 AI 编程专家
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
