import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Terminal, Layout, Zap, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序章：欢迎来到 AI 编程时代", href: "/basics" },
  { title: "觉醒：为什么现在是编程最好的时代", href: "/basics/awakening" },
  { title: "心法：像产品经理一样思考", href: "/basics/mindset" },
  { title: "技术原理：LLM 核心机制深度解析", href: "/basics/principles" },
  { title: "工具实战：IDE 类工具快速上手", href: "/basics/tools" },
  { title: "从 0 到 1 实战", href: "/basics/practice" },
  { title: "精进技能", href: "/basics/skills" },
]

const tools = [
  {
    name: "GitHub Copilot",
    icon: Zap,
    type: "代码补全",
    description: "快速的代码补全工具，像一个敏捷的快手",
    features: ["实时代码补全", "多语言支持", "VS Code 集成", "团队协作"],
    setup: "安装 VS Code 插件 → 登录 GitHub → 开始使用",
  },
  {
    name: "Cursor",
    icon: Layout,
    type: "AI-first IDE",
    description: "专为 AI 编程设计的 IDE，功能最全面",
    features: ["Skill 系统", "Agent 模式", "MCP 配置", "多文件编辑"],
    setup: "下载 Cursor → 导入 VS Code 设置 → 配置 API Key",
  },
  {
    name: "Windsurf",
    icon: Terminal,
    type: "Fast Context",
    description: "专注于大型代码库分析的 AI IDE",
    features: ["1M Token 上下文", "Cascade Agent", "快速索引", "语义搜索"],
    setup: "下载安装 → 打开项目 → 等待索引完成",
  },
]

export default function ToolsPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="工具实战"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          工具实战：IDE 类工具快速上手
        </h1>
        <p className="text-lg text-muted-foreground">
          三大主流 AI 编程工具的安装、配置与基本使用。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Tools Overview */}
        {tools.map((tool, index) => {
          const Icon = tool.icon
          return (
            <section key={tool.name}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{tool.name}</h2>
                  <p className="text-sm text-primary">{tool.type}</p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card mb-6">
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">核心功能</h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3">快速设置</h4>
                    <div className="p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
                      {tool.setup}
                    </div>
                  </div>
                </div>
              </div>

              {index < tools.length - 1 && <div className="border-b border-border" />}
            </section>
          )
        })}

        {/* Practice Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "安装 Cursor",
                steps: ["访问 cursor.sh 下载", "安装并打开", "导入 VS Code 配置（可选）", "尝试用自然语言生成代码"],
              },
              {
                title: "创建第一个 Skill",
                steps: ["打开 Cursor 设置", "进入 Rules for AI", "添加自定义规则", "测试规则效果"],
              },
              {
                title: "使用 Agent 模式",
                steps: ["按 Cmd/Ctrl + Shift + I", "输入自然语言需求", "观察 AI 分析和执行", "审查生成的代码"],
              },
            ].map((practice) => (
              <div key={practice.title} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">{practice.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {practice.steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                      {i < practice.steps.length - 1 && <span className="text-muted-foreground">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/basics/principles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：技术原理
          </Link>
        </Button>
        <Button asChild>
          <Link href="/basics/practice" className="flex items-center gap-2">
            下一章：从 0 到 1 实战
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
