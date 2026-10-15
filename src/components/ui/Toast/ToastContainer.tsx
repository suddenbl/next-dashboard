import { IToast } from '@/lib/types';
import styles from './styles.module.scss';
import { ToastItem } from './ToastItem';

interface IProps {
  toasts: IToast[];
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: IProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => {
        return <ToastItem key={toast.id} toast={toast} onClose={onRemove} />;
      })}
    </div>
  );
};
