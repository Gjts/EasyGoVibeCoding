"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { ChevronRight, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Chapter {
  title: string
  href: string
  sections?: { title: string; href: string }[]
}

interface CourseLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  chapters: Chapter[]
  currentChapter?: string
}

export function CourseLayout({
  children,
  title,
  description,
  chapters,
  currentChapter,
}: CourseLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="flex pt-16">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-white/80 backdrop-blur-xl border-r-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] pt-16 transition-transform duration-300 lg:translate-x-0 lg:static lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full overflow-y-auto p-6">
            {/* Course title */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50 border-2 border-white/50">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-700 mt-1 font-medium">{description}</p>
            </div>

            {/* Chapters navigation */}
            <nav className="space-y-1">
              {chapters.map((chapter, index) => {
                const isActive = pathname === chapter.href || pathname.startsWith(chapter.href + "/")
                return (
                  <div key={chapter.title}>
                    <Link
                      href={chapter.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-purple-700 font-semibold shadow-md border-2 border-purple-300/50"
                          : "text-gray-700 hover:bg-white/60 hover:shadow-md border-2 border-transparent hover:border-pink-200/50"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg"
                          : "bg-white/80 border-2 border-gray-200 text-gray-600"
                      )}>
                        {index}
                      </span>
                      <span className="truncate">{chapter.title}</span>
                    </Link>
                    
                    {/* Sub-sections */}
                    {chapter.sections && isActive && (
                      <div className="ml-9 mt-1 space-y-1 border-l border-border pl-3">
                        {chapter.sections.map((section) => {
                          const isSectionActive = pathname === section.href
                          return (
                            <Link
                              key={section.title}
                              href={section.href}
                              className={cn(
                                "block rounded-md px-2 py-1.5 text-sm transition-colors",
                                isSectionActive
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              {section.title}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="border-b-2 border-white/50 bg-white/60 backdrop-blur-md">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <nav className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <Link href="/" className="hover:text-purple-600 transition-colors">
                  首页
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href={`/${pathname.split("/")[1]}`} className="hover:text-purple-600 transition-colors">
                  {title}
                </Link>
                {currentChapter && (
                  <>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">{currentChapter}</span>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="[&_h1]:!text-gray-900 [&_h2]:!text-gray-900 [&_h3]:!text-gray-900 [&_h4]:!text-gray-900 [&_h5]:!text-gray-900 [&_h6]:!text-gray-900 [&_p]:!text-gray-800 [&_li]:!text-gray-800 [&_span]:!text-gray-800 [&_div]:!text-gray-800 [&_strong]:!text-gray-900 [&_em]:!text-gray-800 [&_blockquote]:!text-gray-800 [&_code]:!text-gray-900 [&_pre]:!text-gray-900 [&_a]:text-purple-600 [&_a:hover]:text-purple-700 [&_.text-foreground]:!text-gray-900 [&_.text-muted-foreground]:!text-gray-700 [&_.text-primary]:text-purple-600 [&_.bg-card]:!bg-white/90 [&_.bg-card]:backdrop-blur-sm [&_.border-border]:!border-gray-200 [&_.prose]:[&_*]:!text-gray-800 [&_.prose]:[&_h1]:!text-gray-900 [&_.prose]:[&_h2]:!text-gray-900 [&_.prose]:[&_h3]:!text-gray-900">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
