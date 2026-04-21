import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

/**
 * 中文首页顶部展示的日本市场先行预约入口。
 * 不遮挡内容，仅做轻提醒，同时给运营者一个可见的市场信号。
 */
export function JaMarketBanner() {
  return (
    <div className="border-b border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-2 text-center text-[13px] text-foreground sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 items-center gap-1 rounded-full border border-amber-400/60 bg-amber-500/15 px-2 text-[11px] font-semibold text-amber-200">
            <Sparkles className="h-3 w-3" />
            NEW
          </span>
          <span className="text-sm text-foreground/90">
            日本市场先行予約サイト公开中 ·「5 大 AI フレームワーク徹底解説」
          </span>
        </div>
        <Link
          href="/ja"
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-200 hover:text-sky-100"
        >
          前往日文站
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
