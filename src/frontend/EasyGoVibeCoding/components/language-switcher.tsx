"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  localizedAcademyHref,
  siteLocale,
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
  const [locationSuffix, setLocationSuffix] = useState({ search: "", hash: "" })

  useEffect(() => {
    const syncLocationSuffix = () => {
      const nextSuffix = {
        search: window.location.search,
        hash: window.location.hash,
      }
      setLocationSuffix((current) =>
        current.search === nextSuffix.search && current.hash === nextSuffix.hash
          ? current
          : nextSuffix,
      )
    }

    syncLocationSuffix()
    window.addEventListener("hashchange", syncLocationSuffix)
    window.addEventListener("popstate", syncLocationSuffix)
    return () => {
      window.removeEventListener("hashchange", syncLocationSuffix)
      window.removeEventListener("popstate", syncLocationSuffix)
    }
  }, [pathname])

  return (
    <nav
      aria-label="Language"
      className={`flex flex-wrap items-center gap-1 ${className}`}
    >
      {languageOptions.map(({ locale, label }) => (
        <a
          key={locale}
          href={localizedAcademyHref(
            locale,
            pathname,
            locationSuffix.search,
            locationSuffix.hash,
          )}
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
