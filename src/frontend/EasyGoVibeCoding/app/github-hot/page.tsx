import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Flame,
  Github,
  Sparkles,
  Tag,
} from "lucide-react";

const quickLinks = [
  {
    title: "GitHub Trending（总榜）",
    desc: "查看今日/本周/本月最火的开源项目",
    url: "https://github.com/trending",
    gradient: "from-gray-800 to-gray-600",
  },
  {
    title: "Trending（TypeScript）",
    desc: "前端/全栈生态最常用语言",
    url: "https://github.com/trending/typescript",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Trending（Python）",
    desc: "AI/数据/自动化最常用语言",
    url: "https://github.com/trending/python",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Trending（Go）",
    desc: "高性能后端与基础设施常用语言",
    url: "https://github.com/trending/go",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const tracks = [
  {
    title: "AI Agent / 自动化",
    tags: ["Agent", "MCP", "Workflow", "RAG"],
    url: "https://github.com/search?q=agent+workflow+language%3APython&type=repositories&s=stars&o=desc",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "前端 UI / 组件库",
    tags: ["React", "Next.js", "Tailwind", "Design System"],
    url: "https://github.com/search?q=react+component+library&type=repositories&s=stars&o=desc",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "全栈模板 / SaaS",
    tags: ["SaaS", "Template", "Auth", "Billing"],
    url: "https://github.com/search?q=saas+starter+template&type=repositories&s=stars&o=desc",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "后端 / 基础设施",
    tags: ["API", "Database", "Cache", "Observability"],
    url: "https://github.com/search?q=observability+stack&type=repositories&s=stars&o=desc",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const featuredRepos = [
  {
    title: "everything-claude-code",
    subtitle: "ECC 代码优化巨灵",
    desc: "超大规模 agents/rules/skills/hook 体系：性能优化、规则绑定、安全审查与持续进化。",
    url: "https://github.com/affaan-m/everything-claude-code",
    tags: ["Agents", "Rules", "Hooks", "Security"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "superpowers",
    subtitle: "高纪律 AI 编程工程 OS",
    desc: "用严格流程把 AI 从“打字员”升级为“工程师/架构师”，强调 TDD、分工与验收。",
    url: "https://github.com/obra/superpowers",
    tags: ["TDD", "Worktree", "Review", "Discipline"],
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    title: "agency-agents",
    subtitle: "组织化拟人企业班底",
    desc: "把“组织”搬进仓库：大量带指标与交付物的角色模板，按部门分工协作。",
    url: "https://github.com/msitarzewski/agency-agents",
    tags: ["Org", "Metrics", "Deliverables", "Playbooks"],
    gradient: "from-sky-600 to-indigo-600",
  },
  {
    title: "get-shit-done",
    subtitle: "GSD 反上下文腐败系统",
    desc: "围绕 Context Rot 的工程化对抗：规划→波次隔离执行→验收→原子提交。",
    url: "https://github.com/gsd-build/get-shit-done",
    tags: ["Context", "Plan", "Execute", "Verify"],
    gradient: "from-rose-600 to-red-500",
  },
  {
    title: "TradingAgents",
    subtitle: "宏观环境金融交易智能体",
    desc: "多智能体协作 + 辩论/反思 + 风控闭环，做更稳健的交易决策。",
    url: "https://github.com/tauricresearch/tradingagents",
    tags: ["Multi-Agent", "Debate", "Reflection", "Risk"],
    gradient: "from-slate-700 to-slate-500",
  },
  {
    title: "skills",
    subtitle: "Minimalist Entrepreneur 技能库",
    desc: "基于《The Minimalist Entrepreneur》的 10 个创业陪伴技能：验证优先，反对先造后卖。",
    url: "https://github.com/slavingia/skills",
    tags: ["Entrepreneur", "Validation", "Playbook", "Decision"],
    gradient: "from-amber-600 to-orange-500",
  },
  {
    title: "follow-builders",
    subtitle: "信息提纯与获取特工",
    desc: "跟踪顶级 builder 信息源，降噪提纯成可扫读 digest，并支持多语排版与投递。",
    url: "https://github.com/zarazhangrui/follow-builders",
    tags: ["Digest", "Summarize", "Translate", "Delivery"],
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    title: "skill-from-masters",
    subtitle: "大师级技能提取炉",
    desc: "强调“有案例背书”的技能生成：先对比实战正反案例，再归纳模式并导出可执行 Skill。",
    url: "https://github.com/GBSOSS/skill-from-masters",
    tags: ["Cases", "Induction", "Taxonomy", "Skill"],
    gradient: "from-neutral-800 to-neutral-600",
  },
] as const;

const frameworkRepos = [
  {
    title: "LangChain",
    subtitle: "框架 / SDK（编排层）",
    desc: "用于构建 LLM 应用与 Agent 的编排框架：链式流程、工具调用、RAG 与多组件集成。",
    url: "https://github.com/langchain-ai/langchain",
    tags: ["Framework", "Orchestration", "Agents", "RAG"],
    gradient: "from-blue-600 to-cyan-500",
  },
] as const;

const pioneerRepos = [
  {
    title: "AutoGPT",
    subtitle: "经典 Agent 原型（早期自治体）",
    desc: "早期“自治 Agent”代表实现：任务循环、工具使用与多步执行范式的启蒙项目。",
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    tags: ["Autonomous", "Task Loop", "Prototype", "Tools"],
    gradient: "from-neutral-700 to-neutral-500",
  },
] as const;

const ragModules = [
  {
    module: "数据与索引（Ingestion / Parsing / Indexing）",
    desc: "把原始数据变成可检索的索引结构",
    repos: [
      {
        title: "LlamaIndex",
        subtitle: "RAG / Document Agent 框架",
        desc: "偏“数据与索引层”的 RAG 体系：连接数据源、索引构建、检索与面向文档的 agent 化工作流。",
        url: "https://github.com/run-llama/llama_index",
        tags: ["RAG", "Indexing", "Connectors", "Agents"],
        gradient: "from-violet-600 to-purple-500",
      },
    ],
  },
  {
    module: "检索与重排（Retrieval / Rerank）",
    desc: "召回、融合、过滤，让上下文“更准、更稳”",
    repos: [
      {
        title: "R2R",
        subtitle: "生产级检索系统 / Agentic RAG",
        desc: "以“检索系统”视角构建 RAG：提供 API/SDK 与更工程化的检索与上下文管理能力。",
        url: "https://github.com/SciPhi-AI/R2R",
        tags: ["Retrieval", "API", "Agentic RAG", "SDK"],
        gradient: "from-blue-700 to-indigo-600",
      },
      {
        title: "txtai",
        subtitle: "语义检索 + RAG 工作流",
        desc: "一体化语义搜索框架：向量检索、流水线与 LLM 工作流结合，可快速搭建 RAG 应用。",
        url: "https://github.com/neuml/txtai",
        tags: ["Semantic Search", "RAG", "Embeddings", "Workflows"],
        gradient: "from-amber-600 to-orange-500",
      },
    ],
  },
  {
    module: "编排与管线（Orchestration / Pipelines）",
    desc: "用可控的流程把检索、路由、生成串成系统",
    repos: [
      {
        title: "Haystack",
        subtitle: "RAG / Pipeline 编排框架",
        desc: "模块化 Pipeline/Agent 框架：检索、路由、记忆与生成可显式控制，适合生产级 RAG。",
        url: "https://github.com/deepset-ai/haystack",
        tags: ["RAG", "Pipelines", "Routing", "Production"],
        gradient: "from-emerald-600 to-teal-500",
      },
    ],
  },
  {
    module: "引擎化落地（RAG Engine）",
    desc: "更接近“产品形态”的端到端 RAG 引擎",
    repos: [
      {
        title: "RAGFlow",
        subtitle: "开源 RAG 引擎（含 Agent 能力）",
        desc: "面向落地的 RAG Engine：强调上下文层质量、检索与答案生成结合，并提供更完整的产品化形态。",
        url: "https://github.com/infiniflow/ragflow",
        tags: ["Engine", "RAG", "Context", "Agentic"],
        gradient: "from-slate-700 to-slate-500",
      },
    ],
  },
  {
    module: "平台交付（Platform / Ops）",
    desc: "面向团队使用与部署运营的应用层平台",
    repos: [
      {
        title: "Dify",
        subtitle: "RAG 应用/工作流平台（偏产品化）",
        desc: "应用层平台：知识库 + 工作流/Agent 编排 + 运营部署，适合快速把 RAG 做成可用产品。",
        url: "https://github.com/langgenius/dify",
        tags: ["Platform", "Knowledge Base", "Workflow", "Ops"],
        gradient: "from-pink-600 to-rose-500",
      },
    ],
  },
] as const;

export default function GithubHotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
              <Github className="h-4 w-4" />
              GitHub 热门项目
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                发现正在爆火的开源项目
              </span>
            </h1>
            <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
              用 Trending + 搜索把“灵感”变成可复用的工具、模板与最佳实践。
            </p>
          </div>

          {/* Quick links */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Trending 快速入口</h2>
                <p className="text-sm text-gray-700 font-medium">
                  先看趋势，再决定要学什么、做什么
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`h-9 w-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`}
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Tag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">热门方向</h2>
                <p className="text-sm text-gray-700 font-medium">
                  一键打开“高 Star 候选库”，按方向筛选项目
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((t) => (
                <a
                  key={t.title}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-md`}
                      >
                        <span className="text-white font-bold text-sm">GH</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium">
                          GitHub Search · sort=stars
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-lg bg-gradient-to-r ${t.gradient} text-white text-xs font-semibold shadow-md`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Featured repos */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg">
                <Github className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">精选深度项目（8 个）</h2>
                <p className="text-sm text-gray-700 font-medium">
                  直接把这些“可复用的系统设计”加入你的学习清单
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${repo.gradient} flex items-center justify-center shadow-md shrink-0`}
                      >
                        <span className="text-white font-bold text-sm">GH</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                          {repo.title}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium truncate">
                          {repo.subtitle}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {repo.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-lg bg-gradient-to-r ${repo.gradient} text-white text-xs font-semibold shadow-md`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Framework / Pioneer */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "框架 / SDK（编排层）",
                  subtitle: "先学“如何搭积木”，再学“怎么把系统做稳”",
                  items: frameworkRepos,
                },
                {
                  title: "RAG 框架 / 引擎 / 平台",
                  subtitle: "按模块拆分：数据与索引 / 检索与重排 / 编排 / 引擎化 / 平台交付",
                  items: ragModules,
                },
                {
                  title: "经典 Agent 原型",
                  subtitle: "理解早期自治体范式与历史演进",
                  items: pioneerRepos,
                },
              ].map((group) => (
                <div
                  key={group.title}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900">{group.title}</h2>
                    <p className="text-sm text-gray-700 font-medium">{group.subtitle}</p>
                  </div>

                  {group.title === "RAG 框架 / 引擎 / 平台" ? (
                    <div className="space-y-6">
                      {(group.items as typeof ragModules).map((m) => (
                        <div key={m.module}>
                          <div className="mb-3">
                            <h3 className="text-sm font-extrabold text-gray-900">
                              {m.module}
                            </h3>
                            <p className="text-xs text-gray-700 font-medium">{m.desc}</p>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {m.repos.map((repo) => (
                              <a
                                key={repo.url}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200"
                              >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div
                                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${repo.gradient} flex items-center justify-center shadow-md shrink-0`}
                                    >
                                      <span className="text-white font-bold text-sm">
                                        GH
                                      </span>
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                        {repo.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 font-medium truncate">
                                        {repo.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                  <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </div>

                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                  {repo.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {repo.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className={`px-3 py-1 rounded-lg bg-gradient-to-r ${repo.gradient} text-white text-xs font-semibold shadow-md`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {(group.items as typeof frameworkRepos).map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`h-11 w-11 rounded-xl bg-gradient-to-br ${repo.gradient} flex items-center justify-center shadow-md shrink-0`}
                              >
                                <span className="text-white font-bold text-sm">GH</span>
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                  {repo.title}
                                </h3>
                                <p className="text-xs text-gray-600 font-medium truncate">
                                  {repo.subtitle}
                                </p>
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>

                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {repo.desc}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {repo.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-lg bg-gradient-to-r ${repo.gradient} text-white text-xs font-semibold shadow-md`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              想把热门项目变成你的能力？
            </h2>
            <p className="text-gray-700 mb-6 font-medium">
              推荐去“实践篇”挑一个项目跟做，或去“超级个体篇”把能力产品化。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/practice"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 text-sm font-bold text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                去实践篇
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/super-individual"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-bold text-white hover:from-violet-600 hover:to-fuchsia-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                去超级个体篇
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

