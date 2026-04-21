import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Link2,
  Bot,
  Users,
  BookOpen,
  FolderTree,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  Workflow,
  Database,
  Brain,
  Wrench,
  MessageSquare,
  Search,
  Layers,
  Trophy,
  Lightbulb,
  FileCode,
  Repeat,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"

type Framework = {
  id: "langchain" | "autogpt" | "metagpt" | "llamaindex" | "langgraph"
  name: string
  tagline: string
  subtitle: string
  icon: typeof Link2
  accent: string
  border: string
  bg: string
  detailHref: string
  logic: string
  codeMap: { path: string; desc: string }[]
  capabilities: { icon: typeof Link2; label: string }[]
  scenarios: string[]
}

const frameworks: Framework[] = [
  {
    id: "langchain",
    name: "LangChain",
    tagline: "AI 应用编排框架",
    subtitle: "工具箱 + 编排层",
    icon: Link2,
    accent: "text-rose-600",
    border: "border-rose-300/60",
    bg: "from-rose-50 to-pink-50",
    detailHref: "/advanced/ai-frameworks/langchain",
    logic:
      "Chain（链式调用）+ Agent（决策调用工具），把 LLM、工具、记忆等能力组成应用。",
    codeMap: [
      { path: "chains/", desc: "链式流程编排" },
      { path: "agents/", desc: "智能体（决策 + 工具调用）" },
      { path: "tools/", desc: "工具集成层" },
      { path: "memory/", desc: "记忆管理" },
      { path: "prompts/", desc: "提示词模板" },
      { path: "output_parsers/", desc: "输出解析" },
      { path: "retrievers/", desc: "检索接口（接向量库）" },
    ],
    capabilities: [
      { icon: Link2, label: "链式编排" },
      { icon: Bot, label: "智能体" },
      { icon: Wrench, label: "工具调用" },
      { icon: Brain, label: "记忆管理" },
      { icon: MessageSquare, label: "提示模板" },
    ],
    scenarios: ["AI 应用开发", "工作流编排", "Agent 系统构建"],
  },
  {
    id: "autogpt",
    name: "AutoGPT",
    tagline: "自主执行 AI 智能体",
    subtitle: "让 AI 自己干活",
    icon: Bot,
    accent: "text-amber-600",
    border: "border-amber-300/60",
    bg: "from-amber-50 to-orange-50",
    detailHref: "/advanced/ai-frameworks/autogpt",
    logic:
      "Goal → Plan → Execute → Reflect（循环）。AI 自主拆解任务，调用工具，持续迭代。",
    codeMap: [
      { path: "autogpt/agent/", desc: "核心 Agent 循环" },
      { path: "autogpt/memory/", desc: "长短期记忆" },
      { path: "autogpt/workspace/", desc: "文件系统（读写）" },
      { path: "autogpt/tools/", desc: "工具集（测试器/代码执行等）" },
      { path: "autogpt/config/", desc: "运行参数" },
      { path: "autogpt/loop.py", desc: "核心循环入口（重点）" },
    ],
    capabilities: [
      { icon: Target, label: "自主规划" },
      { icon: Wrench, label: "工具使用" },
      { icon: Brain, label: "记忆存储" },
      { icon: FileCode, label: "代码执行" },
      { icon: FolderTree, label: "文件操作" },
    ],
    scenarios: ["自动任务执行", "数据抓取", "个人助理", "原型验证"],
  },
  {
    id: "metagpt",
    name: "MetaGPT",
    tagline: "多智能体协作框架",
    subtitle: "AI 公司模拟器",
    icon: Users,
    accent: "text-emerald-600",
    border: "border-emerald-300/60",
    bg: "from-emerald-50 to-teal-50",
    detailHref: "/advanced/ai-frameworks/metagpt",
    logic:
      "Multi-Agent + SOP（标准流程）。让多个 AI 角色按流程分工协作完成任务。",
    codeMap: [
      { path: "metagpt/roles/", desc: "角色定义（PM/Engineer/QA 等）" },
      { path: "metagpt/actions/", desc: "角色行为与能力" },
      { path: "metagpt/environment/", desc: "共享环境与上下文" },
      { path: "metagpt/memory/", desc: "团队记忆" },
      { path: "metagpt/workflows/", desc: "流程编排" },
      { path: "metagpt/team.py", desc: "多智能体协作核心" },
    ],
    capabilities: [
      { icon: Users, label: "角色分工" },
      { icon: MessageSquare, label: "协作沟通" },
      { icon: Workflow, label: "任务分解" },
      { icon: Layers, label: "流程编排" },
      { icon: FileCode, label: "代码生成" },
    ],
    scenarios: ["项目自动化生成", "团队协作模拟", "复杂任务流水线"],
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    tagline: "数据连接与 RAG 引擎",
    subtitle: "喂知识给 AI",
    icon: BookOpen,
    accent: "text-sky-600",
    border: "border-sky-300/60",
    bg: "from-sky-50 to-blue-50",
    detailHref: "/advanced/ai-frameworks/llamaindex",
    logic:
      "Data → Index → Retrieve → Generate。让 LLM 拥有你的知识，提升问答准确度。",
    codeMap: [
      { path: "llama_index/readers/", desc: "数据加载（PDF/网页/DB 等）" },
      { path: "llama_index/nodes/", desc: "文本切块（Node）" },
      { path: "llama_index/indices/", desc: "索引结构（向量索引等）" },
      { path: "llama_index/retrievers/", desc: "检索器" },
      { path: "llama_index/query_engine/", desc: "查询引擎" },
      { path: "llama_index/embeddings/", desc: "向量化模型接口" },
    ],
    capabilities: [
      { icon: Database, label: "数据接入" },
      { icon: Layers, label: "索引构建" },
      { icon: Search, label: "向量检索" },
      { icon: MessageSquare, label: "查询引擎" },
      { icon: Brain, label: "RAG 增强" },
    ],
    scenarios: ["知识库问答", "企业搜索", "AI 客服", "文档分析"],
  },
  {
    id: "langgraph",
    name: "LangGraph",
    tagline: "基于图的 Agent 编排框架",
    subtitle: "有状态 · 多节点 · 循环执行",
    icon: GitBranch,
    accent: "text-violet-600",
    border: "border-violet-300/60",
    bg: "from-violet-50 to-purple-50",
    detailHref: "/advanced/ai-frameworks/langgraph",
    logic:
      "Graph（图）+ Node（节点）+ Edge（边）+ State（状态）。用图结构编排复杂应用，支持条件分支、循环、人工干预。",
    codeMap: [
      { path: "langgraph/graph/", desc: "图结构核心（StateGraph 等）" },
      { path: "langgraph/nodes/", desc: "节点定义（任务单元）" },
      { path: "langgraph/edges/", desc: "边与条件跳转" },
      { path: "langgraph/state/", desc: "全局状态与持久化" },
      { path: "langgraph/checkpoint/", desc: "检查点与恢复" },
      { path: "langgraph/prebuilt/", desc: "预置 Agent 模板" },
    ],
    capabilities: [
      { icon: GitBranch, label: "图结构编排" },
      { icon: Database, label: "状态管理" },
      { icon: Repeat, label: "循环 / 条件分支" },
      { icon: Users, label: "多智能体" },
      { icon: Layers, label: "可视化调试" },
    ],
    scenarios: ["复杂对话系统", "多智能体协作", "工作流自动化", "决策与规划"],
  },
]

