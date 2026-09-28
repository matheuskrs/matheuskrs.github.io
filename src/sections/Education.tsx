import { CuriousTerm } from '../buddy/CuriousTerm';
import { SectionHeader } from '../components/SectionHeader';
import { education, languages, type Education as EducationItem } from '../data/education';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './Education.module.css';

function Years({ item }: { item: EducationItem }) {
  const { t } = useI18n();
  if (!item.end) return <time dateTime={String(item.start)}>{item.start}</time>;
  return (
    <>
      <time dateTime={String(item.start)}>{item.start}</time>
      <span aria-hidden="true"> → </span>
      <span className="visually-hidden"> {t.common.until} </span>
      <time dateTime={String(item.end)}>{item.end}</time>
      {item.expected && <span> ({t.education.expected})</span>}
    </>
  );
}

function Card({ item, featured = false }: { item: EducationItem; featured?: boolean }) {
  const { t } = useI18n();
  const copy = t.education.items[item.id];

  return (
    <li className={styles.card} data-featured={featured}>
      <p className={styles.kind}>{t.education.kinds[item.kind]}</p>
      <h4 className={styles.title}>{copy.title}</h4>
      <p className={styles.institution}>
        <CuriousTerm id={item.id}>{item.institution}</CuriousTerm>
      </p>
      <p className={styles.years}>
        <Years item={item} />
      </p>
      {copy.note && <p className={styles.note}>{copy.note}</p>}
    </li>
  );
}

export function Education() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();
  const academic = education.filter((item) => item.group === 'academic');
  const complementary = education.filter((item) => item.group === 'complementary');

  return (
    <section id="education" className={styles.education} aria-labelledby="education-title">
      <div className="container">
        <SectionHeader id="education-title" kicker={t.education.kicker} title={t.education.title} />

        <div ref={reveal} className={`reveal ${styles.layout}`}>
          <section aria-labelledby="education-academic">
            <h3 id="education-academic" className={styles.group}>
              {t.education.groups.academic}
            </h3>
            <ul role="list" className={styles.cards}>
              {academic.map((item, index) => (
                <Card key={item.id} item={item} featured={index === 0} />
              ))}
            </ul>
          </section>

          <div className={styles.side}>
            <section aria-labelledby="education-complementary">
              <h3 id="education-complementary" className={styles.group}>
                {t.education.groups.complementary}
              </h3>
              <ul role="list" className={styles.cards}>
                {complementary.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </ul>
            </section>

            <section aria-labelledby="education-languages">
              <h3 id="education-languages" className={styles.group}>
                {t.education.languagesTitle}
              </h3>
              <dl className={styles.languages}>
                {languages.map((id) => (
                  <div key={id}>
                    <dt>{t.education.languages[id].name}</dt>
                    <dd>{t.education.languages[id].level}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
