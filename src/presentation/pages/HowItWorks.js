import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaSearch, FaCreditCard, FaArrowRight, FaHeart, FaSadTear } from 'react-icons/fa';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import schroDesignImage from '../../assets/image_schro_standing.png';
import Step1Mockup from '../components/mockups/Step1Mockup';
import Step2Mockup from '../components/mockups/Step2Mockup';
import Step3Mockup from '../components/mockups/Step3Mockup';
import Step4Mockup from '../components/mockups/Step4Mockup';
import Step5Mockup from '../components/mockups/Step5Mockup';
import Step5SuccessMockup from '../components/mockups/Step5SuccessMockup';
import '../styles/schro-mailcat-system.css';
import '../styles/how-it-works-schro.css';

function HowItWorks() {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(true);
  const [currentResult, setCurrentResult] = useState('success'); // 'success' | 'fail'
  
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
        message={`${previewData.receiverName} 안녕! 나 ${previewData.senderName}야🐱
특별한 마음을 전하고
싶어서 편지 써봤어! 💕
매일매일 행복하길 바라~
사랑하는 ${previewData.senderName}가 ❤️`}
        hint={previewData.hint}
        isPreview={previewData.isPreview}
        isCompact={false}
      />,
      icon: <FaEnvelope />,
      content: "💝 특별한 사람에게 전하고 싶은 마음을 편지로 써보세요. 받는 사람이 쉽게 맞출 수 있는 힌트도 함께 준비해주세요. 약 3분이면 완성!",
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
        isCompact={false}
      />,
      icon: <FaCreditCard />,
      content: "💳 슈로가 당신의 편지를 특별하게 배달해드려요! 상대방이 SMS로 편지 도착 알림을 받고, 이름을 맞춰야만 열 수 있는 스릴 넘치는 경험을 선물하세요.",
      persona: "sender",
      personaLabel: "📝 보내는 사람"
    },
    {
      id: 3,
      title: "3단계: 문자 알림 받기",
      description: "받는 사람에게 신비한 편지가 도착했어요!",
      duration: "즉시 전송",
      component: <Step3Mockup isCompact={false} receiverName={previewData.receiverName} />,
      icon: <HiOutlineDeviceMobile />,
      content: "📱 'SchRo편지'에서 보낸 문자 메시지로 편지 도착을 알려드려요! '누가 보냈을까?' 하는 호기심을 자극하며, 편지를 확인할 수 있는 링크가 함께 전송됩니다.",
      persona: "receiver",
      personaLabel: "📱 받는 사람"
    },
    {
      id: 4,
      title: "4단계: 편지 확인하기",
      description: "누가 보냈는지 맞춰야 열 수 있어요",
      duration: "약 2분 소요",
      component: <Step4Mockup isCompact={false} hint={previewData.hint} receiverName={previewData.receiverName} />,
      icon: <FaSearch />,
      content: "🔍 힌트를 보고 보낸 사람의 이름을 맞춰야 편지를 열 수 있어요! 단 한 번의 기회만 있으니 신중하게 생각해보세요. 틀리면 편지는 영원히 사라집니다! 🤔💭",
      persona: "receiver", 
      personaLabel: "📱 받는 사람"
    },
    {
      id: 5,
      title: "5단계: 실패한 경우",
      description: "이름을 틀려서 편지가 사라졌어요",
      duration: "즉시 결과",
      component: <Step5Mockup isCompact={false} receiverName={previewData.receiverName} wrongGuess="링고" />,
      icon: <FaSadTear />,
      content: "😢 아쉬워요... 이름을 틀렸어요. 편지는 영원히 사라지고 비밀은 지켜집니다. 하지만 이것도 SchRo의 특별한 경험이에요! 🌙✨",
      persona: "result-fail",
      personaLabel: "😢 실패 결과"
    },
    {
      id: 6,
      title: "6단계: 성공한 경우",
      description: "정답을 맞춰서 편지를 열었어요!",
      duration: "즉시 결과",
      component: <Step5SuccessMockup isCompact={false} />,
      icon: <FaHeart />,
      content: "🎉 축하해요! 정답을 맞춰서 편지가 열렸어요! 소중한 마음이 성공적으로 전달되었습니다. 이 특별한 순간을 영원히 기억하세요! ✨💕",
      persona: "result-success",
      personaLabel: "🎉 성공 결과"
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
총 6단계로 이루어진 간단한 과정입니다. 
            처음 2단계는 <span className="highlight-sender">편지를 보내는 분</span>이, 
3-4단계는 <span className="highlight-receiver">편지를 받는 분</span>이, 
            5-6단계는 결과에 따른 다른 경험을 하게 됩니다.
          </p>
        </div>

        {/* Main Content - 2열 컴팩트 레이아웃 */}
        <div className="overview-mode">
          <div className="overview-container">
            {/* 첫 번째 행: 1-2단계 (보내는 사람) */}
            <div className="steps-row sender-row">
              <div className="row-header">
                <div className="role-icon">📝</div>
                <div className="role-info">
                  <h3 className="role-title">보내는 사람이 할 일</h3>
                  <p className="role-description">편지를 작성하고 결제하는 단계입니다</p>
                </div>
                <div className="role-badge sender-badge">📤 발신자</div>
              </div>
              
              <div className="steps-horizontal">
                {allSteps.slice(0, 2).map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`compact-step ${step.persona}`}>
                      <div className="compact-step-header">
                        <div className="compact-step-number">{step.id}</div>
                        <div className="compact-step-icon">{step.icon}</div>
                        <div className="compact-step-text">
                          <h4 className="compact-step-title">{step.title}</h4>
                          <p className="compact-step-description">{step.description}</p>
                          <span className="compact-step-duration">{step.duration}</span>
                        </div>
                      </div>
                      
                      <div className="compact-step-content">
                        <div className="compact-mockup">
                          {step.component}
                        </div>
                        <div className="compact-explanation">
                          <p>{step.content}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 1-2단계 사이의 화살표 */}
                    {index < 1 && (
                      <div className="horizontal-connector">
                        <div className="horizontal-arrow">→</div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 행 구분선 */}
            <div className="row-divider">
              <div className="divider-line"></div>
              <div className="divider-icon">📬</div>
              <div className="divider-text">편지가 배달됩니다</div>
              <div className="divider-arrow">↓</div>
            </div>

            {/* 두 번째 행: 3-4단계 (받는 사람) */}
            <div className="steps-row receiver-row">
              <div className="row-header">
                <div className="role-icon">📱</div>
                <div className="role-info">
                  <h3 className="role-title">받는 사람이 경험할 일</h3>
                  <p className="role-description">편지를 받고 확인하는 단계입니다</p>
                </div>
                <div className="role-badge receiver-badge">📥 수신자</div>
              </div>
              
              <div className="steps-horizontal">
                {allSteps.slice(2, 4).map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`compact-step ${step.persona}`}>
                      <div className="compact-step-header">
                        <div className="compact-step-number">{step.id}</div>
                        <div className="compact-step-icon">{step.icon}</div>
                        <div className="compact-step-text">
                          <h4 className="compact-step-title">{step.title}</h4>
                          <p className="compact-step-description">{step.description}</p>
                          <span className="compact-step-duration">{step.duration}</span>
                        </div>
                      </div>
                      
                      <div className="compact-step-content">
                        <div className="compact-mockup">
                          {step.component}
                        </div>
                        <div className="compact-explanation">
                          <p>{step.content}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 3-4단계 사이의 화살표 */}
                    {index < 1 && (
                      <div className="horizontal-connector">
                        <div className="horizontal-arrow">→</div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 결과 구분선 */}
            <div className="result-divider">
              <div className="divider-line"></div>
              <div className="divider-icon">🎯</div>
              <div className="divider-text">이름 맞추기 결과에 따라...</div>
              <div className="divider-arrow">↓</div>
            </div>

            {/* 세 번째 행: 5-6단계 (결과) */}
            <div className="steps-row result-row">
              <div className="row-header">
                <div className="role-icon">🎭</div>
                <div className="role-info">
                  <h3 className="role-title">결과에 따른 다른 경험</h3>
                  <p className="role-description">이름을 맞추는지에 따라 달라지는 결말</p>
                </div>
                <div className="role-badge result-badge">🎯 결과</div>
              </div>
              
              <div className="steps-horizontal">
                {allSteps.slice(4).map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`compact-step ${step.persona}`}>
                      <div className="compact-step-header">
                        <div className="compact-step-number">{step.id}</div>
                        <div className="compact-step-icon">{step.icon}</div>
                        <div className="compact-step-text">
                          <h4 className="compact-step-title">{step.title}</h4>
                          <p className="compact-step-description">{step.description}</p>
                          <span className="compact-step-duration">{step.duration}</span>
                        </div>
                      </div>
                      
                      <div className="compact-step-content">
                        <div className="compact-mockup">
                          {step.component}
                        </div>
                        <div className="compact-explanation">
                          <p>{step.content}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 5-6단계 사이의 VS 표시 */}
                    {index < 1 && (
                      <div className="horizontal-connector vs-connector">
                        <div className="vs-text">VS</div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="how-it-works-cta">
          <div className="cta-content">
            <h3>💕 특별한 추억을 만들어보세요!</h3>
            <p>지금 바로 시작해서 소중한 사람에게 잊지 못할 서프라이즈를 선물하세요!<br/>
            <strong>매일 수많은 분들이 슈로 편지로 마음을 전하고 있어요 ✨</strong></p>
            <div className="cta-buttons">
              <Link to="/confess" className="cta-button primary">
                <FaEnvelope />
                <span>💝 특별한 편지 보내기</span>
                <FaArrowRight className="arrow-icon" />
              </Link>
              <Link to="/check" className="cta-button secondary">
                <FaSearch />
                <span>📬 받은 편지 확인하기</span>
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