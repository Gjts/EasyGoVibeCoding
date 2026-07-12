# Language Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace five exposed locale links with one accessible, route-preserving language dropdown that fits translated headers at every supported viewport.

**Architecture:** Keep locale data and routing inside `LanguageSwitcher`, using the repository's Radix dropdown primitives for keyboard and focus behavior. Keep `Header` responsible only for responsive placement, then regenerate translation occurrence offsets before the five-locale build.

**Tech Stack:** React 19, Next.js 16, Radix Dropdown Menu, Tailwind CSS 4, Node test runner, Cloudflare Pages

## Global Constraints

- Reuse `localizedAcademyHref` as the only locale-routing implementation.
- Render native names: `简体中文`, `日本語`, `English`, `Français`, `Deutsch`.
- Preserve pathname, query string, and hash when switching.
- Do not use flags or add dependencies.
- Keep each destination as an anchor with `lang`, `hrefLang`, and `translate="no"`.

---

### Task 1: Lock the dropdown contract with regression tests

**Files:**
- Modify: `src/frontend/EasyGoVibeCoding/scripts/i18n/i18n-routing.test.mjs`
- Modify: `src/frontend/EasyGoVibeCoding/scripts/i18n/header-responsive.test.mjs`

**Interfaces:**
- Consumes: `LanguageSwitcher` source and `localizedAcademyHref(locale, pathname, search, hash)`.
- Produces: Tests requiring five native-name anchors inside Radix dropdown primitives and a compact header placement.

- [ ] **Step 1: Replace the old exposed-code assertions with the dropdown contract**

```js
for (const [locale, label] of [["zh-CN", "简体中文"], ["ja", "日本語"], ["en", "English"], ["fr", "Français"], ["de", "Deutsch"]]) {
  assert.match(switcher, new RegExp(`locale: \\"${locale}\\".*label: \\"${label}\\"`, "s"))
}
assert.match(switcher, /DropdownMenuTrigger/)
assert.match(switcher, /DropdownMenuContent/)
assert.match(switcher, /DropdownMenuItem/)
assert.match(switcher, /translate="no"/)
assert.match(switcher, /aria-current=/)
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test scripts/i18n/i18n-routing.test.mjs scripts/i18n/header-responsive.test.mjs`

Expected: FAIL because the switcher still renders five visible code links and has no dropdown trigger/content.

### Task 2: Implement the reusable accessible dropdown

**Files:**
- Modify: `src/frontend/EasyGoVibeCoding/components/language-switcher.tsx`
- Modify: `src/frontend/EasyGoVibeCoding/components/header.tsx`

**Interfaces:**
- Consumes: `siteLocale`, `localizedAcademyHref`, and the existing `DropdownMenu*` components.
- Produces: `LanguageSwitcher({ className?: string })` with a globe/current-name trigger and five native-name destinations.

- [ ] **Step 1: Add locale metadata and Radix imports**

```tsx
import { Check, ChevronDown, Globe2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languageOptions = [
  { locale: "zh-CN", label: "简体中文" },
  { locale: "ja", label: "日本語" },
  { locale: "en", label: "English" },
  { locale: "fr", label: "Français" },
  { locale: "de", label: "Deutsch" },
] satisfies { locale: SiteLocale; label: string }[]
```

- [ ] **Step 2: Render one trigger and five anchor-backed menu items**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger aria-label="切换页面语言" className="...">
    <Globe2 />
    <span translate="no" lang={current.locale}>{current.label}</span>
    <ChevronDown />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    {languageOptions.map((option) => (
      <DropdownMenuItem key={option.locale} asChild>
        <a href={localizedAcademyHref(option.locale, pathname, locationSuffix.search, locationSuffix.hash)} hrefLang={option.locale} lang={option.locale} aria-current={option.locale === siteLocale ? "page" : undefined} translate="no">
          <span>{option.label}</span>
          {option.locale === siteLocale ? <Check className="ml-auto" /> : null}
        </a>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

- [ ] **Step 3: Keep Header positioning compact without hiding the selected language**

Use the existing `xl` desktop breakpoint, compact action labels below `2xl`, and remove obsolete language-list width constraints.

- [ ] **Step 4: Run focused tests, ESLint, and TypeScript and verify GREEN**

Run: `node --test scripts/i18n/i18n-routing.test.mjs scripts/i18n/header-responsive.test.mjs && pnpm exec eslint components/header.tsx components/language-switcher.tsx scripts/i18n/i18n-routing.test.mjs scripts/i18n/header-responsive.test.mjs && pnpm exec tsc --noEmit`

Expected: all commands exit 0.

### Task 3: Regenerate, render-test, deploy, and verify

**Files:**
- Modify: `src/frontend/EasyGoVibeCoding/i18n/catalog/occurrences.json`

**Interfaces:**
- Consumes: completed dropdown component and existing five-locale build pipeline.
- Produces: verified `.cache/i18n-deploy`, Git main commits, and a successful Cloudflare production deployment.

- [ ] **Step 1: Refresh translation source offsets**

Run: `pnpm i18n:extract`

Expected: extraction succeeds and only expected source occurrence offsets change.

- [ ] **Step 2: Run all automated verification**

Run: `pnpm test:i18n && pnpm exec eslint components/header.tsx components/language-switcher.tsx && pnpm exec tsc --noEmit`

Expected: 117 or more tests pass; lint and typecheck exit 0.

- [ ] **Step 3: Build the complete production artifact**

Run with `I18N_SITE_ORIGIN=https://easy-go-vibe-coding.pages.dev`: `pnpm i18n:build:all`

Expected: five locale builds exit 0 and the merge reports 400 business HTML pages.

- [ ] **Step 4: Browser-test desktop and mobile interactions**

Serve `.cache/i18n-deploy`, verify English/Japanese/French/German at 1280 px, open the dropdown, switch languages, verify no overflow/header wrapping/console errors, then repeat from the mobile slide-over at 1024 px.

- [ ] **Step 5: Commit, push main, and verify Cloudflare**

Commit source/test/catalog changes using the repository Lore trailers, push `HEAD:main`, wait for the Git-triggered Pages deployment, then verify all four localized academy routes return 200 with the expected `lang` and canonical URL.
