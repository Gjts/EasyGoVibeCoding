import { CheckCircle2 } from "lucide-react"

const audiences = [
  {
    role: "零基础小白",
    description: "从未写过代码的文科生、设计师、产品经理",
    recommended: ["基础篇", "实践篇"],
    goals: ["理解 AI 编程工具", "掌握基础使用", "做出第一个作品"],
  },
  {
    role: "初级开发者",
    description: "有一定编程基础，想提升效率的开发者",
    recommended: ["进阶篇", "工具篇"],
    goals: ["掌握核心技术", "企业级实践", "架构权衡思维"],
  },
  {
    role: "架构师",
    description: "想深入理解 AI 工具原理和架构的技术专家",
    recommended: ["架构篇", "工具篇"],
    goals: ["理解底层架构", "工具选型决策", "技术路线规划"],
  },
  {
    role: "技术管理者",
    description: "技术负责人、团队 Leader、CTO",
    recommended: ["团队篇", "架构篇"],
    goals: ["组建 AI 团队", "建立工作流程", "成本与安全管理"],
  },
]

export function AudienceSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            找到适合你的学习路径
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            无论你的背景如何，都能找到合适的起点
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {audiences.map((audience) => (
            <div
              key={audience.role}
              className="relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">{audience.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{audience.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-sm font-medium text-foreground mb-3">推荐课程</div>
                <div className="flex flex-wrap gap-2">
                  {audience.recommended.map((course) => (
                    <span
                      key={course}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-foreground mb-3">学习目标</div>
                <ul className="space-y-2">
                  {audience.goals.map((goal) => (
                    <li key={goal} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
