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
  { hours: "0-20", title: "环境与基础", desc: "开发环境配置、代码运行原理", gradient: "from-emerald-400 to-green-400" },
  { hours: "20-40", title: "AI 深度使用", desc: "大模型生态、Prompt 高级技巧", gradient: "from-purple-400 to-pink-400" },
  { hours: "40-60", title: "文档驱动", desc: "PRD、Spec、WBS、DoD", gradient: "from-blue-400 to-cyan-400" },
  { hours: "60-80", title: "全栈开发", desc: "前端、后端、数据库", gradient: "from-orange-400 to-amber-400" },
  { hours: "80-100", title: "生产就绪", desc: "测试、部署、运维", gradient: "from-red-400 to-rose-400" },
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
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Rocket className="h-4 w-4" />
          进阶篇 · 从工具到架构
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            从工具到架构的 100 小时
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          深入了解 AI 编程工具原理和高级特性，掌握企业级实践与架构权衡思维。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "想深入了解 AI 编程工具原理的开发者",
            "想掌握高级特性的进阶用户",
            "需要企业级实践经验的团队",
            "想建立架构权衡思维的技术人员",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["掌握核心技术", "企业级实践", "架构权衡思维"].map((goal, index) => {
            const gradients = [
              "from-emerald-400 to-green-400",
              "from-purple-400 to-pink-400",
              "from-blue-400 to-cyan-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}>
                <Target className="h-6 w-6" />
                <span className="font-bold text-lg">{goal}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-purple-600" />
          学习路线图
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-purple-400 to-red-400 rounded-full" />
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.hours} className="relative pl-16">
                <div className={`absolute left-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${milestone.gradient} flex items-center justify-center text-sm font-bold text-white shadow-xl`}>
                  {index + 1}
                </div>
                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-bold bg-gradient-to-r ${milestone.gradient} bg-clip-text text-transparent`}>
                      {milestone.hours} 小时
                    </span>
                    <span className="text-gray-900 font-bold text-lg">{milestone.title}</span>
                  </div>
                  <p className="text-sm text-gray-700">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-purple-500 text-white text-sm font-bold shadow-lg">
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
