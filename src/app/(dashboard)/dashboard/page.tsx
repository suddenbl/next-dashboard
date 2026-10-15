import { Suspense } from 'react';
import styles from './page.module.scss';
import { BaseCard } from '@/components/ui';
import { WelcomeToast } from './WelcomeToast';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={null}>
        <WelcomeToast />
      </Suspense>
      <div className={styles.welcome}>
        <h1 className={styles.title}>Дашборд</h1>
        <p className={styles.subtitle}>
          Обзор ваших финансов и текущих расходов
        </p>
      </div>

      <div className={styles.statsGrid}>
        <BaseCard padding="md">
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Общий баланс</span>
            <span className={styles.statValue}>0 ₽</span>
          </div>
        </BaseCard>

        <BaseCard padding="md">
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Доходы за месяц</span>
            <span className={styles.statValue}>0 ₽</span>
          </div>
        </BaseCard>

        <BaseCard padding="md">
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Расходы за месяц</span>
            <span className={styles.statValue}>0 ₽</span>
          </div>
        </BaseCard>
      </div>

      <BaseCard padding="lg" className={styles.placeholderCard}>
        <p>📊 Здесь появятся ваши графики и последние операции</p>
      </BaseCard>
    </div>
  );
}
