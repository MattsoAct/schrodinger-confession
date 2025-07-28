# SchRo 이메일 알림 서비스 설정 가이드

## 1. Resend 계정 설정
1. [resend.com](https://resend.com) 방문하여 무료 계정 생성
2. Dashboard에서 "API Keys" 메뉴로 이동
3. "Create API Key" 클릭하여 새 API 키 생성
4. 생성된 API 키 복사 (re_로 시작하는 키)

## 2. 환경 변수 설정
### 로컬 개발환경
`.env` 파일에 다음 줄의 주석을 해제하고 실제 API 키 입력:
```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### Supabase Edge Function 배포용
```bash
# Supabase CLI로 secret 설정
npx supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

## 3. Edge Function 배포
```bash
# 함수 배포
npx supabase functions deploy send-letter-notification

# 권한 설정 (인증 없이 호출 가능하도록)
npx supabase functions invoke send-letter-notification --verify-jwt false
```

## 4. 도메인 설정 (선택사항)
더 전문적인 이메일을 위해 커스텀 도메인 설정:

### Resend에서 도메인 추가
1. Resend Dashboard > Domains
2. "Add Domain" 클릭
3. 소유하고 있는 도메인 입력 (예: schro-letters.com)
4. DNS 설정에 제공된 레코드 추가

### 이메일 주소 변경
`supabase/functions/send-letter-notification/index.ts`에서:
```typescript
from: 'SchRo 우체부 🐱 <noreply@your-domain.com>'
```

## 5. 테스트
### 로컬 테스트
```bash
# Supabase 로컬 서버 시작
npx supabase start

# Edge Function 테스트
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-letter-notification' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --header 'Content-Type: application/json' \
  --data '{
    "receiver_email": "test@example.com",
    "receiver_name": "테스트",
    "letter_id": "123",
    "hint": "테스트 힌트"
  }'
```

### 프로덕션 테스트
실제 편지 작성 → 결제 → 이메일 수신 확인

## 6. 모니터링
- Supabase Dashboard > Edge Functions에서 로그 확인
- Resend Dashboard에서 이메일 전송 통계 확인

## 비용 정보
- **Resend**: 월 3,000건 무료, 초과 시 건당 $0.0001
- **Supabase Edge Functions**: 월 50만 호출 무료
- **예상 비용**: 월 100건 기준 완전 무료

## 주의사항
- API 키는 절대 public 저장소에 커밋하지 말 것
- 실제 서비스 시 스팸 방지를 위한 rate limiting 추가 권장
- 이메일 템플릿의 링크는 실제 도메인으로 수정 필요

## 문제해결
### 이메일이 스팸함에 들어가는 경우
1. SPF, DKIM, DMARC 레코드 설정
2. 발신자 평판 관리
3. 이메일 내용 스팸 키워드 제거

### Edge Function 배포 실패
1. Supabase CLI 최신 버전 확인
2. Supabase 프로젝트 연결 상태 확인
3. 환경 변수 설정 확인