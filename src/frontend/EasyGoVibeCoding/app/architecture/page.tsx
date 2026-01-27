import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowRight, Layers, Cpu, Zap, Database, GitBranch, TrendingUp } from "lucide-react"

const chapters = [
  { title: "架构篇概述", href: "/architecture" },
  { title: "Transformer 是什么？", href: "/architecture/transformer" },
  { title: "Transformer 的核心机制", href: "/architecture/transformer-core" },
  { title: "Transformer 的强项与局限", href: "/architecture/transformer-limits" },
  { title: "Mamba / State Space Models", href: "/architecture/mamba" },
  { title: "Mixture of Experts (MoE)", href: "/architecture/moe" },
  { title: "RAG 检索增强生成", href: "/architecture/rag" },
  { title: "其他新兴架构", href: "/architecture/emerging" },
  { title: "架构对比与选型决策", href: "/architecture/comparison" },
  { title: "未来趋势与展望", href: "/architecture/future" },
]

const architectures = [
  {
    name: "Transformer",
    icon: Cpu,
    complexity: "O(n²)",
    strengths: "通用性强、可扩展",
    weakness: "计算复杂度高",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Mamba (SSM)",
    icon: Zap,
    complexity: "O(n)",
    strengths: "长序列处理、推理快",
    weakness: "表达能力有限",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    name: "MoE",
    icon: GitBranch,
    complexity: "稀疏激活",
    strengths: "超大规模模型",
    weakness: "路由复杂",
    gradient: "from-orange-400 to-amber-400",
  },
  {
    name: "RAG",
    icon: Database,
    complexity: "检索+生成",
    strengths: "知识更新、可解释",
    weakness: "检索质量依赖",
    gradient: "from-green-400 to-emerald-400",
  },
]

export default function ArchitecturePage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Layers className="h-4 w-4" />
          架构篇 · 深度解析
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI 大模型架构深度解析
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          理解 Transformer、Mamba、MoE、RAG 等架构，掌握架构选型思维。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "产品经理：理解技术边界",
            "技术管理者：架构决策",
            "开发者：深入理解原理",
            "架构师：选型与优化",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">主要架构概览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architectures.map((arch) => {
            const Icon = arch.icon
            return (
              <div key={arch.name} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${arch.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{arch.name}</h3>
                    <span className={`text-xs font-semibold bg-gradient-to-r ${arch.gradient} bg-clip-text text-transparent`}>
                      {arch.complexity}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold shrink-0">+</span>
                    <span className="text-gray-700">{arch.strengths}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold shrink-0">-</span>
                    <span className="text-gray-700">{arch.weakness}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["理解 Transformer 架构", "了解新兴架构范式", "架构选型思维"].map((goal, index) => {
            const gradients = [
              "from-indigo-400 to-purple-400",
              "from-purple-400 to-pink-400",
              "from-blue-400 to-cyan-400",
            ]
            return (
              <div key={goal} className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}>
                <TrendingUp className="h-6 w-6" />
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold shadow-lg">
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
