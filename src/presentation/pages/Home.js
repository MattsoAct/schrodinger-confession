import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { 
  FaEnvelope, 
  FaSearch,
  FaTruck,
  FaHeart,
  FaShieldAlt,
  FaClock
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
import promiseSchroImage from '../../assets/image_schro_standing.png';

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
                SchRo 양자편지함
              </h1>
              <p className="schro-subtitle">
                양자역학의 마법으로 마음을 전하는 특별한 서비스
              </p>
              <p className="schro-text-body schro-hero-description">
                슈로가 편지를 <strong>중첩 상태</strong>로 배달해드려요!<br />
                상대방이 당신의 이름을 맞혀야만 편지가 <strong>실체화</strong>됩니다 ⚛️
              </p>
            </div>

            <div className="schro-hero-actions">
              <button 
                onClick={handleWriteLetterClick}
                className="schro-btn schro-btn-primary schro-btn-large"
              >
                <FaEnvelope />
                ⚛️ 양자 편지 보내기
              </button>
              <button 
                onClick={handleCheckLetterClick}
                className="schro-btn schro-btn-secondary schro-btn-large"
              >
                <FaSearch />
                🔬 편지 관측하기
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
                양자역학 편지 전문가 슈로를 소개합니다!
              </h2>
              
              <div className="schro-intro-features">
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaTruck />
                  </div>
                  <div className="schro-feature-content">
                    <h3>24시간 양자 배송</h3>
                    <p>슈로는 언제나 중첩 상태로 대기 중이에요! 편지를 양자 상태로 즉시 배송 시작!</p>
                  </div>
                </div>
                
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="schro-feature-content">
                    <h3>100% 양자 보안</h3>
                    <p>관측하지 않으면 편지는 존재하지도 않아요. 오직 정확한 관측만이 편지를 실체화시킵니다!</p>
                  </div>
                </div>
                
                <div className="schro-feature">
                  <div className="schro-feature-icon">
                    <FaHeart />
                  </div>
                  <div className="schro-feature-content">
                    <h3>마음의 양자 얽힘</h3>
                    <p>단순한 배송이 아니라, 양자 얽힘으로 당신과 상대방의 마음을 연결해드려요!</p>
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
                <p>마음을 담아 편지를 써주세요.<br />슈로가 중첩 상태로 준비할게요!</p>
              </div>
            </div>
            
            <div className="schro-journey-arrow">→</div>
            
            <div className="schro-journey-step">
              <div className="schro-step-number">2</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <img src={heroSchroImage} alt="슈로 픽업" className="schro-step-image" loading="lazy" />
                </div>
                <h3>슈뢰딩거의 상자</h3>
                <p>슈로가 편지를 양자 상자에 넣어<br />중첩 상태로 봉인해드려요</p>
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
                <h3>양자 터널링</h3>
                <p>편지가 양자 터널을 통해<br />순간이동으로 배달돼요</p>
              </div>
            </div>
            
            <div className="schro-journey-arrow">→</div>
            
            <div className="schro-journey-step">
              <div className="schro-step-number">4</div>
              <div className="schro-step-content">
                <div className="schro-step-icon">
                  <div className="schro-magic-moment">✨</div>
                </div>
                <h3>파동함수 붕괴!</h3>
                <p>받는 사람이 당신의 이름을 맞히면<br />편지가 실체화되어 마음이 전달돼요!</p>
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
              지금 바로 양자역학을 체험해보세요! 
            </h2>
            <div className="schro-demo-character">
              <img 
                src={schroLetterImage} 
                alt="슈로와 편지" 
                className="schro-character"
                loading="lazy"
              />
              <div className="schro-bubble schro-demo-bubble">
                양자역학이 궁금하신가요? 한번 해보세요! ⚛️😸
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
                <p>소중한 사람에게 마음을 전해보세요.<br />슈로가 중첩 상태로 배달해드릴게요!</p>
                <button className="schro-btn schro-btn-primary">
                  <HiSparkles />
                  ⚛️ 양자 편지 쓰러 가기
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
                <h3>양자 편지 관측하기</h3>
                <p>누군가가 보낸 편지가 있나요?<br />보낸 사람을 맞혀서 파동함수를 붕괴시켜보세요!</p>
                <button className="schro-btn schro-btn-secondary">
                  <HiMail />
                  🔬 편지 관측하러 가기
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
              <img 
                src={promiseSchroImage} 
                alt="약속하는 슈로" 
                className="schro-character"
                loading="lazy"
              />
              <div className="schro-bubble schro-promise-bubble">
                슈뢰딩거의 고양이가 약속드려요! ⚛️🐾
              </div>
            </div>
            
            <div className="schro-promise-list">
              <h2 className="schro-title-section">슈로의 양자 약속</h2>
              
              <div className="schro-promises">
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">🔒</div>
                  <div>
                    <h4>완벽한 양자 보안</h4>
                    <p>모든 편지는 중첩 상태로 보관되어 관측하지 않으면 존재하지 않습니다</p>
                  </div>
                </div>
                
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">⚡</div>
                  <div>
                    <h4>즉시 양자 배송</h4>
                    <p>슈로는 24시간 중첩 상태로 언제나 대기하고 있어요</p>
                  </div>
                </div>
                
                <div className="schro-promise-item">
                  <div className="schro-promise-icon">💝</div>
                  <div>
                    <h4>양자 얽힘 보장</h4>
                    <p>당신과 상대방의 마음이 양자 얽힘으로 연결될 때까지!</p>
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