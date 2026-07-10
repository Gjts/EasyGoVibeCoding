# Super Individual Sponsor Monetization MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (<code>- [ ]</code>) syntax for tracking.

**Goal:** Build a trustworthy direct-sponsorship MVP that lets EasyGoVibeCoding sell one clearly disclosed developer-tool advertisement per eligible Super Individual page, collect qualified sponsor inquiries, measure privacy-safe delivery, and export an advertiser report.

**Architecture:** Sponsor campaigns are controlled by a versioned static JSON file, validated with Zod before every build, and selected by a small scheduling domain module. Two page-local placements pass scheduled campaigns into one client component; the component performs time-window selection, viewability measurement, session deduplication, and same-origin event delivery to a Cloudflare Pages Function backed by Workers Analytics Engine. A separate sponsor inquiry page posts to a separate Resend-backed Function so advertising leads never share the existing feedback-consent workflow.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict mode, Zod 3, Tailwind CSS 4, existing shadcn/ui primitives, Cloudflare Pages Functions, Workers Analytics Engine, Resend, Node 24 built-in test runner, pnpm.

## Global Constraints

- Run all frontend commands from <code>src/frontend/EasyGoVibeCoding/</code>.
- Run every <code>git</code> and GitNexus command from the repository root.
- China-first direct sponsorship only; do not add AdSense, Carbon, EthicalAds, or any third-party advertising script.
- MVP inventory is limited to <code>super-individual-home</code> and <code>super-individual-monetization</code>.
- Render at most one active sponsor card per page.
- Every placement must visibly contain the exact Chinese label <code>广告</code>.
- Paid placement must never affect editorial rankings, recommendations, or course conclusions.
- Store only campaign ID, event type, slot, path, server timestamp, and count. Do not store raw IP addresses, email addresses, cross-site identifiers, user-agent strings, or third-party cookies in sponsor analytics.
- An impression is countable only after at least 50 percent of the card is visible for 1,000 milliseconds.
- Deduplicate viewable impressions per browser session, campaign, slot, and path. Do not deduplicate clicks.
- External sponsor links must be HTTPS and render with <code>rel="sponsored noopener noreferrer"</code>.
- Sponsor images must be local files below <code>public/sponsors/</code>; never hotlink advertiser assets.
- No new npm dependency is allowed.
- Node.js runtime floor is 24.0.0 because build validation and tests use native TypeScript stripping when importing focused TypeScript modules from Node.
- Preserve static export and Cloudflare Pages deployment.
- Do not modify <code>components/course/course-layout.tsx</code>. GitNexus reports CRITICAL impact: 74 direct callers, 32 affected processes, and 5 modules.
- Before modifying any existing function or component, run GitNexus upstream impact analysis. Warn before any HIGH or CRITICAL edit.
- Before every commit, run <code>node .gitnexus/run.cjs detect-changes --scope staged</code> and confirm the reported symbols match that task.
- Use Lore commit messages: intent-first subject plus Confidence, Scope-risk, Directive, Tested, and Not-tested trailers where useful.
- Current verification baseline on 2026-07-11: frontend TypeScript passes, Functions TypeScript passes, model validation passes. Full lint has 229 existing errors and 60 warnings. Every new or modified file must have zero lint errors; full-lint totals must not increase.
- Do not deploy to production until a user explicitly authorizes deployment and the Cloudflare Analytics Engine binding plus Resend secret are configured.

## Commercial Launch Gate

Implementation may proceed with an empty campaign list. A real campaign may be activated only when all of these values exist in a signed insertion order:

- advertiser legal name and public product name;
- approved headline, description, CTA, and local logo asset;
- HTTPS destination URL with agreed UTM parameters;
- exact slot list;
- start and end timestamps in ISO 8601 with timezone offset;
- fixed fee, invoice state, cancellation terms, and delivery/reporting terms;
- evidence supporting every quantitative claim in the creative.

Stop before production activation if no sponsor has signed or paid the agreed deposit. Do not compensate by building self-service checkout or adding more ad inventory.

## Data and Event Contracts

### Campaign source of truth

<code>data/sponsor-campaigns.json</code> is the only campaign source of truth. It contains no arbitrary HTML.

~~~json
{
  "schemaVersion": 1,
  "campaigns": []
}
~~~

### Client event body

~~~json
{
  "schemaVersion": 1,
  "eventType": "viewable_impression",
  "campaignId": "vendor-product-2026-08",
  "slot": "super-individual-home",
  "path": "/super-individual"
}
~~~

### Analytics Engine column mapping

| Column | Meaning |
| --- | --- |
| <code>index1</code> | Campaign ID and sampling key |
| <code>blob1</code> | <code>viewable_impression</code> or <code>click</code> |
| <code>blob2</code> | Sponsor slot |
| <code>blob3</code> | Page path |
| <code>double1</code> | Constant <code>1</code> |
| <code>timestamp</code> | Cloudflare server timestamp |

## File Structure

### Create

- <code>docs/bussiness/Sponsor_Advertising_Policy.md</code> — public trust and content rules.
- <code>docs/bussiness/Sponsor_Rate_Card.md</code> — pilot inventory, price hypotheses, and sales terms.
- <code>docs/bussiness/Sponsor_Operations_Runbook.md</code> — campaign setup, reporting, pause, and takedown procedure.
- <code>data/sponsor-campaigns.json</code> — versioned campaign source.
- <code>lib/sponsor-schema.ts</code> — Zod campaign contract and parser.
- <code>lib/sponsor-schedule.ts</code> — pure time-window and slot selection.
- <code>lib/sponsors.ts</code> — parsed production data access.
- <code>lib/sponsor-event-client.ts</code> — event payload builder and beacon/fetch transport.
- <code>lib/sponsor-offers.ts</code> — public sponsor packages shown on the media-kit page.
- <code>components/sponsor/sponsored-placement.tsx</code> — disclosed ad card and viewability tracker.
- <code>components/sponsor/sponsor-inquiry-form.tsx</code> — accessible sponsor lead form.
- <code>app/sponsor/page.tsx</code> — media kit and inquiry route.
- <code>functions/_shared/sponsor-event.ts</code> — server event validator.
- <code>functions/_shared/sponsor-inquiry.ts</code> — server lead validator and safe email renderer.
- <code>functions/api/sponsor-events.ts</code> — same-origin analytics ingestion endpoint.
- <code>functions/api/sponsor-inquiry.ts</code> — same-origin Resend inquiry endpoint.
- <code>scripts/validate-sponsor-campaigns.mjs</code> — build-time JSON validation.
- <code>scripts/export-sponsor-report.mjs</code> — authenticated operator-only report export.
- <code>tests/sponsors/sponsor-domain.test.mjs</code> — campaign and scheduling tests.
- <code>tests/sponsors/sponsor-events.test.mjs</code> — client/server event contract tests.
- <code>tests/sponsors/sponsor-inquiry.test.mjs</code> — inquiry validation and escaping tests.
- <code>tests/sponsors/sponsor-report.test.mjs</code> — safe SQL query builder tests.

### Modify

- <code>app/super-individual/page.tsx:1-3,80-107</code> — add the home slot between learning goals and module navigation.
- <code>app/super-individual/monetization/page.tsx:1-3,29-49</code> — add the monetization slot between offers and pricing.
- <code>functions/worker-types.d.ts</code> — declare the Analytics Engine binding interface.
- <code>package.json:4-15</code> — add sponsor validation, test, report, and explicit typecheck scripts.
- <code>wrangler.toml:29</code> — bind <code>SPONSOR_ANALYTICS</code>.

---


### Task 1: Lock Advertising Trust, Inventory, and Sales Rules

**Files:**

- Create: <code>docs/bussiness/Sponsor_Advertising_Policy.md</code>
- Create: <code>docs/bussiness/Sponsor_Rate_Card.md</code>

**Interfaces:**

- Consumes: the commercial launch gate in this plan.
- Produces: immutable product rules used by Tasks 2, 4, 6, and 8; package IDs <code>context-card</code>, <code>module-exclusive</code>, and <code>sponsored-challenge</code>.

- [ ] **Step 1: Write the advertising policy**

Create <code>docs/bussiness/Sponsor_Advertising_Policy.md</code> with this complete content:

~~~markdown
# EasyGoVibeCoding 广告与赞助政策

## 原则

EasyGoVibeCoding 只接受与 AI 编程、开发者工具、云服务、部署、数据库、支付、监控、招聘或独立开发相关的广告。广告收入用于维持免费教育内容，但广告主无权影响课程结论、工具排名或编辑评价。

## 可识别性

- 所有付费展示必须显著标注“广告”。
- 广告与课程正文使用不同的边框、背景和说明文字。
- 广告卡固定说明：“广告内容由广告主提供；不影响本站编辑评价。”
- 赞助案例、挑战或文章必须在标题附近标注“广告”。

## 素材要求

