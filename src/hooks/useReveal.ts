import { useCallback, useRef } from 'react';

/** Adiciona a classe `is-visible` quando o elemento entra na tela. O estilo fica em `.reveal`. */
export function useReveal<T extends Element>() {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback((node: T | null) => {
    observer.current?.disconnect();
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }
    observer.current = new IntersectionObserver(
      ([entry], current) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        current.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    observer.current.observe(node);
  }, []);
}
