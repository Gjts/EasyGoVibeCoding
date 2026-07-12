# Super Individual Decision Toolchain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把现有“超级个体篇”升级为一套从需求发现到开发、Supabase、部署、海外支付、Analytics 和自动运营的决策式自动教学课程，并部署到 Cloudflare Pages。

**Architecture:** 保留现有五个 `/super-individual/*` 路由，使用共享的十阶段课程模型、确定性工具推荐引擎和 localStorage 工作区。AI 教练通过 Cloudflare Pages Function 调用 OpenAI 兼容 API；任何资格与合规结论由可测试的规则和官方来源决定，模型只负责追问、解释与总结。

**Tech Stack:** Next.js 16、React 19、TypeScript 5、Zod 3、Tailwind CSS 4、Cloudflare Pages Functions、Node.js 24 内置测试运行器、现有静态 i18n 构建链路。

## Global Constraints

- 不新增 npm 依赖；复用现有 `zod`、Radix UI、lucide-react 和 Node 测试能力。
- 保留 `/super-individual`、`/strategy`、`/monetization`、`/systems`、`/growth`、`/cases` 六个现有 URL。
- 中文为源内容，日语、英语、法语、德语继续使用现有静态翻译构建。
- API 密钥只允许存在于 `.env.local` 或 Cloudflare secret，禁止进入客户端包、HTML、Git 历史和测试夹具。
- 支付与主体资格必须使用确定性规则和官方来源；AI 不得保证开户、收款、税务或合规结果。
- MVP 使用 `egvc:super-individual-workspace:v1` 本地存储，不接入平台自身的 Supabase 登录。
- 工具目录中的支付信息 30 天复核，其他免费额度 90 天复核；过期条目必须显示重新核验提示。
- 每个任务先写失败测试，再实现最小通过代码，任务完成后使用 Lore commit 格式提交。
- 构建必须继续通过现有 i18n SEO、发布审计和本地路径泄漏检查。

---

## File Map

### Domain layer

- `lib/super-individual/types.ts`：唯一的课程、档案、工具、推荐、工作区和 AI 响应类型定义。
- `lib/super-individual/tool-catalog.ts`：经过官方来源核验的首批工具目录。
- `lib/super-individual/tool-catalog-schema.ts`：Zod schema、过期判断和目录验证。
- `lib/super-individual/curriculum.ts`：十阶段课程、表单问题、完成条件和现有路由映射。
- `lib/super-individual/decision-engine.ts`：纯函数推荐引擎、支付分支和警告生成。
- `lib/super-individual/workspace.ts`：本地数据归一化、迁移、保存、导出和重置。
- `lib/super-individual/use-workspace.ts`：React 工作区 hook 和跨标签页同步。
- `lib/super-individual/coach-client.ts`：浏览器端 AI 请求、超时和降级错误类型。
- `lib/super-individual/report.ts`：把工作区转换成可打印上线手册模型。

### UI layer

- `components/super-individual/journey-dashboard.tsx`：概述页的诊断、十步路线和当前进度。
- `components/super-individual/profile-wizard.tsx`：地区、主体、产品、预算和能力诊断。
- `components/super-individual/stage-workbench.tsx`：五个课程页面共享的阶段任务容器。
- `components/super-individual/tool-recommendation-card.tsx`：默认、备选、风险、来源和核验日期。
- `components/super-individual/coach-panel.tsx`：AI 反馈、加载、失败降级和重试。
- `components/super-individual/launch-report.tsx`：最终上线手册、打印和 JSON 导出。

### Page and platform layer

- `app/super-individual/page.tsx`：组合课程仪表盘。
- `app/super-individual/{strategy,monetization,systems,growth,cases}/page.tsx`：组合对应阶段工作台。
- `functions/api/super-individual/coach.ts`：Cloudflare Pages AI 教练端点。
- `styles/globals.css`：打印样式和超级个体组件的响应式辅助规则。
- `scripts/super-individual/*.test.mjs`：目录、工作区、引擎、报告和 API 测试。
- `package.json`：新增本功能测试和类型检查脚本。
- `.env.example`：补充 AI 教练所需变量名，不写真实值。

---

### Task 1: Establish the versioned tool catalog contract

