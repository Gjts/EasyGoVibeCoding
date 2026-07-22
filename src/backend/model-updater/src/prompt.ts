import type { ModelsPayload } from "../../../frontend/EasyGoVibeCoding/lib/model-schema"

const CURRENT_KNOWN_PROVIDERS = [
  "Anthropic",
  "OpenAI",
  "Google",
  "Alibaba",
  "Zhipu",
  "Moonshot",
  "DeepSeek",
  "xAI",
  "Meta",
]

const JSON_SHAPE_EXAMPLE = `{
  "updatedAt": "2026-06-24T00:00:00.000Z",
  "source": "perplexity-sonar",
  "models": [
    {
      "provider": "Anthropic",
      "name": "Claude Fable 5",
      "releaseDate": "2026-06-09",
      "contextWindow": "1M",
      "highlights": ["官方模型页列为最强公开模型", "模型 ID：claude-fable-5", "1M 上下文，面向高难度推理和长程 Agent"],
      "tier": 1,
      "url": "https://platform.claude.com/docs/en/about-claude/models/overview",
      "category": "model",
      "tags": ["Anthropic", "推理", "Agent", "1M上下文"],
      "description": "Anthropic 当前最高能力公开模型，适合复杂软件工程、深度研究和高自治 Agent"
    }
  ],
  "news": [
    {
      "date": "2026-06-09",
      "provider": "Anthropic",
      "title": "Claude Fable 5 正式 GA",
      "summary": "Anthropic 文档列出 Claude Fable 5 为最强公开模型，面向最高难度推理和长程 Agent 工作，1M 上下文并在主要云平台可用。",
      "url": "https://platform.claude.com/docs/en/about-claude/models/overview"
    }
  ]
}`

export interface PromptInput {
  previousPayload: ModelsPayload | null
  nowISO: string
  providerSource: string
}

export function buildSystemPrompt(): string {
  return [
    "你是一位严谨的 AI 模型情报分析师，负责从官方渠道收集主流大模型的最新发布信息。",
    "你必须：",
    "1. 仅依据可验证的官方来源（Anthropic / OpenAI / Google DeepMind / Alibaba / Zhipu / Moonshot / DeepSeek / xAI / Meta 等官方文档、模型页、博客或发布页）",
    "2. 输出严格合法的 JSON，不得输出 markdown 代码块包裹、不得输出注释、不得输出多余文字",
    "3. 所有字段必须齐全，releaseDate 使用 YYYY-MM-DD 格式",
    "4. 不确定或无可靠来源的信息必须省略，不得编造；如果官方模型页与新闻稿冲突，以官方模型页/API 文档为准",
  ].join("\n")
}

export function buildUserPrompt(input: PromptInput): string {
  const previousSummary = input.previousPayload
    ? `上一次已收录（避免重复新闻条目，仅在有真实新发布时新增）：\n${JSON.stringify(
        {
          updatedAt: input.previousPayload.updatedAt,
          models: input.previousPayload.models.map((m) => ({
            name: m.name,
            releaseDate: m.releaseDate,
          })),
          news: input.previousPayload.news.map((n) => ({
            title: n.title,
            date: n.date,
          })),
        },
        null,
        2,
      )}`
    : "（无历史数据，请做首次全量收录）"

  return [
    "请产出当前最新的主流 AI 大模型发布情报。",
    `当前 UTC 时间：${input.nowISO}`,
    `允许的 provider 列表：${CURRENT_KNOWN_PROVIDERS.join(" / ")}（其他官方厂商可新增）`,
    "",
    "输出要求：",
    "- models 数组至少包含 6 个当前主流模型，tier 分级（1=旗舰，2=平衡，3=轻量）",
    "- tier 必须按模型强度/综合能力分级，不得按发布时间或热度分级；免费、mini、lite、flash、small、XS 等轻量模型默认不能标为 tier 1，除非官方明确宣称它是当前旗舰/最高能力模型",
    "- 第一梯队首页展示固定优先顺序：Anthropic、OpenAI、xAI、Google；每家选择截至当前时间最新的通用主力模型，不得沿用上次结果中的旧代表，也不要让 mini、lite、图像、音频等轻量或专项模型占据旗舰位",
    "- news 数组按 date 倒序排列，至多 10 条，覆盖最近 6 个月内的重大发布",
    "- source 字段请填写 " + `"${input.providerSource}"`,
    "- updatedAt 使用 ISO8601 UTC 时间戳",
    "- 示例只用于说明 JSON 形状，不要沿用示例模型名；必须按当前日期重新核验官方来源",
    "",
    "JSON 形状示例（仅示例，请用真实最新数据）：",
    JSON_SHAPE_EXAMPLE,
    "",
    previousSummary,
    "",
    "现在请直接输出满足上述 Schema 的 JSON，不要任何额外文字。",
  ].join("\n")
}
