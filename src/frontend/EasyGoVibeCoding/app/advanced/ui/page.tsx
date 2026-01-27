import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Layout, MousePointer2, Smartphone, Accessibility, Zap, Palette, Code, Monitor, Eye, Gauge, Rocket, Sparkles, Settings, FileCode, Layers, CheckCircle2, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

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
        {/* Section 0: 序言 - 结构化思考方法 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              使用 Sequential Thinking 学习 AI 驱动的界面交互
            </p>
            <p className="text-muted-foreground mb-4">
              AI 在界面交互中的应用涉及多个层面，使用<strong className="text-foreground">结构化思考方法</strong>可以帮助你系统掌握：
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "界面设计基础概览", desc: "Design Tokens、主题系统、组件架构快速了解" },
                { step: "2", title: "AI 辅助组件开发", desc: "组件代码生成、样式优化、组件库选型" },
                { step: "3", title: "AI 辅助交互实现", desc: "状态管理代码生成、表单验证、动画效果" },
                { step: "4", title: "AI 辅助响应式与可访问性", desc: "响应式布局生成、无障碍检查、WCAG 合规性验证" },
                { step: "5", title: "AI 驱动的性能优化", desc: "性能瓶颈分析、优化方案生成、性能监控" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {item.step}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: 设计系统 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            设计系统（Design System）
          </h2>
          <p className="text-muted-foreground mb-6">
            设计系统是一套可复用的设计标准和组件库，确保产品的一致性和可维护性。
          </p>

          {/* Design Tokens */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">Design Tokens 设计令牌</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Design Tokens 是设计决策的最小单位，通过 CSS 变量统一管理颜色、间距、字体等设计元素。
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">颜色系统（OKLCH 颜色空间）</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  使用 OKLCH 颜色空间可以更好地处理颜色对比度和主题切换。项目中的颜色定义：
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`:root {
  --primary: oklch(0.7 0.15 200);
  --background: oklch(0.09 0 0);
  --foreground: oklch(0.98 0 0);
  --border: oklch(0.25 0 0);
  /* ... 更多颜色变量 */
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">间距系统</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Tailwind 默认间距比例（4px 基准）：0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
                  {[0, 1, 2, 4, 8, 12, 16, 24].map((size) => (
                    <div key={size} className="p-2 rounded bg-secondary/50 text-center">
                      <div className="font-mono">{size}</div>
                      <div className="text-muted-foreground">{size * 4}px</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">字体系统</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-foreground mb-1">字体族</div>
                    <div className="text-muted-foreground font-mono">--font-sans: 'Geist'</div>
                    <div className="text-muted-foreground font-mono">--font-mono: 'Geist Mono'</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">字号比例</div>
                    <div className="text-muted-foreground">xs: 0.75rem, sm: 0.875rem, base: 1rem, lg: 1.125rem, xl: 1.25rem, 2xl: 1.5rem</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">圆角系统</h4>
                <div className="flex gap-4 items-center">
                  <div className="text-xs text-muted-foreground">--radius-sm: calc(var(--radius) - 4px)</div>
                  <div className="text-xs text-muted-foreground">--radius-md: calc(var(--radius) - 2px)</div>
                  <div className="text-xs text-muted-foreground">--radius-lg: var(--radius)</div>
                  <div className="text-xs text-muted-foreground">--radius-xl: calc(var(--radius) + 4px)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 主题系统 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">主题系统</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">暗色模式实现</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">next-themes</code> 实现主题切换：
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">CSS 变量主题切换</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  通过 <code className="px-1 py-0.5 rounded bg-secondary text-xs">.dark</code> 类切换主题变量：
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`.dark {
  --background: oklch(0.09 0 0);
  --foreground: oklch(0.98 0 0);
  /* 暗色模式下的所有颜色变量 */
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 组件架构 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">组件架构</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">原子设计方法论</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
                  {[
                    { level: "原子", desc: "按钮、输入框、标签", example: "Button, Input" },
                    { level: "分子", desc: "搜索框、表单字段", example: "SearchBox, FormField" },
                    { level: "组织", desc: "导航栏、表单、卡片列表", example: "Header, Form, CardList" },
                    { level: "模板", desc: "页面布局结构", example: "DashboardLayout" },
                    { level: "页面", desc: "最终的用户界面", example: "DashboardPage" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">{item.level}</div>
                      <div className="text-xs text-muted-foreground mb-1">{item.desc}</div>
                      <div className="text-xs font-mono text-muted-foreground">{item.example}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">组件变体系统（CVA）</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">class-variance-authority</code> 管理组件变体：
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: AI 在界面交互中的最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI 在界面交互中的最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            利用 AI 提升前端 UI 开发效率，从组件设计到性能优化的全流程 AI 辅助实践。
          </p>

          <Tabs defaultValue="component" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
              <TabsTrigger value="component">组件开发</TabsTrigger>
              <TabsTrigger value="interaction">交互实现</TabsTrigger>
              <TabsTrigger value="responsive">响应式设计</TabsTrigger>
              <TabsTrigger value="accessibility">可访问性</TabsTrigger>
              <TabsTrigger value="performance">性能优化</TabsTrigger>
              <TabsTrigger value="design">UI/UX 设计</TabsTrigger>
            </TabsList>

            {/* AI 辅助组件开发 */}
            <TabsContent value="component" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助组件开发</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">使用 AI 生成组件代码</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      向 AI 描述组件需求，让它生成完整的 React/Next.js 组件：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要创建一个用户卡片组件，包含以下功能：
1. 显示用户头像、姓名、邮箱
2. 支持点击查看详情
3. 使用 Tailwind CSS 样式
4. 支持暗色模式
5. 响应式设计（移动端和桌面端）
6. 使用 TypeScript
7. 遵循 shadcn/ui 设计规范

请生成完整的组件代码，包含：
- 类型定义
- Props 接口
- 样式类名
- 响应式断点
- 可访问性属性`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的组件示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// components/user-card.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

interface UserCardProps {
  name: string
  email: string
  avatar?: string
  onClick?: () => void
}

export function UserCard({ name, email, avatar, onClick }: UserCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.()
        }
      }}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">{email}</p>
        </div>
      </CardContent>
    </Card>
  )
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助样式优化</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 优化 Tailwind CSS 类名，生成更简洁高效的样式：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

优化以下 Tailwind CSS 类名，使其更简洁高效：

当前代码：
<div className="flex flex-row items-center justify-between p-4 m-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">

请：
1. 合并重复的类名
2. 使用更简洁的写法
3. 确保响应式和暗色模式支持
4. 保持相同的视觉效果`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助组件库选型</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为 Next.js 16 + TypeScript 项目选择组件库，需求如下：
1. 支持暗色模式
2. 可定制性强
3. 类型安全
4. 性能优秀
5. 社区活跃

请对比以下组件库：
- shadcn/ui
- Material-UI (MUI)
- Ant Design
- Chakra UI

给出推荐和理由，并说明如何集成到 Next.js 项目中。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助交互实现 */}
            <TabsContent value="interaction" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助交互实现</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成状态管理代码</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成状态管理逻辑，包括 useState、useReducer、Zustand：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要实现一个购物车状态管理，包含以下功能：
1. 添加商品到购物车
2. 从购物车移除商品
3. 更新商品数量
4. 清空购物车
5. 计算总价
6. 持久化到 localStorage

请使用 Zustand 生成：
- Store 定义
- Actions
- Selectors
- TypeScript 类型
- localStorage 持久化逻辑`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 Zustand Store 示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// stores/cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id)
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }]
          }))
        }
      },
      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(i => i.id !== id)
        }))
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
        } else {
          set(state => ({
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity } : i
            )
          }))
        }
      },
      clearCart: () => set({ items: [] }),
      get totalPrice() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
      }
    }),
    { name: 'cart-storage' }
  )
)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助表单验证</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要创建一个用户注册表单，包含：
1. 用户名（3-20字符，只能包含字母数字下划线）
2. 邮箱（必须有效）
3. 密码（至少8位，包含大小写字母和数字）
4. 确认密码（必须与密码一致）

请使用 React Hook Form + Zod 生成：
- Zod Schema
- 表单组件
- 错误处理
- 提交逻辑`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成动画效果</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为一个按钮添加点击动画效果：
1. 点击时缩放效果（0.95倍）
2. 释放时恢复
3. 使用 Framer Motion
4. 动画时长 150ms
5. 使用弹性缓动函数

请生成完整的按钮组件代码。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助响应式设计 */}
            <TabsContent value="responsive" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助响应式设计</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成响应式布局</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成响应式布局代码，包括 Grid、Flexbox、Container Queries：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要创建一个响应式卡片网格布局：
1. 桌面端：3列网格
2. 平板端：2列网格
3. 移动端：1列
4. 卡片间距：16px
5. 使用 Tailwind CSS Grid
6. 支持 Container Queries（如果可能）

请生成完整的布局代码，包含：
- Grid 容器
- 响应式断点
- 间距设置`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的响应式布局示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// 响应式卡片网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>

// 使用 Container Queries（需要 @container 指令）
<div className="@container">
  <div className="@md:grid-cols-2 @lg:grid-cols-3 grid grid-cols-1 gap-4">
    {/* 卡片内容 */}
  </div>
</div>`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助移动端适配</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

优化以下组件以适配移动端：
1. 触摸目标至少 44x44px
2. 字体大小在移动端不小于 16px（避免自动缩放）
3. 使用移动优先的断点策略
4. 优化触摸交互（避免 hover 状态）

当前代码：
<button className="px-2 py-1 text-sm hover:bg-gray-100">
  点击
</button>

请提供优化后的代码。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助可访问性 */}
            <TabsContent value="accessibility" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助可访问性</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 检查无障碍问题</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 检查组件的无障碍问题，包括 ARIA 标签、键盘导航：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

检查以下组件的无障碍问题：

<button onClick={handleClick}>
  <Icon />
</button>

请指出：
1. 缺少的 ARIA 属性
2. 键盘导航问题
3. 屏幕阅读器支持问题
4. 颜色对比度问题（如果适用）
5. 提供改进后的代码`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成可访问的组件代码</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// AI 改进后的代码
<button
  onClick={handleClick}
  aria-label="关闭对话框"
  className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
>
  <Icon aria-hidden="true" />
</button>

// 或者使用语义化 HTML
<button
  onClick={handleClick}
  aria-label="关闭对话框"
  className="..."
>
  <span className="sr-only">关闭</span>
  <Icon aria-hidden="true" />
</button>`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助 WCAG 合规性检查</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

检查以下设计是否符合 WCAG 2.1 AA 标准：

设计规范：
- 主文本颜色：#666666
- 背景颜色：#FFFFFF
- 链接颜色：#0066CC
- 按钮文字：#FFFFFF，背景：#0066CC

请检查：
1. 颜色对比度是否达标（文本至少 4.5:1，大文本 3:1）
2. 交互元素是否有足够的对比度（3:1）
3. 提供改进建议`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 驱动的性能优化 */}
            <TabsContent value="performance" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 驱动的性能优化</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 分析性能瓶颈</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将性能分析结果提供给 AI，让它识别性能瓶颈：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我的 React 应用性能分析结果：
- 首次内容绘制（FCP）：2.5秒
- 最大内容绘制（LCP）：4.2秒
- 首次输入延迟（FID）：180ms
- Bundle 大小：850KB（未压缩）
- React DevTools Profiler 显示：组件重新渲染频繁

请分析：
1. 主要性能瓶颈在哪里？
2. 如何优化渲染性能？
3. 如何减少 Bundle 大小？
4. 提供具体的优化方案和代码示例`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成优化方案</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`优化建议：

1. 使用 React.memo 减少不必要的重新渲染
2. 使用 useMemo 和 useCallback 优化计算和函数
3. 代码分割和懒加载组件
4. 优化图片加载（Next.js Image 组件）

// 示例：优化组件渲染
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data)
  }, [data])
  
  return <div>{processedData}</div>
})

// 示例：代码分割
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助 Bundle 大小优化</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我的 Next.js 应用 Bundle 分析显示：
- lodash: 70KB
- moment: 67KB
- 某个大型图表库: 120KB

请提供优化建议：
1. 如何按需导入（tree-shaking）
2. 是否有更轻量的替代方案
3. 如何配置 webpack/Next.js 优化 Bundle`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助 UI/UX 设计 */}
            <TabsContent value="design" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助 UI/UX 设计</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成设计系统</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成完整的设计系统，包括颜色、间距、字体：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为 SaaS 产品设计一套设计系统，要求：
1. 主色调：专业、现代、科技感
2. 支持暗色模式
3. 间距系统：4px 基准
4. 字体：无衬线字体，清晰易读
5. 圆角：中等圆角（8px）

请生成：
- 完整的颜色系统（主色、辅助色、语义色）
- 间距 scale
- 字体 scale
- CSS 变量定义
- Tailwind 配置`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的设计系统示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// globals.css
:root {
  /* 主色调 */
  --primary: oklch(0.6 0.2 250);
  --primary-foreground: oklch(0.98 0 0);
  
  /* 辅助色 */
  --secondary: oklch(0.95 0.02 250);
  --secondary-foreground: oklch(0.2 0.02 250);
  
  /* 语义色 */
  --success: oklch(0.65 0.15 150);
  --warning: oklch(0.75 0.15 60);
  --error: oklch(0.55 0.2 25);
  
  /* 间距系统（4px 基准） */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  
  /* 圆角 */
  --radius: 0.5rem; /* 8px */
}

.dark {
  --primary: oklch(0.7 0.2 250);
  /* 暗色模式颜色调整 */
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助设计评审</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

评审以下设计方案的视觉层次和可用性：

设计方案：
- 页面标题：24px，粗体
- 副标题：18px，中等粗细
- 正文：14px，常规
- 按钮：主按钮 16px，次要按钮 14px
- 间距：标题下方 32px，段落之间 16px

请评估：
1. 视觉层次是否清晰？
2. 字体大小是否合适？
3. 间距是否合理？
4. 是否符合设计原则？
5. 提供改进建议`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 3: UI 组件设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layout className="h-6 w-6 text-primary" />
            UI 组件设计
          </h2>
          <p className="text-muted-foreground mb-6">
            组件化是现代前端开发的核心思想，通过组合可复用的组件构建复杂的用户界面。
          </p>

          <Tabs defaultValue="tailwind" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
              <TabsTrigger value="shadcn">shadcn/ui</TabsTrigger>
            </TabsList>

            {/* Tailwind CSS */}
            <TabsContent value="tailwind" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Tailwind CSS 深度配置</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">配置文件结构</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // 使用 CSS 变量
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">自定义工具类</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// 在 globals.css 中添加自定义工具类
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">响应式断点自定义</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// tailwind.config.ts
theme: {
  screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">暗色模式配置</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 <code className="px-1 py-0.5 rounded bg-secondary">dark:</code> 前缀：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* 内容 */}
</div>`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* shadcn/ui */}
            <TabsContent value="shadcn" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">shadcn/ui 使用指南</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">安装和配置</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">组件安装流程</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`# 安装单个组件
npx shadcn@latest add button

# 安装多个组件
npx shadcn@latest add button card dialog

# 组件会被复制到 components/ui/ 目录
# 你可以直接修改组件代码`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">组件自定义方法</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      shadcn/ui 组件是复制到项目中的，可以直接修改：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// components/ui/button.tsx
// 直接修改组件代码，添加自定义样式或功能
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        // 添加自定义变体
        custom: 'bg-custom-color text-custom-foreground',
      },
    },
  }
)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">Radix UI 基础</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      shadcn/ui 基于 Radix UI，提供开箱即用的无障碍性支持：
                    </p>
                    <ul className="space-y-1 text-xs text-muted-foreground ml-4 list-disc">
                      <li>键盘导航支持（Tab、Enter、Esc）</li>
                      <li>ARIA 属性自动管理</li>
                      <li>焦点管理（Focus Trap）</li>
                      <li>屏幕阅读器兼容</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* 组件库对比 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">组件库对比与选型</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-medium text-foreground">组件库</th>
                    <th className="text-left p-2 font-medium text-foreground">特点</th>
                    <th className="text-left p-2 font-medium text-foreground">适用场景</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">shadcn/ui</td>
                    <td className="p-2">可复制粘贴、完全可控、基于 Radix UI</td>
                    <td className="p-2">需要高度定制的项目、Next.js 项目</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">Material-UI</td>
                    <td className="p-2">组件丰富、文档完善、Material Design</td>
                    <td className="p-2">企业级应用、快速原型开发</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">Ant Design</td>
                    <td className="p-2">企业级组件、中后台应用、中文文档</td>
                    <td className="p-2">中后台系统、管理平台</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-foreground">Chakra UI</td>
                    <td className="p-2">简洁、模块化、TypeScript 支持</td>
                    <td className="p-2">现代 Web 应用、需要灵活性的项目</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: 交互模式 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MousePointer2 className="h-6 w-6 text-primary" />
            交互模式
          </h2>
          <p className="text-muted-foreground mb-6">
            良好的交互设计让用户操作更流畅、更直观。掌握状态管理、表单处理和动画技巧。
          </p>

          {/* 状态管理 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">状态管理详细指南</h3>
            
            <Tabs defaultValue="local" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="local">本地状态</TabsTrigger>
                <TabsTrigger value="global">全局状态</TabsTrigger>
                <TabsTrigger value="server">服务器状态</TabsTrigger>
                <TabsTrigger value="form">表单状态</TabsTrigger>
              </TabsList>

              <TabsContent value="local" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">useState 最佳实践</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用函数式更新避免闭包问题
const [count, setCount] = useState(0)

// 正确：使用函数式更新
setCount(prev => prev + 1)

// 避免：直接依赖 state
setCount(count + 1) // 可能不准确

// 复杂状态使用 useReducer
const [state, dispatch] = useReducer(reducer, initialState)`}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="global" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">状态管理方案对比</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">Context API</div>
                      <div className="text-xs text-muted-foreground">适合：主题、用户信息等低频更新</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">Zustand</div>
                      <div className="text-xs text-muted-foreground">适合：中小型应用、简单 API</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">Redux</div>
                      <div className="text-xs text-muted-foreground">适合：大型应用、复杂状态逻辑</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="server" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">React Query 配置</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 配置 React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 分钟
      cacheTime: 10 * 60 * 1000, // 10 分钟
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// 使用
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})`}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="form" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">React Hook Form + Zod</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('无效的邮箱'),
  password: z.string().min(8, '密码至少 8 位'),
})

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: '',
    password: '',
  },
})`}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 表单处理 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">表单处理最佳实践</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">表单验证示例</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 完整的表单组件示例
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  username: z.string().min(2, '用户名至少 2 个字符'),
  email: z.string().email('无效的邮箱地址'),
})

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">表单性能优化</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">mode: 'onBlur'</code> 减少验证次数</li>
                  <li>复杂表单使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">useFieldArray</code> 管理动态字段</li>
                  <li>大表单使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">shouldUnregister</code> 优化内存</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 用户反馈 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">用户反馈系统</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Toast 通知</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`import { toast } from 'sonner'

toast.success('操作成功')
toast.error('操作失败')
toast.info('提示信息')`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Loading 状态</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// Skeleton 加载
<Skeleton className="h-4 w-[250px]" />

// Spinner
<Loader2 className="h-4 w-4 animate-spin" />`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 动画与过渡 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">动画与过渡</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Tailwind 动画</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 tailwindcss-animate
<div className="animate-in fade-in slide-in-from-top-4">
  {/* 内容 */}
