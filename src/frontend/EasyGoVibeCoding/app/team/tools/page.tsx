import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Settings, Code, Terminal, Globe, FileText, Key } from "lucide-react"
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

const toolStacks = [
  {
    category: "IDE 工具选型",
    icon: Code,
    small: "统一使用 Cursor（成本低、功能全）",
    medium: "Cursor（主力）+ Windsurf（长代码库分析）",
    large: "多工具组合（按场景选择）",
  },
  {
    category: "命令行工具选型",
    icon: Terminal,
    small: "Claude Code + Fabric",
    medium: "Claude Code + Continue.dev + Fabric",
    large: "多工具组合 + 企业自部署",
  },
  {
    category: "网页编辑工具选型",
    icon: Globe,
    small: "v0（快速原型）",
    medium: "v0 + bolt.new（全栈开发）",
    large: "多工具组合（按需求选择）",
  },
]

export default function ToolsPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="工具选型与统一配置"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          工具选型与统一配置
        </h1>
        <p className="text-lg text-muted-foreground">
          选择合适的工具栈，建立统一配置管理，制定使用规范，是 AI 团队高效协作的基础。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 团队工具栈设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            团队工具栈设计
          </h2>
          <p className="text-muted-foreground mb-6">
            根据团队规模选择合适的工具组合，平衡功能、成本和易用性。
          </p>

          <div className="space-y-6 mb-6">
            {toolStacks.map((stack) => {
              const Icon = stack.icon
              return (
                <div key={stack.category} className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{stack.category}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="text-sm font-medium text-foreground mb-2">小团队（3-5人）</h4>
                      <p className="text-sm text-muted-foreground">{stack.small}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="text-sm font-medium text-foreground mb-2">中型团队（6-15人）</h4>
                      <p className="text-sm text-muted-foreground">{stack.medium}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="text-sm font-medium text-foreground mb-2">大型团队（16+人）</h4>
                      <p className="text-sm text-muted-foreground">{stack.large}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 2: 统一配置管理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            统一配置管理
          </h2>
          <p className="text-muted-foreground mb-6">
            建立统一的配置模板，确保团队成员使用一致的设置，提高协作效率。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Cursor 配置
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50 font-mono">
                  <div className="text-foreground mb-2">.cursor/skills/</div>
                  <div className="text-muted-foreground">统一 Skill 库：团队共享</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">MCP 服务器配置</strong>：统一 MCP Servers 列表</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">Agent 模式规范</strong>：定义 Agent 使用场景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">配置版本控制</strong>：使用 Git 管理配置变更</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Fabric 配置
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50 font-mono">
                  <div className="text-foreground mb-2">fabric/patterns/</div>
                  <div className="text-muted-foreground">团队 Patterns 库：统一目录</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">模型选择策略</strong>：定义不同场景的模型选择</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">Shell 别名</strong>：统一命令别名</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">Patterns 分类</strong>：按任务类型分类管理</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                环境变量管理
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50 font-mono">
                  <div className="text-foreground mb-2">.env.example</div>
                  <div className="text-muted-foreground">统一环境变量模板</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">API Key 管理</strong>：使用密钥管理工具（如 1Password、Vault）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">配置文档化</strong>：每个环境变量都有说明文档</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">访问控制</strong>：敏感密钥设置访问权限</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 工具使用规范 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            工具使用规范
          </h2>
          <p className="text-muted-foreground mb-6">
            制定清晰的使用规范，确保团队成员在合适的场景使用合适的工具。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">代码补全规范</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">何时使用 Copilot（日常开发）</div>
                  <ul className="space-y-1">
                    <li>• 单文件代码补全</li>
                    <li>• 函数实现补全</li>
                    <li>• 注释生成代码</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">何时使用 Cursor Agent（复杂重构）</div>
                  <ul className="space-y-1">
                    <li>• 跨文件重构</li>
                    <li>• 架构调整</li>
                    <li>• 大型代码库分析</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">何时使用 Windsurf（大型代码库分析）</div>
                  <ul className="space-y-1">
                    <li>• 1M+ Token 上下文需求</li>
                    <li>• 大型 Monorepo 分析</li>
                    <li>• 跨项目代码理解</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Prompt 使用规范</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">RTCC 框架标准模板</div>
                  <div className="font-mono text-xs mt-2">
                    <div>Role: 角色定义</div>
                    <div>Task: 具体任务</div>
                    <div>Context: 上下文信息</div>
                    <div>Constraint: 约束条件</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Spec 文档模板</div>
                  <ul className="space-y-1">
                    <li>• PRD（产品需求文档）</li>
                    <li>• WBS（工作分解结构）</li>
                    <li>• DoD（完成的定义）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Code Review 模板</div>
                  <ul className="space-y-1">
                    <li>• 规范检查（代码风格、命名规范）</li>
                    <li>• 安全检查（安全漏洞、敏感信息）</li>
                    <li>• 性能检查（性能瓶颈、优化建议）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                设计团队工具栈方案（根据你的团队规模，选择合适的工具组合）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                创建统一配置模板（Cursor Skill 库、Fabric Patterns 库、环境变量模板）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                编写工具使用规范文档（代码补全规范、Prompt 使用规范、Code Review 模板）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握团队工具选型方法（根据团队规模选择合适的工具组合）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够建立统一配置管理（Cursor、Fabric、环境变量）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解工具使用规范的重要性（代码补全规范、Prompt 使用规范）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/roles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：团队组建与角色定义
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/workflow" className="flex items-center gap-2">
            下一章：工作流程与协作机制
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
