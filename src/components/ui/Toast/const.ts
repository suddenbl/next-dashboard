import { TToastType } from '@/lib/types';

export const DEFAULT_TITLES: Record<TToastType, string> = {
  success: 'Успешно',
  error: 'Ошибка',
  info: 'Информация',
  warning: 'Внимание',
};

export const ICONS: Record<TToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'ℹ',
};
