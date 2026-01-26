import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, GitBranch, Search, Shield, AlertTriangle, CheckCircle2 } from "lucide-react"
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

export default function SkillsPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="精进技能"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          精进技能
        </h1>
        <p className="text-lg text-muted-foreground">
          版本控制、代码审查、安全意识，成为合格开发者的必备技能。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Git Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            版本控制与 Git 基础
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <p className="text-muted-foreground mb-6">
              Git 是代码版本管理的标准工具。即使使用 AI 编程，版本控制仍然是必须掌握的技能。
            </p>
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">核心命令</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { cmd: "git init", desc: "初始化仓库" },
                  { cmd: "git add .", desc: "添加所有文件" },
                  { cmd: "git commit -m", desc: "提交更改" },
                  { cmd: "git push", desc: "推送到远程" },
                  { cmd: "git pull", desc: "拉取更新" },
                  { cmd: "git branch", desc: "分支管理" },
                ].map((item) => (
                  <div key={item.cmd} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <code className="text-sm text-primary font-mono">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Code Review Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            代码审查与测试
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-muted-foreground mb-6">
              AI 生成的代码也需要审查。不要盲目信任，培养代码审查的习惯。
            </p>
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">代码审查清单</h3>
              <div className="space-y-2">
                {[
                  "代码逻辑是否正确",
                  "边界情况是否处理",
                  "错误处理是否完善",
                  "代码是否易于理解",
                  "是否有安全隐患",
                  "性能是否可接受",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            安全意识与最佳实践
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-medium text-foreground mb-4">敏感信息保护</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>- API Key 不要提交到代码库</li>
                <li>- 使用环境变量管理密钥</li>
                <li>- 敏感代码不要上传到云端 AI</li>
                <li>- 定期轮换密钥</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-medium text-foreground mb-4">常见安全问题</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>- SQL 注入</li>
                <li>- XSS 跨站脚本</li>
                <li>- CSRF 跨站请求伪造</li>
                <li>- 不安全的依赖</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            常见陷阱与避免方法
          </h2>
          <div className="space-y-4">
            {[
              {
                trap: "过度依赖 AI",
                avoid: "理解代码原理，不要只是复制粘贴",
              },
              {
                trap: "忽视错误处理",
                avoid: "AI 生成的代码可能缺少错误处理，需要补充",
              },
              {
                trap: "盲目信任输出",
                avoid: "AI 可能生成过时或错误的代码，需要验证",
              },
              {
                trap: "忘记版本控制",
                avoid: "每次重要更改都要提交，方便回滚",
              },
            ].map((item) => (
              <div key={item.trap} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-destructive font-medium">陷阱：</span>
                    <span className="text-foreground ml-1">{item.trap}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-accent font-medium">避免：</span>
                    <span className="text-muted-foreground ml-1">{item.avoid}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completion */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">恭喜完成基础篇!</h3>
            <p className="text-muted-foreground mb-6">
              你已经掌握了 AI 编程的基础知识。接下来可以进入进阶篇，深入学习更多高级技巧。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/advanced">进入进阶篇</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tools">探索工具篇</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/basics/practice" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：从 0 到 1 实战
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced">
            进入进阶篇
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
