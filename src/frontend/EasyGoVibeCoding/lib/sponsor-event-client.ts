import type { SponsorSlot } from "@/lib/sponsor-schema"

export type SponsorEventType = "viewable_impression" | "click"

export interface SponsorEventPayload {
  schemaVersion: 1
  eventType: SponsorEventType
  campaignId: string
  slot: SponsorSlot
  path: string
}

export interface SponsorImpressionGateOptions {
  setTimer: (callback: () => void, delayMs: number) => number
  clearTimer: (timerId: number) => void
  isPageVisible: () => boolean
  isCampaignActive: () => boolean
  observeHalfVisible: (listener: (halfVisible: boolean) => void) => () => void
  subscribeToVisibility: (listener: () => void) => () => void
  onViewable: () => void
}

const VIEWABLE_IMPRESSION_DELAY_MS = 1_000

export function createSponsorEventPayload({
  eventType,
  campaignId,
  slot,
  path,
}: Omit<SponsorEventPayload, "schemaVersion">): SponsorEventPayload {
  return {
    schemaVersion: 1,
    eventType,
    campaignId,
    slot,
    path,
  }
}

export function getSponsorImpressionStorageKey(
  campaignId: string,
  slot: SponsorSlot,
  path: string,
): string {
  return [
    "egvc",
    "sponsor-impression",
    "v1",
    campaignId,
    slot,
    path,
  ].join(":")
}

export function claimSponsorImpressionOnce(
  storage: Pick<Storage, "getItem" | "setItem">,
  campaignId: string,
  slot: SponsorSlot,
  path: string,
): boolean {
  const storageKey = getSponsorImpressionStorageKey(campaignId, slot, path)

  try {
    if (storage.getItem(storageKey) !== null) return false
    storage.setItem(storageKey, "1")
    return storage.getItem(storageKey) === "1"
  } catch {
    return false
  }
}

export function createSponsorImpressionGate({
  setTimer,
  clearTimer,
  isPageVisible,
  isCampaignActive,
  observeHalfVisible,
  subscribeToVisibility,
  onViewable,
}: SponsorImpressionGateOptions): () => void {
  let halfVisible = false
  let timerId: number | null = null
  let disposed = false

  const cancelTimer = () => {
    if (timerId === null) return
    clearTimer(timerId)
    timerId = null
  }

  const startTimer = () => {
    if (
      disposed ||
      timerId !== null ||
      !halfVisible ||
      !isPageVisible() ||
      !isCampaignActive()
    ) {
      return
    }

    timerId = setTimer(() => {
      timerId = null
      if (
        disposed ||
        !halfVisible ||
        !isPageVisible() ||
        !isCampaignActive()
      ) {
        return
      }
      onViewable()
    }, VIEWABLE_IMPRESSION_DELAY_MS)
  }

  const stopObserving = observeHalfVisible((nextHalfVisible) => {
    halfVisible = nextHalfVisible
    if (!halfVisible) {
      cancelTimer()
      return
    }
    startTimer()
  })

  const stopListeningToVisibility = subscribeToVisibility(() => {
    cancelTimer()
    startTimer()
  })

  return () => {
    if (disposed) return
    disposed = true
    cancelTimer()
    stopListeningToVisibility()
    stopObserving()
  }
}

export function sendSponsorEvent(payload: SponsorEventPayload): void {
  if (typeof window === "undefined") return
  const body = JSON.stringify(payload)

  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([body], { type: "application/json" })
      if (navigator.sendBeacon("/api/sponsor-events", blob)) return
    }
  } catch {
    // Fall through to keepalive fetch.
  }

  try {
    void fetch("/api/sponsor-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => undefined)
  } catch {
    // Sponsor telemetry must never interrupt navigation.
  }
}
