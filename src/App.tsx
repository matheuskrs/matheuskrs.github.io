import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { useI18n } from './i18n/useI18n';
import { About } from './sections/About';
import { BeyondCode } from './sections/BeyondCode';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { Projects } from './sections/projects/Projects';
import { Skills } from './sections/Skills';

export function App() {
  const { t } = useI18n();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <BeyondCode />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
