import { useEffect, useState } from 'react';
import happy from '../assets/pixel/happy.webp';
import { CvActions } from '../components/CvActions';
import { Icon } from '../components/Icon';
import { contacts } from '../data/contacts';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import styles from './Contact.module.css';

type CopyState = 'idle' | 'copied' | 'failed';

export function Contact() {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    if (copyState !== 'copied') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contacts.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  const feedback =
    copyState === 'copied' ? t.contact.copied : copyState === 'failed' ? fill(t.contact.copyFailed, { email: contacts.email }) : '';

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{t.contact.kicker}</p>
          <h2 id="contact-title" className={styles.title}>
            {t.contact.title}
          </h2>
          <p className={styles.body}>{t.contact.body}</p>

          <div className={styles.email}>
            <span className={styles.emailLabel}>{t.contact.emailLabel}</span>
            <div className={styles.emailRow}>
              <a href={`mailto:${contacts.email}`} className={styles.emailLink}>
                {contacts.email}
              </a>
              <div className={styles.emailActions}>
                <button type="button" className={styles.iconButton} onClick={copyEmail} aria-label={t.contact.copy}>
                  <Icon name={copyState === 'copied' ? 'check' : 'copy'} size={18} />
                </button>
                <a href={`mailto:${contacts.email}`} className={styles.iconButton} aria-label={t.contact.send}>
                  <Icon name="send" size={18} />
                </a>
              </div>
            </div>
            <p className={styles.feedback} role="status">
              {feedback}
            </p>
          </div>

          <ul role="list" className={styles.links} aria-label={t.contact.linksLabel}>
            <li>
              <a href={contacts.linkedin.href} target="_blank" rel="noopener">
                <Icon name="linkedin" size={18} />
                <span>
                  <span className={styles.linkLabel}>{t.contact.linkedin}</span>
                  {contacts.linkedin.display}
                </span>
                <span className="visually-hidden"> {t.common.newTab}</span>
              </a>
            </li>
            <li>
              <a href={contacts.github.href} target="_blank" rel="noopener">
                <Icon name="github" size={18} />
                <span>
                  <span className={styles.linkLabel}>{t.contact.github}</span>
                  {contacts.github.display}
                </span>
                <span className="visually-hidden"> {t.common.newTab}</span>
              </a>
            </li>
            <li>
              <a href={contacts.phone.href}>
                <Icon name="phone" size={18} />
                <span>
                  <span className={styles.linkLabel}>{t.contact.phone}</span>
                  {contacts.phone.display}
                </span>
              </a>
            </li>
          </ul>

          <div className={styles.cv}>
            <span className={styles.linkLabel}>{t.contact.cv}</span>
            <CvActions tone="inverse" />
          </div>
        </div>

        <img className={styles.sprite} src={happy} width={640} height={564} alt="" loading="lazy" />
      </div>
    </section>
  );
}
