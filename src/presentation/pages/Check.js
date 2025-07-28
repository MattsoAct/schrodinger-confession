import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { 
  FaEnvelope, 
  FaLock,
  FaHeart,
  FaHome,
  FaCog,
  FaExclamationTriangle,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import schroDesignImage from '../../assets/image_schro_standing.png';
import letterImage from '../../assets/letter.png';
import letterInMouthImage from '../../assets/image_schro_inboxlooking.png';
import schroLetterImage from '../../assets/schro_letter.png';
import '../styles/schro-mailcat-system.css';
import '../styles/check-schro.css';

function Check() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [confession, setConfession] = useState(null);
  const [senderNameGuess, setSenderNameGuess] = useState('');
  const [status, setStatus] = useState('initial'); // 'initial', 'success', 'failure'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const fetchConfession = async () => {
      if (!id) {
        setError('유효하지 않은 주소입니다.');
        setStatus('failure');
        setLoading(false);
        return;
      }

      // 테스트용 ID인 경우 바로 초기 상태로 설정
      if (id === 'test') {
        setLoading(false);
        setStatus('initial');
        setConfession({ id: 'test', sender_name: '테스트', receiver_name: '사용자' });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('confessions')
          .select()
          .eq('id', id)
          .single();

        if (error || !data) {
          setError('해당 고백을 찾을 수 없거나 이미 확인된 메시지입니다.');
          setStatus('failure');
        } else if (data.status === 'success') {
          setError('이미 확인된 메시지입니다.');
          setStatus('failure');
        } else if (data.status === 'failure') {
          setError('이 메시지는 이미 폐기되었습니다.');
          setStatus('failure');
        } else {
          setConfession(data);
          setStatus('initial');
        }
      } catch (err) {
        setError('고백을 불러오는 중 문제가 발생했습니다.');
        setStatus('failure');
      } finally {
        setLoading(false);
      }
    };

    fetchConfession();
  }, [id]);

  const handleNameCheck = async (e) => {
    e.preventDefault();
    if (!confession || senderNameGuess.trim() === '') return;

    if (senderNameGuess.trim() === confession.sender_name) {
      setStatus('success');
      await supabase.from('confessions').update({ status: 'success' }).eq('id', id);
    } else {
      setStatus('failure');
      setError('🌙 이번엔 스쳐간 인연이네요. 편지는 우아하게 사라졌습니다.');
      await supabase.from('confessions').update({ status: 'failure' }).eq('id', id);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="schro-loading-section">
          <div className="schro-loading-character">
            <img 
              src={schroDesignImage} 
              alt="슈로가 편지를 가져오는 중" 
              className="schro-character schro-character-running"
            />
            <div className="schro-bubble schro-loading-bubble">
              편지를 가져오고 있어요! 🐱
            </div>
          </div>
          <h2 className="schro-title-section">비밀 편지를 찾는 중...</h2>
          <p className="schro-text-body">슈로가 당신의 편지를 안전하게 가져오고 있어요 ✨</p>
        </div>
      );
    }

    if (status === 'failure') {
      return (
        <div className="schro-failure-section">
          <div className="schro-failure-character">
            <img 
              src={schroDesignImage} 
              alt="아쉬워하는 슈로" 
              className="schro-character"
            />
            <div className="schro-bubble schro-failure-bubble">
              이번엔 아쉽네요... 😿
            </div>
          </div>
          
          <div className="schro-card schro-failure-card">
            <h2 className="schro-title-section">스쳐간 인연이네요</h2>
            <p className="schro-text-body">{error}</p>
            
            <button
              className="schro-btn schro-btn-primary schro-btn-large"
              onClick={() => navigate('/')}
            >
              <FaHome />
              홈으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    if (status === 'success' && confession) {
      return (
        <div className="schro-success-section">
          <div className="schro-success-character">
            <img 
              src={letterInMouthImage} 
              alt="기뻐하는 슈로" 
              className="schro-character schro-bounce-in"
            />
            <div className="schro-bubble schro-success-bubble">
              편지 배달 완료! 💌✨
            </div>
          </div>
          
          <div className="schro-letter-card">
            <div className="schro-letter-header">
              <h2 className="schro-title-section">
                <span className="schro-receiver-name">{confession.receiver_name}</span>님께 💕
              </h2>
              <p className="schro-subtitle">마음이 전달되었습니다!</p>
            </div>
            
            <div className="schro-letter-content">
              <div className="schro-letter-text">
                {confession.message}
              </div>
              <div className="schro-letter-signature">
                보낸 사람: <strong>{confession.sender_name}</strong> 💕
              </div>
            </div>
          </div>
          
          <div className="schro-success-actions">
            <button
              className="schro-btn schro-btn-primary"
              onClick={() => navigate('/')}
            >
              <FaEnvelope />
              나도 편지 보내기
            </button>
            <button
              className="schro-btn schro-btn-secondary"
              onClick={() => navigate('/settings')}
            >
              <FaCog />
              내 설정
            </button>
          </div>
        </div>
      );
    }

    // Initial form - 간결한 디자인
    return (
      <div className="schro-check-compact">
        {/* 간결한 헤더 */}
        <div className="schro-compact-header">
          <div className="schro-header-icon">
            <img 
              src={schroLetterImage} 
              alt="편지를 든 슈로" 
              className="schro-compact-character"
            />
          </div>
          <h2 className="schro-title-section">🔐 비밀편지 도착!</h2>
          <p className="schro-compact-description">
            보낸 사람의 이름을 맞히면 편지를 열 수 있어요 ✨
          </p>
        </div>

        {/* 메인 카드 */}
        <div className="schro-card schro-compact-card">
          {/* 경고와 힌트를 하나로 통합 */}
          <div className="schro-info-section">
            <div className="schro-warning-compact">
              <FaExclamationTriangle className="schro-warning-icon" />
              <span>단 한 번의 기회만 있어요! 신중하게 생각해주세요 🌙</span>
            </div>
            
            {confession?.hint && (
              <div className="schro-hint-section">
                {!showHint ? (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="schro-btn schro-btn-hint"
                  >
                    <FaLightbulb />
                    힌트 보기
                  </button>
                ) : (
                  <div className="schro-hint-compact">
                    <FaLightbulb className="schro-hint-icon" />
                    <span>힌트: "{confession.hint}"</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleNameCheck} className="schro-compact-form">
            <div className="schro-form-group">
              <label className="schro-form-label">
                <FaLock />
                누가 보냈을까요?
              </label>
              <input
                type="text"
                value={senderNameGuess}
                onChange={e => setSenderNameGuess(e.target.value)}
                placeholder="보낸 사람의 이름을 입력하세요"
                className="schro-form-input schro-check-name-input"
                required
              />
            </div>
            
            <button type="submit" className="schro-btn schro-btn-primary schro-btn-large schro-unlock-btn">
              <HiSparkles />
              비밀편지 열기
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="schro-check-page schro-watercolor-bg">
      <div className="schro-container">
        <div className="schro-check-content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Check;