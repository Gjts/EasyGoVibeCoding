import type { ElementType, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type NavItem = { title: string; href: string; label?: string } | null

interface FrameworkHeroProps {
  chapter: string
  title: string
  subtitle: string
  tagline: string
  summary: string
  imageSrc: string
  imageAlt: string
  accentClass?: string
}

export function FrameworkHero({
  chapter,
  title,
  subtitle,
  tagline,
  summary,
  imageSrc,
  imageAlt,
  accentClass = "text-primary",
}: FrameworkHeroProps) {
  return (
    <div className="mb-12">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
        {chapter}
      </div>
      <h1 className="mb-2 text-4xl font-bold text-foreground">
        <span className={accentClass}>{title}</span>
        <span className="ml-2 text-muted-foreground text-lg font-medium">
          · {subtitle}
        </span>
      </h1>
      <p className="mb-6 text-lg text-muted-foreground">{tagline}</p>

      <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-secondary/30">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={2048}
            height={1365}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-5">
        <Sparkles className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div>
          <div className="mb-1 text-sm font-semibold text-foreground">
            一句话总结
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}

interface FrameworkFooterNavProps {
  prev?: NavItem
  next?: NavItem
}

export function FrameworkFooterNav({ prev, next }: FrameworkFooterNavProps) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
      {prev ? (
        <Button variant="ghost" asChild>
          <Link href={prev.href} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {prev.label ?? `上一页：${prev.title}`}
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild>
          <Link href={next.href} className="flex items-center gap-2">
            {next.label ?? `下一页：${next.title}`}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </div>
  )
}

interface SectionTitleProps {
  icon: ElementType
  children: ReactNode
}

export function SectionTitle({ icon: Icon, children }: SectionTitleProps) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-foreground">
      <Icon className="h-6 w-6 text-primary" />
      {children}
    </h2>
  )
}
