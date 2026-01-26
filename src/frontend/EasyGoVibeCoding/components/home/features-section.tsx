import { Code2, Cpu, GitBranch, Lightbulb, Shield, Zap } from "lucide-react"

const features = [
  {
    name: "工具深度解析",
    description: "从 Cursor 到 Claude Code，深入理解每个工具的设计哲学和最佳实践。",
    icon: Code2,
  },
  {
    name: "架构原理剖析",
    description: "Transformer、Mamba、MoE 等架构深度解析，理解 AI 背后的工程原理。",
    icon: Cpu,
  },
  {
    name: "MCP/Skill/Agent",
    description: "掌握 Model Context Protocol、Skill 系统和 Agent 编排等核心技术。",
    icon: GitBranch,
  },
  {
    name: "Prompt 工程",
    description: "RTCC 框架、Chain of Thought、Few-Shot Learning 等高级 Prompt 技巧。",
    icon: Lightbulb,
  },
  {
    name: "企业级安全",
    description: "数据分类、隐私保护、合规审计，企业级 AI 工具使用的安全最佳实践。",
    icon: Shield,
  },
  {
    name: "效率提升",
    description: "从码农到指挥官，用 AI 工具实现 10x 工程师的效率提升。",
    icon: Zap,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            不只是工具使用，更是工程思维
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            理解机制才能驾驭工具，掌握原理才能应对变化
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.name} className="relative group">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
