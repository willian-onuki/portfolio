import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  href: string;
  children: ReactNode;
  /** Texto para leitores de tela: "(abre em nova aba)". */
  newTabLabel: string;
}

/** Link externo em nova aba, seguro (noopener) e anunciado a leitores de tela. */
export function ExternalLink({ children, newTabLabel, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
