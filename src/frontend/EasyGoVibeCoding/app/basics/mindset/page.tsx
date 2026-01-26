import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Target, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
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

export default function MindsetPage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="心法"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          心法：像产品经理一样思考
        </h1>
        <p className="text-lg text-muted-foreground">
          在 AI 编程时代，最重要的技能不是写代码，而是清晰地表达需求。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* MVP Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            MVP 思维：最小可行产品
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <p className="text-foreground mb-4">
              MVP（Minimum Viable Product）是指用最少的功能验证核心假设的产品版本。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">核心原则</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>- 先做能用的，再做好用的</li>
                  <li>- 功能够用就行，不追求完美</li>
                  <li>- 快速验证，快速迭代</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">常见陷阱</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>- 一开始就想做完美</li>
                  <li>- 功能越做越多</li>
                  <li>- 迟迟不上线</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Creep Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            不加功能的艺术
          </h2>
          <p className="text-muted-foreground mb-6">
            功能蔓延（Feature Creep）是项目失败的头号杀手。学会说&ldquo;不&rdquo;比学会说&ldquo;是&rdquo;更重要。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-destructive/50 bg-destructive/5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-destructive">x</span> 错误示范
              </h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                &ldquo;帮我做一个博客，要有评论、点赞、分享、会员系统、支付、推荐算法、
                多语言支持、暗黑模式、还有 AI 写作...&rdquo;
              </div>
            </div>
            <div className="p-6 rounded-xl border border-accent/50 bg-accent/5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-accent">+</span> 正确示范
              </h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                &ldquo;帮我做一个博客，核心功能是：发布文章、文章列表、文章详情。
                其他功能以后再加。&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* Spec Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Spec 驱动开发
          </h2>
          <p className="text-muted-foreground mb-6">
            Spec（Specification）是需求规格说明书。把需求写清楚，是成功的一半。
          </p>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">一份好的 Spec 包含：</h3>
            <div className="space-y-4">
              {[
                { title: "目标 (Goals)", desc: "这个功能要解决什么问题？" },
                { title: "非目标 (Non-Goals)", desc: "这个功能不做什么？" },
                { title: "验收标准 (Acceptance Criteria)", desc: "怎样才算完成？" },
                { title: "风险 (Risks)", desc: "可能遇到什么问题？" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">{item.title}</span>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Spec */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            实战练习：写一份 Spec
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap">
{`# 待办事项应用 Spec

## 目标
创建一个简单的待办事项应用，帮助用户管理日常任务。

## 非目标
- 不做多用户/登录系统
- 不做云同步
- 不做提醒通知

## 核心功能
1. 添加待办事项
2. 标记完成/未完成
3. 删除待办事项
4. 本地存储

## 验收标准
- [ ] 能输入文字添加新任务
- [ ] 点击任务可以切换完成状态
- [ ] 刷新页面数据不丢失

## 技术选型
- 前端：React + Tailwind CSS
- 存储：localStorage`}
            </pre>
          </div>
        </section>

        {/* GIGO Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Garbage In, Garbage Out
          </h2>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <p className="text-foreground text-lg font-medium mb-2">
              &ldquo;垃圾进，垃圾出&rdquo;
            </p>
            <p className="text-muted-foreground">
              AI 生成的代码质量，完全取决于你提供的需求质量。
              模糊的需求产出模糊的代码，精确的需求产出精确的代码。
            </p>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/basics/awakening" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：觉醒
          </Link>
        </Button>
        <Button asChild>
          <Link href="/basics/principles" className="flex items-center gap-2">
            下一章：技术原理
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
