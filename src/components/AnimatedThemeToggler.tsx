/*
  Adaptado do Animated Theme Toggler da Magic UI (MIT), de Nazam Kalsi, chishiyac e dikshantgulekar20-oss.
  Diferenças: o tema fica em data-theme, o componente é sempre controlado pelo ThemeProvider,
  os ícones são os do projeto e a transição é pulada quando prefers-reduced-motion está ativo.
*/
import { useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { flushSync } from 'react-dom';
import type { Theme } from '../theme/ThemeContext';
import { Icon } from './Icon';
import styles from './ThemeToggle.module.css';

export type TransitionVariant = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'rectangle' | 'star';

interface AnimatedThemeTogglerProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  /** Texto acessível do botão. */
  label: string;
  duration?: number;
  variant?: TransitionVariant;
  /** Quando verdadeiro, a transição parte do centro da tela em vez do botão. */
  fromCenter?: boolean;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(', ');
  return `polygon(${pairs})`;
}

// Coordenadas em porcentagem da caixa de referência do snapshot: em escalas fracionárias do
// Windows (por exemplo 150%), o Chrome aplica valores em px sem escala na primeira transição.
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  // Raios em porcentagem de circle() usam hypot(w, h) / sqrt(2) da caixa de referência.
  const toRadius = (r: number) => `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(', ');
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case 'triangle': {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [point(cx, cy - scale), point(cx + dx, cy + 0.5 * scale), point(cx - dx, cy + 0.5 * scale)].join(', ');
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2;
      const end = [point(cx, cy - R), point(cx + R, cy), point(cx, cy + R), point(cx - R, cy)].join(', ');
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case 'hexagon': {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }
      return [polygonCollapsed(point(cx, cy), 6), `polygon(${verts.join(', ')})`];
    }
    case 'rectangle': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(', ');
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case 'star': {
      // Pequena sobra para não deixar uma fresta de 1px nos últimos quadros.
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(point(cx + radius * Math.cos(outerA), cy + radius * Math.sin(outerA)));
          const innerA = outerA + Math.PI / 5;
          verts.push(point(cx + radius * innerRatio * Math.cos(innerA), cy + radius * innerRatio * Math.sin(innerA)));
        }
        return `polygon(${verts.join(', ')})`;
      };
      return [starPolygon(Math.max(2, R * 0.025)), starPolygon(R)];
    }
    case 'circle':
    default:
      return [`circle(0% at ${point(cx, cy)})`, `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`];
  }
}

export function AnimatedThemeToggler({
  theme,
  onThemeChange,
  label,
  className,
  duration = 480,
  variant = 'circle',
  fromCenter = false,
  ...props
}: AnimatedThemeTogglerProps) {
  const isDark = theme === 'dark';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;
      if (root.dataset.themeVt !== 'active') return;
      delete root.dataset.themeVt;
      root.style.removeProperty('--theme-vt-duration');
      root.style.removeProperty('--theme-vt-clip-from');
    };
  }, [cancelAnim]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    const root = document.documentElement;
    if (!button || isTransitioningRef.current || root.dataset.themeVt === 'active') return;

    const applyTheme = () => onThemeChange(isDark ? 'light' : 'dark');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition !== 'function' || reducedMotion) {
      applyTheme();
      return;
    }

    // innerWidth/innerHeight, e não visualViewport: as porcentagens usam a caixa do snapshot, que inclui a barra de rolagem.
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let x = viewportWidth / 2;
    let y = viewportHeight / 2;
    if (!fromCenter) {
      const { top, left, width, height } = button.getBoundingClientRect();
      x = left + width / 2;
      y = top + height / 2;
    }
    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));
    const clipPath = getThemeTransitionClipPaths(variant, x, y, maxRadius, viewportWidth, viewportHeight);

    root.dataset.themeVt = 'active';
    root.style.setProperty('--theme-vt-duration', `${duration}ms`);
    // Fixa o recorte inicial via CSS para o Firefox não pintar o tema novo sem recorte antes da animação começar.
    root.style.setProperty('--theme-vt-clip-from', clipPath[0]);

    const cleanup = () => {
      isTransitioningRef.current = false;
      delete root.dataset.themeVt;
      root.style.removeProperty('--theme-vt-duration');
      root.style.removeProperty('--theme-vt-clip-from');
      cancelAnim();
    };

    isTransitioningRef.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });
    transition.finished.finally(cleanup).catch(() => undefined);
    transition.ready
      .then(() => {
        activeAnimRef.current = root.animate(
          { clipPath },
          {
            duration,
            easing: variant === 'star' ? 'linear' : 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => undefined);
  }, [variant, fromCenter, duration, isDark, onThemeChange, cancelAnim]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={className ? `${styles.toggle} ${className}` : styles.toggle}
      aria-label={label}
      {...props}
    >
      <span className={styles.icon} data-visible={!isDark}>
        <Icon name="moon" size={18} />
      </span>
      <span className={styles.icon} data-visible={isDark}>
        <Icon name="sun" size={18} />
      </span>
    </button>
  );
}