</div>

// 常用动画类
animate-in          // 进入动画
animate-out         // 退出动画
fade-in             // 淡入
slide-in-from-top  // 从顶部滑入
duration-300        // 持续时间`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">性能考虑</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">transform</code> 和 <code className="px-1 py-0.5 rounded bg-secondary text-xs">opacity</code> 触发 GPU 加速</li>
                  <li>避免动画 <code className="px-1 py-0.5 rounded bg-secondary text-xs">width</code>、<code className="px-1 py-0.5 rounded bg-secondary text-xs">height</code> 等属性</li>
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">will-change</code> 提示浏览器优化</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 响应式设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="h-6 w-6 text-primary" />
            响应式设计
          </h2>
          <p className="text-muted-foreground mb-6">
            确保界面在不同设备上都能提供良好的用户体验。采用移动优先策略，使用灵活的布局技术。
          </p>

          {/* 移动优先策略 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">移动优先策略</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">移动端设计原则</h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4 list-disc">
                  <li>先设计移动端，再逐步增强桌面端体验</li>
                  <li>简化移动端交互，减少操作步骤</li>
                  <li>优化触摸目标大小（最小 44x44px）</li>
                  <li>减少移动端内容，突出核心功能</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">移动端导航模式</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">底部导航</div>
                    <div className="text-xs text-muted-foreground">适合主要功能入口</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">汉堡菜单</div>
                    <div className="text-xs text-muted-foreground">适合次要功能</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">标签页</div>
                    <div className="text-xs text-muted-foreground">适合内容分类</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 布局技术 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">布局技术</h3>
            <Tabs defaultValue="flexbox" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="flexbox">Flexbox</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="container">Container</TabsTrigger>
                <TabsTrigger value="fluid">流体布局</TabsTrigger>
              </TabsList>

              <TabsContent value="flexbox" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">Flexbox 高级用法</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 响应式 Flexbox
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">内容 1</div>
  <div className="flex-1">内容 2</div>
</div>

// 对齐方式
<div className="flex items-center justify-between">
  {/* 垂直居中，水平两端对齐 */}
