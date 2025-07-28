// src/pages/PaymentFail.js
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/payment-result-schro.css';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  const getErrorMessage = (code) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소했습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제 진행 중 오류가 발생했습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.';
      case 'INVALID_CARD_COMPANY':
        return '유효하지 않은 카드입니다.';
      case 'NOT_SUPPORTED_INSTALLMENT':
        return '지원하지 않는 할부 개월수입니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      case 'NOT_AVAILABLE_PAYMENT':
        return '현재 사용할 수 없는 결제 수단입니다.';
      default:
        return message || '결제 중 오류가 발생했습니다.';
    }
  };

  return (
    <div className="payment-result-container">
      <div className="payment-result-content">
        <div className="result-icon error">
          😿
        </div>
        
        <h1 className="result-title">결제 실패</h1>
        
        <p className="result-message">
          {getErrorMessage(code)}
        </p>

        {orderId && (
          <div className="payment-info">
            <div className="info-item">
              <span className="info-label">주문번호:</span>
              <span className="info-value">{orderId}</span>
            </div>
          </div>
        )}

        <div className="error-details">
          <details>
            <summary>오류 상세 정보</summary>
            <div className="error-content">
              <p><strong>오류 코드:</strong> {code}</p>
              <p><strong>오류 메시지:</strong> {message}</p>
            </div>
          </details>
        </div>

        <div className="result-actions">
          <button 
            className="primary-btn"
            onClick={() => navigate('/payment', { 
              state: { 
                paymentInfo: {
                  amount: 1000,
                  orderName: 'SchRo 프리미엄 편지',
                  customerName: '고객',
                }
              }
            })}
          >
            다시 결제하기
          </button>
          
          <button 
            className="secondary-btn"
            onClick={() => navigate('/')}
          >
            홈으로 돌아가기
          </button>
        </div>

        <div className="help-section">
          <h3>결제 문제 해결 방법</h3>
          <ul>
            <li>카드 한도 및 잔액을 확인해주세요</li>
            <li>인터넷 연결 상태를 확인해주세요</li>
            <li>다른 결제 수단을 시도해보세요</li>
            <li>문제가 지속되면 고객센터로 문의해주세요</li>
          </ul>
        </div>

        <div className="schro-decoration">
          <img src="/src/assets/image_schro_standing.png" alt="SchRo" className="result-schro-img sad" />
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;