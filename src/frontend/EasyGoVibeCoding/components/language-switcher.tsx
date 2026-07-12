"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Check, ChevronDown, Globe2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  localizedAcademyHref,
  siteLocale,
  type SiteLocale,
} from "@/lib/i18n-routing"

const languageOptions: { locale: SiteLocale; label: string }[] = [
  { locale: "zh-CN", label: String.fromCodePoint(0x7b80, 0x4f53, 0x4e2d, 0x6587) },
  { locale: "ja", label: String.fromCodePoint(0x65e5, 0x672c, 0x8a9e) },
  { locale: "en", label: "English" },
  { locale: "fr", label: "Français" },
  { locale: "de", label: "Deutsch" },
]

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/"
  const [locationSuffix, setLocationSuffix] = useState({ search: "", hash: "" })
  const currentLanguage =
    languageOptions.find(({ locale }) => locale === siteLocale) ?? languageOptions[0]

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
    <nav aria-label="Language" className={`flex shrink-0 items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={currentLanguage.label}
          className="inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-2.5 text-sm font-semibold text-gray-700 outline-none transition-colors hover:bg-purple-50 hover:text-purple-600 focus-visible:ring-2 focus-visible:ring-purple-500 data-[state=open]:bg-purple-50 data-[state=open]:text-purple-600"
        >
          <Globe2 className="h-4 w-4" aria-hidden="true" />
          <span translate="no" lang={currentLanguage.locale}>
            {currentLanguage.label}
          </span>
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 rounded-xl border border-purple-100 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
        >
          {languageOptions.map(({ locale, label }) => {
            const isCurrent = locale === siteLocale
            return (
              <DropdownMenuItem key={locale} asChild>
                <a
                  href={localizedAcademyHref(
                    locale,
                    pathname,
                    locationSuffix.search,
                    locationSuffix.hash,
                  )}
                  hrefLang={locale}
                  lang={locale}
                  translate="no"
                  aria-current={isCurrent ? "page" : undefined}
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 outline-none transition-colors focus:bg-purple-50 focus:text-purple-700"
                >
                  <span>{label}</span>
                  {isCurrent ? (
                    <Check className="ml-auto h-4 w-4 text-purple-600" aria-hidden="true" />
                  ) : null}
                </a>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
