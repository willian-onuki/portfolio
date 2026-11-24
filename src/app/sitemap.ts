import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { 'pt-BR': `${site.url}/`, en: `${site.url}/en` };
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${site.url}/en`, lastModified, changeFrequency: 'monthly', priority: 0.9, alternates: { languages } },
  ];
}
