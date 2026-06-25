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
    allowPublicDisplay: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState(
    "我会尽快阅读并回复。",
  )

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
    setErrorMessage("")
    setSuccessMessage("我会尽快阅读并回复。")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const responseData = await response.json().catch(() => null)

      if (!response.ok) {
        // 尝试解析服务器返回的错误信息
        const errorMsg = responseData?.error || "发送失败"
        const errorDetails = responseData?.details || ""
        const fullErrorMsg = errorDetails ? `${errorMsg}: ${errorDetails}` : errorMsg
        
        console.error("Email send error:", {
          status: response.status,
          error: errorMsg,
          details: errorDetails,
          fullResponse: responseData
        })
        
        setErrorMessage(fullErrorMsg)
        setStatus("error")
        return
      }

      const publicDisplayStatus = responseData?.publicDisplayStatus
      setSuccessMessage(
        formState.allowPublicDisplay &&
          publicDisplayStatus === "confirmation_required"
          ? "请查收确认邮件，点击确认链接后才会进入网站滚动展示。"
          : "我会尽快阅读并回复。",
      )
      setStatus("success")
      setFormState({
        name: "",
        email: "",
        message: "",
        allowPublicDisplay: false,
      })
      setErrorMessage("")
    } catch (error) {
      console.error("Email send error:", error)
      const errorMsg = error instanceof Error ? error.message : "网络错误，请检查网络连接后重试"
      setErrorMessage(errorMsg)
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

  const handlePublicDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      allowPublicDisplay: e.target.checked,
    }))
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
            <span className="text-sm font-semibold text-purple-600">邮箱反馈</span>
          </div>
          <h2 id="contact-heading" className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              把你的反馈发给我
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            你可以告诉我哪里看不懂、想补哪些案例、当前学习卡在哪里。我会优先根据真实反馈调整内容。
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
                反馈会直接发到我的邮箱。只有在你明确授权后，我才会把反馈整理成公开案例或页面展示内容。
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:1301385382gjts@gmail.com"
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
                  <span className="ml-2">，复杂建议会进入后续迭代清单</span>
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
              <h3 className="text-2xl font-bold text-gray-900">发送反馈</h3>
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
                  placeholder="请输入你的称呼"
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
                  placeholder="请输入你的邮箱，方便我回复"
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
                  placeholder="例如：你的角色、正在学习哪一部分、哪里不清楚、希望增加什么案例..."
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

              <label className="flex items-start gap-3 rounded-2xl border-2 border-blue-100 bg-blue-50/70 p-4">
                <input
                  type="checkbox"
                  checked={formState.allowPublicDisplay}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                  onChange={handlePublicDisplayChange}
                />
                <span className="text-sm leading-6 text-gray-700">
                  允许我将这条反馈脱敏后滚动展示在网站上。提交后会向该邮箱发送确认链接，点击确认后才会公开；不会公开邮箱。
                </span>
              </label>

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
                    发送反馈
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
                    <p className="text-sm text-green-600">{successMessage}</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500" role="alert">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-xl bg-red-500 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-700 mb-1">发送失败</p>
                    {errorMessage ? (
                      <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
                    ) : null}
                    <p className="text-sm text-red-600">
                      请稍后重试或直接发送邮件至{" "}
                      <a href="mailto:1301385382gjts@gmail.com" className="underline font-semibold">
                        1301385382gjts@gmail.com
                      </a>
                    </p>
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
