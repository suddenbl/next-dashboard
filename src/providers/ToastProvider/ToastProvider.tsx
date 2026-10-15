'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { ToastContainer } from '@/components/ui/Toast';
import { ToastContext } from './ToastContext';
import { IToast, TToastType } from '@/lib/types';

interface IProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: IProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: TToastType = 'success', duration?: number) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, duration, type }]);
    },
    [],
  );

  const success = useCallback(
    (msg: string, dur?: number) => {
      addToast(msg, 'success', dur);
    },
    [addToast],
  );

  const error = useCallback(
    (msg: string, dur?: number) => addToast(msg, 'error', dur),
    [addToast],
  );

  const info = useCallback(
    (msg: string, dur?: number) => addToast(msg, 'info', dur),
    [addToast],
  );

  const warning = useCallback(
    (msg: string, dur?: number) => addToast(msg, 'warning', dur),
    [addToast],
  );

  const value = useMemo(
    () => ({ addToast, removeToast, success, error, info, warning }),
    [addToast, removeToast, success, error, info, warning],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
