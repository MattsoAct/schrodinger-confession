import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { AlertModal } from '../components/Modal';
import schroDesignImage from '../../assets/image_schro_standing.png';
import letterInMouthImage from '../../assets/image_schro_hiding.png';
import iconLetter from '../../assets/icon_letter.png';
import iconCheck from '../../assets/icon_check.png';
import '../styles/schro-mailcat-system.css';
import '../styles/confess-schro.css';

function Confess() {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [letterType, setLetterType] = useState('sms'); // 'sms', 'kakao'

  const [showDelivery, setShowDelivery] = useState(false);
  const [showPreview, setShowPreview] = useState(false);  
  const [previewNameCheck, setPreviewNameCheck] = useState('');
  const [isPreviewVerified, setIsPreviewVerified] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: '' });

  // 미리보기 모달 닫기
  const handleClosePreview = () => {
    setShowPreview(false);
    setIsPreviewVerified(false);
    setPreviewNameCheck('');
  };

  const handlePreviewNameCheck = (e) => {
    e.preventDefault();
    if (previewNameCheck.trim().toLowerCase() === senderName.trim().toLowerCase()) {
      setIsPreviewVerified(true);
    } else {
      // alert 대신 더 나은 사용자 경험 제공
      setPreviewNameCheck('');
      // 간단한 에러 표시를 위해 input을 흔들거나 붉은 테두리를 추가할 수 있음
    }
  };

  // 실제 전송(저장) 함수
  const handleSend = async () => {
    // 카카오톡은 아직 준비중이므로 알림 표시
    if (letterType === 'kakao') {
      setAlertModal({ isOpen: true, message: '카카오톡 전송 기능은 현재 준비중입니다. 이메일 또는 SMS 옵션을 선택해주세요.' });
      return;
    }

    // 이메일/SMS 편지는 결제 페이지로 이동
    const orderId = `schro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const letterData = {
      sender_name: senderName,
      receiver_name: receiverName,
      receiver_contact: receiverContact,
      message: message,
      hint: hint || null,
      letter_type: letterType,
    };

    // 편지 유형별 가격 설정
    const priceMap = {
      'sms': 5000
    };
    
    const typeNameMap = {
      'sms': 'SchRo 문자메시지 편지'
    };

    const paymentInfo = {
      amount: priceMap[letterType],
      orderId: orderId,
      orderName: typeNameMap[letterType],
      customerName: senderName,
    };

    // 편지 데이터를 세션스토리지에 임시 저장
    sessionStorage.setItem('pendingLetter_' + orderId, JSON.stringify(letterData));
    
    navigate('/payment', { state: { paymentInfo } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleCloseModal = () => {
    setShowDelivery(false);
  };

  return (
    <div className="schro-confess-page">
      <div className="schro-confess-container">
        {/* 편지 쓰기 헤로 섹션 */}
        <div className="schro-confess-hero">
          <div className="schro-confess-floating-hearts">💖</div>
          <div className="schro-confess-floating-hearts">💕</div>
          <div className="schro-confess-floating-hearts">💙</div>
          
          <div className="schro-confess-hero-character">
            <img src={letterInMouthImage} alt="배달 중인 슈로" />
          </div>
          <h1 className="schro-confess-hero-title">
            특별한 사람에게<br/>
            마음을 전해보세요 💌
          </h1>
          <p className="schro-confess-hero-subtitle">
            슈로가 당신의 편지를 안전하게 배달해드려요 ✨
          </p>
        </div>

        {/* 편지 작성 폼 */}
        <form onSubmit={handleSubmit} className="schro-confess-form">
          <div className="schro-confess-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">🙋‍♂️</span>
              <h3 className="schro-confess-section-title">당신은 누구인가요?</h3>
            </div>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="예: 김민수"
              className="schro-confess-input"
              required
            />
            <div className="schro-confess-helper">
              상대방이 맞혀야 하는 당신의 이름이에요
            </div>
          </div>

          <div className="schro-confess-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">🎯</span>
              <h3 className="schro-confess-section-title">누구에게 보낼까요?</h3>
            </div>
            <input
              type="text"
              value={receiverName}
              onChange={e => setReceiverName(e.target.value)}
              placeholder="예: 이지은"
              className="schro-confess-input"
              required
            />
            <div className="schro-confess-helper">
              편지를 받을 사람의 이름이에요
            </div>
          </div>

          <div className="schro-confess-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">📞</span>
              <h3 className="schro-confess-section-title">어디로 보낼까요?</h3>
            </div>
            <input
              type="text"
              value={receiverContact}
              onChange={e => setReceiverContact(e.target.value)}
              placeholder="예: 010-1234-5678 (문자) / 카카오톡ID (카톡)"
              className="schro-confess-input"
              required
            />
            <div className="schro-confess-helper">
              편지 링크를 받을 연락처예요
            </div>
          </div>

          <div className="schro-confess-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">📝</span>
              <h3 className="schro-confess-section-title">마음을 담아 써보세요</h3>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`슈로에게 전하고 싶은 마음을 써주세요...

예시:
안녕! 용기를 내서 이런 편지를 써보네.

사실 너한테 하고 싶은 말이 있었어. 우리가 마주칠 때마다 기분이 좋아져.

이런 마음을 전하고 싶었어...`}
              className="schro-confess-input schro-confess-textarea"
              maxLength="500"
              required
            />
            <div className="schro-confess-char-count">
              <span className={`schro-confess-char-count-text ${
                message.length > 450 ? 'schro-confess-char-count-warning' : 'schro-confess-char-count-normal'
              }`}>
                {message.length}/500자
              </span>
            </div>
          </div>

          {/* 편지 유형 선택 섹션 */}
          <div className="schro-confess-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">✨</span>
              <h3 className="schro-confess-section-title">편지 유형을 선택하세요</h3>
            </div>
            
            <div className="schro-letter-type-options">
              <div className={`schro-letter-type-option ${letterType === 'sms' ? 'selected' : ''}`}
                   onClick={() => setLetterType('sms')}>
                <div className="schro-letter-type-header">
                  <input 
                    type="radio" 
                    name="letterType" 
                    value="sms" 
                    checked={letterType === 'sms'}
                    onChange={(e) => setLetterType(e.target.value)}
                  />
                  <div className="schro-letter-type-icon">📱</div>
                  <h4>문자메시지</h4>
                  <span className="schro-letter-type-price">5,000원</span>
                </div>
                <div className="schro-letter-type-features">
                  <span className="feature">📱 SMS 전송</span>
                  <span className="feature">⚡ 즉시 배달</span>
                  <span className="feature">📞 직접 전송</span>
                </div>
              </div>

              <div className={`schro-letter-type-option premium disabled`}
                   style={{opacity: 0.6, cursor: 'not-allowed'}}>
                <div className="schro-letter-type-header">
                  <input 
                    type="radio" 
                    name="letterType" 
                    value="kakao" 
                    disabled
                    style={{cursor: 'not-allowed'}}
                  />
                  <div className="schro-letter-type-icon">💬</div>
                  <h4>카카오톡</h4>
                  <span className="schro-letter-type-price" style={{background: '#999', color: 'white'}}>준비중</span>
                </div>
                <div className="schro-letter-type-features">
                  <span className="feature">💬 카톡 전송</span>
                  <span className="feature">🎨 특별 디자인</span>
                  <span className="feature">💝 SchRo 스티커</span>
                </div>
                <div className="schro-premium-badge">준비중</div>
              </div>
            </div>
          </div>

          <div className="schro-confess-section schro-confess-hint-section">
            <div className="schro-confess-section-header">
              <span className="schro-confess-section-icon">💡</span>
              <h3 className="schro-confess-section-title">힌트를 남겨보세요</h3>
            </div>
            <input
              type="text"
              value={hint}
              onChange={e => setHint(e.target.value)}
              placeholder="예: 우리가 처음 만난 곳, 같은 반 친구, 키가 큰 사람..."
              className="schro-confess-input"
              maxLength="50"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="schro-confess-helper">
                받는 사람이 당신을 추측할 때 도움이 돼요
              </div>
              <div className="schro-confess-char-count">
                <span className="schro-confess-char-count-text schro-confess-char-count-normal">
                  {hint.length}/50자
                </span>
              </div>
            </div>
          </div>

          <button type="submit" className="schro-confess-submit">
            <span style={{ fontSize: 'var(--text-xl)' }}>👀</span>
            편지 미리보기
          </button>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="schro-confess-modal-overlay" onClick={handleClosePreview}>
            <div className="schro-confess-modal" onClick={e => e.stopPropagation()}>
              {isPreviewVerified ? (
                <>
                  <div className="schro-confess-modal-header">
                    <span className="schro-confess-modal-icon">👀</span>
                    <h2 className="schro-confess-modal-title">📝 편지 미리보기</h2>
                  </div>
                  
                  <div className="schro-confess-preview">
                    <div className="schro-confess-preview-field">
                      <strong>보낸 사람:</strong> {senderName}
                    </div>
                    <div className="schro-confess-preview-field">
                      <strong>받는 사람:</strong> {receiverName}
                    </div>
                    {hint && (
                      <div className="schro-confess-preview-field">
                        <strong>힌트:</strong> {hint}
                      </div>
                    )}
                    <div className="schro-confess-preview-message">
                      <div className="schro-confess-preview-message-title">편지 내용:</div>
                      <div className="schro-confess-preview-message-content">{message}</div>
                    </div>
                  </div>
                  
                  <div className="schro-confess-modal-buttons">
                    <button 
                      className="schro-confess-modal-button schro-confess-modal-button-primary"
                      onClick={handleSend}
                    >
                      🚀 지금 보내기
                    </button>
                    <button 
                      className="schro-confess-modal-button schro-confess-modal-button-secondary"
                      onClick={handleClosePreview}
                    >
                      ✏️ 다시 수정하기
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="schro-confess-modal-header">
                    <span className="schro-confess-modal-icon">🔒</span>
                    <h2 className="schro-confess-modal-title">🔒 이름 확인</h2>
                    <p className="schro-confess-modal-subtitle">
                      받는 사람이 어떻게 편지를 받는지 체험해보려면,<br/>
                      여러분의 이름을 한 번 더 입력해주세요.
                    </p>
                  </div>
                  
                  <form onSubmit={handlePreviewNameCheck}>
                    <input
                      type="text"
                      value={previewNameCheck}
                      onChange={e => setPreviewNameCheck(e.target.value)}
                      placeholder="내 이름"
                      className="schro-confess-input"
                      style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}
                      required
                    />
                    <button 
                      type="submit" 
                      className="schro-confess-modal-button schro-confess-modal-button-primary"
                      style={{ width: '100%' }}
                    >
                      <img src={iconCheck} alt="확인" style={{ width: '20px', height: '20px' }} />
                      이름 확인하기
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showDelivery && (
          <div className="schro-confess-modal-overlay schro-confess-success-modal" onClick={handleCloseModal}>
            <div className="schro-confess-modal" onClick={e => e.stopPropagation()}>
              <div className="schro-confess-success-character">
                <img src={letterInMouthImage} alt="배달 중인 슈로" />
              </div>
              
              <div className="schro-confess-modal-header">
                <h2 className="schro-confess-modal-title">슈로가 편지를 배달하러 갔어요! 🚀</h2>
              </div>
              
              <div className="schro-confess-success-notice">
                <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-dark)', fontWeight: '600' }}>
                  📧 <strong>자동 전송:</strong> 상대방에게 비밀편지 알림을 보냈어요!
                </p>
              </div>
              
              <p style={{ 
                lineHeight: '1.5', 
                color: 'var(--text-medium)', 
                textAlign: 'center',
                fontSize: 'var(--text-base)',
                fontWeight: '500'
              }}>
                상대방이 당신의 이름을 맞혀야만<br />
                편지를 열어볼 수 있답니다 💕
              </p>
              
              <div className="schro-confess-tip-box">
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  margin: 0, 
                  color: 'var(--text-medium)',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  💡 <strong>TIP:</strong> 누가 보냈는지 알려주지 마세요! 그럼 재미가 없어져요 😉
                </p>
              </div>
              
              <button 
                className="schro-confess-modal-button schro-confess-modal-button-secondary"
                onClick={handleCloseModal}
                style={{ width: '100%', marginTop: 'var(--space-lg)' }}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 안전한 편지 서비스 안내 */}
        <div className="schro-confess-safety">
          <div className="schro-confess-safety-card">
            <span className="schro-confess-safety-icon">🛡️</span>
            <div className="schro-confess-safety-text">
              편지는 안전하게 암호화되어 전달돼요
            </div>
          </div>
          <div className="schro-confess-safety-card">
            <span className="schro-confess-safety-icon">💝</span>
            <div className="schro-confess-safety-text">
              보낸 사람을 맞힌 사람만 편지를 읽을 수 있어요
            </div>
          </div>
          <div className="schro-confess-safety-card">
            <span className="schro-confess-safety-icon">🔐</span>
            <div className="schro-confess-safety-text">
              한 번만 시도할 수 있으니 신중하게 생각해보세요
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
        message={alertModal.message}
        type="error"
        title="오류"
      />
    </div>
  );
}

export default Confess;