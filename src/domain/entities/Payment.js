export class Payment {
  constructor({
    id,
    confessionId,
    orderId,
    amount,
    status = 'PENDING',
    paymentKey,
    method,
    createdAt,
    completedAt
  }) {
    this.id = id;
    this.confessionId = confessionId;
    this.orderId = orderId;
    this.amount = amount;
    this.status = status;
    this.paymentKey = paymentKey;
    this.method = method;
    this.createdAt = createdAt || new Date();
    this.completedAt = completedAt;
  }

  isCompleted() {
    return this.status === 'DONE';
  }

  isFailed() {
    return this.status === 'CANCELED' || this.status === 'FAILED';
  }

  isPending() {
    return this.status === 'PENDING';
  }

  complete(paymentKey) {
    this.status = 'DONE';
    this.paymentKey = paymentKey;
    this.completedAt = new Date();
  }

  fail() {
    this.status = 'FAILED';
  }

  static fromData(data) {
    return new Payment({
      ...data,
      createdAt: new Date(data.created_at),
      completedAt: data.completed_at ? new Date(data.completed_at) : null
    });
  }
}