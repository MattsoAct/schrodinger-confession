import React from 'react';
import { FaCreditCard, FaMobile, FaQrcode, FaShieldAlt } from 'react-icons/fa';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step2Mockup = ({ senderName = '슈로', receiverName = '딩고', isPreview = false, isCompact = false }) => {
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  
  return (
    <MockupWrapper>
      <div className="step2-mockup">
        {/* Header */}
        <div className="payment-header">
          <div className="back-button">←</div>
          <h1 className="payment-page-title">결제</h1>
          <div className="help-button">?</div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <div className="merchant-info">
            <div className="merchant-logo">🐱</div>
            <div className="merchant-details">
              <h3 className="merchant-name">슈로 편지</h3>
              <p className="order-description">{senderName} → {receiverName}</p>
            </div>
          </div>
          
          <div className="amount-section">
            <div className="amount-label">결제금액</div>
            <div className="amount-value">10,000원</div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods-section">
          <h3 className="section-title">결제 수단 선택</h3>
          
          <div className="payment-method-list">
            <div className="payment-method-item active">
              <div className="method-icon">
                <FaCreditCard />
              </div>
              <div className="method-info">
                <span className="method-name">카드</span>
                <span className="method-desc">신용/체크카드</span>
              </div>
              <div className="method-radio">●</div>
            </div>
            
            <div className="payment-method-item">
              <div className="method-icon">
                <FaMobile />
              </div>
              <div className="method-info">
                <span className="method-name">카카오페이</span>
                <span className="method-desc">간편결제</span>
              </div>
              <div className="method-radio">○</div>
            </div>
            
            <div className="payment-method-item">
              <div className="method-icon">
                <FaQrcode />
              </div>
              <div className="method-info">
                <span className="method-name">계좌이체</span>
                <span className="method-desc">실시간 이체</span>
              </div>
              <div className="method-radio">○</div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <FaShieldAlt className="security-icon" />
          <span className="security-text">포트원 보안결제</span>
        </div>

        {/* Payment Button */}
        <div className="payment-button-section">
          <button className="payment-submit-btn">
            <span>10,000원 결제하기</span>
          </button>
        </div>

        {/* Footer Notice */}
        <div className="payment-footer">
          <p className="notice-text">
            결제 완료 후 SMS로 편지가 즉시 전송됩니다
          </p>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step2Mockup;