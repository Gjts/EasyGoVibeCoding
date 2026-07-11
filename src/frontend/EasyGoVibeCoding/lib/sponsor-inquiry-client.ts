export const SPONSOR_BUDGET_OPTIONS = [
  { value: "under-3000", label: "¥3,000 以下" },
  { value: "3000-8000", label: "¥3,000–8,000" },
  { value: "8000-15000", label: "¥8,000–15,000" },
  { value: "15000-plus", label: "¥15,000 以上" },
  { value: "undecided", label: "暂未确定" },
] as const

export const SPONSOR_CAMPAIGN_GOAL_OPTIONS = [
  { value: "brand-awareness", label: "品牌认知" },
  { value: "product-launch", label: "产品发布" },
  { value: "developer-leads", label: "开发者线索" },
  { value: "recruiting", label: "开发者招聘" },
  { value: "other", label: "其他" },
] as const

export const SPONSOR_INQUIRY_MAX_LENGTHS = {
  contactName: 80,
  email: 160,
  company: 120,
  productName: 120,
  productUrl: 300,
  notes: 1200,
} as const

export const SPONSOR_INQUIRY_COPY = {
  submitting: "正在提交，请稍候。",
  success: "合作需求已发送。我们会通过你填写的邮箱联系。",
  invalid: "提交内容未通过校验，请检查必填项和 HTTPS 地址。",
  forbidden: "请求未通过安全校验，请刷新页面后重新填写。",
  tooLarge: "提交内容过长，请精简合作说明后再提交。",
  unavailable: "咨询服务暂时不可用，请稍后再提交。",
  deliveryUnavailable: "邮件服务暂时不可用，请稍后再提交。",
  network: "网络连接失败，请检查网络后再提交。",
  timeout: "提交超时，请检查网络后再提交。",
  unexpected: "提交失败，请稍后再提交。",
  noScript: "此表单需要 JavaScript 才能安全提交。",
  noScriptWarning:
    "请勿在公开 GitHub Issue 中发布未公开报价、联系人信息或其他私密商业材料。",
} as const

export const SPONSOR_GITHUB_CONTACT_URL =
  "https://github.com/Gjts/EasyGoVibeCoding/issues/new"

type SponsorBudgetRange = (typeof SPONSOR_BUDGET_OPTIONS)[number]["value"]
type SponsorCampaignGoal =
  (typeof SPONSOR_CAMPAIGN_GOAL_OPTIONS)[number]["value"]

export interface SponsorInquiryFormState {
  contactName: string
  email: string
  company: string
  productName: string
  productUrl: string
  budgetRange: SponsorBudgetRange
  campaignGoal: SponsorCampaignGoal
  notes: string
  consent: boolean
  website: string
}

export const INITIAL_SPONSOR_INQUIRY_FORM: SponsorInquiryFormState = {
  contactName: "",
  email: "",
  company: "",
  productName: "",
  productUrl: "",
  budgetRange: "undecided",
  campaignGoal: "brand-awareness",
  notes: "",
  consent: false,
  website: "",
}

interface SponsorInquiryFetchResponse {
  status: number
}

interface SponsorInquiryFetchInit {
  method: "POST"
  headers: { "Content-Type": "application/json" }
  credentials: "same-origin"
  body: string
  signal: AbortSignal
}

type SponsorInquiryFetcher = (
  url: string,
  init: SponsorInquiryFetchInit,
) => Promise<SponsorInquiryFetchResponse>

interface SubmitSponsorInquiryOptions {
  fetcher?: SponsorInquiryFetcher
  timeoutMs?: number
}

export type SponsorInquirySubmitResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

const DEFAULT_TIMEOUT_MS = 10_000

export function getSponsorInquiryErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return SPONSOR_INQUIRY_COPY.invalid
    case 403:
      return SPONSOR_INQUIRY_COPY.forbidden
    case 413:
      return SPONSOR_INQUIRY_COPY.tooLarge
    case 500:
      return SPONSOR_INQUIRY_COPY.unavailable
    case 502:
      return SPONSOR_INQUIRY_COPY.deliveryUnavailable
    default:
      return SPONSOR_INQUIRY_COPY.unexpected
  }
}

export async function submitSponsorInquiry(
  inquiry: SponsorInquiryFormState,
  options: SubmitSponsorInquiryOptions = {},
): Promise<SponsorInquirySubmitResult> {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  )
  const fetcher: SponsorInquiryFetcher =
    options.fetcher ??
    ((url, init) => fetch(url, init) as Promise<SponsorInquiryFetchResponse>)

  try {
    const response = await fetcher("/api/sponsor-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(inquiry),
      signal: controller.signal,
    })

    if (response.status === 202) {
      return { ok: true, message: SPONSOR_INQUIRY_COPY.success }
    }

    return {
      ok: false,
      message: getSponsorInquiryErrorMessage(response.status),
    }
  } catch {
    return {
      ok: false,
      message: controller.signal.aborted
        ? SPONSOR_INQUIRY_COPY.timeout
        : SPONSOR_INQUIRY_COPY.network,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
