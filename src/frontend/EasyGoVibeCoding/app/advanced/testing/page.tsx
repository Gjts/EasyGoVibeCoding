import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TestTube, RefreshCw, Wrench, Shield, Zap, Sparkles, Brain, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
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
          第 9 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          测试与质量
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握如何利用 AI 提升测试效率和质量，学习 AI 辅助测试用例生成、测试代码编写、测试优化等最佳实践。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 - 结构化思考方法 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              使用 Sequential Thinking 学习 AI 驱动的测试
            </p>
            <p className="text-muted-foreground mb-4">
              AI 在测试中的应用涉及多个层面，使用<strong className="text-foreground">结构化思考方法</strong>可以帮助你系统掌握：
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "测试类型概览", desc: "单元测试、集成测试、E2E 测试快速了解" },
                { step: "2", title: "AI 辅助测试用例生成", desc: "单元测试、集成测试、E2E 测试用例生成" },
                { step: "3", title: "AI 辅助测试代码编写", desc: "测试框架使用、Mock 数据生成、测试数据准备" },
                { step: "4", title: "AI 辅助测试优化", desc: "性能优化、覆盖率分析、测试重构" },
                { step: "5", title: "AI 驱动的测试自动化", desc: "CI/CD 集成、测试报告生成、缺陷预测" },
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

        {/* Section 1: 测试类型概览 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TestTube className="h-6 w-6 text-primary" />
            测试类型概览
          </h2>
          <p className="text-muted-foreground mb-6">
            快速了解测试类型，为 AI 实践提供背景知识。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">单元测试</h3>
              <p className="text-sm text-muted-foreground">
                测试单个函数或组件，快速反馈，覆盖率高。
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">集成测试</h3>
              <p className="text-sm text-muted-foreground">
                测试多个模块协作，验证接口和数据流。
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">E2E 测试</h3>
              <p className="text-sm text-muted-foreground">
                端到端测试，模拟真实用户操作。
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">性能测试</h3>
              <p className="text-sm text-muted-foreground">
                测试系统性能和负载能力。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: AI 在测试中的最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI 在测试中的最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            利用 AI 提升测试效率和质量，从测试用例生成到测试自动化的全流程 AI 辅助实践。
          </p>

          <Tabs defaultValue="test-cases" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
              <TabsTrigger value="test-cases">测试用例生成</TabsTrigger>
              <TabsTrigger value="test-code">测试代码编写</TabsTrigger>
              <TabsTrigger value="optimization">测试优化</TabsTrigger>
              <TabsTrigger value="coverage">覆盖率分析</TabsTrigger>
              <TabsTrigger value="automation">测试自动化</TabsTrigger>
              <TabsTrigger value="tdd">TDD 实践</TabsTrigger>
            </TabsList>

            {/* AI 辅助测试用例生成 */}
            <TabsContent value="test-cases" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助测试用例生成</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">使用 AI 生成单元测试用例</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      向 AI 描述函数功能，让它生成完整的测试用例：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为以下函数生成单元测试用例：

// utils/calculateTotal.ts
export function calculateTotal(items: Item[]): number {
  if (!items || items.length === 0) return 0
  return items.reduce((sum, item) => {
    if (item.price && item.quantity) {
      return sum + item.price * item.quantity
    }
    return sum
  }, 0)
}

interface Item {
  price?: number
  quantity?: number
}

请使用 Jest/Vitest 生成测试用例，包含：
- 正常情况测试
- 边界情况测试（空数组、null、undefined）
- 异常情况测试（缺少 price 或 quantity）
- 使用 describe 和 it 组织测试
- 使用清晰的测试描述`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的测试用例示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// utils/calculateTotal.test.ts
import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('should return 0 for null or undefined', () => {
    expect(calculateTotal(null as any)).toBe(0)
    expect(calculateTotal(undefined as any)).toBe(0)
  })

  it('should calculate total for valid items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ]
    expect(calculateTotal(items)).toBe(35) // 10*2 + 5*3 = 35
  })

  it('should ignore items without price', () => {
    const items = [
      { price: 10, quantity: 2 },
      { quantity: 3 }
    ]
    expect(calculateTotal(items)).toBe(20)
  })

  it('should ignore items without quantity', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5 }
    ]
    expect(calculateTotal(items)).toBe(20)
  })

  it('should handle zero price or quantity', () => {
    const items = [
      { price: 0, quantity: 2 },
      { price: 10, quantity: 0 }
    ]
    expect(calculateTotal(items)).toBe(0)
  })
})`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成集成测试场景</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为用户注册 API 生成集成测试场景：

API: POST /api/users/register
请求体: { email, password, name }
响应: { id, email, name, createdAt }

