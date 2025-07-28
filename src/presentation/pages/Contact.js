import { useState } from 'react';
import { FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import schroDesignImage from '../../assets/image_schro_standing.png';
import '../styles/schro-mailcat-system.css';
import '../styles/contact-schro.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 직접 이메일로 전송
      window.location.href = `mailto:so.act.kr@gmail.com?subject=${encodeURIComponent(`[SchRo 문의] ${formData.subject}`)}&body=${encodeURIComponent(`이름: ${formData.name}\n이메일: ${formData.email}\n\n문의내용:\n${formData.message}\n\n---\n보낸시간: ${new Date().toLocaleString('ko-KR')}\n출처: SchRo 비밀편지함`)}`;      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      alert('이메일 전송에 실패했습니다. 직접 so.act.kr@gmail.com으로 문의해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="schro-contact-page">
        <div className="schro-contact-container">
          <div className="schro-contact-success">
            <div className="schro-contact-success-character">
              <img src={schroDesignImage} alt="슈로" />
            </div>
            <div className="schro-contact-success-icon">
              <FaCheckCircle />
            </div>
            <h1 className="schro-contact-success-title">
              문의가 접수되었습니다! 🎉
            </h1>
            <p className="schro-contact-success-message">
              소중한 의견을 보내주셔서 감사합니다.<br />
              빠른 시일 내에 답변드리겠습니다.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="schro-contact-success-button"
            >
              새 문의 작성하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schro-contact-page">
      <div className="schro-contact-container">
        {/* 헤더 섹션 */}
        <div className="schro-contact-header">
          <div className="schro-contact-header-character">
            <img src={schroDesignImage} alt="슈로" />
          </div>
          <h1 className="schro-contact-header-title">
            SchRo에게 문의하기
          </h1>
          <p className="schro-contact-header-subtitle">
            궁금한 것이 있으시거나 도움이 필요하시면<br />
            언제든지 슈로에게 말씀해주세요! 💌
          </p>
        </div>

        {/* 문의 폼 */}
        <div className="schro-contact-form-card">
          <div className="schro-contact-form-header">
            <div className="schro-contact-form-icon">
              <FaEnvelope />
            </div>
            <h2 className="schro-contact-form-title">문의 내용 작성</h2>
            <p className="schro-contact-form-description">
              문의사항을 자세히 적어주시면 더 정확한 답변을 드릴 수 있어요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="schro-contact-form">
            <div className="schro-contact-form-row">
              <div className="schro-contact-form-group">
                <label htmlFor="name" className="schro-contact-form-label">
                  <FaUser />
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="성함을 입력해주세요"
                  className="schro-contact-form-input"
                  required
                />
              </div>

              <div className="schro-contact-form-group">
                <label htmlFor="email" className="schro-contact-form-label">
                  <FaEnvelope />
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="답변받을 이메일을 입력해주세요"
                  className="schro-contact-form-input"
                  required
                />
              </div>
            </div>

            <div className="schro-contact-form-group">
              <label htmlFor="subject" className="schro-contact-form-label">
                문의 제목
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="문의 제목을 입력해주세요"
                className="schro-contact-form-input"
                required
              />
            </div>

            <div className="schro-contact-form-group">
              <label htmlFor="message" className="schro-contact-form-label">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="궁금한 내용을 자세히 적어주세요"
                className="schro-contact-form-textarea"
                rows="6"
                required
              />
              <div className="schro-contact-char-count">
                {formData.message.length} / 1000자
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`schro-contact-submit ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? (
                <>
                  전송 중...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  문의 보내기
                </>
              )}
            </button>
          </form>
        </div>

        {/* 추가 안내 */}
        <div className="schro-contact-info">
          <div className="schro-contact-info-card">
            <h3>💬 카카오톡 문의</h3>
            <p>더 빠른 답변을 원하시면<br />카카오톡 채널로 문의하세요</p>
            <button 
              onClick={() => alert('카카오톡 채널 준비중입니다. 조금만 기다려주세요! 🙏')}
              className="schro-contact-kakao-button"
            >
              📱 카카오톡 채널 (준비중)
            </button>
          </div>
          
          <div className="schro-contact-info-card">
            <h3>⏰ 답변 시간</h3>
            <p>평일 오전 9시부터 오후 6시까지<br />평균 24시간 이내 답변드려요</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;