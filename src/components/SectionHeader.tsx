import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  id: string;
  kicker: string;
  title: string;
  children?: ReactNode;
  tone?: 'default' | 'inverse';
}

export function SectionHeader({ id, kicker, title, children, tone = 'default' }: SectionHeaderProps) {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <div ref={reveal} className={`reveal ${styles.header}`} data-tone={tone}>
      <p className={styles.kicker}>
        <span className={styles.pixel} aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <div className={styles.intro}>{children}</div>}
    </div>
  );
}
