import { Link } from 'react-router-dom';
import schroDesignImage from '../../assets/image_schro_standing.png';
import letterInMouthImage from '../../assets/image_schro_standing.png';
import iconCheck from '../../assets/icon_check.png';
import iconLock from '../../assets/icon_lock.png';
import '../styles/schro-mailcat-system.css';
import '../styles/about-schro.css';

function About() {
  return (
    <div className="schro-about-page">
      <div className="schro-about-container">
        {/* 히어로 섹션 - 슈뢰딩거의 고양이 컨셉 */}
        <div className="schro-about-hero">
          <div className="schro-about-floating-particles">⚛️</div>
          <div className="schro-about-floating-particles">📮</div>
          <div className="schro-about-floating-particles">💫</div>
          <div className="schro-about-floating-particles">🔮</div>
          
          <div className="schro-about-hero-character">
            <img src={schroDesignImage} alt="슈뢰딩거의 고양이 슈로" />
            <div className="schro-about-quantum-box"></div>
          </div>
          <h1 className="schro-about-hero-title">
            안녕하세요! 슈뢰딩거의 고양이 <span className="schro-highlight">슈로</span>입니다
          </h1>
          <p className="schro-about-hero-subtitle">
            양자역학의 마법으로 <strong>"보냈지만 안 보낸" 상태의</strong> 신비한 편지를 배달해요
          </p>
          <div className="schro-about-quantum-state">
            <div className="schro-about-state-indicator">
              <span className="schro-about-state-box">📦</span>
              <span className="schro-about-state-text">이름을 맞히기 전까지는 누가 보냈는지 아무도 몰라요</span>
            </div>
          </div>
        </div>

        {/* 양자역학적 원리 설명 */}
        <div className="schro-about-quantum-principle">
          <div className="schro-about-principle-header">
            <h2 className="schro-about-principle-title">
              <span className="schro-about-quantum-icon">⚛️</span>
              슈뢰딩거의 편지 원리
            </h2>
            <p className="schro-about-principle-subtitle">
              양자역학의 "관측 효과"를 편지에 적용했어요. 관측(이름 맞히기) 전까지는 편지가 보내진 것도 아니고 안 보내진 것도 아닌 상태예요
            </p>
          </div>
          
          <div className="schro-about-principle-visual">
            <div className="schro-about-quantum-states">
              <div className="schro-about-state-before">
                <div className="schro-about-state-icon">📦❓</div>
                <h4>중첩 상태</h4>
                <p><strong>"보냄"과 "안 보냄"</strong>이 동시에 존재하는 양자 상태</p>
              </div>
              <div className="schro-about-state-arrow">→</div>
              <div className="schro-about-state-after">
                <div className="schro-about-state-icon">💌✨</div>
                <h4>관측(이름 맞히기)</h4>
                <p>정확한 관측으로 <strong>편지가 실체화</strong>되어요</p>
              </div>
            </div>
          </div>
        </div>

        {/* 양쪽 모두의 안전한 효용 */}
        <div className="schro-about-benefits">
          <h2 className="schro-about-benefits-title">
            🌟 양자역학이 주는 특별한 효용
          </h2>
          
          <div className="schro-about-benefit-cards">
            <div className="schro-about-benefit-card schro-about-sender-benefit">
              <div className="schro-about-benefit-header">
                <div className="schro-about-benefit-icon">👤</div>
                <h3>편지를 보내는 당신</h3>
              </div>
              <div className="schro-about-benefit-content">
                <div className="schro-about-benefit-point">
                  <span className="schro-about-point-icon">⚛️</span>
                  <div>
                    <strong>양자 중첩 상태의 안전함</strong> - 관측 전까지는 상대방이 누가 보냈는지 절대 모름
                  </div>
                </div>
                <div className="schro-about-benefit-point">
                  <span className="schro-about-point-icon">🎭</span>
                  <div>
                    <strong>슈뢰딩거의 익명성</strong> - 마음이 통하지 않으면 영원히 양자 상태로 남아있어요
                  </div>
                </div>
                <div className="schro-about-benefit-highlight">
                  "관측이 일어나지 않으면 편지는 존재하지도 않았던 것처럼 사라져요"
                </div>
              </div>
            </div>

            <div className="schro-about-benefit-card schro-about-receiver-benefit">
              <div className="schro-about-benefit-header">
                <div className="schro-about-benefit-icon">💝</div>
                <h3>편지를 받는 당신</h3>
              </div>
              <div className="schro-about-benefit-content">
                <div className="schro-about-benefit-point">
                  <span className="schro-about-point-icon">🕊️</span>
                  <div>
                    <strong>비폭력적 고백 시스템</strong> - 관측에 실패하면 자연스럽게 양자 상태로 돌아가요
                  </div>
                </div>
                <div className="schro-about-benefit-point">
                  <span className="schro-about-point-icon">🔬</span>
                  <div>
                    <strong>양자 관측의 재미</strong> - 누가 보냈을지 추리하는 과학적 게임
                  </div>
                </div>
                <div className="schro-about-benefit-highlight">
                  "관측하지 않으면 아무 일도 일어나지 않았던 것과 같아요"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 실제 사용 시나리오 */}
        <div className="schro-about-scenarios">
          <h2 className="schro-about-scenarios-title">
            💡 이런 상황에서 써보세요
          </h2>
          
          <div className="schro-about-scenario-cards">
            <div className="schro-about-scenario-card">
              <div className="schro-about-scenario-header">
                <span className="schro-about-scenario-emoji">💕</span>
                <h3>첫사랑 고백</h3>
              </div>
              <div className="schro-about-scenario-content">
                <p><strong>상황:</strong> 좋아하는 선배가 있지만 거절당할까 봐 무서워요</p>
                <p><strong>슈로로 해결:</strong> 익명으로 편지를 보내고, 선배가 내 이름을 떠올릴 정도라면 편지가 열려요</p>
                <p><strong>좋은 점:</strong> 마음이 안 통해도 누가 보냈는지 모르니까 전혀 어색하지 않아요</p>
              </div>
            </div>
            
            <div className="schro-about-scenario-card">
              <div className="schro-about-scenario-header">
                <span className="schro-about-scenario-emoji">💼</span>
                <h3>직장 동료</h3>
              </div>
              <div className="schro-about-scenario-content">
                <p><strong>상황:</strong> 회사 동료가 좋지만 직장에서 고백하기엔 부담스러워요</p>
                <p><strong>슈로로 해결:</strong> 완전 익명으로 편지를 보내고, 상대방이 내 이름을 맞힐 정도로 관심이 있다면 열려요</p>
                <p><strong>좋은 점:</strong> 직장 분위기를 망칠 걱정 없이 안전하게 마음을 전할 수 있어요</p>
              </div>
            </div>
            
            <div className="schro-about-scenario-card">
              <div className="schro-about-scenario-header">
                <span className="schro-about-scenario-emoji">🌸</span>
                <h3>오랜 친구</h3>
              </div>
              <div className="schro-about-scenario-content">
                <p><strong>상황:</strong> 오랜 친구가 좋아졌는데 우정이 깨질까 봐 걱정돼요</p>
                <p><strong>슈로로 해결:</strong> 친구 관계를 유지하면서 조심스럽게 마음을 테스트해볼 수 있어요</p>
                <p><strong>좋은 점:</strong> 마음이 안 통해도 우정은 그대로, 통한다면 자연스럽게 발전할 수 있어요</p>
              </div>
            </div>
          </div>
        </div>

        {/* 양자역학적 사용법 안내 */}
        <div className="schro-about-howto">
          <h2 className="schro-about-howto-title">
            ⚛️ 양자 편지는 어떻게 작동하나요?
          </h2>
          <div className="schro-about-steps">
            <div className="schro-about-step">
              <div className="schro-about-step-number">1</div>
              <div className="schro-about-step-icon">⚛️</div>
              <h3 className="schro-about-step-title">양자 편지 생성</h3>
              <p className="schro-about-step-description">
                마음을 담아 편지를 작성하면 중첩 상태의 양자 편지가 생성돼요<br/>
                <small>💫 이 순간부터 "보냄+안보냄" 상태</small>
              </p>
            </div>
            <div className="schro-about-step">
              <div className="schro-about-step-number">2</div>
              <div className="schro-about-step-icon">📦</div>
              <h3 className="schro-about-step-title">슈뢰딩거의 상자 배달</h3>
              <p className="schro-about-step-description">
                슈로가 양자 편지를 상자에 담아 상대방에게 배달해요<br/>
                <small>🔮 열어보기 전까지는 비밀</small>
              </p>
            </div>
            <div className="schro-about-step">
              <div className="schro-about-step-number">3</div>
              <div className="schro-about-step-icon">🔬</div>
              <h3 className="schro-about-step-title">관측 시도</h3>
              <p className="schro-about-step-description">
                받는 사람이 보낸 사람의 이름을 입력해서 관측해요<br/>
                <small>⚡ 바로 이것이 "관측 행위"</small>
              </p>
            </div>
            <div className="schro-about-step">
              <div className="schro-about-step-number">4</div>
              <div className="schro-about-step-icon">💌</div>
              <h3 className="schro-about-step-title">파동함수 붕괴</h3>
              <p className="schro-about-step-description">
                정확한 관측으로 편지가 실체화되거나, 틀리면 영원히 양자 상태로 남아요<br/>
                <small>✨ 마음이 통해야만 관측 가능</small>
              </p>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="schro-about-cta">
          <div className="schro-about-cta-character">
            <img src={letterInMouthImage} alt="편지를 배달하는 슈뢰딩거의 고양이 슈로" />
            <div className="schro-about-cta-quantum-effect"></div>
          </div>
          <h2 className="schro-about-cta-title">
            이제 양자역학의 힘으로 안전하게 마음을 전해보세요
          </h2>
          <p className="schro-about-cta-description">
            슈뢰딩거의 고양이 슈로가 당신의 마음을 <strong>양자 상태</strong>로 배달해드려요
          </p>
          <div className="schro-about-cta-benefits-quick">
            <span>⚛️ 양자 중첩 상태 보장</span>
            <span>🔬 관측하지 않으면 비밀</span>
            <span>💫 마음이 통해야만 실체화</span>
          </div>
          <div className="schro-about-cta-buttons">
            <Link to="/confess" className="schro-about-cta-button schro-about-cta-button-primary">
              ⚛️ 양자 편지 보내기
            </Link>
            <Link to="/check" className="schro-about-cta-button schro-about-cta-button-secondary">
              🔬 편지 관측하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;