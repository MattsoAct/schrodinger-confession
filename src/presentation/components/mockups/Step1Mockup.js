import React from 'react';
import { FaHeart, FaUser, FaPhone } from 'react-icons/fa';
import MobileMockup from './MobileMockup';
import './StepMockups.css';

const Step1Mockup = ({ 
  senderName = '슈로', 
  receiverName = '딩고', 
  message = `딩고야! 안녕 🐱
나야 슈로~ 오늘도 생각이 나서
편지 써봤어!

딩고랑 평생 츄르 나눠먹으면서
행복하게 살고 싶어 💕

츄르 없으면 참치캔도 좋고
딩고가 좋아하는 간식이면 뭐든지!

딩고야, 매일매일 행복하길 바라 🌟

사랑하는 슈로가 ❤️`, 
  hint = '매일 츄르를 달라고 조르는 고양이',
  isPreview = false
}) => {
  return (
    <MobileMockup>
      <div className="step1-mockup">
        {/* Main Content */}
        <div className="mockup-content">
          {/* Title Section */}
          <div className="title-section">
            <div className="envelope-icon">
              <div className="envelope-box">
                <div className="schro-in-box">🐱</div>
              </div>
            </div>
            <div className="title-text-group">
              <h2 className="main-title">{receiverName}에게 전하는<br/>특별한 마음 💕</h2>
              <p className="subtitle">{isPreview ? '미리보기: ' : ''}슈로가 당신의 편지를<br/>안전하게 배달해드려요 💌</p>
            </div>
            <div className="sparkle">✨</div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="question-block">
              <div className="question-header">
                <div className="question-icon">👤</div>
                <h3>보내는 사람 (나)</h3>
              </div>
              <div className="input-field">
                <span className="input-text">{senderName}</span>
              </div>
              <p className="input-description">{receiverName}가 맞춰야 할<br/>보내는 사람의 이름</p>
            </div>

            <div className="question-block">
              <div className="question-header">
                <div className="question-icon">✏️</div>
                <h3>편지 내용</h3>
              </div>
              <div className="input-field">
                <div className="letter-content">
                  {message.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < message.split('\n').length - 1 && <br/>}
                    </span>
                  ))}
                </div>
              </div>
              <p className="input-description">{receiverName}에게 전하고 싶은<br/>특별한 메시지</p>
            </div>

            <div className="question-block">
              <div className="question-header">
                <div className="question-icon">💡</div>
                <h3>힌트</h3>
              </div>
              <div className="input-field">
                <span className="input-text">{hint}</span>
              </div>
              <p className="input-description">{receiverName}가 보낸 사람을<br/>쉽게 맞출 수 있는 힌트</p>
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
    </MobileMockup>
  );
};

export default Step1Mockup;