import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText, CheckSquare, ListTree, Target, Zap } from "lucide-react"
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

export default function PRDPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="PRD 与文档驱动"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          PRD 与文档驱动
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握产品需求文档编写，理解 Spec 驱动开发流程，学会工作分解和完成定义，让文档成为开发的指南针。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: PRD 编写 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            PRD 编写
          </h2>
          <p className="text-muted-foreground mb-6">
            PRD（Product Requirements Document）是产品需求的完整描述，是开发团队的共同语言。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">PRD 核心结构</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">1. 产品概述</h4>
                <p className="text-sm text-muted-foreground">产品定位、目标用户、核心价值</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">2. 功能需求</h4>
                <p className="text-sm text-muted-foreground">功能列表、优先级、验收标准</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">3. 非功能需求</h4>
                <p className="text-sm text-muted-foreground">性能、安全、可用性要求</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">4. 约束与假设</h4>
                <p className="text-sm text-muted-foreground">技术约束、资源限制、前提条件</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">PRD 编写最佳实践</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>明确目标</strong>：每个功能都要回答"为什么需要"</li>
              <li>• <strong>定义非目标</strong>：明确说明不做什么，避免范围蔓延</li>
              <li>• <strong>可测试性</strong>：需求要能够被验证和测试</li>
              <li>• <strong>版本控制</strong>：PRD 应该像代码一样进行版本管理</li>
              <li>• <strong>持续更新</strong>：需求变更时及时更新文档</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Spec 驱动开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            Spec 驱动开发
          </h2>
          <p className="text-muted-foreground mb-6">
            Spec-Driven Development 强调先写规范，再写代码。规范即上下文，让 AI 更好地理解需求。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">传统开发流程</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>1. 需求讨论</div>
                <div>2. 直接编码</div>
                <div>3. 发现问题</div>
                <div>4. 返工修改</div>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Spec 驱动流程</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>1. 编写 Spec</div>
                <div>2. 评审确认</div>
                <div>3. 基于 Spec 编码</div>
                <div>4. 按 Spec 验收</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">Spec 的核心要素</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">目标 (Goals)</strong>：这个功能要解决什么问题？
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">非目标 (Non-Goals)</strong>：这个功能不做什么？
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">验收标准 (Acceptance Criteria)</strong>：怎样才算完成？
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">接口定义</strong>：输入输出、数据结构、错误处理
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: WBS 工作分解 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ListTree className="h-6 w-6 text-primary" />
            WBS 工作分解
          </h2>
          <p className="text-muted-foreground mb-6">
            WBS（Work Breakdown Structure）将复杂项目分解为可管理的小任务，是项目管理的基础。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">分解原则</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>MECE 原则</strong>：相互独立，完全穷尽（Mutually Exclusive, Collectively Exhaustive）</li>
              <li>• <strong>粒度适中</strong>：每个任务 1-3 天可完成</li>
              <li>• <strong>可交付</strong>：每个任务都有明确的产出物</li>
              <li>• <strong>依赖清晰</strong>：明确任务之间的依赖关系</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">示例：用户登录功能</h3>
            <div className="space-y-2 text-sm text-muted-foreground font-mono">
              <div className="pl-4">├─ 前端登录页面</div>
              <div className="pl-8">├─ UI 组件开发</div>
              <div className="pl-8">├─ 表单验证</div>
              <div className="pl-4">├─ 后端 API 开发</div>
              <div className="pl-8">├─ 登录接口</div>
              <div className="pl-8">├─ Token 生成</div>
              <div className="pl-4">└─ 测试</div>
              <div className="pl-8">├─ 单元测试</div>
              <div className="pl-8">└─ 集成测试</div>
            </div>
          </div>
        </section>

        {/* Section 4: DoD 完成定义 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            DoD 完成定义
          </h2>
          <p className="text-muted-foreground mb-6">
            DoD（Definition of Done）定义了任务完成的验收标准，确保质量一致。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">标准 DoD 检查清单</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">代码已通过所有测试</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">代码已通过代码审查</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">文档已更新</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">符合编码规范</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">已部署到测试环境</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-muted-foreground">产品经理已验收</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">DoD 的价值</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>质量保证</strong>：确保所有任务都达到统一的质量标准</li>
              <li>• <strong>减少返工</strong>：提前发现问题，避免后期修改</li>
              <li>• <strong>团队共识</strong>：所有人对"完成"有统一的理解</li>
              <li>• <strong>可追溯性</strong>：明确记录每个任务的完成情况</li>
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
                能够编写规范的 PRD 文档，包含完整的产品需求
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握 Spec 驱动开发流程，理解文档即上下文的理念
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够进行有效的任务分解（WBS），管理项目进度
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解 DoD 的重要性，能够定义清晰的验收标准
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ai-guide" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 使用说明书
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/dev-basics" className="flex items-center gap-2">
            下一章：开发常识
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
