import React from 'react';
import '../styles/modal-system.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  icon,
  type = 'default',
  showCloseButton = true,
  className = '',
  size = 'medium'
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`schro-modal-overlay schro-modal-${type}`} onClick={handleOverlayClick}>
      <div className={`schro-modal schro-modal-${size} ${className}`}>
        {showCloseButton && (
          <button className="schro-modal-close" onClick={onClose}>
            ✕
          </button>
        )}
        
        {(title || icon) && (
          <div className="schro-modal-header">
            {icon && <span className="schro-modal-icon">{icon}</span>}
            {title && <h2 className="schro-modal-title">{title}</h2>}
          </div>
        )}
        
        <div className="schro-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  type = 'warning'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} type={type} showCloseButton={false}>
      <div className="schro-modal-message">
        {message}
      </div>
      <div className="schro-modal-buttons">
        <button 
          className="schro-modal-button schro-modal-button-secondary"
          onClick={onClose}
        >
          {cancelText}
        </button>
        <button 
          className="schro-modal-button schro-modal-button-primary"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export const AlertModal = ({ 
  isOpen, 
  onClose, 
  title = '알림',
  message,
  buttonText = '확인',
  type = 'info'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} type={type} showCloseButton={false}>
      <div className="schro-modal-message">
        {message}
      </div>
      <div className="schro-modal-buttons">
        <button 
          className="schro-modal-button schro-modal-button-primary"
          onClick={onClose}
          style={{ width: '100%' }}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default Modal;