- 广告主名称、产品名称、功能、价格和承诺必须准确。
- 数据、统计、调查结果和引用必须提交可核验出处。
- 禁止“国家级”“最高级”“最佳”等无法合规证明的绝对化表述。
- 只接受 HTTPS 目标地址和已授权的本地品牌素材。
- 不接受任意 HTML、脚本、追踪像素或第三方 Cookie。

## 禁投范围

- 赌博、博彩、烟草、成人、违法金融或收益保证；
- 未经资质审核的医疗、药品、保健品；
- 恶意软件、破解、绕过平台安全限制的工具；
- 虚假招聘、刷量、账号交易和数据买卖；
- 与开发者受众明显无关或可能损害读者信任的产品。

## 数据与隐私

本站只报告按 Campaign、日期、广告位和页面聚合的有效曝光与点击。有效曝光指广告至少 50% 可见并持续 1 秒。本站不为广告目的存储原始 IP、邮箱、跨站身份、User-Agent 或第三方 Cookie。

## 审核与下线

每个 Campaign 上线前必须完成广告主身份、目标地址、素材、证明文件、合同和付款状态检查。发现虚假、失效、被劫持或引发安全风险的素材时，本站可立即暂停，并在一个工作日内通知广告主。

## 编辑独立

付费展示不构成产品背书。广告主可以纠正自身产品事实，但不能要求删除真实缺点、提高排名、排除非竞品内容或伪装成用户评价。
~~~

- [ ] **Step 2: Write the pilot rate card**

Create <code>docs/bussiness/Sponsor_Rate_Card.md</code> with this complete content:

~~~markdown
# EasyGoVibeCoding 赞助合作试运行价目表

> 本价目表是首批 Campaign 的验证价格。完成 2 个付费 Campaign 后，根据真实受众、交付量和续费反馈复核。

## 套餐

| ID | 产品 | 试运行价格 | 交付 |
| --- | --- | ---: | --- |
| context-card | 上下文赞助卡 | ¥1,500–3,000 / 30 天 | 1 个指定页面广告位、100% 份额、聚合曝光与点击报告 |
| module-exclusive | 超级个体模块独家赞助 | ¥4,000–8,000 / 30 天 | 最多 2 个约定页面、同类竞品不同时展示、聚合报告 |
| sponsored-challenge | 品牌实战挑战 | ¥8,000–15,000 / 期 | 一期明确标注广告的实战内容、素材审核和结项报告 |

## 商务条款

- 采用固定费用，不承诺 CPC、CPA 或销售转化。
- 首次合作在排期确认后支付 50% 订金，上线前付清余款。
- 报价包含一次素材修改；额外制作按书面确认另行报价。
- 报告包含日期、广告位、页面、有效曝光、点击和点击率。
- 广告主延迟交付合格素材不会自动延长排期。
- 本站故障导致的少量未交付可顺延展示；不以虚构数据补齐。
- 所有价格、排期、素材和退款条件以双方书面订单为准。
~~~

- [ ] **Step 3: Verify policy coverage**

Run from the repository root:

~~~powershell
rg -n "广告|编辑评价|有效曝光|原始 IP|第三方 Cookie|禁投范围" docs/bussiness/Sponsor_Advertising_Policy.md
rg -n "context-card|module-exclusive|sponsored-challenge|50%|聚合报告" docs/bussiness/Sponsor_Rate_Card.md
~~~

Expected: every searched policy phrase and all three package IDs are present.

- [ ] **Step 4: Stage, inspect, and commit**

~~~powershell
git add docs/bussiness/Sponsor_Advertising_Policy.md docs/bussiness/Sponsor_Rate_Card.md
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Protect reader trust before accepting sponsor revenue" -m "Define visible disclosure, editorial independence, prohibited categories, privacy limits, pilot inventory, and commercial terms before code creates sellable placements." -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Do not add inventory or weaken the exact 广告 label without reviewing this policy." -m "Tested: Required policy and rate-card terms verified with ripgrep" -m "Not-tested: Legal counsel review and first advertiser negotiation"
~~~

Expected: GitNexus reports documentation-only changes; commit succeeds.

---


### Task 2: Create the Campaign Contract, Scheduler, and Build Gate

**Files:**

- Create: <code>lib/sponsor-schema.ts</code>
- Create: <code>lib/sponsor-schedule.ts</code>
- Create: <code>lib/sponsors.ts</code>
- Create: <code>data/sponsor-campaigns.json</code>
- Create: <code>scripts/validate-sponsor-campaigns.mjs</code>
- Create: <code>tests/sponsors/sponsor-domain.test.mjs</code>
- Modify: <code>package.json:4-15</code>

**Interfaces:**

- Produces: <code>SponsorSlot</code>, <code>SponsorCampaign</code>, <code>SponsorCampaignsPayload</code>, <code>parseSponsorCampaigns(input)</code>, <code>selectActiveSponsor(campaigns, slot, now)</code>, and <code>getScheduledSponsorsForSlot(slot)</code>.
- Consumers: Tasks 3 and 4.

- [ ] **Step 1: Write failing domain tests**

Create <code>tests/sponsors/sponsor-domain.test.mjs</code>:

~~~javascript
import test from "node:test"
import assert from "node:assert/strict"

