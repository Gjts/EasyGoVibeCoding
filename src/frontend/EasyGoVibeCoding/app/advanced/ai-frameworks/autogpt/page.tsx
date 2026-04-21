import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"
import {
  FrameworkHero,
  FrameworkFooterNav,
  SectionTitle,
} from "@/components/course/framework-detail"
import { CaseStudyLinks } from "@/components/course/case-study-links"
import {
  Bot,
  Repeat,
  Network,
  Wrench,
  Brain,
  FolderTree,
  Code,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  FileCode,
  MessageSquare,
  Globe,
  Lightbulb,
  Rocket,
} from "lucide-react"

const caseStudies = [
  {
    name: "AutoGPT Official Repo",
    description:
      "Significant Gravitas 维护的原始项目，已升级为完整的 Agent 平台（Server + Frontend + Builder）。",
    href: "https://github.com/Significant-Gravitas/AutoGPT",
    tag: "170k+ ★",
    kind: "github" as const,
  },
  {
    name: "BabyAGI",
    description:
      "与 AutoGPT 同期的极简实现（<200 行），最适合理解「目标→任务→优先级→执行」核心循环。",
    href: "https://github.com/yoheinakajima/babyagi",
    tag: "极简",
    kind: "github" as const,
  },
  {
    name: "AgentGPT",
    description:
      "浏览器版 AutoGPT：Next.js + OpenAI，可一键部署自己的自主 Agent Web 应用。",
    href: "https://github.com/reworkd/AgentGPT",
    tag: "Web UI",
    kind: "github" as const,
  },
  {
    name: "SuperAGI",
    description:
      "企业级自主 Agent 框架：支持并发 Agent、工具市场、Resource Manager、可观测性。",
    href: "https://github.com/TransformerOptimus/SuperAGI",
    tag: "企业级",
    kind: "github" as const,
  },
  {
    name: "OpenDevin / All Hands",
    description:
      "面向软件开发场景的自主 Agent：写代码 / 跑命令 / 浏览器操作，AutoGPT 理念的现代继承者。",
    href: "https://github.com/All-Hands-AI/OpenHands",
    tag: "Coding Agent",
    kind: "github" as const,
  },
  {
    name: "AutoGPT 官方文档",
    description:
      "Classic 架构、Forge SDK、Agent Protocol 规范与自建工具指南。",
    href: "https://docs.agpt.co/",
    tag: "Docs",
    kind: "docs" as const,
  },
] as const

const goalFlow = [
  { label: "用户目标", en: "Goal" },
  { label: "AutoGPT Agent", en: "" },
  { label: "使用工具", en: "Tools" },
  { label: "执行操作", en: "Execute" },
  { label: "反思改进", en: "Reflect" },
  { label: "完成目标", en: "Done" },
]

const coreLoop = [
  {
    step: "1",
    label: "思考",
    en: "Thought",
    desc: "分析当前状态，思考下一步应该做什么",
    icon: Brain,
  },
  {
    step: "2",
    label: "计划",
    en: "Plan",
    desc: "制定具体执行计划",
    icon: Lightbulb,
  },
  {
    step: "3",
    label: "行动",
    en: "Action",
    desc: "选择并使用合适的工具执行",
    icon: Wrench,
  },
  {
    step: "4",
    label: "观察",
    en: "Observation",
    desc: "获取工具执行结果",
    icon: Search,
  },
  {
    step: "5",
    label: "反思",
    en: "Reflection",
    desc: "评估结果，判断是否接近目标",
    icon: Repeat,
  },
]

const components = [
  {
    icon: Bot,
    name: "Agent（智能体）",
    desc: "核心大脑，负责规划、决策和执行",
  },
  {
    icon: Brain,
    name: "Memory（记忆系统）",
    desc: "存储历史对话、执行过程、经验总结，支持长短期记忆",
  },
  {
    icon: Wrench,
    name: "Tools（工具系统）",
    desc: "提供各种能力，如搜索、代码、文件操作等",
  },
  {
    icon: FolderTree,
    name: "Workspace（工作空间）",
    desc: "提供安全的执行环境，隔离文件和代码操作",
  },
  {
    icon: Lightbulb,
    name: "Planning（规划系统）",
    desc: "将大目标分解为可执行的任务",
  },
  {
    icon: Repeat,
    name: "Reflection（反思系统）",
    desc: "评估执行结果，总结经验，改进策略",
  },
]

const tools = [
  { label: "搜索工具", en: "Search", icon: Search },
  { label: "网页浏览", en: "Browser", icon: Globe },
  { label: "文件读写", en: "File I/O", icon: FolderTree },
  { label: "代码执行", en: "Code Exec", icon: FileCode },
  { label: "数据分析", en: "Data Analysis", icon: Sparkles },
  { label: "API 调用", en: "API Call", icon: Network },
  { label: "数据库操作", en: "Database", icon: Sparkles },
  { label: "邮件发送", en: "Email", icon: MessageSquare },
  { label: "图像生成", en: "Image Gen", icon: Sparkles },
  { label: "更多工具", en: "Plugins", icon: Wrench },
]

const advantages = [
  "真正的自主执行能力",
  "可以处理复杂任务",
  "支持多种工具和环境",
  "具备记忆和反思能力",
  "可扩展性强",
]

const limitations = [
  "执行结果不稳定",
  "容易陷入循环",
  "可能产生错误决策",
  "对模型能力要求高",
  "需要较强的计算资源",
]

const scenarios = [
  "市场调研与分析",
  "内容创作与发布",
  "代码开发与调试",
  "数据分析与处理",
  "自动化任务执行",
]

