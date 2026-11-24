export type Locale = 'pt' | 'en';

/** Âncoras das seções (iguais nos dois idiomas). */
export type SectionId = 'home' | 'manifesto' | 'stack' | 'experience' | 'projects' | 'about' | 'contact';

/**
 * Texto com trechos em destaque: strings simples e `{ em }` (renderizado em
 * serifada itálica, na cor de acento).
 */
export type Rich = ReadonlyArray<string | { em: string }>;

export interface Fact {
  kicker: string;
  value: string;
  text: string;
}

export interface StackLayer {
  index: string;
  name: string;
  title: string;
  text: string;
  tech: readonly string[];
}

export interface Job {
  company: string;
  role: string;
  /** Período legível ("fev 2024 — atual"). */
  period: string;
  /** Datas para <time dateTime>. */
  start: string;
  end?: string;
  current?: boolean;
  freelance?: boolean;
  context: string;
  highlights: readonly string[];
  stack: readonly string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'demo' | 'repo';
}

export interface Project {
  /** Chave do diagrama de arquitetura (content/schematics.ts). */
  id: 'feedback-widget' | 'college-management' | 'rentx' | 'gofinances';
  name: string;
  kind: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
  /** Descrição textual do diagrama (leitores de tela). */
  diagramAlt: string;
}

export interface ArchiveItem {
  name: string;
  text: string;
  stack: readonly string[];
  href: string;
}

export interface Intent {
  id: 'web' | 'mobile' | 'api' | 'job' | 'other';
  label: string;
}

export interface Content {
  locale: Locale;
  htmlLang: 'pt-BR' | 'en';
  ogLocale: 'pt_BR' | 'en_US';
  /** Caminho da página neste idioma. */
  path: '/' | '/en';

  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: readonly string[];
    jobTitle: string;
  };

  a11y: {
    skip: string;
    nav: string;
    mobileNav: string;
    menuOpen: string;
    menuClose: string;
    home: string;
    newTab: string;
    sceneDescription: string;
  };

  nav: {
    items: ReadonlyArray<{ id: SectionId; label: string }>;
    cta: string;
    language: { label: string; short: string; href: string; hrefLang: string };
  };

  hero: {
    status: string;
    eyebrow: string;
    title: readonly Rich[];
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    links: { github: string; linkedin: string; cv: string };
    meta: ReadonlyArray<{ label: string; value: string }>;
    scrollHint: string;
  };

  manifesto: {
    eyebrow: string;
    text: Rich;
    facts: readonly Fact[];
  };

  stack: {
    eyebrow: string;
    title: Rich;
    lead: string;
    layers: readonly StackLayer[];
    crosscut: { title: string; items: readonly string[] };
  };

  experience: {
    eyebrow: string;
    title: Rich;
    lead: string;
    labels: { current: string; freelance: string; stack: string };
    items: readonly Job[];
  };

  projects: {
    eyebrow: string;
    title: Rich;
    lead: string;
    labels: { highlights: string; stack: string; architecture: string };
    featured: readonly Project[];
    archiveTitle: string;
    archive: readonly ArchiveItem[];
    viewAll: string;
  };

  about: {
    eyebrow: string;
    title: Rich;
    paragraphs: readonly string[];
    principlesTitle: string;
    principles: ReadonlyArray<{ title: string; text: string }>;
    facts: ReadonlyArray<{ label: string; value: string }>;
    educationTitle: string;
    education: ReadonlyArray<{ name: string; org: string; detail: string }>;
    cv: string;
    photoAlt: string;
  };

  contact: {
    eyebrow: string;
    title: Rich;
    lead: string;
    audiences: {
      clients: { kicker: string; title: string; text: string; cta: string };
      recruiters: { kicker: string; title: string; text: string; cv: string; linkedin: string; github: string };
    };
    composer: {
      title: string;
      intentLabel: string;
      intents: readonly Intent[];
      nameLabel: string;
      namePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      sendEmail: string;
      sendWhatsapp: string;
      hint: string;
      /** Modelos com {intent}, {name}, {company} e {message} (ver lib/format.ts). */
      subject: string;
      body: string;
      /** Trecho inserido em {company} quando a empresa é informada. */
      companyFragment: string;
      errors: { name: string; message: string };
    };
    channels: {
      title: string;
      email: string;
      copy: string;
      copied: string;
      whatsapp: string;
      linkedin: string;
      github: string;
      location: string;
    };
  };

  footer: {
    tagline: string;
    colophon: string;
    rights: string;
    backToTop: string;
  };

  notFound: {
    title: string;
    text: string;
    cta: string;
  };
}
