-- 3단계: 제약조건 추가 (선택사항 - 오류 발생시 건너뛰어도 됨)

-- payments 테이블 상태 제약조건
ALTER TABLE payments 
ADD CONSTRAINT check_payment_status 
CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded'));

-- confessions 테이블 letter_type 제약조건  
ALTER TABLE confessions 
ADD CONSTRAINT check_letter_type 
CHECK (letter_type IN ('basic', 'premium'));

-- payments와 confessions 연결 외래키
ALTER TABLE confessions 
ADD CONSTRAINT fk_confessions_payment 
FOREIGN KEY (payment_id) REFERENCES payments(id);