**Files:**
- Create: `lib/super-individual/types.ts`
- Create: `lib/super-individual/tool-catalog-schema.ts`
- Create: `lib/super-individual/tool-catalog.ts`
- Create: `scripts/super-individual/catalog.test.mjs`
- Modify: `package.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Produces: `ToolCatalogItem`, `ToolRecommendation`, `SuperIndividualStageId`, `validateToolCatalog(items, now)`, `TOOL_CATALOG`.
- Consumers: Tasks 3, 4, 5, 7 and 8.

- [x] **Step 1: Add the failing catalog test and test command**

Add `test:super-individual` to `package.json`:

```json
"test:super-individual": "node --experimental-strip-types --test scripts/super-individual/*.test.mjs",
"typecheck": "tsc --noEmit && tsc --project tsconfig.functions.json"
```

Add `"allowImportingTsExtensions": true` to `tsconfig.json`, then create `scripts/super-individual/catalog.test.mjs`:

```js
import test from "node:test"
import assert from "node:assert/strict"
import { TOOL_CATALOG } from "../../lib/super-individual/tool-catalog.ts"
import { validateToolCatalog } from "../../lib/super-individual/tool-catalog-schema.ts"

test("catalog has valid official HTTPS sources and unique ids", () => {
  const result = validateToolCatalog(TOOL_CATALOG, new Date("2026-07-12T00:00:00Z"))
  assert.equal(result.success, true, JSON.stringify(result.errors))
  assert.equal(new Set(TOOL_CATALOG.map((item) => item.id)).size, TOOL_CATALOG.length)
  assert.ok(TOOL_CATALOG.every((item) => item.sources.every((source) => source.url.startsWith("https://"))))
})

test("catalog covers every course stage", () => {
  const covered = new Set(TOOL_CATALOG.flatMap((item) => item.stageIds))
  for (const id of ["discover", "validate", "mvp", "build", "backend", "deploy", "payments", "analytics", "automation", "iterate"]) {
    assert.ok(covered.has(id), `missing catalog coverage for ${id}`)
  }
})
```

- [x] **Step 2: Run the catalog test and verify the missing-module failure**

Run: `npm run test:super-individual`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/super-individual/tool-catalog.ts`.

- [x] **Step 3: Define the shared types and Zod catalog schema**

Create `lib/super-individual/types.ts` with these exact public unions and records:

```ts
export type SuperIndividualStageId =
  | "discover" | "validate" | "mvp" | "build" | "backend"
  | "deploy" | "payments" | "analytics" | "automation" | "iterate"

export type EntityType =
  | "none" | "cn-individual" | "cn-company" | "hk-company"
  | "sg-company" | "us-company" | "other-company"

export type ProductType =
  | "saas" | "ai-app" | "digital-product" | "course"
  | "consulting" | "developer-tool"

export interface ToolSource { label: string; url: string }

export interface ToolCatalogItem {
  id: string
  name: string
  stageIds: SuperIndividualStageId[]
  categories: string[]
  officialUrl: string
  entityTypes: Array<EntityType | "any">
  regions: string[]
  productTypes: Array<ProductType | "any">
  skillLevels: Array<"beginner" | "intermediate" | "advanced" | "any">
  freeTierSummary: string
  limitations: string[]
  upgradeSignals: string[]
  alternatives: string[]
  sources: ToolSource[]
  lastVerifiedAt: string
  verificationDays: 30 | 90
  status: "active" | "recheck" | "retired"
}

export interface ToolRecommendation {
  toolId: string
  rank: "default" | "alternative"
  reasons: string[]
  warnings: string[]
  requiresOfficialCheck: boolean
}

export interface CoachResponse {
  feedback: string
  followUpQuestions: string[]
  missingConsiderations: string[]
  suggestedArtifact: string
  disclaimer?: string
}
```

Create `tool-catalog-schema.ts` using Zod to require non-empty arrays, ISO dates, HTTPS official URLs, unique IDs and a `recheck` warning when `now - lastVerifiedAt` exceeds `verificationDays`.

- [x] **Step 4: Add the first curated catalog and pass the test**

Create `TOOL_CATALOG` with source-backed entries for these IDs and stages:

