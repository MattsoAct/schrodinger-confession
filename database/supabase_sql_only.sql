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

-- 결제 상태 enum 제약조건 (안전하게 추가)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'check_payment_status' 
        AND conrelid = 'payments'::regclass
    ) THEN
        ALTER TABLE payments ADD CONSTRAINT check_payment_status 
        CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded'));
    END IF;
END $$;

-- 편지와 결제 연결을 위한 confessions 테이블 업데이트
-- 기존 confessions 테이블에 payment_id 컬럼 추가
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS payment_id BIGINT;

-- payment_id에 외래키 제약조건 추가 (안전하게)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'confessions_payment_id_fkey'
    ) THEN
        ALTER TABLE confessions ADD CONSTRAINT confessions_payment_id_fkey 
        FOREIGN KEY (payment_id) REFERENCES payments(id);
    END IF;
END $$;

-- confessions 테이블에 letter_type 컬럼 추가 (아직 없다면)
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS letter_type TEXT DEFAULT 'basic';

-- confessions 테이블에 letter_type 제약조건 추가 (안전하게)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'check_letter_type' 
        AND conrelid = 'confessions'::regclass
    ) THEN
        ALTER TABLE confessions ADD CONSTRAINT check_letter_type 
        CHECK (letter_type IN ('basic', 'premium'));
    END IF;
END $$;

-- confessions 테이블에 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_confessions_payment_id ON confessions(payment_id);
CREATE INDEX IF NOT EXISTS idx_confessions_letter_type ON confessions(letter_type);