import {
  parseSponsorCampaigns,
} from "../../lib/sponsor-schema.ts"
import {
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
~~~

- [ ] **Step 2: Run tests and verify the missing-module failure**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-domain.test.mjs
~~~

Expected: FAIL with <code>ERR_MODULE_NOT_FOUND</code> for <code>lib/sponsor-schema.ts</code>.

- [ ] **Step 3: Implement the Zod contract**

Create <code>lib/sponsor-schema.ts</code>:

~~~typescript
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
  .refine((value) => new URL(value).protocol === "https:", {
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
~~~

- [ ] **Step 4: Implement pure scheduling**

Create <code>lib/sponsor-schedule.ts</code>:

~~~typescript
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
~~~

- [ ] **Step 5: Add the empty production source and access module**

Create <code>data/sponsor-campaigns.json</code>:

~~~json
{
  "schemaVersion": 1,
  "campaigns": []
}
~~~

Create <code>lib/sponsors.ts</code>:

~~~typescript
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
~~~

- [ ] **Step 6: Add build-time validation**

Create <code>scripts/validate-sponsor-campaigns.mjs</code>:

~~~javascript
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { parseSponsorCampaigns } from "../lib/sponsor-schema.ts"

const here = dirname(fileURLToPath(import.meta.url))
const jsonPath = resolve(here, "../data/sponsor-campaigns.json")

try {
  const raw = JSON.parse(readFileSync(jsonPath, "utf8"))
  const payload = parseSponsorCampaigns(raw)
  console.log(
    "✅ data/sponsor-campaigns.json valid: " +
      payload.campaigns.length +
      " campaigns",
  )
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error("❌ " + message)
  process.exit(1)
}
~~~

Modify <code>package.json</code> so it declares the Node floor and the scripts block contains these additions while existing scripts remain:

~~~json
{
  "engines": {
    "node": ">=24.0.0"
  },
  "scripts": {
    "prebuild": "node scripts/validate-models-json.mjs && node scripts/validate-sponsor-campaigns.mjs",
    "test:sponsors": "node --test tests/sponsors/*.test.mjs",
    "typecheck": "tsc --noEmit",
    "typecheck:functions": "tsc --project tsconfig.functions.json",
    "validate:models": "node scripts/validate-models-json.mjs",
    "validate:sponsors": "node scripts/validate-sponsor-campaigns.mjs"
  }
}
~~~

Do not remove <code>build</code>, <code>postbuild</code>, <code>dev</code>, <code>lint</code>, <code>start</code>, or <code>pages:deploy</code>.

- [ ] **Step 7: Run the domain verification**

~~~powershell
pnpm test:sponsors
pnpm validate:sponsors
pnpm typecheck
pnpm validate:models
~~~

Expected:

- five sponsor-domain tests PASS;
- sponsor JSON reports zero campaigns;
- TypeScript exits 0;
- existing model validation still exits 0.

- [ ] **Step 8: Lint only the task files**

~~~powershell
pnpm exec eslint lib/sponsor-schema.ts lib/sponsor-schedule.ts lib/sponsors.ts scripts/validate-sponsor-campaigns.mjs tests/sponsors/sponsor-domain.test.mjs
~~~

Expected: exit 0 with no warnings.

- [ ] **Step 9: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/package.json src/frontend/EasyGoVibeCoding/data/sponsor-campaigns.json src/frontend/EasyGoVibeCoding/lib/sponsor-schema.ts src/frontend/EasyGoVibeCoding/lib/sponsor-schedule.ts src/frontend/EasyGoVibeCoding/lib/sponsors.ts src/frontend/EasyGoVibeCoding/scripts/validate-sponsor-campaigns.mjs src/frontend/EasyGoVibeCoding/tests/sponsors/sponsor-domain.test.mjs
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Prevent invalid or overlapping sponsor campaigns from reaching readers" -m "Use one versioned JSON source, a strict Zod contract, deterministic scheduling, and a prebuild gate while keeping the production campaign list empty until a signed order exists." -m "Constraint: Static export and no new dependencies" -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Keep data/sponsor-campaigns.json as the only campaign source of truth." -m "Tested: Node sponsor tests, sponsor validation, frontend typecheck, model validation, targeted lint" -m "Not-tested: Real advertiser data"
~~~

Expected: only the campaign domain, data, tests, validator, and package scripts are reported.

---


### Task 3: Add Privacy-Safe Sponsor Event Ingestion

**Files:**

- Create: <code>functions/_shared/sponsor-event.ts</code>
- Create: <code>functions/api/sponsor-events.ts</code>
- Create: <code>tests/sponsors/sponsor-events.test.mjs</code>
- Modify: <code>functions/worker-types.d.ts</code>
- Modify: <code>wrangler.toml:29</code>

**Interfaces:**

- Consumes: <code>SPONSOR_SLOTS</code> from Task 2 as the canonical frontend slot list.
- Produces: <code>POST /api/sponsor-events</code> and <code>parseSponsorEvent(input)</code>.
- Response: <code>204</code> accepted, <code>400</code> malformed, <code>403</code> cross-origin, <code>413</code> oversized, <code>503</code> missing binding.

- [ ] **Step 1: Write failing event contract tests**

Create <code>tests/sponsors/sponsor-events.test.mjs</code>:

~~~javascript
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
~~~

- [ ] **Step 2: Run the test and verify failure**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-events.test.mjs
~~~

Expected: FAIL with missing <code>functions/_shared/sponsor-event.ts</code>.

- [ ] **Step 3: Implement the server event validator**

Create <code>functions/_shared/sponsor-event.ts</code>:

~~~typescript
export const SPONSOR_EVENT_SLOTS = [
  "super-individual-home",
  "super-individual-monetization",
] as const

const EVENT_TYPES = ["viewable_impression", "click"] as const
const ALLOWED_KEYS = new Set([
  "schemaVersion",
  "eventType",
  "campaignId",
  "slot",
  "path",
])

export interface SponsorEvent {
  schemaVersion: 1
  eventType: (typeof EVENT_TYPES)[number]
  campaignId: string
  slot: (typeof SPONSOR_EVENT_SLOTS)[number]
  path: string
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input) && typeof input === "object" && !Array.isArray(input)
}

export function parseSponsorEvent(input: unknown): SponsorEvent | null {
  if (!isRecord(input)) return null
  if (Object.keys(input).some((key) => !ALLOWED_KEYS.has(key))) return null
  if (input.schemaVersion !== 1) return null
  if (
    typeof input.eventType !== "string" ||
    !EVENT_TYPES.includes(input.eventType as SponsorEvent["eventType"])
  ) {
    return null
  }
  if (
    typeof input.campaignId !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.campaignId) ||
    input.campaignId.length > 80
  ) {
    return null
  }
  if (
    typeof input.slot !== "string" ||
    !SPONSOR_EVENT_SLOTS.includes(input.slot as SponsorEvent["slot"])
  ) {
    return null
  }
  if (
    typeof input.path !== "string" ||
    !/^\/super-individual(?:\/[a-z0-9-]+)?$/.test(input.path) ||
    input.path.length > 120
  ) {
    return null
  }

  return input as unknown as SponsorEvent
}
~~~

- [ ] **Step 4: Declare Analytics Engine and bind the dataset**

Append to <code>functions/worker-types.d.ts</code>:

~~~typescript
interface AnalyticsEngineDataset {
  writeDataPoint(event: {
    indexes?: string[]
    blobs?: string[]
    doubles?: number[]
  }): void
}
~~~

Append before <code>[observability]</code> in <code>wrangler.toml</code>:

~~~toml
[[analytics_engine_datasets]]
binding = "SPONSOR_ANALYTICS"
dataset = "easy_go_vibe_sponsor_events"
~~~

- [ ] **Step 5: Implement the same-origin ingestion endpoint**

Create <code>functions/api/sponsor-events.ts</code>:

~~~typescript
import { parseSponsorEvent } from "../_shared/sponsor-event"

interface Env {
  SPONSOR_ANALYTICS?: AnalyticsEngineDataset
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  return origin === new URL(request.url).origin
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  if (!hasSameOrigin(request)) {
    return json({ error: "Forbidden origin" }, 403)
  }
  if (!env.SPONSOR_ANALYTICS) {
    return json({ error: "Sponsor analytics is not configured" }, 503)
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 400)
  }

  const rawBody = await request.text()
  if (rawBody.length > 2048) {
    return json({ error: "Payload too large" }, 413)
  }
  const input = (() => {
    try {
      return JSON.parse(rawBody) as unknown
    } catch {
      return null
    }
  })()
  const event = parseSponsorEvent(input)
  if (!event) {
    return json({ error: "Invalid sponsor event" }, 400)
  }

  env.SPONSOR_ANALYTICS.writeDataPoint({
    indexes: [event.campaignId],
    blobs: [event.eventType, event.slot, event.path],
    doubles: [1],
  })

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  })
}
~~~

- [ ] **Step 6: Verify contracts and Functions types**

~~~powershell
pnpm test:sponsors
pnpm typecheck:functions
pnpm exec eslint functions/_shared/sponsor-event.ts functions/api/sponsor-events.ts tests/sponsors/sponsor-events.test.mjs
~~~

Expected: all sponsor tests pass, Functions typecheck exits 0, targeted lint exits 0.

- [ ] **Step 7: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/functions/_shared/sponsor-event.ts src/frontend/EasyGoVibeCoding/functions/api/sponsor-events.ts src/frontend/EasyGoVibeCoding/functions/worker-types.d.ts src/frontend/EasyGoVibeCoding/tests/sponsors/sponsor-events.test.mjs src/frontend/EasyGoVibeCoding/wrangler.toml
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Measure sponsor delivery without identifying readers" -m "Accept only a five-field same-origin event contract and write ordered dimensions to Analytics Engine, keeping identity and browsing fingerprints out of sponsor reporting." -m "Constraint: Analytics Engine cannot be exercised through the normal local Pages binding" -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Keep index1 and blob1-3 meanings stable because the report query depends on them." -m "Tested: Event contract tests, Functions typecheck, targeted lint" -m "Not-tested: Production Analytics Engine write"
~~~

Expected: GitNexus reports only the new event flow, worker type declaration, test, and binding.

---

### Task 4: Build the Disclosed Placement and Integrate Two Low-Risk Pages

**Files:**

- Create: <code>lib/sponsor-event-client.ts</code>
- Create: <code>components/sponsor/sponsored-placement.tsx</code>
- Modify: <code>tests/sponsors/sponsor-events.test.mjs</code>
- Modify: <code>app/super-individual/page.tsx:1-3,80-107</code>
- Modify: <code>app/super-individual/monetization/page.tsx:1-3,29-49</code>

**Interfaces:**

- Consumes: <code>SponsorCampaign[]</code>, <code>SponsorSlot</code>, <code>selectActiveSponsor</code>, and <code>POST /api/sponsor-events</code>.
- Produces: <code>SponsoredPlacement({ slot, campaigns })</code>, <code>createSponsorEventPayload(...)</code>, and <code>sendSponsorEvent(payload)</code>.

- [ ] **Step 1: Extend the event tests with client payload behavior**

Append to <code>tests/sponsors/sponsor-events.test.mjs</code>:

~~~javascript
import {
  createSponsorEventPayload,
  getSponsorImpressionStorageKey,
} from "../../lib/sponsor-event-client.ts"

