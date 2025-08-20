import { Payment } from '../../domain/entities/Payment.js';

export class PortOnePaymentServiceV2 {
  constructor() {
    // 환경 변수 우선, 없으면 하드코딩 값 사용
    this.apiSecret = process.env.REACT_APP_PORTONE_API_SECRET || 'QiCrz1DRaTMHN5kN37tphXINaHUSVI7lIf7uOdJenDKYeZCkqkGEJmaNQFtwiPyMPZb7ZMZ1IDNedjm9';
    this.storeId = process.env.REACT_APP_PORTONE_STORE_ID || 'store-196b8657-5a55-42d0-8e6b-e0d6f9679b04';
    this.channelKey = process.env.REACT_APP_PORTONE_CHANNEL_KEY || 'channel-key-4685bfe7-3e86-4d99-ba56-d58ec6a87ddc';
    this.apiUrl = 'https://api.portone.io/v2';
    // 무료 사용 가능한 특별 이메일 주소
    this.freeEmails = ['so.act.kr@gmail.com'];
  }
  
  // 무료 사용 가능한 이메일인지 확인하는 함수
  isFreeEmail(email) {
    if (!email) return false;
    return this.freeEmails.includes(email.toLowerCase());
  }

  async initialize() {
    console.log('🔧 포트원 V2 초기화 시작...');
    
    // 환경 변수 확인
    console.log('📋 환경 변수 확인:', {
      apiSecret: this.apiSecret ? '설정됨' : '미설정',
      storeId: this.storeId ? this.storeId : '미설정',
      channelKey: this.channelKey ? this.channelKey : '미설정'
    });
    
    if (!this.apiSecret || !this.storeId || !this.channelKey) {
      const missingVars = [];
      if (!this.apiSecret) missingVars.push('REACT_APP_PORTONE_API_SECRET');
      if (!this.storeId) missingVars.push('REACT_APP_PORTONE_STORE_ID');
      if (!this.channelKey) missingVars.push('REACT_APP_PORTONE_CHANNEL_KEY');
      
      throw new Error(`포트원 V2 환경 변수가 누락되었습니다: ${missingVars.join(', ')}`);
    }

    // 포트원 V2 SDK를 CDN에서 로드
    if (!window.PortOne) {
      console.log('📦 포트원 SDK 로딩 중...');
      await this.loadPortOneSDK();
    } else {
      console.log('✅ 포트원 SDK 이미 로드됨');
    }
    
    console.log('🎉 포트원 V2 초기화 완료');
    return true;
  }

