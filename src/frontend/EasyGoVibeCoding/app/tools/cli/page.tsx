import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Terminal, Code, Brain, Zap, Settings, Zap as ZapIcon } from "lucide-react"
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

export default function CLIPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="命令行类工具详解"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          命令行类工具详解
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握命令行 AI 工具的使用方法，包括 Claude Code、Codex CLI、Gemini CLI 等，理解终端 AI 增强的工作流和自动化能力。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Claude Code 实战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            Claude Code：终端集成 AI 助手
          </h2>
          <p className="text-muted-foreground mb-6">
            Claude Code 是 Anthropic 推出的命令行 AI 工具，深度集成终端环境，支持 MCP 和 GitHub 工作流自动化。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">终端集成</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>无缝集成</strong>：直接在终端中使用，无需切换应用</li>
                <li>• <strong>上下文感知</strong>：理解当前目录和 Git 状态</li>
                <li>• <strong>命令执行</strong>：AI 可以执行 Shell 命令并查看结果</li>
                <li>• <strong>文件操作</strong>：读取、创建、修改文件</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">MCP 配置</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Claude Code 支持 MCP（Model Context Protocol），可以连接外部服务：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>文件系统 MCP</strong>：访问本地文件系统</li>
                <li>• <strong>GitHub MCP</strong>：GitHub API 集成，管理仓库和 Issues</li>
                <li>• <strong>数据库 MCP</strong>：连接数据库查询数据</li>
                <li>• <strong>自定义 MCP</strong>：创建自己的 MCP Server</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">GitHub 工作流自动化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Issue 管理</strong>：创建、更新、关闭 Issues</li>
                <li>• <strong>PR 操作</strong>：创建 Pull Request、代码审查</li>
                <li>• <strong>自动化脚本</strong>：批量处理 GitHub 任务</li>
                <li>• <strong>工作流集成</strong>：与 GitHub Actions 协作</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Codex CLI & Gemini CLI */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Codex CLI & Gemini CLI：多模型 CLI 工具
          </h2>
          <p className="text-muted-foreground mb-6">
            掌握 Codex CLI 和 Gemini CLI 的使用，实现多模型切换和项目分析。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Codex CLI</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>GPT-5.1 Codex</strong>：调用 OpenAI Codex 模型</li>
                <li>• <strong>Monorepo 分析</strong>：分析大型 Monorepo 项目</li>
                <li>• <strong>/init 命令</strong>：自动生成项目规则和配置</li>
                <li>• <strong>代码生成</strong>：基于项目上下文生成代码</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Gemini CLI & Droid</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>脚本批量执行</strong>：批量处理文件和任务</li>
                <li>• <strong>文档自动化</strong>：自动整理和生成文档</li>
                <li>• <strong>多模型切换</strong>：Claude/Gemini/GPT 无缝切换</li>
                <li>• <strong>Droid 模式</strong>：Android 开发专用功能</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">多模型切换技巧</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>任务分配</strong>：根据任务特点选择模型（Claude 推理、GPT 代码、Gemini 多模态）</li>
              <li>• <strong>成本优化</strong>：简单任务用轻量模型，复杂任务用强大模型</li>
              <li>• <strong>并行调用</strong>：同时调用多个模型，对比结果</li>
              <li>• <strong>回退机制</strong>：主模型失败时自动切换到备用模型</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Warp & Continue.dev */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Warp & Continue.dev：AI 增强终端
          </h2>
          <p className="text-muted-foreground mb-6">
            了解 AI 增强终端工具，提升命令行工作效率。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Warp 终端</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>AI 命令纠错</strong>：自动修正命令错误</li>
                <li>• <strong>自然语言转 Shell</strong>：用自然语言描述，生成 Shell 命令</li>
                <li>• <strong>命令历史搜索</strong>：AI 增强的命令搜索</li>
                <li>• <strong>智能补全</strong>：上下文感知的命令补全</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Continue.dev</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>本地模型配置</strong>：集成 Ollama，使用本地模型</li>
                <li>• <strong>企业私有知识库</strong>：连接企业内部知识库</li>
                <li>• <strong>多模型支持</strong>：支持多种 AI 模型</li>
                <li>• <strong>背景代理工作流</strong>：后台执行长时间任务</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">本地模型配置（Ollama）</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>模型下载</strong>：使用 Ollama 下载本地模型（Llama、Mistral 等）</li>
              <li>• <strong>API 服务</strong>：启动 Ollama API 服务</li>
              <li>• <strong>隐私保护</strong>：代码不上传到云端</li>
              <li>• <strong>成本控制</strong>：完全免费，无 API 调用费用</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Goose 开源 Agent */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Goose：开源 Agent 自动化
          </h2>
          <p className="text-muted-foreground mb-6">
            Goose 是开源的 AI Agent 框架，专注于自动化脚本编写和执行。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">核心特性</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>开源免费</strong>：完全开源，可自由使用和修改</li>
              <li>• <strong>Agent 模式</strong>：自主执行复杂任务</li>
              <li>• <strong>命令行接口</strong>：简单的 CLI 接口</li>
              <li>• <strong>脚本生成</strong>：自动生成和执行脚本</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">使用场景</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>批量文件处理</strong>：重命名、转换、整理文件</li>
              <li>• <strong>代码重构</strong>：自动化代码重构任务</li>
              <li>• <strong>数据迁移</strong>：数据库迁移、数据转换</li>
              <li>• <strong>部署自动化</strong>：自动化部署流程</li>
            </ul>
          </div>
        </section>

        {/* Section 5: 工具对比与工作流 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            工具对比与工作流
          </h2>
          <p className="text-muted-foreground mb-6">
            根据场景选择合适的命令行工具，构建高效的工作流。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">场景选择</h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">日常开发</h4>
                <p className="text-muted-foreground">Claude Code（终端集成，MCP 支持）</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">大型项目分析</h4>
                <p className="text-muted-foreground">Codex CLI（Monorepo 分析，规则生成）</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">隐私敏感项目</h4>
                <p className="text-muted-foreground">Continue.dev + Ollama（本地模型，不上传代码）</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">自动化脚本</h4>
                <p className="text-muted-foreground">Goose（开源 Agent，脚本生成）</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">工作流建议</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>开发阶段</strong>：Claude Code 进行日常开发，MCP 连接 GitHub</li>
              <li>• <strong>项目分析</strong>：Codex CLI 分析大型项目，生成项目规则</li>
              <li>• <strong>批量处理</strong>：Gemini CLI 批量处理文件和文档</li>
              <li>• <strong>自动化</strong>：Goose 编写和执行自动化脚本</li>
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
                掌握命令行 AI 工具的使用（Claude Code、Codex CLI、Gemini CLI）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够配置 MCP 和本地模型（Ollama），理解终端 AI 增强的工作流
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握多模型切换技巧，能够根据场景选择合适的模型
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解 Warp、Continue.dev、Goose 等工具的特点和使用场景
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/web" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：网页编辑类工具详解
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/core" className="flex items-center gap-2">
            下一章：核心技术深度解析
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
