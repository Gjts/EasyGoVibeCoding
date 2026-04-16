import { CourseLayout } from "@/components/course/course-layout"
import { practiceChapters } from "@/components/course/chapters"
import Link from "next/link"
import { ArrowRight, Rocket, BookOpen, RefreshCw, Database, Network, Target, Zap, Code, Users, Lightbulb } from "lucide-react"

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
  {
    title: "场景4：RAG 实战",
    icon: Database,
    description: "面向企业知识库与长代码分析的 RAG 落地实践，掌握从检索设计到效果评估的完整闭环",
    href: "/practice/advanced/rag",
    topics: [
      "RAG-DD 工作流（需求 → 语料 → 检索 → 评估 → 迭代）",
      "知识库建设（分块策略、元数据、更新机制、权限边界）",
      "检索链路设计（向量检索、混合检索、重排序、上下文组装）",
      "效果优化（召回率、命中率、幻觉控制、失败案例复盘）",
    ],
    cases: [
      { name: "案例1：企业内部知识库问答", stack: "文档中心 + 向量数据库 + Claude" },
      { name: "案例2：大型代码仓库检索增强助手", stack: "代码索引 + 检索重排 + 架构文档上下文" },
    ],
    tools: ["Claude", "向量数据库", "Embedding", "重排序模型"],
  },
  {
    title: "场景5：Agent 实战",
    icon: Network,
    description: "以 ADD 和多 Agent 协作为核心，掌握从任务拆解到工程治理的智能体实战方法",
    href: "/practice/advanced/agent",
    topics: [
      "ADD 工作流（目标拆解 → 角色分工 → 上下文契约 → 审核交付）",
      "多 Agent 协作模式（Planner / Executor / Reviewer / Specialist）",
      "工程治理（可观测性、重试策略、审批门禁、成本与延迟控制）",
      "失败模式治理（上下文漂移、重复劳动、职责不清、过度拆分）",
    ],
    cases: [
      { name: "案例1：多 Agent 代码评审流水线", stack: "架构评审 + 安全检查 + 性能分析 + 报告汇总" },
      { name: "案例2：需求到交付的 Agent 开发流程", stack: "Planner + Coding Agent + QA Agent + Release Gate" },
    ],
    tools: ["Claude Code", "Cursor Agent", "任务编排", "结构化日志"],
  },
]

export default function AdvancedPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={practiceChapters}
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
          面向所有开发者的高级实战场景，涵盖项目启动、快速上手、业务切换、RAG 落地与多 Agent 协作等职场常见挑战。每个场景都包含完整的方法论和实战案例，内容深度与《全栈项目实战》相当。
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
            "想落地企业知识库或 Agent 工作流的技术人员",
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
          {scenarios.map((scenario) => {
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
              <strong className="text-foreground">建议顺序</strong>：场景1（项目启动）→ 场景2（快速上手）→ 场景3（业务切换）→ 场景4（RAG 实战）→ 场景5（Agent 实战）
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
            <div>
              <strong className="text-foreground">前置知识</strong>：建议先完成《全栈项目实战》和《职场人士项目》，掌握基础的项目管理、文档驱动和工程协作流程
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
            <div>
              <strong className="text-foreground">学习方式</strong>：每个场景包含完整的方法论和实战案例，建议先理解方法论，再结合案例设计自己的落地方案
            </div>
          </div>
        </div>
      </div>
    </CourseLayout>
  )
}
