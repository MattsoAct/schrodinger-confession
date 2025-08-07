import React from 'react';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step5SuccessMockup = ({ isCompact = false }) => {
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  
  return (
    <MockupWrapper>
      <div className="step5-success-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="schro-delivery">
              <div className="schro-cat">🐱</div>
              <div className="delivery-box">📦</div>
            </div>
            <div className="floating-hearts">
              <span className="heart heart-1">💗</span>
              <span className="heart heart-2">💗</span>
              <span className="heart heart-3">💗</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <div className="success-header">
              <div className="success-icon">🎉</div>
              <h2>마음이 통했어요!</h2>
              <p className="success-subtitle">편지가 성공적으로 열렸어요! ✨</p>
            </div>
          </div>

          {/* Letter Content - Highlighting Step1 Message */}
          <div className="letter-content">
            <div className="letter-header">
              <div className="letter-title">
                <span className="title-highlight">슈로</span>
                <span className="title-text">가 보낸 특별한 편지 🐱💕</span>
              </div>
            </div>

            <div className="letter-body">
              <div className="highlighted-message">
                <p className="letter-text">
                  딩고 안녕! 나 슈로야🐱
                  <br></br>특별한 마음을 전하고
                  <br></br>싶어서 편지 써봤어! 💕
                  <br></br>매일매일 행복하길 바라~
                  <br></br>사랑하는 슈로가 ❤️
                </p>
              </div>
              
              <div className="letter-divider"></div>
              
              <div className="sender-info">
                <span className="sender-label">💌 보낸 사람: </span>
                <span className="sender-name">슈로</span>
                <div className="sender-hint">힌트: 매일 츄르를 달라고 조르는 고양이</div>
              </div>
              
              <div className="success-footer">
                <p className="success-note">
                  🎊 축하해요! 소중한 마음이 성공적으로 전달되었어요!
                </p>
              </div>
            </div>
          </div>

          {/* Celebration Elements */}
          <div className="celebration-elements">
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">⭐</div>
            <div className="sparkle sparkle-3">💫</div>
            <div className="sparkle sparkle-4">🌟</div>
          </div>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step5SuccessMockup;