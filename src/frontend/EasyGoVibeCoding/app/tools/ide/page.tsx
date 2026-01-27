import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Monitor, Code, Zap, Settings, Zap as ZapIcon } from "lucide-react"
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

export default function IDEPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="IDE 类工具详解"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          IDE 类工具详解
        </h1>
        <p className="text-lg text-muted-foreground">
          深入掌握主流 AI IDE 工具的核心特性，包括 Cursor、Windsurf、GitHub Copilot 等，了解 Skill 系统、Agent 模式、MCP 配置等高级功能。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Cursor 深度解析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="h-6 w-6 text-primary" />
            Cursor：AI-First IDE 的标杆
          </h2>
          <p className="text-muted-foreground mb-6">
            Cursor 是专为 AI 编程设计的 IDE，集成了 Skill 系统、Agent 模式和 MCP 支持，是企业级 AI 开发的首选工具。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Skill 系统</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Skill 是 Cursor 的核心特性，允许你创建可复用的 AI 助手能力。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>创建 Skill</strong>：使用 Markdown 格式定义 Skill 的能力和上下文</li>
                <li>• <strong>Skill 库</strong>：从社区或团队 Skill 库中导入现成的 Skill</li>
                <li>• <strong>元技能（Meta-Skills）</strong>：用于生成其他 Skill 的高级 Skill</li>
                <li>• <strong>版本控制</strong>：Skill 可以像代码一样进行版本管理</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Agent 模式</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Agent 模式让 AI 能够自主执行复杂任务，而不仅仅是代码补全。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Plan 系统</strong>：AI 自动制定执行计划，分步骤完成任务</li>
                <li>• <strong>多文件编辑</strong>：Agent 可以同时修改多个相关文件</li>
                <li>• <strong>上下文理解</strong>：理解整个项目的架构和代码关系</li>
                <li>• <strong>自主决策</strong>：根据代码风格和最佳实践自动调整</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">MCP 配置</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Model Context Protocol (MCP) 让 Cursor 能够连接外部服务和数据源。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>MCP Servers</strong>：连接文件系统、GitHub、数据库等</li>
                <li>• <strong>自定义 Server</strong>：创建自己的 MCP Server 扩展能力</li>
                <li>• <strong>企业级集成</strong>：连接企业内部系统和知识库</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Windsurf 实战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Windsurf：Fast Context 技术
          </h2>
          <p className="text-muted-foreground mb-6">
            Windsurf 采用 Fast Context 技术，能够快速理解大型代码库，适合企业级项目开发。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Fast Context</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 快速索引大型代码库</li>
                <li>• 智能代码检索</li>
                <li>• 上下文窗口优化</li>
                <li>• 减少 Token 消耗</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Cascade Agent</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 多 Agent 协作</li>
                <li>• 任务分解和执行</li>
                <li>• 代码库分析</li>
                <li>• 架构理解</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">大型代码库分析</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Windsurf 特别适合分析大型 Monorepo 项目：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 自动识别项目结构</li>
              <li>• 理解模块依赖关系</li>
              <li>• 跨文件代码重构</li>
              <li>• 架构文档生成</li>
            </ul>
          </div>
        </section>

        {/* Section 3: GitHub Copilot 技巧 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            GitHub Copilot：代码补全的艺术
          </h2>
          <p className="text-muted-foreground mb-6">
            GitHub Copilot 是最早的 AI 编程助手之一，专注于代码补全和快速开发。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">代码补全技巧</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>注释驱动</strong>：通过注释描述需求，Copilot 自动生成代码</li>
                <li>• <strong>上下文感知</strong>：Copilot 理解当前文件的代码风格和模式</li>
                <li>• <strong>多行补全</strong>：一次补全整个函数或代码块</li>
                <li>• <strong>Tab 接受</strong>：使用 Tab 键快速接受建议</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">相关文件上下文</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>自动识别</strong>：Copilot 自动识别相关的导入和依赖</li>
                <li>• <strong>项目理解</strong>：理解整个项目的代码结构和模式</li>
                <li>• <strong>类型推断</strong>：根据上下文推断类型和接口</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">团队协作</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>企业版</strong>：支持团队管理和使用统计</li>
                <li>• <strong>代码审查</strong>：Copilot 生成的代码可以纳入代码审查流程</li>
                <li>• <strong>最佳实践</strong>：团队可以共享 Copilot 使用最佳实践</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Kiro & Antigravity 实战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Kiro & Antigravity：新兴 IDE 工具
          </h2>
          <p className="text-muted-foreground mb-6">
            Kiro 和 Antigravity 是新兴的 AI IDE 工具，提供了独特的配置和使用方式。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Kiro 实战</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Steering Files</strong>：配置文件驱动 AI 行为</li>
                <li>• <strong>Claude Opus 4.5</strong>：免费使用 Claude Opus 4.5</li>
                <li>• <strong>CLI 联动</strong>：CLI 和 IDE 无缝协作</li>
                <li>• <strong>工作流优化</strong>：自定义工作流提升效率</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Antigravity 实战</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Google Agentic Coding</strong>：Google 的 Agentic 编程环境</li>
                <li>• <strong>混合调用</strong>：Claude Opus 4.5 + Gemini 混合使用</li>
                <li>• <strong>任务视图</strong>：可视化任务管理</li>
                <li>• <strong>Artifacts</strong>：代码生成物管理</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: 其他IDE工具对比 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="h-6 w-6 text-primary" />
            其他 IDE 工具对比
          </h2>
          <p className="text-muted-foreground mb-6">
            了解其他主流 IDE 工具的 AI 增强能力。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Zed</h3>
              <p className="text-sm text-muted-foreground">高性能编辑器，AI 补全支持</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Devin</h3>
              <p className="text-sm text-muted-foreground">AI 软件工程师，自主编程能力</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">LazyVim + AI</h3>
              <p className="text-sm text-muted-foreground">Neovim 配置，集成 AI 插件</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Neovim + Copilot</h3>
              <p className="text-sm text-muted-foreground">传统编辑器 + AI 补全</p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">工具选择建议</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>企业级项目</strong>：Cursor、Windsurf（功能完整，企业支持）</li>
              <li>• <strong>快速原型</strong>：GitHub Copilot（简单易用，快速上手）</li>
              <li>• <strong>Vim 用户</strong>：LazyVim + AI、Neovim + Copilot</li>
              <li>• <strong>性能优先</strong>：Zed（极致性能，AI 增强）</li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ZapIcon className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握主流 IDE 工具的核心特性（Cursor、Windsurf、GitHub Copilot）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够配置和使用 Skill 系统、Agent 模式、MCP 等高级功能
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解不同工具的适用场景，能够根据项目需求选择合适的 IDE
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握 Kiro、Antigravity 等新兴工具的使用方法
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：工具篇概述
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/web" className="flex items-center gap-2">
            下一章：网页编辑类工具详解
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
