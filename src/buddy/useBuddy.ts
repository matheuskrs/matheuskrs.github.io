import { useContext } from 'react';
import { BuddyContext } from './BuddyContext';

export function useBuddy() {
  const value = useContext(BuddyContext);
  if (!value) throw new Error('useBuddy precisa estar dentro de BuddyProvider.');
  return value;
}
