# Remembered Language Preference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remember a language selected from the dropdown and redirect only a later visit to `/` to that locale's academy root.

**Architecture:** A small pure module owns the versioned storage key, defensive storage access, allowed locale validation, locale-root mapping, and the early redirect script. The existing dropdown saves the selected locale before normal anchor navigation, while the Chinese root layout emits the root-only script in `<head>` so redirection happens before the page paints.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, browser `localStorage`, Node test runner.

## Global Constraints

- Storage key is exactly `easy-go-vibe-coding:preferred-locale:v1`.
- Allowed values are exactly `zh-CN`, `ja`, `en`, `fr`, and `de`.
- Explicit locale routes and deep links never auto-redirect.
- Storage errors and invalid values must leave `/` in Chinese without throwing.
- Use `window.location.replace()` for automatic redirects.
- Add no dependency, Cookie, account state, API, database, or cross-device synchronization.

---

### Task 1: Pure language preference contract

**Files:**
- Create: `src/frontend/EasyGoVibeCoding/lib/language-preference.ts`
- Modify: `src/frontend/EasyGoVibeCoding/scripts/i18n/i18n-routing.test.mjs`

**Interfaces:**
- Consumes: `siteLocales`, `localizedAcademyPath`, and `SiteLocale` from `@/lib/i18n-routing`.
- Produces: `LANGUAGE_PREFERENCE_STORAGE_KEY`, `readPreferredLocale(storage)`, `savePreferredLocale(storage, locale)`, and `languagePreferenceRedirectScript`.

- [ ] **Step 1: Write failing unit tests**

Add tests that load `lib/language-preference.ts` through the existing `loadTypeScript` helper. Assert that valid values round-trip, invalid values return `null`, `getItem`/`setItem` exceptions do not escape, and the generated script redirects `/` for `en` but does not redirect `/fr/academy/`, `zh-CN`, or invalid values.

```js
test("language preference storage validates values and fails closed", () => {
  withBuildEnv("zh-CN", "", () => {
    const preference = loadTypeScript("lib/language-preference.ts")
    const values = new Map()
    const storage = {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    }
    preference.savePreferredLocale(storage, "en")
    assert.equal(preference.readPreferredLocale(storage), "en")
    values.set(preference.LANGUAGE_PREFERENCE_STORAGE_KEY, "es")
    assert.equal(preference.readPreferredLocale(storage), null)
    assert.doesNotThrow(() => preference.readPreferredLocale({ getItem() { throw new Error("blocked") } }))
    assert.doesNotThrow(() => preference.savePreferredLocale({ setItem() { throw new Error("blocked") } }, "fr"))
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test scripts/i18n/i18n-routing.test.mjs`

Expected: FAIL because `lib/language-preference.ts` does not exist.

- [ ] **Step 3: Implement the pure module**

Create the constants and functions with defensive `try/catch`. Generate the redirect script from an exact locale-root map so the script and TypeScript API share one source of truth.

```ts
import { localizedAcademyPath, siteLocales, type SiteLocale } from "@/lib/i18n-routing"

export const LANGUAGE_PREFERENCE_STORAGE_KEY = "easy-go-vibe-coding:preferred-locale:v1"

const preferredLocaleRoots = Object.fromEntries(
  siteLocales.map((locale) => [locale, locale === "zh-CN" ? null : localizedAcademyPath(locale, "/")]),
) as Record<SiteLocale, string | null>

export function readPreferredLocale(storage: Pick<Storage, "getItem">): SiteLocale | null {
  try {
    const value = storage.getItem(LANGUAGE_PREFERENCE_STORAGE_KEY)
    return siteLocales.includes(value as SiteLocale) ? (value as SiteLocale) : null
  } catch {
    return null
  }
}

export function savePreferredLocale(
  storage: Pick<Storage, "setItem">,
  locale: SiteLocale,
): void {
  try {
    storage.setItem(LANGUAGE_PREFERENCE_STORAGE_KEY, locale)
  } catch {}
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test scripts/i18n/i18n-routing.test.mjs`

