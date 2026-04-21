import { ExternalLink, Github, Globe } from "lucide-react"

type CaseItem = {
  name: string
  description: string
  href: string
  tag?: string
  kind?: "github" | "site" | "docs"
}

interface CaseStudyLinksProps {
  items: readonly CaseItem[]
  /** tailwind 颜色变量（参考详解页配色） */
  accentBorder: string
  accentBg: string
  accentText: string
  footnote?: string
}

export function CaseStudyLinks({
  items,
  accentBorder,
  accentBg,
  accentText,
  footnote,
}: CaseStudyLinksProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => {
        const KindIcon =
          item.kind === "github"
            ? Github
            : item.kind === "site"
              ? Globe
              : ExternalLink
        return (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className={`group flex items-start gap-3 rounded-xl border-2 ${accentBorder} ${accentBg} p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${accentText}`}
            >
              <KindIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${accentText}`}>
                  {item.name}
                </span>
                {item.tag && (
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        )
      })}
      {footnote && (
        <p className="md:col-span-2 text-xs text-muted-foreground">
          {footnote}
        </p>
      )}
    </div>
  )
}
