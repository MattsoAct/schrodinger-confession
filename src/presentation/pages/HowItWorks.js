import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaSearch, FaCreditCard, FaArrowRight, FaHeart, FaSadTear } from 'react-icons/fa';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import schroDesignImage from '../../assets/image_schro_standing.png';
import Step1Mockup from '../components/mockups/Step1Mockup';
import Step2Mockup from '../components/mockups/Step2Mockup';
import Step3Mockup from '../components/mockups/Step3Mockup';
import Step4Mockup from '../components/mockups/Step4Mockup';
import Step5SuccessMockup from '../components/mockups/Step5SuccessMockup';
import Step5FailMockup from '../components/mockups/Step5FailMockup';
import '../styles/schro-mailcat-system.css';
import '../styles/how-it-works-schro.css';

function HowItWorks() {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(true);
  
  // URL 파라미터에서 데이터 추출
  const [previewData, setPreviewData] = useState({
    senderName: '슈로',
    receiverName: '딩고', 
    message: `딩고야! 안녕 🐱
나야 슈로~ 오늘도 생각이 나서
편지 써봤어!

딩고랑 평생 츄르 나눠먹으면서
행복하게 살고 싶어 💕

츄르 없으면 참치캔도 좋고
딩고가 좋아하는 간식이면 뭐든지!

딩고야, 매일매일 행복하길 바라 🌟

사랑하는 슈로가 ❤️`,
    hint: '매일 츄르를 달라고 조르는 고양이',
    isPreview: false
  });

  // URL 파라미터 파싱
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const senderName = params.get('senderName');
    const receiverName = params.get('receiverName');
    const message = params.get('message');
    const hint = params.get('hint');
    const isPreview = params.get('preview') === 'true';

    if (senderName && receiverName && message && hint) {
      setPreviewData({
        senderName,
        receiverName,
        message,
        hint,
        isPreview
      });
    }
  }, [location.search]);

  const allSteps = [
    {
      id: 1,
      title: "1단계: 편지 작성하기",
      description: "특별한 사람에게 마음을 전해보세요",
      duration: "약 3분 소요",
      component: <Step1Mockup 
        senderName={previewData.senderName}
        receiverName={previewData.receiverName}
        message={previewData.message}
        hint={previewData.hint}
        isPreview={previewData.isPreview}
      />,
      icon: <FaEnvelope />,
      content: "받는 사람의 정보와 힌트를 입력하고 귀여운 편지를 작성해요. 슈로가 직접 쓴 것처럼 따뜻한 메시지를 담아보세요!",
      persona: "sender",
      personaLabel: "📝 보내는 사람"
    },
    {
      id: 2,
      title: "2단계: 결제하기",
      description: "슈로 편지 배달 서비스",
      duration: "약 1분 소요",
      component: <Step2Mockup 
        senderName={previewData.senderName}
        receiverName={previewData.receiverName}
        isPreview={previewData.isPreview}
      />,
      icon: <FaCreditCard />,
      content: "간단한 결제로 슈로가 당신의 편지를 안전하게 배달해드려요. 단 한 번의 클릭으로 특별한 추억을 선물하세요!",
      persona: "sender",
      personaLabel: "📝 보내는 사람"
    },
    {
      id: 3,
      title: "3단계: 문자 알림 받기",
      description: "받는 사람에게 신비한 편지가 도착했어요!",
      duration: "즉시 전송",
      component: <Step3Mockup />,
      icon: <HiOutlineDeviceMobile />,
      content: "비밀편지함에서 보낸 문자로 특별한 편지 도착을 알려드려요. 누가 보냈는지 궁금해하게 만드는 순간이에요!",
      persona: "receiver",
      personaLabel: "📱 받는 사람"
    },
    {
      id: 4,
      title: "4단계: 편지 확인하기",
      description: "누가 보냈는지 맞춰야 열 수 있어요",
      duration: "약 2분 소요",
      component: <Step4Mockup />,
      icon: <FaSearch />,
      content: "힌트를 보고 보낸 사람의 이름을 맞춰야 편지를 열 수 있어요. 단 한 번의 기회! 신중하게 생각해보세요.",
      persona: "receiver", 
      personaLabel: "📱 받는 사람"
    },
    {
      id: 5,
      title: showSuccess ? "5단계: 편지 열람 성공!" : "5단계: 편지 사라짐...",
      description: showSuccess ? "정답을 맞춰서 편지를 확인했어요" : "틀려서 편지가 사라졌어요",
      duration: "즉시 결과",
      component: showSuccess ? <Step5SuccessMockup /> : <Step5FailMockup />,
      icon: showSuccess ? <FaHeart /> : <FaSadTear />,
      content: showSuccess 
        ? "축하해요! 편지가 열리고 소중한 마음이 전달되었어요. 슈로의 따뜻한 메시지가 당신에게 도착했습니다!"
        : "아쉬워요... 이번엔 스쳐간 인연이네요. 편지는 영원히 사라지고 비밀은 지켜집니다.",
      persona: "receiver",
      personaLabel: "📱 받는 사람"
    }
  ];

  return (
    <div className="how-it-works-page">
      <div className="how-it-works-container">
        {/* Header Section */}
        <div className="how-it-works-header">
          <div className="how-it-works-title-section">
            <img 
              src={schroDesignImage} 
              alt="SchRo Character" 
              className="how-it-works-mascot"
            />
            <div className="how-it-works-title-text">
              <h1 className="how-it-works-title">📮 사용법</h1>
              <p className="how-it-works-subtitle">
                슈로 편지는 어떻게 배달될까요?<br/>
                간단한 5단계로 특별한 경험을 만들어보세요
              </p>
            </div>
          </div>
        </div>

        {/* Service Flow Introduction */}
        <div className="service-flow-intro">
          <h2 className="flow-title">📬 슈로 편지 서비스 이용 방법</h2>
          <p className="flow-description">
            총 5단계로 이루어진 간단한 과정입니다. 
            처음 2단계는 <span className="highlight-sender">편지를 보내는 분</span>이, 
            나머지 3단계는 <span className="highlight-receiver">편지를 받는 분</span>이 경험하게 됩니다.
          </p>
        </div>

        {/* Main Content - 전체 보기 모드 (역할별 섹션) */}
        <div className="overview-mode">
          <div className="overview-container">
            {/* 발신자 섹션 (1-2단계) */}
            <div className="role-section sender-section">
              <div className="role-section-header">
                <div className="role-icon">📝</div>
                <div className="role-info">
                  <h3 className="role-title">보내는 사람이 할 일</h3>
                  <p className="role-description">편지를 작성하고 결제하는 단계입니다</p>
                </div>
                <div className="role-badge sender-badge">📤 발신자</div>
              </div>
              
              <div className="role-steps">
                {allSteps.slice(0, 2).map((step, index) => (
                  <div key={step.id} className={`overview-step ${step.persona}`}>
                    <div className="overview-step-header">
                      <div className="overview-step-number">{step.id}</div>
                      <div className="overview-step-info">
                        <div className="overview-step-icon">{step.icon}</div>
                        <div className="overview-step-text">
                          <h4 className="overview-step-title">{step.title}</h4>
                          <p className="overview-step-description">{step.description}</p>
                          <span className="overview-step-duration">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overview-step-content">
                      <div className="overview-mockup">
                        {step.component}
                      </div>
                      <div className="overview-explanation">
                        <p>{step.content}</p>
                      </div>
                    </div>
                    
                    {/* 1-2단계 사이의 화살표 */}
                    {index < 1 && (
                      <div className="step-connector">
                        <div className="connector-line"></div>
                        <div className="connector-arrow">↓</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 섹션 구분선 */}
            <div className="section-divider">
              <div className="divider-line"></div>
              <div className="divider-icon">📬</div>
              <div className="divider-text">편지가 배달됩니다</div>
            </div>

            {/* 수신자 섹션 (3-5단계) */}
            <div className="role-section receiver-section">
              <div className="role-section-header">
                <div className="role-icon">📱</div>
                <div className="role-info">
                  <h3 className="role-title">받는 사람이 경험할 일</h3>
                  <p className="role-description">편지를 받고 확인하는 단계입니다</p>
                </div>
                <div className="role-badge receiver-badge">📥 수신자</div>
              </div>
              
              <div className="role-steps">
                {allSteps.slice(2).map((step, index) => (
                  <div key={step.id} className={`overview-step ${step.persona}`}>
                    <div className="overview-step-header">
                      <div className="overview-step-number">{step.id}</div>
                      <div className="overview-step-info">
                        <div className="overview-step-icon">{step.icon}</div>
                        <div className="overview-step-text">
                          <h4 className="overview-step-title">{step.title}</h4>
                          <p className="overview-step-description">{step.description}</p>
                          <span className="overview-step-duration">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overview-step-content">
                      <div className="overview-mockup">
                        {step.id === 5 ? (
                          // 5단계는 성공/실패 토글 포함
                          <div className="overview-step5-container">
                            <div className="overview-result-toggle">
                              <button 
                                className={`overview-toggle-btn ${showSuccess ? 'active success' : ''}`}
                                onClick={() => setShowSuccess(true)}
                              >
                                성공
                              </button>
                              <button 
                                className={`overview-toggle-btn ${!showSuccess ? 'active fail' : ''}`}
                                onClick={() => setShowSuccess(false)}
                              >
                                실패
                              </button>
                            </div>
                            {step.component}
                          </div>
                        ) : (
                          step.component
                        )}
                      </div>
                      <div className="overview-explanation">
                        <p>{step.content}</p>
                      </div>
                    </div>
                    
                    {/* 3-4단계 사이, 4-5단계 사이의 화살표 */}
                    {index < 2 && (
                      <div className="step-connector">
                        <div className="connector-line"></div>
                        <div className="connector-arrow">↓</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="how-it-works-cta">
          <div className="cta-content">
            <h3>이제 직접 체험해보세요!</h3>
            <p>소중한 사람에게 특별한 편지를 보내거나, 받은 편지를 확인해보세요</p>
            <div className="cta-buttons">
              <Link to="/confess" className="cta-button primary">
                <FaEnvelope />
                <span>편지 보내기</span>
                <FaArrowRight className="arrow-icon" />
              </Link>
              <Link to="/check" className="cta-button secondary">
                <FaSearch />
                <span>편지 확인하기</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="how-it-works-footer">
          <div className="feature-highlights">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">
                <h3>완벽한 추리 게임</h3>
                <p>받는 사람이 보낸 사람을 맞춰야만 편지를 열 수 있어요</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div className="feature-text">
                <h3>안전한 비밀 보장</h3>
                <p>틀리면 편지가 완전히 사라져서 비밀이 지켜져요</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💝</div>
              <div className="feature-text">
                <h3>특별한 감동</h3>
                <p>슈로가 직접 배달하는 따뜻하고 특별한 편지 경험</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;