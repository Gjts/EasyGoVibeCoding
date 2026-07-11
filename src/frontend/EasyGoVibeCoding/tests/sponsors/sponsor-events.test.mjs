import test from "node:test"
import assert from "node:assert/strict"

import { SPONSOR_SLOTS } from "../../lib/sponsor-schema.ts"
import {
  claimSponsorImpressionOnce,
  createSponsorEventPayload,
  createSponsorImpressionGate,
  getSponsorImpressionStorageKey,
  sendSponsorEvent,
} from "../../lib/sponsor-event-client.ts"
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

async function withPatchedBrowserGlobals(patches, callback) {
  const originals = new Map(
    Object.keys(patches).map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  )

  try {
    for (const [key, value] of Object.entries(patches)) {
      Object.defineProperty(globalThis, key, {
        configurable: true,
        writable: true,
        value,
      })
    }
    await callback()
  } finally {
    for (const [key, descriptor] of originals) {
      if (descriptor) {
        Object.defineProperty(globalThis, key, descriptor)
      } else {
        delete globalThis[key]
      }
    }
  }
}

function createMemorySponsorStorage(initialEntries = []) {
  const entries = new Map(initialEntries)
  return {
    getItem(key) {
      return entries.has(key) ? entries.get(key) : null
    },
    setItem(key, value) {
      entries.set(key, value)
    },
  }
}

test("frontend and function slot contracts stay identical", () => {
  assert.deepEqual(SPONSOR_EVENT_SLOTS, SPONSOR_SLOTS)
})

test("accepts the minimal privacy-safe payload", () => {
  assert.deepEqual(parseSponsorEvent(valid), valid)
})

test("client payload contains only the server-approved fields", () => {
  assert.deepEqual(
    createSponsorEventPayload({
      eventType: "click",
      campaignId: "vendor-product-2026-08",
      slot: "super-individual-home",
      path: "/super-individual",
      email: "reader@example.com",
      rawIp: "203.0.113.10",
      userAgent: "identity-like-agent",
      crossSiteId: "reader-123",
    }),
    {
      schemaVersion: 1,
      eventType: "click",
      campaignId: "vendor-product-2026-08",
      slot: "super-individual-home",
      path: "/super-individual",
    },
  )
})

test("impression dedupe key changes independently by campaign, slot, and path", () => {
  const first = getSponsorImpressionStorageKey(
    "campaign-a",
    "super-individual-home",
    "/super-individual",
  )

  assert.notEqual(
    first,
    getSponsorImpressionStorageKey(
      "campaign-b",
      "super-individual-home",
      "/super-individual",
    ),
  )
  assert.notEqual(
    first,
    getSponsorImpressionStorageKey(
      "campaign-a",
      "super-individual-monetization",
      "/super-individual",
    ),
  )
  assert.notEqual(
    first,
    getSponsorImpressionStorageKey(
      "campaign-a",
      "super-individual-home",
      "/super-individual/monetization",
    ),
  )
})

test("session impression claim succeeds once and rejects a repeat", () => {
  const storage = createMemorySponsorStorage()

  assert.equal(
    claimSponsorImpressionOnce(
      storage,
      "campaign-a",
      "super-individual-home",
      "/super-individual",
    ),
    true,
  )
  assert.equal(
    claimSponsorImpressionOnce(
      storage,
      "campaign-a",
      "super-individual-home",
      "/super-individual",
    ),
    false,
  )
})

test("session impression claim rejects an existing stored claim", () => {
  const storageKey = getSponsorImpressionStorageKey(
    "campaign-a",
    "super-individual-home",
    "/super-individual",
  )
  const storage = createMemorySponsorStorage([[storageKey, "1"]])

  assert.equal(
    claimSponsorImpressionOnce(
      storage,
      "campaign-a",
      "super-individual-home",
      "/super-individual",
    ),
    false,
  )
})

test("session impression claims remain independent by campaign, slot, and path", () => {
  const storage = createMemorySponsorStorage()
  const claims = [
    ["campaign-a", "super-individual-home", "/super-individual"],
    ["campaign-b", "super-individual-home", "/super-individual"],
    [
      "campaign-a",
      "super-individual-monetization",
      "/super-individual",
    ],
    [
      "campaign-a",
      "super-individual-home",
      "/super-individual/monetization",
    ],
  ]

  for (const [campaignId, slot, path] of claims) {
    assert.equal(
      claimSponsorImpressionOnce(storage, campaignId, slot, path),
      true,
    )
  }
})

test("session impression claim fails closed when storage reads throw", () => {
  for (const failingRead of [1, 2]) {
    let reads = 0
    const storage = {
      getItem() {
        reads += 1
        if (reads === failingRead) throw new Error("storage read failed")
        return null
      },
      setItem() {},
    }

    assert.equal(
      claimSponsorImpressionOnce(
        storage,
        "campaign-a",
        "super-individual-home",
        "/super-individual",
      ),
      false,
    )
  }
})

test("session impression claim fails closed when storage writes throw", () => {
  const storage = {
    getItem: () => null,
    setItem() {
      throw new Error("storage write failed")
    },
  }

  assert.equal(
    claimSponsorImpressionOnce(
      storage,
      "campaign-a",
      "super-individual-home",
      "/super-individual",
    ),
    false,
  )
})

test("session impression claim fails closed when persistence cannot be verified", () => {
  const storage = {
    getItem: () => null,
    setItem() {},
  }

  assert.equal(
    claimSponsorImpressionOnce(
      storage,
      "campaign-a",
      "super-individual-home",
      "/super-individual",
    ),
    false,
  )
})

