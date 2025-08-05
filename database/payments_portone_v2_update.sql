-- 포트원 V2 API에 맞게 payments 테이블 업데이트
-- Supabase 콘솔의 SQL Editor에서 실행하세요

-- 1. 기존 payment_key 컬럼 이름을 payment_id로 변경 (포트원 V2는 paymentId 사용)
-- 기존 데이터가 있다면 백업 후 실행하세요
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'payment_key'
    ) THEN
        -- payment_key를 payment_id로 변경
        ALTER TABLE payments RENAME COLUMN payment_key TO payment_id;
        
        -- 인덱스도 다시 생성
        DROP INDEX IF EXISTS idx_payments_payment_key;
        CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON payments(payment_id);
        
        -- 주석 업데이트
        COMMENT ON COLUMN payments.payment_id IS '포트원 V2 결제 ID (paymentId)';
    END IF;
END $$;

-- 2. 포트원 V2 API에서 사용하는 추가 필드들
ALTER TABLE payments ADD COLUMN IF NOT EXISTS store_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS channel_key TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_gateway TEXT DEFAULT 'portone_v2';

-- 3. 포트원 V2 상태값에 맞게 제약조건 업데이트
ALTER TABLE payments DROP CONSTRAINT IF EXISTS check_payment_status;
ALTER TABLE payments ADD CONSTRAINT check_payment_status 
  CHECK (status IN ('pending', 'ready', 'paid', 'failed', 'cancelled', 'partial_cancelled'));

-- 4. 새로운 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_payments_store_id ON payments(store_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_gateway ON payments(payment_gateway);
CREATE INDEX IF NOT EXISTS idx_payments_customer_email ON payments(customer_email);

-- 5. 포트원 관련 주석 업데이트
COMMENT ON TABLE payments IS '포트원 V2 API 결제 정보 저장 테이블';
COMMENT ON COLUMN payments.payment_id IS '포트원 V2 결제 ID (paymentId)';
COMMENT ON COLUMN payments.store_id IS '포트원 상점 ID';
COMMENT ON COLUMN payments.channel_key IS '포트원 채널 키';
COMMENT ON COLUMN payments.customer_name IS '고객 이름';
COMMENT ON COLUMN payments.customer_email IS '고객 이메일';
COMMENT ON COLUMN payments.customer_phone IS '고객 전화번호';
COMMENT ON COLUMN payments.payment_gateway IS '결제 게이트웨이 (portone_v2, toss_payments 등)';
COMMENT ON COLUMN payments.status IS '결제 상태 (pending, ready, paid, failed, cancelled, partial_cancelled)';

-- 6. 기존 토스페이먼츠 데이터 마이그레이션을 위한 업데이트 (선택사항)
-- 기존 데이터가 있다면, payment_gateway를 'toss_payments'로 설정
UPDATE payments 
SET payment_gateway = 'toss_payments' 
WHERE payment_gateway IS NULL OR payment_gateway = 'portone_v2';

-- 7. 새로운 포트원 데이터는 'portone_v2'로 기본값 설정
ALTER TABLE payments ALTER COLUMN payment_gateway SET DEFAULT 'portone_v2';

-- 8. 웹훅 처리를 위한 테이블 추가 (선택사항)
CREATE TABLE IF NOT EXISTS payment_webhooks (
  id BIGSERIAL PRIMARY KEY,
  payment_id TEXT NOT NULL,
  webhook_type TEXT NOT NULL,
  status TEXT NOT NULL,
  raw_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhooks_payment_id ON payment_webhooks(payment_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_processed ON payment_webhooks(processed);
CREATE INDEX IF NOT EXISTS idx_webhooks_created_at ON payment_webhooks(created_at);

COMMENT ON TABLE payment_webhooks IS '포트원 웹훅 이벤트 로그 테이블';

-- 완료 메시지
DO $$
BEGIN
    RAISE NOTICE '포트원 V2 API용 payments 테이블 업데이트가 완료되었습니다.';
    RAISE NOTICE '- payment_key → payment_id 컬럼명 변경';
    RAISE NOTICE '- 포트원 V2 전용 필드 추가 (store_id, channel_key, customer_* 등)';
    RAISE NOTICE '- 상태값 제약조건 업데이트';
    RAISE NOTICE '- 웹훅 처리용 테이블 추가';
END $$;