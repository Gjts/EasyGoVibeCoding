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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full bg-primary text-primary-foreground shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-card border-r border-border pt-16 transition-transform duration-300 lg:translate-x-0 lg:static lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full overflow-y-auto p-6">
            {/* Course title */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
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
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-xs font-medium">
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
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="border-b border-border bg-card/50">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">
                  首页
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/${pathname.split("/")[1]}`} className="hover:text-foreground transition-colors">
                  {title}
                </Link>
                {currentChapter && (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground">{currentChapter}</span>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-4xl px-6 py-12">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
