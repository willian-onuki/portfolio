import type { Metadata, Viewport } from 'next';
import type { Content } from '@/content/types';
import { site } from '@/config/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

/** Metadados de uma versão de idioma (canonical, hreflang, Open Graph, Twitter). */
export function buildMetadata(content: Content): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: content.meta.title,
    description: content.meta.description,
    keywords: [...content.meta.keywords],
    applicationName: site.name,
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    alternates: {
      canonical: content.path,
      languages: { 'pt-BR': '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'profile',
      locale: content.ogLocale,
      alternateLocale: content.locale === 'pt' ? ['en_US'] : ['pt_BR'],
      url: content.path,
      siteName: site.name,
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      firstName: 'Willian',
      lastName: 'Onuki',
      username: site.githubUser,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
    category: 'technology',
  };
}

/** Dados estruturados (schema.org) — só com informações confirmadas. */
export function buildJsonLd(content: Content) {
  const personId = `${site.url}/#person`;
  const pageUrl = new URL(content.path, site.url).toString();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.fullName,
        alternateName: site.name,
        jobTitle: content.meta.jobTitle,
        description: content.meta.description,
        url: site.url,
        image: new URL(site.photo, site.url).toString(),
        email: `mailto:${site.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        worksFor: { '@type': 'Organization', name: 'FitoVision' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Tecnológica Federal do Paraná' },
        knowsAbout: ['React', 'Next.js', 'React Native', 'Node.js', 'TypeScript', 'MySQL', 'PostgreSQL', 'Software Engineering'],
        sameAs: [site.github, site.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ['pt-BR', 'en'],
        author: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profile`,
        url: pageUrl,
        name: content.meta.title,
        inLanguage: content.htmlLang,
        isPartOf: { '@id': `${site.url}/#website` },
        mainEntity: { '@id': personId },
      },
    ],
  };
}
