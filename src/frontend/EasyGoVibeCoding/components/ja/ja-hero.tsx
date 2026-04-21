import Link from "next/link"
import { Sparkles, ArrowRight, Clock, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JA_MVP_COURSE } from "@/lib/ja/course"

/**
 * /ja トップの最初のビュー。
 * 「先行予約サイト」であることを明示し、信頼を損なわないデザインを目指す。
 */
export function JaHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-950/20 via-background to-background" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
            <Sparkles className="h-3.5 w-3.5" />
            先行予約サイト公開中 ／ {JA_MVP_COURSE.startSchedule}
          </div>

          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {JA_MVP_COURSE.title}
          </h1>
          <p className="mt-3 text-base text-sky-200/90 sm:text-lg">
            {JA_MVP_COURSE.subtitle}
          </p>
          <p className="mt-6 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            {JA_MVP_COURSE.leadline}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="#waitlist" className="flex items-center gap-2">
                先行予約に登録する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="#curriculum">カリキュラムを見る</Link>
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            メール 1 件のみ入力 ／ 1 分以内 ／ いつでも解除可能
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoChip icon={Clock} label="総学習時間" value={JA_MVP_COURSE.totalHours} />
          <InfoChip
            icon={BookOpen}
            label="章立て"
            value={`全 ${JA_MVP_COURSE.chapterCount} 章`}
          />
          <InfoChip icon={Users} label="対象者" value="現場の技術リーダー" />
        </div>
      </div>
    </section>
  )
}

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-4 py-3 backdrop-blur">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  )
}
