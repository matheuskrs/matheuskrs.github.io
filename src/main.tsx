import '@fontsource/dm-serif-display/latin-400.css';
import '@fontsource-variable/manrope/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ImageViewerProvider } from './components/ImageViewerProvider';
import { I18nProvider } from './i18n/I18nProvider';
import { ThemeProvider } from './theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <ImageViewerProvider>
          <App />
        </ImageViewerProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);
