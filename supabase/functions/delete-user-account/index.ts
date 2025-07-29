import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Supabase 클라이언트 생성
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Authorization 헤더에서 JWT 토큰 추출
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')

    // 사용자 정보 확인
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: '인증되지 않은 사용자입니다.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`계정 삭제 시작: ${user.id} (${user.email})`)

    // 1. 사용자의 모든 편지 삭제
    const { error: confessionsError } = await supabaseClient
      .from('confessions')
      .delete()
      .eq('sender_email', user.email)

    if (confessionsError) {
      console.error('편지 삭제 오류:', confessionsError)
    } else {
      console.log('편지 데이터 삭제 완료')
    }

    // 2. 사용자의 모든 결제 내역 삭제
    const { error: paymentsError } = await supabaseClient
      .from('payments')
      .delete()
      .eq('user_id', user.id)

    if (paymentsError) {
      console.error('결제 내역 삭제 오류:', paymentsError)
    } else {
      console.log('결제 내역 삭제 완료')
    }

    // 3. 프로필 데이터 삭제 (만약 있다면)
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      console.error('프로필 삭제 오류:', profileError)
    } else {
      console.log('프로필 데이터 삭제 완료')
    }

    // 4. 인증 사용자 삭제 (Service Role Key 필요)
    const { error: deleteUserError } = await supabaseClient.auth.admin.deleteUser(user.id)

    if (deleteUserError) {
      console.error('사용자 계정 삭제 오류:', deleteUserError)
      return new Response(
        JSON.stringify({ 
          error: '계정 삭제 중 오류가 발생했습니다.',
          details: deleteUserError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`계정 삭제 완료: ${user.email}`)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: '계정이 성공적으로 삭제되었습니다.',
        deletedUserId: user.id
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('계정 삭제 중 예외 발생:', error)
    return new Response(
      JSON.stringify({ 
        error: '계정 삭제 중 오류가 발생했습니다.',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})