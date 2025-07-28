import { CONFESSION_CONSTANTS } from '../constants/index.js';

export const validateConfession = (content, receiverName, senderName) => {
  const errors = [];

  if (!content || content.trim().length === 0) {
    errors.push('편지 내용을 입력해주세요.');
  }

  if (content.length > CONFESSION_CONSTANTS.MAX_CONTENT_LENGTH) {
    errors.push(`편지 내용은 ${CONFESSION_CONSTANTS.MAX_CONTENT_LENGTH}자 이하로 작성해주세요.`);
  }

  if (!receiverName || receiverName.trim().length === 0) {
    errors.push('받는 사람의 이름을 입력해주세요.');
  }

  if (!senderName || senderName.trim().length === 0) {
    errors.push('보내는 사람의 이름을 입력해주세요.');
  }

  if (receiverName && senderName && receiverName.trim().toLowerCase() === senderName.trim().toLowerCase()) {
    errors.push('받는 사람과 보내는 사람이 같을 수 없습니다.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const normalizeString = (str) => {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, '');
};

export const validateGuess = (guess) => {
  if (!guess || guess.trim().length === 0) {
    return {
      isValid: false,
      error: '이름을 입력해주세요.'
    };
  }

  return {
    isValid: true,
    error: null
  };
};