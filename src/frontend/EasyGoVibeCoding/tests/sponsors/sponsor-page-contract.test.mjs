import test from "node:test"
import assert from "node:assert/strict"

import {
  SPONSOR_BUDGET_RANGES,
  SPONSOR_CAMPAIGN_GOALS,
  parseSponsorInquiry,
} from "../../functions/_shared/sponsor-inquiry.ts"
import {
  INITIAL_SPONSOR_INQUIRY_FORM,
  SPONSOR_BUDGET_OPTIONS,
  SPONSOR_CAMPAIGN_GOAL_OPTIONS,
  SPONSOR_GITHUB_CONTACT_URL,
  SPONSOR_INQUIRY_COPY,
  SPONSOR_INQUIRY_MAX_LENGTHS,
  getSponsorInquiryErrorMessage,
  submitSponsorInquiry,
} from "../../lib/sponsor-inquiry-client.ts"
import * as sponsorOfferContract from "../../lib/sponsor-offers.ts"

const { SPONSOR_OFFERS, SPONSOR_PILOT_INVENTORY } = sponsorOfferContract

const validInquiry = {
  contactName: "张三",
  email: "zhangsan@example.com",
  company: "示例科技",
  productName: "示例开发者工具",
  productUrl: "https://example.com/product",
  budgetRange: "3000-8000",
  campaignGoal: "product-launch",
  notes: "计划下月发布。",
  consent: true,
  website: "",
}

test("publishes only the three approved pilot offers without rewriting them", () => {
  assert.deepEqual(SPONSOR_OFFERS, [
    {
      id: "context-card",
      name: "上下文赞助卡",
      price: "¥1,500–3,000 / 30 天",
      description: "在一个约定的高相关页面获得独占赞助卡和聚合交付报告。",
    },
    {
      id: "module-exclusive",
      name: "超级个体模块独家赞助",
      price: "¥4,000–8,000 / 30 天",
      description: "覆盖最多两个约定页面，同类竞品不在同一排期展示。",
    },
    {
      id: "sponsored-challenge",
      name: "品牌实战挑战",
      price: "¥8,000–15,000 / 期",
      description: "共创一期明确标注广告的开发实践、模板或挑战，并提供结项报告。",
    },
  ])
})

test("separates the custom challenge from the two existing card slots", () => {
  assert.equal(
    sponsorOfferContract.SPONSOR_CUSTOM_CONTENT_CLARIFICATION,
    "品牌实战挑战属于需单独评估和实现的定制内容，并非第三个现有广告位；本轮卡片库存仍仅限上方两个页面。",
  )
})

test("publishes only the two approved pilot slots at one card per page", () => {
  assert.deepEqual(SPONSOR_PILOT_INVENTORY, [
    {
      slot: "super-individual-home",
      path: "/super-individual",
      maximumActiveCards: 1,
    },
    {
      slot: "super-individual-monetization",
      path: "/super-individual/monetization",
      maximumActiveCards: 1,
    },
  ])
})

test("keeps every public select option synchronized with the server parser", () => {
  assert.deepEqual(
    SPONSOR_BUDGET_OPTIONS.map(({ value }) => value),
    [...SPONSOR_BUDGET_RANGES],
  )
  assert.deepEqual(
    SPONSOR_CAMPAIGN_GOAL_OPTIONS.map(({ value }) => value),
    [...SPONSOR_CAMPAIGN_GOALS],
  )

  for (const { value: budgetRange } of SPONSOR_BUDGET_OPTIONS) {
    assert.equal(
      parseSponsorInquiry({ ...validInquiry, budgetRange })?.budgetRange,
      budgetRange,
    )
  }
  for (const { value: campaignGoal } of SPONSOR_CAMPAIGN_GOAL_OPTIONS) {
    assert.equal(
      parseSponsorInquiry({ ...validInquiry, campaignGoal })?.campaignGoal,
      campaignGoal,
    )
  }
})

test("matches every client text limit to the server contract", () => {
  assert.deepEqual(SPONSOR_INQUIRY_MAX_LENGTHS, {
    contactName: 80,
    email: 160,
    company: 120,
    productName: 120,
    productUrl: 300,
    notes: 1200,
  })
  assert.equal(INITIAL_SPONSOR_INQUIRY_FORM.consent, false)
  assert.equal(INITIAL_SPONSOR_INQUIRY_FORM.website, "")
})

test("maps every endpoint failure to fixed Chinese copy", () => {
  assert.deepEqual(
    [400, 403, 413, 500, 502].map((status) =>
      getSponsorInquiryErrorMessage(status),
    ),
    [
      SPONSOR_INQUIRY_COPY.invalid,
      SPONSOR_INQUIRY_COPY.forbidden,
      SPONSOR_INQUIRY_COPY.tooLarge,
      SPONSOR_INQUIRY_COPY.unavailable,
      SPONSOR_INQUIRY_COPY.deliveryUnavailable,
    ],
  )
  assert.equal(
    getSponsorInquiryErrorMessage(418),
    SPONSOR_INQUIRY_COPY.unexpected,
  )
  assert.match(SPONSOR_INQUIRY_COPY.noScript, /JavaScript/)
  assert.match(SPONSOR_INQUIRY_COPY.noScriptWarning, /请勿.*公开/)
  assert.equal(SPONSOR_INQUIRY_COPY.newWindowCue, "（新窗口打开）")
  assert.equal(
    SPONSOR_GITHUB_CONTACT_URL,
    "https://github.com/Gjts/EasyGoVibeCoding/issues/new",
  )
})

test("accepts only 202 and never renders or trusts a server error body", async () => {
  let calls = 0
  let bodyReads = 0
  const result = await submitSponsorInquiry(validInquiry, {
    fetcher: async () => {
      calls += 1
      return {
        status: 400,
        async json() {
          bodyReads += 1
          return { error: "不应展示的服务端详情" }
        },
      }
    },
  })

  assert.deepEqual(result, {
    ok: false,
    message: SPONSOR_INQUIRY_COPY.invalid,
  })
  assert.equal(calls, 1)
  assert.equal(bodyReads, 0)
})

test("submits once and clears the timeout after a 202 response", async () => {
  let calls = 0
  let submittedSignal
  const result = await submitSponsorInquiry(validInquiry, {
    timeoutMs: 5,
    fetcher: async (_url, init) => {
      calls += 1
      submittedSignal = init.signal
      return { status: 202 }
    },
  })

  await new Promise((resolve) => setTimeout(resolve, 15))

  assert.deepEqual(result, {
    ok: true,
    message: SPONSOR_INQUIRY_COPY.success,
  })
  assert.equal(calls, 1)
  assert.equal(submittedSignal.aborted, false)
})

test("maps timeout and network failures without automatic retry", async () => {
  let timeoutCalls = 0
  const timedOut = await submitSponsorInquiry(validInquiry, {
    timeoutMs: 1,
    fetcher: async (_url, init) => {
      timeoutCalls += 1
      return new Promise((_resolve, reject) => {
        init.signal.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true },
        )
      })
    },
  })

  let networkCalls = 0
  const networkFailure = await submitSponsorInquiry(validInquiry, {
    fetcher: async () => {
      networkCalls += 1
      throw new TypeError("offline")
    },
  })

  assert.deepEqual(timedOut, {
    ok: false,
    message: SPONSOR_INQUIRY_COPY.timeout,
  })
  assert.deepEqual(networkFailure, {
    ok: false,
    message: SPONSOR_INQUIRY_COPY.network,
  })
  assert.equal(timeoutCalls, 1)
  assert.equal(networkCalls, 1)
})
