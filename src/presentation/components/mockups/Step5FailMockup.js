import React from 'react';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step5FailMockup = () => {
  return (
    <MobileMockup>
      <div className="step5-fail-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* Sad SchRo Animation */}
          <div className="fail-animation">
            <div className="schro-sad">
              <div className="schro-cat-sad">🐱</div>
              <div className="crescent-moon">🌙</div>
              <div className="leaf">🍃</div>
            </div>
          </div>

          {/* Fail Message */}
          <div className="fail-message">
            <div className="fail-bubble">
              <span className="bubble-text">이번엔 아쉽네요... 😿</span>
              <div class="bubble-tail"></div>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="explanation-card">
            <div className="card-header">
              <h3>스쳐간 인연이네요</h3>
            </div>
            
            <div className="card-content">
              <div className="explanation-item">
                <span className="explanation-icon">🌙</span>
                <span className="explanation-text">이번엔 스쳐간 인연이네요.</span>
              </div>
              
              <div className="explanation-item">
                <span className="explanation-text">편지는 우아하게 사라져갑니다.</span>
              </div>
            </div>

            <div className="card-footer">
              <button className="home-btn">
                <span class="btn-icon">🏠</span>
                <span class="btn-text">홈으로 돌아가기</span>
              </button>
            </div>
          </div>

          {/* Disappearing Effect */}
          <div className="disappearing-elements">
            <div className="fade-element fade-1">💌</div>
            <div className="fade-element fade-2">✉️</div>
            <div className="fade-element fade-3">📝</div>
            <div className="vanish-text">...</div>
          </div>

          {/* Atmospheric Elements */}
          <div className="atmosphere-elements">
            <div className="mist mist-1"></div>
            <div className="mist mist-2"></div>
            <div className="mist mist-3"></div>
          </div>
        </div>
      </div>
    </MobileMockup>
  );
};

export default Step5FailMockup;