import { ConfigProvider, theme as antdTheme } from 'antd';
import enUS from 'antd/locale/en_US';
import ptBR from 'antd/locale/pt_BR';
import { useMemo, type ReactNode } from 'react';
import { useI18n } from '../i18n/useI18n';
import { useTheme } from './useTheme';

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Aplica os tokens de cor do site aos componentes do Ant Design. Usado só dentro de módulos carregados sob demanda. */
export default function AntdTheme({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const { locale } = useI18n();

  const config = useMemo(
    () => ({
      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: readToken('--color-accent'),
        colorBgBase: readToken('--color-bg'),
        colorBgElevated: readToken('--color-surface-raised'),
        colorBgContainer: readToken('--color-surface-raised'),
        colorTextBase: readToken('--color-ink'),
        colorBorder: readToken('--color-line-strong'),
        colorBorderSecondary: readToken('--color-line'),
        fontFamily: readToken('--font-body'),
        borderRadius: 4,
        borderRadiusLG: 6,
        controlHeight: 44,
      },
    }),
    // Os tokens são lidos do CSS, que muda junto com o tema.
    [theme],
  );

  return (
    <ConfigProvider theme={config} locale={locale === 'en-US' ? enUS : ptBR}>
      {children}
    </ConfigProvider>
  );
}
