import React from 'react';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step4Mockup = () => {
  return (
    <MobileMockup>
      <div className="step4-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* Compact Header */}
          <div className="compact-header">
            <div className="schro-mini-logo">🐱</div>
            <div className="header-text">
              <h2>🔐 딩고님께 온 비밀편지!</h2>
              <p>보낸 사람의 이름을 맞히면<br/>편지를 열 수 있어요</p>
            </div>
          </div>

          {/* Warning */}
          <div className="compact-warning">
            ⚠️ 단 한 번의 기회만 있으니<br/>신중하게 생각해주세요!
          </div>

          {/* Input Section */}
          <div className="compact-input-section">
            <h3>🔒 누가 딩고에게<br/>편지를 보냈을까요?</h3>
            <div className="input-container">
              <input 
                type="text" 
                placeholder="이름을 입력하세요 🔍"
                className="name-input"
                defaultValue=""
              />
            </div>
            <button className="submit-btn">
              <span className="btn-icon">✨</span>
              <span className="btn-text">비밀편지 열기</span>
            </button>
          </div>
        </div>
      </div>
    </MobileMockup>
  );
};

export default Step4Mockup;