import type { YearMonth } from './types';

export type ExperienceId = 'nexus' | 'upper' | 'cosmos';
export type RoleId = 'intern' | 'junior' | 'mid' | 'teacher';

export interface Role {
  id: RoleId;
  start: YearMonth;
  end?: YearMonth;
}

export interface Experience {
  id: ExperienceId;
  company: string;
  lane: 'main' | 'parallel';
  /** Cargos do mais recente para o mais antigo. */
  roles: Role[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    id: 'nexus',
    company: 'Nexus',
    lane: 'main',
    roles: [{ id: 'mid', start: '2026-06' }],
    stack: ['React', 'Next.js', 'TypeScript', 'Ant Design', 'C#/.NET', 'Entity Framework Core', 'PostgreSQL', 'xUnit'],
  },
  {
    id: 'cosmos',
    company: 'Cosmos Educa',
    lane: 'parallel',
    roles: [{ id: 'teacher', start: '2026-08' }],
    stack: [],
  },
  {
    id: 'upper',
    company: 'UPPER Consultoria',
    lane: 'main',
    roles: [
      { id: 'junior', start: '2025-06', end: '2026-05' },
      { id: 'intern', start: '2024-12', end: '2025-06' },
    ],
    stack: ['C#/.NET', 'ASP.NET', 'JavaScript', 'SQL Server'],
  },
];

export interface LadderStep {
  id: Extract<RoleId, 'intern' | 'junior' | 'mid'>;
  start: YearMonth;
}

/** Degraus da progressão de cargo, do primeiro ao atual. */
export const careerLadder: LadderStep[] = [
  { id: 'intern', start: '2024-12' },
  { id: 'junior', start: '2025-06' },
  { id: 'mid', start: '2026-06' },
];
