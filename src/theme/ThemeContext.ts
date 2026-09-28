import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeValue {
  theme: Theme;
  /** Aplica o tema no documento de forma síncrona e salva a escolha. */
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeValue | null>(null);
