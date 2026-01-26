import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles, Code, Zap, Users } from "lucide-react"
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
  { name: "GitHub Copilot", type: "IDE 插件", description: "代码补全的快手" },
  { name: "Cursor", type: "AI-first IDE", description: "Skill/Agent/MCP 全支持" },
  { name: "Windsurf", type: "IDE", description: "Fast Context 技术" },
  { name: "Claude Code", type: "命令行", description: "终端集成 AI 助手" },
  { name: "v0", type: "网页编辑", description: "自然语言生成 UI" },
  { name: "bolt.new", type: "网页编辑", description: "浏览器内全栈开发" },
]

export default function AwakeningPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="觉醒"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          觉醒：为什么现在是编程最好的时代
        </h1>
        <p className="text-lg text-muted-foreground">
          2025 年，Vibe Coding 成为 Collins 词典年度词汇。这标志着一个新时代的到来。
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            什么是 Vibe Coding？
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4">
              &ldquo;Vibe Coding 是一种编程方式，你完全沉浸于氛围之中，用自然语言描述你想要的东西，
              让 AI 帮你实现。&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">— Collins Dictionary, 2025</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            这不仅仅是一个流行词，它代表了编程方式的根本性转变。过去，你需要学习语法、
            记住 API、调试错误。现在，你只需要清晰地表达你的想法。
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            从码农到指挥官
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">过去的开发者</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">x</span>
                  手动编写每一行代码
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">x</span>
                  花大量时间调试语法错误
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">x</span>
                  需要记住各种 API 和框架
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">x</span>
                  重复性工作占据大部分时间
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">现在的开发者</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  用自然语言描述需求
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  AI 自动生成和调试代码
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  专注于架构和逻辑设计
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">+</span>
                  效率提升 10 倍以上
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            AI 编程工具全景图
          </h2>
          <p className="text-muted-foreground mb-6">
            AI 编程工具主要分为三大类：IDE 类、网页编辑类、命令行类。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{tool.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {tool.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                理解 AI 编程的本质：你负责想法，AI 负责实现
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                了解主流工具的定位和适用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                建立&ldquo;指挥官&rdquo;思维，准备好驾驭 AI 工具
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border">
        <Button variant="ghost" asChild>
          <Link href="/basics" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：序章
          </Link>
        </Button>
        <Button asChild>
          <Link href="/basics/mindset" className="flex items-center gap-2">
            下一章：心法
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
