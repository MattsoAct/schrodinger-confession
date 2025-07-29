import { Payment } from '../../domain/entities/Payment.js';

export class PortOnePaymentServiceV2 {
  constructor() {
    this.apiSecret = process.env.REACT_APP_PORTONE_API_SECRET;
    this.storeId = process.env.REACT_APP_PORTONE_STORE_ID;
    this.channelKey = process.env.REACT_APP_PORTONE_CHANNEL_KEY;
    this.apiUrl = 'https://api.portone.io/v2';
  }

  async initialize() {
    if (!this.apiSecret || !this.storeId || !this.channelKey) {
      throw new Error('포트원 V2 설정이 올바르지 않습니다. 환경 변수를 확인해주세요.');
    }

    // 포트원 V2 SDK를 CDN에서 로드
    if (!window.PortOne) {
      await this.loadPortOneSDK();
    }
    
    return true;
  }

  async loadPortOneSDK() {
    return new Promise((resolve, reject) => {
      if (window.PortOne) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.portone.io/v2/browser-sdk.js';
      script.onload = () => {
        if (window.PortOne) {
          resolve();
        } else {
          reject(new Error('포트원 SDK 로드 실패'));
        }
      };
      script.onerror = () => reject(new Error('포트원 SDK 스크립트 로드 실패'));
      document.head.appendChild(script);
    });
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
    await this.initialize();
    
    if (!window.PortOne) {
      throw new Error('포트원 SDK가 로드되지 않았습니다.');
    }

    try {
      const response = await window.PortOne.requestPayment({
        storeId: this.storeId,
        paymentId: paymentData.orderId,
        orderName: paymentData.orderName || '슈로의 프리미엄 편지',
        totalAmount: paymentData.amount,
        currency: 'KRW',
        channelKey: this.channelKey,
        payMethod: 'CARD',
        customer: {
          fullName: paymentData.customerName || '고객',
          phoneNumber: paymentData.customerPhone,
          email: paymentData.customerEmail,
        },
        customData: {
          orderId: paymentData.orderId,
          letterType: 'premium'
        },
        redirectUrl: `${window.location.origin}/payment/success`,
        noticeUrls: [
          `${window.location.origin}/api/portone/webhook`
        ],
      });

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