test("sendSponsorEvent uses a successful JSON Blob beacon without fetching", async () => {
  const fetchCalls = []
  let beaconCall

  await withPatchedBrowserGlobals(
    {
      window: {},
      navigator: {
        sendBeacon(url, body) {
          beaconCall = { url, body }
          return true
        },
      },
      fetch(...args) {
        fetchCalls.push(args)
        return Promise.resolve(new Response(null, { status: 204 }))
      },
    },
    async () => {
      const payload = createSponsorEventPayload(valid)
      sendSponsorEvent(payload)

      assert.equal(beaconCall.url, "/api/sponsor-events")
      assert.ok(beaconCall.body instanceof Blob)
      assert.equal(beaconCall.body.type, "application/json")
      assert.deepEqual(JSON.parse(await beaconCall.body.text()), payload)
      assert.deepEqual(fetchCalls, [])
    },
  )
})

test("sendSponsorEvent falls back to keepalive fetch when beacon returns false", async () => {
  const fetchCalls = []

  await withPatchedBrowserGlobals(
    {
      window: {},
      navigator: { sendBeacon: () => false },
      fetch(...args) {
        fetchCalls.push(args)
        return Promise.resolve(new Response(null, { status: 204 }))
      },
    },
    async () => {
      const payload = createSponsorEventPayload(valid)
      sendSponsorEvent(payload)
      await Promise.resolve()

      assert.deepEqual(fetchCalls, [
        [
          "/api/sponsor-events",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "same-origin",
            keepalive: true,
          },
        ],
      ])
    },
  )
})

test("sendSponsorEvent falls back to keepalive fetch when beacon throws", async () => {
  const fetchCalls = []

  await withPatchedBrowserGlobals(
    {
      window: {},
      navigator: {
        sendBeacon() {
          throw new Error("beacon unavailable")
        },
      },
      fetch(...args) {
        fetchCalls.push(args)
        return Promise.resolve(new Response(null, { status: 204 }))
      },
    },
    async () => {
      const payload = createSponsorEventPayload(valid)
      sendSponsorEvent(payload)
      await Promise.resolve()

      assert.equal(fetchCalls.length, 1)
      assert.equal(fetchCalls[0][0], "/api/sponsor-events")
      assert.equal(fetchCalls[0][1].keepalive, true)
      assert.equal(fetchCalls[0][1].body, JSON.stringify(payload))
    },
  )
})

test("impression gate restarts a full second after visibility resumes and cleans up", () => {
  let visible = true
  let intersectionListener
  let visibilityListener
  let nextTimerId = 1
  let observerDisconnects = 0
  let visibilityUnsubscribes = 0
  let impressions = 0
  const timers = new Map()

  const dispose = createSponsorImpressionGate({
    setTimer(callback, delayMs) {
      const timerId = nextTimerId
      nextTimerId += 1
      timers.set(timerId, { callback, delayMs })
      return timerId
    },
    clearTimer(timerId) {
      timers.delete(timerId)
    },
    isPageVisible: () => visible,
    isCampaignActive: () => true,
    observeHalfVisible(listener) {
      intersectionListener = listener
      return () => {
        observerDisconnects += 1
      }
    },
    subscribeToVisibility(listener) {
      visibilityListener = listener
      return () => {
        visibilityUnsubscribes += 1
      }
    },
    onViewable: () => {
      impressions += 1
    },
  })

  intersectionListener(true)
  const firstTimerId = [...timers.keys()][0]
  assert.equal(timers.get(firstTimerId).delayMs, 1_000)

  visible = false
  visibilityListener()
  assert.equal(timers.size, 0)

  visible = true
  visibilityListener()
  const resumedTimerId = [...timers.keys()][0]
  assert.notEqual(resumedTimerId, firstTimerId)
  assert.equal(timers.get(resumedTimerId).delayMs, 1_000)

  const resumedTimer = timers.get(resumedTimerId)
  timers.delete(resumedTimerId)
  resumedTimer.callback()
  assert.equal(impressions, 1)

  intersectionListener(false)
  intersectionListener(true)
  assert.equal(timers.size, 1)
  dispose()

  assert.equal(timers.size, 0)
  assert.equal(observerDisconnects, 1)
  assert.equal(visibilityUnsubscribes, 1)

  intersectionListener(true)
  visibilityListener()
  assert.equal(timers.size, 0)
  assert.equal(impressions, 1)
})

test("impression gate rechecks page visibility and campaign activity before firing", () => {
  let visible = true
  let campaignActive = true
  let intersectionListener
  let nextTimerId = 1
  let impressions = 0
  const timers = new Map()

  const dispose = createSponsorImpressionGate({
    setTimer(callback) {
      const timerId = nextTimerId
      nextTimerId += 1
      timers.set(timerId, callback)
      return timerId
    },
    clearTimer(timerId) {
      timers.delete(timerId)
    },
    isPageVisible: () => visible,
    isCampaignActive: () => campaignActive,
    observeHalfVisible(listener) {
      intersectionListener = listener
      return () => undefined
    },
    subscribeToVisibility() {
      return () => undefined
    },
    onViewable: () => {
      impressions += 1
    },
  })

  const runOnlyTimer = () => {
    assert.equal(timers.size, 1)
    const [timerId, callback] = [...timers.entries()][0]
    timers.delete(timerId)
    callback()
  }

  intersectionListener(true)
  campaignActive = false
  runOnlyTimer()
  assert.equal(impressions, 0)

  campaignActive = true
  intersectionListener(false)
  intersectionListener(true)
  visible = false
  runOnlyTimer()
  assert.equal(impressions, 0)

  dispose()
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
