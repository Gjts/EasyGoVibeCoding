import { Bot } from "lucide-react"

export function CoachPanel() {
  return (
    <aside className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-5">
      <div className="flex items-start gap-3">
        <Bot className="mt-0.5 h-5 w-5 text-violet-700" />
        <div>
          <h3 className="font-bold text-violet-950">AI 教练</h3>
          <p className="mt-1 text-sm leading-6 text-violet-900/75">
            先完成当前阶段问题。系统会始终保留规则推荐；AI 连接可用时再提供追问和解释，不替你判断开户或合规资格。
          </p>
        </div>
      </div>
    </aside>
  )
}
