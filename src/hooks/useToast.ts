import { useState, useCallback, useRef } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Custom hook for toast management
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCountRef = useRef(0);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastCountRef.current}`;
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000, // Default 5 seconds
    };

    setToasts((current) => [...current, newToast]);

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((description: string, options?: Partial<Toast>) => {
    addToast({ ...options, description, type: 'success' });
  }, [addToast]);

  const error = useCallback((description: string, options?: Partial<Toast>) => {
    addToast({ ...options, description, type: 'error' });
  }, [addToast]);

  const warning = useCallback((description: string, options?: Partial<Toast>) => {
    addToast({ ...options, description, type: 'warning' });
  }, [addToast]);

  const info = useCallback((description: string, options?: Partial<Toast>) => {
    addToast({ ...options, description, type: 'info' });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
} 