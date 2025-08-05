import React from 'react';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step5SuccessMockup = () => {
  return (
    <MobileMockup>
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
            <div className="success-bubble">
              <span className="bubble-text">딩고님께 편지 배달 완료! 💌✨</span>
              <div className="bubble-tail"></div>
            </div>
          </div>

          {/* Letter Content - Highlighting Step1 Message */}
          <div className="letter-content">
            <div className="letter-header">
              <div className="letter-title">
                <span className="title-highlight">슈로</span>
                <span className="title-text">가 딩고에게 보낸 편지 🐱💕</span>
              </div>
            </div>

            <div className="letter-body">
              <div className="highlighted-message">
                <p className="letter-text">
                  딩고야! 안녕 🐱<br/>
                  나야 슈로~ 오늘도 생각이 나서<br/>
                  편지 써봤어!<br/>
                  <br/>
                  <span className="highlight-text">딩고랑 평생 츄르 나눠먹으면서<br/>행복하게 살고 싶어 💕</span><br/>
                  <br/>
                  츄르 없으면 참치캔도 좋고<br/>
                  딩고가 좋아하는 간식이면 뭐든지!<br/>
                  <br/>
                  딩고야, 매일매일 행복하길 바라 🌟<br/>
                  <br/>
                  사랑하는 슈로가 ❤️
                </p>
              </div>
              
              <div className="letter-divider"></div>
              
              <div className="sender-info">
                <span className="sender-label">💌 보낸 사람: </span>
                <span className="sender-name">슈로 (매일 츄르를 달라고 조르는 고양이)</span>
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
    </MobileMockup>
  );
};

export default Step5SuccessMockup;