```ts
export const REQUIRED_TOOL_IDS = [
  "google-trends", "product-hunt", "tally", "calendly", "figma",
  "github", "codex", "claude-code", "cursor", "supabase",
  "cloudflare-pages", "vercel", "stripe", "paddle", "lemon-squeezy",
  "wise-business", "cloudflare-web-analytics", "posthog", "sentry",
  "resend", "n8n", "make", "github-actions",
] as const
```

Each entry must include at least one official `sources` URL, a concrete free-tier summary or `"No durable free tier; verify current pricing"`, limitations, upgrade signals, `lastVerifiedAt: "2026-07-12"`, and the correct 30/90-day interval. Run `npm run test:super-individual`; expected: all catalog tests PASS.

- [x] **Step 5: Commit the catalog contract**

```powershell
git add package.json tsconfig.json lib/super-individual scripts/super-individual/catalog.test.mjs
git commit -m "Make tool recommendations source-backed and maintainable" -m "Constraint: No new dependencies; reuse Zod and Node test." -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: npm run test:super-individual"
```

---

### Task 2: Build the local-first learner workspace

**Files:**
- Create: `lib/super-individual/workspace.ts`
- Create: `lib/super-individual/use-workspace.ts`
- Create: `scripts/super-individual/workspace.test.mjs`

**Interfaces:**
- Consumes: `EntityType`, `ProductType`, `SuperIndividualStageId`, `ToolRecommendation` from Task 1.
- Produces: `SuperIndividualProfile`, `SuperIndividualWorkspace`, `emptyWorkspace()`, `normalizeWorkspace(value)`, `loadWorkspace(storage)`, `saveWorkspace(storage, workspace)`, `updateStageAnswer()`, `completeStage()`, `resetWorkspace()` and `useSuperIndividualWorkspace()`.

- [x] **Step 1: Write workspace migration and persistence tests**

Create an in-memory `Storage` fixture and assert:

```js
test("workspace persists under the v1 key and restores answers", () => {
  const storage = createMemoryStorage()
  const workspace = updateStageAnswer(emptyWorkspace(), "discover", "problem", "Freelancers lose time preparing invoices")
  saveWorkspace(storage, workspace)
  assert.equal(loadWorkspace(storage).stageAnswers.discover.problem, "Freelancers lose time preparing invoices")
})

test("malformed storage returns an empty workspace without throwing", () => {
  const storage = createMemoryStorage({ "egvc:super-individual-workspace:v1": "{" })
  assert.deepEqual(loadWorkspace(storage), emptyWorkspace())
})

test("completeStage refuses a stage with missing required answers", () => {
  assert.throws(() => completeStage(emptyWorkspace(), "discover", ["problem", "audience"]), /missing required answer: problem/)
})
```

- [x] **Step 2: Run the workspace tests and verify they fail**

Run: `npm run test:super-individual`

Expected: catalog tests PASS; workspace tests FAIL with missing exports.

- [x] **Step 3: Implement the versioned workspace**

Use this state shape in `workspace.ts`:

```ts
export interface SuperIndividualProfile {
  version: 1
  locale: string
  region: string
  entityType: EntityType
  productType: ProductType
  billingModel: "one-time" | "subscription" | "usage" | "quote" | "unknown"
  skillLevel: "beginner" | "intermediate" | "advanced"
  monthlyBudget: "zero" | "under-25" | "under-100" | "over-100"
  targetMarkets: string[]
  needs: string[]
  dataSensitivity: "normal" | "sensitive" | "regulated"
  updatedAt: number
}

export interface SuperIndividualWorkspace {
  version: 1
  profile: SuperIndividualProfile | null
  stageAnswers: Partial<Record<SuperIndividualStageId, Record<string, string>>>
  stageStatus: Record<SuperIndividualStageId, "not-started" | "in-progress" | "complete">
  recommendations: Partial<Record<SuperIndividualStageId, ToolRecommendation[]>>
  artifacts: Partial<Record<SuperIndividualStageId, string>>
  aiFeedback: Partial<Record<SuperIndividualStageId, CoachResponse>>
  updatedAt: number
}
```

Catch quota/security errors, return `{ saved: false, reason: "storage-unavailable" }`, and never silently claim success.

- [x] **Step 4: Implement the React hook and pass tests/typecheck**

`useSuperIndividualWorkspace()` must return:

