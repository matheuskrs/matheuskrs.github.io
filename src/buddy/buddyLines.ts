const INTRO_KEY = 'buddy-intro-seen';
const SEEN_KEY = 'buddy-lines-seen';

/** Sem armazenamento disponível, o progresso vale só para esta visita. */
const memory = { introSeen: false, seen: [] as string[] };

function readSeen(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]');
    return Array.isArray(stored) ? stored.filter((key): key is string => typeof key === 'string') : memory.seen;
  } catch {
    return memory.seen;
  }
}

function writeSeen(seen: string[]) {
  memory.seen = seen;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    // Mantém só em memória.
  }
}

/** Retorna true apenas no primeiro clique direto no mini Matheus. */
export function takeIntro() {
  let seen = memory.introSeen;
  try {
    seen = seen || localStorage.getItem(INTRO_KEY) === '1';
    localStorage.setItem(INTRO_KEY, '1');
  } catch {
    // Mantém só em memória.
  }
  memory.introSeen = true;
  return !seen;
}

/**
 * Sorteia a próxima fala, priorizando as que ainda não foram vistas.
 * Quando todas já apareceram, recomeça sem repetir de cara a última mostrada.
 */
export function pickLine(keys: string[]) {
  let seen = readSeen().filter((key) => keys.includes(key));
  let pool = keys.filter((key) => !seen.includes(key));
  if (!pool.length) {
    const last = seen[seen.length - 1];
    seen = [];
    pool = keys.length > 1 ? keys.filter((key) => key !== last) : keys;
  }
  const key = pool[Math.floor(Math.random() * pool.length)];
  writeSeen([...seen, key]);
  return key;
}
