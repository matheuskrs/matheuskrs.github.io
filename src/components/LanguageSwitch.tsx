import type { Locale } from '../data/types';
import { useI18n } from '../i18n/useI18n';
import styles from './LanguageSwitch.module.css';

const options: { locale: Locale; short: string; key: 'pt' | 'en' }[] = [
  { locale: 'pt-BR', short: 'PT', key: 'pt' },
  { locale: 'en-US', short: 'EN', key: 'en' },
];

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={styles.switch} role="group" aria-label={t.header.language.label}>
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          className={styles.option}
          aria-pressed={locale === option.locale}
          lang={option.locale}
          onClick={() => setLocale(option.locale)}
        >
          <span aria-hidden="true">{option.short}</span>
          <span className="visually-hidden">{t.header.language[option.key]}</span>
        </button>
      ))}
    </div>
  );
}