test("client payload contains only the server-approved fields", () => {
  assert.deepEqual(
    createSponsorEventPayload({
      eventType: "click",
      campaignId: "vendor-product-2026-08",
      slot: "super-individual-home",
      path: "/super-individual",
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

test("impression dedupe key changes by campaign, slot, and path", () => {
  const first = getSponsorImpressionStorageKey(
    "campaign-a",
    "super-individual-home",
    "/super-individual",
  )
  const second = getSponsorImpressionStorageKey(
    "campaign-a",
    "super-individual-monetization",
    "/super-individual/monetization",
  )
  assert.notEqual(first, second)
})
~~~

- [ ] **Step 2: Run the event tests and verify the missing-module failure**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-events.test.mjs
~~~

Expected: existing event tests pass and the new tests fail with missing <code>lib/sponsor-event-client.ts</code>.

- [ ] **Step 3: Implement the browser transport**

Create <code>lib/sponsor-event-client.ts</code>:

~~~typescript
import type { SponsorSlot } from "@/lib/sponsor-schema"

export type SponsorEventType = "viewable_impression" | "click"

export interface SponsorEventPayload {
  schemaVersion: 1
  eventType: SponsorEventType
  campaignId: string
  slot: SponsorSlot
  path: string
}

export function createSponsorEventPayload({
  eventType,
  campaignId,
  slot,
  path,
}: Omit<SponsorEventPayload, "schemaVersion">): SponsorEventPayload {
  return {
    schemaVersion: 1,
    eventType,
    campaignId,
    slot,
    path,
  }
}

export function getSponsorImpressionStorageKey(
  campaignId: string,
  slot: SponsorSlot,
  path: string,
): string {
  return [
    "egvc",
    "sponsor-impression",
    "v1",
    campaignId,
    slot,
    path,
  ].join(":")
}

export function sendSponsorEvent(payload: SponsorEventPayload): void {
  if (typeof window === "undefined") return
  const body = JSON.stringify(payload)

  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([body], { type: "application/json" })
      if (navigator.sendBeacon("/api/sponsor-events", blob)) return
    }
  } catch {
    // Fall through to keepalive fetch.
  }

  void fetch("/api/sponsor-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => undefined)
}
~~~

- [ ] **Step 4: Implement the placement component**

Create <code>components/sponsor/sponsored-placement.tsx</code>:

~~~tsx
"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

import {
  createSponsorEventPayload,
  getSponsorImpressionStorageKey,
  sendSponsorEvent,
} from "@/lib/sponsor-event-client"
import { selectActiveSponsor } from "@/lib/sponsor-schedule"
import type { SponsorCampaign, SponsorSlot } from "@/lib/sponsor-schema"

interface SponsoredPlacementProps {
  slot: SponsorSlot
  campaigns: SponsorCampaign[]
}

const THEME_CLASSES: Record<SponsorCampaign["theme"], string> = {
  violet:
    "border-violet-300/70 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white",
  blue:
    "border-blue-300/70 bg-gradient-to-br from-blue-50 via-cyan-50 to-white",
  emerald:
    "border-emerald-300/70 bg-gradient-to-br from-emerald-50 via-teal-50 to-white",
}

const sentImpressions = new Set<string>()

export function SponsoredPlacement({
  slot,
  campaigns,
}: SponsoredPlacementProps) {
  const [now, setNow] = useState<number | null>(null)
  const cardRef = useRef<HTMLElement | null>(null)
  const viewTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (campaigns.length === 0) return
    const update = () => setNow(Date.now())
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [campaigns.length])

  const campaign = useMemo(
    () =>
      now === null
        ? null
        : selectActiveSponsor(campaigns, slot, new Date(now)),
    [campaigns, now, slot],
  )

  useEffect(() => {
    const element = cardRef.current
    if (!campaign || !element) return

    const clearViewTimer = () => {
      if (viewTimerRef.current !== null) {
        window.clearTimeout(viewTimerRef.current)
        viewTimerRef.current = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (viewTimerRef.current !== null) return
          viewTimerRef.current = window.setTimeout(() => {
            const path = window.location.pathname
            const storageKey = getSponsorImpressionStorageKey(
              campaign.id,
              slot,
              path,
            )

            if (sentImpressions.has(storageKey)) return
            sentImpressions.add(storageKey)

            try {
              if (window.sessionStorage.getItem(storageKey)) return
              window.sessionStorage.setItem(storageKey, "1")
            } catch {
              // Private browsing can disable sessionStorage; delivery still works.
            }

            sendSponsorEvent(
              createSponsorEventPayload({
                eventType: "viewable_impression",
                campaignId: campaign.id,
                slot,
                path,
              }),
            )
            viewTimerRef.current = null
          }, 1_000)
          return
        }
        clearViewTimer()
      },
      { threshold: [0, 0.5, 1] },
    )

    observer.observe(element)
    return () => {
      clearViewTimer()
      observer.disconnect()
    }
  }, [campaign, slot])

  if (campaigns.length === 0) return null

  if (now === null) {
    return (
      <div
        aria-hidden="true"
        className="mb-12 min-h-44 rounded-2xl border border-transparent"
      />
    )
  }

  if (!campaign) return null

  const handleClick = () => {
    sendSponsorEvent(
      createSponsorEventPayload({
        eventType: "click",
        campaignId: campaign.id,
        slot,
        path: window.location.pathname,
      }),
    )
  }

  return (
    <aside
      ref={cardRef}
      aria-label={"广告：" + campaign.productName}
      className={
        "mb-12 overflow-hidden rounded-2xl border-2 shadow-lg " +
        THEME_CLASSES[campaign.theme]
      }
    >
      <a
        href={campaign.destinationUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        className="group block p-5 outline-none transition hover:shadow-xl focus-visible:ring-4 focus-visible:ring-violet-400/50 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {campaign.logoSrc ? (
              <Image
                src={campaign.logoSrc}
                alt={campaign.advertiserName + " 标志"}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-contain"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-gray-800 shadow-sm"
              >
                {campaign.productName.slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-gray-900 px-2.5 py-1 text-xs font-bold text-white">
                广告
              </span>
              <p className="mt-1 truncate text-sm font-medium text-gray-600">
                {campaign.advertiserName}
              </p>
            </div>
          </div>
          <ExternalLink
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          {campaign.headline}
        </h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          {campaign.description}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-violet-700">
            {campaign.ctaLabel} →
          </span>
          <span className="text-xs text-gray-500">
            广告内容由广告主提供；不影响本站编辑评价。
          </span>
        </div>
      </a>
    </aside>
  )
}
~~~

- [ ] **Step 5: Run client contract tests before page edits**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-events.test.mjs
pnpm typecheck
pnpm exec eslint lib/sponsor-event-client.ts components/sponsor/sponsored-placement.tsx tests/sponsors/sponsor-events.test.mjs
~~~

Expected: all event tests pass, TypeScript exits 0, targeted lint exits 0.

- [ ] **Step 6: Repeat required impact checks immediately before page edits**

From the repository root:

~~~powershell
node .gitnexus/run.cjs impact SuperIndividualPage --direction upstream --summary-only
node .gitnexus/run.cjs impact SuperIndividualMonetizationPage --direction upstream --summary-only
~~~

Expected: both page functions report LOW risk and zero upstream callers. If either result changes to HIGH or CRITICAL, stop and report the new blast radius before editing.

- [ ] **Step 7: Add the home placement without touching CourseLayout**

In <code>app/super-individual/page.tsx</code>, add:

~~~tsx
import { SponsoredPlacement } from "@/components/sponsor/sponsored-placement"
import { getScheduledSponsorsForSlot } from "@/lib/sponsors"
~~~

Add next to the existing <code>modules</code> constant:

~~~tsx
const homeSponsorCampaigns = getScheduledSponsorsForSlot(
  "super-individual-home",
)
~~~

Insert between the closing learning-goals block and <code>{/* Modules */}</code>:

~~~tsx
      <SponsoredPlacement
        slot="super-individual-home"
        campaigns={homeSponsorCampaigns}
      />
~~~

- [ ] **Step 8: Add the monetization placement without touching CourseLayout**

In <code>app/super-individual/monetization/page.tsx</code>, add:

~~~tsx
import { SponsoredPlacement } from "@/components/sponsor/sponsored-placement"
import { getScheduledSponsorsForSlot } from "@/lib/sponsors"
~~~

Add below the <code>offers</code> constant:

~~~tsx
const monetizationSponsorCampaigns = getScheduledSponsorsForSlot(
  "super-individual-monetization",
)
~~~

Insert between the Three Offer section and the pricing section:

~~~tsx
        <SponsoredPlacement
          slot="super-individual-monetization"
          campaigns={monetizationSponsorCampaigns}
        />
~~~

- [ ] **Step 9: Verify page-local integration**

~~~powershell
pnpm test:sponsors
pnpm typecheck
pnpm exec eslint app/super-individual/page.tsx app/super-individual/monetization/page.tsx components/sponsor/sponsored-placement.tsx lib/sponsor-event-client.ts
pnpm build
~~~

Expected:

- tests and typecheck pass;
- targeted lint has no error or warning;
- static build succeeds;
- no sponsor card is rendered because the production campaign list is empty;
- <code>CourseLayout</code> remains unchanged.

- [ ] **Step 10: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/lib/sponsor-event-client.ts src/frontend/EasyGoVibeCoding/components/sponsor/sponsored-placement.tsx src/frontend/EasyGoVibeCoding/tests/sponsors/sponsor-events.test.mjs src/frontend/EasyGoVibeCoding/app/super-individual/page.tsx src/frontend/EasyGoVibeCoding/app/super-individual/monetization/page.tsx
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Introduce sponsor inventory without widening the course-layout blast radius" -m "Render one page-local, visibly disclosed card with time-window selection, 50-percent-for-one-second viewability, session impression deduplication, and privacy-safe event delivery." -m "Rejected: Add placement support to CourseLayout | CRITICAL impact across 74 callers" -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Keep each eligible page to one SponsoredPlacement instance." -m "Tested: Sponsor tests, frontend typecheck, targeted lint, static build" -m "Not-tested: Production event write and real advertiser asset"
~~~

Expected: GitNexus reports the two LOW-risk page functions and the new sponsor modules; it must not report <code>CourseLayout</code>.

---


### Task 5: Build a Separate, Safe Sponsor Inquiry API

**Files:**

- Create: <code>functions/_shared/sponsor-inquiry.ts</code>
- Create: <code>functions/api/sponsor-inquiry.ts</code>
- Create: <code>tests/sponsors/sponsor-inquiry.test.mjs</code>

**Interfaces:**

- Produces: <code>parseSponsorInquiry(input)</code>, <code>buildSponsorInquiryHtml(inquiry)</code>, and <code>POST /api/sponsor-inquiry</code>.
- Response: <code>202</code> accepted, <code>400</code> invalid, <code>403</code> cross-origin, <code>413</code> oversized, <code>500</code> missing Resend configuration, <code>502</code> upstream Resend failure.
- Does not consume or modify <code>functions/api/send-email.ts</code>.

- [ ] **Step 1: Write failing inquiry tests**

Create <code>tests/sponsors/sponsor-inquiry.test.mjs</code>:

~~~javascript
import test from "node:test"
import assert from "node:assert/strict"

import {
  buildSponsorInquiryHtml,
  parseSponsorInquiry,
} from "../../functions/_shared/sponsor-inquiry.ts"

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

test("normalizes a valid sponsor inquiry", () => {
  assert.deepEqual(parseSponsorInquiry(valid), valid)
})

test("rejects missing consent, invalid email, HTTP URL, and unknown enums", () => {
  assert.equal(parseSponsorInquiry({ ...valid, consent: false }), null)
  assert.equal(parseSponsorInquiry({ ...valid, email: "not-an-email" }), null)
  assert.equal(
    parseSponsorInquiry({ ...valid, productUrl: "http://example.com" }),
    null,
  )
  assert.equal(
    parseSponsorInquiry({ ...valid, budgetRange: "one-million" }),
    null,
  )
})

test("escapes advertiser-controlled HTML before sending email", () => {
  const inquiry = parseSponsorInquiry({
    ...valid,
    notes: "<script>alert(1)</script>",
  })
  assert.ok(inquiry)
  const html = buildSponsorInquiryHtml(inquiry)
  assert.doesNotMatch(html, /<script>/)
  assert.match(html, /&lt;script&gt;/)
})
~~~

- [ ] **Step 2: Run tests and verify failure**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-inquiry.test.mjs
~~~

Expected: FAIL with missing <code>functions/_shared/sponsor-inquiry.ts</code>.

- [ ] **Step 3: Implement validation and safe email rendering**

Create <code>functions/_shared/sponsor-inquiry.ts</code>:

~~~typescript
export const SPONSOR_BUDGET_RANGES = [
  "under-3000",
  "3000-8000",
  "8000-15000",
  "15000-plus",
  "undecided",
] as const

export const SPONSOR_CAMPAIGN_GOALS = [
  "brand-awareness",
  "product-launch",
  "developer-leads",
  "recruiting",
  "other",
] as const

export interface SponsorInquiry {
  contactName: string
  email: string
  company: string
  productName: string
  productUrl: string
  budgetRange: (typeof SPONSOR_BUDGET_RANGES)[number]
  campaignGoal: (typeof SPONSOR_CAMPAIGN_GOALS)[number]
  notes: string
  consent: true
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input) && typeof input === "object" && !Array.isArray(input)
}

function normalizeText(input: unknown, maxLength: number): string {
  return String(input ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function parseSponsorInquiry(input: unknown): SponsorInquiry | null {
  if (!isRecord(input)) return null

  const contactName = normalizeText(input.contactName, 80)
  const email = normalizeText(input.email, 160).toLowerCase()
  const company = normalizeText(input.company, 120)
  const productName = normalizeText(input.productName, 120)
  const productUrl = normalizeText(input.productUrl, 300)
  const budgetRange = normalizeText(input.budgetRange, 40)
  const campaignGoal = normalizeText(input.campaignGoal, 40)
  const notes = normalizeText(input.notes, 1200)

  if (!contactName || !company || !productName || input.consent !== true) {
    return null
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  if (!isHttpsUrl(productUrl)) return null
  if (
    !SPONSOR_BUDGET_RANGES.includes(
      budgetRange as SponsorInquiry["budgetRange"],
    )
  ) {
    return null
  }
  if (
    !SPONSOR_CAMPAIGN_GOALS.includes(
      campaignGoal as SponsorInquiry["campaignGoal"],
    )
  ) {
    return null
  }

  return {
    contactName,
    email,
    company,
    productName,
    productUrl,
    budgetRange: budgetRange as SponsorInquiry["budgetRange"],
    campaignGoal: campaignGoal as SponsorInquiry["campaignGoal"],
    notes,
    consent: true,
  }
}

export function buildSponsorInquiryHtml(inquiry: SponsorInquiry): string {
  const rows = [
    ["联系人", inquiry.contactName],
    ["邮箱", inquiry.email],
    ["公司", inquiry.company],
    ["产品", inquiry.productName],
    ["产品地址", inquiry.productUrl],
    ["预算", inquiry.budgetRange],
    ["目标", inquiry.campaignGoal],
    ["补充说明", inquiry.notes || "无"],
  ]

  const body = rows
    .map(
      ([label, value]) =>
        "<p><strong>" +
        escapeHtml(label) +
        "：</strong>" +
        escapeHtml(value) +
        "</p>",
    )
    .join("")

  return (
    '<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto">' +
    "<h2>EasyGoVibeCoding 广告合作咨询</h2>" +
    body +
    "<p><small>提交者已勾选商务联系信息处理同意项。</small></p>" +
    "</div>"
  )
}
~~~

- [ ] **Step 4: Implement the Resend-backed endpoint**

Create <code>functions/api/sponsor-inquiry.ts</code>:

~~~typescript
import {
  buildSponsorInquiryHtml,
  parseSponsorInquiry,
} from "../_shared/sponsor-inquiry"

interface Env {
  RESEND_API_KEY?: string
  SPONSOR_INBOX_EMAIL?: string
}

const DEFAULT_OWNER_EMAIL = "1301385382gjts@gmail.com"

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

function hasSameOrigin(request: Request): boolean {
  return request.headers.get("origin") === new URL(request.url).origin
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  if (!hasSameOrigin(request)) return json({ error: "Forbidden origin" }, 403)
  if (!env.RESEND_API_KEY) {
    return json({ error: "Sponsor email is not configured" }, 500)
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 400)
  }

  const rawBody = await request.text()
  if (rawBody.length > 8192) return json({ error: "Payload too large" }, 413)
  const body = (() => {
    try {
      return JSON.parse(rawBody) as Record<string, unknown>
    } catch {
      return null
    }
  })()

  if (body && typeof body.website === "string" && body.website.trim()) {
    return json({ success: true }, 202)
  }

  const inquiry = parseSponsorInquiry(body)
  if (!inquiry) return json({ error: "Invalid sponsor inquiry" }, 400)

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + env.RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "EasyGoVibeCoding Sponsor <onboarding@resend.dev>",
      to: [env.SPONSOR_INBOX_EMAIL || DEFAULT_OWNER_EMAIL],
      reply_to: inquiry.email,
      subject:
        "[广告合作] " + inquiry.company + " / " + inquiry.productName,
      html: buildSponsorInquiryHtml(inquiry),
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    return json(
      {
        error: "Failed to send sponsor inquiry",
        details: details.slice(0, 300),
      },
      502,
    )
  }

  return json({ success: true }, 202)
}
~~~

- [ ] **Step 5: Verify validation, escaping, and Functions types**

~~~powershell
pnpm test:sponsors
pnpm typecheck:functions
pnpm exec eslint functions/_shared/sponsor-inquiry.ts functions/api/sponsor-inquiry.ts tests/sponsors/sponsor-inquiry.test.mjs
~~~

Expected: all sponsor tests pass; Functions typecheck and targeted lint exit 0.

- [ ] **Step 6: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/functions/_shared/sponsor-inquiry.ts src/frontend/EasyGoVibeCoding/functions/api/sponsor-inquiry.ts src/frontend/EasyGoVibeCoding/tests/sponsors/sponsor-inquiry.test.mjs
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Keep sponsor leads separate from reader feedback consent" -m "Validate a bounded business inquiry, neutralize HTML, absorb honeypot spam, and send directly through the existing Resend account without persisting lead data." -m "Rejected: Reuse api/send-email | Its public-feedback consent and confirmation semantics do not match advertiser inquiries" -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Never add sponsor fields to the reader feedback endpoint." -m "Tested: Inquiry validation and escaping tests, Functions typecheck, targeted lint" -m "Not-tested: Live Resend delivery"
~~~

Expected: only the new sponsor inquiry flow and tests are reported.

---


### Task 6: Publish the Sponsor Media Kit and Inquiry Form

**Files:**

- Create: <code>lib/sponsor-offers.ts</code>
- Create: <code>components/sponsor/sponsor-inquiry-form.tsx</code>
- Create: <code>app/sponsor/page.tsx</code>

**Interfaces:**

- Consumes: <code>POST /api/sponsor-inquiry</code> from Task 5 and package IDs from Task 1.
- Produces: public static route <code>/sponsor</code> and accessible lead form.

- [ ] **Step 1: Define the public offer data**

Create <code>lib/sponsor-offers.ts</code>:

~~~typescript
export const SPONSOR_OFFERS = [
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
] as const
~~~

- [ ] **Step 2: Implement the accessible client form**

Create <code>components/sponsor/sponsor-inquiry-form.tsx</code>:

~~~tsx
"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const INITIAL_FORM = {
  contactName: "",
  email: "",
  company: "",
  productName: "",
  productUrl: "",
  budgetRange: "undecided",
  campaignGoal: "brand-awareness",
  notes: "",
  consent: false,
  website: "",
}

type FormState = typeof INITIAL_FORM
type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }

export function SponsorInquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [status, setStatus] = useState<SubmitState>({ kind: "idle" })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status.kind === "submitting") return
    setStatus({ kind: "submitting" })

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(form),
      })
      const body = (await response.json().catch(() => null)) as {
        error?: string
      } | null

      if (!response.ok) {
        setStatus({
          kind: "error",
          message: body?.error || "提交失败，请稍后重试。",
        })
        return
      }

      setForm(INITIAL_FORM)
      setStatus({
        kind: "success",
        message: "合作需求已发送。我会通过你填写的邮箱联系。",
      })
    } catch {
      setStatus({
        kind: "error",
        message: "网络连接失败，请稍后重试。",
      })
    }
  }

  const disabled = status.kind === "submitting"

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-violet-200 bg-white/80 p-6 shadow-xl sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contactName" label="联系人" required>
          <Input
            id="contactName"
            autoComplete="name"
            required
            disabled={disabled}
            value={form.contactName}
            onChange={(event) => update("contactName", event.target.value)}
          />
        </Field>
        <Field id="email" label="商务邮箱" required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            disabled={disabled}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
        <Field id="company" label="公司" required>
          <Input
            id="company"
            autoComplete="organization"
            required
            disabled={disabled}
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </Field>
        <Field id="productName" label="产品名称" required>
          <Input
            id="productName"
            required
            disabled={disabled}
            value={form.productName}
            onChange={(event) => update("productName", event.target.value)}
          />
        </Field>
      </div>

      <Field id="productUrl" label="产品 HTTPS 地址" required>
        <Input
          id="productUrl"
          type="url"
          inputMode="url"
          placeholder="https://"
          required
          disabled={disabled}
          value={form.productUrl}
          onChange={(event) => update("productUrl", event.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="budgetRange" label="预算范围" required>
          <select
            id="budgetRange"
            disabled={disabled}
            value={form.budgetRange}
            onChange={(event) => update("budgetRange", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="undecided">暂未确定</option>
            <option value="under-3000">¥3,000 以下</option>
            <option value="3000-8000">¥3,000–8,000</option>
            <option value="8000-15000">¥8,000–15,000</option>
            <option value="15000-plus">¥15,000 以上</option>
          </select>
        </Field>
        <Field id="campaignGoal" label="Campaign 目标" required>
          <select
            id="campaignGoal"
            disabled={disabled}
            value={form.campaignGoal}
            onChange={(event) => update("campaignGoal", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="brand-awareness">品牌认知</option>
            <option value="product-launch">产品发布</option>
            <option value="developer-leads">开发者线索</option>
            <option value="recruiting">开发者招聘</option>
            <option value="other">其他</option>
          </select>
        </Field>
      </div>

      <Field id="notes" label="合作说明">
        <Textarea
          id="notes"
          rows={5}
          disabled={disabled}
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="期望排期、目标受众、素材状态或其他要求"
        />
      </Field>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          required
          disabled={disabled}
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>我同意本站为回复本次商务咨询处理以上联系信息。</span>
      </label>

      <div aria-live="polite">
        {status.kind === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {status.message}
          </p>
        )}
        {status.kind === "error" && (
          <p className="text-sm text-red-700">{status.message}</p>
        )}
      </div>

      <Button type="submit" disabled={disabled} className="w-full">
        <Send className="mr-2 h-4 w-4" />
        {disabled ? "提交中…" : "提交合作需求"}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </Label>
      {children}
    </div>
  )
}
~~~

- [ ] **Step 3: Implement the static media-kit page**

Create <code>app/sponsor/page.tsx</code>:

~~~tsx
import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, ShieldCheck, Target } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SponsorInquiryForm } from "@/components/sponsor/sponsor-inquiry-form"
import { SPONSOR_OFFERS } from "@/lib/sponsor-offers"

export const metadata: Metadata = {
  title: "广告合作 | EasyGoVibeCoding",
  description:
    "面向 AI 编程、开发者工具和云服务厂商的场景化赞助合作。",
}

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <Header />
      <main className="px-4 pb-20 pt-28">
        <div className="mx-auto max-w-6xl">
          <section className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800">
              开发者工具广告合作
            </span>
            <h1 className="mt-5 text-4xl font-extrabold text-gray-950 sm:text-5xl">
              在开发者做决策的场景里出现
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              EasyGoVibeCoding 面向学习 AI 编程、选择工具和尝试独立产品的开发者。本站只提供少量、相关、明确标注的赞助位置。
            </p>
          </section>

          <section className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "场景相关",
                text: "只在与产品用途匹配的学习和商业化页面展示。",
              },
              {
                icon: ShieldCheck,
                title: "信任优先",
                text: "每页最多一个广告，不售卖排名，不允许第三方追踪脚本。",
              },
              {
                icon: BarChart3,
                title: "交付透明",
                text: "报告有效曝光、点击、页面和日期，不虚构流量。",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-violet-100 bg-white/80 p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-violet-700" />
                  <h2 className="mt-4 text-lg font-bold text-gray-950">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </article>
              )
            })}
          </section>

          <section className="mt-16" aria-labelledby="sponsor-packages">
            <h2
              id="sponsor-packages"
              className="text-3xl font-bold text-gray-950"
            >
              试运行合作套餐
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {SPONSOR_OFFERS.map((offer) => (
                <article
                  key={offer.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-950">
                    {offer.name}
                  </h3>
                  <p className="mt-3 font-semibold text-violet-700">
                    {offer.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {offer.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm text-gray-600">
              固定费用不承诺销售转化。完整规则见{" "}
              <Link
                href="/sponsor#inquiry"
                className="font-semibold text-violet-700 underline"
              >
                合作咨询
              </Link>
              ，正式排期以双方书面订单为准。
            </p>
          </section>

          <section
            id="inquiry"
            className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-950">
                提交合作需求
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                请提供产品、目标、预算和排期。收到后先判断受众匹配和合规风险，再确认是否提供正式报价。
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li>• 不接受付费排名或伪装成课程结论的广告。</li>
                <li>• 素材必须有权使用，量化信息必须可核验。</li>
                <li>• 有效曝光定义为 50% 可见并持续至少 1 秒。</li>
              </ul>
            </div>
            <SponsorInquiryForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
~~~

- [ ] **Step 4: Verify the page and form**

~~~powershell
pnpm typecheck
pnpm exec eslint app/sponsor/page.tsx components/sponsor/sponsor-inquiry-form.tsx lib/sponsor-offers.ts
pnpm build
Test-Path out/sponsor.html
Test-Path out/functions/api/sponsor-inquiry.ts
~~~

Expected: typecheck, targeted lint, and build exit 0; both <code>Test-Path</code> calls return <code>True</code>.

- [ ] **Step 5: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/lib/sponsor-offers.ts src/frontend/EasyGoVibeCoding/components/sponsor/sponsor-inquiry-form.tsx src/frontend/EasyGoVibeCoding/app/sponsor/page.tsx
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Let qualified developer-tool sponsors understand and request the product" -m "Publish transparent pilot packages, trust constraints, measurement definitions, and an accessible same-origin inquiry form without adding shared-navigation risk." -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Keep package IDs synchronized with the public rate card." -m "Tested: Frontend typecheck, targeted lint, static build, exported sponsor route and Function presence" -m "Not-tested: Live form submission through Resend"
~~~

Expected: GitNexus reports the new sponsor route, form, and offer data only.

---

### Task 7: Export Auditable Campaign Reports and Document Operations

**Files:**

- Create: <code>scripts/export-sponsor-report.mjs</code>
- Create: <code>tests/sponsors/sponsor-report.test.mjs</code>
- Create: <code>docs/bussiness/Sponsor_Operations_Runbook.md</code>
- Modify: <code>package.json:4-15</code>

**Interfaces:**

- Consumes: Analytics Engine column mapping from Task 3.
- Produces: <code>buildSponsorReportQuery(campaignId, days)</code> and operator command <code>pnpm report:sponsor -- campaign-id 30</code>.
- Required operator environment: <code>CF_ACCOUNT_ID</code> and a <code>CF_API_TOKEN</code> limited to Account Analytics Read.

- [ ] **Step 1: Write failing report-query tests**

Create <code>tests/sponsors/sponsor-report.test.mjs</code>:

~~~javascript
import test from "node:test"
import assert from "node:assert/strict"

import {
  buildSponsorReportQuery,
  validateCampaignId,
} from "../../scripts/export-sponsor-report.mjs"

test("builds a sampling-aware report query for one campaign", () => {
  const query = buildSponsorReportQuery("vendor-product-2026-08", 30)

  assert.match(query, /index1 = 'vendor-product-2026-08'/)
  assert.match(query, /SUM\(_sample_interval \* double1\)/)
  assert.match(query, /blob1 AS event_type/)
  assert.match(query, /INTERVAL '30' DAY/)
  assert.match(query, /FORMAT JSON/)
})

test("rejects SQL injection and invalid day windows", () => {
  assert.throws(
    () => validateCampaignId("campaign' OR 1=1"),
    /campaign ID/,
  )
  assert.throws(() => buildSponsorReportQuery("campaign-a", 0), /days/)
  assert.throws(() => buildSponsorReportQuery("campaign-a", 91), /days/)
  assert.throws(() => buildSponsorReportQuery("campaign-a", 1.5), /days/)
})
~~~

- [ ] **Step 2: Run tests and verify failure**

~~~powershell
pnpm exec node --test tests/sponsors/sponsor-report.test.mjs
~~~

Expected: FAIL with missing <code>scripts/export-sponsor-report.mjs</code>.

- [ ] **Step 3: Implement the safe SQL export CLI**

Create <code>scripts/export-sponsor-report.mjs</code>:

~~~javascript
import { pathToFileURL } from "node:url"

const DATASET = "easy_go_vibe_sponsor_events"

export function validateCampaignId(value) {
  if (
    typeof value !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
    value.length > 80
  ) {
    throw new Error("campaign ID must be lowercase kebab-case")
  }
  return value
}

export function buildSponsorReportQuery(campaignId, days) {
  const safeCampaignId = validateCampaignId(campaignId)
  if (!Number.isInteger(days) || days < 1 || days > 90) {
    throw new Error("days must be an integer from 1 to 90")
  }

  return [
    "SELECT",
    "  toDate(timestamp) AS day,",
    "  blob1 AS event_type,",
    "  blob2 AS slot,",
    "  blob3 AS path,",
    "  SUM(_sample_interval * double1) AS total",
    "FROM " + DATASET,
    "WHERE index1 = '" + safeCampaignId + "'",
    "  AND timestamp >= NOW() - INTERVAL '" + days + "' DAY",
    "GROUP BY day, event_type, slot, path",
    "ORDER BY day ASC, event_type ASC, slot ASC, path ASC",
    "FORMAT JSON",
  ].join("\n")
}

async function main() {
  const campaignId = process.argv[2]
  const days = Number(process.argv[3] || "30")
  const accountId = process.env.CF_ACCOUNT_ID
  const apiToken = process.env.CF_API_TOKEN

  if (!campaignId) {
    throw new Error(
      "Usage: pnpm report:sponsor -- <campaign-id> [days 1-90]",
    )
  }
  if (!accountId || !/^[a-f0-9]{32}$/.test(accountId)) {
    throw new Error("CF_ACCOUNT_ID must be a 32-character account ID")
  }
  if (!apiToken) {
    throw new Error("CF_API_TOKEN with Account Analytics Read is required")
  }

  const query = buildSponsorReportQuery(campaignId, days)
  const response = await fetch(
    "https://api.cloudflare.com/client/v4/accounts/" +
      accountId +
      "/analytics_engine/sql",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiToken,
        "Content-Type": "text/plain",
      },
      body: query,
    },
  )
  const body = await response.text()
  if (!response.ok) {
    throw new Error(
      "Analytics Engine query failed with HTTP " +
        response.status +
        ": " +
        body.slice(0, 500),
    )
  }
  process.stdout.write(body + "\n")
}

const isDirect =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirect) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  })
}
~~~

