import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Wrench, Monitor, Globe, Terminal, Cpu, Settings } from "lucide-react"

const chapters = [
  { title: "工具篇概述", href: "/tools" },
  { title: "IDE 类工具详解", href: "/tools/ide" },
  { title: "网页编辑类工具详解", href: "/tools/web" },
  { title: "命令行类工具详解", href: "/tools/cli" },
  { title: "核心技术深度解析", href: "/tools/core" },
  { title: "Fabric AI 增强框架", href: "/tools/fabric" },
  { title: "工具选型决策", href: "/tools/selection" },
  { title: "企业级实践", href: "/tools/enterprise" },
]

const toolCategories = [
  {
    title: "IDE 类工具",
    icon: Monitor,
    description: "Cursor、Windsurf、GitHub Copilot、Kiro、Zed 等",
    href: "/tools/ide",
    tools: ["Cursor", "Windsurf", "GitHub Copilot", "Kiro"],
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "网页编辑类工具",
    icon: Globe,
    description: "v0、bolt.new、Lovable、AnyCoder 等",
    href: "/tools/web",
    tools: ["v0", "bolt.new", "Lovable", "AnyCoder"],
    gradient: "from-purple-400 to-pink-400",
  },
  {
    title: "命令行类工具",
    icon: Terminal,
    description: "Claude Code、Continue.dev、Goose、Fabric 等",
    href: "/tools/cli",
    tools: ["Claude Code", "Continue.dev", "Goose", "Fabric"],
    gradient: "from-orange-400 to-amber-400",
  },
  {
    title: "核心技术",
    icon: Cpu,
    description: "MCP、Skill 系统、Agent 系统、LSP",
    href: "/tools/core",
    tools: ["MCP", "Skill", "Agent", "LSP"],
    gradient: "from-green-400 to-emerald-400",
  },
]

export default function ToolsPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Wrench className="h-4 w-4" />
          工具篇 · 深度解析
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI 编程工具深度解析
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          系统掌握各种 AI 编程工具，了解 MCP、Skill、Agent 等核心技术。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想系统掌握各种 AI 编程工具的开发者",
            "需要进行工具选型的架构师",
            "想了解核心技术原理的技术人员",
            "需要企业级集成的团队",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">工具分类</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                href={category.href}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{category.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`px-3 py-1 rounded-lg bg-gradient-to-r ${category.gradient} text-white text-xs font-semibold shadow-md`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["工具选型决策", "高级特性掌握", "企业级集成"].map((goal, index) => {
            const gradients = [
              "from-orange-400 to-amber-400",
              "from-purple-400 to-pink-400",
              "from-blue-400 to-cyan-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}>
                <Settings className="h-6 w-6" />
                <span className="font-bold text-lg">{goal}</span>
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 text-white text-sm font-bold shadow-lg">
                {String(index + 1).padStart(2, "0")}
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
