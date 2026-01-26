import Link from "next/link"
import { ArrowRight, BookOpen, Rocket, Wrench, Layers, Code, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const paths = [
  {
    title: "基础篇",
    subtitle: "零基础入门",
    description: "从未写过代码？没关系。理解 AI 编程工具，掌握基础使用，做出第一个作品。",
    icon: BookOpen,
    href: "/basics",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/50",
    chapters: ["觉醒：编程最好的时代", "心法：产品经理思维", "技术原理：LLM 核心机制", "工具实战"],
  },
  {
    title: "进阶篇",
    subtitle: "从工具到架构",
    description: "深入了解 AI 编程工具原理和高级特性，掌握企业级实践与架构权衡思维。",
    icon: Rocket,
    href: "/advanced",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "hover:border-emerald-500/50",
    chapters: ["环境搭建", "AI 使用说明书", "PRD 与文档驱动", "部署运维"],
  },
  {
    title: "工具篇",
    subtitle: "深度解析",
    description: "系统掌握 Cursor、Windsurf、Claude Code 等工具，了解 MCP、Skill、Agent 核心技术。",
    icon: Wrench,
    href: "/tools",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "hover:border-orange-500/50",
    chapters: ["IDE 类工具", "网页编辑类", "命令行工具", "核心技术"],
  },
  {
    title: "架构篇",
    subtitle: "大模型架构",
    description: "理解 Transformer、Mamba、MoE、RAG 等架构，掌握架构选型思维。",
    icon: Layers,
    href: "/architecture",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "hover:border-purple-500/50",
    chapters: ["Transformer 深度解析", "Mamba/SSM", "MoE 专家混合", "RAG 检索增强"],
  },
  {
    title: "实践篇",
    subtitle: "项目实战",
    description: "通过真实项目掌握 AI 编程工具，积累从需求到交付的完整实战经验。",
    icon: Code,
    href: "/practice",
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "hover:border-red-500/50",
    chapters: ["文科生项目", "理工科项目", "职场人士项目", "核心技能"],
  },
  {
    title: "团队篇",
    subtitle: "打造 AI 团队",
    description: "组建 AI 团队、建立工作流程、打造学习型组织，企业级 AI 团队建设指南。",
    icon: Users,
    href: "/team",
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "hover:border-indigo-500/50",
    chapters: ["团队组建", "工具选型", "知识管理", "安全合规"],
  },
]

export function LearningPathSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            选择你的学习路径
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            从零基础到架构师，找到适合你的学习起点
          </p>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => {
            const Icon = path.icon
            return (
              <Link
                key={path.title}
                href={path.href}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                  path.borderColor
                )}
              >
                {/* Gradient background */}
                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity -z-10", path.color)} />
                
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>

                {/* Title */}
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{path.title}</h3>
                  <span className="text-sm text-primary">{path.subtitle}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {path.description}
                </p>

                {/* Chapters preview */}
                <div className="space-y-1.5 mb-4">
                  {path.chapters.slice(0, 3).map((chapter) => (
                    <div key={chapter} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      {chapter}
                    </div>
                  ))}
                  {path.chapters.length > 3 && (
                    <div className="text-xs text-muted-foreground pl-3">
                      +{path.chapters.length - 3} 更多章节
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-foreground transition-colors">
                  开始学习
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
