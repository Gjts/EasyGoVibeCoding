import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"
import {
  FrameworkHero,
  FrameworkFooterNav,
  SectionTitle,
} from "@/components/course/framework-detail"
import { CaseStudyLinks } from "@/components/course/case-study-links"
import {
  Users,
  Workflow,
  Network,
  MessageSquare,
  FolderTree,
  Target,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  ClipboardList,
  Lightbulb,
  Code,
  Database,
  Wrench,
  Radio,
  Rocket,
} from "lucide-react"

const caseStudies = [
  {
    name: "MetaGPT Official Repo",
    description:
      "FoundationAgents 团队主仓库，一行需求生成 PRD → 设计 → 代码 → 测试的多智能体软件公司。",
    href: "https://github.com/FoundationAgents/MetaGPT",
    tag: "50k+ ★",
    kind: "github" as const,
  },
  {
    name: "ChatDev",
    description:
      "清华出品的多智能体软件开发框架，MetaGPT 的「对位」项目，强调对话驱动的软件公司仿真。",
    href: "https://github.com/OpenBMB/ChatDev",
    tag: "学术对比",
    kind: "github" as const,
  },
  {
    name: "CrewAI",
    description:
      "面向生产的多 Agent 编排框架，Role + Task + Crew 模型，和 MetaGPT SOP 理念高度相似。",
    href: "https://github.com/crewAIInc/crewAI",
    tag: "生产可用",
    kind: "github" as const,
  },
  {
    name: "AutoGen (Microsoft)",
    description:
      "微软研究院的多智能体对话框架，强调 Agent 之间的对话协作，适合作为 MetaGPT 的参考对比。",
    href: "https://github.com/microsoft/autogen",
    tag: "微软",
    kind: "github" as const,
  },
  {
    name: "MetaGPT 示例库",
    description:
      "官方 examples/ 目录，包含 Debate、Werewolf Game、Research、Data Interpreter 等多 Agent 场景。",
    href: "https://github.com/FoundationAgents/MetaGPT/tree/main/examples",
    tag: "Examples",
    kind: "github" as const,
  },
  {
    name: "MetaGPT 官方文档",
    description:
      "快速上手、Role/Action 自定义、多 Agent 协作、Data Interpreter 等模块完整文档。",
    href: "https://docs.deepwisdom.ai/",
    tag: "Docs",
    kind: "docs" as const,
  },
] as const

const roles = [
  {
    en: "Product Manager",
    cn: "产品经理",
    duties: ["需求分析", "PRD 输出", "优先级规划"],
  },
  {
    en: "Architect",
    cn: "架构师",
    duties: ["系统设计", "技术选型", "技术文档"],
  },
  {
    en: "Engineer",
    cn: "工程师",
    duties: ["代码实现", "单元测试", "接口定义"],
  },
  {
    en: "QA Engineer",
    cn: "测试员",
    duties: ["测试用例", "功能测试", "Bug 管理"],
  },
  {
    en: "Project Manager",
    cn: "项目经理",
    duties: ["任务分配", "进度跟踪", "交付管理"],
  },
]

const sopFlow = [
  "需求输入",
  "任务分解",
  "角色分配",
  "协作执行",
  "结果整合",
  "交付输出",
]

const components = [
  {
    icon: Users,
    name: "Role（角色）",
    desc: "定义不同智能体角色、职责和能力",
  },
  {
    icon: ClipboardList,
    name: "Action（动作）",
    desc: "每个角色可执行的具体任务或操作",
  },
  {
    icon: Database,
    name: "Memory（记忆）",
    desc: "短期记忆（会话级）+ 长期记忆（跨会话）",
  },
  {
    icon: Network,
    name: "Environment（环境）",
    desc: "共享的工作空间和协作环境",
  },
  {
    icon: Workflow,
    name: "Workflow（工作流）",
    desc: "标准化流程，定义任务执行顺序",
  },
  {
    icon: Wrench,
    name: "Tool（工具）",
    desc: "提供外部能力调用（代码、搜索、API 等）",
  },
]

