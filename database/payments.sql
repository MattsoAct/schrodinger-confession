-- 결제 정보를 저장할 테이블 생성
-- Supabase 콘솔의 SQL Editor에서 실행하세요

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

-- 관리자는 모든 결제 정보 조회 가능 (선택사항)
-- CREATE POLICY "Admins can view all payments" ON payments
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

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

-- 결제 상태 enum 제약조건 (선택사항)
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

COMMENT ON TABLE payments IS '토스페이먼츠 결제 정보 저장 테이블';
COMMENT ON COLUMN payments.payment_key IS '토스페이먼츠 결제 키';
COMMENT ON COLUMN payments.order_id IS '주문 번호';
COMMENT ON COLUMN payments.amount IS '결제 금액 (원)';
COMMENT ON COLUMN payments.status IS '결제 상태 (pending, completed, failed, cancelled, refunded)';
COMMENT ON COLUMN payments.payment_method IS '결제 수단 (카드, 계좌이체, 카카오페이 등)';
COMMENT ON COLUMN payments.metadata IS '추가 결제 정보 (JSON 형태)';