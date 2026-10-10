import type { ReactNode } from 'react';
import Link from 'next/link';
import { logoutAction } from '@/actions/auth';
import styles from './layout.module.scss';
import { getCurrentUser } from '@/lib/user';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.brand}>
          <span className={styles.brandDot} />
          Финансы
        </Link>

        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>
            Дашборд
          </Link>

          <Link href="/transactions" className={styles.navLink}>
            Транзакции
          </Link>

          <Link href="/budgets" className={styles.navLink}>
            Бюджеты
          </Link>

          <Link href="/settings" className={styles.navLink}>
            Настройки
          </Link>
        </nav>

        <div className={styles.userActions}>
          <div>
            <p>{user?.name || 'Не авторизован!'}</p>
          </div>

          <form action={logoutAction}>
            <button type="submit" className={styles.logoutButton}>
              Выйти
            </button>
          </form>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
