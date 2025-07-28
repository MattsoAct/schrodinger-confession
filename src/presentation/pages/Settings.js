import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import schroDesignImage from '../../assets/image_schro_standing.png';
import '../styles/schro-mailcat-system.css';
import '../styles/settings-schro.css';

function Settings() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 별명 변경 상태
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [nicknameLoading, setNicknameLoading] = useState(false);
  
  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 메시지 상태
  const [message, setMessage] = useState({ type: '', text: '', show: false });

  const showMessage = (type, text) => {
    setMessage({ type, text, show: true });
    setTimeout(() => {
      setMessage(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/signin');
          return;
        }
        
        setCurrentUser(user);
        // 현재 별명 설정 (메타데이터에서 가져오거나 이메일의 첫 부분을 기본값으로)
        const currentNickname = user.user_metadata?.nickname || user.email.split('@')[0];
        setNickname(currentNickname);
        setNewNickname(currentNickname);
      } catch (err) {
        setError(`사용자 정보를 불러오는 중 오류가 발생했습니다: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    
    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/signin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    if (!newNickname.trim()) {
      showMessage('error', '별명을 입력해주세요.');
      return;
    }
    
    setNicknameLoading(true);
    try {
      // Supabase Auth 사용자 메타데이터 업데이트
      const { error } = await supabase.auth.updateUser({
        data: { 
          nickname: newNickname.trim()
        }
      });
      
      if (error) {
        showMessage('error', `별명 변경에 실패했습니다: ${error.message}`);
      } else {
        setNickname(newNickname.trim());
        showMessage('success', '별명이 성공적으로 변경되었습니다! 🎉');
      }
    } catch (err) {
      showMessage('error', `별명 변경 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setNicknameLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      showMessage('error', '모든 필드를 입력해주세요.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showMessage('error', '새 비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (newPassword.length < 6) {
      showMessage('error', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        showMessage('error', `비밀번호 변경에 실패했습니다: ${error.message}`);
      } else {
        showMessage('success', '비밀번호가 성공적으로 변경되었습니다! 🔒');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      showMessage('error', `비밀번호 변경 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="schro-settings-page">
        <div className="schro-settings-loading">
          <div className="schro-settings-loading-character">
            <img src={schroDesignImage} alt="로딩 중인 슈로" />
          </div>
          <div className="schro-settings-loading-title">설정을 불러오고 있어요...</div>
          <div className="schro-settings-loading-subtitle">슈로가 준비하고 있어요 ✨</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schro-settings-page">
        <div className="schro-settings-error">
          <div className="schro-settings-error-card">
            <h2 className="schro-settings-error-title">오류가 발생했어요</h2>
            <p className="schro-settings-error-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schro-settings-page">
      {/* 메시지 토스트 */}
      {message.show && (
        <div className={`schro-settings-message ${
          message.type === 'success' ? 'schro-settings-message-success' : 'schro-settings-message-error'
        }`}>
          {message.text}
        </div>
      )}

      <div className="schro-settings-container">
        {/* Header */}
        <div className="schro-settings-header">
          <div className="schro-settings-header-character">
            <img src={schroDesignImage} alt="슈로 고양이" />
          </div>
          <h1 className="schro-settings-header-title">내 설정</h1>
          <p className="schro-settings-header-subtitle">
            개인정보를 안전하게 관리하세요 🔒
          </p>
        </div>

        {/* 별명 변경 */}
        <div className="schro-settings-card schro-settings-card-nickname">
          <div className="schro-settings-card-header">
            <div className="schro-settings-card-icon">
              🐱
            </div>
            <h3 className="schro-settings-card-title">별명 바꾸기</h3>
          </div>
          <p className="schro-settings-card-description">
            편지를 보낼 때 사용할 별명을 설정할 수 있어요
          </p>
          
          <form onSubmit={handleNicknameChange} className="schro-settings-form">
            <div className="schro-settings-form-group">
              <div className="schro-settings-current-info">
                현재 별명: {nickname}
              </div>
              <label className="schro-settings-form-label">
                새로운 별명
              </label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="새로운 별명을 입력하세요"
                className="schro-settings-input"
                maxLength="20"
                required
              />
            </div>
            <button
              type="submit"
              className="schro-settings-submit"
              disabled={nicknameLoading}
            >
              ✨
              <span className={nicknameLoading ? 'schro-settings-loading-text' : ''}>
                {nicknameLoading ? '변경 중' : '별명 변경'}
              </span>
            </button>
          </form>
        </div>

        {/* 비밀번호 변경 */}
        <div className="schro-settings-card schro-settings-card-password">
          <div className="schro-settings-card-header">
            <div className="schro-settings-card-icon">
              🛡️
            </div>
            <h3 className="schro-settings-card-title">비밀번호 바꾸기</h3>
          </div>
          <p className="schro-settings-card-description">
            계정을 안전하게 보호하기 위해 비밀번호를 변경하세요
          </p>
          
          <form onSubmit={handlePasswordChange} className="schro-settings-form">
            <div className="schro-settings-form-group">
              <label className="schro-settings-form-label">
                새 비밀번호
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호 (최소 6자)"
                className="schro-settings-input"
                minLength="6"
                required
              />
            </div>
            <div className="schro-settings-form-group">
              <label className="schro-settings-form-label">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 다시 입력"
                className="schro-settings-input"
                minLength="6"
                required
              />
            </div>
            <button
              type="submit"
              className="schro-settings-submit"
              disabled={passwordLoading}
            >
              🔒
              <span className={passwordLoading ? 'schro-settings-loading-text' : ''}>
                {passwordLoading ? '변경 중' : '비밀번호 변경'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;