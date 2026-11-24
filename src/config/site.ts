/**
 * Dados pessoais e canais — fonte única de verdade usada pelo conteúdo,
 * pelos metadados (SEO), pelo JSON-LD e pelos CTAs.
 *
 * Ao trocar de domínio, atualize `url` (canonical, sitemap, Open Graph).
 */
export const site = {
  url: 'https://portfolio-sigma-sable-35.vercel.app',
  name: 'Willian Onuki',
  fullName: 'Willian Kiyoshi Onuki',
  initials: 'WO',

  email: 'willianonuki1@gmail.com',
  phoneDisplay: '+55 43 99627-5754',
  /** Número no formato internacional, só dígitos (link do WhatsApp). */
  whatsapp: '5543996275754',

  location: {
    city: 'Cornélio Procópio',
    region: 'PR',
    country: 'BR',
  },

  github: 'https://github.com/willian-onuki',
  githubUser: 'willian-onuki',
  linkedin: 'https://www.linkedin.com/in/willian-onuki-313691206/',

  /** Currículo em PDF (public/). */
  cv: '/curriculo-willian-onuki.pdf',
  /** Foto de perfil (public/). */
  photo: '/images/willian-onuki.jpg',

  /** Mostra o selo "disponível" no Hero. */
  availableForWork: true,
} as const;

export const mailto = (subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${site.email}${query ? `?${query}` : ''}`;
};

export const whatsappLink = (text?: string): string =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
