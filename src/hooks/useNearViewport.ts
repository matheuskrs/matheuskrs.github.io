import { useCallback, useRef, useState } from 'react';

/** Vira `true` uma única vez, quando o elemento se aproxima da área visível. */
export function useNearViewport<T extends Element>(margin = '400px') {
  const [near, setNear] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      observer.current?.disconnect();
      if (!node) return;
      if (!('IntersectionObserver' in window)) {
        setNear(true);
        return;
      }
      observer.current = new IntersectionObserver(
        ([entry], current) => {
          if (!entry.isIntersecting) return;
          setNear(true);
          current.disconnect();
        },
        { rootMargin: margin },
      );
      observer.current.observe(node);
    },
    [margin],
  );

  return [ref, near] as const;
}
