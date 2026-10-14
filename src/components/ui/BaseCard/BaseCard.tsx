import { HTMLAttributes, ReactNode } from 'react';
import { CardPadding } from './types';
import styles from './styles.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  padding?: CardPadding;
}

export const BaseCard = ({
  children,
  title,
  subtitle,
  padding = 'md',
  className = '',
  ...rest
}: IProps) => {
  return (
    <article
      className={`${styles.container} ${styles[padding]} ${className}`}
      {...rest}
    >
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}

      <div className={styles.body}>{children}</div>
    </article>
  );
};
