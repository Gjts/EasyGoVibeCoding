"use client"

import { useEffect, useState, useTransition } from "react"
import { CheckCircle2, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JA_PRICING, type JaPricingPlanId } from "@/lib/ja/course"
import { registerEntry } from "@/lib/ja/waitlist"

type FormState = {
  email: string
  company: string
  role: string
  interestedPlan: JaPricingPlanId | "undecided"
  notes: string
}

const INITIAL: FormState = {
  email: "",
  company: "",
  role: "",
  interestedPlan: "undecided",
  notes: "",
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }

export function JaWaitlistForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash
    const qIndex = hash.indexOf("?")
    if (qIndex < 0) return
    const params = new URLSearchParams(hash.slice(qIndex + 1))
    const plan = params.get("plan")
    if (!plan || !JA_PRICING.some((p) => p.id === plan)) return
    // requestAnimationFrame で後続のフレームに setState を逃がし、
    // useEffect 同期内での cascading render を避ける
    const raf = window.requestAnimationFrame(() => {
      setForm((prev) => ({ ...prev, interestedPlan: plan as JaPricingPlanId }))
    })
    return () => window.cancelAnimationFrame(raf)
  }, [])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status.kind === "submitting") return
    setStatus({ kind: "submitting" })
    startTransition(async () => {
      const res = await registerEntry({
        email: form.email,
        company: form.company,
        role: form.role,
        interestedPlan: form.interestedPlan,
        notes: form.notes,
      })
      if (res.ok) {
        setStatus({
          kind: "success",
          message:
            res.remote === "sent"
              ? "ご登録ありがとうございます。公開 1 週間前にご連絡いたします。"
              : "ご登録を受け付けました。公開 1 週間前にご連絡いたします。",
        })
        setForm(INITIAL)
        return
      }
      if (res.reason === "duplicate") {
        setStatus({
          kind: "error",
          message:
            "このメールアドレスは既に登録されています。別アドレスをお試しください。",
        })
        return
      }
      if (res.reason === "invalid-email") {
        setStatus({
          kind: "error",
          message: "メールアドレスの形式が正しくありません。",
        })
        return
      }
      setStatus({
        kind: "error",
        message: "登録に失敗しました。時間をおいて再度お試しください。",
      })
    })
  }

  return (
    <section
      id="waitlist"
      className="relative py-16 sm:py-20"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-sky-950/20 to-background" />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl border border-sky-400/30 bg-card/70 p-6 shadow-xl shadow-sky-950/20 backdrop-blur sm:p-10">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              <Send className="h-3.5 w-3.5" />
              先行予約 ／ 公開時に最優先でご案内
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              先行予約に登録する
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              メールアドレスのみ必須。1 分以内に完了します。
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="メールアドレス" required>
              <input
                type="email"
                required
                autoComplete="email"
                disabled={isPending}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@example.com"
                className="h-11 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-sky-400 focus:bg-background"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="会社名（任意）">
                <input
                  type="text"
                  autoComplete="organization"
                  disabled={isPending}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="株式会社〇〇"
                  className="h-11 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-sky-400 focus:bg-background"
                />
              </Field>
              <Field label="役職 / 立場（任意）">
                <input
                  type="text"
                  autoComplete="organization-title"
                  disabled={isPending}
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="例: 技術リード、CTO、情シス"
                  className="h-11 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-sky-400 focus:bg-background"
                />
              </Field>
            </div>

            <Field label="興味のあるプラン">
              <select
                value={form.interestedPlan}
                disabled={isPending}
                onChange={(e) =>
                  update("interestedPlan", e.target.value as FormState["interestedPlan"])
                }
                className="h-11 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-sm text-foreground outline-none transition-colors focus:border-sky-400 focus:bg-background"
              >
                <option value="undecided">まだ決めていない</option>
                {JA_PRICING.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="ひとこと（任意）">
              <textarea
                rows={3}
                disabled={isPending}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="例: 社内導入を検討中 ／ 請求書払い希望 ／ Agent の選定で悩んでいる"
                className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-sky-400 focus:bg-background"
              />
            </Field>

            {status.kind === "error" && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
            {status.kind === "success" && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isPending || status.kind === "submitting"}
              className="w-full rounded-full"
            >
              {isPending || status.kind === "submitting"
                ? "送信中…"
                : "先行予約に登録する"}
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              登録いただいたメールアドレスは、本コースのご案内のみに使用します。
              詳細は
              <a href="/ja/privacy" className="mx-1 text-sky-200 hover:underline">
                プライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground">
        {label}
        {required && <span className="text-rose-300">*</span>}
      </span>
      {children}
    </label>
  )
}
