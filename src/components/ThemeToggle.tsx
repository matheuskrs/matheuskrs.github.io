import { useI18n } from '../i18n/useI18n';
import { useTheme } from '../theme/useTheme';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      label={theme === 'dark' ? t.header.theme.toLight : t.header.theme.toDark}
    />
  );
}