```ts
{
  workspace,
  storageAvailable,
  setProfile(profile),
  setAnswer(stageId, questionId, value),
  setRecommendations(stageId, recommendations),
  setArtifact(stageId, markdown),
  setAIFeedback(stageId, feedback),
  markStageComplete(stageId, requiredQuestionIds),
  reset(),
}
```

Listen for `storage` and `egvc:super-individual-workspace-change`, then run `npm run test:super-individual` and `npm run typecheck`; expected: PASS.

- [x] **Step 5: Commit local-first persistence**

```powershell
git add lib/super-individual scripts/super-individual/workspace.test.mjs
git commit -m "Keep the product-building journey recoverable without an account" -m "Constraint: MVP must remain local-first and survive refreshes." -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: npm run test:super-individual; npm run typecheck"
```

---

### Task 3: Implement deterministic recommendations and payment branches

**Files:**
- Create: `lib/super-individual/decision-engine.ts`
- Create: `scripts/super-individual/decision-engine.test.mjs`

**Interfaces:**
- Consumes: `TOOL_CATALOG`, `SuperIndividualProfile`, `ToolCatalogItem`.
- Produces: `recommendTools(profile, stageId, catalog, now): ToolRecommendation[]` and `getProfileWarnings(profile): string[]`.

- [x] **Step 1: Write table-driven decision tests**

Cover these exact cases:

```js
const cases = [
  {
    name: "mainland individual receives MoR candidates and no direct Stripe default",
    profile: profile({ entityType: "cn-individual", region: "CN", productType: "saas" }),
    expectedDefaults: ["paddle"],
    forbiddenDefaults: ["stripe"],
  },
  {
    name: "Hong Kong company can receive Stripe with Wise as settlement alternative",
    profile: profile({ entityType: "hk-company", region: "HK", productType: "saas" }),
    expectedDefaults: ["stripe"],
    expectedAny: ["wise-business", "paddle"],
  },
  {
    name: "sensitive data adds backend security warning",
    profile: profile({ dataSensitivity: "sensitive" }),
    stage: "backend",
    warning: "敏感数据",
  },
]
```

Also assert that a stale payment entry sets `requiresOfficialCheck: true`.

- [x] **Step 2: Run tests and verify the missing-engine failure**

Run: `npm run test:super-individual`

Expected: decision-engine tests FAIL with `ERR_MODULE_NOT_FOUND`.

- [x] **Step 3: Implement explainable filtering and ranking**

The engine must:

1. Exclude `retired` tools.
2. Filter by `stageIds`, `entityTypes`, `regions`, `productTypes` and `skillLevels`.
3. Rank a small default stack before alternatives.
4. Add concrete reasons such as `"匹配香港公司主体"` and warnings such as `"开户和产品审核结果以平台官方决定为准"`.
5. Never rank Wise as the only/default checkout tool.
6. Mark expired entries for official recheck.
7. Return no more than one default and two alternatives per category.

- [x] **Step 4: Run focused and full verification**

Run: `npm run test:super-individual`

Expected: all tests PASS with mainland, Hong Kong, stale data and sensitive-data cases covered.

Run: `npm run typecheck`

Expected: PASS with no TypeScript errors.

- [x] **Step 5: Commit deterministic recommendations**

```powershell
git add lib/super-individual/decision-engine.ts scripts/super-individual/decision-engine.test.mjs
git commit -m "Keep regional tool guidance deterministic and explainable" -m "Constraint: AI must not decide payment eligibility." -m "Rejected: One global payment stack | entity and region support differs." -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: npm run test:super-individual; npm run typecheck"
```

---

### Task 4: Define the ten-stage curriculum and shared workbench UI

**Files:**
- Create: `lib/super-individual/curriculum.ts`
- Create: `components/super-individual/profile-wizard.tsx`
- Create: `components/super-individual/tool-recommendation-card.tsx`
- Create: `components/super-individual/stage-workbench.tsx`
- Create: `components/super-individual/journey-dashboard.tsx`
- Create: `scripts/super-individual/curriculum.test.mjs`

**Interfaces:**
- Consumes: workspace hook, decision engine and catalog.
- Produces: `SUPER_INDIVIDUAL_STAGES`, `getStagesForRoute(path)`, `<JourneyDashboard />`, `<StageWorkbench stageIds={...} />`.

