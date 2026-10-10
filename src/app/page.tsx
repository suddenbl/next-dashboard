import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.badge__dot} />
        Простой учёт финансов
      </div>

      <h1 className={styles.title}>
        Контролируй свои деньги <br />
        <span className={styles.title__gradient}>
          без сложных таблиц и Excel
        </span>
      </h1>

      <p className={styles.description}>
        Учитывай расходы, планируй бюджет и понимай, куда уходят деньги — всё в
        одном понятном приложении.
      </p>

      <div className={styles.actions}>
        <div className={styles.actions__wrapper}>
          <Link href="/register" className={styles.actions__primary}>
            Регистрация
          </Link>

          <Link href="/login" className={styles.actions__secondary}>
            Авторизация
          </Link>
        </div>

        <Link href="/dashboard" className={styles.actions__link}>
          Перейти к дашбордам →
        </Link>
      </div>
    </main>
  );
}