const commModes = [
  { label: "消息广播", en: "Broadcast", icon: Radio },
  { label: "消息订阅", en: "Subscribe", icon: Network },
  { label: "消息处理", en: "Handler", icon: MessageSquare },
  { label: "需求发送", en: "Sender", icon: Briefcase },
]

const collabPatterns = [
  { label: "任务驱动", desc: "基于任务的顺序执行" },
  { label: "事件驱动", desc: "基于事件触发协作" },
  { label: "讨论协作", desc: "多角色讨论达成共识" },
  { label: "监督反馈", desc: "结果评估与改进优化" },
]

const comparison = [
  {
    f: "MetaGPT",
    pos: "多智能体协作",
    count: "多（多个角色）",
    mode: "角色式分工",
    flow: "SOP 标准流程",
    scenario: "复杂项目开发",
    hard: "⭐⭐⭐",
    highlight: true,
  },
  {
    f: "LangChain",
    pos: "应用编排框架",
    count: "单 / 多（多个层级）",
    mode: "链式 / 组合式",
    flow: "灵活编排",
    scenario: "AI 应用开发",
    hard: "⭐⭐",
  },
  {
    f: "AutoGPT",
    pos: "自主执行 Agent",
    count: "单（聚焦执行）",
    mode: "自主决策执行",
    flow: "自循环执行",
    scenario: "自动化任务执行",
    hard: "⭐⭐",
  },
  {
    f: "LlamaIndex",
    pos: "数据接入与 RAG",
    count: "—",
    mode: "无决策流程",
    flow: "数据流程",
    scenario: "知识问答 / RAG 应用",
    hard: "⭐⭐",
  },
]

const advantages = [
  "模拟真实团队协作，分工明确",
  "标准流程驱动，结果更规范",
  "可扩展：支持多种角色和流程",
  "适合复杂、长时间的项目任务",
  "高内聚记忆，协作上下文一致",
]

const limitations = [
  "流程相对固定，灵活性较低",
  "对复杂任务的泛化能力有限",
  "多智能体通信的开销较大",
  "依赖 LLM 质量，结果不稳定",
  "学习曲线较陡，需要理解 SOP",
]

