import type { Metadata } from "next"
import { JaHeader } from "@/components/ja/ja-header"
import { JaFooter } from "@/components/ja/ja-footer"

export const metadata: Metadata = {
  title: "AI アプリ設計道場 ｜ 5 大 AI フレームワーク徹底解説",
  description:
    "現場の技術リーダーのための日本語 AI 実装コース。LangChain / LlamaIndex / LangGraph / AutoGPT / MetaGPT の選定から本番投入まで。2026 年 6 月中旬公開予定、先行予約受付中。",
  alternates: {
    languages: {
      "zh-CN": "/",
      "ja-JP": "/ja",
    },
  },
  openGraph: {
    title: "AI アプリ設計道場 ｜ 5 大 AI フレームワーク徹底解説",
    description:
      "現場の技術リーダーのための日本語 AI 実装コース。2026 年 6 月中旬公開予定、先行予約受付中。",
    locale: "ja_JP",
    type: "website",
  },
}

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ja" className="min-h-screen bg-background text-foreground">
      <JaHeader />
      <main>{children}</main>
      <JaFooter />
    </div>
  )
}
