// SchRo 편지 SMS 알림 전송 Edge Function
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

interface SMSData {
  receiver_phone: string
  receiver_name: string
  letter_id: string
  hint?: string
}

const COOLSMS_API_KEY = Deno.env.get('COOLSMS_API_KEY')
const COOLSMS_API_SECRET = Deno.env.get('COOLSMS_API_SECRET')
const COOLSMS_FROM_NUMBER = Deno.env.get('COOLSMS_FROM_NUMBER')

console.log("SchRo SMS Notification Function loaded!")

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
    const { receiver_phone, receiver_name, letter_id, hint }: SMSData = await req.json()

    // 입력 값 검증
    if (!receiver_phone || !receiver_name || !letter_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    if (!COOLSMS_API_KEY || !COOLSMS_API_SECRET || !COOLSMS_FROM_NUMBER) {
      console.error('CoolSMS configuration not found')
      return new Response(
        JSON.stringify({ error: 'SMS service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // 편지 확인 링크 생성
    const letterUrl = `${req.headers.get('origin') || 'https://schrodinger-confession.vercel.app'}/check/${letter_id}`

    // SMS 메시지 템플릿
    const smsMessage = `📮 ${receiver_name}님, SchRo에서 신비한 편지가 도착했어요!

🐱 슈뢰딩거의 고양이 슈로가 특별한 편지를 배달해왔습니다.

${hint ? `💡 힌트: ${hint}` : ''}

⚠️ 중요: 보낸 사람의 이름을 맞혀야만 편지를 열 수 있어요!

🔬 편지 관측하기: ${letterUrl}

- SchRo 편지 서비스`

    // CoolSMS API 호출을 위한 인증 정보
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const salt = Math.random().toString(36).substr(2, 10)
    
    // HMAC-SHA256 서명 생성을 위한 문자열
    const stringToSign = timestamp + salt
    
    // HMAC-SHA256 서명 생성 (Web Crypto API 사용)
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(COOLSMS_API_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(stringToSign)
    )
    
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // CoolSMS API 요청 데이터
    const smsData = {
      message: {
        to: receiver_phone,
        from: COOLSMS_FROM_NUMBER,
        text: smsMessage,
        type: 'SMS',
        autoTypeDetect: true
      }
    }

    // CoolSMS API 호출
    const smsResponse = await fetch('https://api.coolsms.co.kr/messages/v4/send', {
      method: 'POST',
      headers: {
        'Authorization': `HMAC-SHA256 apiKey=${COOLSMS_API_KEY}, date=${timestamp}, salt=${salt}, signature=${signatureHex}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsData),
    })

    if (!smsResponse.ok) {
      const errorText = await smsResponse.text()
      console.error('CoolSMS API error:', errorText)
      throw new Error(`Failed to send SMS: ${smsResponse.status}`)
    }

    const result = await smsResponse.json()
    console.log('SMS sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS notification sent successfully',
        sms_id: result.groupId 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error('Error in send-sms-notification function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send SMS notification',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  }
})