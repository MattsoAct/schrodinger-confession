# SchRo 고백편지 서비스 - 개발 진행 상황

## 프로젝트 개요
**schrodinger-confession**: React 기반의 SchRo(고양이 캐릭터) 테마 비밀편지 전달 서비스
- 사용자가 익명으로 편지를 보내고, 받는 사람이 보낸 사람의 이름을 맞춰야만 편지를 열람할 수 있는 서비스
- SchRo 우체부 고양이 캐릭터를 활용한 따뜻하고 친근한 브랜딩
- **배포 URL**: https://schrodinger-confession.vercel.app

## 🚀 최신 완료 작업 (2025-01-29) - 포트원 V2 API 마이그레이션

### ✅ 토스페이먼츠 → 포트원 V2 완전 마이그레이션 완료

1. **포트원 V2 API 결제 서비스 구현**
   - `PortOnePaymentServiceV2.js` 새로 생성
   - CDN 방식으로 포트원 SDK 동적 로딩 구현
   - REST API를 통한 결제 상태 확인 로직
   - 고객 정보 자동 추출 및 전달

2. **환경 변수 포트원 V2로 전환**
   - `REACT_APP_PORTONE_API_SECRET`: QiCrz1DRaTMHN5kN37tphXINaHUSVI7lIf7uOdJenDKYeZCkqkGEJmaNQFtwiPyMPZb7ZMZ1IDNedjm9
   - `REACT_APP_PORTONE_STORE_ID`: store-196b8657-5a55-42d0-8e6b-e0d6f9679b04 ✅
   - `REACT_APP_PORTONE_CHANNEL_KEY`: **대기 중** (PG사 계약 후 발급)

3. **결제 페이지 포트원 V2 대응**
   - `Payment.js` 업데이트: 포트원 V2 서비스 사용
   - `PaymentSuccess.js` 완전 재작성: payment_key → payment_id 변경
   - 포트원 V2 결제 상태값 대응 (pending, paid, failed 등)

4. **데이터베이스 스키마 포트원 V2 대응**
   - `payments_portone_v2_update.sql` 생성 ✅
   - payment_key → payment_id 컬럼명 변경
   - store_id, channel_key, customer_* 필드 추가
   - payment_webhooks 테이블 추가 (웹훅 처리용)
   - 포트원 V2 결제 상태 제약조건 업데이트

### ✅ UX 디자인 개선 완료
1. **헤더 가시성 문제 해결**
   - `header-footer-schro.css`, `auth-schro.css`에서 undefined CSS 변수들을 실제 색상값으로 수정
   - 흰색 배경에 흰색 텍스트로 보이지 않던 헤더 버튼들 가시성 개선

2. **입력 필드 가시성 개선**
   - 모든 페이지의 form 입력 상자들이 투명/흰색으로 보이지 않던 문제 해결
   - `warm-theme.css`, `auth-schro.css`, `check-schro.css`, `confess-schro.css` 등에서 배경 불투명도 증가 및 테두리 추가

3. **페이지 디자인 통일화**
   - `/check` 페이지: 기존 warm-theme에서 SchRo 브랜딩으로 완전 재디자인
   - `/check/test` 페이지: SchRo 테마 일관성 유지하며 디자인 개선
   - 두 페이지 모두 스크롤 길이 단축으로 사용성 향상

4. **입력 박스 깨짐 수정**
   - `/check/test` 페이지의 `.schro-check-name-input` 클래스 완전한 CSS 속성 추가
   - 너비, 패딩, 테두리, 박스 사이징 등 필수 스타일 보완

5. **시각적 장식 요소 추가**
   - **공통**: 부유하는 SVG 아이콘, 회전/펄스 애니메이션
   - **CheckInput.js (/check)**: 하트, 별, 우체통, 검색 아이콘 등
   - **Check.js (/check/test)**: 자물쇠, 편지지, 축하/위로 이모지 등
   - 모든 애니메이션은 모바일 반응형 최적화 완료

## 파일 구조 및 주요 컴포넌트

### 페이지 컴포넌트
```
src/pages/
├── CheckInput.js      # /check - 편지 링크/코드 입력 페이지
├── Check.js          # /check/test 또는 /check/:id - 편지 확인 페이지
├── Confess.js        # / - 편지 작성 메인 페이지 (편지 유형 선택 포함)
├── Payment.js        # /payment - 결제 페이지
├── PaymentSuccess.js # /payment/success - 결제 성공 페이지
├── PaymentFail.js    # /payment/fail - 결제 실패 페이지
└── Auth.js           # 인증 관련 페이지
```

