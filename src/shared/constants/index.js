export const CONFESSION_CONSTANTS = {
  MAX_ATTEMPTS: 3,
  MAX_CONTENT_LENGTH: 1000,
  EXPIRY_DAYS: {
    FREE: 7,
    PREMIUM: 30
  }
};

export const PAYMENT_CONSTANTS = {
  PREMIUM_PRICE: 1000,
  CURRENCY: 'KRW'
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONFESS: '/confess',
  CHECK: '/check',
  CHECK_ID: '/check/:id',
  MESSAGE: '/message/:id',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SETTINGS: '/settings',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAIL: '/payment/fail',
  CONTACT: '/contact'
};

export const STORAGE_KEYS = {
  CONFESSION_DRAFT: 'confession_draft',
  PAYMENT_DATA: 'payment_data'
};