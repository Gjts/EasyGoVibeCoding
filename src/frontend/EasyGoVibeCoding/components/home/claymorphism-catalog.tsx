"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Rocket, Wrench, Layers, Code, Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const courses = [
  {
    title: "基础篇",
    subtitle: "零基础入门",
    description: "从未写过代码？没关系。理解 AI 编程工具，掌握基础使用，做出第一个作品。",
    icon: BookOpen,
    href: "/basics",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    bgColor: "bg-blue-50",
    chapters: 4,
    duration: "8小时",
  },
  {
    title: "进阶篇",
    subtitle: "从工具到架构",
    description: "深入了解 AI 编程工具原理和高级特性，掌握企业级实践与架构权衡思维。",
    icon: Rocket,
    href: "/advanced",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    bgColor: "bg-purple-50",
    chapters: 6,
    duration: "12小时",
  },
  {
    title: "工具篇",
    subtitle: "深度解析",
    description: "系统掌握 Cursor、Windsurf、Claude Code 等工具，了解 MCP、Skill、Agent 核心技术。",
    icon: Wrench,
    href: "/tools",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    bgColor: "bg-orange-50",
    chapters: 8,
    duration: "15小时",
  },
  {
    title: "架构篇",
    subtitle: "大模型架构",
    description: "理解 Transformer、Mamba、MoE、RAG 等架构，掌握架构选型思维。",
    icon: Layers,
    href: "/architecture",
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    bgColor: "bg-indigo-50",
    chapters: 5,
    duration: "10小时",
  },
  {
    title: "实践篇",
    subtitle: "项目实战",
    description: "通过真实项目掌握 AI 编程工具，积累从需求到交付的完整实战经验。",
    icon: Code,
    href: "/practice",
    gradient: "from-red-400 via-rose-400 to-pink-400",
    bgColor: "bg-red-50",
    chapters: 10,
    duration: "20小时",
  },
  {
    title: "团队篇",
    subtitle: "打造 AI 团队",
    description: "组建 AI 团队、建立工作流程、打造学习型组织，企业级 AI 团队建设指南。",
    icon: Users,
    href: "/team",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    bgColor: "bg-green-50",
    chapters: 6,
    duration: "12小时",
  },
]

export function ClaymorphismCatalog() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-purple-200 shadow-lg">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600">课程目录</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              选择你的学习路径
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium">
            从零基础到架构师，找到适合你的学习起点
          </p>
        </div>

        {/* Claymorphism cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <Link
                key={course.title}
                href={course.href}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Claymorphism card */}
                <div className={cn(
                  "relative h-full rounded-3xl p-6 transition-all duration-300",
                  "bg-white/70 backdrop-blur-xl",
                  "border-2 border-white/50",
                  "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                  "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]",
                  "hover:-translate-y-2 hover:scale-[1.02]",
                  "before:absolute before:inset-0 before:rounded-3xl",
                  "before:bg-gradient-to-br before:from-white/50 before:to-transparent",
                  "before:opacity-0 before:transition-opacity before:duration-300",
                  "group-hover:before:opacity-100",
                  course.bgColor
                )}>
                  {/* Icon with gradient background */}
                  <div className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                    "bg-gradient-to-br shadow-lg",
                    course.gradient,
                    "transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  )}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title and subtitle */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                    <span className={cn(
                      "text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                      course.gradient
                    )}>
                      {course.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.chapters} 章节
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-semibold",
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    course.gradient,
                    "group-hover:gap-3 transition-all duration-300"
                  )}>
                    开始学习
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Decorative elements */}
                  <div className={cn(
                    "absolute top-4 right-4 w-20 h-20 rounded-full opacity-10 blur-xl",
                    "bg-gradient-to-br transition-opacity duration-300",
                    course.gradient,
                    "group-hover:opacity-20"
                  )} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
