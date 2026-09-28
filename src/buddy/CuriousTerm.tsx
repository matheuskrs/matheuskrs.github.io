import type { ReactNode } from 'react';
import { useI18n } from '../i18n/useI18n';
import styles from './CuriousTerm.module.css';
import { useBuddy } from './useBuddy';

interface CuriousTermProps {
  id: string;
  children: ReactNode;
}

/** Destaca um termo com "?" quando o mini Matheus tem algo a dizer sobre ele. */
export function CuriousTerm({ id, children }: CuriousTermProps) {
  const { t } = useI18n();
  const { ask } = useBuddy();

  if (!t.buddy.terms[id]) return <>{children}</>;

  return (
    <button type="button" className={styles.term} onClick={() => ask(id)}>
      <span className={styles.text}>{children}</span>
      <span className={styles.mark} aria-hidden="true">
        ?
      </span>
      <span className="visually-hidden"> {t.buddy.askSuffix}</span>
    </button>
  );
}
