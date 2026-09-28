import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/contacts';
import { navigation } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { useI18n } from '../i18n/useI18n';
import { Icon } from './Icon';
import { LanguageSwitch } from './LanguageSwitch';
import styles from './SiteHeader.module.css';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  const { t } = useI18n();
  const active = useActiveSection(navigation);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container-wide ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label={t.header.home}>
          <span className={styles.monogram} aria-hidden="true">
            {profile.monogram}
          </span>
          <span className={styles.brandName} aria-hidden="true">
            {profile.name}
          </span>
        </a>

        <nav className={styles.nav} aria-label={t.header.navLabel} data-open={menuOpen}>
          <ul id="site-menu" role="list" className={styles.links}>
            {navigation.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {t.header.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.controls}>
          <LanguageSwitch />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? t.header.menuClose : t.header.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
