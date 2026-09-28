export type Locale = 'pt-BR' | 'en-US';

/** Ano e mês no formato ISO, por exemplo "2026-06". */
export type YearMonth = `${number}-${number}`;

export type ContextId = 'nexus' | 'upper' | 'concord' | 'sinlabs' | 'deepwokendle';

export type ProjectId = 'concord' | 'sinlabs' | 'deepwokendle';

export interface Shot {
  id: string;
  src: string;
  srcSmall: string;
  width: number;
  height: number;
}
