'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { BaseButton } from '@/components/ui';
import styles from './ThemeToggleButton.module.scss';

const emptySubscribe = () => () => {};

export default function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <button style={{ width: 36, height: 36, visibility: 'hidden' }} />;
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <BaseButton
      className={styles.button}
      aria-label="Сменить тему"
      label={isDark ? '☀️' : '🌙'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  );
}
