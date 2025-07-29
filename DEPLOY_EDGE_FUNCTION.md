# Edge Function 배포 가이드

## 계정 삭제 Edge Function 배포 방법

### 1. Supabase CLI 설치
```bash
npm install -g supabase
```

### 2. Supabase 프로젝트 연결
```bash
# 프로젝트 루트에서 실행
supabase login
supabase link --project-ref [YOUR_PROJECT_REF]
```

프로젝트 REF는 Supabase Dashboard URL에서 확인:
`https://supabase.com/dashboard/project/[YOUR_PROJECT_REF]`

### 3. Edge Function 배포
```bash
# delete-user-account 함수 배포
supabase functions deploy delete-user-account
```

### 4. 환경 변수 확인
다음 환경 변수들이 자동으로 설정됩니다:
- `SUPABASE_URL`: 자동 설정됨
- `SUPABASE_SERVICE_ROLE_KEY`: 자동 설정됨 (admin 권한 필요)

### 5. 함수 테스트
```bash
# 로컬에서 테스트 (선택사항)
supabase start
supabase functions serve delete-user-account

# 실제 배포된 함수 테스트
curl -i --location --request POST 'https://[YOUR_PROJECT_REF].supabase.co/functions/v1/delete-user-account' \
  --header 'Authorization: Bearer [USER_JWT_TOKEN]' \
  --header 'Content-Type: application/json'
```

### 6. 배포 확인
- Supabase Dashboard → Edge Functions에서 함수 확인
- 로그에서 정상 작동 여부 확인

## 주의사항

⚠️ **중요**: 이 함수는 사용자 계정과 모든 관련 데이터를 완전히 삭제합니다.
- 편지 데이터 (confessions 테이블)
- 결제 내역 (payments 테이블)  
- 프로필 데이터 (profiles 테이블)
- 인증 계정 (auth.users)

복구가 불가능하므로 테스트 시 주의하세요.

## 오류 해결

### 1. "Function not found" 오류
```bash
# 함수가 제대로 배포되었는지 확인
supabase functions list
```

### 2. "Permission denied" 오류
- Service Role Key 권한 확인
- RLS 정책 확인

### 3. "Database connection" 오류
- Supabase 프로젝트 연결 상태 확인
- 환경 변수 설정 확인

## 사용법

웹 애플리케이션에서 다음과 같이 호출:

```javascript
const { data, error } = await supabase.functions.invoke('delete-user-account', {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
```

성공 시 사용자는 자동으로 로그아웃되고 모든 데이터가 삭제됩니다.