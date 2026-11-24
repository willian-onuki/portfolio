import { renderOgCard, ogSize } from '@/components/og/OgCard';
import { pt } from '@/content/pt';

export const alt = pt.meta.ogTitle;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgCard(pt);
}
