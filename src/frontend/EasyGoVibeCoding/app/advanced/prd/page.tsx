import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText, CheckSquare, ListTree, Target, Zap, Brain, Sparkles, Code, GitBranch, Lightbulb, ArrowRightCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

export default function PRDPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="PRD 与文档驱动"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          PRD 与文档驱动
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握文档驱动开发的核心思想，学会用 AI 辅助编写 PRD，建立结构化思考方法，让文档成为开发的指南针。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">核心洞察：文档即上下文</p>
            <p className="text-muted-foreground">
              在 AI 编程时代，<strong className="text-foreground">文档不是负担，而是 AI 理解需求的上下文</strong>。
              好的 PRD 让 AI 准确理解需求，生成符合预期的代码。看完上一章的 VibeCoding 工作流，现在我们来学习如何编写 AI 可读的文档。
            </p>
          </div>
        </section>

        {/* Section 1: 为什么需要 PRD */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            为什么需要 PRD
          </h2>
          <p className="text-muted-foreground mb-6">
            在传统开发中，PRD 是团队沟通的工具。在 AI 编程时代，PRD 是<strong className="text-foreground">AI 理解需求的上下文</strong>。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">传统开发</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• PRD 用于团队沟通</li>
                <li>• 需求理解依赖人工讨论</li>
                <li>• 文档和代码容易脱节</li>
                <li>• 变更需要人工同步</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">AI 编程时代</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong className="text-foreground">PRD 是 AI 的上下文</strong></li>
                <li>• AI 直接读取 PRD 生成代码</li>
                <li>• 文档即代码，版本同步</li>
                <li>• 变更自动触发代码更新</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">文档驱动的价值</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">减少返工</strong>：先写文档，AI 理解后再编码，避免理解偏差
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">提高质量</strong>：结构化文档让 AI 生成更准确的代码
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">可追溯性</strong>：文档版本控制，变更历史清晰
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">团队协作</strong>：文档是团队共同语言，减少沟通成本
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 结构化思考方法 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            结构化思考方法：Sequential Thinking
          </h2>
          <p className="text-muted-foreground mb-6">
            编写 PRD 不是一蹴而就的，需要<strong className="text-foreground">结构化思考</strong>。
            使用 Sequential Thinking（顺序思考）方法，将复杂问题分解为可管理的步骤。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Sequential Thinking 工作流</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "问题分解", desc: "将复杂需求分解为多个子问题，每个子问题独立可解", icon: ListTree },
                  { step: "2", title: "逐步思考", desc: "对每个子问题逐步深入思考，记录思考过程", icon: Brain },
                  { step: "3", title: "验证假设", desc: "对每个假设进行验证，确保逻辑正确", icon: CheckSquare },
                  { step: "4", title: "整合方案", desc: "将各个子问题的解决方案整合为完整方案", icon: Sparkles },
                  { step: "5", title: "迭代优化", desc: "根据反馈不断优化和完善方案", icon: ArrowRightCircle },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
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
              <h3 className="font-semibold text-foreground mb-3">实战示例：用户登录功能</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">思考步骤 1：问题分解</div>
                  <div className="ml-4 space-y-1">
                    <div>• 用户如何输入账号密码？</div>
                    <div>• 如何验证用户身份？</div>
                    <div>• 登录成功后如何保持状态？</div>
                    <div>• 如何处理登录失败？</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">思考步骤 2：逐步深入</div>
                  <div className="ml-4 space-y-1">
                    <div>• 前端：表单验证、错误提示、加载状态</div>
                    <div>• 后端：密码加密、Token 生成、会话管理</div>
                    <div>• 安全：防暴力破解、CSRF 防护</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-1">思考步骤 3：整合方案</div>
                  <div className="ml-4">
                    将前端、后端、安全三个维度的方案整合为完整的登录功能设计
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">使用 AI 辅助结构化思考</h3>
              <p className="text-sm text-muted-foreground mb-3">
                使用 Sequential Thinking MCP 工具或类似的思考方法，让 AI 帮助你：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">分解复杂问题</strong>：AI 帮你识别关键子问题</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">记录思考过程</strong>：每一步思考都被记录下来，可追溯</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">验证逻辑</strong>：AI 帮你检查逻辑漏洞</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">迭代优化</strong>：根据反馈不断改进方案</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: PRD 编写指南 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            PRD 编写指南
          </h2>
          <p className="text-muted-foreground mb-6">
            PRD（Product Requirements Document）是产品需求的完整描述。
            在 AI 编程时代，PRD 需要<strong className="text-foreground">结构化、可执行、AI 可读</strong>。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">PRD 核心结构</h3>
              <div className="space-y-4">
                {[
                  { title: "1. 产品概述", desc: "产品定位、目标用户、核心价值、一句话目标", required: true },
                  { title: "2. 功能需求", desc: "功能列表、用户故事、优先级、验收标准", required: true },
                  { title: "3. 非功能需求", desc: "性能、安全、可用性、可扩展性要求", required: true },
                  { title: "4. 接口定义", desc: "输入输出、数据结构、错误处理、API 规范", required: true },
                  { title: "5. 约束与假设", desc: "技术约束、资源限制、前提条件、非目标", required: true },
                  { title: "6. 验收标准", desc: "功能验收、性能验收、安全验收、DoD 清单", required: true },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      {item.required && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">必填</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">AI 可读的 PRD 原则</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="text-sm font-medium text-foreground mb-2">❌ 模糊描述</div>
                  <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                    {`用户登录功能
- 用户可以登录
- 登录后可以访问系统`}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm font-medium text-foreground mb-2">✅ 结构化描述</div>
                  <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                    {`用户登录功能
目标：用户通过账号密码登录系统
输入：username (string), password (string)
输出：token (string), userInfo (object)
错误：401 密码错误, 429 请求过于频繁
验收：输入正确密码返回 token，错误密码返回 401`}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">PRD 编写最佳实践</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">明确目标</strong>：每个功能都要回答"为什么需要"和"一句话目标"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">定义非目标</strong>：明确说明不做什么，避免范围蔓延</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">结构化描述</strong>：使用 Markdown 格式，清晰的层级结构</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">可测试性</strong>：需求要能够被验证和测试，包含验收标准</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">版本控制</strong>：PRD 应该像代码一样进行版本管理（Git）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">持续更新</strong>：需求变更时及时更新文档，保持文档和代码同步</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Spec 驱动开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            Spec 驱动开发
          </h2>
          <p className="text-muted-foreground mb-6">
            Spec-Driven Development 强调<strong className="text-foreground">先写规范，再写代码</strong>。
            规范即上下文，让 AI 更好地理解需求，生成符合预期的代码。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">传统开发流程</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">1</span>
                  <span>需求讨论</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">2</span>
                  <span>直接编码</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">3</span>
                  <span>发现问题</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">4</span>
                  <span>返工修改</span>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Spec 驱动流程</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
                  <span><strong className="text-foreground">编写 Spec</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
                  <span><strong className="text-foreground">评审确认</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</span>
                  <span><strong className="text-foreground">基于 Spec 编码</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">4</span>
                  <span><strong className="text-foreground">按 Spec 验收</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">Spec 的核心要素</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">目标 (Goals)</strong>：这个功能要解决什么问题？一句话目标是什么？
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">非目标 (Non-Goals)</strong>：这个功能不做什么？明确边界
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">接口定义</strong>：输入输出、数据结构、错误处理、API 规范
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">验收标准 (Acceptance Criteria)</strong>：怎样才算完成？包含功能验收、性能验收
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">使用 AI 生成 Spec</h3>
            <p className="text-sm text-muted-foreground mb-3">
              让 AI 帮你从需求生成 Spec，然后你进行评审和优化：
            </p>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
              <div className="text-foreground mb-2">Prompt 示例：</div>
              <div className="text-muted-foreground whitespace-pre-wrap">
                {`请帮我生成一个用户登录功能的 Spec，包含：
1. 目标和非目标
2. 接口定义（输入输出、错误处理）
3. 验收标准
4. 技术约束`}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: WBS 工作分解 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ListTree className="h-6 w-6 text-primary" />
            WBS 工作分解
          </h2>
          <p className="text-muted-foreground mb-6">
            WBS（Work Breakdown Structure）将复杂项目分解为可管理的小任务。
            在 AI 编程时代，<strong className="text-foreground">任务分解让 AI 可以分步执行</strong>，提高成功率。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">分解原则</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "MECE 原则", desc: "相互独立，完全穷尽（Mutually Exclusive, Collectively Exhaustive）" },
                  { title: "粒度适中", desc: "每个任务 1-3 天可完成，适合 AI 分步执行" },
                  { title: "可交付", desc: "每个任务都有明确的产出物，可验证" },
                  { title: "依赖清晰", desc: "明确任务之间的依赖关系，确定执行顺序" },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">示例：用户登录功能</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                <div className="text-foreground mb-2">WBS 结构：</div>
                <div className="space-y-1 whitespace-pre-wrap">
                  {`用户登录功能
├─ 前端登录页面
│  ├─ UI 组件开发
│  ├─ 表单验证
│  └─ 错误提示
├─ 后端 API 开发
│  ├─ 登录接口
│  ├─ Token 生成
│  └─ 会话管理
└─ 测试
   ├─ 单元测试
   └─ 集成测试`}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">使用 AI 辅助任务分解</h3>
              <p className="text-sm text-muted-foreground mb-3">
                让 AI 帮你将 PRD 分解为可执行的任务列表：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-foreground mb-2">Prompt 示例：</div>
                <div className="text-muted-foreground whitespace-pre-wrap">
                  {`请将以下 PRD 分解为 WBS 任务列表：
[粘贴 PRD 内容]

要求：
1. 每个任务粒度适中（1-3天可完成）
2. 明确任务依赖关系
3. 每个任务有明确的验收标准`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: DoD 完成定义 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            DoD 完成定义
          </h2>
          <p className="text-muted-foreground mb-6">
            DoD（Definition of Done）定义了任务完成的验收标准。
            在 AI 编程时代，<strong className="text-foreground">DoD 可以自动化检查</strong>，确保质量一致。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">标准 DoD 检查清单</h3>
              <div className="space-y-3 text-sm">
                {[
                  "代码已通过所有测试（单元测试、集成测试）",
                  "代码已通过代码审查（AI 审查 + 人工审查）",
                  "文档已更新（PRD、API 文档、README）",
                  "符合编码规范（ESLint、Prettier、TypeScript）",
                  "已部署到测试环境并验证通过",
                  "产品经理已验收（功能符合 PRD）",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">AI 自动化 DoD 检查</h3>
              <p className="text-sm text-muted-foreground mb-3">
                使用 AI 工具自动检查 DoD 清单，提高效率：
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm font-medium text-foreground mb-2">代码审查</div>
                  <div className="text-xs text-muted-foreground">
                    使用 AI 代码审查工具（如 Cursor、GitHub Copilot）自动检查代码质量
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm font-medium text-foreground mb-2">测试生成</div>
                  <div className="text-xs text-muted-foreground">
                    使用 AI 生成测试用例，确保代码覆盖率
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm font-medium text-foreground mb-2">文档同步</div>
                  <div className="text-xs text-muted-foreground">
                    使用 AI 检查文档和代码的一致性，自动更新文档
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">DoD 的价值</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>质量保证</strong>：确保所有任务都达到统一的质量标准</li>
                <li>• <strong>减少返工</strong>：提前发现问题，避免后期修改</li>
                <li>• <strong>团队共识</strong>：所有人对"完成"有统一的理解</li>
                <li>• <strong>可追溯性</strong>：明确记录每个任务的完成情况</li>
                <li>• <strong>AI 友好</strong>：清晰的验收标准让 AI 知道何时完成任务</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: 文档即代码 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            文档即代码
          </h2>
          <p className="text-muted-foreground mb-6">
            在 AI 编程时代，<strong className="text-foreground">文档应该像代码一样管理</strong>：
            版本控制、代码审查、自动化检查、持续集成。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">文档版本控制</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">使用 Git 管理文档</div>
                  <div className="font-mono text-xs space-y-1">
                    <div>docs/prd/</div>
                    <div>├── user-login.md</div>
                    <div>├── user-profile.md</div>
                    <div>└── README.md</div>
                  </div>
                </div>
                <ul className="space-y-1 ml-4">
                  <li>• 文档变更通过 PR 提交，代码审查</li>
                  <li>• 文档版本与代码版本同步</li>
                  <li>• 变更历史清晰可追溯</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">文档自动化检查</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">CI/CD 集成</div>
                  <ul className="space-y-1 ml-4">
                    <li>• 检查 PRD 格式是否符合规范</li>
                    <li>• 检查文档和代码的一致性</li>
                    <li>• 自动生成 API 文档</li>
                    <li>• 检查文档完整性（必填字段）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">文档即上下文</h3>
              <p className="text-sm text-muted-foreground">
                文档不仅是记录，更是<strong className="text-foreground">AI 理解需求的上下文</strong>。
                好的文档让 AI 准确理解需求，生成符合预期的代码。文档和代码应该同步更新，保持一致性。
              </p>
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
                理解文档驱动开发的核心思想，掌握文档即上下文的理念
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握结构化思考方法（Sequential Thinking），能够分解复杂问题
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够编写 AI 可读的 PRD 文档，包含完整的产品需求
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握 Spec 驱动开发流程，理解规范即上下文的理念
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                能够进行有效的任务分解（WBS），管理项目进度
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                理解 DoD 的重要性，能够定义清晰的验收标准
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">7</span>
                掌握文档即代码的管理方法，建立文档版本控制流程
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ai-guide" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 使用说明书
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
