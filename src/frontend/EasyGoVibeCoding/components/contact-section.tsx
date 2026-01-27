"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Github, Send, CheckCircle, AlertCircle } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

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
    <section id="contact" className="relative py-24 px-4" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary mb-4">
            <Mail className="h-4 w-4" />
            <span>联系我</span>
          </div>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            与我取得联系
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            有任何问题、合作意向或技术咨询？欢迎随时联系我，我会尽快回复。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
              <h3 className="text-xl font-semibold mb-4">联系方式</h3>
              <p className="text-muted-foreground mb-6">
                无论是技术问题、项目合作还是职业机会，都欢迎与我交流。
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:1301385382gjts@gmail.com"
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">电子邮箱</p>
                    <p className="font-medium text-foreground">1301385382gjts@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/Gjts/CSharpDesignPattern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <p className="font-medium text-foreground">hardybao</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">通常在 24 小时内回复</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
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

              <Button type="submit" className="w-full gap-2" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    发送消息
                  </>
                )}
              </Button>

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-500 rounded-lg" role="alert">
                  <CheckCircle className="h-5 w-5" />
                  消息发送成功！我会尽快回复您。
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg" role="alert">
                  <AlertCircle className="h-5 w-5" />
                  发送失败，请稍后重试或直接发送邮件联系我。
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
