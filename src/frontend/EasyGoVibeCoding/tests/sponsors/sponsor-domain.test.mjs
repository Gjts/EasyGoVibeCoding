import test from "node:test"
import assert from "node:assert/strict"

import {
  parseSponsorCampaigns,
} from "../../lib/sponsor-schema.ts"
import {
  getScheduledSponsors,
  selectActiveSponsor,
} from "../../lib/sponsor-schedule.ts"

function campaign(overrides = {}) {
  return {
    id: "vendor-product-2026-08",
    advertiserName: "Vendor",
    productName: "Product",
    status: "active",
    startsAt: "2026-08-01T00:00:00+08:00",
    endsAt: "2026-09-01T00:00:00+08:00",
    headline: "Ship faster with Product",
    description: "A developer tool for building and deploying AI applications.",
    ctaLabel: "了解产品",
    destinationUrl: "https://example.com/product?utm_source=easygovibecoding",
    placements: ["super-individual-home"],
    theme: "violet",
    ...overrides,
  }
}

test("parses a valid payload and selects the campaign inside its window", () => {
  const payload = parseSponsorCampaigns({
    schemaVersion: 1,
    campaigns: [campaign()],
  })

  assert.equal(
    selectActiveSponsor(
      payload.campaigns,
      "super-individual-home",
      new Date("2026-08-15T00:00:00+08:00"),
    )?.id,
    "vendor-product-2026-08",
  )
})

test("does not select campaigns before start, at end, or in another slot", () => {
  const campaigns = [campaign()]

  assert.equal(
    selectActiveSponsor(
      campaigns,
      "super-individual-home",
      new Date("2026-07-31T23:59:59+08:00"),
    ),
    null,
  )
  assert.equal(
    selectActiveSponsor(
      campaigns,
      "super-individual-home",
      new Date("2026-09-01T00:00:00+08:00"),
    ),
    null,
  )
  assert.equal(
    selectActiveSponsor(
      campaigns,
      "super-individual-monetization",
      new Date("2026-08-15T00:00:00+08:00"),
    ),
    null,
  )
})

test("orders mixed-offset starts chronologically and breaks ties by ID", () => {
  const campaigns = [
    campaign({
      id: "zulu-tie",
      startsAt: "2026-07-31T16:30:00+00:00",
    }),
    campaign({
      id: "later-utc",
      startsAt: "2026-07-31T17:00:00+00:00",
    }),
    campaign({
      id: "alpha-tie",
      startsAt: "2026-08-01T00:30:00+08:00",
    }),
  ]

  assert.deepEqual(
    getScheduledSponsors(campaigns, "super-individual-home").map(
      ({ id }) => id,
    ),
    ["alpha-tie", "zulu-tie", "later-utc"],
  )
})

test("rejects non-HTTPS destinations and reversed dates", () => {
  assert.throws(
    () =>
      parseSponsorCampaigns({
        schemaVersion: 1,
        campaigns: [campaign({ destinationUrl: "http://example.com" })],
      }),
    /destinationUrl/,
  )
  assert.throws(
    () =>
      parseSponsorCampaigns({
        schemaVersion: 1,
        campaigns: [
          campaign({
            startsAt: "2026-09-01T00:00:00+08:00",
            endsAt: "2026-08-01T00:00:00+08:00",
          }),
        ],
      }),
    /endsAt/,
  )
})

test("reports malformed destinations as normalized validation errors", () => {
  let thrown

  try {
    parseSponsorCampaigns({
      schemaVersion: 1,
      campaigns: [campaign({ destinationUrl: "not a url" })],
    })
  } catch (error) {
    thrown = error
  }

  assert.ok(thrown instanceof Error)
  assert.match(thrown.message, /destinationUrl/)
})

test("rejects overlapping active campaigns in the same slot", () => {
  assert.throws(
    () =>
      parseSponsorCampaigns({
        schemaVersion: 1,
        campaigns: [
          campaign(),
          campaign({
            id: "second-product-2026-08",
            startsAt: "2026-08-15T00:00:00+08:00",
            endsAt: "2026-09-15T00:00:00+08:00",
          }),
        ],
      }),
    /overlap/,
  )
})

test("rejects duplicate campaign IDs", () => {
  assert.throws(
    () =>
      parseSponsorCampaigns({
        schemaVersion: 1,
        campaigns: [
          campaign(),
          campaign({
            startsAt: "2026-10-01T00:00:00+08:00",
            endsAt: "2026-11-01T00:00:00+08:00",
          }),
        ],
      }),
    /duplicate campaign ID/,
  )
})
