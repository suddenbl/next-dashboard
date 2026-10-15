'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useToast } from '@/providers';

export function WelcomeToast() {
  const searchParams = useSearchParams();
  const { success } = useToast();
  const hasShown = useRef(false);

  useEffect(() => {
    if (!hasShown.current && searchParams.get('welcome') === 'true') {
      hasShown.current = true;
      success('Добро пожаловать! Аккаунт успешно создан.');

      const url = new URL(window.location.href);
      url.searchParams.delete('welcome');
      window.history.replaceState(
        {},
        '',
        url.pathname + (url.search ? url.search : ''),
      );
    }
  }, [searchParams, success]);

  return null;
}
