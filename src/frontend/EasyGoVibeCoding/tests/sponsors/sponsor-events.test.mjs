import test from "node:test"
import assert from "node:assert/strict"

import { SPONSOR_SLOTS } from "../../lib/sponsor-schema.ts"
import {
  SPONSOR_EVENT_SLOTS,
  parseSponsorEvent,
} from "../../functions/_shared/sponsor-event.ts"

const valid = {
  schemaVersion: 1,
  eventType: "viewable_impression",
  campaignId: "vendor-product-2026-08",
  slot: "super-individual-home",
  path: "/super-individual",
}

test("frontend and function slot contracts stay identical", () => {
  assert.deepEqual(SPONSOR_EVENT_SLOTS, SPONSOR_SLOTS)
})

test("accepts the minimal privacy-safe payload", () => {
  assert.deepEqual(parseSponsorEvent(valid), valid)
})

test("rejects unknown slots, paths, event types, and extra identity data", () => {
  assert.equal(parseSponsorEvent({ ...valid, slot: "home-hero" }), null)
  assert.equal(parseSponsorEvent({ ...valid, path: "/tools" }), null)
  assert.equal(parseSponsorEvent({ ...valid, eventType: "hover" }), null)
  assert.equal(parseSponsorEvent({ ...valid, email: "reader@example.com" }), null)
})
