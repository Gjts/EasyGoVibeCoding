import Link from "next/link"
import { JA_BRAND } from "@/lib/ja/course"

/**
 * /ja 配下専用フッター。
 * 特商法・利用規約・プライバシー・返金ポリシーへの動線を確実に持たせる。
 */
export function JaFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold text-foreground">
              {JA_BRAND.siteName}
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {JA_BRAND.tagline}
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">コース</div>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/ja#curriculum" className="hover:text-foreground">
                  カリキュラム
                </Link>
              </li>
              <li>
                <Link href="/ja#pricing" className="hover:text-foreground">
                  料金プラン
                </Link>
              </li>
              <li>
                <Link href="/ja#faq" className="hover:text-foreground">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">法的情報</div>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/ja/tokushoho" className="hover:text-foreground">
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link href="/ja/terms" className="hover:text-foreground">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/ja/privacy" className="hover:text-foreground">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/ja/refund" className="hover:text-foreground">
                  返金ポリシー
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">その他</div>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  中文版サイト
                </Link>
              </li>
              <li>
                <Link href="/advanced/ai-frameworks" className="hover:text-foreground">
                  教材プレビュー（中国語）
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center">
          <span>{JA_BRAND.copyright}</span>
          <span>
            本サイトは現在「先行予約公開中」です。正式販売開始前に予告なく内容を変更する場合があります。
          </span>
        </div>
      </div>
    </footer>
  )
}
