import React from 'react';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step3Mockup = ({ isCompact = false, receiverName = '딩고' }) => {
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  
  return (
    <MockupWrapper>
      <div className="step3-mockup">
        {/* 스마트폰 상단바 */}
        <div className="phone-status-bar">
          <div className="status-left">
            <span className="carrier">SKT</span>
            <span className="signal">●●●●</span>
          </div>
          <div className="status-center">
            <span className="time">14:30</span>
          </div>
          <div className="status-right">
            <span className="battery">🔋 85%</span>
          </div>
        </div>

        {/* 메시지 앱 헤더 */}
        <div className="messages-header">
          <div className="header-left">
            <span className="back-arrow">←</span>
          </div>
          <div className="header-center">
            <div className="contact-name">슈로의 비밀편지</div>
            <div className="contact-number">010-0000-0000</div>
          </div>
          <div className="header-right">
            <span className="call-btn">📞</span>
          </div>
        </div>

        {/* 메시지 내용 */}
        <div className="messages-content">
          <div className="message-bubble received">
            <div className="message-text">
              안녕하세요 딩고님🐱<br /><br />
              🔐보낸 사람의 이름을 맞혀야만 열리는 안전하고 특별한 양자편지가 배달왔어요!🔐<br /><br />
              📮편지 확인하기: <span className="message-link">www.schros.com/check/123</span><br />
              ⚠️기회는 단 한 번! 신중하게 시도하세요!
            </div>
            <div className="message-time">오후 2:30</div>
          </div>
        </div>

        {/* 메시지 입력창 */}
        <div className="message-input-area">
          <div className="input-container">
            <span className="input-placeholder">메시지</span>
            <span className="send-btn">전송</span>
          </div>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step3Mockup;