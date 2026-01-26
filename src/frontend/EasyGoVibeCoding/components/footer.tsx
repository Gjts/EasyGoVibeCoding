import Link from "next/link"

const navigation = {
  courses: [
    { name: "基础篇", href: "/basics" },
    { name: "进阶篇", href: "/advanced" },
    { name: "工具篇", href: "/tools" },
    { name: "架构篇", href: "/architecture" },
    { name: "实践篇", href: "/practice" },
    { name: "团队篇", href: "/team" },
  ],
  resources: [
    { name: "生态导航", href: "/ecosystem" },
    { name: "优质资源", href: "/resources" },
    { name: "更新日志", href: "#" },
    { name: "关于我们", href: "#" },
  ],
  tools: [
    { name: "Cursor", href: "#" },
    { name: "GitHub Copilot", href: "#" },
    { name: "Claude Code", href: "#" },
    { name: "Fabric", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold text-foreground">AI 编程培训</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。
            </p>
            <p className="text-xs text-muted-foreground">
              版本 v1.0 | 最后更新：2025-01-26
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">课程</h3>
              <ul className="mt-4 space-y-3">
                {navigation.courses.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">资源</h3>
              <ul className="mt-4 space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">工具</h3>
              <ul className="mt-4 space-y-3">
                {navigation.tools.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} AI 编程培训平台. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
