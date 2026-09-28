import { lazy, Suspense, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { ImageViewerContext, type ViewerImage } from './ImageViewerContext';

const ImageViewer = lazy(() => import('./ImageViewer'));

interface ViewerState {
  images: ViewerImage[];
  index: number;
  open: boolean;
}

export function ImageViewerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ViewerState | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const openViewer = useCallback((images: ViewerImage[], index: number) => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setState({ images, index, open: true });
  }, []);

  const close = useCallback(() => {
    setState((current) => (current ? { ...current, open: false } : current));
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  const changeIndex = useCallback((index: number) => {
    setState((current) => (current ? { ...current, index } : current));
  }, []);

  const value = useMemo(() => ({ openViewer }), [openViewer]);

  return (
    <ImageViewerContext.Provider value={value}>
      {children}
      {state && (
        <Suspense fallback={null}>
          <ImageViewer
            images={state.images}
            index={state.index}
            open={state.open}
            onIndexChange={changeIndex}
            onClose={close}
          />
        </Suspense>
      )}
    </ImageViewerContext.Provider>
  );
}
