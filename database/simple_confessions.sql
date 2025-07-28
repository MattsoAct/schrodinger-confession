-- confessions 테이블에 새 컬럼 추가
ALTER TABLE confessions ADD COLUMN payment_id BIGINT;
ALTER TABLE confessions ADD COLUMN letter_type TEXT DEFAULT 'basic';