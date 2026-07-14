"use client"

import { Download, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { LaunchReport as LaunchReportModel } from "@/lib/super-individual/report"

const STATUS_LABELS: Record<LaunchReportModel["stages"][number]["status"], string> = {
  complete: "已完成",
  "in-progress": "进行中",
  "not-started": "未开始",
}

export function LaunchReport({ report }: { report: LaunchReportModel }) {
  function downloadJson() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `super-individual-launch-report-${report.generatedAt.slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8" data-print-report>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-700">课程交付物</p>
          <h2 className="mt-1 text-2xl font-black text-gray-950">个人产品上线手册</h2>
          <p className="mt-2 text-sm text-gray-600">生成时间：{new Date(report.generatedAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2" data-print-hide>
          <Button
            type="button"
            variant="ghost"
            className="border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:text-gray-950"
            onClick={() => window.print()}
          >
            <Printer className="mr-2 h-4 w-4" />打印 / 保存为 PDF
          </Button>
          <Button type="button" onClick={downloadJson}><Download className="mr-2 h-4 w-4" />导出 JSON</Button>
        </div>
      </div>

      <dl className="grid gap-3 rounded-2xl bg-gray-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {report.profileSummary.map((item) => <div key={item.label}><dt className="text-xs font-semibold text-gray-500">{item.label}</dt><dd className="mt-1 text-sm font-bold text-gray-950">{item.value}</dd></div>)}
      </dl>

      {report.globalWarnings.length > 0 && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><h3 className="font-bold text-amber-950">全局提醒</h3><ul className="mt-2 space-y-1 text-sm text-amber-900">{report.globalWarnings.map((warning) => <li key={warning}>• {warning}</li>)}</ul></div>}

      <div className="space-y-4">
        {report.stages.map((stage, index) => <article key={stage.id} className="break-inside-avoid rounded-2xl border border-gray-200 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold text-gray-950">{index + 1}. {stage.title}</h3><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{STATUS_LABELS[stage.status]}</span></div><h4 className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">阶段成果</h4><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-800">{stage.artifact}</p>{stage.tools.length > 0 && <div className="mt-4 space-y-3"><h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">工具与官方来源</h4>{stage.tools.map((tool) => <div key={tool.name} className="rounded-xl bg-gray-50 p-4"><p className="font-semibold text-gray-950">{tool.name} <span className="text-xs font-normal text-gray-500">核验于 {tool.lastVerifiedAt}</span></p><ul className="mt-2 space-y-1 text-sm text-gray-700">{tool.reasons.map((reason) => <li key={reason}>• {reason}</li>)}</ul>{tool.warnings.length > 0 && <p className="mt-2 text-xs leading-5 text-amber-800">{tool.warnings.join("；")}</p>}<div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">{tool.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-violet-700 underline">{source.label}</a>)}</div></div>)}</div>}</article>)}
      </div>
    </section>
  )
}
