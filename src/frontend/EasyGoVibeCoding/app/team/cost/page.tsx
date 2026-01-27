import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, DollarSign, TrendingDown, BarChart, AlertCircle } from "lucide-react"
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

export default function CostPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="成本管理与优化"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 7 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          成本管理与优化
        </h1>
        <p className="text-lg text-muted-foreground">
          合理规划成本，优化模型选择，监控使用情况，在提升效率的同时控制成本。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 成本规划 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            成本规划
          </h2>
          <p className="text-muted-foreground mb-6">
            了解 AI 工具的成本结构，制定合理的预算规划。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">工具成本分析</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Cursor</div>
                  <p>按用户订阅：$20/月（Pro）或 $40/月（Business）</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Windsurf</div>
                  <p>按 Token 使用：$0.01/1K Token（输入）+ $0.03/1K Token（输出）</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Fabric</div>
                  <p>开源免费（但需要 API Key，按模型提供商定价）</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">API 成本</div>
                  <ul className="space-y-1 mt-2">
                    <li>• OpenAI：GPT-4 Turbo $10/1M Token（输入）</li>
                    <li>• Anthropic：Claude Opus $15/1M Token（输入）</li>
                    <li>• Google：Gemini Pro $0.50/1M Token（输入）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">预算规划</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具订阅预算</div>
                  <ul className="space-y-1">
                    <li>• 小团队（5人）：$100-200/月</li>
                    <li>• 中型团队（15人）：$300-600/月</li>
                    <li>• 大型团队（50人）：$1000-2000/月</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">API 使用预算</div>
                  <ul className="space-y-1">
                    <li>• 日常开发：$200-500/月</li>
                    <li>• 复杂任务：$500-1000/月</li>
                    <li>• 大型项目：$1000-3000/月</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">培训成本预算</div>
                  <ul className="space-y-1">
                    <li>• 新人培训：$500-1000/人</li>
                    <li>• 进阶培训：$1000-2000/人</li>
                    <li>• 外部培训：$2000-5000/人</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 成本优化策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-primary" />
            成本优化策略
          </h2>
          <p className="text-muted-foreground mb-6">
            通过合理的模型选择、Token 优化和使用监控，有效控制成本。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">模型选择策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">简单任务</div>
                  <ul className="space-y-1">
                    <li>• 使用便宜模型</li>
                    <li>• Claude Haiku、GPT-3.5</li>
                    <li>• 成本：$0.25-1/1M Token</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">复杂任务</div>
                  <ul className="space-y-1">
                    <li>• 使用强模型</li>
                    <li>• Claude Opus、GPT-4</li>
                    <li>• 成本：$10-15/1M Token</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">敏感数据</div>
                  <ul className="space-y-1">
                    <li>• 使用本地模型</li>
                    <li>• Ollama（免费）</li>
                    <li>• 成本：仅硬件成本</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Token 优化</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">精简 Prompt</div>
                  <ul className="space-y-1">
                    <li>• 删除冗余信息</li>
                    <li>• 使用结构化格式</li>
                    <li>• 避免重复内容</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">合理使用 Context</div>
                  <ul className="space-y-1">
                    <li>• 只包含必要上下文</li>
                    <li>• 使用摘要而非全文</li>
                    <li>• 避免超长上下文</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">使用 `--dry-run` 预览</div>
                  <ul className="space-y-1">
                    <li>• 预览 Token 使用量</li>
                    <li>• 优化后再执行</li>
                    <li>• 避免无效调用</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">使用监控</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">API 使用统计</div>
                  <ul className="space-y-1">
                    <li>• 按模型统计</li>
                    <li>• 按项目统计</li>
                    <li>• 按用户统计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具使用频率</div>
                  <ul className="space-y-1">
                    <li>• Cursor 使用时长</li>
                    <li>• Agent 模式使用次数</li>
                    <li>• Skill 使用频率</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">成本报告</div>
                  <ul className="space-y-1">
                    <li>• 周报/月报</li>
                    <li>• 成本趋势分析</li>
                    <li>• 异常预警</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 成本控制机制 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            成本控制机制
          </h2>
          <p className="text-muted-foreground mb-6">
            建立使用限额和成本分析机制，确保成本可控。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">使用限额</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">个人 API 使用限额</div>
                  <ul className="space-y-1">
                    <li>• 每日限额：$10-50/天</li>
                    <li>• 每月限额：$200-1000/月</li>
                    <li>• 超限预警：80% 时提醒</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">项目 API 使用限额</div>
                  <ul className="space-y-1">
                    <li>• 项目预算：$500-5000/项目</li>
                    <li>• 超限审批：需要审批才能继续</li>
                    <li>• 成本分析：项目结束后分析</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">超限预警机制</div>
                  <ul className="space-y-1">
                    <li>• 80% 时邮件提醒</li>
                    <li>• 90% 时强制提醒</li>
                    <li>• 100% 时暂停使用</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">成本分析</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">按项目分析成本</div>
                  <ul className="space-y-1">
                    <li>• 项目总成本</li>
                    <li>• 成本占比分析</li>
                    <li>• ROI 评估</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">按工具分析成本</div>
                  <ul className="space-y-1">
                    <li>• Cursor vs Windsurf</li>
                    <li>• 不同模型成本对比</li>
                    <li>• 工具 ROI 分析</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">成本趋势分析</div>
                  <ul className="space-y-1">
                    <li>• 月度成本趋势</li>
                    <li>• 成本增长原因</li>
                    <li>• 优化建议</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                制定成本预算（工具订阅、API 使用、培训成本）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                设计成本监控机制（使用统计、成本报告、预警机制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                建立成本优化流程（模型选择策略、Token 优化、使用限额）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握成本管理方法（成本规划、成本优化、成本控制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够优化成本（模型选择策略、Token 优化、使用监控）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解成本控制的重要性（使用限额、成本分析、预警机制）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/culture" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：文化建设与学习型组织
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/security" className="flex items-center gap-2">
            下一章：安全与合规
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
