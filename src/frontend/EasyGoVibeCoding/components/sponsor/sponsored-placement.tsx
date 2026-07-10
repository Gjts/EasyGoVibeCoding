"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

import {
  createSponsorEventPayload,
  createSponsorImpressionGate,
  getSponsorImpressionStorageKey,
  sendSponsorEvent,
} from "@/lib/sponsor-event-client"
import {
  getSponsorScheduleRefreshDelay,
  selectActiveSponsor,
} from "@/lib/sponsor-schedule"
import type { SponsorCampaign, SponsorSlot } from "@/lib/sponsor-schema"

interface SponsoredPlacementProps {
  slot: SponsorSlot
  campaigns: SponsorCampaign[]
}

const THEME_CLASSES: Record<SponsorCampaign["theme"], string> = {
  violet:
    "border-violet-300/70 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white dark:border-violet-700 dark:from-violet-950 dark:via-fuchsia-950 dark:to-gray-950",
  blue:
    "border-blue-300/70 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:border-blue-700 dark:from-blue-950 dark:via-cyan-950 dark:to-gray-950",
  emerald:
    "border-emerald-300/70 bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:border-emerald-700 dark:from-emerald-950 dark:via-teal-950 dark:to-gray-950",
}

const sentImpressions = new Set<string>()

export function SponsoredPlacement({
  slot,
  campaigns,
}: SponsoredPlacementProps) {
  const [now, setNow] = useState<number | null>(null)
  const cardRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (campaigns.length === 0) return

    let refreshTimer: number | null = null
    const refreshSelection = () => {
      const timestamp = Date.now()
      setNow(timestamp)
      refreshTimer = window.setTimeout(
        refreshSelection,
        getSponsorScheduleRefreshDelay(
          campaigns,
          slot,
          new Date(timestamp),
        ),
      )
    }

    refreshTimer = window.setTimeout(refreshSelection, 0)
    return () => {
      if (refreshTimer !== null) window.clearTimeout(refreshTimer)
    }
  }, [campaigns, slot])

  const campaign = useMemo(
    () =>
      now === null
        ? null
        : selectActiveSponsor(campaigns, slot, new Date(now)),
    [campaigns, now, slot],
  )

  useEffect(() => {
    const element = cardRef.current
    if (!campaign || !element) return

    return createSponsorImpressionGate({
      setTimer: (callback, delayMs) =>
        window.setTimeout(callback, delayMs),
      clearTimer: (timerId) => window.clearTimeout(timerId),
      isPageVisible: () => document.visibilityState === "visible",
      isCampaignActive: () =>
        selectActiveSponsor(campaigns, slot, new Date())?.id === campaign.id,
      observeHalfVisible: (listener) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            listener(
              Boolean(
                entry &&
                  entry.isIntersecting &&
                  entry.intersectionRatio >= 0.5,
              ),
            )
          },
          { threshold: [0, 0.5, 1] },
        )
        observer.observe(element)
        return () => observer.disconnect()
      },
      subscribeToVisibility: (listener) => {
        document.addEventListener("visibilitychange", listener)
        return () => document.removeEventListener("visibilitychange", listener)
      },
      onViewable: () => {
        const path = window.location.pathname
        const storageKey = getSponsorImpressionStorageKey(
          campaign.id,
          slot,
          path,
        )

        if (sentImpressions.has(storageKey)) return

        try {
          if (window.sessionStorage.getItem(storageKey)) {
            sentImpressions.add(storageKey)
            return
          }
          window.sessionStorage.setItem(storageKey, "1")
        } catch {
          // Delivery still works when private browsing disables storage.
        }

        sentImpressions.add(storageKey)
        sendSponsorEvent(
          createSponsorEventPayload({
            eventType: "viewable_impression",
            campaignId: campaign.id,
            slot,
            path,
          }),
        )
      },
    })
  }, [campaign, campaigns, slot])

  if (campaigns.length === 0) return null

  if (now === null) {
    return (
      <div
        aria-hidden="true"
        className="mb-12 min-h-44 rounded-2xl border border-transparent"
      />
    )
  }

  if (!campaign) return null

  const handleClick = () => {
    if (
      selectActiveSponsor(campaigns, slot, new Date())?.id !== campaign.id
    ) {
      return
    }

    sendSponsorEvent(
      createSponsorEventPayload({
        eventType: "click",
        campaignId: campaign.id,
        slot,
        path: window.location.pathname,
      }),
    )
  }

  return (
    <aside
      ref={cardRef}
      aria-label={`广告：${campaign.productName}`}
      className={`mb-12 overflow-hidden rounded-2xl border-2 shadow-lg ${THEME_CLASSES[campaign.theme]}`}
    >
      <a
        href={campaign.destinationUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        className="group block p-5 outline-none transition hover:shadow-xl focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-violet-600 sm:p-6"
      >
        <span className="sr-only">在新窗口打开</span>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {campaign.logoSrc ? (
              <Image
                src={campaign.logoSrc}
                alt={`${campaign.advertiserName} 标志`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-contain"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-gray-800 shadow-sm"
              >
                {campaign.productName.slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-gray-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
                广告
              </span>
              <p className="mt-1 truncate text-sm font-medium text-gray-600 dark:text-gray-300">
                {campaign.advertiserName}
              </p>
            </div>
          </div>
          <ExternalLink
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-gray-300"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {campaign.headline}
        </h2>
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-200">
          {campaign.description}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-violet-700 dark:text-violet-300">
            {campaign.ctaLabel} →
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">
            广告内容由广告主提供；不影响本站编辑评价。
          </span>
        </div>
      </a>
    </aside>
  )
}
