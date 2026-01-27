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
  { icon: UserPlus, title: "团队组建", desc: "角色定义、技能矩阵", gradient: "from-blue-400 to-cyan-400" },
  { icon: Settings, title: "工具选型", desc: "统一配置、使用规范", gradient: "from-purple-400 to-pink-400" },
  { icon: GitBranch, title: "工作流程", desc: "协作机制、版本控制", gradient: "from-orange-400 to-amber-400" },
  { icon: BookOpen, title: "知识管理", desc: "Skill 库、Patterns 库", gradient: "from-green-400 to-emerald-400" },
  { icon: Heart, title: "文化建设", desc: "学习型组织、激励机制", gradient: "from-red-400 to-rose-400" },
  { icon: DollarSign, title: "成本管理", desc: "预算规划、成本优化", gradient: "from-yellow-400 to-orange-400" },
  { icon: Shield, title: "安全合规", desc: "数据保护、隐私安全", gradient: "from-indigo-400 to-purple-400" },
  { icon: TrendingUp, title: "团队成长", desc: "技能提升、职业发展", gradient: "from-pink-400 to-purple-400" },
]

const roles = [
  { name: "AI 架构师", skills: "工具选型、架构设计、技术路线", gradient: "from-blue-400 to-cyan-400" },
  { name: "AI 工程师", skills: "开发、Skill 创建、工作流优化", gradient: "from-purple-400 to-pink-400" },
  { name: "AI 产品经理", skills: "需求澄清、Spec 编写、场景设计", gradient: "from-orange-400 to-amber-400" },
  { name: "AI 培训师", skills: "培训、知识沉淀、最佳实践推广", gradient: "from-green-400 to-emerald-400" },
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
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Users className="h-4 w-4" />
          团队篇 · 打造 AI 团队
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            从零打造 AI 团队
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          组建 AI 团队、建立工作流程、打造学习型组织，企业级 AI 团队建设指南。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["技术负责人", "团队 Leader", "HR", "CTO"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">核心主题</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon
            return (
              <div key={topic.title} className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-xs text-gray-600">{topic.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Roles */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">核心角色</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div key={role.name} className={`p-5 rounded-2xl bg-gradient-to-br ${role.gradient} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
              <h3 className="font-bold text-lg mb-2">{role.name}</h3>
              <p className="text-sm opacity-90">{role.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["组建 AI 团队", "建立工作流程", "打造学习型组织"].map((goal, index) => {
            const gradients = [
              "from-green-400 to-emerald-400",
              "from-blue-400 to-cyan-400",
              "from-purple-400 to-pink-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}>
                <Award className="h-6 w-6" />
                <span className="font-bold text-lg">{goal}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Chapter list */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">章节目录</h2>
        <div className="space-y-3">
          {chapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.title}
              href={chapter.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white text-sm font-bold shadow-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold text-gray-900">{chapter.title}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}
