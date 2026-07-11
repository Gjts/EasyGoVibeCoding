import test from "node:test"
import assert from "node:assert/strict"

import {
  buildSponsorInquiryHtml,
  parseSponsorInquiry,
} from "../../functions/_shared/sponsor-inquiry.ts"
import { onRequestPost } from "../../functions/api/sponsor-inquiry.ts"

const valid = {
  contactName: "张三",
  email: "zhangsan@example.com",
  company: "示例科技",
  productName: "示例开发者工具",
  productUrl: "https://example.com/product",
  budgetRange: "3000-8000",
  campaignGoal: "product-launch",
  notes: "计划下月发布。",
  consent: true,
}

const ENDPOINT_URL = "https://easygovibecoding.com/api/sponsor-inquiry"
const SAME_ORIGIN = new URL(ENDPOINT_URL).origin
const CONFIGURED_ENV = {
  RESEND_API_KEY: "resend-test-key",
  SPONSOR_INBOX_EMAIL: "sponsors@example.com",
}

function sponsorRequest({
  body = JSON.stringify(valid),
  contentType = "application/json",
  origin = SAME_ORIGIN,
} = {}) {
  const headers = new Headers()
  if (contentType !== null) headers.set("Content-Type", contentType)
  if (origin !== null) headers.set("Origin", origin)

  const requestBody =
    contentType === null && typeof body === "string"
      ? new TextEncoder().encode(body)
      : body
  const init = {
    method: "POST",
    headers,
    body: requestBody,
  }
  if (requestBody instanceof ReadableStream) init.duplex = "half"

  return new Request(ENDPOINT_URL, init)
}

async function withPatchedFetch(fetchImplementation, callback) {
  const original = Object.getOwnPropertyDescriptor(globalThis, "fetch")

  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    writable: true,
    value: fetchImplementation,
  })

  try {
    return await callback()
  } finally {
    if (original) {
      Object.defineProperty(globalThis, "fetch", original)
    } else {
      delete globalThis.fetch
    }
  }
}

async function invoke(
  request,
  {
    env = CONFIGURED_ENV,
    fetchImplementation = async () =>
      new Response('{"id":"resend-message-id"}', { status: 200 }),
  } = {},
) {
  const fetchCalls = []
  const response = await withPatchedFetch(
    (...args) => {
      fetchCalls.push(args)
      return fetchImplementation(...args)
    },
    () => onRequestPost({ request, env }),
  )

  return { response, fetchCalls }
}

function assertNoCors(response) {
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null)
  assert.equal(response.headers.get("Access-Control-Allow-Methods"), null)
  assert.equal(response.headers.get("Access-Control-Allow-Headers"), null)
}

async function assertRejected(request, status, options) {
  const result = await invoke(request, options)
  assert.equal(result.response.status, status)
  assertNoCors(result.response)
  assert.deepEqual(result.fetchCalls, [])
  return result.response
}

