import { toast } from "sonner";

/**
 * Centralized error handling utility
 * Displays user-friendly error messages and logs to console
 */

export interface APIError {
  message: string;
  code?: string;
  details?: any;
}

export class ErrorHandler {
  /**
   * Handle API errors with toast notifications
   */
  static handleAPIError(error: any, context?: string): void {
    console.error(`❌ ${context || 'API Error'}:`, error);

    let errorMessage = "An unexpected error occurred. Please try again.";

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    toast.error(errorMessage, {
      description: context ? `Context: ${context}` : undefined,
      duration: 5000,
    });
  }

  /**
   * Handle success messages
   */
  static success(message: string, description?: string): void {
    toast.success(message, {
      description,
      duration: 3000,
    });
  }

  /**
   * Handle warning messages
   */
  static warning(message: string, description?: string): void {
    toast.warning(message, {
      description,
      duration: 4000,
    });
  }

  /**
   * Handle info messages
   */
  static info(message: string, description?: string): void {
    toast.info(message, {
      description,
      duration: 3000,
    });
  }

  /**
   * Handle network errors specifically
   */
  static handleNetworkError(): void {
    toast.error("Network Error", {
      description: "Please check your internet connection and try again.",
      duration: 5000,
    });
  }

  /**
   * Handle authentication errors
   */
  static handleAuthError(redirect: boolean = true): void {
    toast.error("Authentication Required", {
      description: "Please log in to continue.",
      duration: 4000,
    });

    if (redirect && typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }

  /**
   * Handle validation errors
   */
  static handleValidationError(errors: Record<string, string>): void {
    const errorMessages = Object.entries(errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join('\n');

    toast.error("Validation Error", {
      description: errorMessages,
      duration: 5000,
    });
  }

  /**
   * Catch-all for unknown errors
   */
  static handleUnknownError(error: unknown, context?: string): void {
    console.error(`❌ Unknown error ${context ? `(${context})` : ''}:`, error);

    toast.error("Something went wrong", {
      description: "Our team has been notified. Please try again later.",
      duration: 5000,
    });
  }
}

/**
 * Async function wrapper with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context?: string,
  onError?: (error: any) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    ErrorHandler.handleAPIError(error, context);
    if (onError) {
      onError(error);
    }
    return null;
  }
}

/**
 * Custom error types
 */
export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Error boundary helper for React components
 */
export function logErrorToService(error: Error, errorInfo: any): void {
  // TODO: Send to error tracking service (e.g., Sentry)
  console.error('React Error Boundary caught:', error, errorInfo);
  
  // For now, just log to console
  // In production, send to monitoring service:
  // Sentry.captureException(error, { extra: errorInfo });
}
