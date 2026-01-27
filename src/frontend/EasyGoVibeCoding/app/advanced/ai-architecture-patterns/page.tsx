import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Layers, Package, FileCode, Network, Zap, Brain, Sparkles, Code, GitBranch, Lightbulb, CheckSquare, Rocket, Target, RefreshCw, Settings, Boxes, FileText } from "lucide-react"
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

export default function AIArchitecturePatternsPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="AI 适配架构范式"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 适配架构范式
        </h1>
        <p className="text-lg text-muted-foreground">
          了解如何设计适合 AI 代码生成的架构模式，让 AI 成为架构的助力而非阻碍。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">核心洞察：架构即上下文</p>
            <p className="text-muted-foreground">
              在 AI 编程时代，<strong className="text-foreground">架构设计需要考虑 AI 的特点</strong>。
              好的架构应该让 AI 更容易理解和生成代码，而不是增加复杂度。本章将介绍四种 AI 适配的架构范式。
            </p>
          </div>
        </section>

        {/* Section 1: Clean Architecture with AI */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            Clean Architecture with AI
          </h2>
          <p className="text-muted-foreground mb-6">
            Clean Architecture 的分层结构天然适合 AI 分块生成和维护，每一层都有清晰的职责边界。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 生成各层接口与实现</h3>
              <p className="text-muted-foreground mb-4">
                Clean Architecture 的分层结构让 AI 可以专注于单一层次的代码生成。
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Entities（实体层）</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI 根据业务需求生成领域实体，包含业务规则和验证逻辑
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• 纯业务逻辑，无外部依赖</li>
                    <li>• AI 可以基于领域模型生成实体代码</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Use Cases（用例层）</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI 根据用户故事生成用例实现，协调实体和接口层
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• 实现具体的业务用例</li>
                    <li>• AI 可以基于 PRD 生成用例代码</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Interfaces（接口层）</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI 根据接口规范生成适配器实现，连接外部系统
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• 实现外部接口适配</li>
                    <li>• AI 可以基于 API 文档生成接口代码</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">依赖规则的 AI 检查</h3>
              <p className="text-muted-foreground mb-4">
                AI 可以自动检查代码是否符合 Clean Architecture 的依赖规则。
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">依赖规则</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>内层不依赖外层，外层依赖内层</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>依赖方向只能向内，不能向外</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>实体层不依赖任何其他层</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">AI 检查能力</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 分析代码依赖关系，检测违规依赖</li>
                    <li>• 生成依赖关系图，可视化架构</li>
                    <li>• 提出重构建议，修复依赖问题</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">优势：各层解耦，适合 AI 分块生成与维护</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">上下文隔离</div>
                  <div className="ml-4">每一层都有清晰的职责，AI 生成代码时只需要关注当前层的上下文</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">并行开发</div>
                  <div className="ml-4">不同层可以并行生成，提高开发效率</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">易于维护</div>
                  <div className="ml-4">修改某一层时，AI 只需要关注该层的代码，不会影响其他层</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: CDD (Component-Driven Development) */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            CDD (Component-Driven Development)
          </h2>
          <p className="text-muted-foreground mb-6">
            Component-Driven Development 强调从组件开始构建应用，这种自底向上的方式非常适合 AI 生成。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 辅助设计原子组件 (Atomic Design)</h3>
              <p className="text-muted-foreground mb-4">
                Atomic Design 将组件分为原子、分子、组织、模板、页面五个层次，AI 可以从最基础的原子组件开始生成。
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    { level: "原子", desc: "Button, Input", icon: Boxes },
                    { level: "分子", desc: "SearchBox", icon: Package },
                    { level: "组织", desc: "Header, Footer", icon: Layers },
                    { level: "模板", desc: "Page Layout", icon: FileCode },
                    { level: "页面", desc: "Complete Page", icon: FileText },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.level} className="p-3 rounded-lg bg-secondary/50 text-center">
                        <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm mb-1">{item.level}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">AI 生成流程</div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1. 从原子组件开始，AI 生成基础 UI 组件</div>
                    <div>2. 组合原子组件，生成分子组件</div>
                    <div>3. 组合分子组件，生成组织组件</div>
                    <div>4. 组合组织组件，生成页面模板</div>
                    <div>5. 基于模板生成完整页面</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">自动生成 Storybook 文档与测试</h3>
              <p className="text-muted-foreground mb-4">
                AI 可以为每个组件自动生成 Storybook 文档和测试用例。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Storybook 文档</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI 分析组件 Props，生成 Story 文件</li>
                    <li>• 自动生成不同状态的 Story</li>
                    <li>• 生成组件使用文档</li>
                    <li>• 生成组件示例代码</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">测试用例</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI 生成单元测试</li>
                    <li>• 生成视觉回归测试</li>
                    <li>• 生成交互测试</li>
                    <li>• 生成可访问性测试</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">优势：上下文隔离，AI 专注单一组件实现</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">组件隔离</div>
                  <div className="ml-4">每个组件都是独立的，AI 生成时只需要关注组件的 Props 和功能</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">可复用性</div>
                  <div className="ml-4">生成的组件可以在多个地方复用，提高开发效率</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">易于测试</div>
                  <div className="ml-4">组件级别的测试更容易编写和维护</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Spec-First Development */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileCode className="h-6 w-6 text-primary" />
            Spec-First Development
          </h2>
          <p className="text-muted-foreground mb-6">
            Spec-First Development 强调先写规范，再生成代码，规范成为 AI 的"真理之源"。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">PRD → OpenAPI Spec → Code 生成流</h3>
              <div className="space-y-4">
                {[
                  { 
                    step: "1", 
                    title: "PRD 文档", 
                    desc: "编写产品需求文档，定义功能和业务规则",
                    icon: FileText
                  },
                  { 
                    step: "2", 
                    title: "OpenAPI Spec", 
                    desc: "基于 PRD 生成 OpenAPI 规范，定义 API 接口",
                    icon: Code
                  },
                  { 
                    step: "3", 
                    title: "代码生成", 
                    desc: "AI 基于 OpenAPI Spec 生成客户端和服务器代码",
                    icon: Rocket
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
              <h3 className="font-semibold text-foreground mb-4">优势：利用 Spec 作为 AI 的"真理之源"</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">单一数据源</div>
                  <p className="text-sm text-muted-foreground">
                    OpenAPI Spec 是 API 的唯一数据源，前端、后端、文档都基于同一个 Spec 生成，保证一致性
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">类型安全</div>
                  <p className="text-sm text-muted-foreground">
                    Spec 定义了完整的类型信息，AI 生成的代码天然具有类型安全
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">自动同步</div>
                  <p className="text-sm text-muted-foreground">
                    当 Spec 更新时，AI 可以自动更新所有相关代码，保持同步
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">AI 生成能力</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 基于 Spec 生成 TypeScript 类型定义</li>
                    <li>• 生成 API 客户端代码</li>
                    <li>• 生成服务器端路由和控制器</li>
                    <li>• 生成 API 文档和 Mock 数据</li>
                    <li>• 生成集成测试用例</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Micro-Agent Pattern */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-6 w-6 text-primary" />
            Micro-Agent Pattern
          </h2>
          <p className="text-muted-foreground mb-6">
            Micro-Agent Pattern 将复杂功能拆解为多个专门的 Agent，每个 Agent 负责特定的任务。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">将复杂功能拆解为多 Agent 协作网络</h3>
              <p className="text-muted-foreground mb-4">
                将大型任务分解为多个子任务，每个子任务由专门的 Agent 负责，Agent 之间通过消息传递协作。
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Agent 类型</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="font-medium text-foreground text-sm mb-1">架构师 Agent</div>
                      <div className="text-xs text-muted-foreground">负责系统设计和架构决策</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="font-medium text-foreground text-sm mb-1">领域专家 Agent</div>
                      <div className="text-xs text-muted-foreground">负责业务逻辑和领域知识</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="font-medium text-foreground text-sm mb-1">审查 Agent</div>
                      <div className="text-xs text-muted-foreground">负责代码审查和质量检查</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-2">协作流程</div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1. 架构师 Agent 分析需求，制定架构方案</div>
                    <div>2. 领域专家 Agent 实现业务逻辑</div>
                    <div>3. 审查 Agent 检查代码质量，提出改进建议</div>
                    <div>4. Agent 之间通过消息传递协作，完成复杂任务</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">架构师 Agent + 领域专家 Agent + 审查 Agent</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">架构师 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                    <li>• 分析系统需求，设计整体架构</li>
                    <li>• 选择合适的技术栈和设计模式</li>
                    <li>• 定义模块边界和接口规范</li>
                    <li>• 制定开发计划和任务分解</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">领域专家 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                    <li>• 理解业务需求，实现业务逻辑</li>
                    <li>• 应用领域驱动设计原则</li>
                    <li>• 生成领域模型和业务代码</li>
                    <li>• 确保代码符合业务规则</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <div className="font-medium text-foreground">审查 Agent</div>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                    <li>• 检查代码质量和规范</li>
                    <li>• 识别潜在问题和风险</li>
                    <li>• 提出重构和优化建议</li>
                    <li>• 确保代码符合架构设计</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">优势：专业化分工，提高代码质量</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">专业化</div>
                  <div className="ml-4">每个 Agent 专注于自己的领域，提高专业性和准确性</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">可扩展</div>
                  <div className="ml-4">可以根据需要添加新的 Agent，扩展系统能力</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">质量保证</div>
                  <div className="ml-4">审查 Agent 确保代码质量，减少错误和缺陷</div>
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
                理解 Clean Architecture 如何适配 AI 代码生成，掌握分层代码生成策略
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握 Component-Driven Development 的工作方式，能够用 AI 辅助组件设计
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解 Spec-First Development 的价值，能够建立规范驱动的开发流程
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握 Micro-Agent Pattern 的设计思想，能够设计多 Agent 协作系统
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                能够根据项目特点选择合适的 AI 适配架构范式
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ai-native-patterns" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 原生开发模式
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/dev-basics" className="flex items-center gap-2">
            下一章：开发常识
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
