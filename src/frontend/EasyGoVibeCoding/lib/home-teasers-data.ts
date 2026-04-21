/**
 * 首页 Teaser 共享数据：从各独立页面抽出的"精华版"条目，
 * 首页展示 N 个缩略，完整列表仍由原 /ecosystem、/github-hot、/resources 页面承载。
 *
 * 修改提示：若要增删条目，请同时同步到对应独立页面，
 * 以保持 teaser 与目的页数据一致性。
 */

export interface EcosystemToolItem {
  name: string
  category: "ide" | "web" | "cli" | "design"
  description: string
  tags: string[]
  url: string
  gradient: string
}

export const featuredEcosystemTools: EcosystemToolItem[] = [
  {
    name: "Cursor",
    category: "ide",
    description: "AI-first IDE，Skill/Agent/MCP 支持",
    tags: ["AI IDE", "Agent"],
    url: "https://cursor.sh",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Claude Code",
    category: "cli",
    description: "终端集成 AI 助手，MCP 生态最活跃",
    tags: ["终端", "Anthropic"],
    url: "https://claude.ai",
    gradient: "from-orange-400 to-amber-400",
  },
  {
    name: "v0",
    category: "web",
    description: "自然语言生成 UI，Figma 集成",
    tags: ["UI 生成", "Vercel"],
    url: "https://v0.dev",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    name: "Windsurf",
    category: "ide",
    description: "Fast Context 技术，1M Token 上下文",
    tags: ["大上下文"],
    url: "https://codeium.com/windsurf",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Aider",
    category: "cli",
    description: "AI pair programming in terminal，Git 原生",
    tags: ["终端", "Git"],
    url: "https://aider.chat",
    gradient: "from-orange-400 to-amber-400",
  },
  {
    name: "Figma",
    category: "design",
    description: "协作式 UI 设计工具，AI 功能增强",
    tags: ["UI 设计", "协作"],
    url: "https://www.figma.com",
    gradient: "from-rose-400 to-pink-400",
  },
]

export interface FeaturedRepoItem {
  title: string
  subtitle: string
  desc: string
  url: string
  tags: readonly string[]
  gradient: string
}

export const featuredGithubRepos: readonly FeaturedRepoItem[] = [
  {
    title: "everything-claude-code",
    subtitle: "ECC 代码优化巨灵",
    desc: "超大规模 agents/rules/skills/hook 体系：性能优化、规则绑定、安全审查与持续进化。",
    url: "https://github.com/affaan-m/everything-claude-code",
    tags: ["Agents", "Rules", "Hooks"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "superpowers",
    subtitle: "高纪律 AI 编程工程 OS",
    desc: "严格流程把 AI 从「打字员」升级为「工程师/架构师」：TDD、分工、验收。",
    url: "https://github.com/obra/superpowers",
    tags: ["TDD", "Worktree", "Review"],
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    title: "agency-agents",
    subtitle: "组织化拟人企业班底",
    desc: "把「组织」搬进仓库：大量带指标与交付物的角色模板，按部门分工协作。",
    url: "https://github.com/msitarzewski/agency-agents",
    tags: ["Org", "Metrics", "Playbooks"],
    gradient: "from-sky-600 to-indigo-600",
  },
  {
    title: "get-shit-done",
    subtitle: "GSD 反上下文腐败系统",
    desc: "围绕 Context Rot 的工程化对抗：规划→波次隔离执行→验收→原子提交。",
    url: "https://github.com/gsd-build/get-shit-done",
    tags: ["Context", "Plan", "Execute"],
    gradient: "from-rose-600 to-red-500",
  },
  {
    title: "skills",
    subtitle: "Minimalist Entrepreneur 技能库",
    desc: "《The Minimalist Entrepreneur》10 个创业陪伴技能：验证优先，反对先造后卖。",
    url: "https://github.com/slavingia/skills",
    tags: ["Entrepreneur", "Validation"],
    gradient: "from-amber-600 to-orange-500",
  },
  {
    title: "TradingAgents",
    subtitle: "宏观环境金融交易智能体",
    desc: "多智能体协作 + 辩论/反思 + 风控闭环，做更稳健的交易决策。",
    url: "https://github.com/tauricresearch/tradingagents",
    tags: ["Multi-Agent", "Debate", "Risk"],
    gradient: "from-slate-700 to-slate-500",
  },
] as const

export const GITHUB_HOT_TOTAL_FEATURED = 8

export interface ResourceCategoryTeaser {
  title: string
  iconKey: "blog" | "podcast" | "report" | "newsletter" | "community" | "learning"
  description: string
  gradient: string
  itemCount: number
}

export const resourceCategoryTeasers: ResourceCategoryTeaser[] = [
  {
    title: "知名公司技术博客",
    iconKey: "blog",
    description: "OpenAI / Anthropic / Google / Meta / Vercel",
    gradient: "from-blue-400 to-cyan-400",
    itemCount: 5,
  },
  {
    title: "优质播客",
    iconKey: "podcast",
    description: "Latent Space / Practical AI / Lex Fridman",
    gradient: "from-purple-400 to-pink-400",
    itemCount: 4,
  },
  {
    title: "研究报告",
    iconKey: "report",
    description: "State of AI / Stanford AI Index / 麦肯锡 / Gartner",
    gradient: "from-orange-400 to-amber-400",
    itemCount: 4,
  },
  {
    title: "优质 Newsletter",
    iconKey: "newsletter",
    description: "The Batch / Import AI / AI Snake Oil",
    gradient: "from-green-400 to-emerald-400",
    itemCount: 4,
  },
  {
    title: "开发者社区",
    iconKey: "community",
    description: "Hacker News / r/MachineLearning / Discord",
    gradient: "from-red-400 to-rose-400",
    itemCount: 4,
  },
  {
    title: "学习资源",
    iconKey: "learning",
    description: "fast.ai / Karpathy / 3Blue1Brown / Coursera",
    gradient: "from-indigo-400 to-purple-400",
    itemCount: 4,
  },
]

/**
 * 首页统计数字源：从各模块聚合的真实计数，
 * 供 HomeLiveStrip / PlayfulHero stats 等组件消费。
 */
export const HOME_STATS = {
  courseTracks: 7,
  ecosystemTools: 20,
  githubFeatured: GITHUB_HOT_TOTAL_FEATURED,
  resourceCategories: resourceCategoryTeasers.length,
} as const
