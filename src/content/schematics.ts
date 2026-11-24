import type { Locale, Project } from './types';

/**
 * Diagramas de arquitetura dos projetos em destaque (capa de cada card).
 * Coordenadas no viewBox 100 × 62; (x, y) é o centro do nó. Arestas são
 * roteadas na horizontal/vertical com cantos arredondados (Schematic.tsx).
 * Somente o que existe nos repositórios (package.json / schema) aparece aqui.
 */
type Localized = string | Readonly<Record<Locale, string>>;

export interface SchematicNode {
  id: string;
  x: number;
  y: number;
  label: Localized;
  sub?: Localized;
  /** accent = núcleo do sistema; store = persistência. */
  tone?: 'accent' | 'store';
}

export interface SchematicEdge {
  from: string;
  to: string;
  label?: Localized;
  /** Pacotes nos dois sentidos (leitura e escrita / sincronização). */
  both?: boolean;
}

export interface Schematic {
  nodes: readonly SchematicNode[];
  edges: readonly SchematicEdge[];
}

export const localize = (value: Localized, locale: Locale): string =>
  typeof value === 'string' ? value : value[locale];

export const schematics: Record<Project['id'], Schematic> = {
  'feedback-widget': {
    nodes: [
      { id: 'web', x: 16, y: 16, label: { pt: 'Widget web', en: 'Web widget' }, sub: 'React · Vite' },
      { id: 'mobile', x: 16, y: 46, label: { pt: 'App mobile', en: 'Mobile app' }, sub: 'React Native' },
      { id: 'api', x: 50, y: 31, label: 'API', sub: 'Node · Express', tone: 'accent' },
      { id: 'db', x: 84, y: 16, label: 'PostgreSQL', sub: 'Prisma', tone: 'store' },
      { id: 'mail', x: 84, y: 46, label: { pt: 'E-mail', en: 'Email' }, sub: 'Nodemailer' },
    ],
    edges: [
      { from: 'web', to: 'api', label: 'POST' },
      { from: 'mobile', to: 'api', label: 'POST' },
      { from: 'api', to: 'db', both: true },
      { from: 'api', to: 'mail' },
    ],
  },
  'college-management': {
    nodes: [
      { id: 'web', x: 16, y: 31, label: { pt: 'Painel web', en: 'Web dashboard' }, sub: 'React · Chakra' },
      { id: 'charts', x: 16, y: 53, label: 'Dashboard', sub: 'Chart.js' },
      { id: 'auth', x: 50, y: 9, label: 'Auth', sub: 'JWT · bcrypt' },
      { id: 'api', x: 50, y: 31, label: 'API REST', sub: 'Express', tone: 'accent' },
      { id: 'db', x: 84, y: 31, label: 'MySQL', sub: 'Sequelize', tone: 'store' },
      { id: 'files', x: 84, y: 53, label: 'Uploads', sub: 'Multer' },
    ],
    edges: [
      { from: 'web', to: 'api', both: true },
      { from: 'web', to: 'charts' },
      { from: 'auth', to: 'api' },
      { from: 'api', to: 'db', both: true },
      { from: 'api', to: 'files' },
    ],
  },
  rentx: {
    nodes: [
      { id: 'app', x: 16, y: 26, label: 'App', sub: 'React Native', tone: 'accent' },
      { id: 'ui', x: 16, y: 50, label: { pt: 'Animações', en: 'Animations' }, sub: 'Reanimated' },
      { id: 'local', x: 50, y: 26, label: 'WatermelonDB', sub: { pt: 'banco local', en: 'local db' }, tone: 'store' },
      { id: 'api', x: 84, y: 26, label: 'API', sub: 'JSON Server' },
      { id: 'offline', x: 50, y: 50, label: 'Offline-first', sub: { pt: 'sem conexão', en: 'no network' } },
    ],
    edges: [
      { from: 'app', to: 'local', both: true },
      { from: 'app', to: 'ui' },
      { from: 'local', to: 'api', label: 'sync', both: true },
      { from: 'local', to: 'offline' },
    ],
  },
  gofinances: {
    nodes: [
      { id: 'google', x: 16, y: 16, label: 'Google', sub: 'OAuth' },
      { id: 'apple', x: 16, y: 46, label: 'Apple', sub: 'Sign in' },
      { id: 'app', x: 50, y: 31, label: 'App', sub: 'React Native', tone: 'accent' },
      { id: 'storage', x: 84, y: 16, label: 'Async Storage', sub: { pt: 'persistência', en: 'persistence' }, tone: 'store' },
      { id: 'tests', x: 84, y: 46, label: { pt: 'Testes', en: 'Tests' }, sub: 'Jest' },
    ],
    edges: [
      { from: 'google', to: 'app', label: 'token' },
      { from: 'apple', to: 'app', label: 'token' },
      { from: 'app', to: 'storage', both: true },
      { from: 'tests', to: 'app' },
    ],
  },
};
