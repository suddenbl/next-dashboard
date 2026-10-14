import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { SelectOption } from './types';
import styles from './styles.module.scss';

export interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export const BaseSelect = forwardRef<HTMLSelectElement, IProps>(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder,
      id,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={`${styles.select} ${error ? styles.hasError : ''} ${className}`}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {options.length > 0
              ? options.map((option) => (
                  <option
                    key={String(option.value)}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          <span className={styles.arrow} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
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

BaseSelect.displayName = 'BaseSelect';
