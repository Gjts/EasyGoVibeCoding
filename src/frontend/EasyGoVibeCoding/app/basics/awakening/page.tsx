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
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          觉醒：为什么现在是编程最好的时代
        </h1>
        <p className="text-lg text-gray-700 font-medium">
          2025 年，Vibe Coding 成为 Collins 词典年度词汇。这标志着一个新时代的到来。
        </p>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            什么是 Vibe Coding？
          </h2>
          <div className="p-6 rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm mb-6 shadow-md">
            <blockquote className="text-lg text-gray-800 italic border-l-4 border-purple-500 pl-4">
              &ldquo;Vibe Coding 是一种编程方式，你完全沉浸于氛围之中，用自然语言描述你想要的东西，
              让 AI 帮你实现。&rdquo;
            </blockquote>
            <p className="text-sm text-gray-600 mt-2 font-medium">— Collins Dictionary, 2025</p>
          </div>
          <p className="text-gray-800 leading-relaxed font-medium">
            这不仅仅是一个流行词，它代表了编程方式的根本性转变。过去，你需要学习语法、
            记住 API、调试错误。现在，你只需要清晰地表达你的想法。
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            从码农到指挥官
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">过去的开发者</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">x</span>
                  <span>手动编写每一行代码</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">x</span>
                  <span>花大量时间调试语法错误</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">x</span>
                  <span>需要记住各种 API 和框架</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">x</span>
                  <span>重复性工作占据大部分时间</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">现在的开发者</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">+</span>
                  <span>用自然语言描述需求</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">+</span>
                  <span>AI 自动生成和调试代码</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">+</span>
                  <span>专注于架构和逻辑设计</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">+</span>
                  <span>效率提升 10 倍以上</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-purple-600" />
            AI 编程工具全景图
          </h2>
          <p className="text-gray-800 mb-6 font-medium">
            AI 编程工具主要分为三大类：IDE 类、网页编辑类、命令行类。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="p-4 rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{tool.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md">
                    {tool.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
            <p className="text-gray-900 font-semibold mb-4 text-lg">完成本章后，你将：</p>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold shadow-md">1</span>
                <span className="font-medium">理解 AI 编程的本质：你负责想法，AI 负责实现</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold shadow-md">2</span>
                <span className="font-medium">了解主流工具的定位和适用场景</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold shadow-md">3</span>
                <span className="font-medium">建立&ldquo;指挥官&rdquo;思维，准备好驾驭 AI 工具</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t-2 border-gray-200">
        <Button variant="ghost" asChild className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
          <Link href="/basics" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：序章
          </Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
          <Link href="/basics/mindset" className="flex items-center gap-2">
            下一章：心法
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
