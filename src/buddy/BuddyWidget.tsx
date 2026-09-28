import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, type PointerEvent, type Ref } from 'react';
import flyingSprite from '../assets/pixel/buddy-flying.webp';
import holdingSprite from '../assets/pixel/buddy-holding.webp';
import sittingSprite from '../assets/pixel/buddy-sitting.webp';
import { Icon } from '../components/Icon';
import { useI18n } from '../i18n/useI18n';
import { prefersReducedMotion, squash } from '../utils/squash';
import styles from './BuddyWidget.module.css';
import { pickLine, takeIntro } from './buddyLines';
import { termLabel } from './termLabel';

export interface BuddyMessage {
  id: string;
  key: number;
}

type Mode = 'idle' | 'dragging' | 'flying' | 'gone' | 'arriving';

export interface BuddyHandle {
  /** Traz o personagem de volta caso ele tenha sido arremessado para fora da tela. */
  wake: () => void;
}

interface Props {
  message: BuddyMessage | null;
  onAsk: (id: string) => void;
  onClose: () => void;
  ref?: Ref<BuddyHandle>;
}

const INTRO = 'intro';
/** Prefixo das falas soltas do mini Matheus, como "line:ouch". */
const LINE = 'line:';
/** Velocidade de soltura, em px/ms, a partir da qual o personagem é arremessado para fora. */
const THROW_SPEED = 1.2;
const GRAVITY = 0.0028;
const EDGE = 12;
/** Ponto do sprite "segurando" que fica preso ao cursor: os punhos, no alto e ao centro. */
const GRIP = { x: 0.5, y: 0.04 };
const BUBBLE_ROOM = { width: 320, height: 200 };

const sprites: Record<Mode, string> = {
  idle: sittingSprite,
  dragging: holdingSprite,
  flying: flyingSprite,
  arriving: flyingSprite,
  gone: sittingSprite,
};


const popFrames: Keyframe[] = [{ transform: 'scale(0.2)' }, { transform: 'scale(1.06)', offset: 0.7 }, { transform: 'scale(1)' }];
const closeFrames: Keyframe[] = [{ transform: 'scale(1)' }, { transform: 'scale(0)' }];

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  moved: boolean;
  samples: { x: number; y: number; t: number }[];
}

