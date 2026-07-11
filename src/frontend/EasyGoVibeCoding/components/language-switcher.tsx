"use client"

import { usePathname } from "next/navigation"
import {
  localizedAcademyPath,
  siteLocale,
  stripLocaleBasePath,
  type SiteLocale,
} from "@/lib/i18n-routing"

const languageOptions: { locale: SiteLocale; label: string }[] = [
  { locale: "zh-CN", label: "ZH-CN" },
  { locale: "ja", label: "JA" },
  { locale: "en", label: "EN" },
  { locale: "fr", label: "FR" },
  { locale: "de", label: "DE" },
]

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/"
  const canonicalPath = stripLocaleBasePath(pathname)

  return (
    <nav
      aria-label="Language"
      className={`flex flex-wrap items-center gap-1 ${className}`}
    >
      {languageOptions.map(({ locale, label }) => (
        <a
          key={locale}
          href={localizedAcademyPath(locale, canonicalPath)}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === siteLocale ? "page" : undefined}
          className={`rounded-md px-1.5 py-1 text-[10px] font-bold transition-colors ${
            locale === siteLocale
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}
