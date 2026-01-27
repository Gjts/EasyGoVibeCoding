export const onRequestPost = async ({ request, env }: { request: Request; env: { RESEND_API_KEY?: string } }) => {
  try {
    const apiKey = env.RESEND_API_KEY

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY, email service is not configured.")
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "EasyGoVibeCoding Contact <onboarding@resend.dev>",
        to: ["1301385382gjts@gmail.com"],
        reply_to: email,
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
              This message was sent from EasyGoVibeCoding contact form (Cloudflare Pages Function).
            </p>
          </div>
        `,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error("Resend HTTP error:", resendResponse.status, errorText)
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const data = await resendResponse.json().catch(() => null)

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Pages Function API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
