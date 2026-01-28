"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, BookOpen, Layers, Code, Users, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchItem {
  title: string
  description: string
  href: string
  category: string
  icon: React.ReactNode
  gradient: string
  keywords?: string[]
}

const searchData: SearchItem[] = [
  // 基础篇
  { title: "基础篇", description: "零基础入门 AI 编程", href: "/basics", category: "课程", icon: <BookOpen className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400" },
  { title: "AI 觉醒", description: "理解 AI 编程的本质", href: "/basics/awakening", category: "基础篇", icon: <Sparkles className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["AI", "编程", "觉醒", "本质"] },
  { title: "思维转变", description: "从传统编程到 AI 编程", href: "/basics/mindset", category: "基础篇", icon: <Sparkles className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["思维", "产品经理", "转变"] },
  { title: "核心原则", description: "AI 编程的核心原则 LLM 机制", href: "/basics/principles", category: "基础篇", icon: <Sparkles className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["原则", "LLM", "机制", "Transformer"] },
  { title: "必备技能", description: "AI 编程必备技能", href: "/basics/skills", category: "基础篇", icon: <Sparkles className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["技能", "精进"] },
  { title: "工具选择", description: "Cursor Windsurf Copilot 快速上手", href: "/basics/tools", category: "基础篇", icon: <Code className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["工具", "Cursor", "Windsurf", "Copilot", "GitHub", "IDE"] },
  { title: "实践指南", description: "从 0 到 1 实战项目", href: "/basics/practice", category: "基础篇", icon: <Sparkles className="h-4 w-4" />, gradient: "from-blue-400 to-cyan-400", keywords: ["实践", "实战", "项目"] },
  
  // 进阶篇
  { title: "进阶篇", description: "从工具到架构", href: "/advanced", category: "课程", icon: <Layers className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "开发环境", description: "搭建高效开发环境", href: "/advanced/environment", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "开发基础", description: "掌握开发基础知识", href: "/advanced/dev-basics", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "AI 使用指南", description: "深度使用 AI 工具", href: "/advanced/ai-guide", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "PRD 编写", description: "编写高质量 PRD", href: "/advanced/prd", category: "进阶篇", icon: <FileText className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "UI 设计", description: "AI 辅助 UI 设计", href: "/advanced/ui", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "数据处理", description: "数据处理与管理", href: "/advanced/data", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "测试", description: "AI 辅助测试", href: "/advanced/testing", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "部署", description: "应用部署与运维", href: "/advanced/deployment", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "AI Native 模式", description: "AI Native 架构模式", href: "/advanced/ai-native-patterns", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  { title: "AI 架构模式", description: "AI 架构设计模式", href: "/advanced/ai-architecture-patterns", category: "进阶篇", icon: <Code className="h-4 w-4" />, gradient: "from-emerald-400 to-green-400" },
  
  // 架构篇
  { title: "架构篇", description: "AI 大模型架构解析", href: "/architecture", category: "课程", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "Transformer 核心", description: "Transformer 架构核心", href: "/architecture/transformer-core", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "Transformer 详解", description: "Transformer 架构详解", href: "/architecture/transformer", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "Transformer 局限", description: "Transformer 的局限性", href: "/architecture/transformer-limits", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "MoE 架构", description: "混合专家模型", href: "/architecture/moe", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "Mamba 架构", description: "状态空间模型", href: "/architecture/mamba", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "RAG 架构", description: "检索增强生成", href: "/architecture/rag", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "架构对比", description: "各架构对比分析", href: "/architecture/comparison", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "新兴架构", description: "新兴架构探索", href: "/architecture/emerging", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  { title: "未来展望", description: "AI 架构未来展望", href: "/architecture/future", category: "架构篇", icon: <Layers className="h-4 w-4" />, gradient: "from-indigo-400 to-purple-400" },
  
  // 工具篇
  { title: "工具篇", description: "AI 编程工具深度解析", href: "/tools", category: "课程", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["工具", "AI", "编程"] },
  { title: "IDE 工具", description: "Cursor Windsurf Copilot Kiro Zed", href: "/tools/ide", category: "工具篇", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["IDE", "Cursor", "Windsurf", "Copilot", "GitHub", "Kiro", "Zed"] },
  { title: "网页编辑工具", description: "v0 bolt.new lovable 快速原型", href: "/tools/web", category: "工具篇", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["网页", "v0", "bolt", "lovable", "原型"] },
  { title: "命令行工具", description: "Claude Code Continue Goose Fabric", href: "/tools/cli", category: "工具篇", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["命令行", "Claude", "Continue", "Goose", "Fabric", "CLI"] },
  { title: "工具选择指南", description: "如何选择合适的 AI 工具", href: "/tools/selection", category: "工具篇", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["选择", "对比", "评测"] },
  { title: "模型选择", description: "GPT Claude Gemini 模型对比", href: "/tools/selection", category: "工具篇", icon: <Code className="h-4 w-4" />, gradient: "from-orange-400 to-amber-400", keywords: ["模型", "GPT", "Claude", "Gemini", "ChatGPT", "GPT-4", "GPT-5", "Opus", "Sonnet", "Kimi"] },
  
  // 实践篇
  { title: "实践篇", description: "项目实战", href: "/practice", category: "课程", icon: <Code className="h-4 w-4" />, gradient: "from-red-400 to-rose-400" },
  { title: "工程化实践", description: "AI 工程化实践", href: "/practice/engineering", category: "实践篇", icon: <Code className="h-4 w-4" />, gradient: "from-red-400 to-rose-400", keywords: ["工程化", "最佳实践"] },
  { title: "效率提升", description: "提升开发效率", href: "/practice/efficiency", category: "实践篇", icon: <Code className="h-4 w-4" />, gradient: "from-red-400 to-rose-400", keywords: ["效率", "提升", "优化"] },
  { title: "Agent 实践", description: "AI Agent 实践", href: "/practice/agent", category: "实践篇", icon: <Code className="h-4 w-4" />, gradient: "from-red-400 to-rose-400", keywords: ["Agent", "智能体", "自动化"] },
  
  // 团队篇
  { title: "团队篇", description: "从零打造 AI 团队", href: "/team", category: "课程", icon: <Users className="h-4 w-4" />, gradient: "from-green-400 to-emerald-400", keywords: ["团队", "协作", "管理"] },
  
  // 其他
  { title: "首页", description: "EasyGoVibeCoding 首页", href: "/", category: "导航", icon: <BookOpen className="h-4 w-4" />, gradient: "from-purple-400 to-pink-400" },
  { title: "生态导航", description: "AI 编程生态导航", href: "/ecosystem", category: "导航", icon: <Layers className="h-4 w-4" />, gradient: "from-purple-400 to-pink-400" },
  { title: "资源", description: "学习资源", href: "/resources", category: "导航", icon: <FileText className="h-4 w-4" />, gradient: "from-purple-400 to-pink-400" },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredResults = query
    ? searchData.filter(
        (item) => {
          const lowerQuery = query.toLowerCase()
          return (
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery) ||
            (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))
          )
        }
      )
    : searchData

  const handleSelect = useCallback(
    (href: string) => {
      onOpenChange(false)
      router.push(href)
      setQuery("")
      setSelectedIndex(0)
    },
    [onOpenChange, router]
  )

  useEffect(() => {
    if (!open) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length)
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault()
        handleSelect(filteredResults[selectedIndex].href)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, filteredResults, selectedIndex, handleSelect])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
        <DialogHeader className="px-4 pt-4 pb-0 sr-only">
          <DialogTitle>搜索</DialogTitle>
          <DialogDescription>搜索课程、文档和资源</DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center border-b-2 border-gray-200 dark:border-gray-700 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索课程、文档和资源..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent shadow-none px-0"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded-md bg-gray-100 dark:bg-gray-800 px-2 font-mono text-xs text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
            ESC
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">未找到相关结果</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">试试其他关键词</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className={cn(
                    "w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200",
                    index === selectedIndex
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-sm"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-sm",
                    `${item.gradient}`
                  )}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {item.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t-2 border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="h-5 px-1.5 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 font-mono">↑</kbd>
                <kbd className="h-5 px-1.5 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 font-mono">↓</kbd>
                <span className="ml-1">导航</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="h-5 px-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 font-mono">Enter</kbd>
                <span className="ml-1">选择</span>
              </div>
            </div>
            <span>{filteredResults.length} 个结果</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
