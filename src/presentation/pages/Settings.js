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
  
  // 탈퇴 관련 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleAccountDelete = async () => {
    if (deleteConfirmText !== '탈퇴합니다') {
      showMessage('error', '"탈퇴합니다"를 정확히 입력해주세요.');
      return;
    }
    
    setDeleteLoading(true);
    try {
      // 현재 사용자 세션 확인
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        showMessage('error', '로그인이 필요합니다.');
        return;
      }

      // Edge Function 호출하여 계정 완전 삭제
      const { data, error } = await supabase.functions.invoke('delete-user-account', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('계정 삭제 오류:', error);
        showMessage('error', `계정 삭제에 실패했습니다: ${error.message}`);
        return;
      }

      if (data?.error) {
        showMessage('error', `계정 삭제에 실패했습니다: ${data.error}`);
        return;
      }

      // 성공 시 로그아웃 처리
      await supabase.auth.signOut();
      
      showMessage('success', '계정이 성공적으로 삭제되었습니다. 그동안 이용해주셔서 감사합니다.');
      setShowDeleteModal(false);
      
      // 메인 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (err) {
      console.error('계정 삭제 중 오류:', err);
      showMessage('error', `탈퇴 처리 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmText('');
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

        {/* 계정 삭제 */}
        <div className="schro-settings-card schro-settings-card-danger">
          <div className="schro-settings-card-header">
            <div className="schro-settings-card-icon">
              ⚠️
            </div>
            <h3 className="schro-settings-card-title">계정 탈퇴</h3>
          </div>
          <p className="schro-settings-card-description">
            계정을 탈퇴하면 모든 데이터가 삭제되며 복구할 수 없습니다
          </p>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="schro-settings-delete-button"
          >
            🗑️ 계정 탈퇴하기
          </button>
        </div>
      </div>

      {/* 탈퇴 확인 모달 */}
      {showDeleteModal && (
        <div className="schro-settings-modal-overlay">
          <div className="schro-settings-modal">
            <div className="schro-settings-modal-header">
              <h3>정말로 탈퇴하시겠어요?</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="schro-settings-modal-close"
              >
                ✕
              </button>
            </div>
            
            <div className="schro-settings-modal-content">
              <div className="schro-settings-modal-warning">
                <div className="schro-settings-modal-warning-icon">⚠️</div>
                <div className="schro-settings-modal-warning-text">
                  <p><strong>주의: 이 작업은 되돌릴 수 없습니다!</strong></p>
                  <ul>
                    <li>모든 편지 데이터가 삭제됩니다</li>
                    <li>계정 정보가 완전히 삭제됩니다</li>
                    <li>결제 내역도 함께 삭제됩니다</li>
                  </ul>
                </div>
              </div>
              
              <div className="schro-settings-modal-confirm">
                <label>
                  정말로 탈퇴하려면 <strong>"탈퇴합니다"</strong>를 입력하세요:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="탈퇴합니다"
                  className="schro-settings-modal-input"
                />
              </div>
            </div>
            
            <div className="schro-settings-modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="schro-settings-modal-cancel"
                disabled={deleteLoading}
              >
                취소
              </button>
              <button
                onClick={handleAccountDelete}
                className="schro-settings-modal-delete"
                disabled={deleteLoading || deleteConfirmText !== '탈퇴합니다'}
              >
                {deleteLoading ? '처리 중...' : '계정 탈퇴'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;