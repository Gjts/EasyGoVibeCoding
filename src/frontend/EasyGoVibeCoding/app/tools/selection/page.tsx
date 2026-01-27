import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Target, Table, TrendingUp, Briefcase, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "工具篇概述", href: "/tools" },
  { title: "IDE 类工具详解", href: "/tools/ide" },
  { title: "网页编辑类工具详解", href: "/tools/web" },
  { title: "命令行类工具详解", href: "/tools/cli" },
  { title: "核心技术深度解析", href: "/tools/core" },
  { title: "Fabric AI 增强框架", href: "/tools/fabric" },
  { title: "工具选型决策", href: "/tools/selection" },
  { title: "企业级实践", href: "/tools/enterprise" },
]

export default function SelectionPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="工具选型决策"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          工具选型决策
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握工具选型的决策框架，根据类型、角色、团队规模和场景选择合适的 AI 编程工具，理解模型性能分级和成本权衡。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 选型维度 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            选型维度
          </h2>
          <p className="text-muted-foreground mb-6">
            从多个维度分析工具选型，确保选择最适合的工具。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">按类型</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>IDE 类</strong>：Cursor、Windsurf、Copilot</li>
                <li>• <strong>网页编辑类</strong>：v0、bolt.new</li>
                <li>• <strong>命令行类</strong>：Claude Code、Codex CLI</li>
                <li>• <strong>框架类</strong>：Fabric、Continue.dev</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">按角色</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>开发者</strong>：IDE 类工具</li>
                <li>• <strong>设计师</strong>：网页编辑类工具</li>
                <li>• <strong>DevOps</strong>：命令行类工具</li>
                <li>• <strong>架构师</strong>：全栈工具</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">按团队规模</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>个人</strong>：免费/低成本工具</li>
                <li>• <strong>小团队（&lt;10人）</strong>：基础协作功能</li>
                <li>• <strong>中团队（10-50人）</strong>：团队管理功能</li>
                <li>• <strong>大团队（&gt;50人）</strong>：企业级功能</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">按场景</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>快速原型</strong>：v0、bolt.new</li>
                <li>• <strong>企业开发</strong>：Cursor、Windsurf</li>
                <li>• <strong>代码审查</strong>：GitHub Copilot</li>
                <li>• <strong>自动化</strong>：Claude Code、Goose</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 工具对比总表 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            工具对比总表
          </h2>
          <p className="text-muted-foreground mb-6">
            对比主流 AI 编程工具的功能、定价和适用场景。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">功能对比</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-foreground">工具</th>
                    <th className="text-left p-2 text-foreground">代码补全</th>
                    <th className="text-left p-2 text-foreground">Agent模式</th>
                    <th className="text-left p-2 text-foreground">MCP支持</th>
                    <th className="text-left p-2 text-foreground">团队协作</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">Cursor</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">Windsurf</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">-</td>
                    <td className="p-2">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">GitHub Copilot</td>
                    <td className="p-2">✓</td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                    <td className="p-2">✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-foreground">v0</td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">定价对比</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">Cursor</span>
                <span>Pro: $20/月 | Business: $40/月</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">Windsurf</span>
                <span>Pro: $19/月 | Team: $39/月</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">GitHub Copilot</span>
                <span>Individual: $10/月 | Business: $19/用户/月</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">v0</span>
                <span>免费（Vercel 用户）</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 模型性能分级 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            模型性能分级参考
          </h2>
          <p className="text-muted-foreground mb-6">
            根据任务复杂度选择合适的模型，平衡成本和质量。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">第一梯队（复杂任务首选）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合复杂推理、架构设计、大型代码库分析等任务：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Claude Opus 4.5-xhigh</li>
                <li>• GPT-5.1 Codex-max-xhigh</li>
                <li>• GPT-5.2-xhigh</li>
                <li>• <strong>使用建议</strong>：只在复杂任务时使用，避免成本浪费</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">第二梯队（日常开发）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合日常代码编写、代码审查、文档生成等任务：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Claude Sonnet 4.5</li>
                <li>• Kimi K2-thinking</li>
                <li>• MiniMax M2</li>
                <li>• GLM-4.6</li>
                <li>• Gemini 3.0 Pro</li>
                <li>• <strong>使用建议</strong>：日常开发的主力模型</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">第三梯队（轻量任务）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合简单补全、格式化、基础问答等任务：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Qwen3</li>
                <li>• SWE</li>
                <li>• Grok4</li>
                <li>• <strong>使用建议</strong>：成本敏感场景，简单任务</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">选型建议</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>复杂任务只用第一梯队</strong>：确保质量和准确性</li>
              <li>• <strong>日常开发用第二梯队</strong>：平衡成本和质量</li>
              <li>• <strong>成本敏感用第三梯队</strong>：简单任务使用轻量模型</li>
              <li>• <strong>混合策略</strong>：根据任务复杂度动态选择模型</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 实战案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            实战案例
          </h2>
          <p className="text-muted-foreground mb-6">
            不同规模和场景下的工具选型实战案例。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">小团队案例（5-10人）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>场景</strong>：创业公司，快速迭代，成本敏感
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>工具选择</strong>：GitHub Copilot（简单易用）+ v0（快速原型）</li>
                <li>• <strong>模型选择</strong>：第二梯队为主，复杂任务用第一梯队</li>
                <li>• <strong>成本控制</strong>：按需使用，避免过度依赖</li>
                <li>• <strong>效果</strong>：开发效率提升 3-5 倍，成本可控</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">中大型企业案例（50+人）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>场景</strong>：成熟企业，多团队协作，安全合规要求高
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>工具选择</strong>：Cursor Business（企业功能）+ Windsurf（大型代码库）</li>
                <li>• <strong>模型选择</strong>：第一梯队（复杂任务）+ 第二梯队（日常开发）</li>
                <li>• <strong>安全措施</strong>：本地化部署选项，代码不上传策略</li>
                <li>• <strong>效果</strong>：团队协作效率提升，知识沉淀，标准化流程</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">混合方案案例</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>场景</strong>：不同团队使用不同工具，统一管理
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>前端团队</strong>：v0 + Cursor（UI 快速生成 + 代码开发）</li>
                <li>• <strong>后端团队</strong>：Cursor + Claude Code（IDE + 自动化）</li>
                <li>• <strong>DevOps 团队</strong>：Claude Code + Goose（工作流自动化）</li>
                <li>• <strong>统一管理</strong>：团队 Skill 库、共享配置、成本监控</li>
              </ul>
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
                掌握工具选型的决策框架（类型、角色、团队规模、场景维度）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够根据场景选择合适的工具，理解功能、定价和适用场景对比
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解模型性能分级（第一/二/三梯队），掌握成本和质量权衡方法
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够参考实战案例，为不同规模和场景的团队制定工具选型方案
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/fabric" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Fabric AI 增强框架
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/enterprise" className="flex items-center gap-2">
            下一章：企业级实践
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
