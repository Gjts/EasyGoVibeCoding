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
  },
  {
    name: "Mamba (SSM)",
    icon: Zap,
    complexity: "O(n)",
    strengths: "长序列处理、推理快",
    weakness: "表达能力有限",
  },
  {
    name: "MoE",
    icon: GitBranch,
    complexity: "稀疏激活",
    strengths: "超大规模模型",
    weakness: "路由复杂",
  },
  {
    name: "RAG",
    icon: Database,
    complexity: "检索+生成",
    strengths: "知识更新、可解释",
    weakness: "检索质量依赖",
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
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Layers className="h-4 w-4" />
          架构篇 · 深度解析
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 大模型架构深度解析
        </h1>
        <p className="text-lg text-muted-foreground">
          理解 Transformer、Mamba、MoE、RAG 等架构，掌握架构选型思维。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "产品经理：理解技术边界",
            "技术管理者：架构决策",
            "开发者：深入理解原理",
            "架构师：选型与优化",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">主要架构概览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architectures.map((arch) => {
            const Icon = arch.icon
            return (
              <div key={arch.name} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{arch.name}</h3>
                    <span className="text-xs text-primary">{arch.complexity}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent shrink-0">+</span>
                    <span className="text-muted-foreground">{arch.strengths}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive shrink-0">-</span>
                    <span className="text-muted-foreground">{arch.weakness}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["理解 Transformer 架构", "了解新兴架构范式", "架构选型思维"].map((goal) => (
            <div key={goal} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
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
