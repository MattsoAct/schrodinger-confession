# Supabase 결제 시스템 설정 가이드

## 1. Supabase 콘솔 접속

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. `schrodinger-confession` 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭

## 2. 데이터베이스 테이블 생성

아래 SQL 스크립트를 SQL Editor에 복사하고 실행하세요:

### 전체 실행 스크립트

```sql
-- 결제 정보를 저장할 테이블 생성
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  payment_key TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  user_id UUID REFERENCES auth.users(id),
  letter_id BIGINT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_payments_payment_key ON payments(payment_key);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 결제 정보만 조회 가능
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- 인증된 사용자는 결제 정보 생성 가능
CREATE POLICY "Authenticated users can create payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- updated_at 자동 업데이트를 위한 함수 및 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();

-- 결제 상태 enum 제약조건
ALTER TABLE payments ADD CONSTRAINT check_payment_status 
  CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded'));

-- 편지와 결제 연결을 위한 confessions 테이블 업데이트
-- 기존 confessions 테이블에 payment_id 컬럼 추가
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS payment_id BIGINT REFERENCES payments(id);

-- confessions 테이블에 letter_type 컬럼 추가 (아직 없다면)
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS letter_type TEXT DEFAULT 'basic';

-- confessions 테이블에 letter_type 제약조건 추가
ALTER TABLE confessions ADD CONSTRAINT IF NOT EXISTS check_letter_type 
  CHECK (letter_type IN ('basic', 'premium'));

-- confessions 테이블에 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_confessions_payment_id ON confessions(payment_id);
CREATE INDEX IF NOT EXISTS idx_confessions_letter_type ON confessions(letter_type);
```

## 3. 실행 방법

1. SQL Editor에서 **New query** 버튼 클릭
2. 위의 전체 스크립트를 복사하여 붙여넣기
3. **Run** 버튼 클릭 (또는 Ctrl+Enter)

## 4. 실행 확인

실행 후 아래 사항들을 확인하세요:

### 테이블 생성 확인
```sql
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('payments', 'confessions')
ORDER BY table_name, ordinal_position;
```

### RLS 정책 확인
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'payments';
```

## 5. 오류 해결

### 자주 발생하는 오류들:

**1. confessions 테이블이 없는 경우:**
```sql
-- confessions 테이블이 없다면 먼저 생성
CREATE TABLE confessions (
  id BIGSERIAL PRIMARY KEY,
  sender_name TEXT NOT NULL,
  receiver_name TEXT NOT NULL,
  receiver_contact TEXT NOT NULL,
  message TEXT NOT NULL,
  hint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**2. 제약조건 중복 오류:**
- `IF NOT EXISTS` 구문을 사용했으므로 여러 번 실행해도 안전합니다.

**3. 권한 오류:**
- 프로젝트 소유자 계정으로 로그인했는지 확인하세요.

## 6. 다음 단계

데이터베이스 설정이 완료되면:

1. 애플리케이션에서 결제 테스트 진행
2. 결제 데이터가 올바르게 저장되는지 확인
3. 편지와 결제 정보 연동 테스트

---

**⚠️ 주의사항:**
- 이 스크립트는 기존 데이터를 변경하지 않습니다 (`IF NOT EXISTS` 사용)
- 운영 환경에서는 백업 후 실행하는 것을 권장합니다
- RLS 정책이 활성화되어 보안이 강화됩니다