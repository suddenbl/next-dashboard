import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './layout.module.scss';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.homeLink}>
        ← На главную
      </Link>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
