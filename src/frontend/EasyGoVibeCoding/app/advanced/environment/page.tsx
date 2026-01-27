import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Settings, Code, Bug, Zap } from "lucide-react"
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

export default function EnvironmentPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="环境搭建与代码运行基础"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          环境搭建与代码运行基础
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握开发环境的配置方法，理解代码从编写到运行的完整流程，学会高效的调试技巧。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 开发环境配置 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            开发环境配置
          </h2>
          <p className="text-muted-foreground mb-6">
            一个良好的开发环境是高效编程的基础。不同的技术栈需要不同的运行环境。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Node.js 环境</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 安装 Node.js（推荐 LTS 版本）</li>
                <li>• 使用 nvm 管理多版本</li>
                <li>• 配置 npm/yarn/pnpm</li>
                <li>• 设置镜像源加速</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Python 环境</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 安装 Python（推荐 3.11+）</li>
                <li>• 使用 pyenv 管理版本</li>
                <li>• 配置虚拟环境（venv）</li>
                <li>• 使用 pip/conda 管理包</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">.NET 环境</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 安装 .NET SDK</li>
                <li>• 配置 NuGet 包源</li>
                <li>• 使用 dotnet CLI</li>
                <li>• 配置开发工具</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h4 className="font-medium text-foreground mb-2">包管理器最佳实践</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>锁定依赖版本</strong>：使用 lockfile（package-lock.json、yarn.lock、pnpm-lock.yaml）</li>
              <li>• <strong>区分依赖类型</strong>：生产依赖 vs 开发依赖</li>
              <li>• <strong>定期更新</strong>：使用工具检查过时的依赖</li>
              <li>• <strong>安全审计</strong>：定期运行安全扫描</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 代码运行原理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            代码运行原理
          </h2>
          <p className="text-muted-foreground mb-6">
            理解代码从编写到执行的完整流程，有助于更好地调试和优化代码。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">解释型语言</h3>
              <p className="text-sm text-muted-foreground mb-3">
                代码在运行时逐行解释执行，如 JavaScript、Python。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  <span className="text-muted-foreground">开发快速，修改即时生效</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-destructive">-</span>
                  <span className="text-muted-foreground">运行时性能相对较低</span>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">编译型语言</h3>
              <p className="text-sm text-muted-foreground mb-3">
                代码先编译成机器码，再执行，如 C++、Go、Rust。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  <span className="text-muted-foreground">运行时性能高</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-destructive">-</span>
                  <span className="text-muted-foreground">编译时间长，调试相对复杂</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">运行时环境</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">JavaScript</strong>：V8 引擎（Chrome）、SpiderMonkey（Firefox）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">Python</strong>：CPython（官方）、PyPy（JIT 编译）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">执行流程</strong>：源代码 → 解析 → AST → 执行 → 结果
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 调试技巧 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" />
            调试技巧
          </h2>
          <p className="text-muted-foreground mb-6">
            高效的调试能力是开发者的核心技能。掌握多种调试方法，能快速定位和解决问题。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">断点调试</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>条件断点</strong>：只在满足条件时暂停</li>
                <li>• <strong>日志断点</strong>：记录信息而不暂停执行</li>
                <li>• <strong>调用栈分析</strong>：追踪函数调用链</li>
                <li>• <strong>变量监视</strong>：实时查看变量值变化</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">日志调试</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>日志级别</strong>：DEBUG、INFO、WARN、ERROR</li>
                <li>• <strong>结构化日志</strong>：使用 JSON 格式便于分析</li>
                <li>• <strong>日志聚合</strong>：集中收集和分析日志</li>
                <li>• <strong>性能日志</strong>：记录关键操作的耗时</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">AI 辅助调试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                利用 AI 工具快速定位问题：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 将错误信息粘贴给 AI，获取可能的解决方案</li>
                <li>• 使用 AI 分析代码逻辑，找出潜在问题</li>
                <li>• 让 AI 生成测试用例，验证修复效果</li>
                <li>• 利用 AI 解释复杂的错误堆栈</li>
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
                能够配置完整的开发环境（Node.js、Python、.NET等）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解代码从编写到运行的完整流程（解释型 vs 编译型）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握基本调试方法（断点调试、日志调试、AI辅助调试）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解包管理器的最佳实践和安全注意事项
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：序
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/ai-guide" className="flex items-center gap-2">
            下一章：AI 使用说明书
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
