'use client';

import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { loginAction } from '@/actions/auth';
import { BaseButton, BaseInput } from '@/components/ui';
import { useToast } from '@/providers';
import styles from '../auth.module.scss';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const { error } = useToast();

  useEffect(() => {
    if (state?.error) {
      error(state.error);
    }
  }, [state?.error, error]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Вход в аккаунт</h1>

        <p className={styles.subtitle}>
          Введите ваш email и пароль для входа в сервис
        </p>
      </div>

      <form className={styles.form} action={formAction}>
        {state?.error && <p className={styles.errorBanner}>{state.error}</p>}

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

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Пароль</span>
            <Link href="#" className={styles.forgotLink}>
              Забыли пароль?
            </Link>
          </div>

          <BaseInput
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <BaseButton
          type="submit"
          isLoading={isPending}
          className={styles.submitButton}
        >
          Войти
        </BaseButton>
      </form>

      <div className={styles.footer}>
        Нет аккаунта?
        <Link href="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
