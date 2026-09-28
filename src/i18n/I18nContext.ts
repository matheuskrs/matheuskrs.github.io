import { createContext } from 'react';
import type { Locale } from '../data/types';
import type { Messages } from './types';

export interface I18nValue {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nValue | null>(null);