请生成测试用例，包含：
- 成功注册场景
- 邮箱已存在场景
- 密码强度不足场景
- 缺少必填字段场景
- 使用测试数据库
- 清理测试数据`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成 E2E 测试流程</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为购物车流程生成 E2E 测试：

用户流程：
1. 访问首页
2. 搜索商品
3. 添加商品到购物车
4. 查看购物车
5. 结算
6. 填写订单信息
7. 提交订单

请使用 Playwright 生成完整的 E2E 测试代码，包含：
- 页面导航
- 元素定位
- 用户交互
- 断言验证
- 错误处理`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助测试代码编写 */}
            <TabsContent value="test-code" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助测试代码编写</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成测试代码</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成符合测试框架语法的测试代码：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为 React 组件生成测试代码：

// components/Button.tsx
export function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 rounded"
    >
      {children}
    </button>
  )
}

请使用 React Testing Library 和 Vitest 生成测试代码，包含：
- 渲染测试
- 点击事件测试
- disabled 状态测试
- 可访问性测试（ARIA 属性）
- 快照测试`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成 Mock 数据和 Stub</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要 Mock 一个 API 调用函数：

// services/userService.ts
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}

请生成：
- Mock fetch 函数
- Mock 响应数据
- 错误情况 Mock
- 使用 Vitest 的 vi.mock`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助测试数据准备</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为测试准备用户数据，包含：
- 10 个正常用户
- 5 个管理员用户
- 3 个已删除用户

请生成：
- 使用工厂函数生成测试数据
- 使用 faker.js 或类似库生成随机数据
- 包含所有必要字段
- TypeScript 类型定义`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助测试优化 */}
            <TabsContent value="optimization" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助测试优化</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 分析测试性能瓶颈</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将测试执行结果提供给 AI，让它分析性能问题：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我的测试套件执行很慢，分析结果：
- 总测试数：150
- 总执行时间：45 秒
- 最慢的 5 个测试：
  1. UserService.test.ts - 8 秒
  2. OrderService.test.ts - 6 秒
  3. PaymentService.test.ts - 5 秒
  4. EmailService.test.ts - 4 秒
  5. NotificationService.test.ts - 3 秒

请分析：
1. 性能瓶颈在哪里？
2. 哪些测试可以优化？
3. 如何减少测试执行时间？
4. 提供具体的优化方案`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 优化测试执行速度</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`优化建议：

1. 使用并行执行：vitest --threads
2. 优化慢测试：
   - 使用 Mock 替代真实 API 调用
   - 使用内存数据库替代真实数据库
   - 减少不必要的等待时间
3. 使用测试分组：describe.skip 跳过非关键测试
4. 使用快照测试替代重复的渲染测试

// 优化示例：使用 Mock
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1', name: 'Test' })
}))`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助测试重构</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

以下测试代码有重复，请重构：

[粘贴重复的测试代码]

请：
1. 提取公共的测试逻辑
2. 使用 beforeEach/afterEach 设置和清理
3. 使用测试工厂函数
4. 保持测试可读性`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助覆盖率分析 */}
            <TabsContent value="coverage" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助覆盖率分析</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 分析测试覆盖率报告</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将覆盖率报告提供给 AI，让它分析未覆盖的代码：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我的测试覆盖率报告显示：
- 语句覆盖率：65%
- 分支覆盖率：58%
- 函数覆盖率：72%
- 行覆盖率：68%

未覆盖的文件：
- utils/validation.ts: 45%
- services/payment.ts: 52%
- components/ErrorBoundary.tsx: 30%

请分析：
1. 哪些代码路径未覆盖？
2. 为什么这些代码未覆盖？
3. 如何补充测试用例提高覆盖率？
4. 提供具体的测试用例建议`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 识别未覆盖的代码路径</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`分析结果：

未覆盖的代码路径：
1. utils/validation.ts:45%
   - validateEmail 函数的错误处理分支未测试
   - validatePassword 的边界情况未测试
   
2. services/payment.ts:52%
   - 支付失败的回滚逻辑未测试
   - 网络错误的处理未测试
   
3. components/ErrorBoundary.tsx:30%
   - 错误边界组件的错误恢复未测试
   - 错误日志记录未测试

建议补充的测试用例：
[AI 生成的测试用例代码]`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成补充测试用例建议</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下未覆盖的代码，生成测试用例：

// utils/validation.ts
export function validateEmail(email: string): boolean {
  if (!email) return false
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return regex.test(email)
}

当前覆盖率：60%（只测试了正常情况）

请生成补充测试用例，覆盖所有分支。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 驱动的测试自动化 */}
            <TabsContent value="automation" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 驱动的测试自动化</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成 CI/CD 测试配置</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成 CI/CD 测试配置，包括 GitHub Actions、GitLab CI：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为 Next.js 项目配置 GitHub Actions 测试流程：

项目信息：
- 使用 Vitest 进行单元测试
- 使用 Playwright 进行 E2E 测试
- Node.js 18
- 需要测试覆盖率报告
- 需要并行执行测试

