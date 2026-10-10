import styles from './page.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>Дашборд</h1>
        <p className={styles.subtitle}>
          Обзор ваших финансов и текущих расходов
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Общий баланс</span>
          <span className={styles.statValue}>0 ₽</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Доходы за месяц</span>
          <span className={styles.statValue}>0 ₽</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Расходы за месяц</span>
          <span className={styles.statValue}>0 ₽</span>
        </div>
      </div>

      <div className={styles.placeholderCard}>
        <p>📊 Здесь появятся ваши графики и последние операции</p>
      </div>
    </div>
  );
}