- [x] **Step 1: Write curriculum coverage tests**

Assert all ten IDs occur once, all required question IDs are unique within a stage, route mapping is sequential, and every stage has a concrete artifact title:

```js
assert.deepEqual(SUPER_INDIVIDUAL_STAGES.map((stage) => stage.id), [
  "discover", "validate", "mvp", "build", "backend",
  "deploy", "payments", "analytics", "automation", "iterate",
])
assert.deepEqual(getStagesForRoute("/super-individual/systems").map((stage) => stage.id), [
  "build", "backend", "deploy", "payments",
])
```

- [x] **Step 2: Run tests and verify missing curriculum exports**

Run: `npm run test:super-individual`

Expected: curriculum test FAIL with missing module/exports.

- [x] **Step 3: Implement the curriculum model**

Define each stage with:

```ts
export interface CurriculumStage {
  id: SuperIndividualStageId
  order: number
  title: string
  summary: string
  route: string
  principles: string[]
  mistakes: string[]
  questions: Array<{
    id: string
    label: string
    help: string
    kind: "text" | "textarea" | "single" | "multi"
    required: boolean
    options?: Array<{ value: string; label: string }>
  }>
  artifactTitle: string
  artifactTemplate: string
}
```

Use stage-specific questions: demand evidence and audience for `discover`; interview evidence for `validate`; excluded scope for `mvp`; repository/test workflow for `build`; RLS/data sensitivity for `backend`; environment/domain checks for `deploy`; entity and manual verification for `payments`; activation/payment/error events for `analytics`; trigger/action/owner for `automation`; metrics and decision for `iterate`.

- [x] **Step 4: Build accessible shared UI components**

`ProfileWizard` must use labeled native inputs/selects, expose validation messages through `aria-describedby`, and save only after all required diagnostic fields are present.

`StageWorkbench` must render this ordered structure:

```tsx
<section aria-labelledby={`${stage.id}-title`}>
  <StagePrinciples />
  <StageQuestions />
  <StageRecommendations />
  <CoachPanel />
  <ArtifactEditor />
  <StageCompletion />
</section>
```

`JourneyDashboard` must show 10-step progress, resume link, profile summary, recommended stack and report link. Mobile layout is single-column; desktop uses a two-column dashboard without fixed-width overflow.

- [x] **Step 5: Verify and commit the workbench**

Run: `npm run test:super-individual && npm run typecheck && npm run lint`

Expected: all commands PASS.

```powershell
git add lib/super-individual/curriculum.ts components/super-individual scripts/super-individual/curriculum.test.mjs
git commit -m "Turn the solo course into a guided ten-stage workbench" -m "Constraint: Preserve five existing content routes and mobile usability." -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: unit tests, typecheck, lint"
```

---

### Task 5: Replace the six static pages with the decision journey

**Files:**
- Modify: `app/super-individual/page.tsx`
- Modify: `app/super-individual/strategy/page.tsx`
- Modify: `app/super-individual/monetization/page.tsx`
- Modify: `app/super-individual/systems/page.tsx`
- Modify: `app/super-individual/growth/page.tsx`
- Modify: `app/super-individual/cases/page.tsx`
- Modify: `components/course/chapters.ts`

**Interfaces:**
- Consumes: `<JourneyDashboard />`, `<StageWorkbench />`, `superIndividualChapters`.
- Produces: stable route pages with the approved ten-stage workflow.

- [x] **Step 1: Add a route-render smoke test**

Create `scripts/super-individual/pages.test.mjs` that reads all six page files and asserts each imports the approved shared component and keeps `CourseLayout`; assert no page contains the obsolete phrases `三种 Offer 形态` or `四个系统` as its only instructional structure.

- [x] **Step 2: Run smoke test and verify failure**

Run: `npm run test:super-individual`

Expected: pages test FAIL because existing pages do not import the shared journey components.

- [x] **Step 3: Recompose the overview and five chapter routes**

Use these exact stage groups:

```tsx
// strategy
<StageWorkbench stageIds={["discover", "validate"]} />

// monetization
<StageWorkbench stageIds={["mvp"]} />

// systems
<StageWorkbench stageIds={["build", "backend", "deploy", "payments"]} />

// growth
<StageWorkbench stageIds={["analytics", "automation"]} />

// cases
<StageWorkbench stageIds={["iterate"]} />
```

