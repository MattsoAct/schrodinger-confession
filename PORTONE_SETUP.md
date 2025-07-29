# 포트원(PortOne) V2 API 결제 시스템 설정 가이드

## 개요
토스페이먼츠에서 포트원 V2 API로 결제 시스템을 마이그레이션했습니다. 포트원 V2는 더 강력한 API와 다양한 결제 수단을 제공합니다.

## 1. 포트원 계정 설정

### 회원가입 및 상점 생성
1. [포트원 콘솔](https://console.portone.io) 접속
2. 회원가입 및 로그인
3. 새 상점 생성
4. 상점 정보 입력 및 인증

### API 키 발급
1. 콘솔 → 결제연동 → 연동 관리
2. **Store ID** 복사
3. **Channel Key** 복사

## 2. 환경 변수 설정

### .env 파일 수정
```bash
# 포트원 V2 API 설정
REACT_APP_PORTONE_API_SECRET=your_api_secret_here
REACT_APP_PORTONE_STORE_ID=your_store_id_here
REACT_APP_PORTONE_CHANNEL_KEY=your_channel_key_here
```

### Vercel 환경 변수 설정
1. Vercel Dashboard → Project → Settings → Environment Variables
2. 다음 변수들 추가:
   - `REACT_APP_PORTONE_API_SECRET`
   - `REACT_APP_PORTONE_STORE_ID`
   - `REACT_APP_PORTONE_CHANNEL_KEY`

## 3. 구현된 기능

### 결제 서비스 클래스
- `PortOnePaymentServiceV2.js`: 포트원 V2 API 결제 로직 구현
- CDN을 통한 SDK 동적 로드
- REST API를 통한 결제 상태 확인
- 카드, 계좌이체, 카카오페이 등 다양한 결제 수단 지원

### 결제 플로우
1. **결제 요청**: `Payment.js`에서 결제 정보 입력
2. **결제 진행**: 포트원 결제창으로 리다이렉트
3. **결제 완료**: `PaymentSuccess.js`에서 결과 처리
4. **결제 실패**: `PaymentFail.js`에서 오류 처리

### 고객 정보 연동
- 편지 데이터에서 발신자/수신자 정보 자동 추출
- 이메일/전화번호 정보를 결제 시 고객 정보로 활용

## 4. 포트원 vs 토스페이먼츠 차이점

| 항목 | 토스페이먼츠 | 포트원 |
|------|-------------|--------|
| SDK | `@tosspayments/payment-sdk` | `@portone/browser-sdk` |
| 결제 ID | `paymentKey` | `paymentId` |
| 초기화 | `loadTossPayments()` | 불필요 |
| 결제 요청 | `.requestPayment()` | `PortOne.requestPayment()` |
| 결제 승인 | 수동 승인 필요 | 자동 승인 |

## 5. 마이그레이션된 파일들

### 수정된 파일
- `src/presentation/pages/Payment.js`
- `src/presentation/pages/PaymentSuccess.js`
- `package.json` (의존성 변경)
- `.env` (환경 변수 변경)

### 새로 생성된 파일
- `src/infrastructure/api/PortOnePaymentService.js`

### 백업된 파일
- `src/infrastructure/api/TossPaymentService.js.backup`

## 6. 테스트 방법

### 로컬 테스트
1. 환경 변수 설정 확인
2. `npm start`로 개발 서버 실행
3. 편지 작성 → 프리미엄 편지 선택 → 결제 테스트

### 개발자 모드
- localhost에서는 "결제 스킵" 버튼 제공
- 실제 결제 없이 기능 테스트 가능

## 7. 운영 환경 배포

### 체크리스트
- [ ] 포트원 실제 API 키로 교체
- [ ] Vercel 환경 변수 설정
- [ ] 결제 테스트 완료
- [ ] 웹훅 URL 설정 (선택사항)

### 보안 주의사항
- API 키는 절대 public 저장소에 커밋하지 않기
- 프로덕션 환경에서는 HTTPS 필수
- 결제 금액 검증 로직 강화

## 8. 추가 기능 (향후 개발)

### 웹훅 처리
```javascript
// Express.js 예제
app.post('/api/portone/webhook', (req, res) => {
  const { paymentId, status } = req.body;
  // 결제 상태 업데이트 로직
  res.status(200).send('OK');
});
```

### 결제 취소/환불
```javascript
const cancelResult = await paymentService.cancelPayment(paymentId, '사용자 요청');
```

## 9. 문제 해결

### 자주 발생하는 오류

**"Store ID가 올바르지 않습니다"**
- 환경 변수 설정 확인
- 포트원 콘솔에서 Store ID 재확인

**"결제창이 열리지 않습니다"**
- 브라우저 팝업 차단 설정 확인
- HTTPS 환경에서 테스트

**"결제 완료 후 리다이렉트 실패"**
- redirectUrl 설정 확인
- URL 파라미터 형식 검증

## 10. 지원 및 문의

- 포트원 개발자 센터: https://developers.portone.io
- 포트원 고객지원: https://portone.io/support
- 프로젝트 이슈: GitHub Issues

---

**마이그레이션 완료 날짜**: 2025-01-29  
**마이그레이션 담당**: Claude Code Assistant  
**테스트 상태**: 로컬 테스트 완료, 프로덕션 배포 대기