</div>`}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="grid" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">CSS Grid 布局</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 响应式 Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 自动响应列数 */}
</div>

// Grid 区域布局
<div className="grid grid-areas-[header,main,sidebar] md:grid-areas-[header_header,sidebar_main]">
  <header className="grid-area-header">Header</header>
  <main className="grid-area-main">Main</main>
  <aside className="grid-area-sidebar">Sidebar</aside>
</div>`}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="container" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">容器查询（Container Queries）</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 基于容器大小的响应式
<div className="@container">
  <div className="@md:grid-cols-2">
    {/* 当容器宽度 >= md 时显示 2 列 */}
  </div>
</div>`}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fluid" className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">流体布局</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用相对单位和 clamp
<div className="text-[clamp(1rem,4vw,2rem)]">
  {/* 响应式字体大小 */}
</div>

<div className="w-[min(100%,1200px)] mx-auto">
  {/* 最大宽度限制 */}
</div>`}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 断点策略 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">断点策略</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
              {[
                { name: 'sm', size: '≥640px', desc: '小屏设备' },
                { name: 'md', size: '≥768px', desc: '平板' },
                { name: 'lg', size: '≥1024px', desc: '笔记本' },
                { name: 'xl', size: '≥1280px', desc: '桌面' },
                { name: '2xl', size: '≥1536px', desc: '大屏' },
              ].map((bp) => (
                <div key={bp.name} className="p-3 rounded-lg bg-secondary/50 text-center">
                  <div className="font-medium text-foreground">{bp.name}</div>
                  <div className="text-muted-foreground text-xs">{bp.size}</div>
                  <div className="text-muted-foreground text-xs mt-1">{bp.desc}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
              <pre className="text-muted-foreground whitespace-pre-wrap">{`// 断点使用最佳实践
// 移动优先：默认样式适用于移动端
<div className="text-sm md:text-base lg:text-lg">
  {/* 从小屏到大屏逐步增强 */}
</div>

// 避免：桌面优先（不推荐）
<div className="text-lg md:text-base sm:text-sm">
  {/* 这样会增加移动端负担 */}
</div>`}</pre>
            </div>
          </div>

          {/* 移动端优化 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">移动端优化</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">视口配置</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// app/layout.tsx
export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">触摸事件处理</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">touch-action</code> 优化触摸响应</li>
                  <li>避免 <code className="px-1 py-0.5 rounded bg-secondary text-xs">hover</code> 状态在移动端的误触</li>
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">@media (hover: hover)</code> 检测设备是否支持悬停</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: 可访问性 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            可访问性（Accessibility）
          </h2>
          <p className="text-muted-foreground mb-6">
            可访问性确保所有用户都能使用你的应用，包括使用辅助技术的用户。遵循 WCAG 标准，让产品更加包容。
          </p>

          {/* WCAG 标准 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">WCAG 标准</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">WCAG 2.1 级别</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">级别 A</div>
                    <div className="text-xs text-muted-foreground">最低要求，基本可访问性</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border-2 border-primary/50">
                    <div className="font-medium text-foreground mb-1">级别 AA（推荐）</div>
                    <div className="text-xs text-muted-foreground">大多数网站应达到的标准</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">级别 AAA</div>
                    <div className="text-xs text-muted-foreground">最高标准，特殊需求</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">关键原则（POUR）</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                  {[
                    { principle: '可感知', desc: '信息可通过多种方式感知' },
                    { principle: '可操作', desc: '界面组件和导航可操作' },
                    { principle: '可理解', desc: '信息和操作可理解' },
                    { principle: '可健壮', desc: '内容可被各种辅助技术解释' },
                  ].map((item) => (
                    <div key={item.principle} className="p-3 rounded-lg bg-secondary/50">
                      <div className="font-medium text-foreground mb-1">{item.principle}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 键盘导航 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">键盘导航</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Tab 顺序管理</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 tabIndex 控制 Tab 顺序
<button tabIndex={1}>第一个</button>
<button tabIndex={2}>第二个</button>

// 跳过不可交互元素
<div tabIndex={-1}>跳过此元素</div>

// 移除 Tab 顺序（不推荐，除非必要）
<button tabIndex={-1}>不可通过 Tab 访问</button>`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">焦点管理</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 焦点陷阱（Focus Trap）- 模态框中使用
import { FocusTrap } from '@radix-ui/react-focus-trap'

<FocusTrap>
  <Dialog>
    {/* 焦点被限制在对话框内 */}
  </Dialog>
</FocusTrap>

// 焦点可见样式
<button className="focus-visible:ring-2 focus-visible:ring-primary">
  {/* 键盘导航时显示焦点环 */}
</button>`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">快捷键支持</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>Enter/Space：激活按钮或链接</li>
                  <li>Esc：关闭模态框或菜单</li>
                  <li>Arrow Keys：导航列表或菜单项</li>
                  <li>Tab：在可聚焦元素间移动</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 屏幕阅读器 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">屏幕阅读器支持</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">ARIA 标签使用</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// aria-label：为元素提供标签
<button aria-label="关闭对话框">
  <X />
</button>

// aria-labelledby：引用其他元素的 ID
<div aria-labelledby="dialog-title">
  <h2 id="dialog-title">对话框标题</h2>
</div>

// aria-describedby：提供额外描述
<input 
  aria-describedby="email-help"
  aria-invalid={hasError}
/>
<span id="email-help">请输入有效的邮箱地址</span>`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">语义化 HTML</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用语义化标签
<nav>导航</nav>
<main>主要内容</main>
<article>文章</article>
<section>章节</section>
<aside>侧边栏</aside>
<header>页头</header>
<footer>页脚</footer>

// 避免：使用 div 代替语义标签
<div className="nav"> {/* 不推荐 */}
<nav> {/* 推荐 */}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">角色定义</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 role 属性（当语义标签不可用时）
<div role="button" tabIndex={0} onClick={handleClick}>
  自定义按钮
</div>

<div role="alert" aria-live="polite">
  重要通知
</div>

<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  {/* 模态对话框 */}
</div>`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 颜色对比度 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">颜色对比度</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">WCAG AA 标准</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">正常文本</div>
                    <div className="text-xs text-muted-foreground">对比度 ≥ 4.5:1</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">大文本（18px+ 或 14px+ 粗体）</div>
                    <div className="text-xs text-muted-foreground">对比度 ≥ 3:1</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">工具检查</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>WebAIM Contrast Checker：在线对比度检查工具</li>
                  <li>Lighthouse：Chrome DevTools 内置检查</li>
                  <li>axe DevTools：浏览器扩展</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">不依赖颜色传达信息</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 错误：仅用颜色表示状态
<span className="text-red-500">错误</span>

// 正确：颜色 + 图标/文字
<span className="text-red-500 flex items-center gap-1">
  <AlertCircle />
  错误：请输入有效值
</span>`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 无障碍性测试 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">无障碍性测试</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">自动化测试工具</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">axe</div>
                    <div className="text-xs text-muted-foreground">npm install @axe-core/react</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">Lighthouse</div>
                    <div className="text-xs text-muted-foreground">Chrome DevTools</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">WAVE</div>
                    <div className="text-xs text-muted-foreground">浏览器扩展</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">手动测试流程</h4>
                <ol className="space-y-1 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>仅使用键盘导航整个应用</li>
                  <li>使用屏幕阅读器（NVDA、JAWS、VoiceOver）测试</li>
                  <li>检查颜色对比度</li>
                  <li>验证所有图片都有 alt 文本</li>
                  <li>测试表单错误提示</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">键盘测试清单</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>所有交互元素都可以通过 Tab 访问</li>
                  <li>焦点顺序逻辑合理</li>
                  <li>焦点可见（有焦点环）</li>
                  <li>模态框可以 Esc 关闭</li>
                  <li>菜单可以通过方向键导航</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: 性能优化 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="h-6 w-6 text-primary" />
            性能优化
          </h2>
          <p className="text-muted-foreground mb-6">
            性能直接影响用户体验。优化渲染性能、资源加载和运行时性能，确保应用快速响应。
          </p>

          {/* 渲染性能 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">渲染性能</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">React 渲染优化</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 memo 避免不必要的重渲染
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* 复杂渲染 */}</div>
})

// 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">虚拟滚动</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  对于大量列表，使用虚拟滚动只渲染可见项：
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 react-window 或 react-virtualized
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={50}
  width="100%"
>
  {Row}
</FixedSizeList>`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">代码分割</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 动态导入组件
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // 如果需要禁用 SSR
})

// 路由级别的代码分割（Next.js 自动处理）
// app/dashboard/page.tsx 会自动分割`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 资源优化 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">资源优化</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">图片优化</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// Next.js Image 组件自动优化
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // 首屏图片
  loading="lazy" // 非首屏图片
  placeholder="blur" // 模糊占位符
/>

// 支持 WebP、AVIF 等现代格式
// 自动生成响应式图片`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">字体优化</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 使用 next/font 优化字体
import { GeistSans } from 'next/font/google'

const geistSans = GeistSans({
  subsets: ['latin'],
  display: 'swap', // 字体加载策略
  preload: true,
})

// 字体子集化，只加载需要的字符`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">资源预加载</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`// 预连接第三方域名
<link rel="preconnect" href="https://fonts.googleapis.com" />

// 预加载关键资源
<link rel="preload" href="/fonts/geist.woff2" as="font" />

// 预获取下一页资源
<link rel="prefetch" href="/dashboard" />`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 运行时性能 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">运行时性能</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Bundle 大小优化</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>使用 <code className="px-1 py-0.5 rounded bg-secondary text-xs">bundle analyzer</code> 分析包大小</li>
                  <li>按需导入库（<code className="px-1 py-0.5 rounded bg-secondary text-xs">{'import { debounce } from \'lodash-es\''}</code>）</li>
                  <li>移除未使用的依赖</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Tree Shaking</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Next.js 和现代打包工具自动进行 Tree Shaking，移除未使用的代码。
                </p>
              </div>
            </div>
          </div>

          {/* 性能监控 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4">性能监控</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Core Web Vitals</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">LCP</div>
                    <div className="text-xs text-muted-foreground">最大内容绘制 &lt; 2.5s</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">FID</div>
                    <div className="text-xs text-muted-foreground">首次输入延迟 &lt; 100ms</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground mb-1">CLS</div>
                    <div className="text-xs text-muted-foreground">累积布局偏移 &lt; 0.1</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">性能分析工具</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                  <li>React DevTools Profiler：分析组件渲染性能</li>
                  <li>Lighthouse：Chrome DevTools 性能审计</li>
                  <li>Web Vitals Extension：实时监控 Core Web Vitals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: 实战示例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            实战示例
          </h2>
          <p className="text-muted-foreground mb-6">
            通过实际代码示例，学习如何构建高质量的 UI 组件和交互。
          </p>

          <Tabs defaultValue="form" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="form">表单组件</TabsTrigger>
              <TabsTrigger value="layout">布局示例</TabsTrigger>
              <TabsTrigger value="interaction">交互示例</TabsTrigger>
            </TabsList>

            {/* 表单组件 */}
            <TabsContent value="form" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">完整表单组件示例</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, '姓名至少 2 个字符'),
  email: z.string().email('无效的邮箱地址'),
  age: z.number().min(18, '年龄必须大于 18').max(100),
})

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await saveUser(values)
      toast.success('用户创建成功')
      form.reset()
    } catch (error) {
      toast.error('创建失败，请重试')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder="请输入姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '提交中...' : '提交'}
        </Button>
      </form>
    </Form>
  )
}`}</pre>
                </div>
              </div>
            </TabsContent>

            {/* 布局示例 */}
            <TabsContent value="layout" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">响应式导航栏</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-lg">Logo</div>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/">首页</a>
            <a href="/about">关于</a>
            <Button>登录</Button>
          </div>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="切换菜单"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* 移动端菜单 */}
        {isOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <a href="/" className="block py-2">首页</a>
            <a href="/about" className="block py-2">关于</a>
            <Button className="w-full">登录</Button>
          </div>
        )}
      </div>
    </nav>
  )
}`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">卡片网格布局</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`export function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  )
}`}</pre>
                </div>
              </div>
            </TabsContent>

            {/* 交互示例 */}
            <TabsContent value="interaction" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">无限滚动实现</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function InfiniteScroll({ fetchMore }) {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasMore) {
      fetchMore().then((newItems) => {
        setItems(prev => [...prev, ...newItems])
        if (newItems.length === 0) setHasMore(false)
      })
    }
  }, [inView, hasMore])

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
      {hasMore && <div ref={ref}>加载中...</div>}
    </div>
  )
}`}</pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
                理解设计系统基础，掌握 Design Tokens、主题系统和组件架构
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                熟练使用 Tailwind CSS 和 shadcn/ui，能够配置和自定义组件库
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握状态管理、表单处理和动画技巧，构建流畅的交互体验
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握响应式设计方法，使用移动优先策略和现代布局技术
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                理解可访问性标准（WCAG），能够实现键盘导航和屏幕阅读器支持
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                掌握性能优化技巧，包括渲染优化、资源加载和性能监控
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">7</span>
                能够构建完整的表单组件、响应式布局和交互式功能
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
