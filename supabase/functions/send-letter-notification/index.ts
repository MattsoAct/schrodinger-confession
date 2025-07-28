// SchRo 편지 알림 전송 Edge Function
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

interface LetterData {
  receiver_email: string
  receiver_name: string
  letter_id: string
  hint?: string
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

console.log("SchRo Letter Notification Function loaded!")

Deno.serve(async (req) => {
  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { receiver_email, receiver_name, letter_id, hint }: LetterData = await req.json()

    // 입력 값 검증
    if (!receiver_email || !receiver_name || !letter_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // 편지 확인 링크 생성
    const letterUrl = `${req.headers.get('origin') || 'https://schro-confession.vercel.app'}/check/${letter_id}`

    // 이메일 HTML 템플릿
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>📧 SchRo에서 편지가 도착했어요!</title>
          <style>
            body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; margin: 0; padding: 0; background: #FDF6E3; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #E67E22, #F39C12); padding: 2rem; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 1.8rem; font-weight: 700; }
            .content { padding: 2rem; }
            .letter-icon { font-size: 4rem; margin: 1rem 0; }
            .message { font-size: 1.1rem; line-height: 1.6; color: #2C3E50; margin: 1.5rem 0; }
            .hint-box { background: #FFF8DC; border-left: 4px solid #E67E22; padding: 1rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #E67E22, #F39C12); color: white; padding: 1rem 2rem; border-radius: 25px; text-decoration: none; font-weight: 700; margin: 1.5rem 0; transition: transform 0.3s ease; }
            .cta-button:hover { transform: translateY(-2px); }
            .footer { background: #F8F9FA; padding: 1.5rem; text-align: center; color: #6C757D; font-size: 0.9rem; }
            .warning { background: #FFF3CD; border: 1px solid #FFEAA7; border-radius: 8px; padding: 1rem; margin: 1.5rem 0; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="letter-icon">📮</div>
              <h1>슈뢰딩거의 편지가 도착했어요!</h1>
              <p>양자역학의 신비로운 편지를 받으셨습니다</p>
            </div>
            
            <div class="content">
              <p class="message">
                안녕하세요 <strong>${receiver_name}</strong>님! 🐱<br><br>
                
                슈뢰딩거의 고양이 <strong>슈로</strong>가 특별한 편지를 배달해왔어요.<br>
                이 편지는 양자역학의 원리에 따라 <strong>"중첩 상태"</strong>에 있습니다.
              </p>

              ${hint ? `
                <div class="hint-box">
                  <strong>💡 힌트:</strong> ${hint}
                </div>
              ` : ''}

              <div class="warning">
                <strong>⚠️ 중요한 양자 법칙</strong><br>
                편지를 열려면 <strong>보낸 사람의 이름을 정확히 맞혀야 해요!</strong><br>
                틀리면 편지는 영원히 양자 상태로 남게 됩니다. 🌌
              </div>

              <div style="text-align: center;">
                <a href="${letterUrl}" class="cta-button">
                  🔬 편지 관측하기 (열어보기)
                </a>
              </div>

              <p style="text-align: center; color: #6C757D; font-size: 0.9rem;">
                편지는 <strong>단 한 번의 관측 기회</strong>만 주어집니다.<br>
                신중하게 생각해보시고 관측해주세요! ✨
              </p>
            </div>

            <div class="footer">
              <p>이 편지는 <strong>SchRo 편지 서비스</strong>에서 발송되었습니다.</p>
              <p>양자역학의 마법으로 안전하게 전달되었어요 🔐</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Resend API로 이메일 전송
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SchRo 우체부 🐱 <onboarding@resend.dev>',
        to: [receiver_email],
        subject: `📧 ${receiver_name}님, SchRo에서 신비한 편지가 도착했어요!`,
        html: emailHtml,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Failed to send email: ${emailResponse.status}`)
    }

    const result = await emailResponse.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Letter notification sent successfully',
        email_id: result.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error('Error in send-letter-notification function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  }
})