Expected: all routing and preference tests PASS.

### Task 2: Dropdown persistence and pre-paint root redirect

**Files:**
- Modify: `src/frontend/EasyGoVibeCoding/components/language-switcher.tsx`
- Modify: `src/frontend/EasyGoVibeCoding/app/layout.tsx`
- Modify: `src/frontend/EasyGoVibeCoding/scripts/i18n/i18n-routing.test.mjs`
- Refresh: `src/frontend/EasyGoVibeCoding/i18n/catalog/occurrences.json`

**Interfaces:**
- Consumes: `savePreferredLocale(window.localStorage, locale)` and `languagePreferenceRedirectScript` from Task 1.
- Produces: saved dropdown selections and a Chinese-root-only early redirect.

- [ ] **Step 1: Write failing integration contract assertions**

Assert that `language-switcher.tsx` imports and calls `savePreferredLocale` from each locale anchor, and `app/layout.tsx` emits `languagePreferenceRedirectScript` only when `siteLocale === "zh-CN"`.

```js
test("language selection persists and the Chinese root installs the early redirect", () => {
  const switcher = source("components/language-switcher.tsx")
  const layout = source("app/layout.tsx")
  assert.match(switcher, /savePreferredLocale\(window\.localStorage, locale\)/)
  assert.match(layout, /siteLocale === ["']zh-CN["']/)
  assert.match(layout, /languagePreferenceRedirectScript/)
  assert.match(layout, /dangerouslySetInnerHTML/)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test scripts/i18n/i18n-routing.test.mjs`

Expected: FAIL because the switcher and layout do not yet use the preference module.

- [ ] **Step 3: Implement the integrations**

Add `onClick={() => savePreferredLocale(window.localStorage, locale)}` to each existing locale anchor. Import the generated script into `app/layout.tsx` and render this exact Chinese-build-only head entry:

```tsx
<head>
  {siteLocale === "zh-CN" ? (
    <script dangerouslySetInnerHTML={{ __html: languagePreferenceRedirectScript }} />
  ) : null}
</head>
```

- [ ] **Step 4: Refresh extraction and run automated verification**

Run:

```powershell
pnpm i18n:extract
pnpm test:i18n
pnpm exec eslint components/language-switcher.tsx app/layout.tsx lib/language-preference.ts scripts/i18n/i18n-routing.test.mjs
pnpm exec tsc --noEmit
$env:I18N_SITE_ORIGIN='https://easy-go-vibe-coding.pages.dev'; pnpm i18n:build:all
git diff --check
```

Expected: 117 existing tests plus the new preference tests pass; five locale builds exit `0`; 400 business HTML pages are produced.

### Task 3: Browser verification and release

**Files:**
- No production file changes expected.

**Interfaces:**
- Consumes: the merged `.cache/i18n-deploy` artifact from Task 2.
- Produces: interaction evidence and the released `main` commit.

- [ ] **Step 1: Verify the three browser flows**

Serve `.cache/i18n-deploy` locally. At a desktop viewport:

1. Open `/`, select English, return to `/`, and verify automatic navigation to `/en/academy/`.
2. Select 简体中文, return to `/`, and verify the page remains `/`.
3. Save English, directly open `/fr/academy/`, and verify the page remains French.

Also verify meaningful content, no framework overlay, no relevant console errors, and capture one screenshot.

- [ ] **Step 2: Commit and push**

Create a Lore-format commit covering the preference module, integration, tests, and generated occurrence offsets. Push `HEAD:main`.

- [ ] **Step 3: Verify Cloudflare and production behavior**

Wait for the Cloudflare Pages deployment tied to the new commit to reach build `success` and deploy `success`. Repeat the root-to-preferred-language check on `https://easy-go-vibe-coding.pages.dev/`, verify explicit locale URLs remain authoritative, and confirm local `HEAD` equals remote `main`.
