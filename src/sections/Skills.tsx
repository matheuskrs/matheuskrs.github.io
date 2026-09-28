import { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { contexts, skillAreas, type Skill } from '../data/skills';
import type { ContextId } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import styles from './Skills.module.css';

export function Skills() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<ContextId | null>(null);
  const reveal = useReveal<HTMLDivElement>();

  const nameOf = (skill: Skill) => t.skills.names[skill.id] ?? skill.name;
  const matchState = (skill: Skill) => (filter ? String(skill.usedIn.includes(filter)) : undefined);

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader id="skills-title" kicker={t.skills.kicker} title={t.skills.title}>
          <p>{t.skills.intro}</p>
        </SectionHeader>

        <div className={styles.filter} role="group" aria-label={t.skills.filterLabel}>
          <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)}>
            {t.skills.all}
          </button>
          {contexts.map((context) => (
            <button key={context} type="button" aria-pressed={filter === context} onClick={() => setFilter(context)}>
              {t.skills.contexts[context]}
            </button>
          ))}
        </div>

        <div ref={reveal} className={`reveal ${styles.shelves}`} data-filtered={filter !== null}>
          {skillAreas.map((area) => (
            <section key={area.id} className={styles.shelf} aria-labelledby={`skills-${area.id}`}>
              <h3 id={`skills-${area.id}`} className={styles.area}>
                {t.skills.areas[area.id]}
              </h3>
              <ul role="list" className={styles.items}>
                {area.skills.map((skill) => (
                  <li key={skill.id} className={styles.item} data-core={Boolean(skill.core)} data-match={matchState(skill)}>
                    <span className={styles.name}>
                      {nameOf(skill)}
                      {skill.core && <span className={styles.core}>{t.skills.core}</span>}
                      {filter && skill.usedIn.includes(filter) && (
                        <span className="visually-hidden">
                          {' '}
                          ({fill(t.skills.matchLabel, { context: t.skills.contexts[filter] })})
                        </span>
                      )}
                    </span>
                    <span className={styles.evidence}>
                      {skill.usedIn.length ? (
                        <>
                          <span className="visually-hidden">{t.skills.usedInLabel}: </span>
                          {skill.usedIn.map((context) => t.skills.contexts[context]).join(' · ')}
                        </>
                      ) : (
                        t.skills.general
                      )}
                    </span>
                    {t.skills.notes[skill.id] && <span className={styles.note}>{t.skills.notes[skill.id]}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
