import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Code2, GitBranch, Package, Layers, Zap } from "lucide-react"
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

export default function DevBasicsPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="开发常识"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          开发常识
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握代码规范、版本控制、依赖管理等开发基础知识，建立良好的开发习惯。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 代码规范 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            代码规范
          </h2>
          <p className="text-muted-foreground mb-6">
            统一的代码规范让代码更易读、易维护，是团队协作的基础。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">命名规范</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>变量/函数</strong>：camelCase（如：getUserName）</li>
                <li>• <strong>类/组件</strong>：PascalCase（如：UserProfile）</li>
                <li>• <strong>常量</strong>：UPPER_SNAKE_CASE（如：MAX_RETRY_COUNT）</li>
                <li>• <strong>文件</strong>：kebab-case（如：user-service.ts）</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">代码风格</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 使用 ESLint/Prettier 统一格式</li>
                <li>• 缩进统一（2 空格或 4 空格）</li>
                <li>• 行长度限制（通常 80-120 字符）</li>
                <li>• 尾随逗号、分号使用一致</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">注释规范</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>为什么</strong>：解释代码的意图，而非实现细节</li>
              <li>• <strong>复杂逻辑</strong>：对复杂算法和业务逻辑添加注释</li>
              <li>• <strong>API 文档</strong>：使用 JSDoc/TSDoc 生成文档</li>
              <li>• <strong>TODO 标记</strong>：标记待完成的工作和已知问题</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 版本控制 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            版本控制
          </h2>
          <p className="text-muted-foreground mb-6">
            Git 是现代开发的标准工具，掌握 Git 是每个开发者的必备技能。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">基础操作</h3>
              <div className="space-y-2 text-sm font-mono text-muted-foreground">
                <div>git init - 初始化仓库</div>
                <div>git add . - 暂存更改</div>
                <div>git commit -m "message" - 提交更改</div>
                <div>git push - 推送到远程</div>
                <div>git pull - 拉取更新</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">分支策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>main/master</strong>：生产环境代码，保持稳定</li>
                <li>• <strong>develop</strong>：开发分支，集成新功能</li>
                <li>• <strong>feature/*</strong>：功能分支，开发新功能</li>
                <li>• <strong>hotfix/*</strong>：热修复分支，紧急修复</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">提交信息规范</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>格式：&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</div>
                <div className="mt-2">类型：</div>
                <ul className="ml-4 space-y-1">
                  <li>• feat: 新功能</li>
                  <li>• fix: 修复 bug</li>
                  <li>• docs: 文档更新</li>
                  <li>• style: 代码格式</li>
                  <li>• refactor: 重构</li>
                  <li>• test: 测试</li>
                  <li>• chore: 构建/工具</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 依赖管理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            依赖管理
          </h2>
          <p className="text-muted-foreground mb-6">
            合理管理项目依赖，确保项目的可维护性和安全性。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">依赖类型</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>生产依赖</strong>：运行时必需的包</li>
                <li>• <strong>开发依赖</strong>：仅开发时需要的包</li>
                <li>• <strong>对等依赖</strong>：需要宿主环境提供的包</li>
                <li>• <strong>可选依赖</strong>：可选的功能增强包</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">版本控制</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>精确版本</strong>：1.2.3（锁定版本）</li>
                <li>• <strong>范围版本</strong>：^1.2.3（允许小版本更新）</li>
                <li>• <strong>锁定文件</strong>：package-lock.json（确保一致性）</li>
                <li>• <strong>定期更新</strong>：检查过时依赖和安全漏洞</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">安全最佳实践</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 定期运行安全审计（npm audit、yarn audit）</li>
              <li>• 使用 Dependabot 自动更新依赖</li>
              <li>• 审查第三方包的许可证</li>
              <li>• 最小化依赖数量，避免不必要的包</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 开发模式 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            开发模式
          </h2>
          <p className="text-muted-foreground mb-6">
            了解常见的开发模式和架构模式，提升代码质量和可维护性。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">设计模式</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 单例模式</li>
                <li>• 工厂模式</li>
                <li>• 观察者模式</li>
                <li>• 策略模式</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">架构模式</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• MVC</li>
                <li>• MVVM</li>
                <li>• 组件化</li>
                <li>• 微服务</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">最佳实践</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• DRY（Don't Repeat Yourself）</li>
                <li>• KISS（Keep It Simple）</li>
                <li>• YAGNI（You Aren't Gonna Need It）</li>
                <li>• SOLID 原则</li>
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
                掌握代码规范要求（命名、风格、注释）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                熟练使用 Git 进行版本控制和团队协作
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解依赖管理的重要性，掌握安全最佳实践
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解常见开发模式和架构模式，提升代码质量
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/prd" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：PRD 与文档驱动
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/ui" className="flex items-center gap-2">
            下一章：界面交互
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
