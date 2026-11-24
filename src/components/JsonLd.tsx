import type { Content } from '@/content/types';
import { buildJsonLd } from '@/lib/metadata';

export function JsonLd({ content }: { content: Content }) {
  const json = JSON.stringify(buildJsonLd(content)).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
