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
  Network,
  Workflow,
  Code,
  Target,
  Scale,
  Sparkles,
  GitBranch,
  Layers,
  CheckCircle2,
  Gauge,
  UserCheck,
  Rocket,
} from "lucide-react"

const caseStudies = [
  {
    name: "LangGraph Official Repo",
    description:
      "LangChain 团队出品的图结构 Agent 编排框架，支持状态、检查点、人工干预、并发执行。",
    href: "https://github.com/langchain-ai/langgraph",
    tag: "官方",
    kind: "github" as const,
  },
  {
    name: "LangGraph.js",
    description:
      "官方 TypeScript 版，适合 Next.js Server Actions / Edge 场景构建有状态 Agent。",
    href: "https://github.com/langchain-ai/langgraphjs",
    tag: "TypeScript",
    kind: "github" as const,
  },
  {
    name: "LangGraph Examples",
    description:
      "官方示例集：ReAct Agent、Multi-Agent Supervisor、RAG with Citations、SQL Agent 等。",
    href: "https://github.com/langchain-ai/langgraph/tree/main/examples",
    tag: "Examples",
    kind: "github" as const,
  },
  {
    name: "open_deep_research",
    description:
      "LangChain 官方的 Deep Research 多 Agent 参考实现，典型有状态 + 并发 + 人工审核流程。",
    href: "https://github.com/langchain-ai/open_deep_research",
    tag: "参考实现",
    kind: "github" as const,
  },
  {
    name: "LangGraph Studio",
    description:
      "官方可视化调试器，桌面端直接查看图执行、状态变化、检查点回放。",
    href: "https://github.com/langchain-ai/langgraph-studio",
    tag: "调试工具",
    kind: "github" as const,
  },
  {
    name: "LangGraph 官方文档",
    description:
      "概念、Quick Start、Agent 模板、持久化、人机协作、生产部署（LangGraph Cloud）完整文档。",
    href: "https://langchain-ai.github.io/langgraph/",
    tag: "Docs",
    kind: "docs" as const,
  },
] as const

const concepts = [
  {
    name: "Graph（图）",
    desc: "由节点（Node）和边（Edge）组成，定义执行流程",
  },
  {
    name: "Node（节点）",
    desc: "执行具体任务的单元，可以是 LLM 调用、工具调用或自定义逻辑",
  },
  {
    name: "Edge（边）",
    desc: "定义节点之间的连接，可以是条件跳转或无条件跳转",
  },
  {
    name: "State（状态）",
    desc: "在图执行过程中维护的全局状态，所有节点共享使用",
  },
  {
    name: "Checkpoint（检查点）",
    desc: "保存执行状态，支持恢复和追溯历史",
  },
  {
    name: "Agent（智能体）",
    desc: "基于图构建的有状态智能体",
  },
]

const execFlow = [
  { label: "输入", en: "Input" },
  { label: "初始化状态", en: "State" },
  { label: "执行节点", en: "Node" },
  { label: "更新状态", en: "Update" },
  { label: "条件判断", en: "Edge" },
  { label: "下一节点", en: "Next Node" },
  { label: "结束", en: "End" },
]

const scenarios = [
  {
    title: "复杂对话系统",
    desc: "支持多轮对话、上下文记忆、工具调用",
  },
  {
    title: "多智能体协作",
    desc: "多个 Agent 协同完成复杂任务，分工明确",
  },
  {
    title: "工作流自动化",
    desc: "自动化处理复杂流程，减少人工干预",
  },
  {
    title: "决策与规划场景",
    desc: "基于状态的决策与规划任务处理",
  },
]

