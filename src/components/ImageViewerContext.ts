import { createContext } from 'react';

export interface ViewerImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageViewerValue {
  openViewer: (images: ViewerImage[], index: number) => void;
}

export const ImageViewerContext = createContext<ImageViewerValue | null>(null);
