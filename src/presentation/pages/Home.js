import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { 
  FaEnvelope, 
  FaSearch,
  FaTruck,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaHandHoldingHeart
} from 'react-icons/fa';
import { 
  HiSparkles,
  HiMail
} from 'react-icons/hi';
import '../styles/schro-mailcat-system.css';
import '../styles/home-schro.css';
import letterImage from '../../assets/letter.png';
import heroSchroImage from '../../assets/image_schro_delivery.png';
import schroDesignImage from '../../assets/image_schro_standing.png';
import schroLetterImage from '../../assets/image_schro_intobox.png';
import promiseSchroImage from '../../assets/image_schro_inboxlooking.png';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleWriteLetterClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/confess');
    }
  };

  const handleCheckLetterClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/check');
    }
  };

  return (
    <div className="schro-home schro-watercolor-bg">
      {/* Hero Section - 우체부 슈로 등장 */}
      <section className="schro-hero-section">
        <div className="schro-container">
          <div className="schro-hero-content schro-fade-in">
            <div className="schro-hero-character">
              <img 
                src={heroSchroImage} 
                alt="편지 배달원 슈로" 
                className="schro-character schro-character-running"
                loading="eager"
              />
              <div className="schro-bubble schro-hero-bubble">
                안녕하세요! 슈뢰딩거의 고양이 슈로입니다! ⚛️
              </div>
            </div>
            
            <div className="schro-hero-text">
              <h1 className="schro-title-brand schro-main-title">
                슈로의 양자편지함
              </h1>
              <p className="schro-subtitle">
                안전하게 마음을 전하는 특별한 서비스
              </p>
              <p className="schro-text-body schro-hero-description">
                슈로가 당신의 마음을 <strong>비밀 편지</strong>로 배달해드려요!<br />
                상대방이 당신의 <strong>이름을 맞혀야</strong>만 편지가 열립니다 ⚛️
              </p>
            </div>

            <div className="schro-hero-actions">
              <button 
                onClick={handleWriteLetterClick}
                className="schro-btn schro-btn-primary schro-btn-large"
              >
                <FaEnvelope />
                💌 양자 편지 보내기
              </button>
              <button 
                onClick={handleCheckLetterClick}
                className="schro-btn schro-btn-secondary schro-btn-large"
              >
                <FaSearch />
                🔍 편지 확인하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SchRo 소개 섹션 */}
      <section className="schro-intro-section">
        <div className="schro-container">
          <div className="schro-intro-content">
            <div className="schro-intro-character">
              <img 
                src={schroDesignImage} 
                alt="슈로 캐릭터" 
                className="schro-character schro-bounce-in"
                loading="lazy"
              />
            </div>
            
            <div className="schro-intro-text">
              <h2 className="schro-title-section">
                슈로가 지켜주는 특별한 마음 전하기
              </h2>
              
              <div className="schro-intro-features">
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="schro-feature-content">
                    <h3>안전한 감정표현</h3>
                    <p>거절이나 어색함을 두려워하지 않고<br />익명성을 보장하면서 마음을 전할 수 있어요</p>
                  </div>
                </div>
                
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaHeart />
                  </div>
                  <div className="schro-feature-content">
                    <h3>온전한 진심 전달</h3>
                    <p>상대와 마음이 통해야만 편지가 전달돼요.<br />상대방에게 온전한 마음 전달이 가능합니다</p>
                  </div>
                </div>
                
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaHandHoldingHeart />
                  </div>
                  <div className="schro-feature-content">
                    <h3>관계의 존중</h3>
                    <p>상대방이 준비되지 않았다면 부담 없이 관계를 그대로 유지할 수 있어요.<br />비폭력적이고 자연스러운 감정 전달 방식입니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 편지 여행 과정 */}
      <section className="schro-journey-section">
        <div className="schro-container">
          <h2 className="schro-title-section schro-center">
            ⚛️ 슈로와 함께하는 양자 편지 여행
          </h2>
          
          <div className="schro-journey-steps">
            <div className="schro-journey-step">
              <div className="schro-step-number">1</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <img src={letterImage} alt="편지 작성" className="schro-step-image" loading="lazy" />
                </div>
                <h3>양자 편지 생성</h3>
                <p>편지를 작성해 주세요.<br />슈로가 배달을 준비합니다.</p>
              </div>
            </div>
            
            <div className="schro-journey-arrow">→</div>
            
            <div className="schro-journey-step">
              <div className="schro-step-number">2</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <img src={heroSchroImage} alt="슈로 픽업" className="schro-step-image" loading="lazy" />
                </div>
                <h3>편지 봉인</h3>
                <p>슈로가 편지를 안전하게<br />비밀 상자에 넣어 봉인해요.</p>
              </div>
            </div>
            
            <div className="schro-journey-arrow">→</div>
            
            <div className="schro-journey-step">
              <div className="schro-step-number">3</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <div className="schro-delivery-box">
                    <FaClock />
                  </div>
                </div>
                <h3>편지 배달</h3>
                <p>비밀 상자가 상대방에게<br />순간이동하듯 전달됩니다.</p>
              </div>
            </div>
            
            <div className="schro-journey-arrow">→</div>
            
            <div className="schro-journey-step">
              <div className="schro-step-number">4</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <div className="schro-magic-moment">✨</div>
                </div>
                <h3>편지 열기</h3>
                <p>상대가 당신을 떠올리면<br />비밀상자가 열리고 편지가 전해져요!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 체험 섹션 */}
      <section className="schro-demo-section">
        <div className="schro-container">
          <div className="schro-demo-header">
            <h2 className="schro-title-section schro-center">
              지금 바로 슈로의 편지배달 서비스를 체험해보세요! 
            </h2>
            <div className="schro-demo-character">
              <img 
                src={schroLetterImage} 
                alt="슈로와 편지" 
                className="schro-character"
                loading="lazy"
              />
              <div className="schro-bubble schro-demo-bubble">
                상대방의 마음이 궁금하다면, 지금 바로 편지를 써보세요! 😸💌
              </div>
            </div>
          </div>
          
          <div className="schro-demo-cards">
            <div className="schro-demo-card schro-demo-write" onClick={handleWriteLetterClick}>
              <div className="schro-demo-preview">
                <img src={letterImage} alt="편지 쓰기" className="schro-demo-image" loading="lazy" />
                <div className="schro-demo-overlay">
                  <FaEnvelope />
                </div>
              </div>
              <div className="schro-demo-content">
                <h3>첫 번째 양자 편지 써보기</h3>
                <p>마음을 담은 편지를 보내보세요.<br />슈로가 비밀스럽게 전해드려요.</p>
                <button className="schro-btn schro-btn-primary">
                  <HiSparkles />
                  💌 양자 편지 쓰러 가기
                </button>
              </div>
            </div>
            
            <div className="schro-demo-card schro-demo-receive" onClick={handleCheckLetterClick}>
              <div className="schro-demo-preview">
                <div className="schro-mystery-envelope">
                  <div className="schro-envelope-front">?</div>
                  <div className="schro-envelope-seal">❤️</div>
                </div>
                <div className="schro-demo-overlay">
                  <FaSearch />
                </div>
              </div>
              <div className="schro-demo-content">
                <h3>양자 편지 확인하기</h3>
                <p>누군가로부터 받은 편지가 있나요?<br />보낸 사람을 맞혀서 마음이 통하는지 확인해 보세요!</p>
                <button className="schro-btn schro-btn-secondary">
                  <HiMail />
                  🔬 편지 확인하러 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 슈로의 약속 */}
      <section className="schro-promise-section">
        <div className="schro-container">
          <div className="schro-promise-content">
            <div className="schro-promise-character">
                            <div className="schro-bubble schro-promise-bubble">
                슈로가 꼭 지켜줄게요! ⚛️🐾
              </div>
              <img 
                src={promiseSchroImage} 
                alt="약속하는 슈로" 
                className="schro-character"
                loading="lazy"
              />

            </div>
            
            <div className="schro-promise-list">

              <div className="schro-promises">
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">🔒</div>
                  <div>
                    <h4>완벽한 비밀 보안</h4>
                    <p>누가 보냈는지 상대가 맞히기 전까지<br />편지는 안전하게 잠겨 있어요.</p>
                  </div>
                </div>
                
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">⚡</div>
                  <div>
                    <h4>기회는 단 한번!</h4>
                    <p>상대가 당신을 떠올리지 못하면<br />편지는 조용히 사라집니다.</p>
                  </div>
                </div>
                
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">💝</div>
                  <div>
                    <h4>마음 연결</h4>
                    <p>당신과 상대의 마음이 통하면<br />상자 속 편지가 열리고 진심이 전해져요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;