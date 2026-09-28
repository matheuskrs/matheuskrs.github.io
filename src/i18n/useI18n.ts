import { useContext } from 'react';
import { I18nContext } from './I18nContext';

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n precisa estar dentro de I18nProvider.');
  return value;
}
