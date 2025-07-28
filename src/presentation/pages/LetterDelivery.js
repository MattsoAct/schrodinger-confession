// src/pages/LetterDelivery.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import letterInMouthImage from '../../assets/image_schro_delivery.png';
import '../styles/letter-delivery-schro.css';

const LetterDelivery = () => {
  const [searchParams] = useSearchParams();
  const [deliveryStage, setDeliveryStage] = useState(0);
  const [letterData, setLetterData] = useState(null);
  const navigate = useNavigate();

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const isDevTest = searchParams.get('paymentKey')?.startsWith('dev_skip_');

  useEffect(() => {
    // 편지 데이터 복구 시도
    if (orderId) {
      const letterDataString = sessionStorage.getItem('pendingLetter_' + orderId);
      if (letterDataString) {
        try {
          const data = JSON.parse(letterDataString);
          setLetterData(data);
          console.log('편지 데이터 로드됨:', data); // 디버깅용
        } catch (error) {
          console.error('편지 데이터 파싱 실패:', error);
        }
      } else {
        console.log('세션스토리지에 편지 데이터가 없음, orderId:', orderId); // 디버깅용
      }
    }

    // 배달 단계 애니메이션
    const stages = [
      1000, // 1초 후 첫 번째 단계
      2500, // 2.5초 후 두 번째 단계  
      4000, // 4초 후 세 번째 단계
      5500  // 5.5초 후 완료
    ];

    stages.forEach((delay, index) => {
      setTimeout(() => {
        setDeliveryStage(index + 1);
      }, delay);
    });

    // 자동 리다이렉트 제거
  }, [orderId]);

  const deliveryStages = [
    {
      icon: '🏠',
      title: '편지 준비 완료!',
      description: '슈로가 당신의 편지를 받았어요',
      schroEmoji: '📝'
    },
    {
      icon: '🎒',
      title: '배달 준비 중...',
      description: '슈로가 배달 가방을 챙기고 있어요',
      schroEmoji: '🎒'
    },
    {
      icon: '🚀',
      title: '양자 터널 이동 중!',
      description: '슈로가 양자역학으로 순간이동 중이에요',
      schroEmoji: '⚡'
    },
    {
      icon: '📮',
      title: '편지 배달 완료!',
      description: letterData?.receiver_name 
        ? `${letterData.receiver_name}님에게 알림을 보냈어요` 
        : '받는 분에게 알림을 보냈어요',
      schroEmoji: '🎉'
    }
  ];

  const currentStage = deliveryStages[deliveryStage - 1];

  return (
    <div className="letter-delivery-container">
      <div className="letter-delivery-content">
        {/* 슈로 캐릭터 */}
        <div className="schro-delivery-character">
          <div className="schro-character-main">
            <img 
              src={letterInMouthImage} 
              alt="배달 중인 SchRo" 
              className={`schro-delivery-img stage-${deliveryStage}`}
            />
            <div className="schro-emoji-indicator">
              {currentStage?.schroEmoji || '😸'}
            </div>
          </div>
          
          {/* 양자 효과 */}
          <div className={`quantum-effects ${deliveryStage >= 3 ? 'active' : ''}`}>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
            <div className="quantum-particle"></div>
          </div>
        </div>

        {/* 진행 단계 */}
        <div className="delivery-progress">
          <div className="progress-bar">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`progress-step ${deliveryStage >= step ? 'completed' : ''}`}
              >
                <div className="step-number">{step}</div>
              </div>
            ))}
            <div 
              className="progress-line"
              style={{ width: `${Math.min(deliveryStage * 25, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* 현재 단계 정보 */}
        {currentStage && (
          <div className="delivery-stage-info">
            <div className="stage-icon">{currentStage.icon}</div>
            <h2 className="stage-title">{currentStage.title}</h2>
            <p className="stage-description">{currentStage.description}</p>
          </div>
        )}

        {/* 편지 정보 */}
        {letterData && (
          <div className="letter-info-summary">
            <div className="letter-detail">
              <span className="detail-label">받는 사람:</span>
              <span className="detail-value">{letterData.receiver_name}님</span>
            </div>
            <div className="letter-detail">
              <span className="detail-label">전송 방법:</span>
              <span className="detail-value">
                {letterData.letter_type === 'email' ? '📧 이메일' : '📱 SMS'}
              </span>
            </div>
            {amount && (
              <div className="letter-detail">
                <span className="detail-label">결제 금액:</span>
                <span className="detail-value">{parseInt(amount).toLocaleString()}원</span>
              </div>
            )}
          </div>
        )}

        {/* 액션 버튼 - 항상 표시 */}
        <div className="delivery-actions">
          <button 
            className="primary-action-btn"
            onClick={() => {
              // 홈으로 가기 전에 세션스토리지 정리
              if (orderId) {
                sessionStorage.removeItem('pendingLetter_' + orderId);
              }
              navigate('/');
            }}
          >
            🏠 홈으로 돌아가기
          </button>
          {deliveryStage >= 4 && (
            <button 
              className="secondary-action-btn"
              onClick={() => {
                // 다른 편지 쓰기 전에 세션스토리지 정리
                if (orderId) {
                  sessionStorage.removeItem('pendingLetter_' + orderId);
                }
                navigate('/confess');
              }}
            >
              ✍️ 다른 편지 쓰기
            </button>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="delivery-footer">
          <div className="quantum-explanation">
            <p>🌌 <strong>양자역학 편지 배달 시스템</strong></p>
            <p>슈로의 양자 상태를 이용한 순간 배달 완료!</p>
            {isDevTest && (
              <p className="dev-notice">🧪 개발자 테스트 모드</p>
            )}
          </div>
        </div>

        {/* 떠다니는 장식 */}
        <div className="floating-decorations">
          <div className="floating-item">💌</div>
          <div className="floating-item">⭐</div>
          <div className="floating-item">💫</div>
          <div className="floating-item">🌟</div>
        </div>
      </div>
    </div>
  );
};

export default LetterDelivery;