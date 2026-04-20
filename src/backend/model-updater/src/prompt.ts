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
  "updatedAt": "2026-04-20T12:00:00.000Z",
  "source": "perplexity-sonar",
  "models": [
    {
      "provider": "Anthropic",
      "name": "Claude Opus 4.7",
      "releaseDate": "2026-04-15",
      "contextWindow": "200K",
      "highlights": ["SWE-bench 82.3%", "更强推理"],
      "tier": 1,
      "url": "https://www.anthropic.com/news/claude-opus-4-7",
      "category": "model",
      "tags": ["Anthropic", "编程", "200K上下文"],
      "description": "最新旗舰模型，编程能力领先"
    }
  ],
  "news": [
    {
      "date": "2026-04-15",
      "provider": "Anthropic",
      "title": "Claude Opus 4.7 正式发布",
      "summary": "Anthropic 发布 Claude Opus 4.7，SWE-bench 提升至 82.3%。",
      "url": "https://www.anthropic.com/news/claude-opus-4-7"
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
    "1. 仅依据可验证的官方来源（Anthropic / OpenAI / Google DeepMind / Alibaba / Zhipu / Moonshot / DeepSeek / xAI / Meta 等官方博客或发布页）",
    "2. 输出严格合法的 JSON，不得输出 markdown 代码块包裹、不得输出注释、不得输出多余文字",
    "3. 所有字段必须齐全，releaseDate 使用 YYYY-MM-DD 格式",
    "4. 不确定或无可靠来源的信息必须省略，不得编造",
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
    "- news 数组按 date 倒序排列，至多 10 条，覆盖最近 6 个月内的重大发布",
    "- source 字段请填写 " + `"${input.providerSource}"`,
    "- updatedAt 使用 ISO8601 UTC 时间戳",
    "",
    "JSON 形状示例（仅示例，请用真实最新数据）：",
    JSON_SHAPE_EXAMPLE,
    "",
    previousSummary,
    "",
    "现在请直接输出满足上述 Schema 的 JSON，不要任何额外文字。",
  ].join("\n")
}
