"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Search, Monitor, Globe, Terminal, Cpu, ExternalLink, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "全部", icon: Compass, gradient: "from-pink-400 to-purple-400" },
  { id: "ide", name: "IDE 类", icon: Monitor, gradient: "from-blue-400 to-cyan-400" },
  { id: "web", name: "网页编辑", icon: Globe, gradient: "from-purple-400 to-pink-400" },
  { id: "cli", name: "命令行", icon: Terminal, gradient: "from-orange-400 to-amber-400" },
  { id: "model", name: "大模型", icon: Cpu, gradient: "from-green-400 to-emerald-400" },
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
              <Compass className="h-4 w-4" />
              生态导航
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI 编程工具生态全景
              </span>
            </h1>
            <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
              快速找到所需工具，了解生态全貌，发现新资源
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索工具..."
                className="pl-10 bg-white/80 backdrop-blur-md border-2 border-white/50 shadow-lg text-gray-900 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="h-4 w-4 text-gray-400 shrink-0" />
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "shrink-0 transition-all duration-200",
                      isActive 
                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg hover:shadow-xl`
                        : "bg-white/80 backdrop-blur-md border-2 border-white/50 text-gray-700 hover:bg-white"
                    )}
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
            {filteredTools.map((tool) => {
              const categoryGradient = categories.find(c => c.id === tool.category)?.gradient || "from-gray-400 to-gray-500"
              return (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200",
                    tool.url === "#" && "pointer-events-none opacity-70"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-md`}>
                        <span className="text-sm font-bold text-white">
                          {tool.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs text-gray-600 font-medium capitalize">
                          {categories.find(c => c.id === tool.category)?.name}
                        </span>
                      </div>
                    </div>
                    {tool.url !== "#" && (
                      <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{tool.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-lg bg-gradient-to-r ${categoryGradient} text-white text-xs font-semibold shadow-md`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>

          {/* Empty state */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 font-medium">没有找到匹配的工具</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
