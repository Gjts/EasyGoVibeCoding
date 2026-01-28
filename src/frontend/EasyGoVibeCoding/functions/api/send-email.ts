export const onRequestPost = async ({ request, env }: { request: Request; env: { RESEND_API_KEY?: string } }) => {
  try {
    // 添加 CORS 头部支持
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    // 处理 OPTIONS 预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      })
    }

    const apiKey = env.RESEND_API_KEY

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY, email service is not configured.")
      console.error("Available env keys:", Object.keys(env))
      return new Response(
        JSON.stringify({ 
          error: "Email service is not configured",
          details: "RESEND_API_KEY environment variable is missing. Please configure it in Cloudflare Pages settings."
        }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }

    const { name, email, message } = body

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          details: `Missing: ${!name ? "name " : ""}${!email ? "email " : ""}${!message ? "message" : ""}`.trim()
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }

    console.log(`Attempting to send email from ${email} (${name})`)

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
      
      let errorDetails = "Failed to send email"
      try {
        const errorJson = JSON.parse(errorText)
        errorDetails = errorJson.message || errorText
      } catch {
        errorDetails = errorText || `HTTP ${resendResponse.status}`
      }

      return new Response(
        JSON.stringify({ 
          error: "Failed to send email",
          details: errorDetails,
          status: resendResponse.status
        }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }

    const data = await resendResponse.json().catch(() => null)
    console.log("Email sent successfully:", data?.id)

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    )
  } catch (error) {
    console.error("Pages Function API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: errorMessage,
        ...(errorStack && { stack: errorStack })
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
  }
}
