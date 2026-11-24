import type { Locale, Project } from '@/content/types';
import { localize, schematics, type SchematicNode } from '@/content/schematics';
import styles from './Schematic.module.css';

const NODE_H = 11;
const CORNER = 2.4;

/** Largura do nó pelo texto (heurística determinística — igual no servidor e no cliente). */
const nodeWidth = (label: string, sub?: string) => Math.max(20, label.length * 1.95 + 8, (sub?.length ?? 0) * 1.5 + 8);

interface Placed {
  node: SchematicNode;
  label: string;
  sub?: string;
  w: number;
}

/** Caminho ortogonal com cantos arredondados entre dois nós. */
function route(a: Placed, b: Placed): string {
  const { x: ax, y: ay } = a.node;
  const { x: bx, y: by } = b.node;
  if (Math.abs(ax - bx) < 1) {
    // vertical
    const dir = by > ay ? 1 : -1;
    return `M${ax} ${ay + (dir * NODE_H) / 2} V${by - (dir * NODE_H) / 2}`;
  }
  const dir = bx > ax ? 1 : -1;
  const x1 = ax + (dir * a.w) / 2;
  const x2 = bx - (dir * b.w) / 2;
  if (Math.abs(ay - by) < 1) return `M${x1} ${ay} H${x2}`;
  const mid = (x1 + x2) / 2;
  const vy = by > ay ? 1 : -1;
  const r = Math.min(CORNER, Math.abs(by - ay) / 2, Math.abs(mid - x1));
  return [
    `M${x1} ${ay}`,
    `H${mid - dir * r}`,
    `Q${mid} ${ay} ${mid} ${ay + vy * r}`,
    `V${by - vy * r}`,
    `Q${mid} ${by} ${mid + dir * r} ${by}`,
    `H${x2}`,
  ].join(' ');
}

interface SchematicProps {
  id: Project['id'];
  locale: Locale;
  title: string;
  description: string;
}

/**
 * Diagrama de arquitetura de um projeto (capa do card). SVG puro gerado a
 * partir de content/schematics.ts; os pulsos que percorrem as arestas são
 * animações CSS (stroke-dashoffset) — nenhum JavaScript em tempo de execução.
 */
export function Schematic({ id, locale, title, description }: SchematicProps) {
  const spec = schematics[id];
  const placed = new Map<string, Placed>();
  for (const node of spec.nodes) {
    const label = localize(node.label, locale);
    const sub = node.sub ? localize(node.sub, locale) : undefined;
    placed.set(node.id, { node, label, sub, w: nodeWidth(label, sub) });
  }
  const titleId = `schematic-${id}-title`;
  const descId = `schematic-${id}-desc`;

  return (
    <svg className={styles.schematic} viewBox="0 0 100 62" role="img" aria-labelledby={`${titleId} ${descId}`}>
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>
      <defs>
        <pattern id={`grid-${id}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="0.5" cy="0.5" r="0.18" className={styles.dot} />
        </pattern>
      </defs>
      <rect width="100" height="62" fill={`url(#grid-${id})`} />

      {spec.edges.map((edge, index) => {
        const a = placed.get(edge.from);
        const b = placed.get(edge.to);
        if (!a || !b) return null;
        const d = route(a, b);
        const label = edge.label ? localize(edge.label, locale) : null;
        const lx = (a.node.x + b.node.x) / 2;
        const ly = Math.abs(a.node.y - b.node.y) < 1 ? a.node.y - 2.2 : (a.node.y + b.node.y) / 2;
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path d={d} className={styles.edge} />
            <path d={d} pathLength={100} className={styles.packet} style={{ '--delay': `${index * -0.55}s` }} />
            {edge.both ? (
              <path d={d} pathLength={100} className={`${styles.packet} ${styles.reverse}`} style={{ '--delay': `${index * -0.55 - 1.3}s` }} />
            ) : null}
            {label ? (
              <text x={lx + (Math.abs(a.node.y - b.node.y) < 1 ? 0 : 1.6)} y={ly} className={styles.edgeLabel} textAnchor={Math.abs(a.node.y - b.node.y) < 1 ? 'middle' : 'start'}>
                {label}
              </text>
            ) : null}
          </g>
        );
      })}

      {[...placed.values()].map(({ node, label, sub, w }) => (
        <g key={node.id} className={`${styles.node}${node.tone ? ` ${styles[node.tone]}` : ''}`}>
          <rect x={node.x - w / 2} y={node.y - NODE_H / 2} width={w} height={NODE_H} rx={2.2} className={styles.box} />
          <text x={node.x} y={node.y - (sub ? 0.9 : -1.1)} textAnchor="middle" className={styles.label}>
            {label}
          </text>
          {sub ? (
            <text x={node.x} y={node.y + 3.1} textAnchor="middle" className={styles.sub}>
              {sub}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
