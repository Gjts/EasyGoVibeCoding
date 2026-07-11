interface LocalizedFrameworkDiagramProps {
  title: string
  subtitle?: string
  labels?: string[]
}

export function LocalizedFrameworkDiagram({
  title,
  subtitle,
  labels = [],
}: LocalizedFrameworkDiagramProps) {
  return (
    <div className="flex min-h-52 w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 p-6 text-center text-white">
      <div className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold tracking-[0.2em]">
        FRAMEWORK MAP
      </div>
      <div>
        <div className="text-2xl font-black sm:text-3xl">{title}</div>
        {subtitle ? <div className="mt-2 text-sm text-white/70">{subtitle}</div> : null}
      </div>
      {labels.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