export function BuddyWidget({ message, onAsk, onClose, ref }: Props) {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>('idle');
  const [pressed, setPressed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLImageElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState | null>(null);
  const position = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const frame = useRef(0);
  const tiltReset = useRef(0);

  const size = () => wrapRef.current?.offsetWidth ?? 112;

  /** Decide de que lado o balão abre para caber na tela. */
  const updateBubbleSide = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    wrap.dataset.vertical = rect.top < BUBBLE_ROOM.height ? 'below' : 'above';
    wrap.dataset.horizontal = rect.right < BUBBLE_ROOM.width ? 'left' : 'right';
  }, []);

  const place = useCallback(
    (x: number, y: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      position.current = { x, y };
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      wrap.style.right = 'auto';
      wrap.style.bottom = 'auto';
      updateBubbleSide();
    },
    [updateBubbleSide],
  );

  const resetToCorner = useCallback(() => {
    const wrap = wrapRef.current;
    position.current = null;
    if (!wrap) return;
    wrap.style.left = '';
    wrap.style.top = '';
    wrap.style.right = '';
    wrap.style.bottom = '';
    updateBubbleSide();
  }, [updateBubbleSide]);

  const clampInside = useCallback(
    (x: number, y: number) => ({
      x: Math.min(Math.max(x, EDGE), window.innerWidth - size() - EDGE),
      y: Math.min(Math.max(y, EDGE), window.innerHeight - size() - EDGE),
    }),
    [],
  );

  const comeBack = useCallback(
    (focusAfter = false) => {
      cancelAnimationFrame(frame.current);
      resetToCorner();
      const land = () => {
        setMode('idle');
        requestAnimationFrame(() => {
          squash(spriteRef.current);
          if (focusAfter) buttonRef.current?.focus();
        });
      };
      if (prefersReducedMotion()) {
        land();
        return;
      }
      setMode('arriving');
      requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return land();
        wrap.animate([{ transform: `translateY(${-window.innerHeight}px)` }, { transform: 'translateY(0)' }], {
          duration: 620,
          easing: 'cubic-bezier(0.5, 0, 0.9, 0.6)',
        }).onfinish = land;
      });
    },
    [resetToCorner],
  );

  const flyAway = useCallback(
    (vx: number, vy: number) => {
      onClose();
      if (prefersReducedMotion()) {
        setMode('gone');
        return;
      }
      setMode('flying');
      let { x, y } = position.current ?? { x: 0, y: 0 };
      let velocityY = vy;
      let angle = 0;
      let last = performance.now();
      const start = last;
      const step = (now: number) => {
        const dt = Math.min(now - last, 32);
        last = now;
        x += vx * dt;
        velocityY += GRAVITY * dt;
        y += velocityY * dt;
        angle += vx * dt * 0.45;
        place(x, y);
        if (spriteRef.current) spriteRef.current.style.transform = `rotate(${angle}deg)`;
        const out = x > window.innerWidth + 40 || x < -size() - 40 || y > window.innerHeight + 40;
        if (out || now - start > 4000) {
          if (spriteRef.current) spriteRef.current.style.transform = '';
          setMode('gone');
          return;
        }
        frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    },
    [onClose, place],
  );

  const settle = useCallback(() => {
    const current = position.current;
    if (spriteRef.current) spriteRef.current.style.transform = '';
    setMode('idle');
    if (!current) return;
    const target = clampInside(current.x, current.y);
    const wrap = wrapRef.current;
    const dx = current.x - target.x;
    const dy = current.y - target.y;
    place(target.x, target.y);
    if (wrap && (dx || dy) && !prefersReducedMotion()) {
      wrap.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
        duration: 260,
        easing: 'ease-out',
      });
    }
    requestAnimationFrame(() => squash(spriteRef.current));
  }, [clampInside, place]);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || mode !== 'idle') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      samples: [{ x: event.clientX, y: event.clientY, t: event.timeStamp }],
    };
    setPressed(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    if (!state.moved) {
      if (Math.hypot(event.clientX - state.startX, event.clientY - state.startY) < 6) return;
      state.moved = true;
      setPressed(false);
      setMode('dragging');
      onClose();
    }
    const grab = size();
    place(event.clientX - grab * GRIP.x, event.clientY - grab * GRIP.y);
    state.samples.push({ x: event.clientX, y: event.clientY, t: event.timeStamp });
    state.samples = state.samples.filter((sample) => event.timeStamp - sample.t < 90);
    const first = state.samples[0];
    const vx = first ? (event.clientX - first.x) / Math.max(event.timeStamp - first.t, 1) : 0;
    const tilt = Math.max(-18, Math.min(18, -vx * 14));
    if (spriteRef.current) spriteRef.current.style.transform = `rotate(${tilt}deg)`;
    // Parado no ar, ele volta a ficar reto, como um pêndulo assentando.
    window.clearTimeout(tiltReset.current);
    tiltReset.current = window.setTimeout(() => {
      if (drag.current && spriteRef.current) spriteRef.current.style.transform = 'rotate(0deg)';
    }, 120);
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    drag.current = null;
    setPressed(false);
    window.clearTimeout(tiltReset.current);
    if (!state || !state.moved) return;
    suppressClick.current = true;
    const first = state.samples[0];
    const elapsed = first ? Math.max(event.timeStamp - first.t, 1) : 1;
    const vx = first ? (event.clientX - first.x) / elapsed : 0;
    const vy = first ? (event.clientY - first.y) / elapsed : 0;
    if (Math.hypot(vx, vy) > THROW_SPEED) flyAway(vx, vy);
    else settle();
  };

  const handlePointerCancel = () => {
    const state = drag.current;
    drag.current = null;
    setPressed(false);
    if (state?.moved) settle();
  };

  const handleClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onAsk(takeIntro() ? INTRO : `${LINE}${pickLine(Object.keys(t.buddy.lines))}`);
  };

  const requestClose = useCallback(() => {
    const bubble = bubbleRef.current;
    if (!bubble || prefersReducedMotion()) {
      onClose();
      return;
    }
    bubble.animate(closeFrames, { duration: 170, easing: 'ease-in-out', fill: 'forwards' }).onfinish = onClose;
  }, [onClose]);

  useImperativeHandle(
    ref,
    () => ({
      wake: () => {
        if (mode === 'gone') comeBack();
      },
    }),
    [mode, comeBack],
  );

  useLayoutEffect(() => {
    if (!message || mode !== 'idle') return;
    updateBubbleSide();
    squash(spriteRef.current);
    if (!prefersReducedMotion()) bubbleRef.current?.animate(popFrames, { duration: 280, easing: 'ease-in-out' });
  }, [message, mode, updateBubbleSide]);

  useEffect(() => {
    if (!message) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [message, requestClose]);

  useEffect(() => {
    const onResize = () => {
      if (!position.current || drag.current) return;
      const target = clampInside(position.current.x, position.current.y);
      place(target.x, target.y);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame.current);
      window.clearTimeout(tiltReset.current);
    };
  }, [clampInside, place]);

  const isIntro = message?.id === INTRO;
  const lineKey = message?.id.startsWith(LINE) ? message.id.slice(LINE.length) : null;
  const lines: Record<string, string> = t.buddy.lines;
  const title = message && !isIntro && !lineKey ? (t.buddy.titles[message.id] ?? termLabel(message.id, t.skills.names)) : null;
  const body = message ? (isIntro ? t.buddy.intro : lineKey ? lines[lineKey] : t.buddy.terms[message.id]) : '';
  const showBubble = Boolean(message && body && mode === 'idle');

  return (
    <>
      <div ref={wrapRef} className={styles.buddy} data-mode={mode} data-vertical="above" data-horizontal="right">
        {showBubble && (
          <div ref={bubbleRef} key={message?.key} className={styles.bubble}>
            <div className={styles.frame}>
              <div className={styles.bubbleInner}>
                {title && <p className={styles.bubbleTitle}>{title}</p>}
                <p>{body}</p>
                <button type="button" className={styles.close} onClick={requestClose} aria-label={t.buddy.close}>
                  <Icon name="close" size={10} />
                </button>
              </div>
            </div>
            <span className={styles.tail} aria-hidden="true" />
          </div>
        )}
        <button
          ref={buttonRef}
          type="button"
          className={styles.button}
          aria-label={t.buddy.label}
          data-pressed={pressed}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClick={handleClick}
        >
          <img ref={spriteRef} className={styles.sprite} src={sprites[mode]} width={320} height={320} alt="" draggable={false} />
        </button>
      </div>

      {mode === 'gone' && (
        <button type="button" className={styles.comeBack} onClick={() => comeBack(true)}>
          <Icon name="arrowRight" size={12} className={styles.comeBackIcon} />
          {t.buddy.comeBack}
        </button>
      )}

      <p className="visually-hidden" aria-live="polite">
        {showBubble ? [title, body].filter(Boolean).join('. ') : ''}
      </p>
    </>
  );
}
