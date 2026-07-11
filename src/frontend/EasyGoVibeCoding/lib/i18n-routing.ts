export const siteLocales = ["zh-CN", "ja", "en", "fr", "de"] as const

export type SiteLocale = (typeof siteLocales)[number]

const academyBasePaths: Record<SiteLocale, string> = {
  "zh-CN": "",
  ja: "/ja/academy",
  en: "/en/academy",
  fr: "/fr/academy",
  de: "/de/academy",
}

function readSiteLocale(value: string | undefined): SiteLocale {
  const candidate = value ?? "zh-CN"
  if (!siteLocales.includes(candidate as SiteLocale)) {
    throw new Error(`Unsupported site locale: ${candidate}`)
  }
  return candidate as SiteLocale
}

function readSiteBasePath(locale: SiteLocale, value: string | undefined): string {
  const candidate = value ?? academyBasePaths[locale]
  const expected = academyBasePaths[locale]
  if (candidate !== expected) {
    throw new Error(`Invalid site base path for ${locale}: ${candidate}`)
  }
  return candidate
}

export const siteLocale = readSiteLocale(process.env.NEXT_PUBLIC_SITE_LOCALE)
export const siteBasePath = readSiteBasePath(
  siteLocale,
  process.env.NEXT_PUBLIC_SITE_BASE_PATH,
)

function splitPathSuffix(value: string): { pathname: string; suffix: string } {
  const suffixIndex = value.search(/[?#]/)
  if (suffixIndex < 0) return { pathname: value, suffix: "" }
  return {
    pathname: value.slice(0, suffixIndex),
    suffix: value.slice(suffixIndex),
  }
}

function ensureLeadingSlash(pathname: string): string {
  if (!pathname) return "/"
  return pathname.startsWith("/") ? pathname : `/${pathname}`
}

export function stripLocaleBasePath(value: string): string {
  const { pathname: rawPathname, suffix } = splitPathSuffix(value)
  let pathname = ensureLeadingSlash(rawPathname)
  let changed = true

  while (changed) {
    changed = false
    for (const prefix of Object.values(academyBasePaths).filter(Boolean)) {
      if (pathname === prefix || pathname === `${prefix}/`) {
        pathname = "/"
        changed = true
        break
      }
      if (pathname.startsWith(`${prefix}/`)) {
        pathname = ensureLeadingSlash(pathname.slice(prefix.length))
        changed = true
        break
      }
    }
  }

  return `${pathname}${suffix}`
}

export function localizedAcademyPath(
  locale: SiteLocale,
  canonicalPath: string,
): string {
  if (!siteLocales.includes(locale)) {
    throw new Error(`Unsupported site locale: ${locale}`)
  }
  const canonical = stripLocaleBasePath(canonicalPath)
  const { pathname, suffix } = splitPathSuffix(canonical)
  const basePath = academyBasePaths[locale]
  if (!basePath) return `${pathname}${suffix}`
  if (pathname === "/") return `${basePath}${suffix}`
  return `${basePath}${pathname}${suffix}`
}

function normalizeSearch(value: string): string {
  if (!value) return ""
  return value.startsWith("?") ? value : `?${value}`
}

function normalizeHash(value: string): string {
  if (!value) return ""
  return value.startsWith("#") ? value : `#${value}`
}

export function localizedAcademyHref(
  locale: SiteLocale,
  pathname: string,
  search = "",
  hash = "",
): string {
  const pathOnly = splitPathSuffix(pathname).pathname
  return localizedAcademyPath(
    locale,
    `${pathOnly}${normalizeSearch(search)}${normalizeHash(hash)}`,
  )
}
