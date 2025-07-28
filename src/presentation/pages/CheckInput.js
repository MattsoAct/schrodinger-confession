import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaSearch,
  FaExclamationTriangle,
  FaLink
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
            <h1 className="schro-title-brand">💌 편지 찾기</h1>
            <p className="schro-compact-subtitle">받은 링크를 입력해서 비밀편지를 확인하세요</p>
          </div>

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