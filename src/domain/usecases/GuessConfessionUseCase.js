export class GuessConfessionUseCase {
  constructor(confessionRepository) {
    this.confessionRepository = confessionRepository;
  }

  async execute(confessionId, guessedName) {
    if (!confessionId || !guessedName) {
      throw new Error('Confession ID and guessed name are required');
    }

    const confession = await this.confessionRepository.findById(confessionId);
    if (!confession) {
      throw new Error('Confession not found');
    }

    if (!confession.canAttemptGuess()) {
      throw new Error('No more attempts allowed or confession already revealed');
    }

    confession.incrementAttempt();

    const isCorrect = this._normalizeString(guessedName) === this._normalizeString(confession.senderName);
    
    if (isCorrect) {
      confession.reveal();
    }

    await this.confessionRepository.save(confession);

    return {
      isCorrect,
      confession,
      remainingAttempts: confession.getRemainingAttempts()
    };
  }

  _normalizeString(str) {
    return str.trim().toLowerCase().replace(/\s+/g, '');
  }
}