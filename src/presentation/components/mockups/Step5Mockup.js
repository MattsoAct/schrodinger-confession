import React from 'react';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step5Mockup = ({ isCompact = false, receiverName = '나비', wrongGuess = '다비' }) => {
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  
  return (
    <MockupWrapper>
      <div className="step5-fail-mockup">
        {/* 실패 결과 헤더 */}
        <div className="fail-result-header">
          <div className="result-icon">💔</div>
          <h2>아쉬워요... 틀렸네요</h2>
          <p className="attempted-name">입력하신 이름: <span className="wrong-name">"{wrongGuess}"</span></p>
        </div>

        {/* 실패 설명 카드 */}
        <div className="failure-explanation-card">
          <div className="card-header">
            <h5>🌙 편지가 사라져요</h5>
          </div>
          
        </div>

        {/* 위로의 메시지 */}
        <div className="comfort-message">
            <p className="comfort-text">
            괜찮아요, 언젠가는 당신과 <br></br>마음이 통하는 사람에게서 <br></br>편지가 올거에요<br/>
            <strong>보낸 사람은 결과를 모르니</strong> <br></br>안심해도 돼요!🤫✨
          </p>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="action-section">
          <button className="home-button">
            <span className="button-icon">🏠</span>
            <span className="button-text">홈으로 돌아가기</span>
          </button>
        </div>

        {/* 배경 분위기 효과 */}
        <div className="atmosphere-effects">
          <div className="mist mist-1"></div>
          <div className="mist mist-2"></div>
          <div className="falling-leaves">
            <span className="leaf leaf-1">🍃</span>
            <span className="leaf leaf-2">🍂</span>
          </div>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step5Mockup;