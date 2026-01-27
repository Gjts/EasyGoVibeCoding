import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, Code, Lightbulb, Rocket, Target } from "lucide-react"

const chapters = [
  {
    title: "序章：欢迎来到 AI 编程时代",
    href: "/basics",
  },
  {
    title: "觉醒：为什么现在是编程最好的时代",
    href: "/basics/awakening",
  },
  {
    title: "心法：像产品经理一样思考",
    href: "/basics/mindset",
  },
  {
    title: "技术原理：LLM 核心机制深度解析",
    href: "/basics/principles",
  },
  {
    title: "工具实战：IDE 类工具快速上手",
    href: "/basics/tools",
  },
  {
    title: "从 0 到 1 实战",
    href: "/basics/practice",
  },
  {
    title: "精进技能",
    href: "/basics/skills",
  },
]

const overview = [
  {
    icon: Lightbulb,
    title: "觉醒",
    description: "理解 Vibe Coding，从码农到指挥官的思维转变",
  },
  {
    icon: Brain,
    title: "心法",
    description: "MVP 思维、Spec 驱动开发、避免功能蔓延",
  },
  {
    icon: BookOpen,
    title: "原理",
    description: "Token、Context、Attention、Prompt 工程",
  },
  {
    icon: Code,
    title: "工具",
    description: "Cursor、Windsurf、GitHub Copilot 实战",
  },
  {
    icon: Rocket,
    title: "实战",
    description: "创建 API、生成 UI、整理工作摘要",
  },
  {
    icon: Target,
    title: "精进",
    description: "Git、代码审查、安全意识、最佳实践",
  },
]

export default function BasicsPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <BookOpen className="h-4 w-4" />
          基础篇 · 零基础入门
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            欢迎来到 AI 编程时代
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          从未写过代码？没关系。这是一个全新的时代，AI 编程工具让每个人都能成为创造者。
          你只需要想法，AI 负责实现。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["从未写过代码的小白", "文科生 / 设计师", "产品经理", "想快速验证想法的人"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["理解 AI 编程工具", "掌握基础使用", "做出第一个作品"].map((goal, index) => {
            const gradients = [
              "from-blue-400 to-cyan-400",
              "from-purple-400 to-pink-400",
              "from-orange-400 to-amber-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
                <span className="font-bold text-lg">{goal}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Course Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">课程大纲</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overview.map((item, index) => {
            const Icon = item.icon
            const gradients = [
              "from-blue-400 to-cyan-400",
              "from-purple-400 to-pink-400",
              "from-orange-400 to-amber-400",
              "from-green-400 to-emerald-400",
              "from-red-400 to-rose-400",
              "from-indigo-400 to-purple-400",
            ]
            return (
              <div key={item.title} className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-md`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Chapter list */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">章节目录</h2>
        <div className="space-y-3">
          {chapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.title}
              href={chapter.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold shadow-lg">
                {index + 1}
              </span>
              <span className="flex-1 font-semibold text-gray-900">{chapter.title}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}
