import { Select } from 'antd';
import { useId, useState } from 'react';
import emoteAngry from '../../assets/pixel/emote-angry.webp';
import emoteConfused from '../../assets/pixel/emote-confused.webp';
import emoteExcited from '../../assets/pixel/emote-excited.webp';
import emoteNeutral from '../../assets/pixel/neutral.webp';
import { Icon } from '../../components/Icon';
import { guessableSkills, type GuessableSkill } from '../../data/skills';
import { fill } from '../../i18n/format';
import { useI18n } from '../../i18n/useI18n';
import AntdTheme from '../../theme/AntdTheme';
import { evaluate, moodFor, pickTarget, type CellResult, type GuessResult, type Mood } from './guessRules';
import styles from './TechGuess.module.css';

const emotes: Record<Mood, { src: string; width: number; height: number }> = {
  neutral: { src: emoteNeutral, width: 99, height: 121 },
  excited: { src: emoteExcited, width: 111, height: 99 },
  confused: { src: emoteConfused, width: 107, height: 112 },
  angry: { src: emoteAngry, width: 99, height: 132 },
};

const resultIcon: Record<CellResult, string> = {
  correct: '✓',
  partial: '~',
  wrong: '✕',
  higher: '↑',
  lower: '↓',
};

export default function TechGuess() {
  const { t } = useI18n();
  const demo = t.projects.deepwokendle.demo;
  const labelId = useId();
  const [target, setTarget] = useState<GuessableSkill>(() => pickTarget());
  const [results, setResults] = useState<GuessResult[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const nameOf = (skill: GuessableSkill) => t.skills.names[skill.id] ?? skill.name;
  const usageOf = (skill: GuessableSkill) =>
    skill.usedIn.length ? skill.usedIn.map((context) => t.skills.contexts[context]).join(', ') : demo.noUsage;

  const solved = results.some((result) => result.solved);
  const finished = solved || revealed;
  const latest = results[0];
  const mood = moodFor(latest);
  const guessedIds = new Set(results.map((result) => result.skill.id));

  const submit = () => {
    const guess = guessableSkills.find((skill) => skill.id === pending);
    if (!guess || finished) return;
    setResults((current) => [evaluate(guess, target), ...current]);
    setPending(null);
  };

  const newRound = () => {
    setTarget((current) => pickTarget(current.id));
    setResults([]);
    setPending(null);
    setRevealed(false);
  };

  const describe = (result: GuessResult) =>
    [
      nameOf(result.skill),
      `${demo.columns.area}: ${demo.result[result.area]}`,
      `${demo.columns.kind}: ${demo.result[result.kind]}`,
      `${demo.columns.usedIn}: ${demo.result[result.usedIn]}`,
      `${demo.columns.released}: ${demo.result[result.released]}`,
    ].join('. ');

  let status = '';
  if (solved) status = results.length === 1 ? fill(demo.wonFirst, { name: nameOf(target) }) : fill(demo.won, { count: results.length, name: nameOf(target) });
  else if (revealed) status = fill(demo.revealed, { name: nameOf(target) });

  const cell = (result: CellResult, value: string, index: number) => (
    <td className={styles.cell} data-result={result} style={{ animationDelay: `${index * 120}ms` }}>
      <span className={styles.value}>{value}</span>
      <span className={styles.mark} aria-hidden="true">
        {resultIcon[result]}
      </span>
      <span className="visually-hidden">, {demo.result[result]}</span>
    </td>
  );

  return (
    <AntdTheme>
      <div className={styles.game}>
        <div className={styles.header}>
          <div className={styles.emote} data-mood={mood}>
            <img
              key={mood}
              src={emotes[mood].src}
              width={emotes[mood].width}
              height={emotes[mood].height}
              alt={demo.emotes[mood]}
            />
          </div>
          <div className={styles.intro}>
            <h4 className={styles.title}>{demo.title}</h4>
            <p className={styles.disclaimer}>{demo.disclaimer}</p>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label id={labelId} className={styles.label}>
            {demo.inputLabel}
          </label>
          <div className={styles.row}>
            <Select
              className={styles.select}
              aria-labelledby={labelId}
              showSearch={{ optionFilterProp: 'label' }}
              placeholder={demo.placeholder}
              value={pending}
              onChange={(value: string) => setPending(value)}
              disabled={finished}
              options={guessableSkills
                .filter((skill) => !guessedIds.has(skill.id))
                .map((skill) => ({ value: skill.id, label: nameOf(skill) }))}
            />
            <button type="submit" className={styles.submit} disabled={!pending || finished}>
              {demo.submit}
            </button>
          </div>
        </form>

        <div className={styles.status}>
          <p aria-live="polite">{status || (latest ? describe(latest) : '')}</p>
          <p className={styles.attempts}>{fill(demo.attempts, { count: results.length })}</p>
        </div>

        {results.length ? (
          <div className={styles.board}>
            <table className={styles.table}>
              <caption className="visually-hidden">{demo.title}</caption>
              <thead>
                <tr>
                  <th scope="col">{demo.columns.name}</th>
                  <th scope="col">{demo.columns.area}</th>
                  <th scope="col">{demo.columns.kind}</th>
                  <th scope="col">{demo.columns.usedIn}</th>
                  <th scope="col">{demo.columns.released}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.skill.id}>
                    <th scope="row" className={styles.cell} data-result={result.solved ? 'correct' : 'wrong'}>
                      <span className={styles.value}>{nameOf(result.skill)}</span>
                    </th>
                    {cell(result.area, t.skills.areas[result.skill.area], 1)}
                    {cell(result.kind, t.skills.kinds[result.skill.kind], 2)}
                    {cell(result.usedIn, usageOf(result.skill), 3)}
                    {cell(result.released, String(result.skill.released), 4)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>{demo.empty}</p>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={newRound}>
            <Icon name="play" size={12} />
            {demo.newRound}
          </button>
          {!finished && (
            <button type="button" className={styles.ghost} onClick={() => setRevealed(true)}>
              {demo.reveal}
            </button>
          )}
        </div>
      </div>
    </AntdTheme>
  );
}
