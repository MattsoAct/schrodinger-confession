// src/pages/Payment.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PortOnePaymentServiceV2 } from '../../infrastructure/api/PortOnePaymentServiceV2.js';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { AlertModal } from '../components/Modal';
import schroLetterImage from '../../assets/schro_letter.png';
import '../styles/payment-schro.css';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentService] = useState(new PortOnePaymentServiceV2());
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: '', type: 'error' });
  const navigate = useNavigate();
  const location = useLocation();
  
  // 무료 이메일 확인을 위한 상태
  const [isFreeEmail, setIsFreeEmail] = useState(false);
  const [freeEmailAddress, setFreeEmailAddress] = useState('');
  
  // URL 파라미터나 state에서 결제 정보 받기
  const paymentInfo = location.state?.paymentInfo || {
    amount: 1000,
    orderName: '슈로의 비밀 편지',
    customerName: '고객',
  };

  useEffect(() => {
    const initPayment = async () => {
      try {
        await paymentService.initialize();
      } catch (error) {
        console.error('포트원 초기화 실패:', error);
        setAlertModal({ isOpen: true, message: '결제 시스템 초기화에 실패했습니다.', type: 'error' });
      }
    };

    // 무료 이메일 확인
    const checkFreeEmail = () => {
      const letterDataString = sessionStorage.getItem('pendingLetter_' + paymentInfo.orderId);
      if (letterDataString) {
        try {
          const letterData = JSON.parse(letterDataString);
          const receiverEmail = letterData.receiver_contact;
          // 이메일 유형이고 무료 이메일인지 확인
          if (letterData.letter_type === 'email' && receiverEmail && paymentService.isFreeEmail(receiverEmail)) {
            setIsFreeEmail(true);
            setFreeEmailAddress(receiverEmail);
          }
        } catch (error) {
          console.warn('편지 데이터 파싱 실패:', error);
        }
      }
    };

    initPayment();
    checkFreeEmail();
  }, [paymentService, paymentInfo.orderId]);

  const handlePayment = async (method = '카드') => {
    setIsLoading(true);

    try {
      // 이미 생성된 orderId 사용하거나 새로 생성
      const orderId = paymentInfo.orderId || `schro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 세션스토리지에서 편지 데이터 가져와서 고객 정보 추출
      const letterDataString = sessionStorage.getItem('pendingLetter_' + paymentInfo.orderId);
      let customerInfo = { name: '고객', email: '', phone: '' };
      
      if (letterDataString) {
        try {
          const letterData = JSON.parse(letterDataString);
          customerInfo = {
            name: letterData.sender_name || '고객',
            email: letterData.letter_type === 'email' ? letterData.receiver_contact : '',
            phone: letterData.letter_type === 'sms' ? letterData.receiver_contact : '',
          };
        } catch (error) {
          console.warn('편지 데이터 파싱 실패, 기본값 사용:', error);
        }
      }
      
      const paymentData = {
        amount: paymentInfo.amount,
        orderId: orderId,
        orderName: paymentInfo.orderName,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
      };

      const result = await paymentService.requestPayment(paymentData);
      
      // 포트원은 성공 시 자동으로 successUrl로 리다이렉트됨
      console.log('포트원 결제 요청 성공:', result);
      
    } catch (error) {
      console.error('결제 요청 실패:', error);
      setAlertModal({ isOpen: true, message: `결제 요청에 실패했습니다: ${error.message || error}`, type: 'error' });
      setIsLoading(false);
    }
  };

  // 개발자 전용: 결제 스킵 함수
  const handleSkipPayment = async () => {
    setIsLoading(true);
    
    try {
      const orderId = paymentInfo.orderId || `schro_dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('🔍 결제 스킵 시작, paymentInfo:', paymentInfo);
      
      // 세션스토리지에서 편지 데이터 가져오기
      const letterDataString = sessionStorage.getItem('pendingLetter_' + paymentInfo.orderId);
      console.log('📦 세션스토리지에서 가져온 데이터:', letterDataString);
      
      let letterData = null;
      
      if (letterDataString) {
        try {
          letterData = JSON.parse(letterDataString);
          console.log('✅ 파싱된 편지 데이터:', letterData);
        } catch (error) {
          console.error('❌ 편지 데이터 파싱 실패:', error);
        }
      }

      if (!letterData) {
        console.error('❌ 편지 데이터가 없음');
        setAlertModal({ 
          isOpen: true, 
          message: `편지 데이터를 찾을 수 없습니다.\n확인 정보:\n- orderId: ${paymentInfo.orderId}\n- 세션스토리지 키: pendingLetter_${paymentInfo.orderId}`, 
          type: 'error' 
        });
        setIsLoading(false);
        return;
      }

      console.log('💾 Supabase에 편지 저장 시도...');

      // 편지 데이터를 데이터베이스 스키마에 맞게 변환
      const dbLetterData = {
        ...letterData,
        letter_type: letterData.letter_type === 'email' || letterData.letter_type === 'sms' ? 'premium' : 'basic',
        payment_id: null // 개발자 테스트이므로 실제 결제 없음
      };

      console.log('🔄 DB용 편지 데이터:', dbLetterData);

      // 편지 데이터를 직접 Supabase에 저장
      const { data: letterDbData, error: letterError } = await supabase
        .from('confessions')
        .insert([dbLetterData])
        .select()
        .single();

      if (letterError) {
        console.error('❌ 편지 저장 실패:', letterError);
        console.error('상세 오류 정보:', letterError.message, letterError.details, letterError.hint);
        setAlertModal({ 
          isOpen: true, 
          message: `편지 저장에 실패했습니다.\n오류: ${letterError.message}\n상세: ${letterError.details || ''}`, 
          type: 'error' 
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ 편지 저장 성공:', letterDbData);

      // 알림 전송 (이메일 또는 SMS) - 원본 letterData 사용
      try {
        console.log('📧 알림 전송 시작, letter_type:', letterData.letter_type);
        
        if (letterData.letter_type === 'email') {
          // 이메일 전송
          const emailResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-letter-notification`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              receiver_email: letterData.receiver_contact,
              receiver_name: letterData.receiver_name,
              letter_id: letterDbData.id,
              hint: letterData.hint,
            }),
          });

          if (emailResponse.ok) {
            console.log('이메일 알림 전송 성공');
          } else {
            console.error('이메일 알림 전송 실패:', await emailResponse.text());
          }
        } else if (letterData.letter_type === 'sms') {
          // SMS 전송
          const smsResponse = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/functions/v1/send-sms-notification`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              receiver_phone: letterData.receiver_contact,
              receiver_name: letterData.receiver_name,
              letter_id: letterDbData.id,
              hint: letterData.hint,
            }),
          });

          if (smsResponse.ok) {
            console.log('SMS 알림 전송 성공');
          } else {
            console.error('SMS 알림 전송 실패:', await smsResponse.text());
          }
        }
      } catch (notificationError) {
        console.error('알림 전송 중 오류:', notificationError);
      }

      // 세션스토리지에서 편지 데이터 삭제
      sessionStorage.removeItem('pendingLetter_' + paymentInfo.orderId);
      
      console.log('🎉 개발자 결제 스킵 완료!');
      console.log('편지 ID:', letterDbData.id);
      console.log('편지 링크:', `${window.location.origin}/check/${letterDbData.id}`);
      
      // 성공 페이지로 이동 (결제 성공과 동일한 파라미터)
      const successParams = new URLSearchParams({
        paymentKey: 'dev_skip_' + Date.now(),
        orderId: orderId,
        amount: paymentInfo.amount.toString()
      });
      
      navigate(`/payment/success?${successParams.toString()}`);
      
    } catch (error) {
      console.error('결제 스킵 중 오류:', error);
      setAlertModal({ isOpen: true, message: '결제 스킵 중 오류가 발생했습니다.', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="payment-header">
          <img src={schroLetterImage} alt="SchRo" className="payment-schro-img" />
          <h1 className="payment-title">슈로의 비밀 편지</h1>
          <p className="payment-subtitle">특별한 편지로 마음을 전해보세요</p>
          
          {/* 무료 이메일 안내 메시지 */}
          {isFreeEmail && (
            <div className="test-mode-notice">
              <div className="test-mode-badge">💌 무료 서비스</div>
              <p className="test-mode-text">
                "<strong>{freeEmailAddress}</strong>"로 편지를 보내시는군요!<br/>
                특별 혜택으로 <strong>무료</strong>로 편지를 전송해드립니다.
              </p>
            </div>
          )}
        </div>

        <div className="payment-details">
          <div className="payment-item">
            <span className="payment-item-name">{paymentInfo.orderName}</span>
            <span className="payment-item-price">{paymentInfo.amount.toLocaleString()}원</span>
          </div>
          
          <div className="payment-features">
            <div className="feature-item">
              <span className="feature-icon">💌</span>
              <span>개인화된 편지지 템플릿</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>특별한 SchRo 디자인</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>보안 강화된 편지 전달</span>
            </div>
          </div>

          <div className="payment-total">
            <span className="total-label">총 결제금액</span>
            <span className="total-amount">{paymentInfo.amount.toLocaleString()}원</span>
          </div>
        </div>

        <div className="payment-methods">
          <button 
            className="payment-method-btn card-btn"
            onClick={() => handlePayment('카드')}
            disabled={isLoading}
          >
            {isLoading ? '결제 진행 중...' : '카드로 결제하기'}
          </button>
          
          <button 
            className="payment-method-btn transfer-btn"
            onClick={() => handlePayment('계좌이체')}
            disabled={isLoading}
          >
            계좌이체로 결제하기
          </button>

          <button 
            className="payment-method-btn kakao-btn"
            onClick={() => handlePayment('카카오페이')}
            disabled={isLoading}
          >
            카카오페이로 결제하기
          </button>

          {/* 개발자 전용: localhost에서만 보이는 결제 스킵 버튼 */}
          {window.location.hostname === 'localhost' && (
            <button 
              className="payment-method-btn dev-skip-btn"
              onClick={handleSkipPayment}
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                marginTop: '20px',
                border: '2px dashed #fff',
                opacity: 0.8
              }}
            >
              🧪 개발자 전용: 결제 스킵 (테스트)
            </button>
          )}
        </div>

        <div className="payment-footer">
          <button 
            className="back-btn"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            이전으로
          </button>
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, message: '', type: 'error' })}
        message={alertModal.message}
        type={alertModal.type}
        title={alertModal.type === 'error' ? '오류' : '알림'}
      />
    </div>
  );
};

export default Payment;