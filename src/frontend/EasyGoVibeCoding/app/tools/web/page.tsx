import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Globe, Sparkles, Rocket, Layers, Zap } from "lucide-react"
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

export default function WebPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="网页编辑类工具详解"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          网页编辑类工具详解
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握网页编辑类 AI 工具的使用方法，包括 v0、bolt.new 等，理解 WebContainers 等技术原理，快速构建 Web 应用。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: v0 实战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            v0：自然语言生成 UI
          </h2>
          <p className="text-muted-foreground mb-6">
            v0 是 Vercel 推出的 AI UI 生成工具，能够通过自然语言描述快速生成 React 组件。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">核心特性</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>自然语言输入</strong>：用中文或英文描述 UI 需求</li>
                <li>• <strong>即时预览</strong>：实时查看生成的 UI 效果</li>
                <li>• <strong>代码导出</strong>：生成完整的 React/Next.js 代码</li>
                <li>• <strong>迭代优化</strong>：通过对话不断改进 UI</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Figma 集成</h3>
              <p className="text-sm text-muted-foreground mb-3">
                v0 支持从 Figma 设计稿直接生成代码：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 导入 Figma 设计文件</li>
                <li>• 自动识别设计元素</li>
                <li>• 生成对应的 React 组件</li>
                <li>• 保持设计还原度</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">一键部署</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 直接部署到 Vercel</li>
                <li>• 自动配置 CI/CD</li>
                <li>• 支持自定义域名</li>
                <li>• 生产环境就绪</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: bolt.new 深度解析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            bolt.new：浏览器内全栈开发
          </h2>
          <p className="text-muted-foreground mb-6">
            bolt.new 基于 StackBlitz 的 WebContainers 技术，让你在浏览器中完成全栈开发，无需本地环境。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">WebContainers 技术</h3>
            <p className="text-sm text-muted-foreground mb-4">
              WebContainers 是 StackBlitz 的核心技术，在浏览器中运行 Node.js 环境：
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">无需安装</strong>：直接在浏览器中运行，无需本地 Node.js
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">完整环境</strong>：支持 npm、yarn、pnpm 等包管理器
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">实时协作</strong>：多人实时编辑和预览
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">快速启动</strong>：秒级启动，无需等待环境配置
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">全栈开发</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 前端 + 后端开发</li>
                <li>• 数据库集成</li>
                <li>• API 开发</li>
                <li>• 实时预览</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">AI 增强</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI 代码生成</li>
                <li>• 自然语言转代码</li>
                <li>• 智能补全</li>
                <li>• 代码解释</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 其他工具概览 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            其他工具概览
          </h2>
          <p className="text-muted-foreground mb-6">
            了解其他网页编辑类 AI 工具的特点和适用场景。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Lovable</h3>
              <p className="text-sm text-muted-foreground mb-3">
                专注于快速原型开发的 AI 工具
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 快速 UI 生成</li>
                <li>• 组件库集成</li>
                <li>• 设计到代码</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">AnyCoder</h3>
              <p className="text-sm text-muted-foreground mb-3">
                多语言代码生成工具
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 支持多种语言</li>
                <li>• 代码转换</li>
                <li>• 代码优化</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Agent 3 (Replit)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Replit 的 AI Agent 功能
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Agent 模式开发</li>
                <li>• 自主任务执行</li>
                <li>• 云端开发环境</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 工具对比与选型 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            工具对比与选型
          </h2>
          <p className="text-muted-foreground mb-6">
            根据项目需求选择合适的网页编辑工具。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">适用场景对比</h3>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">v0</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ UI 组件快速生成</li>
                    <li>✓ Figma 设计稿转代码</li>
                    <li>✓ React/Next.js 项目</li>
                    <li>✓ 快速原型开发</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">bolt.new</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ 全栈应用开发</li>
                    <li>✓ 浏览器内开发</li>
                    <li>✓ 实时协作</li>
                    <li>✓ 无需本地环境</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">选型建议</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>UI 组件开发</strong>：v0（快速生成，Figma 集成）</li>
              <li>• <strong>全栈应用</strong>：bolt.new（完整环境，实时协作）</li>
              <li>• <strong>快速原型</strong>：Lovable（专注原型，简单易用）</li>
              <li>• <strong>代码转换</strong>：AnyCoder（多语言支持）</li>
            </ul>
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
                掌握网页编辑类工具的使用方法（v0、bolt.new 等）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解 WebContainers 等技术原理和优势
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                了解不同工具的适用场景，能够选择合适的工具
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握 Figma 集成、一键部署等高级功能
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/ide" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：IDE 类工具详解
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/cli" className="flex items-center gap-2">
            下一章：命令行类工具详解
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
