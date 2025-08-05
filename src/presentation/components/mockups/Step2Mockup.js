import React from 'react';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step2Mockup = ({ senderName = '슈로', receiverName = '딩고', isPreview = false }) => {
  return (
    <MobileMockup>
      <div className="step2-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* SchRo Logo */}
          <div className="schro-logo-section">
            <div className="schro-circle">
              <span className="schro-text">SchRo</span>
            </div>
          </div>

          {/* Title */}
          <div className="payment-title">
            <h2>{senderName}의 비밀 편지 📮</h2>
            <p>{receiverName}에게 전하는<br/>특별한 마음</p>
          </div>

          {/* Simple Payment Section */}
          <div className="simple-payment-section">
            <button className="single-payment-btn">
              <span className="payment-icon">💳</span>
              <span className="payment-text">결제하기</span>
            </button>
          </div>
        </div>
      </div>
    </MobileMockup>
  );
};

export default Step2Mockup;