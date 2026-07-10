import sponsorData from "@/data/sponsor-campaigns.json"
import {
  parseSponsorCampaigns,
  type SponsorCampaign,
  type SponsorSlot,
} from "@/lib/sponsor-schema"
import { getScheduledSponsors } from "@/lib/sponsor-schedule"

export const sponsorPayload = parseSponsorCampaigns(sponsorData)

export function getScheduledSponsorsForSlot(
  slot: SponsorSlot,
): SponsorCampaign[] {
  return getScheduledSponsors(sponsorPayload.campaigns, slot)
}
