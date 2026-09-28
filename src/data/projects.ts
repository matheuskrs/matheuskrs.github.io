import concordRoom from '../assets/projects/concord-room.webp';
import concordRoomSmall from '../assets/projects/concord-room-960.webp';
import concordLanding from '../assets/projects/concord-landing.webp';
import concordLandingSmall from '../assets/projects/concord-landing-960.webp';
import sinlabsProfiles from '../assets/projects/sinlabs-profiles.webp';
import sinlabsProfilesSmall from '../assets/projects/sinlabs-profiles-960.webp';
import sinlabsFeed from '../assets/projects/sinlabs-feed.webp';
import sinlabsFeedSmall from '../assets/projects/sinlabs-feed-960.webp';
import sinlabsThread from '../assets/projects/sinlabs-feed-thread.webp';
import sinlabsThreadSmall from '../assets/projects/sinlabs-feed-thread-960.webp';
import sinlabsLogin from '../assets/projects/sinlabs-login.webp';
import sinlabsLoginSmall from '../assets/projects/sinlabs-login-960.webp';
import deepwokendlePoster from '../assets/projects/deepwokendle-poster.webp';
import deepwokendleAnimation from '../assets/projects/deepwokendle-tour.webp';
import type { ProjectId, Shot } from './types';

export interface ProjectLinks {
  site?: string;
  repo?: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  links: ProjectLinks;
  stack: string[];
  shots: Shot[];
}

export interface Annotation {
  /** Posição do marcador em porcentagem da largura e da altura da imagem. */
  x: number;
  y: number;
}

export const projects: Record<ProjectId, Project> = {
  concord: {
    id: 'concord',
    name: 'Concord',
    links: { site: 'https://concord.app.br/' },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Ant Design',
      'C#',
      'ASP.NET Core',
      'Entity Framework Core',
      'PostgreSQL',
      'SignalR',
      'WebRTC',
      'Cloudflare Realtime',
      'Electron',
      'Docker',
      'Nginx',
    ],
    shots: [
      { id: 'concord-room', src: concordRoom, srcSmall: concordRoomSmall, width: 1912, height: 946 },
      { id: 'concord-landing', src: concordLanding, srcSmall: concordLandingSmall, width: 1920, height: 1200 },
    ],
  },
  sinlabs: {
    id: 'sinlabs',
    name: 'Sinlabs',
    links: {
      site: 'https://sinlabs.vercel.app/',
      repo: 'https://github.com/matheuskrs/sinlabs-integracao',
    },
    stack: ['React', 'JavaScript', 'Vite', 'React Router', 'CSS', 'REST', 'ASP.NET Core', 'JWT', 'Dapper', 'SQL Server'],
    shots: [
      { id: 'sinlabs-profiles', src: sinlabsProfiles, srcSmall: sinlabsProfilesSmall, width: 1915, height: 939 },
      { id: 'sinlabs-feed', src: sinlabsFeed, srcSmall: sinlabsFeedSmall, width: 1918, height: 942 },
      { id: 'sinlabs-feed-thread', src: sinlabsThread, srcSmall: sinlabsThreadSmall, width: 1913, height: 933 },
      { id: 'sinlabs-login', src: sinlabsLogin, srcSmall: sinlabsLoginSmall, width: 1919, height: 944 },
    ],
  },
  deepwokendle: {
    id: 'deepwokendle',
    name: 'Deepwokendle',
    links: {
      site: 'https://www.deepwokendle.com/',
      repo: 'https://github.com/deepwokendle/deepwokendle.github.io',
    },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'C#',
      'ASP.NET Core',
      'Dapper',
      'PostgreSQL',
      'SignalR',
      'JWT',
      'Supabase Storage',
      'GitHub Actions',
    ],
    shots: [],
  },
};

/** Marcadores sobre a captura de perfis do Sinlabs, na mesma ordem das legendas. */
export const sinlabsAnnotations: Annotation[] = [
  { x: 2.3, y: 27 },
  { x: 30, y: 22.5 },
  { x: 77.6, y: 22.5 },
  { x: 8.3, y: 33.5 },
  { x: 95.2, y: 38.5 },
  { x: 89.5, y: 83.5 },
];

export const deepwokendleTour = {
  poster: deepwokendlePoster,
  animation: deepwokendleAnimation,
  width: 800,
  height: 393,
};
