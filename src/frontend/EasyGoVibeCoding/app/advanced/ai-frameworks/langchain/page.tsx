import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"
import {
  FrameworkHero,
  FrameworkFooterNav,
  SectionTitle,
} from "@/components/course/framework-detail"
import { CaseStudyLinks } from "@/components/course/case-study-links"
import {
  Boxes,
  FolderTree,
  Workflow,
  Code,
  Target,
  Scale,
  CheckCircle2,
  Database,
  Wrench,
  MessageSquare,
  Brain,
  Bot,
  Link2,
  GitBranch,
  Search,
  FileJson,
  Rocket,
} from "lucide-react"

const caseStudies = [
  {
    name: "LangChain Official Repo",
    description:
      "官方主仓库（Python），包含核心抽象、Agents、Chains、Memory、Retrievers 等全部源码。",
    href: "https://github.com/langchain-ai/langchain",
    tag: "官方",
    kind: "github" as const,
  },
  {
    name: "LangChainJS",
    description:
      "LangChain 官方 TypeScript 版本，Next.js / Cloudflare Workers / Deno 全栈可用。",
    href: "https://github.com/langchain-ai/langchainjs",
    tag: "TypeScript",
    kind: "github" as const,
  },
  {
    name: "GPT Researcher",
    description:
      "基于 LangChain 的自治研究型 Agent，联网检索 + 多轮推理 + 生成长报告。",
    href: "https://github.com/assafelovic/gpt-researcher",
    tag: "17k+ ★",
    kind: "github" as const,
  },
  {
    name: "Danswer / Onyx",
    description:
      "开源企业搜索，用 LangChain 接多数据源（Slack/Confluence/Jira）+ 向量检索问答。",
    href: "https://github.com/onyx-dot-app/onyx",
    tag: "企业 RAG",
    kind: "github" as const,
  },
  {
    name: "ChatChat (Langchain-Chatchat)",
    description:
      "中文社区最火的 LangChain 本地知识库问答项目，完整展示 RAG + Agent 工程落地。",
    href: "https://github.com/chatchat-space/Langchain-Chatchat",
    tag: "中文",
    kind: "github" as const,
  },
  {
    name: "LangChain 官方文档",
    description:
      "从 Quickstart 到 LCEL、LangSmith、LangGraph 集成，建议从这里开始系统入门。",
    href: "https://python.langchain.com/docs/introduction/",
    tag: "Docs",
    kind: "docs" as const,
  },
] as const

const coreModules = [
  {
    icon: MessageSquare,
    name: "Prompts 提示模板",
    desc: "管理和复用提示模板，支持动态变量",
    example: "ChatPromptTemplate",
  },
  {
    icon: Brain,
    name: "Models 模型管理",
    desc: "统一管理多个 LLM，支持切换和配置",
    example: "OpenAI / ChatGLM / Llama2",
  },
  {
    icon: Database,
    name: "Memory 记忆管理",
    desc: "在对话中保留上下文和历史信息",
    example: "ConversationBufferMemory",
  },
  {
    icon: Wrench,
    name: "Tools 工具集",
    desc: "连接外部工具和 API，扩展能力",
    example: "搜索、计算器、API 调用",
  },
  {
    icon: Link2,
    name: "Chains 链式编排",
    desc: "按顺序编排各个步骤完成任务",
    example: "LLMChain / SequentialChain",
  },
  {
    icon: Bot,
    name: "Agents 智能体",
    desc: "根据目标自主选择工具并执行",
    example: "ReAct Agent / AgentExecutor",
  },
  {
    icon: Search,
    name: "Retrievers 检索器",
    desc: "从外部知识库中检索相关信息",
    example: "VectorStoreRetriever",
  },
  {
    icon: FileJson,
    name: "Output Parsers 输出解析",
    desc: "将 LLM 输出解析为结构化格式",
    example: "JsonOutputParser",
  },
]

const chainFlow = [
  { step: "1", label: "输入", desc: "用户问题" },
  { step: "2", label: "提示 Prompt", desc: "组装 Prompt" },
  { step: "3", label: "模型", desc: "调用 LLM" },
  { step: "4", label: "处理", desc: "解析输出" },
  { step: "5", label: "输出", desc: "返回结果" },
]

const reactFlow = [
  { label: "思考", en: "Thought" },
  { label: "行动", en: "Action" },
  { label: "观察", en: "Observation" },
  { label: "再思考", en: "Thought" },
]

const scenarios = [
  "智能问答系统",
  "文档问答（RAG）",
  "AI Agent 应用",
  "数据分析助手",
  "自动化工作流",
  "内容生成",
]

const comparison = [
  {
    f: "LangChain",
    pos: "编排框架（工具箱）",
    core: "Chain / Agent / 工具 / 记忆",
    flex: "★★★★★",
    ease: "★★★★",
    scenario: "构建各类 AI 应用",
    highlight: true,
  },
  {
    f: "AutoGPT",
    pos: "自主执行 Agent",
    core: "目标驱动、自主执行",
    flex: "★★★★",
    ease: "★★★",
    scenario: "自动化任务执行",
  },
  {
    f: "MetaGPT",
    pos: "多智能体协作",
    core: "角色分工、协作流程",
    flex: "★★★",
    ease: "★★★",
    scenario: "复杂项目协作开发",
  },
  {
    f: "LlamaIndex",
    pos: "数据连接与 RAG",
    core: "数据处理与检索",
    flex: "★★★★",
    ease: "★★★★",
    scenario: "知识库 / RAG 应用",
  },
]

