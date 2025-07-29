import * as PortOne from '@portone/browser-sdk';
import { Payment } from '../../domain/entities/Payment.js';

export class PortOnePaymentService {
  constructor() {
    this.storeId = process.env.REACT_APP_PORTONE_STORE_ID;
    this.channelKey = process.env.REACT_APP_PORTONE_CHANNEL_KEY;
  }

  async initialize() {
    // 포트원은 별도 초기화가 필요 없음
    if (!this.storeId || !this.channelKey) {
      throw new Error('포트원 설정이 올바르지 않습니다. 환경 변수를 확인해주세요.');
    }
    return true;
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
    
    const response = await PortOne.requestPayment({
      storeId: this.storeId,
      channelKey: this.channelKey,
      paymentId: paymentData.orderId,
      orderName: paymentData.orderName || '슈로의 프리미엄 편지',
      totalAmount: paymentData.amount,
      currency: 'KRW',
      payMethod: 'CARD',
      customer: {
        fullName: paymentData.customerName || '고객',
        email: paymentData.customerEmail,
        phoneNumber: paymentData.customerPhone,
      },
      redirectUrl: `${window.location.origin}/payment/success?paymentId={{paymentId}}&orderId={{merchant_uid}}&amount={{paid_amount}}`,
      noticeUrls: [
        `${window.location.origin}/api/portone/webhook`
      ],
    });

    if (response.code !== undefined) {
      // 결제 실패
      throw new Error(response.message || '결제에 실패했습니다.');
    }

    return response;
  }

  async confirmPayment(paymentId) {
    try {
      // 포트원 V2에서는 결제 승인이 자동으로 처리됨
      // 결제 상태만 확인
      const response = await fetch(`/api/portone/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Payment verification error: ${error.message}`);
    }
  }

  async cancelPayment(paymentId, reason = '사용자 취소') {
    try {
      const response = await fetch(`/api/portone/payments/${paymentId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment cancellation failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Payment cancellation error: ${error.message}`);
    }
  }
}