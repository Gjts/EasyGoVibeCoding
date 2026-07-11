"use client"

import type { FormEvent, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  INITIAL_SPONSOR_INQUIRY_FORM,
  SPONSOR_BUDGET_OPTIONS,
  SPONSOR_CAMPAIGN_GOAL_OPTIONS,
  SPONSOR_GITHUB_CONTACT_URL,
  SPONSOR_INQUIRY_COPY,
  SPONSOR_INQUIRY_MAX_LENGTHS,
  submitSponsorInquiry,
  type SponsorInquiryFormState,
} from "@/lib/sponsor-inquiry-client"

type SubmitState =
  | { kind: "idle"; message: "" }
  | { kind: "submitting" | "success" | "error"; message: string }

const IDLE_STATUS: SubmitState = { kind: "idle", message: "" }

export function SponsorInquiryForm() {
  const [form, setForm] = useState<SponsorInquiryFormState>(() => ({
    ...INITIAL_SPONSOR_INQUIRY_FORM,
  }))
  const [status, setStatus] = useState<SubmitState>(IDLE_STATUS)
  const statusRef = useRef<HTMLDivElement>(null)
  const submittingRef = useRef(false)

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") {
      statusRef.current?.focus()
    }
  }, [status.kind])

  function update<K extends keyof SponsorInquiryFormState>(
    key: K,
    value: SponsorInquiryFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
    setStatus((current) =>
      current.kind === "submitting" ? current : IDLE_STATUS,
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current) return

    submittingRef.current = true
    setStatus({
      kind: "submitting",
      message: SPONSOR_INQUIRY_COPY.submitting,
    })

    const result = await submitSponsorInquiry(form)
    submittingRef.current = false

    if (result.ok) {
      setForm({ ...INITIAL_SPONSOR_INQUIRY_FORM })
      setStatus({ kind: "success", message: result.message })
      return
    }

    setStatus({ kind: "error", message: result.message })
  }

  const disabled = status.kind === "submitting"
  const statusTone =
    status.kind === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : status.kind === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
        : "border-transparent text-slate-700"

  return (
    <form
      aria-labelledby="sponsor-inquiry-form-title"
      aria-describedby="sponsor-inquiry-required-note"
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8"
    >
      <div className="border-b border-slate-200 pb-5">
        <h3
          id="sponsor-inquiry-form-title"
          className="text-balance text-xl font-bold text-slate-950 sm:text-2xl"
        >
          合作信息
        </h3>
        <p
          id="sponsor-inquiry-required-note"
          className="mt-2 text-sm leading-6 text-slate-600"
        >
          标注“必填”的项目需要完整填写。提交后不会自动重试。
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contactName" label="联系人" required>
          <Input
            id="contactName"
            name="contactName"
            autoComplete="name"
            required
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.contactName}
            disabled={disabled}
            value={form.contactName}
            onChange={(event) => update("contactName", event.target.value)}
            className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>

        <Field id="email" label="商务邮箱" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.email}
            disabled={disabled}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>

        <Field id="company" label="公司或团队" required>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.company}
            disabled={disabled}
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>

        <Field id="productName" label="产品名称" required>
          <Input
            id="productName"
            name="productName"
            required
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.productName}
            disabled={disabled}
            value={form.productName}
            onChange={(event) => update("productName", event.target.value)}
            className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="productUrl"
          label="产品 HTTPS 地址"
          required
          instruction="只接受可公开访问的 HTTPS 产品地址。"
        >
          <Input
            id="productUrl"
            name="productUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://example.com/product"
            pattern="https://.*"
            title="请输入以 https:// 开头的产品地址"
            required
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.productUrl}
            aria-describedby="productUrl-instruction"
            disabled={disabled}
            value={form.productUrl}
            onChange={(event) => update("productUrl", event.target.value)}
            className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="budgetRange" label="预算范围" required>
          <select
            id="budgetRange"
            name="budgetRange"
            required
            disabled={disabled}
            value={form.budgetRange}
            onChange={(event) =>
              update(
                "budgetRange",
                event.target.value as SponsorInquiryFormState["budgetRange"],
              )
            }
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus-visible:border-violet-600 focus-visible:ring-[3px] focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {SPONSOR_BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="campaignGoal" label="合作目标" required>
          <select
            id="campaignGoal"
            name="campaignGoal"
            required
            disabled={disabled}
            value={form.campaignGoal}
            onChange={(event) =>
              update(
                "campaignGoal",
                event.target.value as SponsorInquiryFormState["campaignGoal"],
              )
            }
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus-visible:border-violet-600 focus-visible:ring-[3px] focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {SPONSOR_CAMPAIGN_GOAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="notes"
          label="合作说明"
          instruction="可填写期望排期、目标受众、素材状态和需要核验的量化信息。"
        >
          <Textarea
            id="notes"
            name="notes"
            rows={6}
            maxLength={SPONSOR_INQUIRY_MAX_LENGTHS.notes}
            aria-describedby="notes-instruction"
            disabled={disabled}
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            className="border-slate-300 bg-white text-slate-950 placeholder:text-slate-500"
          />
        </Field>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="sponsor-website">请勿填写此字段</label>
        <input
          id="sponsor-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          disabled={disabled}
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-start gap-3">
          <input
            id="sponsor-consent"
            name="consent"
            type="checkbox"
            required
            disabled={disabled}
            checked={form.consent}
            aria-describedby="sponsor-consent-description"
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 accent-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
          />
          <div>
            <Label
              htmlFor="sponsor-consent"
              className="text-sm leading-6 text-slate-800"
            >
              我同意本站为评估并回复本次赞助咨询处理以上信息（必填）
            </Label>
            <p
              id="sponsor-consent-description"
              className="mt-1 text-xs leading-5 text-slate-600"
            >
              处理范围和保留规则见下方
              <a
                href="#privacy"
                className="font-semibold text-violet-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
              >
                咨询隐私说明
              </a>
              。提交不代表排期或报价成立。
            </p>
          </div>
        </div>
      </div>

      <noscript>
        <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <p>{SPONSOR_INQUIRY_COPY.noScript}</p>
          <p className="mt-2">
            可前往
            <a
              href={SPONSOR_GITHUB_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 font-semibold underline underline-offset-4"
            >
              项目 GitHub 联系入口
              <span className="ml-1 font-normal">
                {SPONSOR_INQUIRY_COPY.newWindowCue}
              </span>
            </a>
            询问其他非公开联系方式。
          </p>
          <p className="mt-2 font-semibold">
            {SPONSOR_INQUIRY_COPY.noScriptWarning}
          </p>
        </div>
      </noscript>

      <div
        ref={statusRef}
        role={status.kind === "error" ? "alert" : "status"}
        aria-live={status.kind === "error" ? "assertive" : "polite"}
        aria-atomic="true"
        tabIndex={-1}
        className={`mt-5 min-h-12 rounded-lg border px-4 py-3 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${statusTone}`}
      >
        {status.message ? (
          <span className="flex items-start gap-2">
            {status.kind === "submitting" ? (
              <LoaderCircle
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 motion-safe:animate-spin"
              />
            ) : status.kind === "success" ? (
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0"
              />
            ) : (
              <AlertCircle
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0"
              />
            )}
            <span>{status.message}</span>
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-600">
          发送前请先阅读
          <a
            href="#policy"
            className="font-semibold text-violet-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
          >
            广告与赞助政策
          </a>
          。
        </p>
        <Button
          type="submit"
          disabled={disabled}
          className="h-11 w-full rounded-md bg-violet-700 text-white hover:bg-violet-800 focus-visible:ring-violet-300 sm:w-auto"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          {disabled ? "提交中…" : "提交合作需求"}
        </Button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  required = false,
  instruction,
  children,
}: {
  id: string
  label: string
  required?: boolean
  instruction?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-900">
        {label}
        {required ? <span className="font-normal text-slate-600">（必填）</span> : null}
      </Label>
      {children}
      {instruction ? (
        <p
          id={`${id}-instruction`}
          className="text-xs leading-5 text-slate-600"
        >
          {instruction}
        </p>
      ) : null}
    </div>
  )
}