const advancedFeatures = [
  {
    icon: Layers,
    title: "状态持久化",
    desc: "Memory, SQLite, PostgreSQL, Redis 等",
  },
  {
    icon: GitBranch,
    title: "检查点机制",
    desc: "支持从任意检查点恢复执行",
  },
  {
    icon: UserCheck,
    title: "人工干预",
    desc: "Human in the loop — 流程中可以插入人工审核节点",
  },
  {
    icon: Gauge,
    title: "并行执行",
    desc: "支持多个节点并行，提高效率",
  },
  {
    icon: Network,
    title: "可视化调试",
    desc: "提供图形化支持，便于调试和理解流程",
  },
  {
    icon: Boxes,
    title: "多智能体支持",
    desc: "轻松构建多 Agent 协作的复杂系统",
  },
]

const comparison = [
  {
    f: "LangChain",
    exec: "线性链",
    state: "简单状态",
    flow: "固定流程",
    ext: "中等",
    scenario: "简单应用",
    viz: "有限",
  },
  {
    f: "LangGraph",
    exec: "图结构",
    state: "内置状态",
    flow: "灵活（图+条件）",
    ext: "高",
    scenario: "复杂应用/工作流",
    viz: "内置支持",
    highlight: true,
  },
  {
    f: "AutoGPT",
    exec: "单智能体循环",
    state: "中等",
    flow: "循环执行",
    ext: "中等",
    scenario: "自主任务执行",
    viz: "无",
  },
  {
    f: "MetaGPT",
    exec: "多智能体协作",
    state: "中等",
    flow: "角色式执行",
    ext: "中等",
    scenario: "团队协作任务",
    viz: "有限",
  },
]

