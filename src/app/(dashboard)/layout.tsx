import type { ReactNode } from 'react';
import Link from 'next/link';
import { logoutAction } from '@/actions/auth';
import { getCurrentUser } from '@/lib/user';
import { ThemeToggleButton } from '@/components/common';
import { BaseButton } from '@/components/ui';
import styles from './layout.module.scss';

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

          <ThemeToggleButton />

          <form action={logoutAction}>
            <BaseButton type="submit" variant="ghost" size="sm">
              Выйти
            </BaseButton>
          </form>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
