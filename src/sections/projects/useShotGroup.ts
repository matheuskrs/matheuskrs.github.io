import type { ViewerImage } from '../../components/ImageViewerContext';
import type { Shot } from '../../data/types';
import { useI18n } from '../../i18n/useI18n';

/** Junta as capturas com o texto alternativo e a legenda do idioma atual. */
export function useShotGroup(shots: Shot[]): ViewerImage[] {
  const { t } = useI18n();
  const copy: Record<string, { alt: string; caption: string }> = t.projects.shots;
  return shots.map((shot) => ({ src: shot.src, alt: copy[shot.id].alt, caption: copy[shot.id].caption }));
}
