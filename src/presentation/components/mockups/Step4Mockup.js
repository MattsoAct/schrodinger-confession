import React, { useState } from 'react';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step4Mockup = ({ isCompact = false, hint = '매일 츄르를 달라고 조르는 고양이', receiverName = '나비' }) => {
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  const [guessName, setGuessName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guessName.trim()) return;
    
    setIsSubmitting(true);
    // 목업이므로 2초 후 리셋
    setTimeout(() => {
      setIsSubmitting(false);
      setGuessName('');
    }, 2000);
  };
  
  return (
    <MockupWrapper>
      <div className="step4-mockup-clean">
        {/* 1. 이름 입력 카드 - 맨 위로 */}
        <div className="name-input-card">
          <form onSubmit={handleSubmit}>
            <div className="input-header">
              <span className="key-icon">🗝️</span>
              <h4>보낸 사람의 이름을 <br></br>입력하세요</h4>
            </div>
            
            <div className="input-section">
              <input
                type="text"
                className="name-input-field"
                placeholder="정확한 이름을 입력해주세요"
                value={guessName}
                onChange={(e) => setGuessName(e.target.value)}
                disabled={isSubmitting}
                maxLength="20"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={!guessName.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-icon">⏳</span>
                  확인 중...
                </>
              ) : (
                <>
                  <span className="submit-icon">✨</span>
                  편지 열기
                </>
              )}
            </button>
          </form>
        </div>

        {/* 2. 축소된 경고 - 이름입력 카드 아래 */}
        <div className="compact-warning-card">
          <div className="compact-warning-content">
            <span className="warning-icon-small">⚠️</span>
            <span className="warning-text">단 한 번만 열람 가능!<br></br> <strong>틀리면 사라집니다</strong></span>
          </div>
        </div>

        {/* 3. 프라이버시 안내 */}
        <div className="privacy-notice">
          <div className="privacy-icon">🕵️</div>
          <p className="privacy-text">
            <strong>프라이버시 보장:</strong><br/>
            편지를 열었는지, 실패했는지 <strong>보낸 사람은 절대 모릅니다</strong><br/>
            완전한 비밀이 보장되는 안전한 시스템입니다 ✨
          </p>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step4Mockup;