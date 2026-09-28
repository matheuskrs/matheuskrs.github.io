import type { ContextId } from './types';

export type SkillAreaId = 'backend' | 'frontend' | 'data' | 'realtime' | 'architecture' | 'ai';
export type TechKind = 'language' | 'platform' | 'framework' | 'library' | 'database' | 'tool' | 'standard';

export interface Skill {
  id: string;
  /** Nome exibido quando não há tradução em `skills.names` nos arquivos de idioma. */
  name: string;
  core?: boolean;
  /** Onde a tecnologia aparece. Lista vazia indica experiência geral, sem projeto listado no portfólio. */
  usedIn: ContextId[];
  kind?: TechKind;
  /** Ano de lançamento, usado apenas na demonstração de adivinhação. */
  released?: number;
}

export interface SkillArea {
  id: SkillAreaId;
  skills: Skill[];
}

export const contexts: ContextId[] = ['nexus', 'upper', 'concord', 'sinlabs', 'deepwokendle'];

export const skillAreas: SkillArea[] = [
  {
    id: 'backend',
    skills: [
      { id: 'csharp', name: 'C#', core: true, usedIn: ['nexus', 'upper', 'concord', 'deepwokendle'], kind: 'language', released: 2000 },
      { id: 'dotnet', name: '.NET', core: true, usedIn: ['nexus', 'upper', 'concord', 'deepwokendle'], kind: 'platform', released: 2002 },
      { id: 'aspnetcore', name: 'ASP.NET Core', core: true, usedIn: ['nexus', 'upper', 'concord', 'deepwokendle'], kind: 'framework', released: 2016 },
      { id: 'rest', name: 'REST APIs', usedIn: ['nexus', 'upper', 'concord', 'sinlabs', 'deepwokendle'] },
      { id: 'efcore', name: 'Entity Framework Core', usedIn: ['nexus', 'concord'], kind: 'library', released: 2016 },
      { id: 'dapper', name: 'Dapper', usedIn: ['deepwokendle'] },
      { id: 'oop', name: 'OOP & SOLID', usedIn: [] },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { id: 'react', name: 'React', core: true, usedIn: ['nexus', 'concord', 'sinlabs', 'deepwokendle'], kind: 'library', released: 2013 },
      { id: 'nextjs', name: 'Next.js', core: true, usedIn: ['nexus'], kind: 'framework', released: 2016 },
      { id: 'typescript', name: 'TypeScript', core: true, usedIn: ['nexus', 'concord', 'deepwokendle'], kind: 'language', released: 2012 },
      { id: 'javascript', name: 'JavaScript', usedIn: ['upper', 'sinlabs', 'deepwokendle'], kind: 'language', released: 1995 },
      { id: 'htmlcss', name: 'HTML5 & CSS3', usedIn: ['nexus', 'upper', 'concord', 'sinlabs', 'deepwokendle'] },
      { id: 'antd', name: 'Ant Design', usedIn: ['nexus', 'concord'] },
      { id: 'vite', name: 'Vite', usedIn: ['concord', 'sinlabs', 'deepwokendle'], kind: 'tool', released: 2020 },
    ],
  },
  {
    id: 'data',
    skills: [
      { id: 'sql', name: 'SQL', usedIn: ['nexus', 'upper', 'concord', 'deepwokendle'] },
      { id: 'postgresql', name: 'PostgreSQL', core: true, usedIn: ['nexus', 'concord', 'deepwokendle'], kind: 'database', released: 1996 },
      { id: 'sqlserver', name: 'SQL Server', usedIn: ['upper'], kind: 'database', released: 1989 },
      { id: 'redis', name: 'Redis', usedIn: [], kind: 'database', released: 2009 },
      { id: 'docker', name: 'Docker', usedIn: ['concord'], kind: 'tool', released: 2013 },
      { id: 'git', name: 'Git & GitHub', usedIn: ['nexus', 'upper', 'concord', 'sinlabs', 'deepwokendle'], kind: 'tool', released: 2005 },
      { id: 'actions', name: 'GitHub Actions', usedIn: ['deepwokendle'] },
    ],
  },
  {
    id: 'realtime',
    skills: [
      { id: 'signalr', name: 'SignalR', usedIn: ['concord', 'deepwokendle'] },
      { id: 'webrtc', name: 'WebRTC', usedIn: ['concord'], kind: 'standard', released: 2011 },
      { id: 'electron', name: 'Electron', usedIn: ['concord'], kind: 'framework', released: 2013 },
    ],
  },
  {
    id: 'architecture',
    skills: [
      { id: 'clean', name: 'Clean Architecture', usedIn: ['nexus'] },
      { id: 'modular', name: 'Modular monolith', usedIn: ['nexus'] },
      { id: 'microservices', name: 'Microservices', usedIn: [] },
      { id: 'xunit', name: 'xUnit', usedIn: ['nexus'], kind: 'library', released: 2007 },
    ],
  },
  {
    id: 'ai',
    skills: [{ id: 'ai', name: 'AI API integration', usedIn: [] }],
  },
];

export interface GuessableSkill extends Skill {
  kind: TechKind;
  released: number;
  area: SkillAreaId;
}

/** Tecnologias com dados suficientes para a demonstração de adivinhação. */
export const guessableSkills: GuessableSkill[] = skillAreas.flatMap((area) =>
  area.skills.flatMap((skill) =>
    skill.kind && skill.released ? [{ ...skill, kind: skill.kind, released: skill.released, area: area.id }] : [],
  ),
);
