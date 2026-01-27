import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Code, GraduationCap, Briefcase, Lightbulb, BookOpen, Wrench, Zap } from "lucide-react"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { title: "高级实战场景", href: "/practice/advanced" },
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
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Code className="h-4 w-4" />
          实践篇 · 项目实战
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            项目实战
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          通过真实项目掌握 AI 编程工具，积累从需求到交付的完整实战经验。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想通过实际项目掌握 AI 编程工具的开发者",
            "需要完整项目经验的学习者",
            "想提升工作效率的职场人士",
            "想积累实战经验的技术人员",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["完成真实项目", "掌握全栈开发", "积累实战经验"].map((goal, index) => {
            const gradients = [
              "from-pink-400 to-purple-400",
              "from-purple-400 to-blue-400",
              "from-orange-400 to-amber-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
                <span className="font-bold text-lg">{goal}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Course Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">课程大纲</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                href={category.href}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{category.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{category.description}</p>
                <div className="space-y-2">
                  {category.projects.map((project) => (
                    <div key={project.name} className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50">
                      <span className="text-sm text-gray-900 font-medium">{project.name}</span>
                      <span className="text-xs text-gray-600">{project.tools}</span>
                    </div>
                  ))}
                </div>
              </Link>
            )
          })}
          <Link
            href="/practice/advanced"
            className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">高级实战场景</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              面向所有开发者的高级实战场景，涵盖项目启动、快速上手、业务切换等职场常见挑战
            </p>
            <div className="space-y-2">
              {[
                { name: "场景1：从零开始创建新项目", tools: "架构设计、技术选型" },
                { name: "场景2：快速熟悉新公司项目", tools: "代码阅读、理解" },
                { name: "场景3：业务线切换实战", tools: "业务理解、技术栈迁移" },
              ].map((scenario) => (
                <div key={scenario.name} className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50">
                  <span className="text-sm text-gray-900 font-medium">{scenario.name}</span>
                  <span className="text-xs text-gray-600">{scenario.tools}</span>
                </div>
              ))}
            </div>
          </Link>
          {coreSkills.map((skill) => {
            const Icon = skill.icon
            return (
              <Link
                key={skill.title}
                href={skill.href}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{skill.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">核心技能模块</p>
                <ul className="space-y-2">
                  {skill.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-700 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">章节目录</h2>
        <div className="space-y-3">
          {chapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.title}
              href={chapter.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white text-sm font-bold shadow-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold text-gray-900">{chapter.title}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}