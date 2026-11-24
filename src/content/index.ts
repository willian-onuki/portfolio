import { en } from './en';
import { pt } from './pt';
import type { Content, Locale } from './types';

export const locales: readonly Locale[] = ['pt', 'en'];

const dictionaries: Record<Locale, Content> = { pt, en };

export const getContent = (locale: Locale): Content => dictionaries[locale];

export type { Content, Locale } from './types';