- [ ] **Step 4: Add the package command**

Add to the existing <code>scripts</code> object in <code>package.json</code>:

~~~json
{
  "report:sponsor": "node scripts/export-sponsor-report.mjs"
}
~~~

Do not change the existing build, deploy, validation, test, or typecheck commands.

- [ ] **Step 5: Write the complete operations runbook**

Create <code>docs/bussiness/Sponsor_Operations_Runbook.md</code>:

~~~markdown
# Sponsor Campaign Operations Runbook

## 1. Before accepting an order

1. Confirm the product fits the advertising policy.
2. Verify advertiser identity, product URL, claim evidence and asset rights.
3. Record fixed fee, invoice state, start/end timestamps, slots and reporting window in a written insertion order.
4. Reject paid ranking, arbitrary HTML, external pixels and non-HTTPS destinations.

## 2. Configure a Campaign

1. Copy the signed values into data/sponsor-campaigns.json.
2. Use a lowercase kebab-case ID containing advertiser, product and period.
3. Copy the approved logo into public/sponsors/ and reference it with an absolute site path.
4. Keep status draft until payment, creative review and schedule review are complete.
5. Run:

    pnpm test:sponsors
    pnpm validate:sponsors
    pnpm typecheck
    pnpm typecheck:functions
    pnpm build

