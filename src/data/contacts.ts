import cvPreviewPt from '../assets/cv/cv-pt-BR.webp';
import cvPreviewEn from '../assets/cv/cv-en-US.webp';
import type { Locale } from './types';

export const profile = {
  name: 'Matheus Rodrigues',
  fullName: 'Matheus Kauan Rodrigues de Souza',
  monogram: 'MR',
};

export const contacts = {
  email: 'matheuskrs308@gmail.com',
  phone: {
    display: '+55 14 99171-6361',
    href: 'tel:+5514991716361',
  },
  github: {
    href: 'https://github.com/matheuskrs',
    display: 'github.com/matheuskrs',
  },
  linkedin: {
    href: 'https://www.linkedin.com/in/matheuskrs/',
    display: 'linkedin.com/in/matheuskrs',
  },
  sourceCode: 'https://github.com/matheuskrs/matheuskrs.github.io',
};

interface Resume {
  href: string;
  fileName: string;
  preview: string;
  previewWidth: number;
  previewHeight: number;
}

const resumeFile = (fileName: string) => `${import.meta.env.BASE_URL}cv/${fileName}`;

export const resumes: Record<Locale, Resume> = {
  'pt-BR': {
    href: resumeFile('Matheus_Rodrigues.pdf'),
    fileName: 'Matheus_Rodrigues.pdf',
    preview: cvPreviewPt,
    previewWidth: 1323,
    previewHeight: 1871,
  },
  'en-US': {
    href: resumeFile('Matheus_Rodrigues_EN.pdf'),
    fileName: 'Matheus_Rodrigues_EN.pdf',
    preview: cvPreviewEn,
    previewWidth: 1323,
    previewHeight: 1871,
  },
};
