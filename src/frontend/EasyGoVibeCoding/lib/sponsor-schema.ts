import { z } from "zod"

export const SPONSOR_SLOTS = [
  "super-individual-home",
  "super-individual-monetization",
] as const

export const SPONSOR_THEMES = ["violet", "blue", "emerald"] as const
export const SPONSOR_STATUSES = [
  "draft",
  "active",
  "paused",
  "ended",
] as const

const HttpsUrlSchema = z
  .string()
  .url()
  .refine((value) => {
    try {
      return new URL(value).protocol === "https:"
    } catch {
      return false
    }
  }, {
    message: "destinationUrl must use HTTPS",
  })

const SponsorSlotSchema = z.enum(SPONSOR_SLOTS)

export const SponsorCampaignSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
    advertiserName: z.string().trim().min(1).max(80),
    productName: z.string().trim().min(1).max(80),
    status: z.enum(SPONSOR_STATUSES),
    startsAt: z.string().datetime({ offset: true }),
    endsAt: z.string().datetime({ offset: true }),
    headline: z.string().trim().min(1).max(80),
    description: z.string().trim().min(1).max(180),
    ctaLabel: z.string().trim().min(1).max(24),
    destinationUrl: HttpsUrlSchema,
    logoSrc: z
      .string()
      .regex(/^\/sponsors\/[a-z0-9][a-z0-9._/-]*$/)
      .refine((value) => !value.includes(".."), {
        message: "logoSrc cannot contain path traversal segments",
      })
      .optional(),
    placements: z.array(SponsorSlotSchema).min(1).max(SPONSOR_SLOTS.length),
    theme: z.enum(SPONSOR_THEMES),
  })
  .superRefine((campaign, ctx) => {
    if (Date.parse(campaign.endsAt) <= Date.parse(campaign.startsAt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endsAt"],
        message: "endsAt must be later than startsAt",
      })
    }
    if (new Set(campaign.placements).size !== campaign.placements.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["placements"],
        message: "placements must not contain duplicates",
      })
    }
  })

export const SponsorCampaignsPayloadSchema = z
  .object({
    schemaVersion: z.literal(1),
    campaigns: z.array(SponsorCampaignSchema).max(20),
  })
  .superRefine((payload, ctx) => {
    const seenIds = new Set<string>()
    payload.campaigns.forEach((campaign, index) => {
      if (seenIds.has(campaign.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["campaigns", index, "id"],
          message: "duplicate campaign ID: " + campaign.id,
        })
      }
      seenIds.add(campaign.id)
    })

    const active = payload.campaigns
      .map((campaign, index) => ({ campaign, index }))
      .filter(({ campaign }) => campaign.status === "active")

    for (let leftIndex = 0; leftIndex < active.length; leftIndex += 1) {
      for (
        let rightIndex = leftIndex + 1;
        rightIndex < active.length;
        rightIndex += 1
      ) {
        const leftEntry = active[leftIndex]
        const rightEntry = active[rightIndex]
        const left = leftEntry.campaign
        const right = rightEntry.campaign
        const sharesSlot = left.placements.some((slot) =>
          right.placements.includes(slot),
        )
        const overlaps =
          Date.parse(left.startsAt) < Date.parse(right.endsAt) &&
          Date.parse(right.startsAt) < Date.parse(left.endsAt)

        if (sharesSlot && overlaps) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["campaigns", rightEntry.index],
            message:
              "active campaign overlap: " + left.id + " and " + right.id,
          })
        }
      }
    }
  })

export type SponsorSlot = (typeof SPONSOR_SLOTS)[number]
export type SponsorCampaign = z.infer<typeof SponsorCampaignSchema>
export type SponsorCampaignsPayload = z.infer<
  typeof SponsorCampaignsPayloadSchema
>

export function parseSponsorCampaigns(
  input: unknown,
): SponsorCampaignsPayload {
  const result = SponsorCampaignsPayloadSchema.safeParse(input)
  if (result.success) return result.data

  const issues = result.error.issues
    .slice(0, 5)
    .map((issue) => issue.path.join(".") + ": " + issue.message)
    .join("; ")
  throw new Error("sponsor campaigns invalid: " + issues)
}
