export type TToastType = 'success' | 'error' | 'info' | 'warning';

export interface IToast {
  id: string;
  message: string;
  type: TToastType;
  duration?: number;
}
