"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, FileText, Lightbulb, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CoachPanel } from "@/components/super-individual/coach-panel"
import { ProfileWizard } from "@/components/super-individual/profile-wizard"
import { ToolRecommendationCard } from "@/components/super-individual/tool-recommendation-card"
import { getStage, renderArtifact } from "@/lib/super-individual/curriculum"
import { recommendTools } from "@/lib/super-individual/decision-engine"
import { TOOL_CATALOG } from "@/lib/super-individual/tool-catalog"
import type { SuperIndividualStageId } from "@/lib/super-individual/types"
import { useSuperIndividualWorkspace } from "@/lib/super-individual/use-workspace"

export function StageWorkbench({ stageIds }: { stageIds: SuperIndividualStageId[] }) {
  const [activeStageId, setActiveStageId] = useState(stageIds[0])
  const [error, setError] = useState("")
  const {
    workspace,
    setProfile,
    setAnswer,
    setRecommendations,
    setArtifact,
    setAIFeedback,
    markStageComplete,
  } = useSuperIndividualWorkspace()
  const stage = getStage(activeStageId)
  const answers = workspace.stageAnswers[activeStageId] ?? {}
  const recommendations = useMemo(
    () => workspace.profile ? recommendTools(workspace.profile, activeStageId, TOOL_CATALOG) : [],
    [activeStageId, workspace.profile],
  )

  if (!workspace.profile) return <ProfileWizard onSave={setProfile} />

  const saveOutput = () => {
    setRecommendations(activeStageId, recommendations)
    setArtifact(activeStageId, renderArtifact(stage, answers))
  }

  return (
    <div className="space-y-6">
      <nav className="flex gap-2 overflow-x-auto pb-2" aria-label="当前模块阶段">
        {stageIds.map((stageId) => {
          const item = getStage(stageId)
          const active = stageId === activeStageId
          const complete = workspace.stageStatus[stageId] === "complete"
          return (
            <button key={stageId} type="button" onClick={() => { setActiveStageId(stageId); setError("") }} className={`min-w-fit rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-violet-700 text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-violet-300"}`} aria-current={active ? "step" : undefined}>
              {complete ? "✓ " : `${item.order}. `}{item.title}
            </button>
          )
        })}
      </nav>

      <section aria-labelledby={`${stage.id}-title`} className="space-y-6">
        <header className="rounded-3xl bg-gradient-to-br from-violet-700 via-fuchsia-700 to-pink-600 p-7 text-white shadow-lg">
          <p className="text-sm font-semibold text-white/75">第 {stage.order} / 10 阶段</p>
          <h1 id={`${stage.id}-title`} className="mt-2 text-3xl font-extrabold sm:text-4xl">{stage.title}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-white/90">{stage.summary}</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="flex items-center gap-2 font-bold text-emerald-950"><Lightbulb className="h-5 w-5" />核心原则</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-950/80">{stage.principles.map((item) => <li key={item}>• {item}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="flex items-center gap-2 font-bold text-amber-950"><TriangleAlert className="h-5 w-5" />常见错误</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950/80">{stage.mistakes.map((item) => <li key={item}>• {item}</li>)}</ul>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-950">完成当前决策</h2>
          <div className="mt-6 space-y-6">
            {stage.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={`${stage.id}-${question.id}`}>{question.label}</Label>
                <p id={`${stage.id}-${question.id}-help`} className="text-xs leading-5 text-gray-500">{question.help}</p>
                {question.kind === "textarea" ? (
                  <Textarea id={`${stage.id}-${question.id}`} aria-describedby={`${stage.id}-${question.id}-help`} value={answers[question.id] ?? ""} onChange={(event) => setAnswer(stage.id, question.id, event.target.value)} rows={4} />
                ) : question.kind === "single" && question.options ? (
                  <select id={`${stage.id}-${question.id}`} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={answers[question.id] ?? ""} onChange={(event) => setAnswer(stage.id, question.id, event.target.value)}>
                    <option value="">请选择</option>
                    {question.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : (
                  <Input id={`${stage.id}-${question.id}`} aria-describedby={`${stage.id}-${question.id}-help`} value={answers[question.id] ?? ""} onChange={(event) => setAnswer(stage.id, question.id, event.target.value)} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-950">适合当前约束的工具</h2>
          <div className="grid gap-4 lg:grid-cols-2">{recommendations.map((recommendation) => {
            const tool = TOOL_CATALOG.find((item) => item.id === recommendation.toolId)
            return tool ? <ToolRecommendationCard key={tool.id} recommendation={recommendation} tool={tool} /> : null
          })}</div>
        </div>

        <CoachPanel
          stageId={stage.id}
          answers={answers}
          candidateTools={recommendations.map((item) => item.toolId)}
          existingFeedback={workspace.aiFeedback[stage.id]}
          onFeedback={(feedback) => setAIFeedback(stage.id, feedback)}
        />

        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-violet-950"><FileText className="h-5 w-5" />{stage.artifactTitle}</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-white p-5 text-sm leading-7 text-gray-700 ring-1 ring-violet-100">{workspace.artifacts[stage.id] ?? renderArtifact(stage, answers)}</pre>
          {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={saveOutput}>生成并保存成果</Button>
            <Button type="button" onClick={() => {
              try {
                saveOutput()
                markStageComplete(stage.id, stage.questions.filter((question) => question.required).map((question) => question.id))
                setError("")
              } catch (caught) {
                setError(caught instanceof Error ? `请先完成必填项：${caught.message.split(": ")[1] ?? "未知字段"}` : "请先完成全部必填项。")
              }
            }}><CheckCircle2 className="mr-2 h-4 w-4" />完成此阶段</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
