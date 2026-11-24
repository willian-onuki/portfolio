import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata } from '@/lib/metadata';
import { pt } from '@/content/pt';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata(pt);

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <RootDocument content={pt}>{children}</RootDocument>;
}
