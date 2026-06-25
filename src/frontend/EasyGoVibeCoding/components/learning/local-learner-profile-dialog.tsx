"use client"

import { FormEvent, useState } from "react"
import { CheckCircle2, Trash2, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  clearLocalLearnerProfile,
  LEARNER_ROLE_LABELS,
  saveLocalLearnerProfile,
  type LearnerRole,
  type LocalLearnerProfile,
} from "@/lib/local-learner-profile"
import { useLocalLearnerProfile } from "@/lib/use-local-learner-profile"

interface LocalLearnerProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const roleOptions = Object.entries(LEARNER_ROLE_LABELS) as [
  LearnerRole,
  string,
][]

export function LocalLearnerProfileDialog({
  open,
  onOpenChange,
}: LocalLearnerProfileDialogProps) {
  const profile = useLocalLearnerProfile()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-2 border-purple-100 bg-white/95 text-gray-900 shadow-2xl backdrop-blur-xl sm:max-w-xl">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg">
            <UserRound className="h-5 w-5" />
          </div>
          <DialogTitle className="text-2xl font-extrabold text-gray-950">
            {profile ? "编辑本地学习档案" : "创建本地学习档案"}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-gray-600">
            我会持续维护这个免费学习产品。你可以把昵称和学习身份保存在当前浏览器，用来记录真实学习进度；资料不会上传服务器。
          </DialogDescription>
        </DialogHeader>

        <LocalLearnerProfileForm
          key={profile ? `${profile.id}-${profile.updatedAt}` : "new-profile"}
          profile={profile}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}

interface LocalLearnerProfileFormProps {
  profile: LocalLearnerProfile | null
  onOpenChange: (open: boolean) => void
}

function LocalLearnerProfileForm({
  profile,
  onOpenChange,
}: LocalLearnerProfileFormProps) {
  const [name, setName] = useState(profile?.name ?? "")
  const [role, setRole] = useState<LearnerRole>(profile?.role ?? "developer")
  const [email, setEmail] = useState(profile?.email ?? "")
  const [goal, setGoal] = useState(profile?.goal ?? "")
  const [feedbackConsent, setFeedbackConsent] = useState(
    profile?.feedbackConsent ?? false,
  )
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) {
      setError("请填写昵称，学习档案会用它来显示你的进度。")
      return
    }

    saveLocalLearnerProfile(
      {
        name,
        role,
        email,
        goal,
        feedbackConsent,
      },
      profile,
    )
    onOpenChange(false)
  }

  const handleClear = () => {
    clearLocalLearnerProfile()
    onOpenChange(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-bold text-gray-800">昵称</span>
          <Input
            value={name}
            maxLength={24}
            placeholder="例如：小王"
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(error)}
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold text-gray-800">学习身份</span>
          <select
            value={role}
            className="h-9 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            onChange={(event) => setRole(event.target.value as LearnerRole)}
          >
            {roleOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-1.5">
        <span className="text-sm font-bold text-gray-800">邮箱，可选</span>
        <Input
          type="email"
          value={email}
          maxLength={80}
          placeholder="只保存在本地，不会自动发送"
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className="space-y-1.5">
        <span className="text-sm font-bold text-gray-800">
          当前学习目标，可选
        </span>
        <Input
          value={goal}
          maxLength={80}
          placeholder="例如：先学会用 AI 做一个完整项目"
          onChange={(event) => setGoal(event.target.value)}
        />
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/70 p-3">
        <input
          type="checkbox"
          checked={feedbackConsent}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600"
          onChange={(event) => setFeedbackConsent(event.target.checked)}
        />
        <span className="text-sm leading-6 text-gray-700">
          允许我将你的学习反馈匿名整理后展示在网站上。不会公开邮箱，也不会公开未授权的个人信息。
        </span>
      </label>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}

      <DialogFooter className="gap-2 sm:justify-between">
        {profile ? (
          <Button
            type="button"
            variant="ghost"
            className="justify-center gap-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleClear}
          >
            <Trash2 className="h-4 w-4" />
            清除本地档案
          </Button>
        ) : (
          <div />
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            稍后再说
          </Button>
          <Button
            type="submit"
            className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
          >
            <CheckCircle2 className="h-4 w-4" />
            保存本地档案
          </Button>
        </div>
      </DialogFooter>
    </form>
  )
}
