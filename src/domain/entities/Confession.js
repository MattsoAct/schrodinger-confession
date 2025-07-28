export class Confession {
  constructor({
    id,
    content,
    receiverName,
    senderName,
    attempts = 0,
    maxAttempts = 3,
    isRevealed = false,
    isPremium = false,
    createdAt,
    expiresAt
  }) {
    this.id = id;
    this.content = content;
    this.receiverName = receiverName;
    this.senderName = senderName;
    this.attempts = attempts;
    this.maxAttempts = maxAttempts;
    this.isRevealed = isRevealed;
    this.isPremium = isPremium;
    this.createdAt = createdAt || new Date();
    this.expiresAt = expiresAt;
  }

  canAttemptGuess() {
    return this.attempts < this.maxAttempts && !this.isRevealed && !this.isExpired();
  }

  incrementAttempt() {
    if (!this.canAttemptGuess()) {
      throw new Error('Cannot attempt guess');
    }
    this.attempts += 1;
  }

  reveal() {
    if (this.isExpired()) {
      throw new Error('Confession has expired');
    }
    this.isRevealed = true;
  }

  isExpired() {
    return this.expiresAt && new Date() > this.expiresAt;
  }

  getRemainingAttempts() {
    return Math.max(0, this.maxAttempts - this.attempts);
  }

  static fromData(data) {
    return new Confession({
      ...data,
      createdAt: new Date(data.created_at),
      expiresAt: data.expires_at ? new Date(data.expires_at) : null
    });
  }
}