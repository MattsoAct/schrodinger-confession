import { Link } from 'react-router-dom';
import { FaCat } from 'react-icons/fa';
import '../styles/schro-mailcat-system.css';
import '../styles/header-footer-schro.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="schro-footer">
      <div className="schro-footer-content">
        <div className="schro-footer-left">
          <Link to="/" className="schro-footer-brand">
            <div className="schro-footer-logo">
              💌
            </div>
            <div>
              <div className="schro-footer-text">슈로의 비밀편지함</div>
              <div className="schro-business-info">
                <div>© {currentYear} (주)소액트</div>
                <div>대표자 : 전성욱</div>
                <div>개인정보관리책임자 : 전성욱</div>
                <div>사업자등록번호 : 437-88-03018</div>
                <div>주소 : 경기도 성남시 수정구 위례동로 135</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="schro-footer-right">
          <div className="schro-footer-links">
            <Link to="/terms" className="schro-footer-link">
              이용약관
            </Link>
            <Link to="/privacy" className="schro-footer-link">
              개인정보처리방침
            </Link>
            <Link to="/contact" className="schro-footer-link">
              문의하기
            </Link>
          </div>
          <div className="schro-footer-status">
            💌 마음이 안전하게 전해지고 있어요 ✨
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;