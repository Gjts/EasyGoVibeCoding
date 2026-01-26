import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Users, UserPlus, Settings, GitBranch, BookOpen, Heart, DollarSign, Shield, TrendingUp, Award } from "lucide-react"

const chapters = [
  { title: "团队篇概述", href: "/team" },
  { title: "为什么需要 AI 团队？", href: "/team/why" },
  { title: "团队组建与角色定义", href: "/team/roles" },
  { title: "工具选型与统一配置", href: "/team/tools" },
  { title: "工作流程与协作机制", href: "/team/workflow" },
  { title: "知识管理与沉淀", href: "/team/knowledge" },
  { title: "文化建设与学习型组织", href: "/team/culture" },
  { title: "成本管理与优化", href: "/team/cost" },
  { title: "安全与合规", href: "/team/security" },
  { title: "团队成长与职业发展", href: "/team/growth" },
  { title: "实战案例与最佳实践", href: "/team/cases" },
]

const topics = [
  { icon: UserPlus, title: "团队组建", desc: "角色定义、技能矩阵" },
  { icon: Settings, title: "工具选型", desc: "统一配置、使用规范" },
  { icon: GitBranch, title: "工作流程", desc: "协作机制、版本控制" },
  { icon: BookOpen, title: "知识管理", desc: "Skill 库、Patterns 库" },
  { icon: Heart, title: "文化建设", desc: "学习型组织、激励机制" },
  { icon: DollarSign, title: "成本管理", desc: "预算规划、成本优化" },
  { icon: Shield, title: "安全合规", desc: "数据保护、隐私安全" },
  { icon: TrendingUp, title: "团队成长", desc: "技能提升、职业发展" },
]

const roles = [
  { name: "AI 架构师", skills: "工具选型、架构设计、技术路线" },
  { name: "AI 工程师", skills: "开发、Skill 创建、工作流优化" },
  { name: "AI 产品经理", skills: "需求澄清、Spec 编写、场景设计" },
  { name: "AI 培训师", skills: "培训、知识沉淀、最佳实践推广" },
]

export default function TeamPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Users className="h-4 w-4" />
          团队篇 · 打造 AI 团队
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          从零打造 AI 团队
        </h1>
        <p className="text-lg text-muted-foreground">
          组建 AI 团队、建立工作流程、打造学习型组织，企业级 AI 团队建设指南。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["技术负责人", "团队 Leader", "HR", "CTO"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Topics Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">核心主题</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon
            return (
              <div key={topic.title} className="p-4 rounded-xl border border-border bg-card">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{topic.title}</h3>
                <p className="text-xs text-muted-foreground">{topic.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Roles */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">核心角色</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div key={role.name} className="p-4 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">{role.name}</h3>
              <p className="text-sm text-muted-foreground">{role.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["组建 AI 团队", "建立工作流程", "打造学习型组织"].map((goal) => (
            <div key={goal} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">{goal}</span>
            </div>
          ))}
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
