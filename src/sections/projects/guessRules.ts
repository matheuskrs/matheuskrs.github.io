import { guessableSkills, type GuessableSkill } from '../../data/skills';

export type CellResult = 'correct' | 'partial' | 'wrong' | 'higher' | 'lower';

export interface GuessResult {
  skill: GuessableSkill;
  area: CellResult;
  kind: CellResult;
  usedIn: CellResult;
  released: CellResult;
  solved: boolean;
}

export type Mood = 'neutral' | 'excited' | 'confused' | 'angry';

export function pickTarget(exclude?: string) {
  const pool = guessableSkills.filter((skill) => skill.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

function compareUsage(guess: GuessableSkill, target: GuessableSkill): CellResult {
  const shared = guess.usedIn.filter((context) => target.usedIn.includes(context));
  if (shared.length === guess.usedIn.length && shared.length === target.usedIn.length) return 'correct';
  return shared.length ? 'partial' : 'wrong';
}

export function evaluate(guess: GuessableSkill, target: GuessableSkill): GuessResult {
  return {
    skill: guess,
    area: guess.area === target.area ? 'correct' : 'wrong',
    kind: guess.kind === target.kind ? 'correct' : 'wrong',
    usedIn: compareUsage(guess, target),
    released: guess.released === target.released ? 'correct' : target.released > guess.released ? 'higher' : 'lower',
    solved: guess.id === target.id,
  };
}

export function moodFor(result: GuessResult | undefined): Mood {
  if (!result) return 'neutral';
  if (result.solved) return 'excited';
  const cells = [result.area, result.kind, result.usedIn, result.released];
  return cells.some((cell) => cell === 'correct' || cell === 'partial') ? 'confused' : 'angry';
}
