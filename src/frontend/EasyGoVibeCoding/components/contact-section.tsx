"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Github, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "此字段为必填项"
    }
    if (!formState.email.trim()) {
      newErrors.email = "此字段为必填项"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }
    if (!formState.message.trim()) {
      newErrors.message = "此字段为必填项"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus("sending")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setStatus("success")
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Email send error:", error)
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden" aria-labelledby="contact-heading">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>
      
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-purple-200 shadow-lg mb-4">
            <Mail className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">联系我</span>
          </div>
          <h2 id="contact-heading" className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              与我取得联系
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            有任何问题、合作意向或技术咨询？欢迎随时联系我，我会尽快回复。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="relative rounded-3xl p-8 bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">联系方式</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                无论是技术问题、项目合作还是职业机会，都欢迎与我交流。
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:1301385382gjts@gmail.com"
                  onMouseEnter={() => setIsHovered('email')}
                  onMouseLeave={() => setIsHovered(null)}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200/50 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-600 mb-1">电子邮箱</p>
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">1301385382gjts@gmail.com</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://github.com/Gjts/CSharpDesignPattern"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovered('github')}
                  onMouseLeave={() => setIsHovered(null)}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200/50 hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      <Github className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-600 mb-1">GitHub</p>
                    <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">hardybao</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-green-600 font-bold">通常在 24 小时内回复</span>
                  <span className="ml-2">⚡</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative rounded-3xl p-8 bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">发送消息</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="请输入您的姓名"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="请输入您的邮箱"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">留言</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="请输入您的留言内容..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    发送消息
                  </>
                )}
              </Button>

              {status === "success" && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500" role="alert">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-green-700">发送成功！</p>
                    <p className="text-sm text-green-600">我会尽快回复您。</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500" role="alert">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-xl bg-red-500 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-red-700">发送失败</p>
                    <p className="text-sm text-red-600">请稍后重试或直接发送邮件联系我。</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
