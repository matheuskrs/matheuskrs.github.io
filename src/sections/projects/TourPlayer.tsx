import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { deepwokendleTour } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import styles from './TourPlayer.module.css';

/** A gravação animada só é baixada quando a pessoa pede para reproduzir. */
export function TourPlayer() {
  const { t } = useI18n();
  const tour = t.projects.deepwokendle.tour;
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={styles.player}>
      <div className={styles.screen}>
        <img
          src={playing ? deepwokendleTour.animation : deepwokendleTour.poster}
          width={deepwokendleTour.width}
          height={deepwokendleTour.height}
          alt={playing ? tour.animationAlt : tour.posterAlt}
          loading="lazy"
          decoding="async"
        />
        <button type="button" className={styles.toggle} onClick={() => setPlaying((value) => !value)}>
          <Icon name={playing ? 'pause' : 'play'} size={14} />
          {playing ? tour.pause : tour.play}
        </button>
      </div>
      <figcaption>{tour.caption}</figcaption>
    </figure>
  );
}
