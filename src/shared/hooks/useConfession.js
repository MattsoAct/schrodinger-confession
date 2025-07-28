import { useState, useCallback } from 'react';
import { serviceContainer } from '../container/ServiceContainer.js';
import { validateConfession, validateGuess } from '../utils/validation.js';

export const useConfession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createConfession = useCallback(async (confessionData) => {
    setLoading(true);
    setError(null);

    try {
      const validation = validateConfession(
        confessionData.content,
        confessionData.receiverName,
        confessionData.senderName
      );

      if (!validation.isValid) {
        throw new Error(validation.errors.join(' '));
      }

      const createConfessionUseCase = serviceContainer.get('createConfessionUseCase');
      const result = await createConfessionUseCase.execute(confessionData);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const guessConfession = useCallback(async (confessionId, guessedName) => {
    setLoading(true);
    setError(null);

    try {
      const validation = validateGuess(guessedName);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const guessConfessionUseCase = serviceContainer.get('guessConfessionUseCase');
      const result = await guessConfessionUseCase.execute(confessionId, guessedName);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createConfession,
    guessConfession,
    loading,
    error
  };
};