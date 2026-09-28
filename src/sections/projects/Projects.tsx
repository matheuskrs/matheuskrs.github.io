import { SectionHeader } from '../../components/SectionHeader';
import { projects } from '../../data/projects';
import type { ProjectId } from '../../data/types';
import { useI18n } from '../../i18n/useI18n';
import { ConcordCase } from './ConcordCase';
import { DeepwokendleCase } from './DeepwokendleCase';
import styles from './Projects.module.css';
import { SinlabsCase } from './SinlabsCase';

const order: ProjectId[] = ['concord', 'sinlabs', 'deepwokendle'];

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader id="projects-title" kicker={t.projects.kicker} title={t.projects.title}>
          <p>{t.projects.intro}</p>
        </SectionHeader>
        <nav aria-label={t.projects.indexLabel}>
          <ol role="list" className={styles.index}>
            {order.map((id, index) => (
              <li key={id}>
                <a href={`#project-${id}`}>
                  <span className={styles.indexNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.indexName}>{projects[id].name}</span>
                  <span className={styles.indexTagline}>{t.projects[id].tagline}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <ConcordCase />
      <SinlabsCase />
      <DeepwokendleCase />
    </section>
  );
}
