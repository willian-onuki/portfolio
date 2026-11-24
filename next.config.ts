import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // obrigatório a partir do Next 16: só estas qualidades podem ser geradas
    qualities: [80],
  },
  experimental: {
    // 404 único para as duas árvores (PT e EN têm root layouts próprios)
    globalNotFound: true,
    // CSS no próprio HTML: sem requisição bloqueando a 1ª pintura (o público
    // de um portfólio é quase todo de primeira visita; ~9 KB gzip)
    inlineCss: true,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // currículo abre no visualizador do navegador, com nome de arquivo amigável
        source: '/curriculo-willian-onuki.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'inline; filename="curriculo-willian-onuki.pdf"' },
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
