import { ZoomableImage } from '../../components/ZoomableImage';
import { projects } from '../../data/projects';
import { useReveal } from '../../hooks/useReveal';
import { useI18n } from '../../i18n/useI18n';
import styles from './ConcordCase.module.css';
import { ProjectDecisions, ProjectFacts, ProjectHeader } from './ProjectParts';
import { TopologySimulation } from './TopologySimulation';
import { useShotGroup } from './useShotGroup';

export function ConcordCase() {
  const { t } = useI18n();
  const copy = t.projects.concord;
  const shots = projects.concord.shots;
  const group = useShotGroup(shots);
  const reveal = useReveal<HTMLDivElement>();

  return (
    <article id="project-concord" className={styles.concord} data-tone="stage" aria-labelledby="project-concord-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="concord" number="01" />

        <div className={styles.lead}>
          <TopologySimulation />
          <ProjectFacts id="concord" />
        </div>

        <div className={styles.gallery}>
          <h4 className="visually-hidden">{t.projects.labels.gallery}</h4>
          {shots.map((shot, index) => (
            <figure key={shot.id} className={styles.window}>
              <div className={styles.chrome} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <ZoomableImage
                shot={shot}
                alt={group[index].alt}
                group={group}
                index={index}
                sizes="(min-width: 56em) 36rem, 100vw"
              />
              <figcaption>{group[index].caption}</figcaption>
            </figure>
          ))}
        </div>

        <ProjectDecisions id="concord" />

        <details className={styles.more}>
          <summary>{copy.moreTitle}</summary>
          <ul>
            {copy.more.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}
