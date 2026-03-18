import { useState, useCallback } from 'react';
import { ErrorHandler } from '../utils/errorHandling';

interface UseAsyncActionOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Hook for handling async actions with loading states and error handling
 * 
 * @example
 * const { execute, loading, error } = useAsyncAction({
 *   successMessage: 'Property created!',
 *   errorMessage: 'Failed to create property'
 * });
 * 
 * const handleSubmit = () => {
 *   execute(async () => {
 *     const response = await fetch('/api/properties', { method: 'POST', ... });
 *     return response.json();
 *   });
 * };
 */
export function useAsyncAction(options: UseAsyncActionOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const execute = useCallback(async (asyncFn: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn();
      setData(result);
      
      // Show success message if provided
      if (options.successMessage) {
        ErrorHandler.success(options.successMessage);
      }
      
      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return { success: true, data: result };
      
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      
      // Show error message
      const errorMsg = options.errorMessage || error.message;
      ErrorHandler.error('Error', errorMsg);
      
      // Call error callback if provided
      if (options.onError) {
        options.onError(error);
      }
      
      console.error('Async action error:', error);
      return { success: false, error };
      
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}

/**
 * Hook for handling form submissions with loading states
 * 
 * @example
 * const { handleSubmit, loading, error } = useFormSubmit({
 *   onSubmit: async (formData) => {
 *     await saveData(formData);
 *   },
 *   successMessage: 'Saved successfully!'
 * });
 */
export function useFormSubmit<T = any>(options: {
  onSubmit: (data: T) => Promise<any>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent, data: T) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await options.onSubmit(data);
      
      if (options.successMessage) {
        ErrorHandler.success(options.successMessage);
      }
      
      if (options.onSuccess) {
        options.onSuccess();
      }
      
    } catch (err: any) {
      const errorMsg = options.errorMessage || err.message || 'An error occurred';
      setError(errorMsg);
      ErrorHandler.error('Error', errorMsg);
      
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    handleSubmit,
    loading,
    error,
    setError,
  };
}
