"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchDialog } from "@/components/search-dialog"

interface CourseLink {
  name: string
  href: string
  description: string
  gradient: string
}

interface CourseGroup {
  title: string
  subtitle: string
  accent: string
  courses: CourseLink[]
}

const courseGroups: CourseGroup[] = [
  {
    title: "入门线",
    subtitle: "从零基础到掌握主流工具",
    accent: "from-blue-500 via-cyan-500 to-teal-500",
    courses: [
      { name: "基础篇", href: "/basics", description: "零基础入门 AI 编程", gradient: "from-blue-400 to-cyan-400" },
      { name: "工具篇", href: "/tools", description: "Cursor · Claude Code · MCP", gradient: "from-orange-400 to-amber-400" },
      { name: "进阶篇", href: "/advanced", description: "从工具到架构思维", gradient: "from-purple-400 to-pink-400" },
    ],
  },
  {
    title: "工程线",
    subtitle: "理解原理，落地项目",
    accent: "from-indigo-500 via-purple-500 to-pink-500",
    courses: [
      { name: "架构篇", href: "/architecture", description: "Transformer · Mamba · MoE · RAG", gradient: "from-indigo-400 to-purple-400" },
      { name: "实践篇", href: "/practice", description: "真实项目实战与案例", gradient: "from-red-400 to-rose-400" },
    ],
  },
  {
    title: "规模化线",
    subtitle: "把能力产品化与商业化",
    accent: "from-emerald-500 via-teal-500 to-violet-500",
    courses: [
      { name: "团队篇", href: "/team", description: "从零打造 AI 团队", gradient: "from-green-400 to-emerald-400" },
      { name: "超级个体篇", href: "/super-individual", description: "把个人能力产品化与规模化", gradient: "from-violet-400 to-fuchsia-400" },
    ],
  },
]

const simpleLinks = [
  { name: "首页", href: "/" },
  { name: "生态导航", href: "/ecosystem" },
  { name: "GitHub 热门项目", href: "/github-hot" },
  { name: "资源", href: "/resources" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-white/50 shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-200">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">EasyGoVibeCoding</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">打开主菜单</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-6">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
          >
            首页
          </Link>

          {/* 课程 mega menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50">
              课程
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-[720px] bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] rounded-2xl p-4"
            >
              <div className="grid grid-cols-3 gap-4">
                {courseGroups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-3 border-b border-gray-100 pb-2">
                      <div
                        className={`bg-gradient-to-r ${group.accent} bg-clip-text text-sm font-extrabold text-transparent`}
                      >
                        {group.title}
                      </div>
                      <div className="text-[11px] font-medium text-gray-500">
                        {group.subtitle}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {group.courses.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="group/item flex flex-col gap-0.5 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full bg-gradient-to-r ${child.gradient} transition-transform group-hover/item:scale-125`}
                            />
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-purple-600">
                              {child.name}
                            </span>
                          </div>
                          <span className="ml-4 text-xs leading-5 text-gray-600">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 其他顶级入口（除首页外，首页已在最前） */}
          {simpleLinks
            .filter((l) => l.href !== "/")
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                {link.name}
              </Link>
            ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-semibold gap-2"
          >
            <Search className="h-4 w-4" />
            <span>搜索</span>
            <kbd className="hidden xl:inline-flex h-5 items-center gap-0.5 rounded bg-gray-100 px-1.5 font-mono text-xs text-gray-600 border border-gray-300">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-semibold"
          >
            登录
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            <Link href="/basics">
              开始学习
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-xl px-6 py-6 sm:max-w-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] border-l-2 border-white/50">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="font-bold text-gray-900">EasyGoVibeCoding</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-xl p-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">关闭菜单</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-3 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-xl px-3 py-2.5 text-base font-bold text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    首页
                  </Link>

                  {/* 课程三线分组（mobile） */}
                  <div>
                    <span className="block px-3 py-1 text-base font-bold text-gray-900">
                      课程
                    </span>
                    {courseGroups.map((group) => (
                      <div key={group.title} className="mt-2">
                        <div
                          className={`px-3 text-xs font-bold bg-gradient-to-r ${group.accent} bg-clip-text text-transparent`}
                        >
                          {group.title} · {group.subtitle}
                        </div>
                        <div className="mt-1 space-y-1 pl-2">
                          {group.courses.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${child.gradient}`}
                                />
                                {child.name}
                                <span className="ml-auto text-[11px] text-gray-500">
                                  {child.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 其他顶级入口 */}
                  {simpleLinks
                    .filter((l) => l.href !== "/")
                    .map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="-mx-3 block rounded-xl px-3 py-2.5 text-base font-bold text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                </div>
                <div className="py-6 space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setSearchOpen(true)
                    }}
                    className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-semibold gap-2"
                  >
                    <Search className="h-4 w-4" />
                    搜索
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-semibold"
                  >
                    登录
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg font-semibold"
                  >
                    <Link href="/basics" onClick={() => setMobileMenuOpen(false)}>
                      开始学习
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
