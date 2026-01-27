import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TestTube, RefreshCw, Wrench, Shield, Zap } from "lucide-react"
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

export default function TestingPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="测试与质量"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 7 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          测试与质量
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握测试类型、TDD 实践、测试工具和质量保证方法，构建可靠的软件系统。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 测试类型 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TestTube className="h-6 w-6 text-primary" />
            测试类型
          </h2>
          <p className="text-muted-foreground mb-6">
            不同层次的测试覆盖不同范围，共同保证软件质量。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">单元测试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                测试单个函数或组件，快速反馈，覆盖率高。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 测试函数逻辑</li>
                <li>• Mock 外部依赖</li>
                <li>• 运行速度快</li>
                <li>• 覆盖率目标：80%+</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">集成测试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                测试多个模块协作，验证接口和数据流。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 测试模块间交互</li>
                <li>• 使用测试数据库</li>
                <li>• 验证数据一致性</li>
                <li>• 覆盖关键路径</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">E2E 测试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                端到端测试，模拟真实用户操作。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 测试完整用户流程</li>
                <li>• 使用真实浏览器</li>
                <li>• 运行速度较慢</li>
                <li>• 覆盖核心场景</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">性能测试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                测试系统性能和负载能力。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 响应时间测试</li>
                <li>• 并发测试</li>
                <li>• 压力测试</li>
                <li>• 资源使用监控</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: TDD 实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            TDD 实践
          </h2>
          <p className="text-muted-foreground mb-6">
            Test-Driven Development（测试驱动开发）先写测试，再写实现，提升代码质量。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">红-绿-重构循环</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">红（Red）</strong>：编写失败的测试，定义期望行为
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">绿（Green）</strong>：编写最小实现，让测试通过
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">重构（Refactor）</strong>：优化代码，保持测试通过
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助 TDD</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>生成测试用例</strong>：让 AI 根据需求生成测试用例（Given-When-Then）</li>
              <li>• <strong>加速实现</strong>：AI 快速生成最小实现代码</li>
              <li>• <strong>重构建议</strong>：AI 提供代码优化建议</li>
              <li>• <strong>测试覆盖</strong>：AI 分析测试覆盖率，找出遗漏场景</li>
            </ul>
          </div>
        </section>

        {/* Section 3: 测试工具 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            测试工具
          </h2>
          <p className="text-muted-foreground mb-6">
            选择合适的测试工具，提高测试效率和质量。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Jest</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• JavaScript 测试框架</li>
                <li>• 内置断言和 Mock</li>
                <li>• 快照测试</li>
                <li>• 覆盖率报告</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Vitest</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 快速测试框架</li>
                <li>• Vite 原生支持</li>
                <li>• TypeScript 友好</li>
                <li>• 兼容 Jest API</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Playwright</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• E2E 测试框架</li>
                <li>• 多浏览器支持</li>
                <li>• 自动等待</li>
                <li>• 截图和视频</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">测试工具选择</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>单元测试</strong>：Jest、Vitest、Mocha</li>
              <li>• <strong>组件测试</strong>：React Testing Library、Vue Test Utils</li>
              <li>• <strong>E2E 测试</strong>：Playwright、Cypress、Puppeteer</li>
              <li>• <strong>性能测试</strong>：Lighthouse、WebPageTest</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 质量保证 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            质量保证
          </h2>
          <p className="text-muted-foreground mb-6">
            建立完善的质量保证体系，持续提升代码质量。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">代码覆盖率</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>行覆盖率</strong>：执行的代码行数比例</li>
                <li>• <strong>分支覆盖率</strong>：执行的代码分支比例</li>
                <li>• <strong>函数覆盖率</strong>：调用的函数比例</li>
                <li>• <strong>目标</strong>：关键代码 80%+，整体 60%+</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">测试策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>测试金字塔</strong>：大量单元测试 + 适量集成测试 + 少量 E2E 测试</li>
                <li>• <strong>关键路径优先</strong>：优先测试核心业务逻辑</li>
                <li>• <strong>边界测试</strong>：测试边界条件和异常情况</li>
                <li>• <strong>回归测试</strong>：确保新功能不影响现有功能</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">CI/CD 集成</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>自动化测试</strong>：每次提交自动运行测试</li>
                <li>• <strong>测试失败阻止合并</strong>：确保代码质量</li>
                <li>• <strong>覆盖率报告</strong>：可视化测试覆盖率</li>
                <li>• <strong>测试报告</strong>：记录测试结果和历史趋势</li>
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
                理解不同测试类型的作用（单元测试、集成测试、E2E 测试、性能测试）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握 TDD 开发方法（红-绿-重构循环），了解 AI 辅助 TDD
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够使用主流测试工具（Jest、Vitest、Playwright）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                建立质量保证意识，掌握测试策略和 CI/CD 集成方法
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/data" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：数据持久化
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/deployment" className="flex items-center gap-2">
            下一章：部署与运维
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
