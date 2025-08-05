import React from 'react';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step3Mockup = () => {
  return (
    <MobileMockup>
      <div className="step3-mockup">
        {/* SMS Header */}
        <div className="sms-header">
          <div className="contact-info">
            <div className="contact-name">비밀편지함</div>
            <div className="contact-number">010-1234-5678</div>
          </div>
          <div className="sms-time">오후 2:30</div>
        </div>

        {/* Message Content */}
        <div className="sms-content">
          <div className="sms-message-bubble">
            <div className="sms-text">
              안녕하세요! 딩고님 🐱
              
              슈로가 특별한 편지를 배달해왔어요!
              
              보낸 사람의 이름을 맞혀야만
              편지를 열 수 있습니다 🔐
              
              📮 편지 확인하기:
              schro-letter.com/check/abc123
              
              ⚠️ 단 한 번의 기회만 있으니
              신중하게 생각해주세요!
            </div>
            <div className="sms-timestamp">오후 2:30</div>
          </div>
        </div>
      </div>
    </MobileMockup>
  );
};

export default Step3Mockup;