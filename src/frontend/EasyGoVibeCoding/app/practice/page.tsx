import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Code, GraduationCap, Briefcase, Lightbulb, BookOpen, Wrench } from "lucide-react"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

const projectCategories = [
  {
    title: "文科生 / 商科生项目",
    icon: GraduationCap,
    description: "适合零基础用户的入门项目",
    projects: [
      { name: "个人博客网站", tools: "v0 + Cursor + Vercel" },
      { name: "数据分析仪表板", tools: "Fabric + Cursor" },
    ],
    href: "/practice/humanities",
  },
  {
    title: "理工科学生项目",
    icon: Code,
    description: "适合有编程基础的用户",
    projects: [
      { name: "API 服务开发", tools: "Cursor + Copilot" },
      { name: "全栈应用开发", tools: "bolt.new + Cursor" },
    ],
    href: "/practice/engineering",
  },
  {
    title: "职场人士项目",
    icon: Briefcase,
    description: "适合需要提升工作效率的职场人",
    projects: [
      { name: "内部工具开发", tools: "Spec + Cursor + Skill" },
      { name: "遗留系统重构", tools: "Windsurf + Cursor Agent" },
    ],
    href: "/practice/professional",
  },
]

const coreSkills = [
  {
    title: "AI Agent 开发",
    icon: Lightbulb,
    topics: ["Agent 设计原则", "多 Agent 编排", "事件驱动"],
    href: "/practice/agent",
  },
  {
    title: "全栈项目实战",
    icon: BookOpen,
    topics: ["从需求到交付", "Spec → WBS → DoD", "完整流程"],
    href: "/practice/fullstack",
  },
  {
    title: "工具与效率",
    icon: Wrench,
    topics: ["工作流设计", "自动化脚本", "工具链集成"],
    href: "/practice/efficiency",
  },
]

export default function PracticePage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Code className="h-4 w-4" />
          实践篇 · 项目实战
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          项目实战
        </h1>
        <p className="text-lg text-muted-foreground">
          通过真实项目掌握 AI 编程工具，积累从需求到交付的完整实战经验。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想通过实际项目掌握 AI 编程工具的开发者",
            "需要完整项目经验的学习者",
            "想提升工作效率的职场人士",
            "想积累实战经验的技术人员",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Project Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">项目分类</h2>
        <div className="space-y-6">
          {projectCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                href={category.href}
                className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <div className="space-y-2">
                      {category.projects.map((project) => (
                        <div key={project.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <span className="text-sm text-foreground">{project.name}</span>
                          <span className="text-xs text-muted-foreground">{project.tools}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Core Skills */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">核心技能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreSkills.map((skill) => {
            const Icon = skill.icon
            return (
              <Link
                key={skill.title}
                href={skill.href}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{skill.title}</h3>
                </div>
                <ul className="space-y-1">
                  {skill.topics.map((topic) => (
                    <li key={topic} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
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
