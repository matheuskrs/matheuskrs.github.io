export const navigation = ['about', 'projects', 'experience', 'skills', 'education', 'contact'] as const;

export type SectionId = (typeof navigation)[number];
