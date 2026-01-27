import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, RefreshCw, Target, Code, Zap, FileText, CheckCircle2, Lightbulb, ArrowRightLeft, Layers } from "lucide-react"
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

export default function TransitionPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="场景3：业务线切换实战"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <RefreshCw className="h-4 w-4" />
          高级实战场景 · 场景3
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          业务线切换实战
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握业务切换的系统方法，从业务理解到技术栈迁移，从知识迁移到工作流适配。通过AI工具加速业务切换，快速适应新业务线。
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
                "掌握业务切换的系统方法",
                "具备快速适应新业务的能力",
                "能够使用AI工具加速知识迁移",
                "理解业务理解框架（业务模型 → 业务流程 → 业务规则）",
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

          {/* 业务切换流程 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">业务切换流程</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">业务理解</strong>：理解新业务的业务模型、业务流程、业务规则
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 阅读业务文档、产品文档、需求文档</li>
                    <li>• 理解业务目标和用户需求</li>
                    <li>• 使用AI工具：Cursor Agent进行业务分析、Spec驱动梳理业务模型</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">技术栈迁移</strong>：理解新业务的技术栈，迁移或学习新技术
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 分析技术栈差异和相似性</li>
                    <li>• 制定技术栈迁移策略</li>
                    <li>• 使用AI工具：Cursor Agent学习新技术、代码迁移工具</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">知识迁移</strong>：将旧业务的知识迁移到新业务
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 识别可复用的知识和经验</li>
                    <li>• 适配到新业务场景</li>
                    <li>• 使用AI工具：Fabric进行知识提取、Cursor Skill封装可复用模式</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">工作流适配</strong>：适应新业务的开发流程和工作方式
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 理解新业务的开发流程</li>
                    <li>• 适应新的协作方式</li>
                    <li>• 建立新的工作流和工具链</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 业务理解框架 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">业务理解框架</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">业务模型</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>实体</strong>：业务中的核心实体（用户、商品、订单等）</li>
                  <li>• <strong>关系</strong>：实体之间的关系和依赖</li>
                  <li>• <strong>价值流</strong>：业务价值如何产生和流转</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Agent分析业务模型、生成领域模型图</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">业务流程</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>主流程</strong>：核心业务流程（下单、支付、发货等）</li>
                  <li>• <strong>异常流程</strong>：异常情况的处理流程</li>
                  <li>• <strong>边界情况</strong>：边界条件和特殊场景</li>
                  <li>• <strong>使用AI工具</strong>：Spec驱动梳理业务流程、生成流程图</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">业务规则</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>业务约束</strong>：业务中的约束和限制</li>
                  <li>• <strong>业务逻辑</strong>：业务中的计算和处理逻辑</li>
                  <li>• <strong>业务策略</strong>：业务中的策略和规则</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Agent提取业务规则、生成规则文档</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 技术栈迁移策略 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术栈迁移策略</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">相似技术栈</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>优势</strong>：学习成本低，可以快速上手</li>
                  <li>• <strong>策略</strong>：重点关注业务逻辑差异，技术实现可以复用</li>
                  <li>• <strong>示例</strong>：从React切换到Vue，从Express切换到Fastify</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Agent进行代码迁移、适配新框架</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">不同技术栈</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>挑战</strong>：学习成本高，需要重新学习</li>
                  <li>• <strong>策略</strong>：重点关注业务逻辑，技术实现需要重新学习</li>
                  <li>• <strong>示例</strong>：从Web开发切换到移动开发，从后端切换到前端</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Agent学习新技术、生成学习路径</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs">
                  <strong className="text-foreground">AI工具应用</strong>：无论技术栈是否相似，都可以使用AI工具加速学习和迁移。AI可以帮助理解业务逻辑、生成代码、适配新框架。
                </p>
              </div>
            </div>
          </div>

          {/* 知识迁移方法 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">知识迁移方法</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">文档迁移</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>业务文档</strong>：将旧业务的业务文档适配到新业务</li>
                  <li>• <strong>技术文档</strong>：将技术文档中的通用部分提取出来</li>
                  <li>• <strong>最佳实践</strong>：将最佳实践文档迁移到新业务</li>
                  <li>• <strong>使用AI工具</strong>：Fabric进行文档提取和适配、NotebookLM整理文档</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">代码迁移</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>通用代码</strong>：识别可以复用的通用代码</li>
                  <li>• <strong>设计模式</strong>：将设计模式适配到新业务</li>
                  <li>• <strong>工具函数</strong>：迁移通用的工具函数</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Agent进行代码迁移、适配新框架</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">最佳实践迁移</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>开发流程</strong>：将开发流程适配到新业务</li>
                  <li>• <strong>代码规范</strong>：将代码规范迁移到新业务</li>
                  <li>• <strong>测试策略</strong>：将测试策略适配到新业务</li>
                  <li>• <strong>使用AI工具</strong>：Cursor Skill封装可复用模式、Fabric生成最佳实践文档</li>
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
                使用Cursor Agent进行业务逻辑理解
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Cursor的Agent模式，快速理解新业务的业务逻辑：</p>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">示例Prompt：</p>
                  <p className="font-mono text-xs">
                    "分析这个电商业务的业务模型，包括核心实体、实体关系、价值流。对比我之前做的金融业务，找出相似和差异。"
                  </p>
                </div>
                <ul className="space-y-1 ml-4">
                  <li>• AI会分析业务文档和代码，理解业务逻辑</li>
                  <li>• 对比新旧业务，找出相似和差异</li>
                  <li>• 生成业务模型图和对比分析</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Spec驱动进行业务模型梳理
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>编写业务Spec，AI根据Spec生成业务模型和流程：</p>
                <ul className="space-y-1 ml-4">
                  <li>• 明确业务目标、用户需求、业务流程</li>
                  <li>• AI生成业务模型、实体关系、流程图</li>
                  <li>• 对比新旧业务，识别可复用部分</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Fabric进行业务文档生成
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Fabric的Patterns自动生成业务文档：</p>
                <ul className="space-y-1 ml-4">
                  <li>• 业务概览：根据业务文档生成业务概览</li>
                  <li>• 业务流程：根据代码生成业务流程文档</li>
                  <li>• 业务规则：提取业务规则，生成规则文档</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用AI工具进行代码迁移和适配
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用AI工具将旧业务的代码迁移到新业务：</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码迁移</strong>：将通用代码迁移到新业务</li>
                  <li>• <strong>框架适配</strong>：将代码适配到新的技术栈</li>
                  <li>• <strong>业务适配</strong>：将业务逻辑适配到新业务场景</li>
                  <li>• <strong>使用工具</strong>：Cursor Agent、代码迁移工具</li>
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
            <h3 className="text-xl font-semibold text-foreground mb-4">案例1：从电商业务切换到金融业务</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">业务特点对比</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-2">电商业务</div>
                    <ul className="space-y-1 text-xs">
                      <li>• 核心实体：商品、订单、用户</li>
                      <li>• 业务流程：浏览、下单、支付、发货</li>
                      <li>• 技术栈：Next.js + Prisma + PostgreSQL</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-2">金融业务</div>
                    <ul className="space-y-1 text-xs">
                      <li>• 核心实体：账户、交易、产品</li>
                      <li>• 业务流程：开户、交易、结算、风控</li>
                      <li>• 技术栈：Next.js + Prisma + PostgreSQL（相似）</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：业务理解（3天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 使用Cursor Agent分析金融业务的业务模型</li>
                  <li>• 对比电商业务，找出相似和差异</li>
                  <li>• 使用Spec驱动梳理业务流程</li>
                  <li>• 生成业务模型图和对比分析</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：技术栈迁移（1天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 技术栈相似，重点关注业务逻辑差异</li>
                  <li>• 复用通用的技术实现（认证、权限、API设计）</li>
                  <li>• 适配金融业务特有的功能（风控、合规、审计）</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：知识迁移（2天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 复用通用的开发流程和代码规范</li>
                  <li>• 复用通用的工具函数和组件</li>
                  <li>• 适配金融业务特有的业务规则和约束</li>
                  <li>• 使用Cursor Skill封装可复用模式</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：工作流适配（1天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 理解金融业务的开发流程（合规审查、安全审计）</li>
                  <li>• 适应新的协作方式（跨部门协作、文档要求）</li>
                  <li>• 建立新的工作流和工具链</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 案例2 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例2：从Web开发切换到移动开发</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">技术栈对比</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-2">Web开发</div>
                    <ul className="space-y-1 text-xs">
                      <li>• 前端：React + TypeScript</li>
                      <li>• 状态管理：Zustand</li>
                      <li>• UI库：Tailwind CSS + shadcn/ui</li>
                      <li>• 业务逻辑：订单管理、支付流程</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-2">移动开发</div>
                    <ul className="space-y-1 text-xs">
                      <li>• 前端：React Native + TypeScript</li>
                      <li>• 状态管理：Zustand（相似）</li>
                      <li>• UI库：React Native组件</li>
                      <li>• 业务逻辑：订单管理、支付流程（相似）</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：业务理解（2天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 业务逻辑相似，重点关注移动端的交互差异</li>
                  <li>• 理解移动端的用户体验要求</li>
                  <li>• 使用Cursor Agent分析业务逻辑，识别可复用部分</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：技术栈迁移（5-7天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 学习React Native，理解与React的差异</li>
                  <li>• 使用Cursor Agent学习React Native最佳实践</li>
                  <li>• 复用业务逻辑代码（状态管理、API调用）</li>
                  <li>• 适配UI组件到React Native组件</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：知识迁移（3天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 复用业务逻辑和状态管理代码</li>
                  <li>• 复用API调用和数据处理逻辑</li>
                  <li>• 适配UI组件到移动端</li>
                  <li>• 使用Cursor Agent进行代码迁移和适配</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：工作流适配（2天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 理解移动开发的特殊流程（打包、发布、版本管理）</li>
                  <li>• 适应移动端的测试和调试方式</li>
                  <li>• 建立移动开发的工作流和工具链</li>
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
                "掌握业务切换流程（业务理解 → 技术栈迁移 → 知识迁移 → 工作流适配）",
                "理解业务理解框架（业务模型 → 业务流程 → 业务规则），能够系统化地理解新业务",
                "掌握技术栈迁移策略（相似技术栈 vs 不同技术栈），能够根据情况选择合适的策略",
                "掌握知识迁移方法（文档、代码、最佳实践），能够将旧业务的知识迁移到新业务",
                "能够使用Cursor Agent进行业务逻辑理解和代码迁移",
                "能够使用Spec驱动进行业务模型梳理",
                "能够使用Fabric进行业务文档生成和知识提取",
                "具备快速适应新业务的能力，能够在短时间内融入新业务线",
                "完成至少一个实战案例（电商到金融或Web到移动）",
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
          <Link href="/practice/advanced/onboarding">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一场景：快速熟悉新公司项目
            </Button>
          </Link>
          <Link href="/practice/advanced">
            <Button>
              返回高级实战场景
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </CourseLayout>
  )
}
