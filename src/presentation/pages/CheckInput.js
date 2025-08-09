import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaSearch,
  FaExclamationTriangle,
  FaLink,
  FaHeart,
  FaInfoCircle,
  FaPlayCircle,
  FaMobileAlt,
  FaShieldAlt,
  FaGift
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { AlertModal } from '../components/Modal';
import schroDesignImage from '../../assets/image_schro_standing.png';
import letterInMouthImage from '../../assets/image_schro_standing.png';
import '../styles/schro-mailcat-system.css';
import '../styles/check-input-schro.css';

function CheckInput() {
  const [inputValue, setInputValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: '' });
  const [activeTab, setActiveTab] = useState('check'); // 'check', 'about', 'howitworks'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    let id = trimmedValue;
    
    // 사용자가 전체 URL을 붙여넣었을 경우, ID만 추출합니다.
    try {
      if (trimmedValue.startsWith('http')) {
        const url = new URL(trimmedValue);
        const pathParts = url.pathname.split('/');
        // /check/ 다음에 오는 것이 ID라고 가정합니다.
        const checkIndex = pathParts.indexOf('check');
        if (checkIndex > -1 && pathParts.length > checkIndex + 1) {
          id = pathParts[checkIndex + 1];
        }
      }
    } catch (error) {
      // 유효하지 않은 URL 형식일 경우, 입력값 그대로를 ID로 사용합니다.
      console.warn('Could not parse URL, using raw input value.', error);
      id = trimmedValue;
    }

    if (id) {
      navigate(`/check/${id}`);
    } else {
      setAlertModal({ isOpen: true, message: '유효하지 않은 링크 또는 코드입니다. 받은 링크를 그대로 붙여넣거나 고유 코드를 입력해주세요.' });
    }
  };

  // 탭 콘텐츠 렌더링 함수들
  const renderCheckTab = () => (
    <div className="schro-tab-content">
      {/* 메인 입력 폼 */}
      <div className="schro-card schro-compact-card">
        <form onSubmit={handleSubmit} className="schro-compact-form">
          <div className="schro-form-group">
            <label className="schro-form-label">
              <FaLink />
              편지 링크 또는 코드
            </label>
            
            <div className="schro-input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="https://... 또는 편지코드"
                className="schro-form-input schro-link-input"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                required
              />
              <HiSparkles className="schro-input-icon" />
            </div>
          </div>

          <button type="submit" className="schro-btn schro-btn-primary schro-btn-large">
            <FaSearch />
            편지 확인하기
          </button>
        </form>

        {/* 간단한 도움말 */}
        <div className="schro-compact-help">
          <FaExclamationTriangle className="schro-help-icon" />
          <span>카카오톡, 문자, 이메일로 받은 링크를 붙여넣으세요</span>
        </div>
      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="schro-tab-content">
      <div className="schro-card schro-about-card">
        <div className="schro-about-header">
          <img 
            src={schroDesignImage} 
            alt="슈로 캐릭터" 
            className="schro-about-character"
          />
          <div className="schro-about-intro">
            <h2>💌 슈로(SchRo)를 소개합니다</h2>
            <p className="schro-about-tagline">당신의 비밀을 안전하게 전달하는 우체부 고양이</p>
          </div>
        </div>

        <div className="schro-about-features">
          <div className="schro-feature-item">
            <FaHeart className="schro-feature-icon heart" />
            <div className="schro-feature-content">
              <h3>마음을 담은 편지</h3>
              <p>직접 말하기 어려운 마음을 편지로 전달해보세요. 슈로가 당신의 마음을 정성스럽게 전해드립니다.</p>
            </div>
          </div>

          <div className="schro-feature-item">
            <FaShieldAlt className="schro-feature-icon shield" />
            <div className="schro-feature-content">
              <h3>안전한 비밀 유지</h3>
              <p>편지를 읽으려면 보낸 사람의 이름을 맞춰야 해요. 진짜 아는 사이에게만 편지가 전달됩니다.</p>
            </div>
          </div>

          <div className="schro-feature-item">
            <FaGift className="schro-feature-icon gift" />
            <div className="schro-feature-content">
              <h3>특별한 경험</h3>
              <p>단순한 메시지가 아닌 특별한 경험을 선물하세요. 받는 사람에게 잊지 못할 순간을 만들어드려요.</p>
            </div>
          </div>
        </div>

        <div className="schro-about-story">
          <h3>🐱 슈로의 이야기</h3>
          <p>
            슈로는 슈뢰딩거의 고양이에서 영감을 받은 특별한 우체부예요. 
            편지가 열리기 전까지는 그 안의 내용이 어떤 결과를 가져올지 아무도 모르죠. 
            그래서 더욱 설레고 특별한 것 같아요.
          </p>
          <p>
            슈로와 함께 소중한 사람에게 마음을 전해보세요. 
            당신의 용기 있는 한 걸음이 아름다운 인연의 시작이 될 수 있어요! ✨
          </p>
        </div>
      </div>
    </div>
  );

  const renderHowItWorksTab = () => (
    <div className="schro-tab-content">
      <div className="schro-card schro-howitworks-card">
        <div className="schro-howitworks-header">
          <FaInfoCircle className="schro-howitworks-icon" />
          <h2>🔍 편지 확인 방법</h2>
          <p>누군가가 당신에게 보낸 비밀편지를 확인하는 방법이에요</p>
        </div>

        <div className="schro-steps">
          <div className="schro-step">
            <div className="schro-step-content">
              <h3>📲 링크로 접속</h3>
              <p>문자나 카카오톡으로 받은 링크를 클릭하거나, 직접 링크를 입력하세요.</p>
              <ul>
                <li>받은 링크를 그대로 붙여넣기</li>
                <li>또는 편지 고유 코드 입력</li>
                <li>링크가 확인되면 편지 페이지로 이동</li>
              </ul>
            </div>
          </div>

          <div className="schro-step">
            <div className="schro-step-content">
              <h3>🤔 힌트 확인하기</h3>
              <p>편지를 보낸 사람이 남긴 힌트를 보고 누가 보냈는지 추측해보세요.</p>
              <ul>
                <li>힌트를 천천히, 여러 번 읽어보기</li>
                <li>보낸 사람과의 추억이나 관계 깊이 생각해보기</li>
                <li>확신이 생길 때까지 충분히 고민하기</li>
              </ul>
            </div>
          </div>

          <div className="schro-step">
            <div className="schro-step-content">
              <h3>⚠️ 이름 맞추기 (단 한 번!)</h3>
              <p><strong>주의: 기회는 딱 한 번뿐!</strong> 신중하게 생각하고 입력하세요.</p>
              <ul>
                <li><strong>한 번만 입력 가능</strong> - 재시도 불가</li>
                <li><strong>틀리면 편지가 영원히 사라져요</strong></li>
                <li>정확한 이름을 입력해야만 편지 확인 가능</li>
                <li>힌트를 다시 한 번 꼼꼼히 읽어보세요</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="schro-privacy-section">
          <h3>🔐 프라이버시 보호</h3>
          <div className="schro-privacy-list">
            <div className="schro-privacy-item">
              <FaShieldAlt className="schro-privacy-icon shield" />
              <div className="schro-privacy-content">
                <h4>완전한 익명성</h4>
                <p><strong>보낸 사람은 당신이 편지를 확인했는지 모릅니다.</strong> 읽었는지, 안 읽었는지 전혀 알 수 없어요.</p>
              </div>
            </div>
            
            <div className="schro-privacy-item">
              <FaGift className="schro-privacy-icon mystery" />
              <div className="schro-privacy-content">
                <h4>시도 결과 비공개</h4>
                <p><strong>이름을 맞췄는지 틀렸는지도 보낸 사람은 모릅니다.</strong> 한 번의 기회로 성공했는지 실패했는지, 당신의 반응은 완전히 비밀이에요.</p>
              </div>
            </div>
            
            <div className="schro-privacy-item">
              <FaHeart className="schro-privacy-icon safe" />
              <div className="schro-privacy-content">
                <h4>안전한 공간</h4>
                <p>부담 없이 편지를 확인하고, 원한다면 조용히 넘어갈 수도 있어요. 선택은 전적으로 당신의 몫입니다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="schro-tips">
          <h3>💡 편지 확인 꿀팁</h3>
          <div className="schro-tip-list">
            <div className="schro-tip-item">
              <FaMobileAlt className="schro-tip-icon" />
              <span><strong>힌트를 꼼꼼히 분석하세요</strong> 한 번의 기회뿐이니 힌트를 여러 번 읽고 신중하게 추측해보세요</span>
            </div>
            <div className="schro-tip-item">
              <FaHeart className="schro-tip-icon" />
              <span><strong>열린 마음으로 생각해보세요</strong> 예상치 못한 사람이 보낸 편지일 수도 있어요</span>
            </div>
            <div className="schro-tip-item">
              <FaPlayCircle className="schro-tip-icon" />
              <span><strong>확신이 들 때까지 기다리세요</strong> 기회는 한 번뿐! 신중하게 결정하세요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="schro-check-input-page schro-watercolor-bg">
      <div className="schro-container">
        <div className="schro-check-input-compact">
          {/* 간결한 헤더 */}
          <div className="schro-compact-header">
            <div className="schro-header-icon">
              <img 
                src={schroDesignImage} 
                alt="우체부 슈로" 
                className="schro-compact-character"
              />
            </div>
            <h1 className="schro-title-brand">💌 슈로의 양자편지함</h1>
            <p className="schro-compact-subtitle">누가 보낸 편지일까 맞춰보세요.<p></p>아마 당신 마음속에 있는 그 사람일거예요.</p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="schro-tab-nav">
            <button 
              className={`schro-tab-btn ${activeTab === 'check' ? 'active' : ''}`}
              onClick={() => setActiveTab('check')}
            >
              <FaEnvelope />
              편지 확인
            </button>
            <button 
              className={`schro-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <FaHeart />
              슈로는?
            </button>
            <button 
              className={`schro-tab-btn ${activeTab === 'howitworks' ? 'active' : ''}`}
              onClick={() => setActiveTab('howitworks')}
            >
              <FaInfoCircle />
              이용방법
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          {activeTab === 'check' && renderCheckTab()}
          {activeTab === 'about' && renderAboutTab()}
          {activeTab === 'howitworks' && renderHowItWorksTab()}
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
        message={alertModal.message}
        type="warning"
        title="입력 오류"
      />
    </div>
  );
}

export default CheckInput; 