6. Change status to active, rerun the same commands, and request explicit production-deploy authorization.

## 3. Cloudflare production configuration

- Wrangler binding: SPONSOR_ANALYTICS
- Dataset: easy_go_vibe_sponsor_events
- Secret: RESEND_API_KEY
- Optional variable: SPONSOR_INBOX_EMAIL
- Operator-only local environment: CF_ACCOUNT_ID
- Operator-only local secret: CF_API_TOKEN with Account Analytics Read

Never expose the Cloudflare account ID/token in browser code, Pages variables visible to the client, logs, commits, or advertiser reports.

## 4. Export a report

In PowerShell, set the operator-only variables for the current process:

    $env:CF_ACCOUNT_ID="<the 32-character account ID from Cloudflare>"
    $env:CF_API_TOKEN="<an Account Analytics Read token>"
    pnpm report:sponsor -- vendor-product-2026-08 30 > sponsor-report.json

The JSON groups server-timestamped events by day, event type, slot and path. Counts use _sample_interval * double1 so Cloudflare sampling is represented.

Calculate CTR only when effective impressions are greater than zero:

    CTR = clicks / viewable_impressions

Treat CTR as a diagnostic metric, not a sales guarantee.

## 5. Pause or remove a Campaign

1. Set status to paused for a temporary stop or ended for closure.
2. Run sponsor validation, TypeScript, targeted lint and build.
3. Deploy only with authorization.
4. Confirm the card disappears from both eligible routes within 30 seconds.
5. Record the reason and timestamp in the advertiser account notes.

