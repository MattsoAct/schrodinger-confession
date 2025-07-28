# CoolSMS 설정 가이드

## 📱 CoolSMS SMS 서비스 연동 가이드

SchRo 편지 서비스에서 SMS 알림 기능을 위한 CoolSMS 설정 방법입니다.

## 🚀 1단계: CoolSMS 계정 생성

1. **CoolSMS 웹사이트 접속**
   - https://coolsms.co.kr 접속
   - 회원가입 진행

2. **발신번호 등록**
   - 대시보드 → 설정 → 발신번호 관리
   - 본인 휴대폰 번호 추가 및 인증
   - SMS 인증 완료

3. **무료 크레딧 확인**
   - 신규 가입 시 2,000원 무료 크레딧 제공
   - SMS 약 130건 정도 발송 가능

## 🔑 2단계: API 키 발급

1. **API 키 생성**
   - 대시보드 → 설정 → API Key 관리
   - "새 API Key 만들기" 클릭
   - API Key와 API Secret 복사

2. **권한 설정**
   - SMS 발송 권한 체크
   - 필요시 다른 권한도 추가

## ⚙️ 3단계: 환경 변수 설정

### 로컬 환경 (.env 파일)
```bash
# CoolSMS 문자 서비스 설정
COOLSMS_API_KEY=your_coolsms_api_key_here
COOLSMS_API_SECRET=your_coolsms_api_secret_here
COOLSMS_FROM_NUMBER=01012345678  # 등록한 발신번호
```

### Supabase Secrets 설정
1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Environment Variables 설정**
   - Settings → Environment Variables
   - 다음 Secrets 추가:
     - `COOLSMS_API_KEY`: CoolSMS API 키
     - `COOLSMS_API_SECRET`: CoolSMS API Secret
     - `COOLSMS_FROM_NUMBER`: 등록된 발신번호 (예: 01012345678)

## 🚀 4단계: Edge Function 배포

### Supabase Dashboard에서 수동 배포 (권장)

1. **send-sms-notification Function 생성**
   - Edge Functions → Create Function
   - Function name: `send-sms-notification`
   - 코드 복사/붙여넣기 (`supabase/functions/send-sms-notification/index.ts`)

2. **배포 완료**
   - Deploy 클릭
   - 배포 성공 확인

## 📱 5단계: SMS 발송 테스트

### 테스트 방법
1. **편지 작성 페이지**에서 "SMS" 옵션 선택
2. **받는 분 연락처**에 휴대폰 번호 입력 (예: 01012345678)
3. **결제 완료** 후 자동으로 SMS 발송

### 직접 API 테스트
```javascript
const response = await fetch(`${SUPABASE_URL}/functions/v1/send-sms-notification`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    receiver_phone: "01012345678",
    receiver_name: "테스트",
    letter_id: "test-123",
    hint: "테스트 힌트"
  })
})
```

## 💰 요금 정보

### CoolSMS 요금표
- **SMS (90바이트 이하)**: 건당 15원
- **LMS (긴 문자)**: 건당 35원
- **무료 크레딧**: 신규 가입 시 2,000원

### SchRo 서비스 요금
- **SMS 편지**: 5,000원 (SMS 발송비 포함)
- **이메일 편지**: 1,000원

## 🔧 문제 해결

### 자주 발생하는 오류

1. **"SMS service configuration error"**
   - Supabase Secrets에 CoolSMS 설정이 올바르게 입력되었는지 확인
   - API 키와 Secret 재확인

2. **"Failed to send SMS"**
   - 발신번호가 CoolSMS에 등록되었는지 확인
   - 크레딧 잔액 확인
   - 수신번호 형식 확인 (01012345678)

3. **권한 오류**
   - CoolSMS API 키에 SMS 발송 권한이 있는지 확인

### 로그 확인
- Supabase Dashboard → Edge Functions → send-sms-notification → Logs

## 📞 고객 지원

- **CoolSMS 고객센터**: https://coolsms.co.kr/support
- **CoolSMS 개발 문서**: https://docs.coolsms.co.kr

---

## 🎯 배포 체크리스트

- [ ] CoolSMS 계정 생성 완료
- [ ] 발신번호 등록 및 인증 완료
- [ ] API 키/Secret 발급 완료
- [ ] Supabase Secrets 설정 완료
- [ ] Edge Function 배포 완료
- [ ] SMS 발송 테스트 완료
- [ ] 결제 플로우 테스트 완료

모든 항목이 완료되면 SMS 편지 서비스를 정식 운영할 수 있습니다! 🚀

---
*최종 업데이트: 2025-07-27*
*SMS 기능 추가로 더욱 풍성한 편지 서비스 제공*