import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Engenheiro de Software Full Stack`,
    short_name: site.name,
    description: 'Portfólio de Willian Onuki: aplicações web e mobile, do pixel ao banco de dados.',
    start_url: '/',
    display: 'browser',
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
