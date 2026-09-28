import { useId, useState, type CSSProperties } from 'react';
import { Icon } from '../../components/Icon';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { fill } from '../../i18n/format';
import { useI18n } from '../../i18n/useI18n';
import styles from './TopologySimulation.module.css';

type Mode = 'direct' | 'sfu';

const MIN_PEOPLE = 2;
const MAX_PEOPLE = 6;
const CENTER = { x: 200, y: 150 };
const RADIUS = 112;
const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface Point {
  x: number;
  y: number;
}

function positions(count: number): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return { x: CENTER.x + RADIUS * Math.cos(angle), y: CENTER.y + RADIUS * Math.sin(angle) };
  });
}

function links(mode: Mode, nodes: Point[]): [Point, Point][] {
  if (mode === 'sfu') return nodes.map((node) => [node, CENTER]);
  const pairs: [Point, Point][] = [];
  nodes.forEach((from, i) => nodes.slice(i + 1).forEach((to) => pairs.push([from, to])));
  return pairs;
}

const path = (from: Point, to: Point) => `M${from.x.toFixed(1)} ${from.y.toFixed(1)} L${to.x.toFixed(1)} ${to.y.toFixed(1)}`;

export function TopologySimulation() {
  const { t } = useI18n();
  const sim = t.projects.concord.sim;
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>('direct');
  const [people, setPeople] = useState(4);
  const radioName = useId();

  const nodes = positions(people);
  const edges = links(mode, nodes);
  const viewers = people - 1;
  const summary =
    mode === 'direct'
      ? viewers === 1
        ? sim.uploadsDirectOne
        : fill(sim.uploadsDirect, { count: viewers })
      : viewers === 1
        ? sim.uploadsSfuOne
        : fill(sim.uploadsSfu, { count: viewers });

  return (
    <div className={styles.sim}>
      <div className={styles.top}>
        <h4 className={styles.title}>{sim.title}</h4>
      </div>

      <div className={styles.controls}>
        <fieldset className={styles.modes}>
          <legend className="visually-hidden">{sim.modeLabel}</legend>
          {(['direct', 'sfu'] as const).map((option) => (
            <label key={option} className={styles.mode}>
              <input
                type="radio"
                name={radioName}
                value={option}
                checked={mode === option}
                onChange={() => setMode(option)}
              />
              <span>{sim[option]}</span>
            </label>
          ))}
        </fieldset>

        <div className={styles.stepper} role="group" aria-label={sim.peopleLabel}>
          <span className={styles.stepperLabel} aria-hidden="true">
            {sim.peopleLabel}
          </span>
          <button type="button" onClick={() => setPeople((n) => n - 1)} disabled={people <= MIN_PEOPLE} aria-label={sim.decrease}>
            <Icon name="minus" size={12} />
          </button>
          <output aria-live="polite" aria-label={sim.peopleLabel}>
            {people}
          </output>
          <button type="button" onClick={() => setPeople((n) => n + 1)} disabled={people >= MAX_PEOPLE} aria-label={sim.increase}>
            <Icon name="plus" size={12} />
          </button>
        </div>
      </div>

      <svg
        key={`${mode}-${people}`}
        className={styles.diagram}
        viewBox="0 0 400 300"
        role="img"
        aria-label={fill(sim.diagramLabel, { count: people, mode: sim[mode] })}
        data-mode={mode}
      >
        {edges.map(([from, to], index) => (
          <path
            key={index}
            className={styles.edge}
            d={path(from, to)}
            pathLength={1}
            style={{ '--delay': `${index * 40}ms` } as CSSProperties}
          />
        ))}

        {!reducedMotion &&
          edges.flatMap(([from, to], index) => {
            return [path(from, to), path(to, from)].map((d, direction) => (
              <rect
                key={`${index}-${direction}`}
                className={styles.packet}
                width={5}
                height={5}
                x={-2.5}
                y={-2.5}
                style={
                  {
                    offsetPath: `path('${d}')`,
                    animationDelay: `${400 + index * 90 + direction * 700}ms`,
                  } as CSSProperties
                }
              />
            ));
          })}

        {mode === 'sfu' && (
          <g className={styles.sfu}>
            <rect x={CENTER.x - 30} y={CENTER.y - 18} width={60} height={36} rx={3} />
            <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle">
              SFU
            </text>
          </g>
        )}

        {nodes.map((node, index) => (
          <g key={LABELS[index]} className={styles.node} transform={`translate(${node.x} ${node.y})`}>
            <rect x={-24} y={-17} width={48} height={32} rx={2} />
            <rect className={styles.stand} x={-6} y={15} width={12} height={4} />
            <text y={5} textAnchor="middle">
              {LABELS[index]}
            </text>
          </g>
        ))}
      </svg>

      <p className={styles.summary} aria-live="polite">
        {summary}
      </p>
      <p className={styles.caption}>{mode === 'direct' ? sim.captionDirect : sim.captionSfu}</p>
    </div>
  );
}