const autogptLoop = [
  { label: "思考", en: "Thought", icon: Brain },
  { label: "行动", en: "Action", icon: Wrench },
  { label: "观察", en: "Observation", icon: Search },
  { label: "记忆", en: "Memory", icon: Database },
]

const metagptFlow = [
  { role: "PM", task: "需求分析" },
  { role: "Architect", task: "设计方案" },
  { role: "Engineer", task: "编码实现" },
  { role: "QA", task: "测试验收" },
  { role: "Deploy", task: "交付部署" },
]

const llamaindexFlow = [
  { label: "数据源", icon: Database },
  { label: "切块 Chunk", icon: Layers },
  { label: "向量化 Embedding", icon: Sparkles },
  { label: "检索 Retrieve", icon: Search },
  { label: "生成 Generate", icon: Brain },
]

const comparison = [
  {
    name: "LangChain",
    position: "应用编排",
    logic: "链式调用 + Agent",
    capability: "编排、工具、记忆",
    strength: "灵活强大，生态丰富",
    weakness: "需要自己设计流程",
  },
  {
    name: "AutoGPT",
    position: "自主执行",
    logic: "目标驱动 + 自我反思执行",
    capability: "自主规划、执行",
    strength: "自主性高",
    weakness: "不稳定，可控性低",
  },
  {
    name: "MetaGPT",
    position: "多智能体协作",
    logic: "角色分工 + SOP",
    capability: "协作、流程、生成",
    strength: "标准化，工程化",
    weakness: "流程固定，灵活性差",
  },
  {
    name: "LlamaIndex",
    position: "数据与知识检索",
    logic: "RAG 检索增强",
    capability: "数据、索引、检索",
    strength: "数据处理强",
    weakness: "不负责执行逻辑",
  },
  {
    name: "LangGraph",
    position: "图式 Agent 编排",
    logic: "Graph + State + Edge",
    capability: "状态、循环、多 Agent",
    strength: "流程灵活，内置可视化",
    weakness: "学习成本高于 LangChain",
  },
]

