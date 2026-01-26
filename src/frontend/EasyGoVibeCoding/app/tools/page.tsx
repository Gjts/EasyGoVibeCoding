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
  },
  {
    title: "网页编辑类工具",
    icon: Globe,
    description: "v0、bolt.new、Lovable、AnyCoder 等",
    href: "/tools/web",
    tools: ["v0", "bolt.new", "Lovable", "AnyCoder"],
  },
  {
    title: "命令行类工具",
    icon: Terminal,
    description: "Claude Code、Continue.dev、Goose、Fabric 等",
    href: "/tools/cli",
    tools: ["Claude Code", "Continue.dev", "Goose", "Fabric"],
  },
  {
    title: "核心技术",
    icon: Cpu,
    description: "MCP、Skill 系统、Agent 系统、LSP",
    href: "/tools/core",
    tools: ["MCP", "Skill", "Agent", "LSP"],
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
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Wrench className="h-4 w-4" />
          工具篇 · 深度解析
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 编程工具深度解析
        </h1>
        <p className="text-lg text-muted-foreground">
          系统掌握各种 AI 编程工具，了解 MCP、Skill、Agent 等核心技术。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想系统掌握各种 AI 编程工具的开发者",
            "需要进行工具选型的架构师",
            "想了解核心技术原理的技术人员",
            "需要企业级集成的团队",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Tool Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">工具分类</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                href={category.href}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
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
        <h2 className="text-xl font-semibold text-foreground mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["工具选型决策", "高级特性掌握", "企业级集成"].map((goal) => (
            <div key={goal} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <Settings className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">{goal}</span>
            </div>
          ))}
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
                {String(index + 1).padStart(2, "0")}
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
