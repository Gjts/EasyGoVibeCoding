import Link from "next/link"
import { ArrowLeft } from "lucide-react"

/**
 * 法的ページ用の共通レイアウト。
 * - 「準備中」のラベルを目立つ位置に置き、誠実さを担保する
 * - /ja 配下の法的ページ 4 種で共有
 */
export function JaLegalPage({
  title,
  draft = false,
  lastUpdated,
  children,
}: {
  title: string
  /** 未確定項目が含まれる場合 true にすると目立つバナーを表示 */
  draft?: boolean
  /** 例: "2026 年 4 月 21 日" */
  lastUpdated?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/ja"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        トップに戻る
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>

      {lastUpdated && (
        <p className="mt-1 text-xs text-muted-foreground">最終更新日: {lastUpdated}</p>
      )}

      {draft && (
        <div className="mt-5 rounded-xl border border-amber-400/40 bg-amber-500/10 p-4 text-xs text-amber-200">
          <p className="font-semibold">【準備中】</p>
          <p className="mt-1 leading-relaxed">
            本サイトは先行予約サイトとして公開されており、運営主体の法人登記・本人確認などの一部項目は確定前です。
            正式販売開始時に、実際の事業者情報に置き換わります。現時点で購入・決済は行っていません。
          </p>
        </div>
      )}

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-sky-200 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  )
}