请生成：
- .github/workflows/test.yml
- 包含测试、覆盖率、报告上传
- 支持缓存加速
- 测试失败时阻止合并`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 CI/CD 配置示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      
      - run: pnpm test:unit --coverage
      
      - run: pnpm test:e2e
      
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 分析测试报告</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

分析以下测试报告：

测试结果：
- 总测试数：200
- 通过：185
- 失败：15
- 跳过：0

失败的测试：
1. UserService.test.ts - 5 个失败
2. OrderService.test.ts - 3 个失败
3. PaymentService.test.ts - 7 个失败

错误信息：
[粘贴错误信息]

请分析：
1. 失败的根本原因是什么？
2. 这些失败是否相关？
3. 如何修复这些测试？
4. 提供修复建议`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 预测测试失败原因</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下代码变更，预测哪些测试可能会失败：

代码变更：
- 修改了 UserService.getUser 方法的返回格式
- 添加了新的验证逻辑
- 移除了 deprecated 方法

请：
1. 列出可能受影响的测试文件
2. 预测测试失败的原因
3. 提供测试更新建议`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助 TDD 实践 */}
            <TabsContent value="tdd" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助 TDD 实践</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成测试用例（Given-When-Then）</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 根据需求生成 Given-When-Then 格式的测试用例：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要实现一个购物车功能，使用 TDD 方法。

需求：
- 用户可以添加商品到购物车
- 用户可以更新商品数量
- 用户可以移除商品
- 系统自动计算总价

请为每个功能生成 Given-When-Then 格式的测试用例，然后转换为 Jest/Vitest 测试代码。`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 TDD 测试用例示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// cart.test.ts (Red 阶段)
describe('Cart', () => {
  describe('addItem', () => {
    it('should add item to empty cart', () => {
      // Given: 一个空的购物车
      const cart = new Cart()
      
      // When: 添加一个商品
      cart.addItem({ id: '1', name: 'Product', price: 10 })
      
      // Then: 购物车应该包含这个商品
      expect(cart.items).toHaveLength(1)
      expect(cart.items[0].id).toBe('1')
    })
    
    it('should increment quantity when adding same item', () => {
      // Given: 购物车中已有一个商品
      const cart = new Cart()
      cart.addItem({ id: '1', name: 'Product', price: 10 })
      
      // When: 再次添加相同商品
      cart.addItem({ id: '1', name: 'Product', price: 10 })
      
      // Then: 商品数量应该增加
      expect(cart.items[0].quantity).toBe(2)
    })
  })
  
  describe('calculateTotal', () => {
    it('should calculate total price', () => {
      // Given: 购物车中有多个商品
      const cart = new Cart()
      cart.addItem({ id: '1', price: 10, quantity: 2 })
      cart.addItem({ id: '2', price: 5, quantity: 3 })
      
      // When: 计算总价
      const total = cart.calculateTotal()
      
      // Then: 应该返回正确的总价
      expect(total).toBe(35) // 10*2 + 5*3
    })
  })
})`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成最小实现代码</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下测试用例，生成最小实现代码（Green 阶段）：

[粘贴测试用例]

要求：
- 只实现让测试通过的最小代码
- 不要过度设计
- 使用 TypeScript`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 提供重构建议</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

以下代码已经通过测试，请提供重构建议（Refactor 阶段）：

[粘贴实现代码]

