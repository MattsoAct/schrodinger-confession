import { useState } from 'react';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { useNavigate, Link } from 'react-router-dom';
import schroDesignImage from '../../assets/image_schro_standing.png';
import iconLock from '../../assets/icon_lock.png';
import iconLetter from '../../assets/icon_letter.png';
import '../styles/schro-mailcat-system.css';
import '../styles/auth-schro.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      setMessage('로그인에 실패했어요. 이메일과 비밀번호를 확인해주세요 😅');
      setMessageType('error');
    } else {
      setMessage('로그인 성공! 비밀편지함으로 이동할게요 ✨');
      setMessageType('success');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/'), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="schro-auth-page">
      <div className="schro-auth-container">
        <div className="schro-auth-card">
          <div className="schro-auth-sparkle">✨</div>
          
          <div className="schro-auth-header">
            <div className="schro-auth-character">
              <img src={schroDesignImage} alt="슈로" />
            </div>
            <h1 className="schro-auth-title">로그인</h1>
            <p className="schro-auth-subtitle">
              슈로의 비밀편지함에 다시 오신 것을 환영해요! 💌
            </p>
          </div>
          
          <form onSubmit={handleSignIn} className="schro-auth-form">

            <div className="schro-form-group">
              <label className="schro-form-label">
                <img src={iconLetter} alt="이메일" className="schro-form-icon" />
                이메일 주소
              </label>
              <input
                type="email"
                placeholder="schro@mailcat.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="schro-form-input"
              />
            </div>

            <div className="schro-form-group">
              <label className="schro-form-label">
                <img src={iconLock} alt="비밀번호" className="schro-form-icon" />
                비밀번호
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="슈로만 알 수 있는 비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                  슈로가 문을 열고 있어요...
                </div>
              ) : (
                '슈로의 편지함 열기 🗝️'
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
          
          <div className="schro-auth-divider">
            <div className="schro-auth-divider-text">또는</div>
          </div>
          
          <div className="schro-auth-link">
            <span className="schro-auth-link-text">아직 계정이 없으신가요?</span>{' '}
            <Link to="/signup" className="schro-auth-link-button">
              슈로와 함께 시작하기 🐱
            </Link>
          </div>

          <div className="schro-auth-link" style={{ marginTop: 'var(--space-sm)' }}>
            <span className="schro-auth-link-text">비밀번호를 잊으셨나요?</span>{' '}
            <Link to="/forgot-password" className="schro-auth-link-button">
              비밀번호 찾기 🔍
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;