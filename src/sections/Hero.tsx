import { useRef } from 'react';
import fullbody from '../assets/pixel/fullbody-front.webp';
import { CvActions } from '../components/CvActions';
import { Icon } from '../components/Icon';
import { profile } from '../data/contacts';
import { squash } from '../utils/squash';
import { useI18n } from '../i18n/useI18n';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useI18n();
  const sprite = useRef<HTMLImageElement>(null);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container-wide ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {profile.name}
          </h1>
          <p className={styles.lead}>{t.hero.lead}</p>
          <p className={styles.body}>{t.hero.body}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">
              {t.hero.ctaProjects}
              <Icon name="arrowDown" size={14} />
            </a>
            <CvActions />
          </div>
        </div>

        <figure className={styles.stage}>
          <img
            ref={sprite}
            className={styles.sprite}
            src={fullbody}
            width={382}
            height={1254}
            alt={t.hero.spriteAlt}
            fetchPriority="high"
            onPointerDown={() => squash(sprite.current)}
          />
          <div className={styles.shelf} aria-hidden="true" />
        </figure>
      </div>

      <div className="container-wide">
        <dl className={styles.facts} aria-label={t.hero.factsLabel}>
          {t.hero.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
