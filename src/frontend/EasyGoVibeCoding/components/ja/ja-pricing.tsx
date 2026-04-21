import Link from "next/link"
import { Check, Tag } from "lucide-react"
import { JA_PRICING } from "@/lib/ja/course"

function fmtYen(v: number): string {
  return `¥${v.toLocaleString("ja-JP")}`
}

export function JaPricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <Tag className="h-3.5 w-3.5" />
            料金プラン
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            3 つのプラン ／ 先行予約特別価格
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            先行予約期間に登録された方のみ、初回公開価格でご提供します。正式販売時は価格が変更される可能性があります。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {JA_PRICING.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl border p-6 backdrop-blur transition-transform hover:-translate-y-0.5 ${
                p.highlighted
                  ? "border-sky-400/60 bg-gradient-to-b from-sky-500/15 to-card/80 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]"
                  : "border-border/60 bg-card/60"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-sky-400/60 bg-sky-500 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  もっとも選ばれているプラン
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-foreground">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.targetLine}</div>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {fmtYen(p.priceExTax)}
                </span>
                <span className="text-xs text-muted-foreground">（税抜）</span>
              </div>
              <div className="text-xs text-muted-foreground">
                税込 {fmtYen(p.priceIncTax)} ／ {p.billing}
              </div>

              <ul className="mt-5 flex-1 space-y-2">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`#waitlist?plan=${p.id}`}
                className={`mt-6 inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${
                  p.highlighted
                    ? "bg-sky-500 text-white hover:bg-sky-400"
                    : "border border-border bg-card text-foreground hover:bg-card/80"
                }`}
              >
                {p.ctaText}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          ※ 上記は日本国内向け税率 10% で計算した参考税込額です。実際の決済は Stripe 側で税率を再計算します。
          請求書払い（法人プラン）をご希望の場合は、登録時に「請求書払い希望」とご記入ください。
        </p>
      </div>
    </section>
  )
}
