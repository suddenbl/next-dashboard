'use client';

import Link from 'next/link';
import styles from '../auth.module.scss';
import { useActionState } from 'react';
import { registerAction } from '@/actions/auth';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Регистрация</h1>

        <p className={styles.subtitle}>
          Создайте аккаунт для начала управления финансами
        </p>
      </div>

      <form action={formAction} className={styles.form}>
        {state?.error && <p className={styles.errorBanner}>{state.error}</p>}

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Имя
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Иван Иванов"
            autoComplete="name"
            required
            defaultValue={state?.fields?.name}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
            defaultValue={state?.fields?.email}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Не менее 6 символов"
            autoComplete="new-password"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="passwordConfirm" className={styles.label}>
            Подтверждение пароля
          </label>

          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Повторите пароль"
            autoComplete="new-password"
            required
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          Зарегистрироваться
        </button>
      </form>

      <div className={styles.footer}>
        Уже есть аккаунт?
        <Link href="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
}
