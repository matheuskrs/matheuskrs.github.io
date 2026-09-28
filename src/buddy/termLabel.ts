import { projects } from '../data/projects';
import { skillAreas } from '../data/skills';
import type { ProjectId } from '../data/types';

const skillNames: Record<string, string> = Object.fromEntries(
  skillAreas.flatMap((area) => area.skills.map((skill) => [skill.id, skill.name])),
);

/** Nome que não se traduz para um termo: projeto ou tecnologia. */
export function termLabel(id: string, translatedNames: Record<string, string> = {}) {
  return projects[id as ProjectId]?.name ?? translatedNames[id] ?? skillNames[id] ?? id;
}
