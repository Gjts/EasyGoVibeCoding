"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface Chapter {
  title: string;
  href: string;
  sections?: { title: string; href: string }[];
}

interface CourseLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  chapters: Chapter[];
  currentChapter?: string;
}

export function CourseLayout({
  children,
  title,
  description,
  chapters,
  currentChapter,
}: CourseLayoutProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});

  const isChapterExpanded = (chapter: Chapter, isActive: boolean) => {
    if (!chapter.sections) return false;
    // 默认不展开；仅当用户手动展开，或当前路由属于该章节时自动展开
    return expandedChapters[chapter.href] ?? isActive;
  };

  const toggleChapter = (chapterHref: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterHref]: !prev[chapterHref],
    }));
  };

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
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-white/80 backdrop-blur-xl border-r-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] pt-16 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="h-full overflow-y-auto p-6 pb-24 lg:pb-6">
            {/* Course title */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50 border-2 border-white/50">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-700 mt-1 font-medium">
                {description}
              </p>
            </div>

            {/* Chapters navigation */}
            <nav className="space-y-1">
              {chapters.map((chapter, index) => {
                const hasActiveSection = chapter.sections?.some(
                  (section) =>
                    pathname === section.href ||
                    pathname.startsWith(section.href + "/"),
                );
                const isActive =
                  pathname === chapter.href ||
                  (!chapter.sections &&
                    pathname.startsWith(chapter.href + "/")) ||
                  Boolean(hasActiveSection);
                const isExpanded = isChapterExpanded(
                  chapter,
                  isActive,
                );
                return (
                  <div key={chapter.title}>
                    <div className="flex items-center gap-2">
                      <Link
                        href={chapter.href}
                        className={cn(
                          "flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-purple-700 font-semibold shadow-md border-2 border-purple-300/50"
                            : "text-gray-700 hover:bg-white/60 hover:shadow-md border-2 border-transparent hover:border-pink-200/50",
                        )}
                        onClick={() => {
                          if (isMobile) setSidebarOpen(false);
                        }}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg"
                              : "bg-white/80 border-2 border-gray-200 text-gray-600",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate">{chapter.title}</span>
                      </Link>
                      {chapter.sections && (
                        <button
                          type="button"
                          aria-label={
                            isExpanded
                              ? `收起${chapter.title}`
                              : `展开${chapter.title}`
                          }
                          aria-expanded={isExpanded}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-transparent text-gray-500 transition-all duration-200 hover:border-pink-200/50 hover:bg-white/60 hover:text-purple-600"
                          onClick={() => toggleChapter(chapter.href)}
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              isExpanded ? "rotate-180" : "rotate-0",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {/* Sub-sections */}
                    {chapter.sections && isExpanded && (
                      <div className="ml-9 mt-1 space-y-1 border-l border-border pl-3">
                        {chapter.sections.map((section) => {
                          const isSectionActive =
                            pathname === section.href ||
                            pathname.startsWith(section.href + "/");
                          return (
                            <Link
                              key={section.title}
                              href={section.href}
                              className={cn(
                                "block rounded-md px-2 py-1.5 text-sm transition-colors",
                                isSectionActive
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                              onClick={() => {
                                if (isMobile) setSidebarOpen(false);
                              }}
                            >
                              {section.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
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
                <Link
                  href="/"
                  className="hover:text-purple-600 transition-colors"
                >
                  首页
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link
                  href={`/${pathname.split("/")[1]}`}
                  className="hover:text-purple-600 transition-colors"
                >
                  {title}
                </Link>
                {currentChapter && (
                  <>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold">
                      {currentChapter}
                    </span>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="[&_h1]:!text-gray-900 [&_h2]:!text-gray-900 [&_h3]:!text-gray-900 [&_h4]:!text-gray-900 [&_h5]:!text-gray-900 [&_h6]:!text-gray-900 [&_p]:!text-gray-800 [&_li]:!text-gray-800 [&_strong]:!text-gray-900 [&_em]:!text-gray-800 [&_blockquote]:!text-gray-800 [&_a]:text-purple-600 [&_a:hover]:text-purple-700 [&_.text-foreground]:!text-gray-900 [&_.text-muted-foreground]:!text-gray-700 [&_.text-primary]:text-purple-600 [&_.bg-card]:!bg-white/90 [&_.bg-card]:backdrop-blur-sm [&_.border-border]:!border-gray-200 [&_.prose_h1]:!text-gray-900 [&_.prose_h2]:!text-gray-900 [&_.prose_h3]:!text-gray-900 [&_.prose_p]:!text-gray-800 [&_.prose_li]:!text-gray-800 [&_pre]:!text-slate-100 [&_pre_code]:!text-inherit [&_pre_span]:!text-inherit [&_:not(pre)>code]:!text-purple-700 [&_:not(pre)>code]:!bg-purple-50 [&_:not(pre)>code]:!px-1.5 [&_:not(pre)>code]:!py-0.5 [&_:not(pre)>code]:!rounded">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
