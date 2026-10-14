'use client';

import { ReactNode, useEffect, useCallback } from 'react';
import { ModalSize } from './types';
import styles from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  size?: ModalSize;
  onClose: () => void;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: IProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className={styles.header}>
            <h3 className={styles.title}>{title}</h3>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </header>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