const selectionGuide = [
  { need: "想快速搭建应用框架", answer: "LangChain" },
  { need: "想构建有状态 / 多智能体的复杂流程", answer: "LangGraph" },
  { need: "想让 AI 自动执行任务", answer: "AutoGPT" },
  { need: "想让 AI 团队协作完成项目", answer: "MetaGPT" },
  { need: "想要本地私有数据问答", answer: "LlamaIndex" },
  { need: "想要全能 AI 平台", answer: "组合使用" },
]

const bestPractice = [
  { title: "知识更准确", subtitle: "RAG" },
  { title: "执行更自动", subtitle: "自主 Agent" },
  { title: "协作更高效", subtitle: "多智能体" },
  { title: "流程更灵活", subtitle: "编排控制" },
]

export default function AIFrameworksPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="AI 应用框架全景"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 应用框架全景
        </h1>
        <p className="text-lg text-muted-foreground">
          一张图看懂 <strong className="text-foreground">LangChain</strong>、
          <strong className="text-foreground">LlamaIndex</strong>、
          <strong className="text-foreground">LangGraph</strong>、
          <strong className="text-foreground">AutoGPT</strong>、
          <strong className="text-foreground">MetaGPT</strong>{" "}
          五大主流 AI 应用框架的核心能力与 Code Map，点击每张卡片进入对应详解页。
        </p>
      </div>

      <div className="space-y-12">
        {/* 全景图 */}
        <section>
          <div className="p-4 sm:p-6 rounded-2xl border border-border bg-card">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                一图速览：四大框架核心功能与 Code Map 全景图
              </h2>
              <span className="ml-auto text-xs text-muted-foreground">
                原始概览图（四大框架）
              </span>
            </div>
            <div className="relative w-full overflow-hidden rounded-xl border border-border bg-secondary/30">
              <Image
                src="/images/ai-frameworks-overview.png"
                alt="LangChain / AutoGPT / MetaGPT / LlamaIndex 四大 AI 框架核心功能与 Code Map 全景图"
                width={2048}
                height={1365}
                priority
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              下文将逐个拆解每个框架的核心逻辑、代码结构、核心能力与适合场景，并给出对比表和选型指南。
            </p>
          </div>
        </section>

        {/* 核心洞察 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <p className="text-foreground font-medium mb-2">
              核心洞察：框架不是魔法，是分工
            </p>
            <p className="text-muted-foreground">
              这些框架解决的是 AI 应用不同层面的问题：
              <strong className="text-foreground">LlamaIndex 管「知识输入」</strong>，
              <strong className="text-foreground">LangChain 管「流程编排」</strong>，
              <strong className="text-foreground">LangGraph 管「有状态的复杂流程」</strong>，
              <strong className="text-foreground">AutoGPT 管「自主执行」</strong>，
              <strong className="text-foreground">MetaGPT 管「团队协作」</strong>。
              不是谁替代谁，而是各司其职，组合起来才是完整的 AI 应用体系。
            </p>
          </div>
        </section>

        {/* 四大框架详细卡片 */}
        {frameworks.map((fw, idx) => {
          const Icon = fw.icon
          return (
            <section key={fw.id} id={fw.id}>
              <div
                className={`rounded-2xl border-2 ${fw.border} bg-gradient-to-br ${fw.bg} p-6 sm:p-8`}
              >
                {/* 框架头部 */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${fw.accent}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h2 className={`text-2xl font-bold ${fw.accent}`}>
                        {idx + 1}. {fw.name}
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        · {fw.subtitle}
                      </span>
                    </div>
                    <p className="text-base text-foreground font-medium">
                      {fw.tagline}
                    </p>
                  </div>
                </div>

                {/* 核心逻辑 */}
                <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    核心逻辑
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fw.logic}
                  </p>
                </div>

                {/* AutoGPT 核心循环 */}
                {fw.id === "autogpt" && (
                  <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Repeat className="h-4 w-4 text-primary" />
                      核心循环
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {autogptLoop.map((step, i) => {
                        const StepIcon = step.icon
                        return (
                          <div
                            key={step.en}
                            className="flex items-center gap-2"
                          >
                            <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm shadow-sm">
                              <StepIcon className="h-4 w-4 text-amber-600" />
                              <span className="font-medium text-foreground">
                                {step.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {step.en}
                              </span>
                            </div>
                            {i < autogptLoop.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        )
                      })}
                      <ArrowRight className="h-4 w-4 rotate-180 text-amber-500" />
                      <span className="text-xs text-muted-foreground">
                        持续循环
                      </span>
                    </div>
                  </div>
                )}

                {/* MetaGPT 核心流程 */}
                {fw.id === "metagpt" && (
                  <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Workflow className="h-4 w-4 text-primary" />
                      核心流程（示例：软件开发流程）
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {metagptFlow.map((step, i) => (
                        <div key={step.role} className="flex items-center gap-2">
                          <div className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm shadow-sm">
                            <div className="text-xs font-semibold text-emerald-700">
                              {step.role}
                            </div>
                            <div className="text-foreground">{step.task}</div>
                          </div>
                          {i < metagptFlow.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-emerald-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LangGraph 详解图预览 */}
                {fw.id === "langgraph" && (
                  <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      详解图预览
                      <span className="ml-auto text-xs font-normal text-muted-foreground">
                        （四合一总览图未包含，单独补充）
                      </span>
                    </div>
                    <Link
                      href={fw.detailHref}
                      className="group block overflow-hidden rounded-lg border border-violet-200 bg-white"
                    >
                      <Image
                        src="/images/ai-frameworks/langgraph.png"
                        alt="LangGraph 核心概念与执行流程详解图"
                        width={1600}
                        height={900}
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                    </Link>
                    <p className="mt-2 text-xs text-muted-foreground">
                      点击图片或下方「查看 LangGraph 详解」进入详解页查看高清原图与逐节解析。
                    </p>
                  </div>
                )}

                {/* LlamaIndex 核心流程 */}
                {fw.id === "llamaindex" && (
                  <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Workflow className="h-4 w-4 text-primary" />
                      核心流程
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {llamaindexFlow.map((step, i) => {
                        const StepIcon = step.icon
                        return (
                          <div key={step.label} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm shadow-sm">
                              <StepIcon className="h-4 w-4 text-sky-600" />
                              <span className="font-medium text-foreground">
                                {step.label}
                              </span>
                            </div>
                            {i < llamaindexFlow.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-sky-500" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Code Map */}
                <div className="mb-5 rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FolderTree className="h-4 w-4 text-primary" />
                    Code Map（核心模块）
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {fw.codeMap.map((item) => (
                      <div
                        key={item.path}
                        className="flex items-start gap-3 rounded-lg bg-white/80 px-3 py-2"
                      >
                        <FileCode
                          className={`h-4 w-4 mt-0.5 shrink-0 ${fw.accent}`}
                        />
                        <div className="min-w-0">
                          <code className="block truncate text-xs font-mono font-semibold text-foreground">
                            {item.path}
                          </code>
                          <div className="text-xs text-muted-foreground">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 核心能力 + 适合场景 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      核心能力
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {fw.capabilities.map((cap) => {
                        const CapIcon = cap.icon
                        return (
                          <div
                            key={cap.label}
                            className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
                          >
                            <CapIcon className={`h-3.5 w-3.5 ${fw.accent}`} />
                            {cap.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Target className="h-4 w-4 text-primary" />
                      适合场景
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {fw.scenarios.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button asChild variant="default">
                    <Link href={fw.detailHref} className="flex items-center gap-2">
                      查看 {fw.name} 详解
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )
        })}

        {/* 五大框架对比速览 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            五大框架对比速览
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    框架
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    核心定位
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    核心逻辑
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    核心能力
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    优势
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    短板
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.position}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.logic}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.capability}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                        <span>{row.strength}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-start gap-1.5">
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
                        <span>{row.weakness}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 协同工作 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            如何协同工作？（推荐组合）
          </h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                用户需求
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm">
                <BookOpen className="h-4 w-4 text-sky-600" />
                <span>
                  <strong className="text-foreground">LlamaIndex</strong>
                  <span className="ml-1 text-xs text-muted-foreground">
                    提供知识
                  </span>
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm">
                <Link2 className="h-4 w-4 text-rose-600" />
                <span>
                  <strong className="text-foreground">LangChain</strong>
                  <span className="ml-1 text-xs text-muted-foreground">
                    编排流程
                  </span>
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm">
                <Bot className="h-4 w-4 text-amber-600" />
                <span>
                  <strong className="text-foreground">AutoGPT</strong>
                  <span className="ml-1 text-xs text-muted-foreground">
                    自主执行
                  </span>
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm">
                <Users className="h-4 w-4 text-emerald-600" />
                <span>
                  <strong className="text-foreground">MetaGPT</strong>
                  <span className="ml-1 text-xs text-muted-foreground">
                    多智能体协作
                  </span>
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary">
                输出结果
              </div>
            </div>
            <div className="rounded-xl border border-primary/40 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <Trophy className="h-5 w-5 text-primary" />
                最佳实践组合：LangChain + LlamaIndex + AutoGPT + MetaGPT
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {bestPractice.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg bg-white p-3 text-center"
                  >
                    <CheckCircle2 className="mx-auto mb-1 h-5 w-5 text-emerald-500" />
                    <div className="text-sm font-semibold text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ({item.subtitle})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 选择指南 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            选择指南
          </h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-3">
              {selectionGuide.map((item) => (
                <div
                  key={item.need}
                  className="flex flex-wrap items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3"
                >
                  <div className="flex-1 text-foreground">{item.need}</div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-4 font-medium text-foreground">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "理解 LangChain / AutoGPT / MetaGPT / LlamaIndex 四大框架的核心定位差异",
                "能够看懂每个框架的 Code Map，知道源码里哪些模块最关键",
                "掌握 RAG、Agent、Multi-Agent、Workflow 四种范式的工程实现思路",
                "能够根据业务需求选型，而不是盲目追逐热门框架",
                "理解四大框架如何组合成一个完整的 AI 应用体系",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 章节导航 */}
      <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
        <Button variant="ghost" asChild>
          <Link
            href="/advanced/ai-architecture-patterns"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 适配架构范式
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/dev-basics" className="flex items-center gap-2">
            下一章：开发常识
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
