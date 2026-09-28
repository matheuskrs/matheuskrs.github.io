import type { Shot } from '../data/types';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import { Icon } from './Icon';
import type { ViewerImage } from './ImageViewerContext';
import { useImageViewer } from './useImageViewer';
import styles from './ZoomableImage.module.css';

interface ZoomableImageProps {
  shot: Shot;
  alt: string;
  group: ViewerImage[];
  index: number;
  sizes: string;
  className?: string;
}

/** Miniatura que abre o visualizador em tela cheia. */
export function ZoomableImage({ shot, alt, group, index, sizes, className }: ZoomableImageProps) {
  const { t } = useI18n();
  const { openViewer } = useImageViewer();

  return (
    <button
      type="button"
      className={className ? `${styles.button} ${className}` : styles.button}
      onClick={() => openViewer(group, index)}
      aria-label={fill(t.projects.labels.expand, { alt })}
    >
      <img
        src={shot.srcSmall}
        srcSet={`${shot.srcSmall} 960w, ${shot.src} ${shot.width}w`}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className={styles.badge} aria-hidden="true">
        <Icon name="expand" size={14} />
      </span>
    </button>
  );
}
