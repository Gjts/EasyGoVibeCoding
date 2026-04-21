"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { recordVisit } from "@/lib/learning-progress"

/**
 * 全局学习进度追踪器：
 * - 监听路由变化，将课程类路径写入 localStorage
 * - 不发送任何网络请求，纯前端、无 PII
 * - 渲染为空节点，可安全放入 <body> 任何位置
 */
export function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    recordVisit(pathname)
  }, [pathname])

  return null
}