export default function LangGraphDetailPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="LangGraph 详解"
    >
      <FrameworkHero
        chapter="AI 应用框架 · 03"
        title="LangGraph 详细解析"
        subtitle="构建有状态、多智能体的复杂应用"
        tagline="基于图的 Agent 编排框架，像搭积木一样简单！"
        summary="LangGraph 是基于图（Graph）的 Agent 编排框架，专为构建有状态、多节点、循环执行的复杂应用而设计，支持条件分支、并行执行、人工干预等高级特性。"
        imageSrc="/images/ai-frameworks/langgraph.png"
        imageAlt="LangGraph 详细解析全景图"
        accentClass="text-violet-600"
      />

      <div className="space-y-12">
        <section>
          <SectionTitle icon={Boxes}>1. LangGraph 是什么？</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-muted-foreground leading-relaxed">
              LangGraph 是基于图（Graph）的 Agent 编排框架，专为构建
              <strong className="text-foreground">有状态</strong>、
              <strong className="text-foreground">多节点</strong>、
              <strong className="text-foreground">循环执行</strong>
              的复杂应用而设计。核心三要素：
              <strong className="text-foreground">LLM/Agent</strong> ·{" "}
              <strong className="text-foreground">Graph（图结构）</strong> ·{" "}
              <strong className="text-foreground">State（状态）</strong>。
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                "基于图结构编排，灵活控制流程",
                "支持循环、条件分支、并行执行",
                "内置状态管理，支持长期记忆",
                "支持人工干预（Human in the loop）",
                "可扩展性强，适合复杂多智能体系统",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <SectionTitle icon={Network}>2. 核心概念</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {concepts.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="font-semibold text-foreground">{c.name}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Workflow}>3. 执行流程（图执行引擎）</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              {execFlow.map((item, i) => (
                <div key={item.en} className="flex items-center gap-2">
                  <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
                    <div className="font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.en}
                    </div>
                  </div>
                  {i < execFlow.length - 1 && (
                    <span className="text-violet-500">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-violet-50 px-3 py-2 text-xs text-muted-foreground">
              循环执行，直到结束条件满足
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 font-semibold text-foreground">
                  边（Edge）类型
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="rounded bg-secondary/60 px-2 py-0.5 font-mono text-xs">
                      Direct Edge
                    </span>
                    <span className="ml-2">无条件边：A → B</span>
                  </li>
                  <li>
                    <span className="rounded bg-secondary/60 px-2 py-0.5 font-mono text-xs">
                      Conditional Edge
                    </span>
                    <span className="ml-2">条件边：A → C（with condition）</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-[#1e1e2e] p-0 overflow-hidden">
                <div className="border-b border-slate-700 px-4 py-2 text-xs text-slate-400">
                  条件边示例（JSON）
                </div>
                <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
                  <code>{`{
  "from": "agent",
  "condition": "state['next']",
  "edges": {
    "continue": "tools",
    "end": "end"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Target}>4. 典型应用场景</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {scenarios.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-violet-200 bg-violet-50/50 p-4"
              >
                <div className="font-semibold text-foreground">{s.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Code}>
            5. 代码示例：构建一个简单的 LangGraph
          </SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, List, Dict, Any

# 1. 定义状态
class AgentState(TypedDict):
    messages: Annotated[List[Dict[str, Any]], "消息历史"]
    next: str
    result: str

# 2. 创建图
graph = StateGraph(AgentState)

async def agent(state: AgentState):
    # 调用 LLM 分析用户输入
    return {"next": "tools"}

async def tools(state: AgentState):
    # 调用外部工具
    return {"result": "工具执行结果"}

async def review(state: AgentState):
    # 检查结果，决定是否结束
    if "完成" in state["result"]:
        return {"next": END}
    return {"next": "agent"}

# 3. 添加节点
graph.add_node("agent", agent)
graph.add_node("tools", tools)
graph.add_node("review", review)

# 4. 添加边
graph.set_entry_point("agent")
graph.add_edge("agent", "tools")
graph.add_edge("tools", "review")
graph.add_conditional_edges("review", lambda x: x["next"])

# 5. 编译图
app = graph.compile()`}</code>
            </pre>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              "状态定义",
              "节点函数",
              "流转定义",
              "支持循环",
              "支持条件跳转",
              "可视化状态",
            ].map((k) => (
              <div
                key={k}
                className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-center text-sm text-foreground"
              >
                <Sparkles className="mx-auto mb-1 h-4 w-4 text-violet-600" />
                {k}
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Gauge}>6. 高级特性</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <Icon className="mb-2 h-5 w-5 text-violet-600" />
                  <div className="font-semibold text-foreground">
                    {f.title}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <SectionTitle icon={Scale}>7. 与其他框架对比</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    框架
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    执行模型
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    状态管理
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    流程控制
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    可扩展
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    适用场景
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    可视化
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.f}
                    className={`border-b border-border last:border-0 ${
                      row.highlight ? "bg-violet-50/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {row.f}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.exec}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.state}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.flow}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.ext}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.scenario}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.viz}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionTitle icon={Sparkles}>8. 生态与集成</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "模型", items: ["OpenAI", "Anthropic", "Llama 3"] },
              { label: "工具", items: ["搜索", "计算器", "API"] },
              {
                label: "存储",
                items: ["SQLite", "PostgreSQL", "Redis"],
              },
              {
                label: "监控/部署",
                items: ["LangSmith", "日志追踪", "Docker", "FastAPI"],
              },
            ].map((g) => (
              <div
                key={g.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-2 font-semibold text-foreground">
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full bg-secondary/60 px-2 py-0.5 text-xs text-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Rocket}>9. 真实案例 &amp; 开源项目</SectionTitle>
          <CaseStudyLinks
            items={caseStudies}
            accentBorder="border-violet-200"
            accentBg="bg-violet-50/60"
            accentText="text-violet-600"
            footnote="强烈推荐路径：官方文档 Quick Start → Examples/ReAct Agent → open_deep_research（真实世界的多 Agent 工程参考）。"
          />
        </section>
      </div>

      <FrameworkFooterNav
        prev={{
          title: "LlamaIndex 详解",
          href: "/advanced/ai-frameworks/llamaindex",
        }}
        next={{
          title: "AutoGPT 详解",
          href: "/advanced/ai-frameworks/autogpt",
        }}
      />
    </CourseLayout>
  )
}
