import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Rocket, Target, Code, Zap, FileText, Settings, CheckCircle2, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function NewProjectPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="场景1：从零开始创建新项目"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Rocket className="h-4 w-4" />
          高级实战场景 · 场景1
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          从零开始创建新项目
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握项目启动的完整流程，从需求分析到技术选型，从架构设计到项目初始化。通过AI工具加速项目启动，具备独立启动新项目的能力。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* 学习目标 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              学习目标
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "掌握项目启动的完整流程",
                "具备技术选型和架构设计能力",
                "能够使用AI工具加速项目初始化",
                "理解项目初始化的最佳实践",
              ].map((goal) => (
                <div key={goal} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 方法论 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            方法论
          </h2>

          {/* 项目启动流程 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目启动流程</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">需求分析</strong>：理解业务需求、用户需求、技术需求，明确项目目标和范围
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">技术选型</strong>：根据需求、团队能力、成本、生态等因素选择合适的技术栈
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">架构设计</strong>：设计系统架构、模块划分、数据模型、接口设计
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">项目初始化</strong>：创建项目结构、配置工具链、设置CI/CD、编写初始文档
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型决策框架 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型决策框架</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">选型维度</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "性能", desc: "响应时间、吞吐量、并发能力" },
                    { name: "成本", desc: "开发成本、运维成本、授权费用" },
                    { name: "团队能力", desc: "团队熟悉度、学习曲线、招聘难度" },
                    { name: "生态", desc: "社区活跃度、第三方库、工具支持" },
                    { name: "可维护性", desc: "代码质量、文档完善度、长期支持" },
                    { name: "可扩展性", desc: "水平扩展、垂直扩展、架构灵活性" },
                  ].map((item) => (
                    <div key={item.name} className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">{item.name}</div>
                      <div className="text-xs">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs">
                  <strong className="text-foreground">AI工具应用</strong>：使用Cursor Agent或Spec驱动，根据需求描述自动生成技术选型建议和对比分析。
                </p>
              </div>
            </div>
          </div>

          {/* 架构设计原则 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">架构设计原则</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Clean Architecture</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>分层架构</strong>：Entities → Use Cases → Interfaces → Frameworks</li>
                  <li>• <strong>依赖规则</strong>：内层不依赖外层，依赖方向向内</li>
                  <li>• <strong>AI优势</strong>：各层解耦，适合AI分块生成和维护</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">DDD (Domain-Driven Design)</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>统一语言</strong>：用AI提炼业务领域的统一语言</li>
                  <li>• <strong>限界上下文</strong>：AI辅助划分业务边界</li>
                  <li>• <strong>实体和值对象</strong>：AI生成领域模型代码</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">微服务 vs 单体</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>单体优势</strong>：简单、快速开发、适合小团队</li>
                  <li>• <strong>微服务优势</strong>：独立部署、技术栈灵活、可扩展</li>
                  <li>• <strong>选型建议</strong>：从单体开始，按需演进到微服务</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 项目初始化最佳实践 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">项目初始化最佳实践</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">目录结构</h4>
                <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre>{`project-name/
├── src/
│   ├── app/              # 应用层（Next.js App Router）
│   ├── components/       # UI组件
│   ├── lib/              # 工具函数
│   └── types/            # TypeScript类型
├── prisma/               # 数据库Schema（如使用Prisma）
├── public/               # 静态资源
├── tests/                # 测试文件
├── docs/                 # 项目文档
├── .github/              # GitHub Actions
├── .env.example          # 环境变量示例
├── README.md             # 项目说明
├── package.json          # 依赖管理
└── tsconfig.json         # TypeScript配置`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">工具链配置</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码格式化</strong>：Prettier + ESLint</li>
                  <li>• <strong>类型检查</strong>：TypeScript strict mode</li>
                  <li>• <strong>测试框架</strong>：Jest + React Testing Library</li>
                  <li>• <strong>Git Hooks</strong>：Husky + lint-staged</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">CI/CD配置</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>自动化测试</strong>：每次提交自动运行测试</li>
                  <li>• <strong>代码检查</strong>：自动运行ESLint和类型检查</li>
                  <li>• <strong>自动部署</strong>：通过测试后自动部署到测试/生产环境</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI工具应用 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            AI工具应用
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Cursor Agent进行架构设计
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Cursor的Agent模式，通过自然语言描述需求，AI自动生成架构设计：</p>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">示例Prompt：</p>
                  <p className="font-mono text-xs">
                    "设计一个SaaS应用的架构，包含用户认证、数据存储、API服务、前端界面。要求支持多租户、可扩展、易于维护。"
                  </p>
                </div>
                <ul className="space-y-1 ml-4">
                  <li>• AI会生成系统架构图、模块划分、数据模型设计</li>
                  <li>• 可以迭代优化架构设计，直到满意</li>
                  <li>• 生成架构文档和代码结构</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Spec驱动进行技术选型
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>编写技术选型Spec，AI根据Spec生成选型建议和对比分析：</p>
                <ul className="space-y-1 ml-4">
                  <li>• 明确需求：性能要求、团队规模、预算限制</li>
                  <li>• AI生成：技术栈推荐、对比分析、选型理由</li>
                  <li>• 决策支持：基于数据和技术趋势的选型建议</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Windsurf进行大型项目初始化
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Windsurf的Fast Context技术可以快速理解大型项目结构，加速项目初始化：</p>
                <ul className="space-y-1 ml-4">
                  <li>• 快速分析：分析现有项目结构，理解最佳实践</li>
                  <li>• 模板生成：基于分析结果生成项目模板</li>
                  <li>• 配置同步：自动配置工具链和CI/CD</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Fabric进行项目文档生成
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Fabric的Patterns自动生成项目文档：</p>
                <ul className="space-y-1 ml-4">
                  <li>• README生成：根据项目结构自动生成README</li>
                  <li>• API文档：根据代码注释生成API文档</li>
                  <li>• 架构文档：根据架构设计生成架构文档</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 实战案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            实战案例
          </h2>

          {/* 案例1 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例1：从零开始搭建SaaS应用</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">技术栈</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js", "Prisma", "Vercel", "TypeScript", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：需求分析（2小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 明确业务需求：多租户SaaS应用，支持用户注册、数据管理、权限控制</li>
                  <li>• 技术需求：快速开发、易于扩展、成本可控</li>
                  <li>• 使用AI工具：Cursor Agent进行需求澄清和文档生成</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：技术选型（1小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 前端：Next.js（SSR、API Routes、Vercel部署）</li>
                  <li>• 数据库：PostgreSQL + Prisma（类型安全、迁移管理）</li>
                  <li>• 部署：Vercel（零配置、自动CI/CD）</li>
                  <li>• 使用AI工具：Spec驱动生成选型对比分析</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：架构设计（2小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 系统架构：Next.js App Router + Prisma + Vercel</li>
                  <li>• 数据模型：用户、租户、数据表的多租户设计</li>
                  <li>• API设计：RESTful API + Next.js API Routes</li>
                  <li>• 使用AI工具：Cursor Agent生成架构图和代码结构</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：项目初始化（2小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 创建Next.js项目：npx create-next-app@latest</li>
                  <li>• 配置Prisma：初始化Prisma、设计Schema、生成Client</li>
                  <li>• 配置工具链：ESLint、Prettier、TypeScript、Git Hooks</li>
                  <li>• 设置CI/CD：GitHub Actions自动测试和部署</li>
                  <li>• 使用AI工具：Windsurf快速配置、Fabric生成文档</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 案例2 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例2：从零开始搭建微服务架构</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">技术栈</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Docker", "Kubernetes", "服务网格", "gRPC", "Node.js"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：需求分析（3小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 业务需求：大型分布式系统，需要高可用、可扩展</li>
                  <li>• 技术需求：服务解耦、独立部署、服务治理</li>
                  <li>• 使用AI工具：Cursor Agent进行微服务架构设计</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：服务划分（2小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 用户服务：用户认证、权限管理</li>
                  <li>• 订单服务：订单创建、支付处理</li>
                  <li>• 商品服务：商品管理、库存管理</li>
                  <li>• 使用AI工具：DDD方法划分限界上下文</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：基础设施设计（3小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 容器化：Docker镜像构建和推送</li>
                  <li>• 编排：Kubernetes部署配置</li>
                  <li>• 服务网格：Istio或Linkerd配置</li>
                  <li>• 监控：Prometheus + Grafana</li>
                  <li>• 使用AI工具：Cursor Agent生成K8s配置和部署脚本</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：项目初始化（4小时）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 创建Monorepo结构：使用pnpm workspaces或Nx</li>
                  <li>• 初始化各服务：创建服务模板、配置工具链</li>
                  <li>• 配置CI/CD：多服务构建和部署流程</li>
                  <li>• 使用AI工具：Windsurf批量初始化、Fabric生成文档</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果检查清单 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              学习成果检查清单
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "能够独立完成项目启动流程（需求分析 → 技术选型 → 架构设计 → 项目初始化）",
                "掌握技术选型决策框架，能够根据需求做出合理的技术选型",
                "理解Clean Architecture和DDD等架构设计原则",
                "能够使用Cursor Agent进行架构设计和代码生成",
                "能够使用Spec驱动进行技术选型",
                "能够使用Windsurf和Fabric加速项目初始化",
                "完成至少一个实战案例（SaaS应用或微服务架构）",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/practice/advanced">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回高级实战场景
            </Button>
          </Link>
          <Link href="/practice/advanced/onboarding">
            <Button>
              下一场景：快速熟悉新公司项目
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </CourseLayout>
  )
}
