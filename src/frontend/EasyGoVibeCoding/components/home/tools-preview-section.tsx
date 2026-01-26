import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

const tools = [
  {
    category: "IDE 类工具",
    items: [
      { name: "Cursor", description: "AI-first IDE，Skill/Agent/MCP 支持" },
      { name: "Windsurf", description: "Fast Context，1M Token 上下文" },
      { name: "GitHub Copilot", description: "代码补全，团队协作" },
    ],
  },
  {
    category: "网页编辑类",
    items: [
      { name: "v0", description: "自然语言生成 UI，Figma 集成" },
      { name: "bolt.new", description: "浏览器内全栈开发" },
      { name: "Lovable", description: "聊天界面生成 Web 应用" },
    ],
  },
  {
    category: "命令行类",
    items: [
      { name: "Claude Code", description: "终端集成，MCP 配置" },
      { name: "Continue.dev", description: "多模型支持，企业自部署" },
      { name: "Fabric", description: "Patterns 系统，工作流自动化" },
    ],
  },
]

export function ToolsPreviewSection() {
  return (
    <section className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            覆盖主流 AI 编程工具
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            IDE、网页编辑、命令行三大类工具深度解析
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tools.map((category) => (
            <div key={category.category} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((tool) => (
                  <div
                    key={tool.name}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-foreground">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{tool.name}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/ecosystem">
              探索完整工具生态
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
