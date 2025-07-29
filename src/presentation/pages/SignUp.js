import { useState } from 'react';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { useNavigate, Link } from 'react-router-dom';

console.log('=== SIGNUP PAGE LOADING ===');
console.log('Supabase client imported:', !!supabase);
import schroDesignImage from '../../assets/image_schro_standing.png';
import iconLock from '../../assets/icon_lock.png';
import iconLetter from '../../assets/icon_letter.png';
import iconCheck from '../../assets/icon_check.png';
import '../styles/schro-mailcat-system.css';
import '../styles/auth-schro.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { level: 'weak', color: '#F1948A', text: '약함' };
    if (password.length < 10) return { level: 'medium', color: '#F4D03F', text: '보통' };
    return { level: 'strong', color: '#ABEBC6', text: '강함' };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && passwordCheck && password === passwordCheck;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (password !== passwordCheck) {
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
      console.log('Starting signup process with:', {
        email: email.trim(),
        hasPassword: !!password,
        nickname: nickname.trim() || '익명 사용자'
      });
      
      const { error, data } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { 
            nickname: nickname.trim() || '익명 사용자'
          }
        }
      });
      
      console.log('Signup response:', { error, data });
      
      if (error) {
        throw error;
      }
      
      setMessage('회원가입이 완료되었어요! 이메일을 확인해주세요 📧✨');
      setMessageType('success');
      setEmail('');
      setNickname('');
      setPassword('');
      setPasswordCheck('');
      setTimeout(() => navigate('/signin'), 3000);
      
    } catch (err) {
      console.error('SignUp Error:', err);
      setMessage(`회원가입에 실패했어요: ${err.message || '알 수 없는 오류가 발생했어요'}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
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
            <h1 className="schro-auth-title">회원가입</h1>
            <p className="schro-auth-subtitle">
              슈로와 함께 특별한 편지 배달 여행을 시작해요! 🚀
            </p>
          </div>
          
          <form onSubmit={handleSignUp} className="schro-auth-form">
            <div className="schro-form-group">
              <label className="schro-form-label">
                <img src={iconLetter} alt="이메일" className="schro-form-icon" />
                이메일 주소
              </label>
              <input
                type="email"
                placeholder="schro.friend@mailcat.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="schro-form-input"
              />
            </div>

            <div className="schro-form-group">
              <label className="schro-form-label">
                🐱
                닉네임
              </label>
              <input
                type="text"
                placeholder="슈로의 친구"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
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
                type="password"
                placeholder="슈로만 알 수 있는 비밀번호"
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
                비밀번호 확인
              </label>
              <input
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={passwordCheck}
                onChange={e => setPasswordCheck(e.target.value)}
                required
                className="schro-form-input"
                style={{
                  borderColor: passwordsMatch && passwordCheck ? 'var(--accent-green)' : undefined
                }}
              />
              {passwordsMatch && passwordCheck && (
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
                  슈로가 편지함을 준비하고 있어요...
                </div>
              ) : (
                '슈로와 함께 시작하기 🚀'
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
            <span className="schro-auth-link-text">이미 계정이 있으신가요?</span>{' '}
            <Link to="/signin" className="schro-auth-link-button">
              슈로의 편지함 열기 🗝️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;