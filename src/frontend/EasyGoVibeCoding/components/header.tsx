"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "首页", href: "/" },
  {
    name: "课程",
    href: "#",
    children: [
      { name: "基础篇", href: "/basics", description: "零基础入门 AI 编程" },
      { name: "进阶篇", href: "/advanced", description: "从工具到架构" },
      { name: "工具篇", href: "/tools", description: "AI 编程工具深度解析" },
      { name: "架构篇", href: "/architecture", description: "AI 大模型架构解析" },
      { name: "实践篇", href: "/practice", description: "项目实战" },
      { name: "团队篇", href: "/team", description: "从零打造 AI 团队" },
    ],
  },
  { name: "生态导航", href: "/ecosystem" },
  { name: "资源", href: "/resources" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-foreground">AI 编程培训</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">打开主菜单</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href} className="flex flex-col items-start gap-1 py-2">
                        <span className="font-medium">{child.name}</span>
                        <span className="text-xs text-muted-foreground">{child.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="sm">
            登录
          </Button>
          <Button size="sm">
            开始学习
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AI</span>
                </div>
                <span className="font-semibold text-foreground">AI 编程培训</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">关闭菜单</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.children ? (
                      <div key={item.name} className="space-y-2">
                        <span className="block px-3 py-2 text-base font-semibold text-foreground">
                          {item.name}
                        </span>
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
                <div className="py-6 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    登录
                  </Button>
                  <Button className="w-full">
                    开始学习
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
