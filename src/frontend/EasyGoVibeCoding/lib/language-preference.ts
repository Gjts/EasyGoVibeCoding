import {
  localizedAcademyPath,
  siteLocales,
  type SiteLocale,
} from "@/lib/i18n-routing"

export const LANGUAGE_PREFERENCE_STORAGE_KEY =
  "easy-go-vibe-coding:preferred-locale:v1"

const preferredLocaleRoots = Object.fromEntries(
  siteLocales.map((locale) => [
    locale,
    locale === "zh-CN" ? null : localizedAcademyPath(locale, "/"),
  ]),
) as Record<SiteLocale, string | null>

export function readPreferredLocale(
  storage: Pick<Storage, "getItem">,
): SiteLocale | null {
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
  } catch {
    // Language preference is optional and must never block navigation.
  }
}

export const languagePreferenceRedirectScript = `(()=>{try{if(window.location.pathname!=="/")return;const locale=window.localStorage.getItem(${JSON.stringify(
  LANGUAGE_PREFERENCE_STORAGE_KEY,
)});const destination=${JSON.stringify(
  preferredLocaleRoots,
)}[locale];if(destination)window.location.replace(destination)}catch{}})()`