请：
1. 识别代码异味
2. 提供重构建议
3. 保持测试通过
4. 提高代码可读性和可维护性`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 3: TDD 实践基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            TDD 实践基础
          </h2>
          <p className="text-muted-foreground mb-6">
            保留核心概念，重点展示 AI 如何辅助 TDD。使用 AI 可以快速生成测试用例、实现代码和重构建议。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">红（Red）</h3>
              <p className="text-sm text-muted-foreground">
                编写失败的测试，定义期望行为
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">绿（Green）</h3>
              <p className="text-sm text-muted-foreground">
                编写最小实现，让测试通过
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">重构（Refactor）</h3>
              <p className="text-sm text-muted-foreground">
                优化代码，保持测试通过
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助 TDD</h3>
            <p className="text-sm text-muted-foreground mb-2">
              AI 可以在 TDD 的每个阶段提供帮助：生成测试用例、快速实现、重构建议。参考上面的"AI 辅助 TDD 实践"章节查看详细示例和 Prompt 模板。
            </p>
          </div>
        </section>

        {/* Section 4: 测试工具基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            测试工具基础
          </h2>
          <p className="text-muted-foreground mb-6">
            保留核心工具介绍，重点展示 AI 如何辅助工具选择。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Jest</h3>
              <p className="text-sm text-muted-foreground">
                JavaScript 测试框架，内置断言和 Mock
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Vitest</h3>
              <p className="text-sm text-muted-foreground">
                快速测试框架，Vite 原生支持，TypeScript 友好
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Playwright</h3>
              <p className="text-sm text-muted-foreground">
                E2E 测试框架，多浏览器支持
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助工具选型</h3>
            <p className="text-sm text-muted-foreground mb-2">
              使用 AI 根据项目需求选择合适的测试工具。向 AI 描述项目特点（Next.js、TypeScript、需要 E2E 测试等），它会推荐合适的工具组合和配置方案。
            </p>
          </div>
        </section>

        {/* Section 5: 质量保证基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            质量保证基础
          </h2>
          <p className="text-muted-foreground mb-6">
            保留核心概念，重点展示 AI 如何辅助质量保证。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">测试策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>测试金字塔</strong>：大量单元测试 + 适量集成测试 + 少量 E2E 测试</li>
                <li>• <strong>关键路径优先</strong>：优先测试核心业务逻辑</li>
                <li>• <strong>边界测试</strong>：测试边界条件和异常情况</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">代码覆盖率</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>行覆盖率</strong>：执行的代码行数比例</li>
                <li>• <strong>分支覆盖率</strong>：执行的代码分支比例</li>
                <li>• <strong>目标</strong>：关键代码 80%+，整体 60%+</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助质量保证</h3>
            <p className="text-sm text-muted-foreground mb-2">
              AI 可以分析测试策略、生成质量报告、识别未覆盖的代码路径。参考上面的"AI 辅助覆盖率分析"和"AI 驱动的测试自动化"章节查看详细示例和 Prompt 模板。
            </p>
          </div>
        </section>

        {/* Section 6: 实战示例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            实战示例
          </h2>
          <p className="text-muted-foreground mb-6">
            通过实际代码示例，学习如何使用 AI 提升测试效率和质量。
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 生成测试用例</h3>
              <p className="text-sm text-muted-foreground mb-4">
                完整的测试用例生成示例（Prompt + 结果）：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`// 1. 向 AI 提供需求
Prompt: "为 calculateTotal 函数生成单元测试，包含正常情况、边界情况、异常情况..."

// 2. AI 生成的测试用例
describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
  
  it('should calculate total for valid items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ]
    expect(calculateTotal(items)).toBe(35)
  })
  
  // ... 更多测试用例
})`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 优化测试代码</h3>
              <p className="text-sm text-muted-foreground mb-4">
                测试代码优化示例（优化前后对比）：
              </p>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">优化前（45 秒）</div>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// 每个测试都调用真实 API
describe('UserService', () => {
  it('should fetch user', async () => {
    const user = await fetchUser('1') // 真实 API 调用
    expect(user.id).toBe('1')
  })
  
  it('should update user', async () => {
    const user = await fetchUser('1') // 重复调用
    await updateUser('1', { name: 'New' })
    expect(user.name).toBe('New')
  })
})`}</pre>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">AI 优化后（5 秒）</div>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// AI 建议：使用 Mock 替代真实 API
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
  updateUser: vi.fn().mockResolvedValue({ id: '1', name: 'New' })
}))

describe('UserService', () => {
  it('should fetch user', async () => {
    const user = await fetchUser('1')
    expect(user.id).toBe('1')
  })
  
  it('should update user', async () => {
    await updateUser('1', { name: 'New' })
    expect(updateUser).toHaveBeenCalledWith('1', { name: 'New' })
  })
})`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 分析覆盖率</h3>
              <p className="text-sm text-muted-foreground mb-4">
                覆盖率分析和补充建议示例：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`// AI 分析覆盖率报告
覆盖率：65%

未覆盖的代码：
- utils/validation.ts:45%
  - validateEmail 的错误处理分支未测试
  - validatePassword 的边界情况未测试

AI 建议补充的测试用例：
it('should return false for invalid email', () => {
  expect(validateEmail('invalid')).toBe(false)
  expect(validateEmail('invalid@')).toBe(false)
  expect(validateEmail('@domain.com')).toBe(false)
})`}</pre>
              </div>
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
                了解测试类型概览（单元测试、集成测试、E2E 测试、性能测试）及其适用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握使用 AI 生成测试用例的方法（单元测试、集成测试、E2E 测试用例生成）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够使用 AI 辅助测试代码编写（测试框架语法、Mock 数据生成、测试数据准备）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够使用 AI 分析和优化测试性能（性能瓶颈分析、测试执行速度优化、测试重构）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                掌握 AI 辅助覆盖率分析的方法（覆盖率报告分析、未覆盖代码路径识别、补充测试用例建议）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                能够使用 AI 驱动的测试自动化（CI/CD 配置生成、测试报告分析、测试失败原因预测）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">7</span>
                掌握 AI 辅助 TDD 实践（测试用例生成、最小实现代码生成、重构建议）
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
