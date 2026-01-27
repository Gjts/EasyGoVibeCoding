import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TestTube, Layers, Network, Database, Zap, Brain, Sparkles, Code, GitBranch, Lightbulb, CheckSquare, Rocket, Target, RefreshCw, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

export default function AINativePatternsPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="AI 原生开发模式"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 原生开发模式
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握 AI 时代的开发范式，从 TDD 2.0 到 Agent-Driven Development，让 AI 成为你的最佳开发伙伴。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">核心洞察：AI 原生思维</p>
            <p className="text-muted-foreground">
              在 AI 编程时代，<strong className="text-foreground">开发模式需要重新设计</strong>。
              传统的开发方法需要适配 AI 的能力和特点，才能发挥最大价值。本章将介绍四种 AI 原生开发模式，帮助你建立新的开发思维。
            </p>
          </div>
        </section>

        {/* Section 1: TDD 2.0 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TestTube className="h-6 w-6 text-primary" />
            TDD (Test-Driven Development) 2.0
          </h2>
          <p className="text-muted-foreground mb-6">
            传统的 TDD 是红-绿-重构循环，AI 时代让这个循环变得更快、更智能。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 生成测试用例 (Given-When-Then)</h3>
              <p className="text-muted-foreground mb-4">
                使用 BDD（行为驱动开发）风格的测试用例，让 AI 更容易理解需求并生成测试。
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Given-When-Then 格式</div>
                  <div className="space-y-2 text-sm text-muted-foreground font-mono">
                    <div><span className="text-primary">Given</span> 用户已登录</div>
                    <div><span className="text-primary">When</span> 用户点击"提交订单"按钮</div>
                    <div><span className="text-primary">Then</span> 系统创建订单并返回订单号</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">AI 优势</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>AI 可以快速生成大量测试用例，覆盖边界情况</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Given-When-Then 格式让 AI 更容易理解测试意图</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>测试用例即文档，AI 可以基于测试生成实现代码</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">红-绿-重构循环的 AI 加速机制</h3>
              <div className="space-y-4">
                {[
                  { 
                    step: "红", 
                    title: "写测试", 
                    desc: "AI 根据需求生成测试用例，快速覆盖功能点",
                    icon: TestTube,
                    color: "text-red-500"
                  },
                  { 
                    step: "绿", 
                    title: "写实现", 
                    desc: "AI 根据测试用例生成最小可用实现，快速通过测试",
                    icon: CheckSquare,
                    color: "text-green-500"
                  },
                  { 
                    step: "重构", 
                    title: "优化代码", 
                    desc: "AI 分析代码质量，提出重构建议并执行优化",
                    icon: RefreshCw,
                    color: "text-blue-500"
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ${item.color} font-bold text-lg`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-5 w-5 ${item.color}`} />
                          <h4 className="font-medium text-foreground">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">实战：让 AI 先写测试，再写实现</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">步骤 1：描述需求</div>
                  <div className="ml-4">"实现一个用户登录功能，需要验证用户名和密码"</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">步骤 2：AI 生成测试用例</div>
                  <div className="ml-4">AI 根据需求生成 Given-When-Then 格式的测试用例</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">步骤 3：AI 生成实现代码</div>
                  <div className="ml-4">AI 根据测试用例生成最小可用实现，确保测试通过</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">步骤 4：AI 重构优化</div>
                  <div className="ml-4">AI 分析代码质量，提出并执行重构建议</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: DDD with AI */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            DDD (Domain-Driven Design) with AI
          </h2>
          <p className="text-muted-foreground mb-6">
            领域驱动设计需要深入理解业务领域，AI 可以帮助我们更好地提炼领域知识。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">用 AI 提炼统一语言 (Ubiquitous Language)</h3>
              <p className="text-muted-foreground mb-4">
                统一语言是 DDD 的核心，AI 可以帮助我们从业务文档中提取领域术语。
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">AI 辅助流程</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">1.</span>
                      <span>输入业务文档、需求文档、用户故事</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">2.</span>
                      <span>AI 分析文档，提取领域术语和概念</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">3.</span>
                      <span>AI 识别术语的同义词和关联关系</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">4.</span>
                      <span>生成统一语言词典，确保团队使用一致</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 辅助划分限界上下文 (Bounded Contexts)</h3>
              <p className="text-muted-foreground mb-4">
                限界上下文是 DDD 中最重要的概念，AI 可以帮助识别和划分上下文边界。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">识别上下文</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI 分析业务领域，识别不同的业务上下文</li>
                    <li>• 识别上下文之间的依赖关系</li>
                    <li>• 识别上下文映射模式（共享内核、客户-供应商等）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">划分边界</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI 建议上下文边界划分方案</li>
                    <li>• 识别上下文之间的集成点</li>
                    <li>• 生成上下文映射图</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">实体/值对象/聚合根的代码生成策略</h3>
              <p className="text-muted-foreground mb-4">
                AI 可以根据领域模型自动生成实体、值对象和聚合根的代码结构。
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">实体 (Entity)</div>
                  <p className="text-sm text-muted-foreground">
                    AI 识别具有唯一标识的业务对象，生成实体类和 ID 属性
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">值对象 (Value Object)</div>
                  <p className="text-sm text-muted-foreground">
                    AI 识别不可变的值类型，生成值对象类和验证逻辑
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">聚合根 (Aggregate Root)</div>
                  <p className="text-sm text-muted-foreground">
                    AI 识别聚合边界，生成聚合根类和业务规则
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: ADD (Agent-Driven Development) */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-6 w-6 text-primary" />
            ADD (Agent-Driven Development)
          </h2>
          <p className="text-muted-foreground mb-6">
            Agent-Driven Development 是一种新的开发范式，通过多个 AI Agent 协作完成开发任务。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Plan-Execute-Evaluate 循环</h3>
              <div className="space-y-4">
                {[
                  { 
                    step: "Plan", 
                    title: "规划阶段", 
                    desc: "架构师 Agent 分析需求，制定开发计划，分解任务",
                    icon: Target
                  },
                  { 
                    step: "Execute", 
                    title: "执行阶段", 
                    desc: "编码 Agent 根据计划生成代码，测试 Agent 生成测试用例",
                    icon: Code
                  },
                  { 
                    step: "Evaluate", 
                    title: "评估阶段", 
                    desc: "审查 Agent 检查代码质量，提出改进建议，循环优化",
                    icon: CheckSquare
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-5 w-5 text-primary" />
                          <h4 className="font-medium text-foreground">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">多 Agent 协作模式</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">架构师 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 分析需求</li>
                    <li>• 设计架构</li>
                    <li>• 制定计划</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">编码 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 生成代码</li>
                    <li>• 实现功能</li>
                    <li>• 代码优化</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TestTube className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">测试 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 生成测试</li>
                    <li>• 执行测试</li>
                    <li>• 质量检查</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: RAG-DD (RAG-Driven Development) */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            RAG-DD (RAG-Driven Development)
          </h2>
          <p className="text-muted-foreground mb-6">
            RAG-Driven Development 利用私有知识库增强 AI 的代码生成能力，让 AI 基于团队的知识和经验生成代码。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">基于私有知识库的代码生成</h3>
              <p className="text-muted-foreground mb-4">
                将团队的架构文档、设计模式、最佳实践等知识库化，让 AI 在生成代码时参考这些知识。
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">知识库内容</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>架构设计文档和设计模式</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>代码规范和最佳实践</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>历史项目经验和教训</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>团队的技术栈和工具链</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">工作流程</div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1. 用户提出需求</div>
                    <div>2. RAG 系统检索相关知识</div>
                    <div>3. AI 基于检索到的知识生成代码</div>
                    <div>4. 生成的代码符合团队的架构和规范</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">架构文档即上下文</h3>
              <p className="text-muted-foreground mb-4">
                将架构文档作为 RAG 系统的核心上下文，确保生成的代码符合架构设计。
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">架构文档类型</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 系统架构图和技术选型文档</li>
                    <li>• API 设计规范和接口文档</li>
                    <li>• 数据库设计和数据模型</li>
                    <li>• 微服务划分和服务边界</li>
                    <li>• 安全规范和权限模型</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">优势</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>生成的代码自动符合架构设计</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>减少架构偏离和重构成本</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>新成员可以快速理解架构并生成符合规范的代码</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握 TDD 2.0 的核心思想，能够使用 AI 加速测试驱动开发
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解 DDD with AI 的工作方式，能够用 AI 辅助领域建模
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握 Agent-Driven Development 的多 Agent 协作模式
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解 RAG-Driven Development 的价值，能够建立私有知识库
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                能够根据项目特点选择合适的 AI 原生开发模式
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/prd" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：PRD 与文档驱动
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/ai-architecture-patterns" className="flex items-center gap-2">
            下一章：AI 适配架构范式
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
