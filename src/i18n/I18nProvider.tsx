import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale } from '../data/types';
import { I18nContext } from './I18nContext';
import { enUS } from './locales/en-US';
import { ptBR } from './locales/pt-BR';
import type { Messages } from './types';

const messages: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

const STORAGE_KEY = 'locale';

/** O script inline do index.html já resolveu URL, preferência salva e idioma do navegador. */
function readInitialLocale(): Locale {
  return document.documentElement.lang === 'en-US' ? 'en-US' : 'pt-BR';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);
  const t = messages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [locale, t]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem armazenamento disponível, a escolha vale só para esta visita.
    }
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next === 'en-US' ? 'en' : 'pt');
      window.history.replaceState(window.history.state, '', url);
    }
  }, []);

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
