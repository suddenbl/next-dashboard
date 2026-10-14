import { InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './styles.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const BaseInput = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, helperText, id, className = '', ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${error ? styles.hasError : ''} ${className}`}
            {...rest}
          />
        </div>

        {error ? (
          <span className={styles.errorText}>{error}</span>
        ) : helperText ? (
          <span className={styles.helperText}>{helperText}</span>
        ) : null}
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
