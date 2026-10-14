'use client';

import Link from 'next/link';
import styles from '../auth.module.scss';
import { useActionState } from 'react';
import { registerAction } from '@/actions/auth';
import { BaseButton, BaseInput } from '@/components/ui';

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

        <BaseInput
          id="name"
          name="name"
          type="text"
          label="Имя"
          placeholder="Иван Иванов"
          autoComplete="name"
          required
          defaultValue={state?.fields?.name}
        />

        <BaseInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          defaultValue={state?.fields?.email}
        />

        <BaseInput
          id="password"
          name="password"
          type="password"
          label="Пароль"
          placeholder="Не менее 6 символов"
          autoComplete="new-password"
          required
        />

        <BaseInput
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          required
        />

        <BaseButton
          type="submit"
          isLoading={isPending}
          className={styles.submitButton}
        >
          Зарегистрироваться
        </BaseButton>
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
