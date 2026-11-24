import { Fragment, type ReactNode } from 'react';
import type { Rich } from '@/content/types';

interface Word {
  text: string;
  em: boolean;
}

/** Quebra um texto rico em palavras, preservando os trechos em destaque. */
export function toWords(value: Rich): Word[] {
  const words: Word[] = [];
  for (const part of value) {
    const text = typeof part === 'string' ? part : part.em;
    const em = typeof part !== 'string';
    // espaços viram separadores; pontuação sem espaço antes fica colada à palavra
    const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
    for (const token of tokens) words.push(/^\s+$/.test(token) ? { text: ' ', em: false } : { text: token, em });
  }
  return words;
}

interface SplitWordsProps {
  value: Rich;
  /** Índice inicial (atraso escalonado via --i). */
  start?: number;
  wordClassName: string;
  maskClassName?: string;
  emClassName?: string;
}

/**
 * Renderiza cada palavra num <span> (com máscara opcional) e expõe o índice
 * em --i para animações escalonadas em CSS/GSAP. O texto continua legível
 * para leitores de tela e buscadores (sem aria-label substituto).
 */
export function SplitWords({ value, start = 0, wordClassName, maskClassName, emClassName = 'em' }: SplitWordsProps) {
  let index = start;
  const nodes: ReactNode[] = [];
  toWords(value).forEach((word, key) => {
    if (word.text === ' ') {
      nodes.push(<Fragment key={key}> </Fragment>);
      return;
    }
    const i = index;
    index += 1;
    const inner = (
      <span className={`${wordClassName}${word.em ? ` ${emClassName}` : ''}`} style={{ '--i': i }} data-word="">
        {word.text}
      </span>
    );
    nodes.push(
      maskClassName ? (
        <span key={key} className={maskClassName}>
          {inner}
        </span>
      ) : (
        <Fragment key={key}>{inner}</Fragment>
      ),
    );
  });
  return <>{nodes}</>;
}

/** Quantidade de palavras (para encadear atrasos entre linhas). */
export const countWords = (value: Rich): number => toWords(value).filter((w) => w.text !== ' ').length;
