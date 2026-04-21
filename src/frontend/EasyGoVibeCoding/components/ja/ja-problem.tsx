import { AlertTriangle, CheckCircle2 } from "lucide-react"

const pains = [
  {
    title: "「どのフレームワークを選ぶべきか」現場で毎月議論している",
    body: "LangChain / LlamaIndex / LangGraph / AutoGPT / MetaGPT ─── 公式ドキュメントだけでは棲み分けが見えない。",
  },
  {
    title: "PoC は作れるが、本番投入が怖い",
    body: "コスト・レイテンシ・セキュリティ・監査ログ。社内稟議を通すための観点がそろっていない。",
  },
  {
    title: "Agent / マルチエージェントの“落とし穴”が分からない",
    body: "自律エージェントは派手だが、業務で使うには何を抑えるべきか情報が散在している。",
  },
  {
    title: "教材が英語中心で、社内展開できる形になっていない",
    body: "部下やメンバーに渡せる、日本語で構造化された教材が欲しい。",
  },
]

const deliverables = [
  "5 大フレームワークの Code Map を 1 枚で持ち帰れる",
  "「どのケースでどれを選ぶか」の判断基準を社内で共有できる",
  "PoC → 本番化の段階設計テンプレートをそのまま流用できる",
  "セキュリティ・コスト・運用観点の合意形成フォーマットを手に入れる",
]

export function JaProblem() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              現場のリアル
            </div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              こんな課題、感じていませんか？
            </h2>
            <ul className="mt-5 space-y-4">
              {pains.map((p) => (
                <li key={p.title} className="rounded-xl border border-border/60 bg-card/60 p-4">
                  <div className="text-sm font-semibold text-foreground">{p.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              本コースで得られるもの
            </div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              受講後、あなたは &ldquo;選定できる&rdquo; 側になる
            </h2>
            <ul className="mt-5 space-y-3">
              {deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-foreground">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
              「動くサンプル」ではなく、「社内で通る設計意思決定」が本コースの成果物です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
