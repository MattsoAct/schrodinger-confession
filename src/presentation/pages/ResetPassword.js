import { useState, useEffect } from 'react';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { useNavigate } from 'react-router-dom';
import schroDesignImage from '../../assets/image_schro_standing.png';
import iconLock from '../../assets/icon_lock.png';
import iconCheck from '../../assets/icon_check.png';
import '../styles/schro-mailcat-system.css';
import '../styles/auth-schro.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // URL 해시에서 토큰 확인
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    
    if (accessToken && refreshToken) {
      setIsValid(true);
      // 세션 설정
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
    } else {
      setMessage('유효하지 않은 재설정 링크입니다. 다시 요청해주세요.');
      setMessageType('error');
    }
  }, []);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { level: 'weak', color: '#F1948A', text: '약함' };
    if (password.length < 10) return { level: 'medium', color: '#F4D03F', text: '보통' };
    return { level: 'strong', color: '#ABEBC6', text: '강함' };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않아요 😅');
      setMessageType('error');
      return;
    }
    
    if (password.length < 6) {
      setMessage('비밀번호는 6자 이상으로 설정해주세요 🔒');
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw error;
      }
      
      setMessage('비밀번호가 성공적으로 변경되었어요! 로그인 페이지로 이동할게요 ✨');
      setMessageType('success');
      setTimeout(() => navigate('/signin'), 3000);
      
    } catch (err) {
      console.error('Password update error:', err);
      setMessage(`비밀번호 변경에 실패했어요: ${err.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!isValid && !message) {
    return (
      <div className="schro-auth-page">
        <div className="schro-auth-container">
          <div className="schro-auth-card">
            <div className="schro-auth-loading">
              <div className="schro-auth-spinner"></div>
              링크를 확인하고 있어요...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schro-auth-page">
      <div className="schro-auth-container">
        <div className="schro-auth-card">
          <div className="schro-auth-sparkle">🔑</div>
          
          <div className="schro-auth-header">
            <div className="schro-auth-character">
              <img src={schroDesignImage} alt="슈로" />
            </div>
            <h1 className="schro-auth-title">새 비밀번호 설정</h1>
            <p className="schro-auth-subtitle">
              안전한 새 비밀번호를 설정해주세요 🔒
            </p>
          </div>
          
          {isValid ? (
            <form onSubmit={handleResetPassword} className="schro-auth-form">
              <div className="schro-form-group">
                <label className="schro-form-label">
                  <img src={iconLock} alt="비밀번호" className="schro-form-icon" />
                  새 비밀번호
                </label>
                <input
                  type="password"
                  placeholder="안전한 새 비밀번호"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="schro-form-input"
                />
                {password && (
                  <div style={{ 
                    marginTop: 'var(--space-xs)', 
                    fontSize: 'var(--text-xs)', 
                    color: passwordStrength.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    fontWeight: '600'
                  }}>
                    🛡️ 보안 강도: {passwordStrength.text}
                  </div>
                )}
              </div>

              <div className="schro-form-group">
                <label className="schro-form-label">
                  <img src={iconCheck} alt="확인" className="schro-form-icon" />
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="schro-form-input"
                  style={{
                    borderColor: passwordsMatch && confirmPassword ? 'var(--accent-green)' : undefined
                  }}
                />
                {passwordsMatch && confirmPassword && (
                  <div style={{
                    marginTop: 'var(--space-xs)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent-green)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    fontWeight: '600'
                  }}>
                    ✅ 비밀번호가 일치해요!
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="schro-auth-submit"
              >
                {loading ? (
                  <div className="schro-auth-loading">
                    <div className="schro-auth-spinner"></div>
                    비밀번호를 변경하고 있어요...
                  </div>
                ) : (
                  '새 비밀번호로 변경하기 🔑'
                )}
              </button>

              {message && (
                <div className={messageType === 'success' ? 'schro-auth-success' : 'schro-auth-error'}>
                  <div className={messageType === 'success' ? 'schro-auth-success-icon' : 'schro-auth-error-icon'}>
                    {messageType === 'success' ? '✅' : '⚠️'}
                  </div>
                  <div className={messageType === 'success' ? 'schro-auth-success-text' : 'schro-auth-error-text'}>
                    {message}
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="schro-auth-error">
              <div className="schro-auth-error-icon">⚠️</div>
              <div className="schro-auth-error-text">{message}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;