export const SPONSOR_BUDGET_RANGES = [
  "under-3000",
  "3000-8000",
  "8000-15000",
  "15000-plus",
  "undecided",
] as const

export const SPONSOR_CAMPAIGN_GOALS = [
  "brand-awareness",
  "product-launch",
  "developer-leads",
  "recruiting",
  "other",
] as const

export interface SponsorInquiry {
  contactName: string
  email: string
  company: string
  productName: string
  productUrl: string
  budgetRange: (typeof SPONSOR_BUDGET_RANGES)[number]
  campaignGoal: (typeof SPONSOR_CAMPAIGN_GOALS)[number]
  notes: string
  consent: true
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input) && typeof input === "object" && !Array.isArray(input)
}

function normalizeText(
  input: unknown,
  maxLength: number,
  optional = false,
): string | null {
  if (input === undefined && optional) return ""
  if (typeof input !== "string") return null

  const normalized = input
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  return normalized.length <= maxLength ? normalized : null
}

export function isValidSponsorEmail(value: string): boolean {
  if (value.length > 254 || /[\u0000-\u0020\u007f]/.test(value)) return false

  const atIndex = value.indexOf("@")
  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) return false

  const localPart = value.slice(0, atIndex)
  const domain = value.slice(atIndex + 1)
  if (
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)
  ) {
    return false
  }

  const labels = domain.split(".")
  return (
    labels.length >= 2 &&
    labels.every(
      (label) =>
        label.length > 0 &&
        label.length <= 63 &&
        /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
    )
  )
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && Boolean(url.hostname)
  } catch {
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function parseSponsorInquiry(input: unknown): SponsorInquiry | null {
  if (!isRecord(input)) return null

  const contactName = normalizeText(input.contactName, 80)
  const normalizedEmail = normalizeText(input.email, 160)
  const company = normalizeText(input.company, 120)
  const productName = normalizeText(input.productName, 120)
  const productUrl = normalizeText(input.productUrl, 300)
  const budgetRange = normalizeText(input.budgetRange, 40)
  const campaignGoal = normalizeText(input.campaignGoal, 40)
  const notes = normalizeText(input.notes, 1200, true)

  if (
    !contactName ||
    !normalizedEmail ||
    !company ||
    !productName ||
    !productUrl ||
    !budgetRange ||
    !campaignGoal ||
    notes === null ||
    input.consent !== true
  ) {
    return null
  }

  const email = normalizedEmail.toLowerCase()
  if (!isValidSponsorEmail(email)) return null
  if (!isHttpsUrl(productUrl)) return null
  if (
    !SPONSOR_BUDGET_RANGES.includes(
      budgetRange as SponsorInquiry["budgetRange"],
    )
  ) {
    return null
  }
  if (
    !SPONSOR_CAMPAIGN_GOALS.includes(
      campaignGoal as SponsorInquiry["campaignGoal"],
    )
  ) {
    return null
  }

  return {
    contactName,
    email,
    company,
    productName,
    productUrl,
    budgetRange: budgetRange as SponsorInquiry["budgetRange"],
    campaignGoal: campaignGoal as SponsorInquiry["campaignGoal"],
    notes,
    consent: true,
  }
}

export function buildSponsorInquiryHtml(inquiry: SponsorInquiry): string {
  const rows: ReadonlyArray<readonly [string, string]> = [
    ["联系人", inquiry.contactName],
    ["邮箱", inquiry.email],
    ["公司", inquiry.company],
    ["产品", inquiry.productName],
    ["产品地址", inquiry.productUrl || "无"],
    ["预算", inquiry.budgetRange],
    ["目标", inquiry.campaignGoal],
    ["补充说明", inquiry.notes || "无"],
  ]

  const body = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}：</strong>${escapeHtml(value)}</p>`,
    )
    .join("")

  return (
    '<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto">' +
    "<h2>EasyGoVibeCoding 广告合作咨询</h2>" +
    body +
    "<p><small>提交者已勾选商务联系信息处理同意项。</small></p>" +
    "</div>"
  )
}