Immediately pause when the target domain is compromised, creative claims become false, the advertiser loses required authorization, or a reader-safety issue is credible.

## 6. Reporting and renewal

- Send a weekly delivery summary during the first pilot.
- Send the final report within three business days after the end timestamp.
- Include contracted dates, actual active dates, slots, page paths, viewable impressions, clicks, CTR definition and known incidents.
- Never substitute total site pageviews for effective sponsor impressions.
- Ask for renewal only after reporting delivery and reader-feedback guardrails.

## 7. Scale gate

Do not build self-service campaign creation, advertiser login, online payment, CPC/CPA billing, programmatic backfill or additional page inventory until at least five paid Campaigns have completed and manual operations exceed four hours per week.
~~~

The angle-bracket values in the PowerShell example are documentation tokens for secrets supplied by the operator; they must never be committed with real values.

- [ ] **Step 6: Verify report code and documentation**

From <code>src/frontend/EasyGoVibeCoding/</code>:

~~~powershell
pnpm test:sponsors
pnpm exec eslint scripts/export-sponsor-report.mjs tests/sponsors/sponsor-report.test.mjs
~~~

From the repository root:

~~~powershell
rg -n "SPONSOR_ANALYTICS|easy_go_vibe_sponsor_events|CF_API_TOKEN|_sample_interval|five paid Campaigns" docs/bussiness/Sponsor_Operations_Runbook.md
~~~

Expected: all sponsor tests pass, targeted lint exits 0, and every operational term is found.

- [ ] **Step 7: Stage, inspect, and commit**

~~~powershell
git add src/frontend/EasyGoVibeCoding/package.json src/frontend/EasyGoVibeCoding/scripts/export-sponsor-report.mjs src/frontend/EasyGoVibeCoding/tests/sponsors/sponsor-report.test.mjs docs/bussiness/Sponsor_Operations_Runbook.md
node .gitnexus/run.cjs detect-changes --scope staged
git commit -m "Make sponsor delivery reviewable before asking for renewal" -m "Provide a sampling-aware, injection-safe operator export and a concrete runbook for activation, reporting, pausing, takedown, and scale gates." -m "Constraint: Cloudflare SQL API requires an operator-held Account Analytics Read token" -m "Confidence: high" -m "Scope-risk: narrow" -m "Directive: Do not change Analytics Engine column order without updating the query and tests together." -m "Tested: Sponsor report tests, targeted lint, runbook term verification" -m "Not-tested: Live Cloudflare SQL API query"
~~~

Expected: GitNexus reports the report script, test, package command, and operations documentation.

---

### Task 8: Run the Full Release Gate and Prepare the First Pilot

**Files:**

