import { Fragment } from 'react';
import type { Rich } from '@/content/types';

/** Renderiza texto com trechos `{ em }` em serifada itálica (classe .em). */
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, index) =>
        typeof part === 'string' ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <span key={index} className="em">
            {part.em}
          </span>
        ),
      )}
    </>
  );
}

/** Texto puro (aria-label, metadados). */
export const richToString = (value: Rich): string =>
  value.map((part) => (typeof part === 'string' ? part : part.em)).join('');
