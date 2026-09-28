import { useState } from 'react';
import emoteAngry from '../assets/pixel/emote-angry.webp';
import emoteConfused from '../assets/pixel/emote-confused.webp';
import emoteExcited from '../assets/pixel/emote-excited.webp';
import emoteNeutral from '../assets/pixel/neutral.webp';
import pixelBust from '../assets/pixel/pixel-bust.webp';
import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../hooks/useReveal';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import styles from './BeyondCode.module.css';

const emotes = [
  { id: 'neutral', src: emoteNeutral, width: 99, height: 121 },
  { id: 'excited', src: emoteExcited, width: 111, height: 99 },
  { id: 'confused', src: emoteConfused, width: 107, height: 112 },
  { id: 'angry', src: emoteAngry, width: 99, height: 132 },
] as const;

type EmoteId = (typeof emotes)[number]['id'];

export function BeyondCode() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<EmoteId | null>(null);
  const reveal = useReveal<HTMLDivElement>();
  const current = emotes.find((emote) => emote.id === selected);

  return (
    <section id="beyond" className={styles.beyond} aria-labelledby="beyond-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHeader id="beyond-title" kicker={t.beyond.kicker} title={t.beyond.title} />
          <div ref={reveal} className={`reveal ${styles.body}`}>
            {t.beyond.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.emotes} role="group" aria-label={t.beyond.emotesLabel}>
            {emotes.map((emote) => (
              <button
                key={emote.id}
                type="button"
                aria-pressed={selected === emote.id}
                onClick={() => setSelected(emote.id)}
              >
                <img src={emote.src} width={emote.width} height={emote.height} alt="" loading="lazy" />
                <span>{t.beyond.emotes[emote.id]}</span>
              </button>
            ))}
          </div>
          <p className="visually-hidden" aria-live="polite">
            {selected ? fill(t.beyond.emoteSelected, { name: t.beyond.emotes[selected] }) : ''}
          </p>
        </div>

        <figure className={styles.portrait}>
          <img className={styles.bust} src={pixelBust} width={560} height={748} alt={t.beyond.bustAlt} loading="lazy" />
          {current && (
            <img
              key={current.id}
              className={styles.reaction}
              src={current.src}
              width={current.width}
              height={current.height}
              alt=""
            />
          )}
        </figure>
      </div>
    </section>
  );
}
