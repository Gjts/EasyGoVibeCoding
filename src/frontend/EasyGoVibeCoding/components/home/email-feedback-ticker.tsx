"use client"

import { MailCheck, Quote, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import {
  emailFeedbackItems,
  type EmailFeedbackItem,
} from "@/data/email-feedback"

const pendingFeedback: EmailFeedbackItem = {
  id: "pending-feedback",
  displayName: "等待第一批授权反馈",
  role: "邮箱反馈征集中",
  excerpt:
    "收到明确授权的真实邮箱反馈后，我会先脱敏整理，再滚动展示在这里。",
  receivedAt: "持续征集中",
  source: "email",
}

const pendingFeedbackItems: EmailFeedbackItem[] = [
  pendingFeedback,
  {
    id: "pending-consent",
    displayName: "公开展示需要授权",
    role: "隐私优先",
    excerpt:
      "邮箱里的原始内容不会直接公开。只有勾选授权、并完成脱敏整理后，才会出现在这里。",
    receivedAt: "等待授权",
    source: "email",
  },
  {
    id: "pending-curation",
    displayName: "反馈会先人工整理",
    role: "真实反馈墙",
    excerpt:
      "我会保留反馈的真实问题和建议，但移除邮箱、公司、项目细节等私人信息。",
    receivedAt: "持续征集",
    source: "email",
  },
]

function buildFeedbackRow(
  items: EmailFeedbackItem[],
  rowIndex: number,
): EmailFeedbackItem[] {
  const sourceItems = items.length > 0 ? items : pendingFeedbackItems
  const repeated = Array.from({ length: 8 }, (_, index) => {
    return sourceItems[(index + rowIndex) % sourceItems.length]
  })
  return [...repeated, ...repeated]
}

export function EmailFeedbackTicker() {
  const [remoteFeedback, setRemoteFeedback] = useState<EmailFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadFeedback() {
      try {
        const response = await fetch("/api/feedback", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        })
        const payload = await response.json().catch(() => null)
        const items: EmailFeedbackItem[] = Array.isArray(payload?.data)
          ? payload.data.filter(
              (item: Partial<EmailFeedbackItem>): item is EmailFeedbackItem => {
              return (
                typeof item.id === "string" &&
                typeof item.displayName === "string" &&
                typeof item.role === "string" &&
                typeof item.excerpt === "string" &&
                typeof item.receivedAt === "string" &&
                item.source === "email"
              )
            },
          )
          : []

        if (isMounted) {
          setRemoteFeedback(items)
        }
      } catch {
        if (isMounted) {
          setRemoteFeedback([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFeedback()

    return () => {
      isMounted = false
    }
  }, [])

  const confirmedFeedback =
    remoteFeedback.length > 0 ? remoteFeedback : emailFeedbackItems
  const publicFeedback =
    confirmedFeedback.length > 0 ? confirmedFeedback : pendingFeedbackItems
  const rows = [0, 1, 2].map((rowIndex) => buildFeedbackRow(publicFeedback, rowIndex))
  const hasPublishedFeedback = confirmedFeedback.length > 0

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border-2 border-white/70 bg-white/80 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white shadow-md">
            <MailCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-gray-950">
              学员的真实邮箱反馈
            </h3>
            <p className="text-sm font-medium text-gray-600">
              只展示已授权、已脱敏的邮箱反馈摘录
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          {hasPublishedFeedback
            ? "已邮箱确认"
            : isLoading
              ? "读取授权反馈"
              : "等待授权反馈"}
        </div>
      </div>

      <div
        className="feedback-marquee-mask relative space-y-3 overflow-hidden"
        aria-label="授权邮箱反馈滚动展示"
      >
        {rows.map((rowItems, rowIndex) => (
          <div
            key={rowIndex}
            className={[
              "feedback-marquee-row flex w-max gap-4",
              rowIndex === 1 ? "feedback-marquee-row-reverse" : "",
              rowIndex === 0 ? "feedback-marquee-row-fast" : "",
              rowIndex === 2 ? "feedback-marquee-row-slow" : "",
            ].join(" ")}
          >
            {rowItems.map((item, index) => (
              <article
                key={`${item.id}-${rowIndex}-${index}`}
                className="w-[270px] shrink-0 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 shadow-sm sm:w-[340px]"
                aria-hidden={index >= rowItems.length / 2}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-gray-950">
                      {item.displayName}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">
                      {item.role} · {item.receivedAt}
                    </p>
                  </div>
                  <Quote className="h-5 w-5 shrink-0 text-blue-400" />
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-gray-700">
                  {item.excerpt}
                </p>
                <div className="mt-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-blue-700">
                  来源：邮箱反馈
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
