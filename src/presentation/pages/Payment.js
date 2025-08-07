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
    // 현재 로그인된 사용자 확인
    const checkFreeUser = async () => {
      console.log('무료 사용자 확인 시작...');
      
      try {
        // Supabase에서 현재 로그인된 사용자 정보 가져오기
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('사용자 정보 가져오기 실패:', error);
          return false;
        }
        
        if (user && user.email) {
          console.log('현재 로그인된 사용자 이메일:', user.email);
          
          // 로그인된 사용자가 무료 계정인지 확인
          if (paymentService.isFreeEmail(user.email)) {
            console.log('💌 무료 계정 사용자 감지!');
            setIsFreeEmail(true);
            setFreeEmailAddress(user.email);
            return true; // 무료 사용자임을 반환
          }
        } else {
          console.log('로그인되지 않은 사용자');
        }
        
        console.log('무료 계정이 아님');
        return false;
      } catch (error) {
        console.error('사용자 확인 중 오류:', error);
        return false;
      }
    };

    const initPayment = async () => {
      // 무료 계정 사용자인 경우 포트원 초기화 건너뛰기
      if (await checkFreeUser()) {
        console.log('💌 무료 계정 감지: 포트원 초기화를 건너뜁니다.');
        return;
      }

      // 일반 결제인 경우에만 포트원 초기화
      console.log('일반 결제: 포트원 초기화 시작...');
      try {
        await paymentService.initialize();
        console.log('포트원 초기화 성공');
      } catch (error) {
        console.error('포트원 초기화 실패:', error);
        setAlertModal({ isOpen: true, message: '결제 시스템 초기화에 실패했습니다.', type: 'error' });
      }
    };

    initPayment();
  }, [paymentService, paymentInfo.orderId]);

  const handlePayment = async (method = '카드') => {
    setIsLoading(true);

    try {
      // 이미 생성된 orderId 사용하거나 새로 생성
      const orderId = paymentInfo.orderId || `schro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 현재 로그인된 사용자 정보 가져오기 (KG이니시스 구매자 이메일 필수)
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user?.email) {
        setAlertModal({ 
          isOpen: true, 
          message: '결제를 위해서는 로그인이 필요합니다. 로그인 후 다시 시도해주세요.', 
          type: 'error' 
        });
        setIsLoading(false);
        return;
      }

      console.log('로그인된 사용자 이메일:', user.email);
      
      // 세션스토리지에서 편지 데이터 가져와서 고객 정보 추출
      const letterDataString = sessionStorage.getItem('pendingLetter_' + paymentInfo.orderId);
      let customerInfo = { 
        name: '고객', 
        email: user.email, // 로그인된 사용자 이메일 사용 (필수)
        phone: null 
      };
      
      console.log('편지 데이터 확인:', letterDataString);
      
      if (letterDataString) {
        try {
          const letterData = JSON.parse(letterDataString);
          console.log('파싱된 편지 데이터:', letterData);
          
          // 전화번호 형식 검증 (한국 전화번호)
          const isValidPhone = (phone) => {
            if (!phone || typeof phone !== 'string') return false;
            const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
          };
          
          customerInfo = {
            name: letterData.sender_name || '고객',
            email: user.email, // 항상 로그인된 사용자 이메일 사용
            phone: letterData.letter_type === 'sms' && isValidPhone(letterData.receiver_contact)
              ? letterData.receiver_contact.replace(/\s/g, '') : null,
          };
          
          console.log('추출된 고객 정보:', customerInfo);
        } catch (error) {
          console.warn('편지 데이터 파싱 실패, 기본값 사용:', error);
        }
      }
      
      const paymentData = {
        amount: paymentInfo.amount,
        orderId: orderId,
        orderName: paymentInfo.orderName,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email, // 로그인된 사용자 이메일 (필수)
        customerPhone: customerInfo.phone,
        method: method, // 결제 방법 추가
      };

      console.log('결제 요청 데이터:', paymentData);
      const result = await paymentService.requestPayment(paymentData);
      
      console.log('포트원 결제 요청 성공:', result);
      
      // 무료 계정의 경우 가상 성공 응답을 받으므로 수동으로 success 페이지로 이동
      if (result && result.status === 'PAID' && result.paymentId.startsWith('test_payment_')) {
        console.log('💌 무료 계정 가상 결제 완료 - PaymentSuccess 페이지로 이동');
        
        const successParams = new URLSearchParams({
          paymentId: result.paymentId,
          orderId: orderId,
          amount: paymentData.amount.toString()
        });
        
        navigate(`/payment/success?${successParams.toString()}`);
        return;
      }
      
      // 일반 결제의 경우 포트원이 자동으로 redirectUrl로 리다이렉트
      
    } catch (error) {
      console.error('결제 요청 실패:', error);
      setAlertModal({ isOpen: true, message: `결제 요청에 실패했습니다: ${error.message || error}`, type: 'error' });
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
          
          {/* 무료 계정 안내 메시지 */}
          {isFreeEmail && (
            <div className="test-mode-notice">
              <div className="test-mode-badge">🎉 무료 계정</div>
              <p className="test-mode-text">
                "<strong>{freeEmailAddress}</strong>" 계정으로 로그인하셨군요!<br/>
                특별 계정 혜택으로 <strong>무료</strong>로 편지를 전송해드립니다.
              </p>
            </div>
          )}
        </div>

        <div className="payment-details">
          <div className="payment-item">
            <span className="payment-item-name">{paymentInfo.orderName}</span>
            <span className="payment-item-price" style={{
              textDecoration: isFreeEmail ? 'line-through' : 'none',
              opacity: isFreeEmail ? 0.5 : 1
            }}>
              {paymentInfo.amount.toLocaleString()}원
            </span>
            {isFreeEmail && (
              <span className="payment-item-free" style={{
                color: '#4caf50',
                fontWeight: 700,
                fontSize: '1.2em'
              }}>
                무료!
              </span>
            )}
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
            {isFreeEmail && (
              <div className="feature-item">
                <span className="feature-icon">🎉</span>
                <span>무료 계정 특별 혜택</span>
              </div>
            )}
          </div>

          <div className="payment-total">
            <span className="total-label">총 결제금액</span>
            <span className="total-amount" style={{
              color: isFreeEmail ? '#4caf50' : 'inherit'
            }}>
              {isFreeEmail ? '0' : paymentInfo.amount.toLocaleString()}원
            </span>
          </div>
        </div>

        <div className="payment-methods">
          {/* 무료 계정 사용자용 무료 전송 버튼 */}
          {isFreeEmail ? (
            <button 
              className="payment-method-btn free-account-btn"
              onClick={() => handlePayment('무료')}
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
                border: '2px solid #4caf50',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? '🎉 무료 전송 중...' : '🎉 무료로 편지 보내기'}
            </button>
          ) : (
            <>
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
            </>
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