Preserve valuable existing examples by moving them into `principles`, `mistakes` or artifact guidance rather than duplicating long static sections.

- [x] **Step 4: Update navigation copy and verify buildability**

Keep the same hrefs, update summaries to describe the new stage group, and run:

`npm run test:super-individual && npm run typecheck && npm run lint && npm run build`

Expected: tests, typecheck and lint PASS; build produces all six routes in `out/super-individual`.

- [x] **Step 5: Commit the page transition**

```powershell
git add app/super-individual components/course/chapters.ts scripts/super-individual/pages.test.mjs
git commit -m "Make every solo-course chapter produce an executable product asset" -m "Constraint: Existing URLs remain stable for SEO and translations." -m "Confidence: high" -m "Scope-risk: broad" -m "Tested: unit tests, typecheck, lint, production build"
```

---

### Task 6: Add the secure AI coach with deterministic fallback

**Files:**
- Create: `functions/api/super-individual/coach.ts`
- Create: `lib/super-individual/coach-client.ts`
- Create: `components/super-individual/coach-panel.tsx`
- Create: `scripts/super-individual/coach-api.test.mjs`
- Modify: `.env.example`
- Modify: `scripts/i18n/deployment-secrets.mjs`

**Interfaces:**
- Consumes: current stage answers and deterministic recommendations.
- Produces: POST `/api/super-individual/coach`, `createCoachHandler({ fetchImpl })`, `onRequestPost` and `requestCoachFeedback(input, signal)`.

- [x] **Step 1: Write API contract tests**

Import `onRequestPost` from the Pages Function and assert:

```js
test("coach rejects oversized or invalid requests before calling upstream", async () => {
  const response = await onRequestPost({
    request: jsonRequest({ stageId: "payments", answers: { note: "x".repeat(9001) } }),
    env: validEnv(),
  })
  assert.equal(response.status, 400)
})

test("coach reports unconfigured service without exposing environment values", async () => {
  const response = await onRequestPost({ request: jsonRequest(validBody()), env: {} })
  assert.equal(response.status, 503)
  assert.doesNotMatch(await response.text(), /sk-|api[_-]?key/i)
})

test("coach validates upstream structured output", async () => {
  const handler = createCoachHandler({
    fetchImpl: async () => new Response(JSON.stringify(validOpenAIResponse(validCoachResponse()))),
  })
  const response = await handler({
    request: jsonRequest(validBody()),
    env: validEnv(),
  })
  assert.equal(response.status, 200)
})
```

- [x] **Step 2: Run tests and verify missing handler failure**

Run: `npm run test:super-individual`

Expected: coach API test FAIL with missing module.

- [x] **Step 3: Implement the Cloudflare function**

Use environment names:

```ts
interface Env {
  SUPER_INDIVIDUAL_AI_BASE_URL?: string
  SUPER_INDIVIDUAL_AI_API_KEY?: string
  SUPER_INDIVIDUAL_AI_MODEL?: string
}
```

Requirements:

- Accept POST and OPTIONS only.
- Require HTTPS base URL.
- Limit body to 16 KB, each answer to 8,000 characters, at most 20 answers and at most 3 candidate tools.
- Use a 20-second `AbortController` timeout.
- Call `${baseUrlWithoutTrailingSlash}/chat/completions` with `response_format: { type: "json_object" }`.
- Tell the model that it may explain but may not guarantee eligibility, compliance or approval.
- Validate the final `CoachResponse` with Zod.
- Return `{ success: false, code }` without upstream body, stack, URL or key.
- Add both new secret names to `DEPLOYMENT_SECRET_NAMES` so release audits scan for them.
- Export `createCoachHandler({ fetchImpl = fetch })`; assign `onRequestPost = createCoachHandler({ fetchImpl: fetch })` so tests can inject an upstream response without changing the Cloudflare function signature.

- [x] **Step 4: Implement the client panel and fallback**

`requestCoachFeedback` must throw one of `unconfigured`, `timeout`, `rate-limited`, `invalid-response` or `upstream-failed`. `CoachPanel` must retain the user's answers, keep deterministic recommendations visible, show a retry button, and never render model HTML.

