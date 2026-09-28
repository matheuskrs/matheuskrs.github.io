import type { MouseEvent } from 'react';
import { prefersReducedMotion } from './squash';

const running = new WeakMap<HTMLDetailsElement, Animation>();
const DURATION = 320;

/**
 * Handler de clique para o <summary>: abre e fecha o <details> deslizando.
 * O comportamento nativo de teclado e leitores de tela continua o mesmo.
 */
export function slideDetails(event: MouseEvent<HTMLElement>) {
  const details = event.currentTarget.parentElement;
  if (!(details instanceof HTMLDetailsElement) || prefersReducedMotion()) return;
  const content = details.querySelector<HTMLElement>(':scope > :not(summary)');
  if (!content) return;
  event.preventDefault();

  // Fechado, o Chrome ainda informa a altura cheia do conteúdo; a abertura parte de zero.
  const from = details.open ? content.getBoundingClientRect().height : 0;
  const closing = details.open && details.dataset.closing !== 'true';
  running.get(details)?.cancel();
  content.style.overflow = 'hidden';

  const finish = () => {
    content.style.overflow = '';
    running.delete(details);
  };

  if (closing) {
    details.dataset.closing = 'true';
    const animation = content.animate([{ height: `${from}px` }, { height: '0px' }], { duration: DURATION, easing: 'ease-in-out' });
    animation.onfinish = () => {
      details.open = false;
      delete details.dataset.closing;
      finish();
    };
    running.set(details, animation);
    return;
  }

  delete details.dataset.closing;
  details.open = true;
  const animation = content.animate([{ height: `${from}px` }, { height: `${content.scrollHeight}px` }], {
    duration: DURATION,
    easing: 'ease-in-out',
  });
  animation.onfinish = finish;
  running.set(details, animation);
}
