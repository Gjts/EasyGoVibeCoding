import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Box, Eye, MessageSquare } from "lucide-react"
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

export default function PrinciplesPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="技术原理"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          技术原理：LLM 核心机制深度解析
        </h1>
        <p className="text-lg text-muted-foreground">
          理解 AI 如何&ldquo;思考&rdquo;，才能更好地与它协作。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Token Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Box className="h-6 w-6 text-primary" />
            Token：AI 眼中的世界
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <p className="text-foreground mb-4">
              Token 是 AI 处理文本的基本单位。一个 Token 大约是 4 个英文字符或 1-2 个中文字。
            </p>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm mb-4">
              <p className="text-muted-foreground mb-2">示例：</p>
              <p className="text-foreground">&ldquo;Hello World&rdquo; = [&ldquo;Hello&rdquo;, &ldquo; World&rdquo;] = 2 tokens</p>
              <p className="text-foreground">&ldquo;你好世界&rdquo; = [&ldquo;你好&rdquo;, &ldquo;世界&rdquo;] = 2 tokens</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-4">Context Window（上下文窗口）</h3>
          <p className="text-muted-foreground mb-4">
            Context Window 是 AI 一次能&ldquo;看到&rdquo;的文本量。可以把它想象成 AI 的&ldquo;工作记忆&rdquo;。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { model: "GPT-3.5", tokens: "4K", analogy: "一篇短文" },
              { model: "GPT-4", tokens: "128K", analogy: "一本小说" },
              { model: "Claude 3", tokens: "200K", analogy: "几本书" },
            ].map((item) => (
              <div key={item.model} className="p-4 rounded-xl border border-border bg-card text-center">
                <div className="font-semibold text-foreground mb-1">{item.model}</div>
                <div className="text-2xl font-bold text-primary mb-1">{item.tokens}</div>
                <div className="text-sm text-muted-foreground">{item.analogy}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Attention Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            Attention：AI 如何&ldquo;关注&rdquo;重点
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">荧光笔理论</h3>
            <p className="text-muted-foreground mb-4">
              想象你在读一篇文章，用荧光笔标记重点。Attention 机制就是 AI 的&ldquo;荧光笔&rdquo;，
              它会自动找出文本中最相关的部分。
            </p>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-2">例如，当 AI 处理这句话：</p>
              <p className="text-foreground">&ldquo;The <span className="bg-primary/30 px-1 rounded">cat</span> sat on the mat because <span className="bg-primary/30 px-1 rounded">it</span> was tired.&rdquo;</p>
              <p className="text-sm text-muted-foreground mt-2">AI 会关注到 &ldquo;it&rdquo; 指的是 &ldquo;cat&rdquo;</p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-2">实战意义</h3>
            <p className="text-muted-foreground">
              好的命名让 AI 更容易理解你的代码。<code className="bg-secondary px-1 rounded">userProfile</code> 比 <code className="bg-secondary px-1 rounded">data1</code> 更有意义，
              AI 会更好地理解上下文。
            </p>
          </div>
        </section>

        {/* Prompt Engineering Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Prompt 工程
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-4">RTCC 框架</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { letter: "R", title: "Role（角色）", desc: "你是一个资深前端工程师..." },
              { letter: "T", title: "Task（任务）", desc: "帮我创建一个登录表单..." },
              { letter: "C", title: "Context（上下文）", desc: "使用 React 和 Tailwind..." },
              { letter: "C", title: "Constraint（约束）", desc: "不要使用第三方 UI 库..." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                    {item.letter}
                  </span>
                  <span className="font-medium text-foreground">{item.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-4">Chain of Thought（CoT）</h3>
          <div className="p-6 rounded-xl border border-border bg-card mb-8">
            <p className="text-muted-foreground mb-4">
              让 AI &ldquo;慢下来想&rdquo;，一步一步推理，而不是直接给出答案。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-2">普通提问：</p>
                <p className="text-foreground font-mono text-sm">&ldquo;9.11 和 9.8 哪个大？&rdquo;</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-sm text-muted-foreground mb-2">CoT 提问：</p>
                <p className="text-foreground font-mono text-sm">&ldquo;9.11 和 9.8 哪个大？请一步一步思考。&rdquo;</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-4">Few-Shot Learning</h3>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-muted-foreground mb-4">
              通过给 AI 几个例子，教它学习你想要的风格和格式。
            </p>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
              <pre className="text-muted-foreground whitespace-pre-wrap">
{`输入：apple
输出：苹果

输入：banana  
输出：香蕉

输入：orange
输出：`}
              </pre>
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-2">Prompt vs Context</h3>
            <p className="text-muted-foreground">
              很多人过度关注 Prompt 技巧，却忽略了 Context 的重要性。
              给 AI 提供足够的上下文（代码、文档、示例），比精心设计的 Prompt 更有效。
            </p>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/basics/mindset" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：心法
          </Link>
        </Button>
        <Button asChild>
          <Link href="/basics/tools" className="flex items-center gap-2">
            下一章：工具实战
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