export default function LangChainDetailPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="LangChain 详解"
    >
      <FrameworkHero
        chapter="AI 应用框架 · 01"
        title="LangChain 详细解析"
        subtitle="AI 应用编排框架（工具箱 + 编排层）"
        tagline="让 LLM 更强大，构建可靠的 AI 应用。"
        summary="LangChain 是连接大语言模型与外部世界的桥梁，帮你快速构建强大、可靠、可扩展的 AI 应用。"
        imageSrc="/images/ai-frameworks/langchain.png"
        imageAlt="LangChain 详细解析全景图"
        accentClass="text-rose-600"
      />

      <div className="space-y-12">
        <section>
          <SectionTitle icon={Boxes}>1. LangChain 是什么？</SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "LLM（大语言模型）",
                desc: "能力有限：无记忆、无工具、无联网、无结构化输出",
                tone: "border-gray-300 bg-gray-50",
              },
              {
                title: "LangChain（编排层）",
                desc: "能力增强：记忆(Memory)、工具(Tools)、流程(Chain/Agent)、结构化输出(Parser)",
                tone: "border-rose-300 bg-rose-50",
              },
              {
                title: "AI 应用",
                desc: "更智能、更可靠、更可控、可扩展",
                tone: "border-emerald-300 bg-emerald-50",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border-2 ${item.tone} p-5`}
              >
                <div className="mb-2 font-semibold text-foreground">
                  {item.title}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={FolderTree}>2. 核心模块详解</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {coreModules.map((mod) => {
              const Icon = mod.icon
              return (
                <div
                  key={mod.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-rose-600" />
                    <div className="font-semibold text-foreground">
                      {mod.name}
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {mod.desc}
                  </p>
                  <code className="inline-block rounded bg-secondary/60 px-2 py-0.5 text-xs font-mono text-foreground">
                    示例：{mod.example}
                  </code>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <SectionTitle icon={Workflow}>3. 典型工作流程（Chain）</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              {chainFlow.map((item, i) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="flex flex-col items-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center min-w-[110px]">
                    <div className="mb-1 text-xs font-semibold text-rose-600">
                      Step {item.step}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                  {i < chainFlow.length - 1 && (
                    <div className="h-px w-6 bg-rose-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={GitBranch}>
            4. Agent 执行流程（ReAct 思想）
          </SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              {reactFlow.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm">
                    <div className="font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.en}
                    </div>
                  </div>
                  {i < reactFlow.length - 1 && (
                    <span className="text-rose-500">→</span>
                  )}
                </div>
              ))}
              <span className="text-rose-500">→ 循环直到完成目标</span>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Code}>5. 代码示例（快速上手）</SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

# 1. 定义模型
llm = ChatOpenAI(temperature=0.7)

# 2. 定义 Prompt 模板
prompt = ChatPromptTemplate.from_template(
    "你是一个{role}，请回答以下问题：{question}"
)

# 3. 创建链
chain = LLMChain(llm=llm, prompt=prompt)

# 4. 运行
result = chain.run(role="AI 助手", question="什么是 LangChain？")
print(result)`}</code>
            </pre>
          </div>
        </section>

        <section>
          <SectionTitle icon={Target}>6. 适用场景</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <span
                key={s}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Rocket}>7. 真实案例 &amp; 开源项目</SectionTitle>
          <CaseStudyLinks
            items={caseStudies}
            accentBorder="border-rose-200"
            accentBg="bg-rose-50/60"
            accentText="text-rose-600"
            footnote="提示：点击卡片在新标签页打开。建议先读官方 Docs，再按需看 ChatChat / Danswer 这类工程级开源项目学习架构落地。"
          />
        </section>

        <section>
          <SectionTitle icon={Scale}>8. LangChain vs 其他框架</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    框架
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    定位
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    核心能力
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    灵活性
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    易用性
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    适合场景
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.f}
                    className={`border-b border-border last:border-0 ${
                      row.highlight ? "bg-rose-50/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {row.f}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.pos}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.core}
                    </td>
                    <td className="px-4 py-3 text-amber-500 text-xs tracking-tight">
                      {row.flex}
                    </td>
                    <td className="px-4 py-3 text-amber-500 text-xs tracking-tight">
                      {row.ease}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.scenario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-5">
            <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              优势
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              模块化设计，灵活组合；生态庞大，社区活跃；文档完善；适合从原型到生产的全流程开发。
            </p>
          </div>
        </section>
      </div>

      <FrameworkFooterNav
        prev={{
          title: "AI 应用框架全景",
          href: "/advanced/ai-frameworks",
          label: "返回：AI 应用框架全景",
        }}
        next={{
          title: "LlamaIndex 详解",
          href: "/advanced/ai-frameworks/llamaindex",
        }}
      />
    </CourseLayout>
  )
}
