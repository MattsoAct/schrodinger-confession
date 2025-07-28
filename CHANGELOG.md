# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-28

### Added
- Footer에 사업자 정보 통합 표시 (대표자, 개인정보관리책임자, 사업자등록번호, 주소)
- Confess 페이지에 인증 상태 확인 및 자동 리다이렉트 기능
- Settings 페이지에 인증 상태 실시간 감지 기능
- Payment 페이지에 올바른 SchRo 이미지 import 및 표시

### Changed
- Hero Section 패딩 최적화 (데스크톱: 2rem → 1rem, 모바일: 1.5rem → 0.5rem)
- Hero Section 높이 조정 (80vh → 70vh, 모바일: 60vh)
- Footer 저작권 정보를 사업자 정보 박스로 통합
- "SchRo 프리미엄 편지" → "슈로의 비밀 편지" 브랜딩 통일
- Home 페이지 브랜딩 일관성 개선 ("SchRo 양자편지함" → "슈로의 양자편지함")
- "슈로의 약속" 섹션 이미지를 `image_schro_inboxlooking.png`로 변경

### Fixed
- 결제 페이지에서 SchRo 로고 이미지 경로 오류 수정 (`/src/assets/schro_letter.png` → proper import)
- 로그인 없이 편지 작성 페이지 접근 시 리다이렉트 누락 문제 해결
- Settings 페이지에서 인증 실패 시 에러 메시지 대신 로그인 페이지로 리다이렉트

### Removed
- Confess 페이지 연락처 입력 필드에서 카카오톡ID placeholder 제거

### Security
- 인증되지 않은 사용자의 편지 작성 페이지 접근 완전 차단
- 실시간 인증 상태 변경 감지로 보안 강화

---

## [1.0.0] - 2025-01-26

### Added
- 초기 프로젝트 구조 및 기본 기능 구현
- React 기반 슈로의 양자편지함 서비스
- 토스페이먼츠 결제 시스템 연동
- Supabase 인증 및 데이터베이스 연동
- SchRo 캐릭터 기반 UI/UX 디자인 시스템
- 편지 작성, 전송, 확인 기능
- 반응형 웹 디자인 (모바일, 태블릿, 데스크톱)