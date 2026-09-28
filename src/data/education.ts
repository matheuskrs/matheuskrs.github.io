export type EducationId = 'unisagrado' | 'etec' | 'fdevs' | 'barracred';
export type EducationKind = 'degree' | 'technical' | 'course' | 'training';

export interface Education {
  id: EducationId;
  institution: string;
  kind: EducationKind;
  group: 'academic' | 'complementary';
  start: number;
  end?: number;
  expected?: boolean;
}

export const education: Education[] = [
  { id: 'unisagrado', institution: 'UNISAGRADO', kind: 'degree', group: 'academic', start: 2025, end: 2029, expected: true },
  { id: 'etec', institution: 'ETEC', kind: 'technical', group: 'academic', start: 2024, end: 2025 },
  { id: 'fdevs', institution: 'FDevs · UPPER Consultoria', kind: 'course', group: 'complementary', start: 2024 },
  { id: 'barracred', institution: 'Barracred Conecta', kind: 'training', group: 'complementary', start: 2023, end: 2024 },
];

export type LanguageId = 'pt' | 'en' | 'es';

export const languages: LanguageId[] = ['pt', 'en', 'es'];
