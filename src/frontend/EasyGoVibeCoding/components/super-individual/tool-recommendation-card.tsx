import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react"

import type { ToolCatalogItem, ToolRecommendation } from "@/lib/super-individual/types"

export function ToolRecommendationCard({
  recommendation,
  tool,
}: {
  recommendation: ToolRecommendation
  tool: ToolCatalogItem
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            {recommendation.rank === "default" ? "默认建议" : "备选方案"}
          </span>
          <h3 className="mt-1 text-lg font-bold text-gray-950">{tool.name}</h3>
        </div>
        <a className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline" href={tool.officialUrl} target="_blank" rel="noreferrer">
          官方资料 <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{tool.freeTierSummary}</p>
      <div className="mt-4 space-y-2">
        {recommendation.reasons.map((reason) => (
          <p key={reason} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{reason}</p>
        ))}
        {recommendation.warnings.map((warning) => (
          <p key={warning} className="flex gap-2 text-sm text-amber-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{warning}</p>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">最后核验：{tool.lastVerifiedAt}</p>
    </article>
  )
}
