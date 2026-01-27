import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Zap, TrendingUp, Users, Target, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "团队篇概述", href: "/team" },
  { title: "为什么需要 AI 团队？", href: "/team/why" },
  { title: "团队组建与角色定义", href: "/team/roles" },
  { title: "工具选型与统一配置", href: "/team/tools" },
  { title: "工作流程与协作机制", href: "/team/workflow" },
  { title: "知识管理与沉淀", href: "/team/knowledge" },
  { title: "文化建设与学习型组织", href: "/team/culture" },
  { title: "成本管理与优化", href: "/team/cost" },
  { title: "安全与合规", href: "/team/security" },
  { title: "团队成长与职业发展", href: "/team/growth" },
  { title: "实战案例与最佳实践", href: "/team/cases" },
]

export default function WhyTeamPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="为什么需要 AI 团队？"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          为什么需要 AI 团队？
        </h1>
        <p className="text-lg text-muted-foreground">
          AI 时代已经到来，传统开发模式正在被颠覆。理解 AI 团队的核心价值，是打造高效开发团队的第一步。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: AI 时代的团队变革 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            AI 时代的团队变革
          </h2>
          <p className="text-muted-foreground mb-6">
            从传统开发到 AI 辅助开发，不仅仅是工具的升级，更是团队能力模型的根本性转变。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                从写代码到指挥 AI
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                传统开发模式下，工程师需要手写每一行代码。AI 时代，工程师的角色转变为：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">需求澄清者</strong>：用自然语言描述需求，让 AI 理解意图</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">架构设计师</strong>：设计系统结构，指导 AI 实现</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">代码审查者</strong>：审查 AI 生成的代码，确保质量和安全</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">知识管理者</strong>：沉淀最佳实践，建立团队知识库</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                10x 工程师的诞生
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                掌握 AI 工具的工程师，开发效率可以提升 3-10 倍。这不是夸张，而是现实：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary mb-1">3-5x</div>
                  <div className="text-sm text-muted-foreground">代码生成速度提升</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary mb-1">60%</div>
                  <div className="text-sm text-muted-foreground">Bug 减少率</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary mb-1">80%</div>
                  <div className="text-sm text-muted-foreground">文档编写时间节省</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary mb-1">2-3x</div>
                  <div className="text-sm text-muted-foreground">项目交付速度提升</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: AI 团队的核心价值 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            AI 团队的核心价值
          </h2>
          <p className="text-muted-foreground mb-6">
            AI 团队不仅仅是使用 AI 工具的团队，而是将 AI 能力深度融入开发流程，实现系统性效率提升的组织。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">快速交付</h3>
              <p className="text-sm text-muted-foreground mb-3">
                用 AI 工具加速开发周期，从需求到交付的时间缩短 50% 以上。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AI 辅助需求澄清和 Spec 编写</li>
                <li>• 代码自动生成和补全</li>
                <li>• 自动化测试生成</li>
                <li>• 文档自动生成</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">质量提升</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI 辅助代码审查和测试，显著提升代码质量和系统稳定性。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AI 代码审查（规范、安全、性能）</li>
                <li>• 自动化测试覆盖</li>
                <li>• 潜在 Bug 提前发现</li>
                <li>• 最佳实践自动检查</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">知识沉淀</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Skill、Patterns、最佳实践的积累，形成团队的知识资产。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Skill 库：可复用的 AI 能力</li>
                <li>• Patterns 库：标准化工作流</li>
                <li>• 最佳实践文档</li>
                <li>• 案例库（成功/失败案例）</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">成本优化</h3>
              <p className="text-sm text-muted-foreground mb-3">
                合理使用 AI 工具，在提升效率的同时控制成本。
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 模型选择策略（成本 vs 质量）</li>
                <li>• Token 使用优化</li>
                <li>• 使用监控和成本分析</li>
                <li>• 本地模型部署（敏感数据）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 错误示范 vs 正确示范 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            错误示范 vs 正确示范
          </h2>
          <p className="text-muted-foreground mb-6">
            很多团队在引入 AI 工具时容易犯的错误，以及正确的做法。
          </p>

          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-destructive/50 bg-destructive/5">
                <div className="flex items-center gap-2 mb-4">
                  <X className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold text-foreground">错误示范</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">各自为战</strong>：每个人自己摸索，工具散乱，没有统一标准</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">重复造轮子</strong>：没有知识库，同样的 Skill/Pattern 重复创建</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">缺乏规范</strong>：没有工具使用规范，代码质量参差不齐</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">成本失控</strong>：没有成本监控，API 使用无节制</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">安全风险</strong>：敏感代码上传云端，数据泄露风险</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">正确示范</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong className="text-foreground">统一工具栈</strong>：团队统一使用 Cursor/Fabric，建立配置模板</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong className="text-foreground">知识库建设</strong>：建立 Skill 库、Patterns 库，避免重复造轮子</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong className="text-foreground">规范先行</strong>：制定工具使用规范、代码审查标准</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong className="text-foreground">成本管理</strong>：建立成本监控机制，优化模型选择</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong className="text-foreground">安全合规</strong>：数据分类管理，敏感数据使用本地模型</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 团队转型的关键因素 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            团队转型的关键因素
          </h2>
          <p className="text-muted-foreground mb-6">
            成功打造 AI 团队需要关注的核心要素。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">领导层的支持</h3>
                  <p className="text-sm text-muted-foreground">
                    AI 团队转型需要资源投入（工具订阅、培训成本），需要领导层的战略支持和预算保障。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">统一的标准和规范</h3>
                  <p className="text-sm text-muted-foreground">
                    建立统一的工具栈、配置模板、使用规范，避免各自为战，形成团队合力。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">知识管理和沉淀</h3>
                  <p className="text-sm text-muted-foreground">
                    建立 Skill 库、Patterns 库、最佳实践库，让团队的知识资产不断积累和复用。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">持续学习和改进</h3>
                  <p className="text-sm text-muted-foreground">
                    AI 工具和技术快速发展，团队需要保持学习，定期分享新工具、新技巧、新案例。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">文化建设</h3>
                  <p className="text-sm text-muted-foreground">
                    建立学习型组织文化，鼓励实验、分享、协作，让 AI 能力成为团队的核心竞争力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                理解 AI 团队的必要性和核心价值（快速交付、质量提升、知识沉淀、成本优化）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                了解 AI 团队与传统团队的区别（从写代码到指挥 AI）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握团队转型的关键因素（领导支持、统一标准、知识管理、持续学习、文化建设）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                避免常见错误（各自为战、重复造轮子、缺乏规范、成本失控、安全风险）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回：团队篇概述
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/roles" className="flex items-center gap-2">
            下一章：团队组建与角色定义
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
