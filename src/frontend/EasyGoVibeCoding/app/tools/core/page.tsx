import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Cpu, Network, Sparkles, GitBranch, Zap } from "lucide-react"
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

export default function CorePage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="核心技术深度解析"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          核心技术深度解析
        </h1>
        <p className="text-lg text-muted-foreground">
          深入理解 AI 编程工具的核心技术，包括 MCP、Skill 系统、Agent 系统和 LSP，掌握这些技术的架构原理和配置方法。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: MCP（Model Context Protocol） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-6 w-6 text-primary" />
            MCP（Model Context Protocol）
          </h2>
          <p className="text-muted-foreground mb-6">
            MCP 是连接 AI 模型和外部服务的标准协议，让 AI 能够访问文件系统、数据库、API 等资源。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">架构原理</h3>
              <p className="text-sm text-muted-foreground mb-3">
                MCP 采用客户端-服务器架构：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>MCP Client</strong>：AI 工具（如 Cursor、Claude Code）</li>
                <li>• <strong>MCP Server</strong>：提供服务的后端（文件系统、GitHub、数据库）</li>
                <li>• <strong>Protocol</strong>：标准化的通信协议（JSON-RPC）</li>
                <li>• <strong>Tools & Resources</strong>：Server 提供的工具和资源</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">常见 MCP Servers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">文件系统</h4>
                  <p className="text-xs text-muted-foreground">读写本地文件</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">GitHub</h4>
                  <p className="text-xs text-muted-foreground">GitHub API 集成</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">数据库</h4>
                  <p className="text-xs text-muted-foreground">SQL 查询执行</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">配置与安全</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>配置文件</strong>：JSON 格式配置 MCP Servers</li>
                <li>• <strong>认证机制</strong>：API Key、OAuth 等认证方式</li>
                <li>• <strong>权限控制</strong>：限制 Server 的访问范围</li>
                <li>• <strong>安全最佳实践</strong>：密钥管理、最小权限原则</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">自定义 MCP Server</h3>
              <p className="text-sm text-muted-foreground mb-3">
                创建自己的 MCP Server 扩展 AI 能力：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>定义 Tools</strong>：实现 AI 可以调用的工具函数</li>
                <li>• <strong>提供 Resources</strong>：暴露数据资源给 AI</li>
                <li>• <strong>实现协议</strong>：遵循 MCP 协议规范</li>
                <li>• <strong>测试与部署</strong>：本地测试后部署到生产环境</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Skill 系统 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Skill 系统
          </h2>
          <p className="text-muted-foreground mb-6">
            Skill 系统让 AI 助手具备可复用的专业能力，是提升 AI 工具效率的关键。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Cursor Skill</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Markdown 格式定义</li>
                <li>• 上下文和指令</li>
                <li>• 可复用能力</li>
                <li>• 版本管理</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Kiro Steering Files</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 配置文件驱动</li>
                <li>• AI 行为定制</li>
                <li>• 项目特定配置</li>
                <li>• 团队共享</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Claude Code Skills</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 命令行专用</li>
                <li>• 终端集成</li>
                <li>• 工作流自动化</li>
                <li>• MCP 集成</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">元技能（Meta-Skills）</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 生成其他 Skill</li>
                <li>• Skill 模板</li>
                <li>• 自动化创建</li>
                <li>• 最佳实践</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">团队 Skill 管理</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Skill 库</strong>：团队共享 Skill 库，统一标准</li>
              <li>• <strong>版本控制</strong>：Skill 像代码一样进行版本管理</li>
              <li>• <strong>文档化</strong>：每个 Skill 都有清晰的文档说明</li>
              <li>• <strong>评审机制</strong>：Skill 提交需要团队评审</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Agent 系统 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            Agent 系统
          </h2>
          <p className="text-muted-foreground mb-6">
            Agent 系统让 AI 能够自主执行复杂任务，而不仅仅是响应式交互。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Agent 类型</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">Reactive Agent</h4>
                  <p className="text-xs text-muted-foreground">响应式，基于当前状态</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">Planning Agent</h4>
                  <p className="text-xs text-muted-foreground">规划型，制定执行计划</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">Learning Agent</h4>
                  <p className="text-xs text-muted-foreground">学习型，从经验中改进</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">工作流程</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                  <div>
                    <strong className="text-foreground">理解任务</strong>：分析用户需求，理解任务目标
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                  <div>
                    <strong className="text-foreground">制定计划</strong>：分解任务，制定执行步骤
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                  <div>
                    <strong className="text-foreground">执行操作</strong>：调用工具，修改文件，执行命令
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                  <div>
                    <strong className="text-foreground">评估结果</strong>：检查执行结果，决定下一步
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">多 Agent 编排</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>架构师 Agent</strong>：负责系统设计和架构决策</li>
                <li>• <strong>编码 Agent</strong>：负责代码实现和编写</li>
                <li>• <strong>测试 Agent</strong>：负责测试用例编写和执行</li>
                <li>• <strong>审查 Agent</strong>：负责代码审查和质量检查</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Plan 系统</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Plan 系统让 Agent 能够自主制定和执行计划：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>任务分解</strong>：将复杂任务分解为可执行的步骤</li>
                <li>• <strong>依赖管理</strong>：理解步骤之间的依赖关系</li>
                <li>• <strong>动态调整</strong>：根据执行结果调整计划</li>
                <li>• <strong>进度追踪</strong>：实时追踪任务执行进度</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: LSP（Language Server Protocol） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            LSP（Language Server Protocol）
          </h2>
          <p className="text-muted-foreground mb-6">
            LSP 是 IDE 和语言服务之间的标准协议，AI IDE 在此基础上增强了智能能力。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">架构原理</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">Language Server</strong>：提供语言服务的后端（补全、跳转、诊断）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">Language Client</strong>：IDE 客户端，发送请求并显示结果
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">Protocol</strong>：JSON-RPC 协议，标准化通信
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">与 AI IDE 的关系</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• LSP 提供基础语言服务</li>
                <li>• AI 增强补全和诊断</li>
                <li>• 结合上下文理解</li>
                <li>• 智能代码生成</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">语言服务能力</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>代码补全</strong>：智能补全，上下文感知</li>
                <li>• <strong>跳转定义</strong>：快速跳转到定义位置</li>
                <li>• <strong>诊断</strong>：实时错误检查和警告</li>
                <li>• <strong>格式化</strong>：代码自动格式化</li>
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
                深入理解 MCP、Skill、Agent、LSP 的核心机制和架构原理
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够配置和自定义这些系统，创建自己的 MCP Server 和 Skill
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解 AI IDE 的底层架构，掌握多 Agent 编排和 Plan 系统
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解团队 Skill 管理和 LSP 与 AI 的协作方式
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/cli" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：命令行类工具详解
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/fabric" className="flex items-center gap-2">
            下一章：Fabric AI 增强框架
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
