import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { BuddyContext } from './BuddyContext';
import { BuddyWidget, type BuddyHandle, type BuddyMessage } from './BuddyWidget';

export function BuddyProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<BuddyMessage | null>(null);

  const widget = useRef<BuddyHandle>(null);

  const ask = useCallback((id: string) => {
    widget.current?.wake();
    setMessage({ id, key: Date.now() });
  }, []);
  const close = useCallback(() => setMessage(null), []);
  const value = useMemo(() => ({ ask }), [ask]);

  return (
    <BuddyContext.Provider value={value}>
      {children}
      <BuddyWidget ref={widget} message={message} onAsk={ask} onClose={close} />
    </BuddyContext.Provider>
  );
}
