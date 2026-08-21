import { useState } from '#app';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'loading';
  title: string;
  message: string;
  duration?: number;
}

/**
 * Composable for managing application-wide toast notifications.
 * Provides methods for showing success, error, info, and loading toasts.
 */
export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => []);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    
    toasts.value.push(newToast);

    if (toast.type !== 'loading' && toast.duration !== 0) {
      // Automatically remove non-loading toasts after the duration
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4000);
    }

    return id;
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (title: string, message: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration });
  };

  const error = (title: string, message: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration });
  };

  const info = (title: string, message: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration });
  };

  const loading = (title: string, message: string) => {
    return addToast({ type: 'loading', title, message, duration: 0 });
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    loading
  };
};