### 스타일 시스템
```
src/styles/
├── schro-mailcat-system.css    # 메인 디자인 시스템 (CSS 변수, 공통 스타일)
├── check-input-schro.css       # CheckInput 페이지 전용 스타일
├── check-schro.css             # Check 페이지 전용 스타일  
├── confess-schro.css           # Confess 페이지 전용 스타일 (편지 유형 선택 UI 포함)
├── header-footer-schro.css     # 헤더/푸터 공통 스타일
├── auth-schro.css             # 인증 페이지 스타일
├── payment-schro.css          # 결제 페이지 스타일
└── payment-result-schro.css   # 결제 결과 페이지 스타일
```

### 에셋
```
src/assets/
├── schro_design.png           # 기본 SchRo 캐릭터
├── letter_in_mouth.png        # 편지를 물고 있는 SchRo
├── schro_letter.png          # 편지를 든 SchRo
└── letter.png                # 편지 아이콘
```

## 기술 스택
- **Frontend**: React 18, React Router v6
- **Backend**: Supabase (PostgreSQL)
- **Payment**: 토스페이먼츠 (@tosspayments/payment-sdk)
- **Icons**: React Icons (FA, HI)
- **Styling**: Pure CSS with CSS Variables

## 🔄 현재 진행 상황 및 다음 단계

### ⏳ 현재 대기 중인 작업 (PG사 계약 필요)

**포트원 콘솔에서 진행해야 할 작업:**
1. **PG사 테스트 연동 추가**
   - 포트원 콘솔 → 결제연동 → 연동 관리
   - "새 연동 추가" → PG사: "포트원 테스트" 선택
   - 결제수단: 카드, 계좌이체, 카카오페이 활성화
   - **테스트 채널키 발급** 대기

2. **채널키 받은 후 즉시 진행할 작업**
   - `.env` 파일의 `REACT_APP_PORTONE_CHANNEL_KEY` 업데이트
   - Vercel 환경 변수 3개 모두 업데이트
   - Supabase SQL Editor에서 `payments_portone_v2_update.sql` 실행
   - 로컬 환경에서 포트원 V2 결제 플로우 테스트

### 🚀 채널키 발급 후 즉시 진행 가능한 작업들

1. **포트원 V2 결제 시스템 완성**
   - 포트원 테스트 환경에서 결제 플로우 전체 테스트
   - 결제 성공/실패/취소 시나리오 검증
   - 개발자 결제 스킵 모드와 실제 결제 모드 비교 테스트

2. **결제 장벽 낮추기 위한 UX 개선**
   - **편지 미리보기/체험 페이지 구현 필요** 📝
   - 사용자가 편지를 보내기 전에 받는 사람이 어떤 형식으로 문자/이메일을 받는지 미리 체험
   - 실제 알림 메시지 포맷과 편지 확인 플로우를 데모로 보여주는 페이지
   - 결제 전 "이런 식으로 전달됩니다" 미리보기로 구매 전환율 향상

3. **편지 미리보기/체험 기능 상세 기획**
   - `/preview` 또는 `/demo` 페이지 생성
   - **이메일 알림 미리보기**: 실제 이메일 템플릿 시뮬레이션
   - **SMS 알림 미리보기**: 실제 문자 메시지 포맷 시뮬레이션  
   - **편지 확인 플로우 데모**: 힌트 입력 → 이름 맞추기 → 편지 열람 전체 과정
   - **"체험해보기" 버튼**: 메인 페이지 및 결제 페이지에 배치
   - **결제 전환 최적화**: "이런 특별한 경험을 선물하세요" 문구와 함께 배치

4. **성능 최적화**
   - 이미지 최적화 (WebP 변환, 압축)
   - CSS 애니메이션 성능 개선
   - React 컴포넌트 메모이제이션

5. **사용성 개선**
   - 로딩 상태 개선 (스켈레톤 UI)
   - 에러 처리 개선 (사용자 친화적 메시지)
   - 접근성(A11y) 개선 (키보드 네비게이션, 스크린 리더)

6. **기능 확장**
   - 편지 만료 시간 설정
   - 편지 삭제/수정 기능
   - 통계 대시보드 (보낸/받은 편지 수)
   - 프리미엄 편지 전용 특수 기능 (특별한 애니메이션, 고급 템플릿)

