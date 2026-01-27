import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

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

    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "EasyGoVibeCoding Contact <onboarding@resend.dev>",
      to: ["1301385382gjts@gmail.com"],
      replyTo: email,
      subject: `[EasyGoVibeCoding] New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            EasyGoVibeCoding 新消息
          </h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>姓名 / Name:</strong> ${name}</p>
            <p><strong>邮箱 / Email:</strong> ${email}</p>
            <p><strong>消息 / Message:</strong></p>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4;">${message}</p>
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

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
