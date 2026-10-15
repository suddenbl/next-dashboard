'use client';

import { createContext, useContext } from 'react';
import { TToastType } from '@/lib/types';

export interface IToastContext {
  addToast: (message: string, type?: TToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

