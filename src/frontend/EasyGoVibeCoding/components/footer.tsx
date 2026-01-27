import Link from "next/link"

const navigation = {
  courses: [
    { name: "基础篇", href: "/basics", gradient: "from-blue-400 to-cyan-400" },
    { name: "进阶篇", href: "/advanced", gradient: "from-emerald-400 to-green-400" },
    { name: "工具篇", href: "/tools", gradient: "from-orange-400 to-amber-400" },
    { name: "架构篇", href: "/architecture", gradient: "from-indigo-400 to-purple-400" },
    { name: "实践篇", href: "/practice", gradient: "from-red-400 to-rose-400" },
    { name: "团队篇", href: "/team", gradient: "from-green-400 to-emerald-400" },
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
    <footer className="border-t-2 border-white/50 bg-white/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-gray-900">EasyGoVibeCoding</span>
            </div>
            <p className="text-sm text-gray-700 max-w-xs leading-relaxed font-medium">
              AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。
            </p>
            <p className="text-xs text-gray-600 font-medium">
              版本 v1.0 | 最后更新：2025-01-26
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">课程</h3>
              <ul className="space-y-3">
                {navigation.courses.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2 group"
                    >
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">资源</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">工具</h3>
              <ul className="space-y-3">
                {navigation.tools.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium"
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
        <div className="mt-12 border-t-2 border-white/50 pt-8">
          <p className="text-xs text-gray-600 text-center font-medium">
            &copy; {new Date().getFullYear()} EasyGoVibeCoding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
