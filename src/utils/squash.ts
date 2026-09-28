const squashFrames: Keyframe[] = [
  { transform: 'scale(1, 1)' },
  { transform: 'scale(1.14, 0.82)', offset: 0.22 },
  { transform: 'scale(0.93, 1.09)', offset: 0.5 },
  { transform: 'scale(1.04, 0.97)', offset: 0.74 },
  { transform: 'scale(1, 1)' },
];

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Achata e estica o elemento rapidamente, como algo macio sendo apertado. */
export function squash(element: HTMLElement | null) {
  if (!element || prefersReducedMotion()) return;
  element.animate(squashFrames, { duration: 420, easing: 'ease-out' });
}
