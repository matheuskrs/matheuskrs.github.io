# matheuskrs.github.io

Portfólio de Matheus Rodrigues, em português e inglês. React, Vite e TypeScript.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run lint
npm run build    # typecheck e build de produção em dist/
```

## Onde fica cada coisa

```
src/
  data/        fatos que não se traduzem: datas, links, stacks, imagens
  i18n/        textos em pt-BR (fonte dos tipos) e en-US, provider e formatação
  theme/       tema claro/escuro e ponte de tokens para o Ant Design
  components/  partes reutilizadas (cabeçalho, visualizador de imagens, currículo)
  sections/    seções da página; projects/ guarda os três estudos de caso
  styles/      tokens e estilos globais
public/cv/     PDFs do currículo servidos para download
scripts/       utilitários de manutenção
```

Todo texto visível vem de `src/i18n/locales`. Uma chave que falte em `en-US.ts` quebra o build.

O idioma inicial vem de `?lang=pt|en`, da escolha salva ou do navegador, nessa ordem, com português como padrão.
O tema segue `prefers-color-scheme` até a primeira escolha manual. Os dois são resolvidos por um script inline no `index.html`, antes da primeira pintura.

## Currículo

Os PDFs ficam em `public/cv/`.

## Créditos

O botão de tema é adaptado do Animated Theme Toggler da Magic UI (MIT).
