"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchDialog } from "@/components/search-dialog"

const navigation = [
  { name: "首页", href: "/" },
  {
    name: "课程",
    href: "#",
    children: [
      { name: "基础篇", href: "/basics", description: "零基础入门 AI 编程", gradient: "from-blue-400 to-cyan-400" },
      { name: "进阶篇", href: "/advanced", description: "从工具到架构", gradient: "from-emerald-400 to-green-400" },
      { name: "工具篇", href: "/tools", description: "AI 编程工具深度解析", gradient: "from-orange-400 to-amber-400" },
      { name: "架构篇", href: "/architecture", description: "AI 大模型架构解析", gradient: "from-indigo-400 to-purple-400" },
      { name: "实践篇", href: "/practice", description: "项目实战", gradient: "from-red-400 to-rose-400" },
      { name: "团队篇", href: "/team", description: "从零打造 AI 团队", gradient: "from-green-400 to-emerald-400" },
    ],
  },
  { name: "生态导航", href: "/ecosystem" },
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
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] rounded-2xl p-2">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link 
                        href={child.href} 
                        className="flex flex-col items-start gap-1 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${child.gradient} group-hover:scale-125 transition-transform`} />
                          <span className="font-semibold text-gray-900 group-hover:text-purple-600">{child.name}</span>
                        </div>
                        <span className="text-xs text-gray-600 ml-4">{child.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                {item.name}
              </Link>
            )
          )}
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
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.children ? (
                      <div key={item.name} className="space-y-2">
                        <span className="block px-3 py-2 text-base font-bold text-gray-900">
                          {item.name}
                        </span>
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${child.gradient}`} />
                                {child.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-xl px-3 py-2.5 text-base font-bold text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
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
