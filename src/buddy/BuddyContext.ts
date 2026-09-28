import { createContext } from 'react';

export interface BuddyValue {
  /** Abre o balão do mini Matheus com o texto do termo informado. */
  ask: (termId: string) => void;
}

export const BuddyContext = createContext<BuddyValue | null>(null);
