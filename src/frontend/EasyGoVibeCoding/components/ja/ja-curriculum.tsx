import Link from "next/link"
import { BookOpen, ArrowRight, Sparkles } from "lucide-react"
import { JA_MVP_COURSE } from "@/lib/ja/course"

export function JaCurriculum() {
  return (
    <section id="curriculum" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
            <BookOpen className="h-3.5 w-3.5" />
            カリキュラム
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            全 {JA_MVP_COURSE.chapterCount} 章 ／ 現場の判断軸が手に入る
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            各章は「設計思想 → Code Map → 現場の落とし穴」の構成で統一。
            動画に頼らず、読んで考えて社内で展開できる教材です。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {JA_MVP_COURSE.chapters.map((ch, i) => (
            <article
              key={ch.id}
              className="group rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-colors hover:border-sky-400/40 hover:bg-card/80"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 text-sm font-semibold text-sky-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-foreground">{ch.title}</h3>
              </div>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {ch.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-sky-200" />
            <p className="text-sm text-foreground">
              教材の一部を中国語版でプレビュー公開中。構成と深さをご確認いただけます。
            </p>
          </div>
          <Link
            href={JA_MVP_COURSE.previewHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-200 hover:text-sky-100"
          >
            中国語版プレビューを見る
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {JA_MVP_COURSE.formats.map((f) => (
            <span
              key={f}
              className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
