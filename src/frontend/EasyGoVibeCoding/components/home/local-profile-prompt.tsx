"use client"

import { useState } from "react"
import { ShieldCheck, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocalLearnerProfileDialog } from "@/components/learning/local-learner-profile-dialog"
import { useLocalLearnerProfile } from "@/lib/use-local-learner-profile"

export function LocalProfilePrompt() {
  const profile = useLocalLearnerProfile()
  const [open, setOpen] = useState(false)

  if (profile) return null

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border-2 border-purple-200 bg-white/80 px-4 py-4 text-center shadow-lg backdrop-blur-md sm:flex-row sm:text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-md">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-gray-950">
          我会持续维护这个免费学习产品
        </p>
        <p className="mt-1 text-sm leading-6 text-gray-700">
          新来的同学可以创建本地学习档案，资料只保存在当前浏览器，用来记录你真实的访问、完成章节和学习进度。
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        className="shrink-0 gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
        onClick={() => setOpen(true)}
      >
        <UserRound className="h-4 w-4" />
        本地登录
      </Button>
      <LocalLearnerProfileDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
