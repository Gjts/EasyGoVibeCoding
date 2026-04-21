/**
 * 日本市場向けMVPコース「5大AIフレームワーク徹底解説」の定数データ。
 * ここの値が特商法・料金表・LP・予約フォームなど全ての表示源になる。
 * ブランド名や価格を変えるときはここを一箇所直せばOK。
 */

export const JA_BRAND = {
  siteName: "AI アプリ設計道場",
  siteNameEn: "AI App Design Dojo",
  tagline: "現場の技術リーダーのための、AI 実装ロードマップ",
  copyright: "© 2026 AI アプリ設計道場",
} as const

export const JA_MVP_COURSE = {
  id: "ai-frameworks-2026",
  title: "5 大 AI フレームワーク徹底解説",
  subtitle: "LangChain / LlamaIndex / LangGraph / AutoGPT / MetaGPT",
  leadline:
    "「どれを選べば失敗しないのか？」——— 現場の技術リーダーに、選定から実装までの最短距離を。",
  totalHours: "約 12 時間",
  chapterCount: 6,
  formats: ["テキスト教材", "コード例（Python / TypeScript）", "Code Map 図解", "選定比較表"] as string[],
  startSchedule: "2026 年 6 月中旬 公開予定",
  previewHref: "/advanced/ai-frameworks",
  highlights: [
    "5 大フレームワークの核となる設計思想と Code Map を 1 枚図で理解",
    "ユースケース別「どれを選ぶか」の判断基準と落とし穴",
    "LangChain × LlamaIndex × LangGraph の実装組み合わせパターン",
    "Agent（AutoGPT / MetaGPT）の運用における現場リスクと対策",
    "社内導入で押さえるべきセキュリティ・コスト・運用観点",
  ] as string[],
  chapters: [
    {
      id: "ch1",
      title: "AI フレームワーク全景 ─ なぜ乱立するのか",
      bullets: [
        "5 大フレームワークの歴史と棲み分け",
        "「LLM アプリの 4 層モデル」で全体を掴む",
        "よくある誤解と現場の失敗パターン",
      ],
    },
    {
      id: "ch2",
      title: "LangChain ─ AI アプリのオーケストレーション",
      bullets: [
        "Chain / Agent / Tool / Memory の役割分担",
        "Code Map 徹底解説 ─ どのモジュールから読むべきか",
        "本番投入時の落とし穴（コスト・レイテンシ・可観測性）",
      ],
    },
    {
      id: "ch3",
      title: "LlamaIndex ─ RAG とデータ接続の本命",
      bullets: [
        "社内ドキュメントを AI に食わせる最短経路",
        "Index / Retriever / Query Engine の選び方",
        "埋め込みモデル選定とコスト設計の実務",
      ],
    },
    {
      id: "ch4",
      title: "LangGraph ─ 状態を持つ複雑フローの正解",
      bullets: [
        "Graph × State × Edge でエージェントを設計する",
        "人間の介入ポイント（Human-in-the-loop）設計",
        "検査点・再実行・監査ログの組み込み",
      ],
    },
    {
      id: "ch5",
      title: "AutoGPT と MetaGPT ─ 自律 AI の光と影",
      bullets: [
        "AutoGPT の Goal → Plan → Execute → Reflect ループ",
        "MetaGPT のマルチエージェント SOP とは何か",
        "自律エージェントを「業務で使える」にするガードレール",
      ],
    },
    {
      id: "ch6",
      title: "選定ガイドと社内導入の実務",
      bullets: [
        "3 行で決まる選定フローチャート",
        "PoC から本番までの段階設計",
        "法務・セキュリティ・コストの合意形成テンプレート",
      ],
    },
  ] as Array<{ id: string; title: string; bullets: string[] }>,
} as const

/**
 * 日本 B2B 市場の相場感に合わせた 3 段階料金。
 * 表示時は「税込／税抜」を併記する（特商法要件）。
 */
export const JA_PRICING = [
  {
    id: "individual",
    name: "個人プラン",
    targetLine: "技術リーダー個人 / フリーランス向け",
    seats: 1,
    priceExTax: 49800,
    priceIncTax: 54780,
    billing: "買い切り（初回公開価格）",
    perks: [
      "全章のテキスト教材 + コード例",
      "Code Map 高解像度 PDF",
      "選定比較表 Excel テンプレート",
      "受講者限定 Discord（匿名可）",
      "今後 1 年間のアップデート無料",
    ],
    ctaText: "個人プランを予約する",
    highlighted: false,
  },
  {
    id: "team-5",
    name: "法人 5 席プラン",
    targetLine: "情シス・開発チーム向け（推奨）",
    seats: 5,
    priceExTax: 179000,
    priceIncTax: 196900,
    billing: "買い切り（請求書払い対応）",
    perks: [
      "個人プラン全内容を 5 名分",
      "キックオフ説明会（30 分・オンライン）",
      "社内展開用スライド テンプレート",
      "請求書 / 見積書 / 領収書の発行",
      "担当者向け質問チャネル（平日対応）",
    ],
    ctaText: "法人 5 席プランを予約する",
    highlighted: true,
  },
  {
    id: "team-10",
    name: "法人 10 席プラン",
    targetLine: "複数拠点 / 事業部向け",
    seats: 10,
    priceExTax: 299000,
    priceIncTax: 328900,
    billing: "買い切り（請求書払い対応）",
    perks: [
      "法人 5 席プランの全内容を 10 名分",
      "カスタム相談セッション 60 分 ×1",
      "導入ロードマップの個別レビュー",
      "優先サポート（48 時間以内返信）",
    ],
    ctaText: "法人 10 席プランを予約する",
    highlighted: false,
  },
] as const

export type JaPricingPlanId = (typeof JA_PRICING)[number]["id"]
