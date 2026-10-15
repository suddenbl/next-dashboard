import { IToast } from '@/lib/types';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { DEFAULT_TITLES, ICONS } from './const';

interface IProps {
  toast: IToast;
  onClose: (id: string) => void;
}

export const ToastItem = ({ toast, onClose }: IProps) => {
  const title = DEFAULT_TITLES[toast.type];

  useEffect(() => {
    const duration = toast.duration || 3000;
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      onClose(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <div className={styles.toastHeader}>
        <div className={styles.titleGroup}>
          <span className={styles.icon}>{ICONS[toast.type]}</span>

          <p>{title}</p>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => onClose(toast.id)}
          aria-label="Закрыть"
        >
          ✕
        </button>
      </div>

      <div className={styles.toastBody}>
        <p className={styles.toastMessage}>{toast.message}</p>
      </div>
    </div>
  );
};