7. **모바일 최적화**
   - PWA 설정 (manifest.json, service worker)
   - 터치 제스처 최적화
   - 모바일 전용 UI 패턴 적용

### 🔧 기술적 개선사항

1. **코드 품질**
   - TypeScript 도입 고려
   - ESLint/Prettier 설정 강화
   - 컴포넌트 단위 테스트 추가

2. **보안 강화**
   - Rate limiting 구현
   - XSS 방지 강화
   - 민감 정보 로깅 방지

3. **배포 최적화**
   - Build 최적화
   - CDN 설정
   - 환경별 설정 분리

## 개발 명령어
```bash
npm start          # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
npm run lint       # 린트 검사 (설정 필요시)
```

## 주의사항
- 모든 새로운 컴포넌트는 SchRo 디자인 시스템 준수
- CSS 변수(`--schro-orange`, `--letter-cream` 등) 사용 권장
- 모바일 반응형 필수 (`@media (max-width: 768px)`, `@media (max-width: 480px)`)
- 애니메이션은 `prefers-reduced-motion` 고려
- Supabase 연동 시 에러 처리 필수
- **결제 관련 보안**: 실제 운영 시 환경 변수 보안 강화 필수
- **결제 테스트**: 토스페이먼츠 테스트 키로만 테스트 진행

## 결제 시스템 설정 가이드

### 1. Supabase 설정
```sql
-- database/payments.sql 파일을 Supabase SQL Editor에서 실행
```

### 2. 환경 변수 설정
```bash
# .env 파일
REACT_APP_TOSS_CLIENT_KEY=test_ck_ma60RZblrqDe8rjvMRvmgX0lzW6Y  # 테스트용
REACT_APP_TOSS_SECRET_KEY=test_sk_ma60RZblrqDe8rjvMRvmN5P1nO7v   # 테스트용
```

### 3. 결제 플로우
1. 사용자가 프리미엄 편지 선택
2. 편지 데이터를 세션스토리지에 임시 저장
3. 토스페이먼츠 결제 페이지로 이동
4. 결제 완료 후 편지 자동 저장
5. 결제 정보 데이터베이스 저장

## 🏁 포트원 V2 마이그레이션 체크리스트

### ✅ 완료된 작업
- [x] 포트원 V2 결제 서비스 클래스 구현
- [x] 환경 변수를 포트원 V2로 전환 (Store ID 실제 값으로 업데이트)
- [x] Payment.js, PaymentSuccess.js 포트원 V2 대응
- [x] 데이터베이스 스키마 업데이트 SQL 준비
- [x] Supabase Authentication URL을 프로덕션으로 변경
- [x] 포트원 설정 가이드 문서 작성 (PORTONE_SETUP.md)

### ⏳ 대기 중인 작업 (PG 계약 필요)
- [ ] 포트원 콘솔에서 테스트 PG 연동 추가
- [ ] 테스트 채널키 발급 받기
- [ ] 채널키로 환경 변수 업데이트
- [ ] Vercel 환경 변수 업데이트 (3개 모두)
- [ ] Supabase에서 payments_portone_v2_update.sql 실행
- [ ] 포트원 V2 결제 플로우 테스트
- [ ] 웹훅 URL 설정 (선택사항)

### 📋 다음 접속 시 진행할 작업 순서

1. **포트원 콘솔 채널키 확인**
   ```
   포트원 콘솔 → 결제연동 → 채널 관리
   → 테스트 채널키 복사
   ```

2. **환경 변수 업데이트**
   ```bash
   # .env 파일 업데이트
   REACT_APP_PORTONE_CHANNEL_KEY=[실제_채널키]
   
   # Vercel Dashboard에서도 동일하게 업데이트
   ```

3. **Supabase SQL 실행**
   ```sql
   -- Supabase SQL Editor에서 실행
   -- C:\Users\swjeo\schrodinger-confession\database\payments_portone_v2_update.sql
   ```

4. **결제 시스템 테스트**
   ```bash
   npm start
   # localhost:3000에서 프리미엄 편지 결제 테스트
   ```

---
*최종 업데이트: 2025-01-29*  
*포트원 V2 마이그레이션 95% 완료 - 채널키 발급만 남음*  
*다음 작업 시 이 문서의 "다음 접속 시 진행할 작업 순서" 섹션 참고*