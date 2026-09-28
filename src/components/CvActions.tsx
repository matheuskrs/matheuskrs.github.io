import { lazy, Suspense, useState } from 'react';
import { resumes } from '../data/contacts';
import { useI18n } from '../i18n/useI18n';
import { Icon } from './Icon';
import styles from './CvActions.module.css';

const CvPreviewModal = lazy(() => import('./CvPreviewModal'));

interface CvActionsProps {
  tone?: 'default' | 'inverse';
}

export function CvActions({ tone = 'default' }: CvActionsProps) {
  const { locale, t } = useI18n();
  const [previewRequested, setPreviewRequested] = useState(false);
  const [open, setOpen] = useState(false);
  const resume = resumes[locale];

  return (
    <div className={styles.actions} data-tone={tone}>
      <a className={styles.download} href={resume.href} download={resume.fileName}>
        <Icon name="download" size={16} />
        {t.cv.download}
      </a>
      <button
        type="button"
        className={styles.preview}
        onClick={() => {
          setPreviewRequested(true);
          setOpen(true);
        }}
      >
        <Icon name="eye" size={18} />
        {t.cv.preview}
      </button>
      {previewRequested && (
        <Suspense fallback={null}>
          <CvPreviewModal open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
