import { renderOgCard, ogSize } from '@/components/og/OgCard';
import { en } from '@/content/en';

export const alt = en.meta.ogTitle;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgCard(en);
}
