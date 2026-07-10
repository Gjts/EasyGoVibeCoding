import test from "node:test"
import assert from "node:assert/strict"

import { SPONSOR_SLOTS } from "../../lib/sponsor-schema.ts"
import {
  SPONSOR_EVENT_SLOTS,
  parseSponsorEvent,
} from "../../functions/_shared/sponsor-event.ts"
import { onRequestPost } from "../../functions/api/sponsor-events.ts"

const valid = {
  schemaVersion: 1,
  eventType: "viewable_impression",
  campaignId: "vendor-product-2026-08",
  slot: "super-individual-home",
  path: "/super-individual",
}

const ENDPOINT_URL = "https://easygovibecoding.com/api/sponsor-events"
const SAME_ORIGIN = new URL(ENDPOINT_URL).origin

function sponsorRequest({
  body = JSON.stringify(valid),
  contentType = "application/json",
  origin = SAME_ORIGIN,
} = {}) {
  const headers = new Headers()
  if (contentType !== null) headers.set("Content-Type", contentType)
  if (origin !== null) headers.set("Origin", origin)

  const init = {
    method: "POST",
    headers,
    body,
  }
  if (body instanceof ReadableStream) init.duplex = "half"

  return new Request(ENDPOINT_URL, init)
}

async function invoke(request, { configured = true } = {}) {
  const writes = []
  const env = configured
    ? {
        SPONSOR_ANALYTICS: {
          writeDataPoint(dataPoint) {
            writes.push(dataPoint)
          },
        },
      }
    : {}
  const response = await onRequestPost({ request, env })
  return { response, writes }
}

async function assertRejected(request, status, options) {
  const result = await invoke(request, options)
  assert.equal(result.response.status, status)
  assert.equal(result.response.headers.get("Access-Control-Allow-Origin"), null)
  assert.deepEqual(result.writes, [])
  return result.response
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

test("accepts same-origin JSON and writes the ordered analytics dimensions", async () => {
  const { response, writes } = await invoke(
    sponsorRequest({ contentType: "Application/JSON; Charset=UTF-8" }),
  )

  assert.equal(response.status, 204)
  assert.equal(await response.text(), "")
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null)
  assert.deepEqual(writes, [
    {
      indexes: [valid.campaignId],
      blobs: [valid.eventType, valid.slot, valid.path],
      doubles: [1],
    },
  ])
})

test("rejects a missing origin without writing analytics", async () => {
  await assertRejected(sponsorRequest({ origin: null }), 403)
})

test("rejects a cross-origin request without writing analytics", async () => {
  await assertRejected(
    sponsorRequest({ origin: "https://tracker.example" }),
    403,
  )
})

test("returns 503 without writing when Analytics Engine is unbound", async () => {
  await assertRejected(sponsorRequest(), 503, { configured: false })
})

test("rejects non-JSON media types without writing analytics", async () => {
  await assertRejected(sponsorRequest({ contentType: "text/plain" }), 400)
})

test("rejects a missing Content-Type without writing analytics", async () => {
  await assertRejected(sponsorRequest({ contentType: null }), 400)
})

test("rejects application/jsonp without writing analytics", async () => {
  await assertRejected(
    sponsorRequest({ contentType: "application/jsonp" }),
    400,
  )
})

test("rejects malformed JSON without writing analytics", async () => {
  await assertRejected(sponsorRequest({ body: "{" }), 400)
})

test("rejects an invalid event payload without writing analytics", async () => {
  await assertRejected(
    sponsorRequest({ body: JSON.stringify({ ...valid, email: "reader@example.com" }) }),
    400,
  )
})

test("rejects and cancels a multibyte body above 2,048 bytes", async () => {
  const encoder = new TextEncoder()
  const chunks = [
    encoder.encode("界".repeat(682)),
    encoder.encode("界"),
  ]
  assert.equal(chunks[0].byteLength, 2046)
  assert.equal(chunks[0].byteLength + chunks[1].byteLength, 2049)

  let pulls = 0
  let cancelled = false
  const body = new ReadableStream(
    {
      pull(controller) {
        const chunk = chunks[pulls]
        pulls += 1
        if (chunk) {
          controller.enqueue(chunk)
        } else {
          controller.close()
        }
      },
      cancel() {
        cancelled = true
      },
    },
    { highWaterMark: 0 },
  )

  await assertRejected(sponsorRequest({ body }), 413)
  assert.equal(cancelled, true)
  assert.equal(pulls, 2)
})
