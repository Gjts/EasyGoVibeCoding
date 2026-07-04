import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import {
  escapeHtml,
  normalizeText,
} from "@/lib/feedback-consent"

const RESEND_API_KEY = process.env.RESEND_API_KEY
let resend: Resend | null = null
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    if (!resend) {
      console.error("Missing RESEND_API_KEY, email service is not configured.")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    const { name, email, message, allowPublicDisplay } = await request.json()
    const normalizedName = normalizeText(name, 80)
    const normalizedEmail = normalizeText(email, 160).toLowerCase()
    const normalizedMessage = normalizeText(message, 2000)

    // Validate input
    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const publicDisplayStatus:
      | "not_requested"
      | "owner_review_required" = allowPublicDisplay
      ? "owner_review_required"
      : "not_requested"

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "EasyGoVibeCoding Contact <onboarding@resend.dev>",
      to: ["1301385382gjts@gmail.com"],
      replyTo: normalizedEmail,
      subject: `[EasyGoVibeCoding] New message from ${normalizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            EasyGoVibeCoding 新消息
          </h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>姓名 / Name:</strong> ${escapeHtml(normalizedName)}</p>
            <p><strong>邮箱 / Email:</strong> ${escapeHtml(normalizedEmail)}</p>
            <p><strong>允许脱敏后公开展示 / Public display allowed:</strong> ${allowPublicDisplay ? "是 / Yes" : "否 / No"}</p>
            <p><strong>公开展示状态 / Public display status:</strong> ${
              allowPublicDisplay
                ? "等待站长邮箱审核；Cloudflare Pages Function 会生成公开展示审核链接 / Waiting for owner review"
                : "未请求公开展示 / Not requested"
            }</p>
            <p><strong>消息 / Message:</strong></p>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4;">${escapeHtml(normalizedMessage)}</p>
          </div>
          <p style="color: #71717a; font-size: 12px;">
            This message was sent from EasyGoVibeCoding contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data, publicDisplayStatus })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
