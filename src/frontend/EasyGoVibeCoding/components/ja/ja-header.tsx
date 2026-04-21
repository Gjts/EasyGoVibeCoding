"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { JA_BRAND } from "@/lib/ja/course"
import { Button } from "@/components/ui/button"

/**
 * /ja 配下専用のシンプルなヘッダー。
 * MVP 時点では中国語/英語との言語切替は最小限（右上に「中文版」リンク）。
 */
export function JaHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/ja"
          className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-emerald-400 text-white shadow">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">
              {JA_BRAND.siteName}
            </span>
            <span className="hidden text-[10px] text-muted-foreground sm:inline">
              {JA_BRAND.siteNameEn}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/ja#curriculum"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            カリキュラム
          </Link>
          <Link
            href="/ja#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            料金
          </Link>
          <Link
            href="/ja#faq"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
          <Link
            href="/ja/tokushoho"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            特商法表記
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            中文版
          </Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/ja#waitlist">先行予約</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
