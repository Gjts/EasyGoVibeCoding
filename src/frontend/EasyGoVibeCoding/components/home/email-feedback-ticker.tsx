"use client"

import { MailCheck, Quote, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import {
  emailFeedbackItems,
  type EmailFeedbackItem,
} from "@/data/email-feedback"

type FeedbackTickerItem = Omit<EmailFeedbackItem, "source"> & {
  source: "email" | "status"
  variant: "feedback" | "status"
}

const MIN_ROW_ITEMS = 8

const statusFeedbackItems: FeedbackTickerItem[] = [
  {
    id: "status-feedback-open",
    displayName: "等待第一批授权反馈",
    role: "邮箱反馈征集中",
    excerpt:
      "收到明确授权的真实邮箱反馈后，我会先脱敏整理，再滚动展示在这里。",
    receivedAt: "持续征集中",
    source: "status",
    variant: "status",
  },
  {
    id: "status-consent-required",
    displayName: "公开展示需要授权",
    role: "隐私优先",
    excerpt:
      "邮箱里的原始内容不会直接公开。只有勾选授权、并完成脱敏整理后，才会出现在这里。",
    receivedAt: "等待授权",
    source: "status",
    variant: "status",
  },
  {
    id: "status-human-curation",
    displayName: "反馈会先人工整理",
    role: "真实反馈墙",
    excerpt:
      "我会保留反馈的真实问题和建议，但移除邮箱、公司、项目细节等私人信息。",
    receivedAt: "持续征集",
    source: "status",
    variant: "status",
  },
  {
    id: "status-next-feedback",
    displayName: "等待下一条真实反馈",
    role: "反馈墙补位",
    excerpt:
      "新的邮箱反馈完成确认后，会自动替换这里的占位状态，不会把旧反馈重复当成新反馈。",
    receivedAt: "自动更新",
    source: "status",
    variant: "status",
  },
  {
    id: "status-learning-questions",
    displayName: "欢迎提出学习问题",
    role: "早期反馈征集",
    excerpt:
      "你可以反馈课程难度、案例缺口、工具选择困惑，我会优先把真实问题整理成后续更新。",
    receivedAt: "开放中",
    source: "status",
    variant: "status",
  },
  {
    id: "status-no-private-data",
    displayName: "不会公开私人信息",
    role: "脱敏展示",
    excerpt:
      "展示区只放摘要，不展示邮箱、电话、公司、项目名等可能识别个人的信息。",
    receivedAt: "长期规则",
    source: "status",
    variant: "status",
  },
  {
    id: "status-feedback-review",
    displayName: "反馈会进入更新清单",
    role: "项目真实进度",
    excerpt:
      "已确认的问题会转成课程改进项，而不是做成看起来热闹但无法追踪的假评价。",
    receivedAt: "持续处理",
    source: "status",
    variant: "status",
  },
  {
    id: "status-more-confirmed",
    displayName: "更多授权反馈后显示",
    role: "真实数据优先",
    excerpt:
      "当确认反馈数量增加后，这三行会自然展示更多不同学员的真实摘录。",
    receivedAt: "等待新增",
    source: "status",
    variant: "status",
  },
]

function isEmailFeedbackItem(item: unknown): item is EmailFeedbackItem {
  if (!item || typeof item !== "object") return false

  const value = item as Partial<EmailFeedbackItem>
  return (
    typeof value.id === "string" &&
    typeof value.displayName === "string" &&
    typeof value.role === "string" &&
    typeof value.excerpt === "string" &&
    typeof value.receivedAt === "string" &&
    value.source === "email"
  )
}

function dedupeFeedbackItems(items: EmailFeedbackItem[]): EmailFeedbackItem[] {
  const seen = new Set<string>()

  return items.filter((item) => {
    const key = `${item.id}:${item.displayName}:${item.excerpt}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function toTickerItem(item: EmailFeedbackItem): FeedbackTickerItem {
  return {
    ...item,
    variant: "feedback",
  }
}

function buildRowBase(
  items: FeedbackTickerItem[],
  rowIndex: number,
): FeedbackTickerItem[] {
  if (items.length >= MIN_ROW_ITEMS) {
    return Array.from({ length: MIN_ROW_ITEMS }, (_, index) => {
      return items[(index + rowIndex) % items.length]
    })
  }

  const rowItems = items.filter((_, index) => index % 3 === rowIndex)
  const base = [...rowItems]
  let fillerIndex = rowIndex * 3

  while (base.length < MIN_ROW_ITEMS) {
    base.push(statusFeedbackItems[fillerIndex % statusFeedbackItems.length])
    fillerIndex += 1
  }

  return base
}

function buildFeedbackRow(
  items: FeedbackTickerItem[],
  rowIndex: number,
): FeedbackTickerItem[] {
  const rowBase = buildRowBase(items, rowIndex)
  return [...rowBase, ...rowBase]
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
          ? payload.data.filter(isEmailFeedbackItem)
          : []

        if (isMounted) {
          setRemoteFeedback(dedupeFeedbackItems(items))
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
    remoteFeedback.length > 0
      ? remoteFeedback
      : dedupeFeedbackItems(emailFeedbackItems)
  const publicFeedback = confirmedFeedback.map(toTickerItem)
  const rows = [0, 1, 2].map((rowIndex) =>
    buildFeedbackRow(publicFeedback, rowIndex),
  )
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
                className={[
                  "w-[270px] shrink-0 rounded-2xl border p-4 shadow-sm sm:w-[340px]",
                  item.variant === "feedback"
                    ? "border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50"
                    : "border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50",
                ].join(" ")}
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
                <div
                  className={[
                    "mt-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold",
                    item.variant === "feedback"
                      ? "text-blue-700"
                      : "text-emerald-700",
                  ].join(" ")}
                >
                  {item.variant === "feedback"
                    ? "来源：邮箱反馈"
                    : "状态：等待更多授权"}
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
