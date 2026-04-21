import Link from "next/link"
import { ShieldCheck, HelpCircle, UserCog, FileText } from "lucide-react"

/**
 * 運営者プロフィールは現時点では「正式な法人化・本人確認前」のため、
 * 誇張せず、実在するアセットに限定して信頼を積み上げる。
 * - 中国語版の既存教材を公開済み
 * - 五大フレームワーク解説ページが実物としてある
 * - 特商法表記・プライバシーポリシー等の法的ページを用意している
 * 改善余地のある点は正直に「準備中」と記す。
 */
const trustPoints = [
  {
    icon: FileText,
    title: "実在する教材資産",
    body: "AI フレームワーク全景図、Code Map 解説、章立ての本文が既に中国語版で公開されています。日本語版はこのコンテンツを基に再編集して提供します。",
  },
  {
    icon: UserCog,
    title: "運営者情報",
    body: "運営主体の法人登記・特商法表記については「特定商取引法に基づく表記」ページをご確認ください（一部準備中）。",
  },
  {
    icon: ShieldCheck,
    title: "個人情報の取り扱い",
    body: "予約登録時に取得する情報はメール・会社名・役職のみ。第三者提供は行いません。詳細はプライバシーポリシーをご確認ください。",
  },
]

const faqs = [
  {
    q: "いつ受講できますか？",
    a: "2026 年 6 月中旬の公開を予定しています。先行予約された方にのみ、公開日の 1 週間前にメールでご案内します。",
  },
  {
    q: "動画はありますか？",
    a: "MVP 版はテキスト教材 + コード例 + 図解が中心です。動画・ハンズオンは受講者フィードバックを見て第 2 弾で追加予定です。",
  },
  {
    q: "返金はできますか？",
    a: "購入後 14 日以内、かつ受講進捗が 30% 未満の場合、返金に対応します。詳細は「返金ポリシー」をご確認ください。",
  },
  {
    q: "法人として請求書で支払えますか？",
    a: "法人 5 席・法人 10 席プランは請求書払いに対応します。予約フォームの備考欄に「請求書払い希望」とご記入ください。",
  },
  {
    q: "Konbini（コンビニ決済）や銀行振込は使えますか？",
    a: "正式販売時は Stripe 経由でクレジットカード、コンビニ決済、銀行振込に対応予定です。現在は先行予約のみで、決済は行いません。",
  },
  {
    q: "英語版・中国語版はありますか？",
    a: "中国語版は既に公開しています（本サイト下部の「中文版」リンクから）。英語版は未定です。",
  },
]

export function JaTrustFaq() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              運営と信頼
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              「誇張しない」を運営指針に
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              先行予約段階のため、できていないことは正直に「準備中」と書きます。法的情報は下記リンクからご確認いただけます。
            </p>

            <ul className="mt-6 space-y-4">
              {trustPoints.map((t) => {
                const Icon = t.icon
                return (
                  <li
                    key={t.title}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-card/60 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.title}</div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {t.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <Link
                href="/ja/tokushoho"
                className="text-sky-200 hover:text-sky-100"
              >
                特商法表記
              </Link>
              <span className="text-muted-foreground">／</span>
              <Link href="/ja/privacy" className="text-sky-200 hover:text-sky-100">
                プライバシーポリシー
              </Link>
              <span className="text-muted-foreground">／</span>
              <Link href="/ja/terms" className="text-sky-200 hover:text-sky-100">
                利用規約
              </Link>
              <span className="text-muted-foreground">／</span>
              <Link href="/ja/refund" className="text-sky-200 hover:text-sky-100">
                返金ポリシー
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
              <HelpCircle className="h-3.5 w-3.5" />
              よくある質問
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              FAQ
            </h2>
            <div className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group px-5 py-4 open:bg-card/80"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                    {f.q}
                    <span className="ml-4 text-xs text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