  async loadPortOneSDK() {
    return new Promise((resolve, reject) => {
      if (window.PortOne) {
        console.log('✅ 포트원 SDK 이미 존재함');
        resolve();
        return;
      }

      console.log('🔄 포트원 SDK 스크립트 태그 생성 중...');
      const script = document.createElement('script');
      script.src = 'https://cdn.portone.io/v2/browser-sdk.js';
      
      script.onload = () => {
        console.log('📦 포트원 SDK 스크립트 로드 완료');
        
        // 잠시 대기 후 window.PortOne 확인
        setTimeout(() => {
          if (window.PortOne) {
            console.log('✅ 포트원 V2 SDK 초기화 성공:', typeof window.PortOne);
            resolve();
          } else {
            console.error('❌ 포트원 SDK 로드되었지만 window.PortOne이 없음');
            reject(new Error('포트원 SDK가 제대로 로드되지 않았습니다.'));
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        console.error('❌ 포트원 SDK 스크립트 로드 실패:', error);
        reject(new Error('포트원 SDK 네트워크 로드 실패'));
      };
      
      console.log('🌐 포트원 SDK 스크립트 DOM에 추가 중...');
      document.head.appendChild(script);
    });
  }

  // 테스트용 결제 ID 생성 (결제사 승인용)
  generateTestPaymentId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `test_payment_${timestamp}_${random}`;
  }

  async createPayment({ amount, orderName, orderId }) {
    const payment = new Payment({
      orderId,
      amount,
      status: 'PENDING'
    });

    return payment;
  }

  async requestPayment(paymentData) {
    // 무료 이메일 주소일 경우 실제 결제 대신 가상 성공 응답 반환
    if (this.isFreeEmail(paymentData.customerEmail)) {
      console.log(`💌 무료 이메일 "${paymentData.customerEmail}" 감지: 실제 결제를 건너뛰고 가상 성공 응답을 반환합니다.`);
      
      const testPaymentId = this.generateTestPaymentId();
      
      // 실제 결제 완료와 동일한 형태로 응답 생성
      return {
        code: null, // 성공 시 null
        message: null,
        paymentId: testPaymentId,
        transactionType: 'PAYMENT',
        txId: `free_tx_${Date.now()}`,
        status: 'PAID', // 결제 완료 상태
        paidAt: new Date().toISOString(),
        orderName: paymentData.orderName || '슈로의 프리미엄 편지',
        amount: {
          total: paymentData.amount,
          currency: 'KRW'
        },
        customer: {
          fullName: paymentData.customerName || '무료 사용자',
          phoneNumber: paymentData.customerPhone,
          email: paymentData.customerEmail,
        }
      };
    }

    await this.initialize();
    
    if (!window.PortOne) {
      throw new Error('포트원 SDK가 로드되지 않았습니다.');
    }

    console.log('포트원 결제 요청 시작:', {
      storeId: this.storeId,
      channelKey: this.channelKey,
      paymentId: paymentData.orderId,
      amount: paymentData.amount,
      payMethod: paymentData.payMethod || 'CARD'
    });

    try {
      // 결제 방법에 따라 payMethod 설정
      let payMethod = 'CARD';
      if (paymentData.method === '계좌이체') payMethod = 'TRANSFER';
      else if (paymentData.method === '카카오페이') payMethod = 'EASY_PAY';

      // 이메일 형식 검증 (KG이니시스는 필수)
      const validateEmail = (email) => {
        if (!email || typeof email !== 'string' || email.trim() === '') {
          throw new Error('결제를 위해서는 구매자 이메일이 필요합니다. 로그인 후 다시 시도해주세요.');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          throw new Error('올바른 이메일 형식이 아닙니다.');
        }
        return email.trim();
      };

      // 전화번호 형식 검증
      const validatePhone = (phone) => {
        if (!phone || typeof phone !== 'string' || phone.trim() === '') {
          return null;
        }
        return phone.trim();
      };

      const validEmail = validateEmail(paymentData.customerEmail);
      const validPhone = validatePhone(paymentData.customerPhone);

      // 테스트용 설정 (개발 중에만 사용)
      const isTestMode = window.location.hostname === 'localhost';
      
      const paymentRequest = {
        storeId: this.storeId,
        paymentId: isTestMode ? 'DemoTest_1754531378956' : paymentData.orderId,
        orderName: paymentData.orderName || '슈로의 프리미엄 편지',
        totalAmount: paymentData.amount, // 실제 결제 금액 사용
        currency: 'KRW',
        channelKey: this.channelKey,
        payMethod: payMethod,
        customer: {
          fullName: paymentData.customerName || '고객',
          email: validEmail, // KG이니시스 필수 필드
          ...(validPhone && { phoneNumber: validPhone }),
        },
        customData: {
          orderId: paymentData.orderId,
          letterType: 'premium',
          ...(isTestMode && { testMode: true })
        },
        redirectUrl: `${window.location.origin}/payment/success`,
        // 웹훅 URL 제거 - 클라이언트 사이드에서만 처리
      };

      if (isTestMode) {
        console.log('🧪 테스트 모드 활성화 - KG이니시스 테스트 결제');
        console.log('테스트 결제 정보:', {
          paymentId: 'DemoTest_1754531378956',
          amount: 1000,
          mid: 'INIpayTest (포트원 콘솔에서 설정 필요)'
        });
      }

      console.log('포트원 결제창 호출 중...', paymentRequest);
      const response = await window.PortOne.requestPayment(paymentRequest);
      
      console.log('포트원 결제 응답:', response);

      if (response.code) {
        // 결제 실패
        throw new Error(response.message || '결제에 실패했습니다.');
      }

      return response;
    } catch (error) {
      console.error('포트원 결제 요청 오류:', error);
      throw error;
    }
  }

  async getPaymentInfo(paymentId) {
    // 무료 결제 ID일 경우 가상 결제 정보 반환
    if (paymentId.startsWith('test_payment_')) {
      console.log('💌 무료 결제 ID 감지: 가상 결제 정보를 반환합니다.');
      
      return {
        paymentId: paymentId,
        status: 'PAID',
        orderName: '슈로의 프리미엄 편지',
        amount: {
          total: 0, // 무료이므로 0원
          currency: 'KRW'
        },
        paidAt: new Date().toISOString(),
        customer: {
          fullName: '무료 사용자',
          email: 'so.act.kr@gmail.com',
          phoneNumber: '010-0000-0000'
        },
        txId: `free_tx_${Date.now()}`
      };
    }

    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `PortOne ${this.apiSecret}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`결제 정보 조회 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`결제 정보 조회 오류: ${error.message}`);
    }
  }

  async confirmPayment(paymentId) {
    try {
      // 포트원 V2에서는 자동 승인되므로 상태만 확인
      const paymentInfo = await this.getPaymentInfo(paymentId);
      
      if (paymentInfo.status === 'PAID') {
        return {
          success: true,
          payment: paymentInfo
        };
      } else {
        throw new Error(`결제가 완료되지 않았습니다. 상태: ${paymentInfo.status}`);
      }
    } catch (error) {
      throw new Error(`결제 확인 오류: ${error.message}`);
    }
  }

  async cancelPayment(paymentId, reason = '사용자 취소') {
    try {
      const response = await fetch(`${this.apiUrl}/payments/${paymentId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `PortOne ${this.apiSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error(`결제 취소 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`결제 취소 오류: ${error.message}`);
    }
  }

  // 웹훅 검증 (서버사이드에서 사용)
  async verifyWebhook(webhookData, signature) {
    try {
      // 포트원 V2 웹훅 서명 검증 로직
      // 실제 구현 시 서버에서 처리해야 함
      return true;
    } catch (error) {
      throw new Error(`웹훅 검증 오류: ${error.message}`);
    }
  }
}