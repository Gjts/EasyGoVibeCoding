# Remembered Language Preference Design

## Goal

Remember the language selected from the language dropdown and use it the next time the same browser opens the public site root. Explicit locale URLs must remain authoritative.

## Chosen approach

Use a versioned `localStorage` entry and an early root-only browser redirect.

- Storage key: `easy-go-vibe-coding:preferred-locale:v1`.
- Allowed values: `zh-CN`, `ja`, `en`, `fr`, and `de`.
- Selecting an item in the existing language dropdown saves that locale before the anchor navigation continues.
- Opening `/` reads the preference before the main page paints. A valid non-Chinese preference uses `window.location.replace()` to open the corresponding academy root.
- A `zh-CN` preference stays on `/`.
- `/ja/academy/`, `/en/academy/`, `/fr/academy/`, `/de/academy/`, and every deep or shared locale URL never auto-redirect.

This is preferred over a post-hydration React effect because it avoids showing the Chinese page briefly. It is preferred over a Cookie plus Cloudflare Function because the preference is browser-local, needs no server state, and should not change edge caching behavior.

## Components and data flow

1. A small language-preference module owns the storage key, locale validation, storage reads/writes, and root destination mapping.
2. `LanguageSwitcher` records the selected locale in its existing anchor click handler. Navigation remains a real link, preserving keyboard behavior, new-tab support, query strings, hashes, and crawlable locale relationships.
3. The root document includes a minimal early script. It runs only when `location.pathname === "/"`, reads the preference defensively, validates it against the five supported locales, and replaces the current history entry for non-Chinese destinations.

No account, API, database, Cookie, or cross-device synchronization is introduced.

## Failure handling and privacy

- If storage is unavailable, blocked, malformed, or contains an unsupported locale, the operation fails closed and `/` remains Chinese.
- Storage exceptions are swallowed because language preference is optional and must never break navigation or rendering.
- Only a locale code is stored. No identity, browsing history, or page content is persisted.
- `replace()` prevents the Back button from bouncing between `/` and the preferred locale.

## Verification

- Unit tests validate supported and invalid stored values, storage failures, Chinese no-op behavior, and exact locale root destinations.
- Routing tests verify the dropdown saves before navigation and that the early redirect is root-only.
- The complete internationalization suite, lint, TypeScript, and five-locale static build must pass.
- Browser QA covers: select English, return to `/`, observe automatic English redirect; select Chinese, return to `/`, remain Chinese; open an explicit French URL while English is stored, remain French.

## Out of scope

- Account-synchronized language preference.
- Automatic language selection from browser or IP locale.
- A language prompt or consent dialog.
- Redirecting explicit locale links or deep links.
