'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

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
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Сменить тему"
      style={{
        cursor: 'pointer',
        padding: '6px 10px',
        borderRadius: '8px',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        background: 'transparent',
        fontSize: '16px',
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
