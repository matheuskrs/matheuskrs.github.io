import { Fragment, type ReactNode } from 'react';
import { CuriousTerm } from './CuriousTerm';
import { termLabel } from './termLabel';

const TOKEN = /\{(\w+)(?:\|([^}]+))?\}/g;

/**
 * Renderiza um texto traduzido trocando marcadores pelo termo clicável correspondente.
 * {concord} usa o nome do projeto ou da tecnologia; {infinite|modo infinito} usa o rótulo informado.
 */
export function TermText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const [token, id, label] = match;
    nodes.push(<Fragment key={`t${last}`}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(
      <CuriousTerm key={`c${match.index}`} id={id}>
        {label ?? termLabel(id)}
      </CuriousTerm>,
    );
    last = match.index + token.length;
  }
  nodes.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
