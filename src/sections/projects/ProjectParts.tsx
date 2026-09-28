import { Icon } from '../../components/Icon';
import { projects } from '../../data/projects';
import type { ProjectId } from '../../data/types';
import { useI18n } from '../../i18n/useI18n';
import styles from './Project.module.css';

interface PartProps {
  id: ProjectId;
}

export function ProjectHeader({ id, number }: PartProps & { number: string }) {
  const { t } = useI18n();
  const project = projects[id];
  const copy = t.projects[id];

  return (
    <header className={styles.head}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <p className={styles.kicker}>{copy.kicker}</p>
      <h3 id={`project-${id}-title`} className={styles.name}>
        {project.name}
      </h3>
      <p className={styles.tagline}>{copy.tagline}</p>
      {(project.links.site || project.links.repo) && (
        <ul role="list" className={styles.links}>
          {project.links.site && (
            <li>
              <a className={styles.linkPrimary} href={project.links.site} target="_blank" rel="noopener">
                {t.projects.labels.visit}
                <span className="visually-hidden">
                  {' '}
                  {project.name} {t.common.newTab}
                </span>
                <Icon name="external" size={14} />
              </a>
            </li>
          )}
          {project.links.repo && (
            <li>
              <a className={styles.linkSecondary} href={project.links.repo} target="_blank" rel="noopener">
                <Icon name="github" size={16} />
                {t.projects.labels.repo}
                <span className="visually-hidden">
                  {' '}
                  {project.name} {t.common.newTab}
                </span>
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

export function ProjectFacts({ id, columns = false }: PartProps & { columns?: boolean }) {
  const { t } = useI18n();
  const copy = t.projects[id];
  const labels = t.projects.labels;

  return (
    <div className={styles.facts} data-columns={columns}>
      <section>
        <h4 className={styles.label}>{labels.need}</h4>
        <p>{copy.need}</p>
      </section>
      <section>
        <h4 className={styles.label}>{labels.features}</h4>
        <ul className={styles.features}>
          {copy.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className={styles.label}>{labels.role}</h4>
        <p>{copy.role}</p>
      </section>
      <section>
        <h4 className={styles.label}>{labels.stack}</h4>
        <ul role="list" className={styles.stack}>
          {projects[id].stack.map((tech) => (
            <li key={tech}>{tech === 'REST' ? t.skills.names.rest : tech}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ProjectDecisions({ id }: PartProps) {
  const { t } = useI18n();

  return (
    <section className={styles.decisions}>
      <h4 className={styles.label}>{t.projects.labels.decisions}</h4>
      <ol role="list" className={styles.decisionList}>
        {t.projects[id].decisions.map((decision, index) => (
          <li key={decision.title} className={styles.decision}>
            <span className={styles.decisionIndex} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h5>{decision.title}</h5>
            <p>{decision.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
