"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Search, Monitor, Globe, Terminal, Cpu, ExternalLink, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "全部", icon: Compass },
  { id: "ide", name: "IDE 类", icon: Monitor },
  { id: "web", name: "网页编辑", icon: Globe },
  { id: "cli", name: "命令行", icon: Terminal },
  { id: "model", name: "大模型", icon: Cpu },
]

const tools = [
  // IDE Tools
  { name: "Cursor", category: "ide", description: "AI-first IDE，Skill/Agent/MCP 支持", tags: ["AI IDE", "Skill", "Agent"], url: "https://cursor.sh" },
  { name: "Windsurf", category: "ide", description: "Fast Context 技术，1M Token 上下文", tags: ["AI IDE", "大上下文"], url: "https://codeium.com/windsurf" },
  { name: "GitHub Copilot", category: "ide", description: "代码补全，团队协作", tags: ["代码补全", "VS Code"], url: "https://github.com/features/copilot" },
  { name: "Kiro", category: "ide", description: "AWS 出品，Steering Files", tags: ["AWS", "Steering"], url: "#" },
  { name: "Zed", category: "ide", description: "高性能编辑器 + AI 集成", tags: ["高性能", "Rust"], url: "https://zed.dev" },
  { name: "Continue.dev", category: "ide", description: "开源 AI 编程助手", tags: ["开源", "多模型"], url: "https://continue.dev" },
  
  // Web Tools
  { name: "v0", category: "web", description: "自然语言生成 UI，Figma 集成", tags: ["UI 生成", "Vercel"], url: "https://v0.dev" },
  { name: "bolt.new", category: "web", description: "浏览器内全栈开发", tags: ["全栈", "WebContainer"], url: "https://bolt.new" },
  { name: "Lovable", category: "web", description: "聊天界面生成 Web 应用", tags: ["对话式", "Web 应用"], url: "https://lovable.dev" },
  { name: "Replit Agent", category: "web", description: "全生命周期 AI 开发", tags: ["云 IDE", "部署"], url: "https://replit.com" },
  { name: "Same", category: "web", description: "UI 复制和代码生成", tags: ["UI 克隆", "快速"], url: "#" },
  
  // CLI Tools
  { name: "Claude Code", category: "cli", description: "终端集成 AI 助手，MCP 配置", tags: ["终端", "Anthropic"], url: "https://claude.ai" },
  { name: "Goose", category: "cli", description: "开源 AI 代理，命令行接口", tags: ["开源", "Agent"], url: "https://github.com/block/goose" },
  { name: "Fabric", category: "cli", description: "Patterns 系统，工作流自动化", tags: ["Patterns", "自动化"], url: "https://github.com/danielmiessler/fabric" },
  { name: "Aider", category: "cli", description: "AI pair programming in terminal", tags: ["终端", "Git"], url: "https://aider.chat" },
  
  // Models
  { name: "Claude", category: "model", description: "Anthropic 出品，长上下文，安全性高", tags: ["Anthropic", "长上下文"], url: "https://claude.ai" },
  { name: "GPT-4", category: "model", description: "OpenAI 最新模型，生态成熟", tags: ["OpenAI", "通用"], url: "https://openai.com" },
  { name: "Gemini", category: "model", description: "Google 多模态模型，搜索集成", tags: ["Google", "多模态"], url: "https://gemini.google.com" },
  { name: "DeepSeek", category: "model", description: "开源友好，成本低", tags: ["开源", "低成本"], url: "https://deepseek.com" },
  { name: "Llama", category: "model", description: "Meta 开源模型，本地部署", tags: ["Meta", "开源"], url: "https://llama.meta.com" },
]

export default function EcosystemPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <Compass className="h-4 w-4" />
              生态导航
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI 编程工具生态全景
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              快速找到所需工具，了解生态全貌，发现新资源
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索工具..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all",
                  tool.url === "#" && "pointer-events-none opacity-70"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-xs text-muted-foreground capitalize">
                        {categories.find(c => c.id === tool.category)?.name}
                      </span>
                    </div>
                  </div>
                  {tool.url !== "#" && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {/* Empty state */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">没有找到匹配的工具</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
