'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
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
    <button
      className={styles.button}
      aria-label="Сменить тему"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
