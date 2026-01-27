import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Rocket, BookOpen, RefreshCw, Target, Zap, Code, Users, Lightbulb } from "lucide-react"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { 
    title: "高级实战场景", 
    href: "/practice/advanced",
    sections: [
      { title: "场景1：从零开始创建新项目", href: "/practice/advanced/new-project" },
      { title: "场景2：快速熟悉新公司项目", href: "/practice/advanced/onboarding" },
      { title: "场景3：业务线切换实战", href: "/practice/advanced/transition" },
    ]
  },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

const scenarios = [
  {
    title: "场景1：从零开始创建新项目",
    icon: Rocket,
    description: "掌握项目启动的完整流程，具备技术选型和架构设计能力",
    href: "/practice/advanced/new-project",
    topics: [
      "项目启动流程（需求分析 → 技术选型 → 架构设计 → 项目初始化）",
      "技术选型决策框架（性能/成本/团队能力/生态）",
      "架构设计原则（Clean Architecture、DDD、微服务 vs 单体）",
      "项目初始化最佳实践（目录结构、工具链配置、CI/CD）",
    ],
    cases: [
      { name: "案例1：从零开始搭建SaaS应用", stack: "Next.js + Prisma + Vercel" },
      { name: "案例2：从零开始搭建微服务架构", stack: "Docker + Kubernetes + 服务网格" },
    ],
    tools: ["Cursor Agent", "Spec驱动", "Windsurf", "Fabric"],
  },
  {
    title: "场景2：快速熟悉新公司项目",
    icon: BookOpen,
    description: "掌握快速理解新项目的系统方法，能够使用AI工具加速代码阅读和理解",
    href: "/practice/advanced/onboarding",
    topics: [
      "代码阅读策略（自顶向下 vs 自底向上）",
      "项目理解框架（业务理解 → 架构理解 → 代码理解）",
      "快速上手工作流（文档阅读 → 代码探索 → 小功能开发 → 重构优化）",
      "知识沉淀方法（笔记、文档、Skill/Pattern创建）",
    ],
    cases: [
      { name: "案例1：快速熟悉Monorepo项目", stack: "Windsurf + Cursor" },
      { name: "案例2：快速熟悉遗留系统", stack: "Zread + Cursor Agent" },
    ],
    tools: ["Windsurf Fast Context", "Cursor Agent", "Zread", "NotebookLM", "Fabric"],
  },
  {
    title: "场景3：业务线切换实战",
    icon: RefreshCw,
    description: "掌握业务切换的系统方法，具备快速适应新业务的能力",
    href: "/practice/advanced/transition",
    topics: [
      "业务切换流程（业务理解 → 技术栈迁移 → 知识迁移 → 工作流适配）",
      "业务理解框架（业务模型 → 业务流程 → 业务规则）",
      "技术栈迁移策略（相似技术栈 vs 不同技术栈）",
      "知识迁移方法（文档、代码、最佳实践）",
    ],
    cases: [
      { name: "案例1：从电商切换到金融业务", stack: "业务模型差异、技术栈相似" },
      { name: "案例2：从Web切换到移动开发", stack: "技术栈差异、业务逻辑相似" },
    ],
    tools: ["Cursor Agent", "Spec驱动", "Fabric", "代码迁移工具"],
  },
]

export default function AdvancedPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="高级实战场景"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Zap className="h-4 w-4" />
          高级实战场景
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          高级实战场景
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          面向所有开发者的高级实战场景，涵盖项目启动、快速上手、业务切换等职场常见挑战。每个场景都包含完整的方法论和实战案例，内容深度与"全栈项目实战"相当。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          适合人群
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "需要从零开始创建新项目的开发者",
            "刚入职需要快速熟悉新公司项目的开发者",
            "需要切换业务线或技术栈的开发者",
            "想提升职场适应能力的技术人员",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">实战场景</h2>
        <div className="space-y-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon
            return (
              <Link
                key={scenario.title}
                href={scenario.href}
                className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {scenario.title}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    核心内容
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {scenario.topics.map((topic) => (
                      <div key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cases */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    实战案例
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scenario.cases.map((caseItem) => (
                      <div key={caseItem.name} className="p-3 rounded-lg bg-secondary/50">
                        <div className="text-sm font-medium text-foreground mb-1">{caseItem.name}</div>
                        <div className="text-xs text-muted-foreground">{caseItem.stack}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    AI工具应用
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Learning Path */}
      <div className="mb-12 p-6 rounded-xl border border-primary/50 bg-primary/5">
        <h2 className="text-xl font-semibold text-foreground mb-4">学习路径建议</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
            <div>
              <strong className="text-foreground">建议顺序</strong>：场景1（项目启动）→ 场景2（快速上手）→ 场景3（业务切换）
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
            <div>
              <strong className="text-foreground">前置知识</strong>：建议先完成"全栈项目实战"和"职场人士项目"，掌握基础的项目管理和开发流程
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
            <div>
              <strong className="text-foreground">学习方式</strong>：每个场景包含完整的方法论和实战案例，建议先理解方法论，再跟随实战案例动手实践
            </div>
          </div>
        </div>
      </div>
    </CourseLayout>
  )
}
