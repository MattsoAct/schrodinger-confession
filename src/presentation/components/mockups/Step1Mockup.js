import React from 'react';
import { FaHeart, FaUser, FaPhone } from 'react-icons/fa';
import MobileMockup from './MobileMockup';
import ContentOnlyMockup from './ContentOnlyMockup';
import './StepMockups.css';

const Step1Mockup = ({ 
  senderName = '딩고', 
  receiverName = '나비', 
  message = "나비야 안녕!\n나 딩고야🐱\n특별한 마음을 전하고 싶어서 편지 써봤어! 💕\n매일매일 행복하길 바라~\n사랑하는 딩고가 ❤️", 
  hint = '매일 츄르를 달라고 조르는 고양이',
  isPreview = false,
  isCompact = false
}) => {
  
  // 컴팩트 모드일 때 메시지 축약
  const compactMessage = `${receiverName}야! 안녕 🐱
나야 ${senderName}~ 
특별한 마음을 전하고 싶어서 편지 써봤어! 💕
매일매일 행복하길 바라~
사랑하는 ${senderName}가 ❤️`;
  
  const displayMessage = isCompact ? compactMessage : message;
  
  const MockupWrapper = isCompact ? ContentOnlyMockup : MobileMockup;
  
  return (
    <MockupWrapper>
      <div className="step1-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* Form Section */}
          <div className="form-section">
            <div className="question-block">
              <div className="question-header">
                <h3>보내는 사람</h3>
              </div>
              <div className="input-field">
                <span className="input-text">{senderName}</span>
              </div>
            </div>

            <div className="question-block">
              <div className="question-header">
                <h3>편지 내용</h3>
              </div>
              <div className="input-field">
                <div className="letter-content">
                  {displayMessage.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < displayMessage.split('\n').length - 1 && <br/>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="submit-section">
              <button className="next-button">
                <span>다음 단계</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MockupWrapper>
  );
};

export default Step1Mockup;