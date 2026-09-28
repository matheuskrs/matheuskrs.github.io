import type { ReactNode } from 'react';
import { useI18n } from '../i18n/useI18n';
import styles from './CuriousTerm.module.css';
import { useBuddy } from './useBuddy';

interface CuriousTermProps {
  id: string;
  children: ReactNode;
}

/** Destaca um termo quando o mini Matheus tem algo a dizer sobre ele; o clique abre o balão. */
export function CuriousTerm({ id, children }: CuriousTermProps) {
  const { t } = useI18n();
  const { ask } = useBuddy();

  if (!t.buddy.terms[id]) return <>{children}</>;

  return (
    <button type="button" className={styles.term} onClick={() => ask(id)}>
      {children}
      <span className="visually-hidden"> {t.buddy.askSuffix}</span>
    </button>
  );
}
