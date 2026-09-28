import { useContext } from 'react';
import { ImageViewerContext } from './ImageViewerContext';

export function useImageViewer() {
  const value = useContext(ImageViewerContext);
  if (!value) throw new Error('useImageViewer precisa estar dentro de ImageViewerProvider.');
  return value;
}
