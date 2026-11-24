import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata } from '@/lib/metadata';
import { en } from '@/content/en';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata(en);

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument content={en}>{children}</RootDocument>;
}
