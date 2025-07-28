import { SupabaseConfessionRepository } from '../../infrastructure/api/SupabaseConfessionRepository.js';
import { TossPaymentService } from '../../infrastructure/api/TossPaymentService.js';
import { CreateConfessionUseCase } from '../../domain/usecases/CreateConfessionUseCase.js';
import { GuessConfessionUseCase } from '../../domain/usecases/GuessConfessionUseCase.js';

class ServiceContainer {
  constructor() {
    this._services = new Map();
    this._initialized = false;
  }

  initialize() {
    if (this._initialized) return;

    // Infrastructure layer
    this._services.set('confessionRepository', new SupabaseConfessionRepository());
    this._services.set('paymentService', new TossPaymentService());

    // Use cases
    this._services.set('createConfessionUseCase', 
      new CreateConfessionUseCase(
        this.get('confessionRepository'),
        this.get('paymentService')
      )
    );
    
    this._services.set('guessConfessionUseCase',
      new GuessConfessionUseCase(
        this.get('confessionRepository')
      )
    );

    this._initialized = true;
  }

  get(serviceName) {
    if (!this._initialized) {
      this.initialize();
    }
    
    const service = this._services.get(serviceName);
    if (!service) {
      throw new Error(`Service '${serviceName}' not found`);
    }
    return service;
  }
}

export const serviceContainer = new ServiceContainer();