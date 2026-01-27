import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Layout, MousePointer2, Smartphone, Accessibility, Zap } from "lucide-react"
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

export default function UIPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="界面交互"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          界面交互
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握 UI 组件设计、交互模式、响应式设计和用户体验原则，打造优秀的用户界面。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: UI 组件设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layout className="h-6 w-6 text-primary" />
            UI 组件设计
          </h2>
          <p className="text-muted-foreground mb-6">
            组件化是现代前端开发的核心思想，通过组合可复用的组件构建复杂的用户界面。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">原子设计方法论</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">原子 (Atoms)</strong>：最小的 UI 元素（按钮、输入框、标签）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">分子 (Molecules)</strong>：原子组合（搜索框、表单字段）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">组织 (Organisms)</strong>：分子组合（导航栏、表单、卡片列表）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">模板 (Templates)</strong>：页面布局结构
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">5</span>
                <div>
                  <strong className="text-foreground">页面 (Pages)</strong>：最终的用户界面
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">组件库使用</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>shadcn/ui</strong>：可复制粘贴的组件库，完全可控</li>
              <li>• <strong>Material-UI</strong>：Google Material Design 实现</li>
              <li>• <strong>Ant Design</strong>：企业级 UI 设计语言</li>
              <li>• <strong>Chakra UI</strong>：简洁、模块化的组件库</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 交互模式 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MousePointer2 className="h-6 w-6 text-primary" />
            交互模式
          </h2>
          <p className="text-muted-foreground mb-6">
            良好的交互设计让用户操作更流畅、更直观。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">状态管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>本地状态</strong>：useState、useReducer</li>
                <li>• <strong>全局状态</strong>：Context、Zustand、Redux</li>
                <li>• <strong>服务器状态</strong>：React Query、SWR</li>
                <li>• <strong>表单状态</strong>：React Hook Form、Formik</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">用户反馈</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>加载状态</strong>：Skeleton、Spinner</li>
                <li>• <strong>成功提示</strong>：Toast、Notification</li>
                <li>• <strong>错误处理</strong>：Error Boundary、错误提示</li>
                <li>• <strong>确认操作</strong>：Dialog、Confirm</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">常见交互模式</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>下拉刷新</strong>：移动端常见的数据刷新方式</li>
              <li>• <strong>无限滚动</strong>：分页加载大量数据</li>
              <li>• <strong>拖拽排序</strong>：列表项重新排序</li>
              <li>• <strong>模态框</strong>：临时显示重要信息或操作</li>
            </ul>
          </div>
        </section>

        {/* Section 3: 响应式设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-primary" />
            响应式设计
          </h2>
          <p className="text-muted-foreground mb-6">
            确保界面在不同设备上都能提供良好的用户体验。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">断点设计</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-medium text-foreground">sm</div>
                <div className="text-muted-foreground">≥640px</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-medium text-foreground">md</div>
                <div className="text-muted-foreground">≥768px</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-medium text-foreground">lg</div>
                <div className="text-muted-foreground">≥1024px</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-medium text-foreground">xl</div>
                <div className="text-muted-foreground">≥1280px</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 text-center">
                <div className="font-medium text-foreground">2xl</div>
                <div className="text-muted-foreground">≥1536px</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">移动优先</h3>
              <p className="text-sm text-muted-foreground mb-3">
                先设计移动端，再逐步增强桌面端体验。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 简化移动端交互</li>
                <li>• 优化触摸目标大小</li>
                <li>• 减少移动端内容</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">布局策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Flexbox</strong>：一维布局</li>
                <li>• <strong>Grid</strong>：二维布局</li>
                <li>• <strong>Container Queries</strong>：容器查询</li>
                <li>• <strong>流体布局</strong>：使用相对单位</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: UX 原则 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Accessibility className="h-6 w-6 text-primary" />
            UX 原则
          </h2>
          <p className="text-muted-foreground mb-6">
            优秀的用户体验是产品成功的关键。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可用性</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 操作直观易懂</li>
                <li>• 反馈及时明确</li>
                <li>• 错误可恢复</li>
                <li>• 学习成本低</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可访问性</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 键盘导航支持</li>
                <li>• 屏幕阅读器兼容</li>
                <li>• 颜色对比度达标</li>
                <li>• ARIA 标签完整</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">性能优化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 首屏加载 &lt; 2s</li>
                <li>• 代码分割</li>
                <li>• 图片懒加载</li>
                <li>• 缓存策略</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">设计原则</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>一致性</strong>：保持设计语言和交互模式一致</li>
              <li>• <strong>简洁性</strong>：减少不必要的元素和操作</li>
              <li>• <strong>可见性</strong>：重要功能清晰可见</li>
              <li>• <strong>容错性</strong>：允许用户犯错并提供恢复机制</li>
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
                能够设计和使用 UI 组件，理解原子设计方法论
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解常见交互模式，掌握状态管理和用户反馈方法
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握响应式设计方法，确保界面在不同设备上良好显示
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解 UX 基本原则（可用性、可访问性、性能优化）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/dev-basics" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：开发常识
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/data" className="flex items-center gap-2">
            下一章：数据持久化
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
