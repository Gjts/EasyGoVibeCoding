import type { SponsorCampaign, SponsorSlot } from "@/lib/sponsor-schema"

export function getScheduledSponsors(
  campaigns: SponsorCampaign[],
  slot: SponsorSlot,
): SponsorCampaign[] {
  return campaigns
    .filter(
      (campaign) =>
        campaign.status === "active" && campaign.placements.includes(slot),
    )
    .sort((left, right) => {
      const startsAtDifference =
        Date.parse(left.startsAt) - Date.parse(right.startsAt)
      return startsAtDifference || left.id.localeCompare(right.id)
    })
}

export function selectActiveSponsor(
  campaigns: SponsorCampaign[],
  slot: SponsorSlot,
  now: Date = new Date(),
): SponsorCampaign | null {
  const timestamp = now.getTime()
  return (
    getScheduledSponsors(campaigns, slot).find(
      (campaign) =>
        Date.parse(campaign.startsAt) <= timestamp &&
        timestamp < Date.parse(campaign.endsAt),
    ) ?? null
  )
}

const MAX_SPONSOR_SCHEDULE_REFRESH_DELAY_MS = 60 * 60 * 1_000

export function getSponsorScheduleRefreshDelay(
  campaigns: SponsorCampaign[],
  slot: SponsorSlot,
  now: Date = new Date(),
  maximumDelayMs = MAX_SPONSOR_SCHEDULE_REFRESH_DELAY_MS,
): number {
  const timestamp = now.getTime()
  const nextBoundary = getScheduledSponsors(campaigns, slot)
    .flatMap((campaign) => [
      Date.parse(campaign.startsAt),
      Date.parse(campaign.endsAt),
    ])
    .filter((boundary) => boundary > timestamp)
    .reduce(
      (earliest, boundary) => Math.min(earliest, boundary),
      Number.POSITIVE_INFINITY,
    )

  if (!Number.isFinite(nextBoundary)) return maximumDelayMs
  return Math.min(nextBoundary - timestamp, maximumDelayMs)
}