Update `.env.example` with empty values:

```dotenv
SUPER_INDIVIDUAL_AI_BASE_URL=https://example.com/v1
SUPER_INDIVIDUAL_AI_API_KEY=
SUPER_INDIVIDUAL_AI_MODEL=gpt-5.4-mini
```

Run `npm run test:super-individual && npm run typecheck:functions && npm run typecheck`; expected: PASS.

- [x] **Step 5: Commit the secure coach**

```powershell
git add functions/api/super-individual lib/super-individual/coach-client.ts components/super-individual/coach-panel.tsx scripts/super-individual/coach-api.test.mjs .env.example scripts/i18n/deployment-secrets.mjs
git commit -m "Add optional coaching without weakening deterministic guidance" -m "Constraint: Secrets remain server-only and AI cannot decide eligibility." -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: API contract tests and both TypeScript configs"
```

---

### Task 7: Generate and export the personal launch handbook

**Files:**
- Create: `lib/super-individual/report.ts`
- Create: `components/super-individual/launch-report.tsx`
- Create: `scripts/super-individual/report.test.mjs`
- Modify: `components/super-individual/journey-dashboard.tsx`
- Modify: `styles/globals.css`

**Interfaces:**
- Consumes: `SuperIndividualWorkspace`, catalog and curriculum.
- Produces: `buildLaunchReport(workspace, catalog)`, print view and JSON download.

- [x] **Step 1: Write report completeness and redaction tests**

Assert the report contains all ten stage headings in order, includes official source links for recommendations, labels unfinished stages, and excludes keys matching `/api[_-]?key|token|password/i` from arbitrary answer keys.

- [x] **Step 2: Run report tests and verify failure**

Run: `npm run test:super-individual`

Expected: report test FAIL with missing exports.

- [x] **Step 3: Implement a deterministic report model**

Use this output shape:

```ts
export interface LaunchReport {
  generatedAt: string
  profileSummary: Array<{ label: string; value: string }>
  stages: Array<{
    id: SuperIndividualStageId
    title: string
    status: "complete" | "in-progress" | "not-started"
    artifact: string
    tools: Array<{ name: string; reasons: string[]; warnings: string[]; sources: ToolSource[] }>
  }>
  globalWarnings: string[]
}
```

Never include raw AI request metadata or secret-shaped answer fields.

- [x] **Step 4: Implement print and JSON export UI**

`LaunchReport` must provide:

- “打印 / 保存为 PDF” calling `window.print()`;
- “导出 JSON” using a Blob and temporary object URL;
- a visible generation timestamp and tool verification dates;
- incomplete-stage labels;
- print CSS hiding header, footer, sidebars, forms and action buttons while preserving URLs.

Run `npm run test:super-individual && npm run typecheck && npm run lint`; expected: PASS.

- [x] **Step 5: Commit the handbook**

```powershell
git add lib/super-individual/report.ts components/super-individual styles/globals.css scripts/super-individual/report.test.mjs
git commit -m "Make course completion produce a portable launch handbook" -m "Constraint: Export must redact secret-shaped fields and work without an account." -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: report tests, typecheck, lint"
```

---

### Task 8: Translate, audit and harden the complete static release

**Files:**
- Modify generated content under: `i18n/catalog/`
- Modify generated locale output only through existing scripts.
- Modify: `scripts/i18n/release-audit-allowlist.json` only if a verified false positive occurs; include an exact reason and occurrence count.

**Interfaces:**
- Consumes: complete Chinese source implementation.
- Produces: zh-CN, ja, en, fr and de static builds with no secrets or local-path leakage.

- [ ] **Step 1: Extract the updated translation catalog**

Run: `npm run i18n:extract`

Expected: source catalog includes all new user-visible curriculum, validation, recommendation, warning and report strings; brand names and official URLs remain unchanged.

- [ ] **Step 2: Run i18n unit tests before translation**

Run: `npm run test:i18n`

Expected: all source extraction, transformation, routing, SEO and release tests PASS.

- [ ] **Step 3: Translate the complete catalog with the configured server-side environment**

Run: `npm run i18n:translate:all`

Expected: translation script completes for `ja`, `en`, `fr` and `de`, preserves placeholders and code identifiers, and records no missing message IDs.

