"use client"

import { useState } from "react"
import { Bot, LoaderCircle, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CoachClientError, requestCoachFeedback } from "@/lib/super-individual/coach-client"
import type { CoachResponse, SuperIndividualStageId } from "@/lib/super-individual/types"

const errorCopy: Record<string, string> = {
  unconfigured: "AI 教练尚未配置。规则推荐和课程任务仍可正常使用。",
  timeout: "AI 响应超时，请稍后重试。你的答案已经保存在浏览器中。",
  "rate-limited": "AI 请求过多，请稍后重试。规则推荐不会受影响。",
  "invalid-response": "AI 返回格式不完整，未采用这次结果。",
  "upstream-failed": "AI 服务暂时不可用，规则推荐和阶段成果仍可继续。",
}

export function CoachPanel({
  stageId,
  answers,
  candidateTools,
  existingFeedback,
  onFeedback,
}: {
  stageId: SuperIndividualStageId
  answers: Record<string, string>
  candidateTools: string[]
  existingFeedback?: CoachResponse
  onFeedback: (feedback: CoachResponse) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const askCoach = async () => {
    setLoading(true)
    setError("")
    try {
      const feedback = await requestCoachFeedback({
        locale: document.documentElement.lang || "zh-CN",
        stageId,
        answers,
        candidateTools: candidateTools.slice(0, 3),
        action: "feedback",
      })
      onFeedback(feedback)
    } catch (caught) {
      const code = caught instanceof CoachClientError ? caught.code : "upstream-failed"
      setError(errorCopy[code] ?? errorCopy["upstream-failed"])
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-5">
      <div className="flex items-start gap-3">
        <Bot className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-violet-950">AI 教练</h3>
          <p className="mt-1 text-sm leading-6 text-violet-900/75">规则引擎已经给出基础路线。AI 只负责追问、解释和补齐遗漏，不判断开户或合规资格。</p>
          {existingFeedback && <div className="mt-4 space-y-3 rounded-xl bg-white p-4 text-sm text-gray-700"><p className="leading-6">{existingFeedback.feedback}</p>{existingFeedback.followUpQuestions.length > 0 && <ul className="space-y-1">{existingFeedback.followUpQuestions.map((item) => <li key={item}>• {item}</li>)}</ul>}<p className="border-t pt-3 font-medium">建议成果：{existingFeedback.suggestedArtifact}</p>{existingFeedback.disclaimer && <p className="text-xs text-amber-700">{existingFeedback.disclaimer}</p>}</div>}
          {error && <p role="alert" className="mt-3 text-sm font-medium text-amber-800">{error}</p>}
          <Button
            type="button"
            variant="ghost"
            className="mt-4 border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:text-gray-950 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-100"
            disabled={loading || Object.keys(answers).length === 0}
            onClick={askCoach}
          >
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
            {existingFeedback ? "重新获取反馈" : "让 AI 检查我的答案"}
          </Button>
        </div>
      </div>
    </aside>
  )
}
