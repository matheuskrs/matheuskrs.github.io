import { lazy, Suspense } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { useReveal } from '../../hooks/useReveal';
import { useI18n } from '../../i18n/useI18n';
import styles from './DeepwokendleCase.module.css';
import { ProjectDecisions, ProjectFacts, ProjectHeader } from './ProjectParts';
import { TourPlayer } from './TourPlayer';

const TechGuess = lazy(() => import('./TechGuess'));

export function DeepwokendleCase() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();
  const [gameRef, gameNear] = useNearViewport<HTMLDivElement>();

  return (
    <article id="project-deepwokendle" className={styles.deepwokendle} aria-labelledby="project-deepwokendle-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="deepwokendle" number="03" />

        <div className={styles.lead}>
          <TourPlayer />
          <ProjectFacts id="deepwokendle" />
        </div>

        <ProjectDecisions id="deepwokendle" />

        <div ref={gameRef} className={styles.game}>
          {gameNear ? (
            <Suspense fallback={<div className={styles.placeholder}>{t.common.loading}</div>}>
              <TechGuess />
            </Suspense>
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>
      </div>
    </article>
  );
}
