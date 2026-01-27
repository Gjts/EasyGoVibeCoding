import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Rocket, Clock, Target } from "lucide-react"

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

const milestones = [
  { hours: "0-20", title: "环境与基础", desc: "开发环境配置、代码运行原理" },
  { hours: "20-40", title: "AI 深度使用", desc: "大模型生态、Prompt 高级技巧" },
  { hours: "40-60", title: "文档驱动", desc: "PRD、Spec、WBS、DoD" },
  { hours: "60-80", title: "全栈开发", desc: "前端、后端、数据库" },
  { hours: "80-100", title: "生产就绪", desc: "测试、部署、运维" },
]

export default function AdvancedPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Rocket className="h-4 w-4" />
          进阶篇 · 从工具到架构
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          从工具到架构的 100 小时
        </h1>
        <p className="text-lg text-muted-foreground">
          深入了解 AI 编程工具原理和高级特性，掌握企业级实践与架构权衡思维。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想深入了解 AI 编程工具原理的开发者",
            "想掌握高级特性的进阶用户",
            "需要企业级实践经验的团队",
            "想建立架构权衡思维的技术人员",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["掌握核心技术", "企业级实践", "架构权衡思维"].map((goal) => (
            <div key={goal} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          学习路线图
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.hours} className="relative pl-12">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-primary font-medium">{milestone.hours} 小时</span>
                    <span className="text-foreground font-semibold">{milestone.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">章节目录</h2>
        <div className="space-y-3">
          {chapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.title}
              href={chapter.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-colors group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-medium text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-medium text-foreground">{chapter.title}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}
