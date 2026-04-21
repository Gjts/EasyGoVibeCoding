/**
 * 予約ウェイトリストの登録ロジック。
 * 今は LocalStorage + window.fetch('/api/ja/waitlist') のスタブ。
 * Phase E で Supabase などの永続バックエンドに差し替え可能なように、
 * 登録処理を 1 箇所に閉じ込めてある。
 */

import type { JaPricingPlanId } from "./course"

const STORAGE_KEY = "egvc:ja-waitlist:v1"

export type WaitlistEntry = {
  id: string
  createdAt: string
  email: string
  company?: string
  role?: string
  interestedPlan: JaPricingPlanId | "undecided"
  notes?: string
  /** UTM や流入元などの軽い診断情報。個人情報は格納しない。 */
  referrer?: string
}

type WaitlistState = {
  entries: WaitlistEntry[]
}

function readStore(): WaitlistState {
  if (typeof window === "undefined") return { entries: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { entries: [] }
    const parsed = JSON.parse(raw) as WaitlistState
    if (!Array.isArray(parsed?.entries)) return { entries: [] }
    return parsed
  } catch {
    return { entries: [] }
  }
}

function writeStore(state: WaitlistState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 容量超過や Safari プライベートなど失敗しても致命ではない
  }
}

function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `wl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function listEntries(): WaitlistEntry[] {
  return readStore().entries
}

export function hasRegistered(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return false
  return readStore().entries.some((e) => e.email.toLowerCase() === normalized)
}

export type RegisterInput = Omit<WaitlistEntry, "id" | "createdAt" | "referrer"> & {
  referrer?: string
}

export type RegisterResult =
  | { ok: true; entry: WaitlistEntry; remote: "sent" | "stub" }
  | { ok: false; reason: "invalid-email" | "duplicate" | "unknown" }

function isValidEmail(email: string): boolean {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/**
 * 予約登録のエントリーポイント。
 * 1. バリデーション
 * 2. LocalStorage へ記録（オフラインでも失われない）
 * 3. /api/ja/waitlist へ POST を試行（未実装なら静かに stub 返し）
 */
export async function registerEntry(input: RegisterInput): Promise<RegisterResult> {
  const email = input.email.trim()
  if (!isValidEmail(email)) return { ok: false, reason: "invalid-email" }
  if (hasRegistered(email)) return { ok: false, reason: "duplicate" }

  const entry: WaitlistEntry = {
    id: genId(),
    createdAt: new Date().toISOString(),
    email,
    company: input.company?.trim() || undefined,
    role: input.role?.trim() || undefined,
    interestedPlan: input.interestedPlan,
    notes: input.notes?.trim() || undefined,
    referrer:
      input.referrer?.trim() ||
      (typeof document !== "undefined" ? document.referrer || undefined : undefined),
  }

  const state = readStore()
  state.entries.push(entry)
  writeStore(state)

  let remote: "sent" | "stub" = "stub"
  try {
    if (typeof window !== "undefined" && typeof fetch === "function") {
      const res = await fetch("/api/ja/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      })
      if (res.ok) remote = "sent"
    }
  } catch {
    // API が未実装でも UX は成立させる
  }

  return { ok: true, entry, remote }
}
