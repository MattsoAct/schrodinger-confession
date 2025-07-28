import { Confession } from '../entities/Confession.js';

export class CreateConfessionUseCase {
  constructor(confessionRepository, paymentService) {
    this.confessionRepository = confessionRepository;
    this.paymentService = paymentService;
  }

  async execute({ content, receiverName, senderName, isPremium = false }) {
    if (!content || !receiverName || !senderName) {
      throw new Error('All fields are required');
    }

    if (content.length > 1000) {
      throw new Error('Content too long');
    }

    const confession = new Confession({
      content,
      receiverName,
      senderName,
      isPremium,
      expiresAt: this._calculateExpiryDate(isPremium)
    });

    if (isPremium) {
      const payment = await this.paymentService.createPayment({
        amount: 1000,
        orderName: `프리미엄 편지 - ${receiverName}님에게`,
        orderId: `confession_${Date.now()}`
      });

      return { confession, payment, requiresPayment: true };
    }

    const savedConfession = await this.confessionRepository.save(confession);
    return { confession: savedConfession, requiresPayment: false };
  }

  _calculateExpiryDate(isPremium) {
    const now = new Date();
    const days = isPremium ? 30 : 7;
    return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  }
}