import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Code, Layout, FileText } from "lucide-react"
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

const projects = [
  {
    title: "项目 1：用 Cursor 创建一个简单的 API 接口",
    icon: Code,
    difficulty: "入门",
    time: "30 分钟",
    description: "使用 Cursor 创建一个简单的 RESTful API，实现基本的 CRUD 操作。",
    steps: [
      "打开 Cursor，创建新项目",
      "用自然语言描述：创建一个 Node.js Express API",
      "添加路由：GET /users, POST /users",
      "测试 API 是否正常工作",
    ],
    skills: ["Node.js", "Express", "RESTful API", "Cursor Agent"],
  },
  {
    title: "项目 2：用 v0 生成一个登录页面",
    icon: Layout,
    difficulty: "入门",
    time: "15 分钟",
    description: "使用 v0 通过自然语言生成一个美观的登录页面。",
    steps: [
      "访问 v0.dev",
      "描述：创建一个现代风格的登录页面，包含邮箱和密码输入框",
      "调整生成的设计",
      "导出代码到本地项目",
    ],
    skills: ["v0", "React", "Tailwind CSS", "UI 设计"],
  },
  {
    title: "项目 3：用 Fabric 整理每日工作摘要",
    icon: FileText,
    difficulty: "入门",
    time: "20 分钟",
    description: "使用 Fabric 的 Pattern 自动整理和总结每日工作内容。",
    steps: [
      "安装并配置 Fabric",
      "使用 summarize Pattern",
      "输入今日工作内容",
      "获得结构化的工作摘要",
    ],
    skills: ["Fabric", "命令行", "Patterns", "工作效率"],
  },
]

export default function PracticePage() {
  return (
    <CourseLayout
      title="基础篇"
      description="零基础入门 AI 编程"
      chapters={chapters}
      currentChapter="从 0 到 1 实战"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          从 0 到 1 实战
        </h1>
        <p className="text-lg text-muted-foreground">
          通过三个实战项目，体验 AI 编程的完整流程。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <section key={project.title} className="p-6 rounded-xl border border-border bg-card">
              {/* Project Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shrink-0">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-1">{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {project.difficulty}
                    </span>
                    <span className="text-muted-foreground">{project.time}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{project.description}</p>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-4">实现步骤</h3>
                <div className="space-y-3">
                  {project.steps.map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-medium text-foreground mb-3">涉及技能</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* Tips */}
        <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
          <h3 className="font-semibold text-foreground mb-4">实战技巧</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              从简单开始，不要一开始就追求复杂功能
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              遇到问题先自己思考，再问 AI
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              理解 AI 生成的代码，不要盲目复制粘贴
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              多尝试不同的提问方式，找到最适合的表达
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/basics/tools" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：工具实战
          </Link>
        </Button>
        <Button asChild>
          <Link href="/basics/skills" className="flex items-center gap-2">
            下一章：精进技能
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