export default function AutoGPTDetailPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="AutoGPT 详解"
    >
      <FrameworkHero
        chapter="AI 应用框架 · 04"
        title="AutoGPT 详细解析"
        subtitle="自主执行 AI 智能体（让 AI 自己干活）"
        tagline="给我一个目标，剩下的交给我！"
        summary="AutoGPT 让 AI 从「问答机器人」升级为「自主执行者」，给它一个目标，它就会想办法帮你完成。"
        imageSrc="/images/ai-frameworks/autogpt.png"
        imageAlt="AutoGPT 详细解析全景图"
        accentClass="text-amber-600"
      />

      <div className="space-y-12">
        <section>
          <SectionTitle icon={Bot}>1. AutoGPT 是什么？</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-5 text-muted-foreground leading-relaxed">
              AutoGPT 是一种
              <strong className="text-foreground">自主执行任务</strong>的 AI 智能体，接收用户目标后，自动分解任务，使用工具，执行操作，反思结果，并循环迭代直到任务完成。
            </p>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {goalFlow.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
                    <div className="font-semibold text-foreground">
                      {item.label}
                    </div>
                    {item.en && (
                      <div className="text-xs text-muted-foreground">
                        {item.en}
                      </div>
                    )}
                  </div>
                  {i < goalFlow.length - 1 && (
                    <span className="text-amber-500">→</span>
                  )}
                </div>
              ))}
            </div>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                "自主规划与执行",
                "使用多种工具",
                "长短期记忆与反思",
                "记忆与反思改进",
                "持续迭代直到目标完成",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <SectionTitle icon={Repeat}>
            2. 核心执行循环（自主代理循环）
          </SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              {coreLoop.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.step}
                    className="flex items-start gap-3 rounded-lg bg-amber-50/60 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white text-sm font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-amber-600" />
                        <div className="font-semibold text-foreground">
                          {item.label}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.en}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 rounded-md bg-amber-100 px-3 py-2 text-xs text-foreground">
              若目标未完成 → 回到步骤 1；若目标完成 → 输出结果
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Network}>3. 核心组件详解</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {components.map((c) => {
              const Icon = c.icon
              return (
                <div
                  key={c.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-amber-600" />
                    <div className="font-semibold text-foreground">
                      {c.name}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <SectionTitle icon={Wrench}>4. 工具生态（部分示例）</SectionTitle>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {tools.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.label}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center"
                >
                  <Icon className="mx-auto mb-1 h-5 w-5 text-amber-600" />
                  <div className="text-sm font-semibold text-foreground">
                    {t.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.en}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-muted-foreground">
            <Sparkles className="inline h-3.5 w-3.5 text-amber-600 mr-1" />
            插件扩展机制：支持自定义工具，轻松扩展新能力
          </div>
        </section>

        <section>
          <SectionTitle icon={FolderTree}>
            5. AutoGPT 代码结构（项目结构概览）
          </SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`autogpt/
├── agent/        # 核心代理模块
├── memory/       # 记忆系统
├── tools/        # 工具模块
├── commands/     # 命令系统
├── config/       # 配置模块
├── workspace/    # 工作空间
├── utils/        # 工具函数
├── main.py       # 主入口
└── requirements.txt`}</code>
            </pre>
          </div>
        </section>

        <section>
          <SectionTitle icon={Code}>6. 核心执行代码（简化版）</SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`while not is_task_complete(goal):
    # 1. 思考
    thought = agent.think(goal, memory.get_context())

    # 2. 计划
    plan = agent.plan(thought)

    # 3. 行动
    action = agent.select_tool(plan)
    result = action.execute()

    # 4. 观察
    observation = result.get_output()
    memory.add(observation)

    # 5. 反思
    agent.reflect(observation, goal)

print("任务完成，输出结果...")`}</code>
            </pre>
          </div>
          <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-foreground">
            关键逻辑：思考 → 计划 → 行动 → 观察 → 反思 循环直到任务完成
          </div>
        </section>

        <section>
          <SectionTitle icon={Target}>7. 适用场景</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <span
                key={s}
                className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Rocket}>8. 真实案例 &amp; 开源项目</SectionTitle>
          <CaseStudyLinks
            items={caseStudies}
            accentBorder="border-amber-200"
            accentBg="bg-amber-50/60"
            accentText="text-amber-600"
            footnote="建议入门顺序：BabyAGI（读完循环机制） → AgentGPT（跑 Web Demo） → AutoGPT 最新版（理解平台化演进）。"
          />
        </section>

        <section>
          <SectionTitle icon={Sparkles}>9. 优势 &amp; 局限性</SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                优势
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {advantages.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-rose-700">
                <AlertTriangle className="h-5 w-5" />
                局限性
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {limitations.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-5">
            <div className="mb-2 font-semibold text-foreground">
              与其他框架的关系
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">LangChain</strong>（工具编排模型）+{" "}
              <strong className="text-foreground">AutoGPT</strong>（自主执行智能体）+{" "}
              <strong className="text-foreground">LlamaIndex</strong>（数据接入与 RAG）+{" "}
              <strong className="text-foreground">MetaGPT</strong>（多智能体协作）={" "}
              强大的 AI 应用生态
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <div className="mb-2 font-semibold text-foreground">
              运行环境要求
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-foreground">
              {[
                "Python 3.8+",
                "OpenAI API Key",
                "足够内存（8GB+）",
                "磁盘空间（10GB+）",
                "稳定的网络",
              ].map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-secondary/60 px-3 py-1"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <FrameworkFooterNav
        prev={{
          title: "LangGraph 详解",
          href: "/advanced/ai-frameworks/langgraph",
        }}
        next={{
          title: "MetaGPT 详解",
          href: "/advanced/ai-frameworks/metagpt",
        }}
      />
    </CourseLayout>
  )
}
