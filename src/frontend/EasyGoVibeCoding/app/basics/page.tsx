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
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <BookOpen className="h-4 w-4" />
          基础篇 · 零基础入门
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          欢迎来到 AI 编程时代
        </h1>
        <p className="text-lg text-muted-foreground">
          从未写过代码？没关系。这是一个全新的时代，AI 编程工具让每个人都能成为创造者。
          你只需要想法，AI 负责实现。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["从未写过代码的小白", "文科生 / 设计师", "产品经理", "想快速验证想法的人"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["理解 AI 编程工具", "掌握基础使用", "做出第一个作品"].map((goal) => (
            <div key={goal} className="p-4 rounded-xl border border-border bg-card text-center">
              <span className="text-foreground font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">课程大纲</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overview.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Chapter list */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">章节目录</h2>
        <div className="space-y-3">
          {chapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.title}
              href={chapter.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-colors group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-medium text-foreground">
                {index + 1}
              </span>
              <span className="flex-1 font-medium text-foreground">{chapter.title}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}