- Verify all files from Tasks 1–7.
- Modify <code>data/sponsor-campaigns.json</code> and add <code>public/sponsors/&lt;approved-asset&gt;</code> only when the commercial launch gate has passed.

**Interfaces:**

- Consumes: every previous task.
- Produces: a static sponsor page, two dormant or active placements, two Pages Functions, a report command, and evidence for a deploy/no-deploy decision.

- [ ] **Step 1: Confirm no unrelated user work is being staged**

From the repository root:

~~~powershell
git status --short
git diff --stat
~~~

Expected: sponsor-plan work is distinguishable from pre-existing user changes in <code>AGENTS.md</code>, <code>CLAUDE.md</code>, local skill/config directories, and any other unrelated files. Do not stage or rewrite unrelated changes.

- [ ] **Step 2: Run the complete automated verification**

From <code>src/frontend/EasyGoVibeCoding/</code>:

~~~powershell
pnpm test:sponsors
pnpm validate:sponsors
pnpm validate:models
pnpm typecheck
pnpm typecheck:functions
pnpm exec eslint app/sponsor/page.tsx app/super-individual/page.tsx app/super-individual/monetization/page.tsx components/sponsor/sponsored-placement.tsx components/sponsor/sponsor-inquiry-form.tsx lib/sponsor-schema.ts lib/sponsor-schedule.ts lib/sponsors.ts lib/sponsor-event-client.ts lib/sponsor-offers.ts functions/_shared/sponsor-event.ts functions/_shared/sponsor-inquiry.ts functions/api/sponsor-events.ts functions/api/sponsor-inquiry.ts scripts/validate-sponsor-campaigns.mjs scripts/export-sponsor-report.mjs tests/sponsors/*.test.mjs
pnpm build
~~~

Expected: every command exits 0. The build must copy both sponsor Functions into <code>out/functions/api/</code>.

- [ ] **Step 3: Run full lint and compare with the recorded baseline**

~~~powershell
pnpm lint
~~~

Expected on the unchanged baseline: exit 1 with 289 pre-existing problems, comprising 229 errors and 60 warnings. Confirm no reported path belongs to the sponsor files listed in Step 2 and the totals have not increased. Do not expand this MVP into a repository-wide lint cleanup.

- [ ] **Step 4: Verify static artifacts**

~~~powershell
Test-Path out/sponsor.html
Test-Path out/super-individual.html
Test-Path out/super-individual/monetization.html
Test-Path out/functions/api/sponsor-events.ts
Test-Path out/functions/api/sponsor-inquiry.ts
Select-String -LiteralPath out/sponsor.html -Pattern "开发者工具广告合作"
~~~

Expected: all paths return <code>True</code> and the sponsor heading is found.

- [ ] **Step 5: Perform manual UX and accessibility checks**

Run:

~~~powershell
pnpm dev
~~~

Inspect <code>http://localhost:3000/sponsor</code>, <code>/super-individual</code>, and <code>/super-individual/monetization</code> at 375px, 768px, and 1440px widths.

Expected:

- sponsor page headings follow one H1 then H2/H3 order;
- every form control has a programmatic label;
- Tab reaches fields, checkbox, submit button, and links in visual order;
- focus indicators remain visible;
- errors and success messages are announced through the live region;
- empty campaign data produces no ad card and no blank reserved area after hydration;
- there is no horizontal overflow or layout shift after the initial hydration placeholder;
- shared course navigation, progress, header, and footer behave exactly as before.

Stop the development server after inspection.

- [ ] **Step 6: Run GitNexus final scope detection**

From the repository root:

~~~powershell
node .gitnexus/run.cjs detect-changes --scope compare --base-ref main
~~~

Expected: affected code is limited to sponsor domain/UI/Functions, the two LOW-risk Super Individual pages, package scripts, worker types, and Wrangler configuration. If <code>CourseLayout</code> or unrelated execution flows appear, investigate and remove the unintended change before continuing.

- [ ] **Step 7: Make the production deploy decision**

Do not run this step automatically. Deployment is allowed only after explicit user authorization and confirmation of:

- Cloudflare binding <code>SPONSOR_ANALYTICS</code> → <code>easy_go_vibe_sponsor_events</code>;
- secret <code>RESEND_API_KEY</code>;
- optional <code>SPONSOR_INBOX_EMAIL</code>;
- signed pilot or an explicit decision to launch the media kit before the first sponsor.

Authorized command:

~~~powershell
pnpm pages:deploy
~~~

Expected: Cloudflare Pages deployment succeeds and returns the project deployment URL.

- [ ] **Step 8: Run production-only smoke tests after an authorized deploy**

Open the deployed <code>/super-individual</code> page and run this exact browser-console request:

~~~javascript
const smokeResponse = await fetch("/api/sponsor-events", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    schemaVersion: 1,
    eventType: "click",
    campaignId: "smoke-test",
    slot: "super-individual-home",
    path: "/super-individual",
  }),
})
console.log(smokeResponse.status)
~~~

Expected: console prints <code>204</code>.

Submit one real sponsor inquiry owned by the operator through <code>/sponsor</code>. Verify the endpoint returns <code>202</code> in browser network tools and the inbox receives exactly one escaped message. Then export the smoke campaign:

~~~powershell
$env:CF_ACCOUNT_ID="<the 32-character account ID from Cloudflare>"
$env:CF_API_TOKEN="<an Account Analytics Read token>"
pnpm report:sponsor -- smoke-test 1
~~~

Expected: the report contains the smoke event in the correct event-type, slot, and path columns. Do not include the smoke row in advertiser delivery totals.

- [ ] **Step 9: Activate the first real Campaign only from a signed order**

Copy the exact approved values from the insertion order into <code>data/sponsor-campaigns.json</code>, copy the licensed asset into <code>public/sponsors/</code>, set status to <code>active</code>, rerun Steps 2–6, and request separate deployment authorization.

Expected after authorized deployment:

- the card appears only inside its start/end window and selected slot;
- the exact <code>广告</code> label is visible without interaction;
- only one card is present on the page;
- the target is HTTPS and opens with sponsored/noopener/noreferrer semantics;
- the card disappears within 30 seconds of the end timestamp or a pause deployment;
- the first weekly report is scheduled before launch.

- [ ] **Step 10: Apply the business stop conditions**

After the 30-day pilot, continue only if:

- delivery data is explainable and the advertiser receives the final report within three business days;
- reader complaint rate stays below 0.5 percent;
- page performance or bounce-rate guardrails do not worsen by more than 5 percent;
- at least one advertiser renews, expands, or gives a concrete paid follow-up;
- no editorial-independence or undisclosed-ad incident occurred.

If outreach reaches 20 qualified advertisers and 5 substantive sales conversations without one paid pilot, stop sponsor-platform development and return to audience/value growth. Do not add self-service, more slots, or programmatic advertising to compensate.

## Definition of Done

- [ ] Public policy and rate card exist and match the UI.
- [ ] Campaign JSON rejects insecure URLs, reversed dates, and overlapping active inventory.
- [ ] Production data is empty or backed by a signed insertion order.
- [ ] Each eligible page contains at most one local placement and <code>CourseLayout</code> is unchanged.
- [ ] The placement visibly says <code>广告</code> and external links use sponsored/noopener/noreferrer.
- [ ] Viewable impressions require 50% visibility for 1 second and are deduplicated per session.
- [ ] Sponsor analytics contain no raw IP, email, user-agent, cookie, or cross-site identifier.
- [ ] Sponsor inquiries are validated, escaped, honeypot-protected, and separate from reader feedback.
- [ ] Reports account for Analytics Engine sampling.
- [ ] Sponsor tests, both TypeScript checks, sponsor/model validation, targeted lint, and build pass.
- [ ] Full lint has no new problem beyond the recorded historical baseline.
- [ ] GitNexus final scope contains no unintended shared-layout or unrelated flow.
- [ ] Production deployment and real Campaign activation remain explicit, separately authorized actions.

## Self-Review Result

- Spec coverage: direct sponsorship, two placements, disclosure, editorial independence, inquiry, privacy-safe measurement, reporting, operational pause/takedown, verification, and scale gates each map to a task.
- Placeholder scan: implementation code contains no unfinished marker branches. Angle-bracket values occur only where operator-held secrets or a future signed advertiser asset are necessarily external inputs.
- Type consistency: slot names, event fields, Campaign IDs, Analytics Engine column order, package IDs, budget ranges, and campaign goals are defined once per deployment boundary and covered by contract tests.
- Scope repair: self-service, payments, CPC/CPA, programmatic backfill, extra inventory, and shared <code>CourseLayout</code> changes are explicitly deferred.

## Execution Handoff

Plan implementation has two supported paths:

1. **Subagent-Driven (recommended):** use <code>superpowers:subagent-driven-development</code>, dispatch a fresh implementation agent per task, and run specification plus code-quality review between tasks.
2. **Inline Execution:** use <code>superpowers:executing-plans</code>, execute tasks in order with review checkpoints after Tasks 2, 4, 6, and 8.

Do not start Task 8 production deployment or real Campaign activation without the explicit authorization gates written above.

