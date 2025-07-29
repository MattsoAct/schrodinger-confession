import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Payment } from '../../domain/entities/Payment.js';

export class TossPaymentService {
  constructor() {
    this.clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
    this.tossPayments = null;
  }

  async initialize() {
    if (!this.tossPayments) {
      this.tossPayments = await loadTossPayments(this.clientKey);
    }
    return this.tossPayments;
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
    const toss = await this.initialize();
    
    const payment = toss.payment({
      amount: paymentData.amount,
      orderId: paymentData.orderId,
      orderName: paymentData.orderName || '프리미엄 편지',
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
    
    return payment.requestPayment({
      method: 'CARD',
      card: {
        useEscrow: false,
        flowMode: 'DEFAULT',
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  async confirmPayment(paymentKey, orderId, amount) {
    try {
      const response = await fetch('/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment confirmation failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Payment confirmation error: ${error.message}`);
    }
  }
}