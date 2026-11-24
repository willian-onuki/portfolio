'use client';

import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  strength?: number;
}

/** <a> com atração magnética sutil (só ponteiro fino, sem movimento reduzido). */
export function MagneticLink({ children, strength, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, strength);
  return (
    <a ref={ref} {...props}>
      {children}
    </a>
  );
}