export default function MetaGPTDetailPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="MetaGPT 详解"
    >
      <FrameworkHero
        chapter="AI 应用框架 · 05"
        title="MetaGPT 详细解析"
        subtitle="多智能体协作框架（AI 公司模拟器）"
        tagline="让 AI 公司一样分工协作，自动化完成复杂任务！"
        summary="MetaGPT 让 AI 像公司一样工作，通过角色扮演和标准流程（SOP），高效协作完成复杂任务，从需求到交付一气呵成。"
        imageSrc="/images/ai-frameworks/metagpt.png"
        imageAlt="MetaGPT 详细解析全景图"
        accentClass="text-emerald-600"
      />

      <div className="space-y-12">
        <section>
          <SectionTitle icon={Users}>1. MetaGPT 是什么？</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-5 text-muted-foreground leading-relaxed">
              MetaGPT 是一个
              <strong className="text-foreground">多智能体协作框架</strong>
              ，通过角色扮演和标准流程（SOP），让多个 AI 智能体像一家公司一样协作，完成从需求到交付的完整任务。
            </p>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {["用户需求", "AI 团队协作", "产出结果", "交付完成"].map(
                (item, i, arr) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-foreground">
                      {item}
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-emerald-500">→</span>
                    )}
                  </div>
                ),
              )}
            </div>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                "角色分工：不同角色各司其职",
                "标准流程：SOP 驱动协作",
                "自动化协作：减少人工干预",
                "可扩展：适合各类任务和流程",
                "高内聚记忆：共享上下文与长期记忆",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <SectionTitle icon={Lightbulb}>
            2. 核心理念：角色分工 + SOP 流程
          </SectionTitle>
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {roles.map((r) => (
              <div
                key={r.en}
                className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"
              >
                <div className="text-xs text-emerald-700 font-semibold">
                  {r.en}
                </div>
                <div className="mt-1 font-semibold text-foreground">
                  {r.cn}
                </div>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {r.duties.map((d) => (
                    <li key={d} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 font-semibold text-foreground">
              SOP 流程（标准操作流程）
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sopFlow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm text-foreground">
                    {item}
                  </div>
                  {i < sopFlow.length - 1 && (
                    <span className="text-emerald-500">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={MessageSquare}>
            3. 通信机制与协作模式
          </SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 font-semibold text-foreground">通信机制</div>
              <div className="space-y-2">
                {commModes.map((m) => {
                  const Icon = m.icon
                  return (
                    <div
                      key={m.en}
                      className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2"
                    >
                      <Icon className="h-4 w-4 text-emerald-600" />
                      <div className="text-sm font-medium text-foreground">
                        {m.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ({m.en})
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 font-semibold text-foreground">协作模式</div>
              <div className="space-y-2">
                {collabPatterns.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <div className="text-sm font-medium text-foreground">
                      {p.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Workflow}>
            4. 最小工作示例流程（开发一个网站）
          </SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              {[
                { role: "用户", act: "提出需求" },
                { role: "产品经理", act: "分析需求，输出 PRD 文档" },
                { role: "架构师", act: "设计系统架构" },
                { role: "工程师", act: "编码实现，交付" },
                { role: "测试工程师", act: "测试验收，提交 Bug 报告" },
                { role: "项目经理", act: "整合结果，交付验收" },
              ].map((s, i, arr) => (
                <div key={s.role} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-lg bg-emerald-50/60 p-3">
                    <div className="text-sm font-semibold text-foreground">
                      {s.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.act}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden text-emerald-500 lg:block">↓</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-muted-foreground">
              反馈迭代，持续优化
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Network}>5. 核心组件详解</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => {
              const Icon = c.icon
              return (
                <div
                  key={c.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <Icon className="mb-2 h-5 w-5 text-emerald-600" />
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <SectionTitle icon={FolderTree}>6. 代码结构概览</SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`metagpt/
├── roles/        # 角色定义
├── actions/      # 动作定义
├── env/          # 环境管理
├── memory/       # 记忆管理
├── provider/     # LLM 提供商
├── schema/       # 数据模式
├── tools/        # 工具集成
├── utils/        # 工具函数
├── examples/     # 示例
└── main.py       # 入口模块`}</code>
            </pre>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            关键模块说明：<code className="font-mono">roles/</code>{" "}
            角色定义体系、<code className="font-mono">actions/</code>{" "}
            角色行为与动作、<code className="font-mono">env/</code>{" "}
            任务与通信机制、<code className="font-mono">memory/</code>{" "}
            记忆存储与检索、<code className="font-mono">provider/</code>{" "}
            支持多种 LLM 模型、<code className="font-mono">examples/</code>{" "}
            完整使用示例
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
                    定位
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    智能体数量
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    协作方式
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    流程模式
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    适用场景
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    上手难度
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.f}
                    className={`border-b border-border last:border-0 ${
                      row.highlight ? "bg-emerald-50/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {row.f}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.pos}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.count}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.mode}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.flow}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.scenario}
                    </td>
                    <td className="px-4 py-3 text-amber-500">{row.hard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionTitle icon={Target}>8. 优势与局限性</SectionTitle>
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
        </section>

        <section>
          <SectionTitle icon={Rocket}>9. 真实案例 &amp; 开源项目</SectionTitle>
          <CaseStudyLinks
            items={caseStudies}
            accentBorder="border-emerald-200"
            accentBg="bg-emerald-50/60"
            accentText="text-emerald-600"
            footnote="建议对比学习：MetaGPT（完整角色 + SOP）⇄ ChatDev（对话驱动）⇄ CrewAI（轻量生产）⇄ AutoGen（对话式多 Agent）。"
          />
        </section>
      </div>

      <FrameworkFooterNav
        prev={{
          title: "AutoGPT 详解",
          href: "/advanced/ai-frameworks/autogpt",
        }}
        next={{
          title: "开发常识",
          href: "/advanced/dev-basics",
          label: "下一章：开发常识",
        }}
      />
    </CourseLayout>
  )
}
