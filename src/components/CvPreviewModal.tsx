import { Modal } from 'antd';
import { resumes } from '../data/contacts';
import { useI18n } from '../i18n/useI18n';
import AntdTheme from '../theme/AntdTheme';
import { Icon } from './Icon';
import styles from './CvPreviewModal.module.css';

interface CvPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CvPreviewModal({ open, onClose }: CvPreviewModalProps) {
  const { locale, t } = useI18n();
  const resume = resumes[locale];

  return (
    <AntdTheme>
      <Modal
        open={open}
        onCancel={onClose}
        title={t.cv.modalTitle}
        footer={null}
        width={760}
        centered
        closable={{ 'aria-label': t.common.close }}
        classNames={{ body: styles.body }}
      >
        <div className={styles.page}>
          <img
            src={resume.preview}
            width={resume.previewWidth}
            height={resume.previewHeight}
            alt={t.cv.previewAlt}
            lang={locale}
          />
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href={resume.href} download={resume.fileName}>
            <Icon name="download" size={16} />
            {t.cv.downloadPdf}
          </a>
          <a className={styles.secondary} href={resume.href} target="_blank" rel="noopener">
            <Icon name="external" size={16} />
            {t.cv.openPdf}
            <span className="visually-hidden"> {t.common.newTab}</span>
          </a>
        </div>
      </Modal>
    </AntdTheme>
  );
}
