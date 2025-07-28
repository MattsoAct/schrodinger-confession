import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/storage/supabase.js';
import { 
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaEnvelope,
  FaSearch,
  FaHeart
} from 'react-icons/fa';
import schroDesignImage from '../../assets/image_schro_standing.png';
import '../styles/schro-mailcat-system.css';
import '../styles/header-footer-schro.css';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const getUserInitials = (email) => {
    if (!email) return 'QU';
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="schro-header">
      <div className="schro-header-content">
        <Link to="/" className="schro-header-brand">
          <div className="schro-header-logo">
            <img src={schroDesignImage} alt="슈로" className="schro-header-logo-img" />
          </div>
          <div className="schro-header-brand-text">
            <h1 className="schro-header-title">Schro의 양자편지함</h1>
            <span className="schro-header-subtitle">💌 특별한 편지 배달 서비스</span>
          </div>
        </Link>

        <nav className="schro-header-nav">
          <Link to="/about" className="schro-header-button schro-header-button-about schro-button">
            <FaHeart />
            <span>슈로는</span>
          </Link>
          <Link to="/confess" className="schro-header-button schro-header-button-letter">
            <FaEnvelope />
            <span>편지쓰기</span>
          </Link>
          <Link to="/check" className="schro-header-button schro-header-button-check">
            <FaSearch />
            <span>편지찾기</span>
          </Link>
          
          {!user ? (
            <>
              <Link to="/signup" className="schro-header-button">
                <FaUserPlus />
                <span>회원가입</span>
              </Link>
              <Link to="/signin" className="schro-header-button schro-header-button-primary">
                <FaSignInAlt />
                <span>로그인</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/settings" className="schro-header-button">
                <FaUser />
                <span>내 설정</span>
              </Link>
              
              <button 
                onClick={handleLogout} 
                className="schro-header-button schro-header-button-logout"
              >
                <FaSignOutAlt />
                <span>로그아웃</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;