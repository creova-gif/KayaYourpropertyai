import { useState, useEffect, useCallback } from 'react';
import { ErrorHandler } from '../utils/errorHandling';

interface UseFetchOptions<T> {
  initialData?: T;
  skip?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
}

/**
 * Hook for fetching data with loading and error states
 * 
 * @example
 * const { data, loading, error, refetch } = useFetch<Property[]>(
 *   '/api/properties',
 *   { initialData: [] }
 * );
 */
export function useFetch<T = any>(
  url: string | null,
  options: UseFetchOptions<T> = {}
) {
  const {
    initialData,
    skip = false,
    onSuccess,
    onError,
    showErrorToast = true,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(!skip && !!url);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!url || skip) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error);
      
      if (showErrorToast) {
        ErrorHandler.error('Error', error.message);
      }
      
      if (onError) {
        onError(error);
      }
      
      console.error('Fetch error:', error);
      
    } finally {
      setLoading(false);
    }
  }, [url, skip, onSuccess, onError, showErrorToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
}

/**
 * Hook for fetching data with authorization
 */
export function useAuthFetch<T = any>(
  url: string | null,
  token: string | null,
  options: UseFetchOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [loading, setLoading] = useState(!options.skip && !!url);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!url || !token || options.skip) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error);
      
      if (options.showErrorToast !== false) {
        ErrorHandler.error('Error', error.message);
      }
      
      if (options.onError) {
        options.onError(error);
      }
      
      console.error('Fetch error:', error);
      
    } finally {
      setLoading(false);
    }
  }, [url, token, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
}
