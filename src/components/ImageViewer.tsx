import { Image } from 'antd';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import AntdTheme from '../theme/AntdTheme';
import { Icon, type IconName } from './Icon';
import styles from './ImageViewer.module.css';
import type { ViewerImage } from './ImageViewerContext';

interface ImageViewerProps {
  images: ViewerImage[];
  index: number;
  open: boolean;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function Labeled({ icon, label }: { icon: IconName; label: string }) {
  return (
    <>
      <Icon name={icon} size={18} />
      <span className="visually-hidden">{label}</span>
    </>
  );
}

export default function ImageViewer({ images, index, open, onIndexChange, onClose }: ImageViewerProps) {
  const { t } = useI18n();
  const caption = images[index]?.caption;

  return (
    <AntdTheme>
      <Image.PreviewGroup
        items={images.map(({ src, alt }) => ({ src, alt }))}
        preview={{
          open,
          current: index,
          onChange: (current) => onIndexChange(current),
          onOpenChange: (value) => {
            if (!value) onClose();
          },
          alt: t.viewer.label,
          closeIcon: <Labeled icon="close" label={t.viewer.close} />,
          countRender: (current, total) => fill(t.viewer.counter, { current, total }),
          actionsRender: (_, { actions, transform, current, total }) => (
            <div className={styles.toolbar}>
              {caption && <p className={styles.caption}>{caption}</p>}
              <div className={styles.buttons}>
                {total > 1 && (
                  <button type="button" onClick={() => actions.onActive(-1)} aria-label={t.viewer.previous} disabled={current === 0}>
                    <Icon name="arrowRight" size={16} className={styles.flip} />
                  </button>
                )}
                <button type="button" onClick={actions.onZoomOut} aria-label={t.viewer.zoomOut} disabled={transform.scale <= 1}>
                  <Icon name="minus" size={16} />
                </button>
                <button type="button" onClick={actions.onReset} aria-label={t.viewer.reset}>
                  <Icon name="expand" size={16} />
                </button>
                <button type="button" onClick={actions.onZoomIn} aria-label={t.viewer.zoomIn}>
                  <Icon name="plus" size={16} />
                </button>
                {total > 1 && (
                  <button type="button" onClick={() => actions.onActive(1)} aria-label={t.viewer.next} disabled={current === total - 1}>
                    <Icon name="arrowRight" size={16} />
                  </button>
                )}
              </div>
            </div>
          ),
        }}
        classNames={{ popup: { root: styles.root } }}
      />
    </AntdTheme>
  );
}