- [ ] **Step 4: Build and audit all locales**

Run in order:

```powershell
npm run i18n:build:all
npm run i18n:audit:seo
npm run i18n:audit:release
npm run i18n:verify:release
```

Expected: all commands PASS; release audit reports zero configured-secret leaks and zero unapproved local paths.

- [ ] **Step 5: Commit the multilingual release artifacts**

```powershell
git add i18n scripts/i18n
git commit -m "Keep the product toolchain equally usable across five languages" -m "Constraint: Translations must preserve brands, URLs, code and decision semantics." -m "Confidence: high" -m "Scope-risk: broad" -m "Tested: i18n tests, five-locale build, SEO and release audits"
```

---

### Task 9: Run production verification, deploy and confirm Cloudflare

**Files:**
- Modify: `task.md` checkbox status.
- Modify: `CLOUDFLARE_DEPLOY.md` only if the new AI environment variable names are not already documented by Task 6.

**Interfaces:**
- Consumes: all implementation tasks.
- Produces: pushed `main` branch and verified production behavior on `https://easy-go-vibe-coding.pages.dev/`.

- [ ] **Step 1: Run the complete local verification matrix**

Run:

```powershell
npm run test:super-individual
npm run test:i18n
npm run lint
npm run typecheck
npm run typecheck:functions
npm run build
npm run i18n:build:all
npm run i18n:audit:seo
npm run i18n:audit:release
npm run i18n:verify:release
git diff --check
```

Expected: every command exits 0; no secret-bearing values or local paths appear in `out`.

- [ ] **Step 2: Perform local browser acceptance tests**

Start the built static site, then verify desktop and mobile widths:

1. `/super-individual` opens the profile wizard and ten-stage map.
2. Mainland individual/SaaS produces MoR-first payment guidance without default Stripe.
3. Hong Kong company/SaaS produces Stripe plus Paddle/Wise alternatives.
4. Refresh preserves answers and stage progress.
5. AI failure leaves deterministic recommendations usable.
6. All six existing routes load.
7. Print preview contains the launch handbook and hides navigation/forms.
8. `/ja/academy/super-individual`, `/en/academy/super-individual`, `/fr/academy/super-individual`, and `/de/academy/super-individual` load translated content.

- [ ] **Step 3: Review changes and create the release commit**

Inspect `git status --short`, `git diff --stat`, recent commits and the final `task.md`. Commit remaining documentation/status changes with:

```powershell
git add task.md CLOUDFLARE_DEPLOY.md
git commit -m "Record the verified release path for the solo product course" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: full local verification matrix and browser acceptance"
```

- [ ] **Step 4: Push main and deploy Cloudflare Pages**

Run:

```powershell
git push origin main
npm run pages:deploy
```

Expected: GitHub accepts `main`; Wrangler reports a successful deployment for project `easy-go-vibe-coding`.

If the AI secrets are configured for translation but not Pages runtime, set the Cloudflare Pages variables `SUPER_INDIVIDUAL_AI_BASE_URL`, `SUPER_INDIVIDUAL_AI_API_KEY`, and `SUPER_INDIVIDUAL_AI_MODEL` through the authenticated Wrangler/Cloudflare environment without printing their values.

- [ ] **Step 5: Verify production and close the task**

Verify the production URL and localized routes with fresh browser state. Confirm:

- deployed build contains the new dashboard and ten stages;
- payment branches differ by profile;
- API endpoint returns either structured feedback or the documented safe `unconfigured` fallback;
- no console errors occur in the core journey;
- language switching and remembered locale continue working;
- Cloudflare serves the latest commit.

Mark all `task.md` checkboxes complete, run `git status --short`, and create a final status-only commit if the checkbox update changes the file.

---

## Final Completion Evidence

The work is complete only when all evidence is recorded in the final handoff:

- final Git commit hash on `main`;
- GitHub push result;
- Cloudflare deployment URL;
- production checks for Chinese and four localized routes;
- unit, i18n, lint, typecheck, build, SEO and release-audit results;
- confirmation that configured secrets were scanned out of static output;
- changed files and architectural simplifications;
- any remaining external limitation, especially payment-provider approval or missing Cloudflare AI runtime configuration.
