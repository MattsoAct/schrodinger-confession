-- 2단계: confessions 테이블 업데이트
-- 기존 confessions 테이블에 payment_id 컬럼 추가
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS payment_id BIGINT;

-- confessions 테이블에 letter_type 컬럼 추가 (아직 없다면)
ALTER TABLE confessions ADD COLUMN IF NOT EXISTS letter_type TEXT DEFAULT 'basic';

-- confessions 테이블에 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_confessions_payment_id ON confessions(payment_id);
CREATE INDEX IF NOT EXISTS idx_confessions_letter_type ON confessions(letter_type);