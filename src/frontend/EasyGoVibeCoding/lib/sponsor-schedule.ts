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
    .sort((left, right) => left.startsAt.localeCompare(right.startsAt))
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
