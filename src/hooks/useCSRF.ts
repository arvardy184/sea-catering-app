import { useState, useEffect } from 'react';

interface CSRFTokenResponse {
  success: boolean;
  csrfToken: string;
}

export const useCSRF = () => {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCSRFToken = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/csrf');
      const result: CSRFTokenResponse = await response.json();

      if (response.ok && result.success) {
        setCSRFToken(result.csrfToken);
      } else {
        throw new Error('Failed to fetch CSRF token');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching CSRF token:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  return {
    csrfToken,
    isLoading,
    error,
    refetch: fetchCSRFToken,
  };
}; 