import { useState, type CSSProperties } from 'react';
import { ZoomableImage } from '../../components/ZoomableImage';
import { projects, sinlabsAnnotations } from '../../data/projects';
import { useReveal } from '../../hooks/useReveal';
import { useI18n } from '../../i18n/useI18n';
import { ProjectDecisions, ProjectFacts, ProjectHeader } from './ProjectParts';
import styles from './SinlabsCase.module.css';
import { useShotGroup } from './useShotGroup';

export function SinlabsCase() {
  const { t } = useI18n();
  const copy = t.projects.sinlabs;
  const shots = projects.sinlabs.shots;
  const group = useShotGroup(shots);
  const [highlight, setHighlight] = useState<number | null>(null);
  const reveal = useReveal<HTMLDivElement>();
  const [main, ...others] = shots;

  return (
    <article id="project-sinlabs" className={styles.sinlabs} aria-labelledby="project-sinlabs-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="sinlabs" number="02" />

        <div className={styles.spread}>
          <figure className={styles.annotated}>
            <div className={styles.canvas}>
              <ZoomableImage shot={main} alt={group[0].alt} group={group} index={0} sizes="(min-width: 75em) 46rem, 100vw" />
              <ol className={styles.markers} aria-hidden="true">
                {sinlabsAnnotations.map((point, index) => (
                  <li
                    key={index}
                    data-active={highlight === index}
                    style={{ '--x': `${point.x}%`, '--y': `${point.y}%` } as CSSProperties}
                  >
                    {index + 1}
                  </li>
                ))}
              </ol>
            </div>
            <figcaption>{group[0].caption}</figcaption>
          </figure>

          <div className={styles.legend}>
            <h4 className={styles.legendTitle}>{copy.annotationsTitle}</h4>
            <ol className={styles.legendList}>
              {copy.annotations.map((annotation, index) => (
                <li
                  key={annotation}
                  onMouseEnter={() => setHighlight(index)}
                  onMouseLeave={() => setHighlight(null)}
                >
                  <span className={styles.legendNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  {annotation}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.more}>
          <h4 className="visually-hidden">{t.projects.labels.gallery}</h4>
          <ul role="list" className={styles.thumbs}>
            {others.map((shot, index) => (
              <li key={shot.id}>
                <figure>
                  <ZoomableImage
                    shot={shot}
                    alt={group[index + 1].alt}
                    group={group}
                    index={index + 1}
                    sizes="(min-width: 56em) 22rem, 100vw"
                  />
                  <figcaption>{group[index + 1].caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className={styles.dataNote}>{copy.dataNote}</p>
        </div>

        <ProjectFacts id="sinlabs" columns />

        <ProjectDecisions id="sinlabs" />
      </div>
    </article>
  );
}
