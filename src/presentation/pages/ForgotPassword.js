import { useState } from 'react';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { Link } from 'react-router-dom';
import schroDesignImage from '../../assets/image_schro_standing.png';
import iconLetter from '../../assets/icon_letter.png';
import '../styles/schro-mailcat-system.css';
import '../styles/auth-schro.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) {
        throw error;
      }
      
      setEmailSent(true);
      setMessage('비밀번호 재설정 이메일을 보냈어요! 이메일함을 확인해주세요 📧');
      setMessageType('success');
      
    } catch (err) {
      console.error('Password reset error:', err);
      setMessage(`비밀번호 재설정 요청에 실패했어요: ${err.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schro-auth-page">
      <div className="schro-auth-container">
        <div className="schro-auth-card">
          <div className="schro-auth-sparkle">🔍</div>
          
          <div className="schro-auth-header">
            <div className="schro-auth-character">
              <img src={schroDesignImage} alt="슈로" />
            </div>
            <h1 className="schro-auth-title">비밀번호 찾기</h1>
            <p className="schro-auth-subtitle">
              {!emailSent 
                ? "걱정하지 마세요! 슈로가 도와드릴게요 🔑" 
                : "이메일을 확인하고 비밀번호를 새로 설정하세요! ✨"
              }
            </p>
          </div>
          
          {!emailSent ? (
            <form onSubmit={handleResetPassword} className="schro-auth-form">
              <div className="schro-form-group">
                <label className="schro-form-label">
                  <img src={iconLetter} alt="이메일" className="schro-form-icon" />
                  이메일 주소
                </label>
                <input
                  type="email"
                  placeholder="가입할 때 사용한 이메일을 입력하세요"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="schro-form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="schro-auth-submit"
              >
                {loading ? (
                  <div className="schro-auth-loading">
                    <div className="schro-auth-spinner"></div>
                    슈로가 이메일을 보내고 있어요...
                  </div>
                ) : (
                  '비밀번호 재설정 이메일 보내기 📧'
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
            <div className="schro-auth-success" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
              <div className="schro-auth-success-icon" style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>
                📧
              </div>
              <div className="schro-auth-success-text" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-md)' }}>
                {message}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                이메일이 오지 않았다면 스팸함도 확인해보세요!
              </p>
            </div>
          )}
          
          <div className="schro-auth-divider">
            <div className="schro-auth-divider-text">또는</div>
          </div>
          
          <div className="schro-auth-link">
            <span className="schro-auth-link-text">비밀번호가 기억났나요?</span>{' '}
            <Link to="/signin" className="schro-auth-link-button">
              로그인하러 가기 🗝️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;