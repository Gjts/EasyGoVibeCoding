"use client"

import Link from "next/link"
import { ArrowRight, CircleCheckBig, RotateCcw, Route } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProfileWizard } from "@/components/super-individual/profile-wizard"
import { SUPER_INDIVIDUAL_STAGES } from "@/lib/super-individual/curriculum"
import { getProfileWarnings } from "@/lib/super-individual/decision-engine"
import { useSuperIndividualWorkspace } from "@/lib/super-individual/use-workspace"

export function JourneyDashboard() {
  const { workspace, setProfile, reset, storageAvailable } = useSuperIndividualWorkspace()
  if (!workspace.profile) return <ProfileWizard onSave={setProfile} />

  const completeCount = Object.values(workspace.stageStatus).filter((status) => status === "complete").length
  const nextStage = SUPER_INDIVIDUAL_STAGES.find((stage) => workspace.stageStatus[stage.id] !== "complete")
  const warnings = getProfileWarnings(workspace.profile)

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gray-950 p-7 text-white shadow-xl sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-fuchsia-300">你的个人产品操作系统</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">从需求信号走到上线、收款和数据决策</h1>
            <p className="mt-4 max-w-2xl leading-7 text-gray-300">每一步都产出可复用资产；工具推荐根据你的主体、地区、产品、预算和数据敏感度变化。</p>
          </div>
          <div className="min-w-48 rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-gray-300">课程进度</p>
            <p className="mt-1 text-3xl font-black">{completeCount} / 10</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" style={{ width: `${completeCount * 10}%` }} /></div>
          </div>
        </div>
      </section>

      {!storageAvailable && <p role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">当前浏览器无法使用本地存储。请在离开页面前导出成果。</p>}

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">当前约束</p>
          <p className="mt-2 font-bold text-gray-950">{workspace.profile.region} · {workspace.profile.entityType} · {workspace.profile.productType}</p>
          <p className="mt-2 text-sm text-gray-600">预算：{workspace.profile.monthlyBudget} · 数据：{workspace.profile.dataSensitivity}</p>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">下一步</p>
          <p className="mt-2 font-bold text-violet-950">{nextStage ? `${nextStage.order}. ${nextStage.title}` : "十个阶段已完成"}</p>
          {nextStage && <Link href={nextStage.route} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline">继续执行 <ArrowRight className="h-4 w-4" /></Link>}
        </div>
      </section>

      {warnings.length > 0 && <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><h2 className="font-bold text-amber-950">当前路线提醒</h2><ul className="mt-2 space-y-2 text-sm text-amber-900">{warnings.map((warning) => <li key={warning}>• {warning}</li>)}</ul></section>}

      <section>
        <div className="mb-5 flex items-center gap-2"><Route className="h-5 w-5 text-violet-700" /><h2 className="text-xl font-bold text-gray-950">十阶段课程地图</h2></div>
        <div className="grid gap-4 md:grid-cols-2">{SUPER_INDIVIDUAL_STAGES.map((stage) => {
          const complete = workspace.stageStatus[stage.id] === "complete"
          return <Link key={stage.id} href={stage.route} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold text-violet-600">第 {stage.order} 阶段</p><h3 className="mt-1 font-bold text-gray-950">{stage.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{stage.summary}</p></div>{complete ? <CircleCheckBig className="h-6 w-6 shrink-0 text-emerald-600" /> : <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-violet-600" />}</div></Link>
        })}</div>
      </section>

      <div className="flex justify-end border-t pt-5"><Button type="button" variant="ghost" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />重新开始课程</Button></div>
    </div>
  )
}
