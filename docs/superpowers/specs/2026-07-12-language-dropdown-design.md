# Multilingual language dropdown design

## Goal

Replace the five always-visible language links with one compact language dropdown so translated header labels cannot squeeze or wrap the language control.

## Interaction

- The trigger displays a globe icon, the current language's native name, and a down chevron.
- The menu lists `简体中文`, `日本語`, `English`, `Français`, and `Deutsch` in the existing locale order.
- The active language is identified with a check mark and `aria-current="page"`.
- Selecting a language navigates to the equivalent localized route while preserving the current query string and hash.
- The dropdown supports keyboard focus, arrow navigation, Enter, Escape, outside-click dismissal, and focus return through the existing Radix menu primitives.

## Accessibility and internationalization

- The trigger has a localized accessible label that makes the page-language change explicit.
- Every option remains a real anchor with `hrefLang` and `lang` attributes.
- Native language names are marked `translate="no"`; flags are not used because languages do not map one-to-one to countries.
- The options are represented as one logical menu/list, and the current state is communicated by more than color.

## Responsive behavior

- The same `LanguageSwitcher` component is reused in desktop and mobile navigation.
- On desktop the trigger stays on one line and does not shrink.
- At 1280–1535 px, other header actions may remain compact, but the current language name stays visible.
- Below the desktop breakpoint, the trigger appears inside the slide-over menu without a second implementation.

## Component boundaries

- `components/language-switcher.tsx` owns locale labels, current-locale state, route mapping, and the dropdown UI.
- `components/header.tsx` only positions the reusable switcher and controls the surrounding responsive header layout.
- Existing `localizedAcademyHref` remains the single routing source of truth.

## Verification

- Unit regression tests assert native labels, five anchors, current-language state, and preserved localized route mapping.
- The complete i18n test suite, ESLint, TypeScript, and the five-locale static build must pass.
- Rendered QA covers English, Japanese, French, and German at 1280 px with no header wrapping or horizontal overflow.
- Mobile QA opens the slide-over, opens the language dropdown, changes language, verifies the URL, and confirms the menus close.
- Browser checks cover page identity, meaningful content, framework overlays, console errors, and screenshots.

## Non-goals

- Automatic browser-language redirects, persisted language preferences, country/region selection, and changes to translation content are outside this fix.