function escapeHtmlForTest(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

test("normalizes a valid sponsor inquiry", () => {
  assert.deepEqual(parseSponsorInquiry(valid), valid)
})

test("normalizes C0 controls and CRLF without permitting header injection", () => {
  assert.deepEqual(
    parseSponsorInquiry({
      ...valid,
      contactName: "  张\r\n三\u0000 ",
      email: "ZHANGSAN@EXAMPLE.COM",
      company: "示例\t科技",
      productName: "示例\u007f工具",
      notes: "第一行\r\n第二行",
    }),
    {
      ...valid,
      contactName: "张 三",
      email: "zhangsan@example.com",
      company: "示例 科技",
      productName: "示例 工具",
      notes: "第一行 第二行",
    },
  )

  assert.equal(
    parseSponsorInquiry({
      ...valid,
      email: "zhangsan@example.com\r\nBcc: victim@example.com",
    }),
    null,
  )
})

test("accepts an omitted or blank optional HTTPS product URL", () => {
  const withoutOptional = { ...valid }
  delete withoutOptional.productUrl
  delete withoutOptional.notes

  assert.deepEqual(parseSponsorInquiry(withoutOptional), {
    ...valid,
    productUrl: "",
    notes: "",
  })
  assert.deepEqual(parseSponsorInquiry({ ...valid, productUrl: "" }), {
    ...valid,
    productUrl: "",
  })
})

test("rejects invalid email, non-HTTPS URL, and unknown enums", () => {
  assert.equal(parseSponsorInquiry({ ...valid, email: "not-an-email" }), null)
  assert.equal(
    parseSponsorInquiry({ ...valid, productUrl: "http://example.com" }),
    null,
  )
  assert.equal(
    parseSponsorInquiry({ ...valid, budgetRange: "one-million" }),
    null,
  )
  assert.equal(
    parseSponsorInquiry({ ...valid, campaignGoal: "tracking" }),
    null,
  )
})

test("requires exact boolean consent and nonblank required fields", () => {
  for (const consent of [false, "true", 1, null]) {
    assert.equal(parseSponsorInquiry({ ...valid, consent }), null)
  }

  for (const field of ["contactName", "email", "company", "productName"]) {
    assert.equal(parseSponsorInquiry({ ...valid, [field]: " \r\n " }), null)
  }
})

test("rejects arrays, objects, and other wrong scalar types", () => {
  assert.equal(parseSponsorInquiry(null), null)
  assert.equal(parseSponsorInquiry([]), null)

  const wrongScalars = [
    ["contactName", ["张三"]],
    ["email", { value: "zhangsan@example.com" }],
    ["company", 123],
    ["productName", true],
    ["productUrl", ["https://example.com"]],
    ["budgetRange", { value: "3000-8000" }],
    ["campaignGoal", ["product-launch"]],
    ["notes", { value: "hello" }],
  ]

  for (const [field, value] of wrongScalars) {
    assert.equal(
      parseSponsorInquiry({ ...valid, [field]: value }),
      null,
      field,
    )
  }
})

test("escapes every advertiser-controlled value in the email HTML", () => {
  const inquiry = {
    contactName: "<contact&\"'>",
    email: "<email&\"'>",
    company: "<company&\"'>",
    productName: "<product&\"'>",
    productUrl: "<url&\"'>",
    budgetRange: "<budget&\"'>",
    campaignGoal: "<goal&\"'>",
    notes: "<notes&\"'>",
    consent: true,
  }

  const html = buildSponsorInquiryHtml(inquiry)
  for (const value of Object.values(inquiry).filter(
    (candidate) => typeof candidate === "string",
  )) {
    assert.equal(html.includes(value), false, value)
    assert.equal(html.includes(escapeHtmlForTest(value)), true, value)
  }
})

test("accepts same-origin JSON and sends the exact Resend request", async () => {
  let responseReads = 0
  const fetchImplementation = async () => ({
    ok: true,
    async text() {
      responseReads += 1
      return '{"id":"provider-private-id"}'
    },
  })
  const inquiry = parseSponsorInquiry(valid)
  assert.ok(inquiry)

  const { response, fetchCalls } = await invoke(
    sponsorRequest({ contentType: "Application/JSON; Charset=UTF-8" }),
    { fetchImplementation },
  )

  assert.equal(response.status, 202)
  assert.deepEqual(await response.json(), { success: true })
  assert.equal(response.headers.get("Cache-Control"), "no-store")
  assertNoCors(response)
  assert.equal(responseReads, 1)
  assert.equal(fetchCalls.length, 1)

  const [url, init] = fetchCalls[0]
  assert.equal(url, "https://api.resend.com/emails")
  assert.equal(init.method, "POST")
  assert.deepEqual(init.headers, {
    Authorization: "Bearer resend-test-key",
    "Content-Type": "application/json",
  })
  assert.deepEqual(JSON.parse(init.body), {
    from: "EasyGoVibeCoding Sponsor <onboarding@resend.dev>",
    to: ["sponsors@example.com"],
    reply_to: valid.email,
    subject: `[广告合作] ${valid.company} / ${valid.productName}`,
    html: buildSponsorInquiryHtml(inquiry),
  })
})

test("returns indistinguishable 202 for a filled honeypot without fetching", async () => {
  const accepted = await invoke(sponsorRequest())
  const acceptedBody = await accepted.response.text()

  const honeypot = await invoke(
    sponsorRequest({
      body: JSON.stringify({ ...valid, website: "https://spam.example" }),
    }),
  )
  const honeypotBody = await honeypot.response.text()

  assert.equal(honeypot.response.status, accepted.response.status)
  assert.equal(honeypotBody, acceptedBody)
  assert.deepEqual(
    Object.fromEntries(honeypot.response.headers),
    Object.fromEntries(accepted.response.headers),
  )
  assertNoCors(honeypot.response)
  assert.equal(accepted.fetchCalls.length, 1)
  assert.deepEqual(honeypot.fetchCalls, [])
})

test("does not let the honeypot bypass configuration or inquiry validation", async () => {
  await assertRejected(
    sponsorRequest({
      body: JSON.stringify({ ...valid, website: "filled" }),
    }),
    500,
    { env: {} },
  )
  await assertRejected(
    sponsorRequest({
      body: JSON.stringify({
        ...valid,
        contactName: "",
        website: "filled",
      }),
    }),
    400,
  )
  await assertRejected(
    sponsorRequest({
      body: JSON.stringify({ ...valid, website: { filled: true } }),
    }),
    400,
  )
})

test("rejects missing and cross-origin requests without fetching", async () => {
  await assertRejected(sponsorRequest({ origin: null }), 403)
  await assertRejected(
    sponsorRequest({ origin: "https://tracker.example" }),
    403,
  )
})

test("accepts only the exact application/json media type", async () => {
  for (const contentType of [null, "text/plain", "application/jsonp"]) {
    await assertRejected(sponsorRequest({ contentType }), 400)
  }
})

test("rejects and immediately cancels a multibyte body above 8,192 bytes", async () => {
  const encoder = new TextEncoder()
  const chunks = [encoder.encode("界".repeat(2730)), encoder.encode("界")]
  assert.equal(chunks[0].byteLength, 8190)
  assert.equal(chunks[0].byteLength + chunks[1].byteLength, 8193)

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

test("rejects malformed, invalid, and wrong-scalar JSON without fetching", async () => {
  await assertRejected(sponsorRequest({ body: "{" }), 400)
  await assertRejected(sponsorRequest({ body: "[]" }), 400)
  await assertRejected(
    sponsorRequest({
      body: JSON.stringify({ ...valid, notes: { private: "value" } }),
    }),
    400,
  )
})

test("rejects missing or non-boolean consent without fetching", async () => {
  const withoutConsent = { ...valid }
  delete withoutConsent.consent
  for (const body of [
    withoutConsent,
    { ...valid, consent: false },
    { ...valid, consent: "true" },
  ]) {
    await assertRejected(
      sponsorRequest({ body: JSON.stringify(body) }),
      400,
    )
  }
})

test("returns the same generic 500 for absent or invalid email configuration", async () => {
  const environments = [
    {},
    {
      RESEND_API_KEY: "   ",
      SPONSOR_INBOX_EMAIL: "sponsors@example.com",
    },
    { RESEND_API_KEY: "resend-test-key" },
    {
      RESEND_API_KEY: "resend-test-key",
      SPONSOR_INBOX_EMAIL: "not-an-email",
    },
    {
      RESEND_API_KEY: "resend-test-key",
      SPONSOR_INBOX_EMAIL: "sponsors@example.com\r\nBcc: victim@example.com",
    },
  ]
  const responseBodies = []

  for (const env of environments) {
    const response = await assertRejected(sponsorRequest(), 500, { env })
    responseBodies.push(await response.text())
  }

  assert.equal(new Set(responseBodies).size, 1)
  assert.deepEqual(JSON.parse(responseBodies[0]), {
    error: "Internal server error",
  })
})

test("maps every Resend failure to the same generic 502 without retrying", async () => {
  const failures = [
    async () => new Response("provider secret", { status: 422 }),
    async () => {
      throw new Error("provider network secret")
    },
    async () => ({
      ok: true,
      async text() {
        throw new Error("provider response-read secret")
      },
    }),
  ]
  const responseBodies = []

  for (const fetchImplementation of failures) {
    const { response, fetchCalls } = await invoke(sponsorRequest(), {
      fetchImplementation,
    })
    assert.equal(response.status, 502)
    assertNoCors(response)
    assert.equal(fetchCalls.length, 1)
    responseBodies.push(await response.text())
  }

  assert.equal(new Set(responseBodies).size, 1)
  assert.deepEqual(JSON.parse(responseBodies[0]), {
    error: "Upstream email service unavailable",
  })
  assert.doesNotMatch(responseBodies[0], /provider|secret|network|response-read/)
})
