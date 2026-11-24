import { CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace, type Texture } from 'three';

/**
 * Padrões luminosos "gravados" no topo de cada camada da stack, desenhados em
 * canvas 2D na carga (nenhuma textura para baixar). O brilho vem do próprio
 * canvas (shadowBlur) e a mistura aditiva acende as linhas sobre o vidro.
 *
 *   0 · Interface — janela web + celular (wireframe de UI)
 *   1 · API       — rotas e middlewares ligados por barramentos
 *   2 · Dados     — tabelas relacionais com chaves e relações
 *
 * As três camadas compartilham as mesmas PORTAS (pontos de conexão): os
 * pulsos de luz sobem e descem entre elas, alinhados verticalmente.
 */

export const PATTERN_W = 1024;
export const PATTERN_H = 672; // proporção da face: 3,2 × 2,1

/** Portas em coordenadas normalizadas da face (u → x, v → z; v = 0 no fundo). */
export const PORTS: ReadonlyArray<{ u: number; v: number }> = [
  { u: 0.27, v: 0.64 },
  { u: 0.56, v: 0.36 },
  { u: 0.85, v: 0.6 },
];

const EMBER = '255, 106, 43';
const WHITE = '238, 236, 231';

interface Fonts {
  mono: string;
  sans: string;
}

type Ctx = CanvasRenderingContext2D;

const px = (p: { u: number; v: number }) => ({ x: p.u * PATTERN_W, y: p.v * PATTERN_H });

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function line(ctx: Ctx, alpha: number, width = 2, glow = 0) {
  ctx.lineWidth = width;
  ctx.strokeStyle = `rgba(${WHITE}, ${alpha})`;
  ctx.shadowColor = `rgba(${WHITE}, ${Math.min(1, alpha + 0.2)})`;
  ctx.shadowBlur = glow;
}

function ember(ctx: Ctx, alpha: number, glow = 18) {
  ctx.fillStyle = `rgba(${EMBER}, ${alpha})`;
  ctx.strokeStyle = `rgba(${EMBER}, ${alpha})`;
  ctx.shadowColor = `rgba(${EMBER}, 0.9)`;
  ctx.shadowBlur = glow;
}

function text(ctx: Ctx, value: string, x: number, y: number, size: number, alpha: number, font: string, align: CanvasTextAlign = 'left') {
  ctx.shadowBlur = 0;
  ctx.font = `500 ${size}px ${font}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(${WHITE}, ${alpha})`;
  ctx.fillText(value, x, y);
}

/** Moldura, marcas de canto e rótulos comuns às três camadas. */
function frame(ctx: Ctx, fonts: Fonts, index: string, name: string, hint: string) {
  line(ctx, 0.2, 2, 6);
  roundRect(ctx, 12, 12, PATTERN_W - 24, PATTERN_H - 24, 30);
  ctx.stroke();

  // marcas de canto (registro de "prancha técnica")
  line(ctx, 0.55, 2.5, 8);
  const m = 34;
  const l = 22;
  for (const [cx, cy, sx, sy] of [
    [m, m, 1, 1],
    [PATTERN_W - m, m, -1, 1],
    [m, PATTERN_H - m, 1, -1],
    [PATTERN_W - m, PATTERN_H - m, -1, -1],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + sy * l);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + sx * l, cy);
    ctx.stroke();
  }

  text(ctx, `${index} · ${name.toUpperCase()}`, 64, PATTERN_H - 58, 26, 0.78, fonts.mono);
  text(ctx, hint, PATTERN_W - 64, PATTERN_H - 58, 18, 0.38, fonts.mono, 'right');
}

/** Porta: anel + núcleo em brasa (onde o pulso atravessa a camada). */
function port(ctx: Ctx, p: { u: number; v: number }) {
  const { x, y } = px(p);
  ember(ctx, 0.95, 22);
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y, 17, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/* ---------------------------------------------------------------- 0 · UI */
function drawInterface(ctx: Ctx, fonts: Fonts, name: string) {
  frame(ctx, fonts, '01', name, 'REACT · NEXT.JS · REACT NATIVE');

  // janela web
  const wx = 70;
  const wy = 70;
  const ww = 640;
  const wh = 500;
  line(ctx, 0.62, 2.5, 10);
  roundRect(ctx, wx, wy, ww, wh, 22);
  ctx.stroke();
  // barra superior
  line(ctx, 0.3, 2);
  ctx.beginPath();
  ctx.moveTo(wx, wy + 48);
  ctx.lineTo(wx + ww, wy + 48);
  ctx.stroke();
  for (let i = 0; i < 3; i += 1) {
    line(ctx, 0.5, 2, 4);
    ctx.beginPath();
    ctx.arc(wx + 28 + i * 22, wy + 24, 6, 0, Math.PI * 2);
    ctx.stroke();
  }
  line(ctx, 0.28, 2);
  roundRect(ctx, wx + 130, wy + 13, 300, 22, 11);
  ctx.stroke();

  // barra lateral
  line(ctx, 0.22, 2);
  ctx.beginPath();
  ctx.moveTo(wx + 150, wy + 48);
  ctx.lineTo(wx + 150, wy + wh);
  ctx.stroke();
  for (let i = 0; i < 5; i += 1) {
    line(ctx, i === 1 ? 0.75 : 0.3, i === 1 ? 4 : 3, i === 1 ? 8 : 0);
    ctx.beginPath();
    ctx.moveTo(wx + 28, wy + 92 + i * 38);
    ctx.lineTo(wx + 28 + (i === 1 ? 92 : 70 - i * 6), wy + 92 + i * 38);
    ctx.stroke();
  }

  // título + subtítulo
  line(ctx, 0.75, 7, 10);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(wx + 182, wy + 92);
  ctx.lineTo(wx + 400, wy + 92);
  ctx.stroke();
  line(ctx, 0.3, 4);
  ctx.beginPath();
  ctx.moveTo(wx + 182, wy + 120);
  ctx.lineTo(wx + 330, wy + 120);
  ctx.stroke();

  // card com gráfico (a porta 2 é o ponto em destaque)
  const p2 = px(PORTS[1]);
  const cx = wx + 182;
  const cy = wy + 146;
  const cw = 428;
  const ch = 170;
  line(ctx, 0.42, 2, 6);
  roundRect(ctx, cx, cy, cw, ch, 16);
  ctx.stroke();
  const points: Array<[number, number]> = [
    [cx + 24, cy + 132],
    [cx + 90, cy + 110],
    [cx + 150, cy + 124],
    [p2.x - 40, p2.y + 36],
    [p2.x, p2.y],
    [cx + cw - 70, cy + 60],
    [cx + cw - 22, cy + 40],
  ];
  line(ctx, 0.85, 3, 12);
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();
  // área sob a curva
  ctx.shadowBlur = 0;
  const gradient = ctx.createLinearGradient(0, cy + 30, 0, cy + ch);
  gradient.addColorStop(0, `rgba(${WHITE}, 0.16)`);
  gradient.addColorStop(1, `rgba(${WHITE}, 0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.lineTo(cx + cw - 22, cy + ch - 12);
  ctx.lineTo(cx + 24, cy + ch - 12);
  ctx.closePath();
  ctx.fill();

  // linha de cards pequenos
  for (let i = 0; i < 3; i += 1) {
    line(ctx, 0.3, 2);
    roundRect(ctx, cx + i * 146, cy + ch + 22, 134, 74, 12);
    ctx.stroke();
    line(ctx, 0.55, 4);
    ctx.beginPath();
    ctx.moveTo(cx + 18 + i * 146, cy + ch + 46);
    ctx.lineTo(cx + 70 + i * 146, cy + ch + 46);
    ctx.stroke();
    line(ctx, 0.25, 3);
    ctx.beginPath();
    ctx.moveTo(cx + 18 + i * 146, cy + ch + 70);
    ctx.lineTo(cx + 104 + i * 146, cy + ch + 70);
    ctx.stroke();
  }

  // botão primário na porta 1
  const p1 = px(PORTS[0]);
  ember(ctx, 0.9, 20);
  roundRect(ctx, p1.x - 82, p1.y - 22, 164, 44, 22);
  ctx.globalAlpha = 0.28;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // celular
  const mx = 756;
  const my = 74;
  const mw = 196;
  const mh = 400;
  line(ctx, 0.62, 2.5, 10);
  roundRect(ctx, mx, my, mw, mh, 34);
  ctx.stroke();
  line(ctx, 0.4, 3);
  ctx.beginPath();
  ctx.moveTo(mx + mw / 2 - 26, my + 20);
  ctx.lineTo(mx + mw / 2 + 26, my + 20);
  ctx.stroke();
  for (let i = 0; i < 4; i += 1) {
    const ry = my + 62 + i * 62;
    line(ctx, 0.3, 2);
    roundRect(ctx, mx + 18, ry, mw - 36, 48, 12);
    ctx.stroke();
    line(ctx, 0.55, 4);
    ctx.beginPath();
    ctx.moveTo(mx + 66, ry + 18);
    ctx.lineTo(mx + 140, ry + 18);
    ctx.stroke();
    line(ctx, 0.25, 3);
    ctx.beginPath();
    ctx.moveTo(mx + 66, ry + 32);
    ctx.lineTo(mx + 120, ry + 32);
    ctx.stroke();
    line(ctx, 0.4, 2);
    ctx.beginPath();
    ctx.arc(mx + 42, ry + 24, 12, 0, Math.PI * 2);
    ctx.stroke();
  }
  // barra de abas
  line(ctx, 0.3, 2);
  ctx.beginPath();
  ctx.moveTo(mx, my + mh - 58);
  ctx.lineTo(mx + mw, my + mh - 58);
  ctx.stroke();

  for (const p of PORTS) port(ctx, p);
}

/* --------------------------------------------------------------- 1 · API */
function drawApi(ctx: Ctx, fonts: Fonts, name: string) {
  frame(ctx, fonts, '02', name, 'NODE.JS · EXPRESS · SOCKET.IO');

  const routes = [
    { p: PORTS[0], label: 'POST /auth', tag: 'JWT' },
    { p: PORTS[1], label: 'GET /orders', tag: 'REST' },
    { p: PORTS[2], label: 'socket.io', tag: 'WS' },
  ];

  // barramento central (o "router") ligando as rotas
  const busY = 470;
  line(ctx, 0.35, 2.5, 8);
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(110, busY);
  ctx.lineTo(PATTERN_W - 110, busY);
  ctx.stroke();
  text(ctx, 'router', 120, busY - 18, 18, 0.45, fonts.mono);

  for (const { p } of routes) {
    const { x, y } = px(p);
    line(ctx, 0.35, 2, 6);
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.moveTo(x, y + 32);
    ctx.lineTo(x, busY);
    ctx.stroke();
    ctx.setLineDash([]);
    line(ctx, 0.7, 2, 8);
    ctx.beginPath();
    ctx.arc(x, busY, 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  // middlewares no barramento
  const middlewares = [
    { x: 380, label: 'auth' },
    { x: 690, label: 'validate' },
  ];
  for (const mw of middlewares) {
    line(ctx, 0.55, 2, 8);
    roundRect(ctx, mw.x - 58, busY - 20, 116, 40, 10);
    ctx.fillStyle = 'rgba(10, 10, 11, 1)';
    ctx.shadowBlur = 0;
    ctx.fill();
    line(ctx, 0.55, 2, 8);
    ctx.stroke();
    text(ctx, mw.label, mw.x, busY, 19, 0.7, fonts.mono, 'center');
  }

  // rotas (chips) sobre as portas
  for (const { p, label, tag } of routes) {
    const { x, y } = px(p);
    const w = 236;
    line(ctx, 0.7, 2.5, 12);
    roundRect(ctx, x - w / 2, y - 30, w, 60, 14);
    ctx.fillStyle = 'rgba(10, 10, 11, 1)';
    ctx.shadowBlur = 0;
    ctx.fill();
    line(ctx, 0.7, 2.5, 12);
    ctx.stroke();
    text(ctx, label, x - w / 2 + 56, y, 21, 0.86, fonts.mono);
    text(ctx, tag, x + w / 2 - 16, y, 15, 0.45, fonts.mono, 'right');
  }

  // log de requisições (canto superior esquerdo)
  const log = ['200  GET  /orders   12ms', '201  POST /auth     38ms', '101  WS   /socket   ok'];
  log.forEach((entry, i) => text(ctx, entry, 70, 92 + i * 32, 17, 0.32 - i * 0.06, fonts.mono));

  for (const p of PORTS) port(ctx, p);
}

/* ------------------------------------------------------------- 2 · Dados */
function drawData(ctx: Ctx, fonts: Fonts, name: string) {
  frame(ctx, fonts, '03', name, 'MYSQL · POSTGRESQL · ORM');

  interface Table {
    name: string;
    x: number;
    y: number;
    w: number;
    cols: string[];
    port: number;
    keyRow: number;
  }
  const rowH = 34;
  const headH = 44;
  const tables: Table[] = [
    { name: 'users', x: 76, y: 300, w: 300, cols: ['id', 'name', 'email', 'created_at'], port: 0, keyRow: 1 },
    { name: 'orders', x: 420, y: 66, w: 300, cols: ['id', 'user_id', 'status', 'total', 'updated_at'], port: 1, keyRow: 2 },
    { name: 'events', x: 742, y: 250, w: 230, cols: ['id', 'order_id', 'type', 'payload'], port: 2, keyRow: 2 },
  ];

  // posiciona cada tabela para que a linha-chave caia exatamente na porta
  for (const t of tables) {
    const p = px(PORTS[t.port]);
    t.y = p.y - headH - (t.keyRow - 0.5) * rowH;
  }

  // relações (FK) — linhas tracejadas entre tabelas
  const rel = (from: Table, fromRow: number, to: Table, toRow: number) => {
    const y1 = from.y + headH + (fromRow - 0.5) * rowH;
    const y2 = to.y + headH + (toRow - 0.5) * rowH;
    const x1 = from.x + from.w;
    const x2 = to.x;
    const mid = (x1 + x2) / 2;
    line(ctx, 0.45, 2, 6);
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(mid, y1);
    ctx.lineTo(mid, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    // "pé de galinha" (N) na ponta
    ctx.beginPath();
    ctx.moveTo(x2 - 14, y2 - 9);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - 14, y2 + 9);
    ctx.stroke();
  };
  rel(tables[0], 1, tables[1], 2);
  rel(tables[1], 1, tables[2], 2);

  for (const t of tables) {
    const h = headH + t.cols.length * rowH;
    line(ctx, 0.62, 2.5, 10);
    roundRect(ctx, t.x, t.y, t.w, h, 14);
    ctx.fillStyle = 'rgba(10, 10, 11, 1)';
    ctx.shadowBlur = 0;
    ctx.fill();
    line(ctx, 0.62, 2.5, 10);
    ctx.stroke();
    line(ctx, 0.3, 2);
    ctx.beginPath();
    ctx.moveTo(t.x, t.y + headH);
    ctx.lineTo(t.x + t.w, t.y + headH);
    ctx.stroke();
    text(ctx, t.name, t.x + 20, t.y + headH / 2, 22, 0.9, fonts.mono);
    t.cols.forEach((col, i) => {
      const y = t.y + headH + (i + 0.5) * rowH;
      const isKey = i === 0;
      text(ctx, isKey ? `# ${col}` : col, t.x + 20, y, 18, isKey ? 0.7 : 0.45, fonts.mono);
      line(ctx, 0.16, 3);
      ctx.beginPath();
      ctx.moveTo(t.x + t.w - 92, y);
      ctx.lineTo(t.x + t.w - 22, y);
      ctx.stroke();
    });
  }

  for (const p of PORTS) port(ctx, p);
}

const DRAWERS = [drawInterface, drawApi, drawData] as const;

/** Família tipográfica real carregada pelo next/font (variável CSS). */
function readFonts(): Fonts {
  const style = getComputedStyle(document.documentElement);
  const mono = style.getPropertyValue('--font-geist-mono').trim() || 'ui-monospace, monospace';
  const sans = style.getPropertyValue('--font-geist').trim() || 'system-ui, sans-serif';
  return { mono, sans };
}

export async function createLayerTextures(maxAnisotropy: number, names: readonly string[]): Promise<Texture[]> {
  const fonts = readFonts();
  try {
    await Promise.all([document.fonts.load(`500 22px ${fonts.mono}`), document.fonts.ready]);
  } catch {
    /* segue com a fonte de fallback */
  }
  const textures: Texture[] = [];
  for (const [index, draw] of DRAWERS.entries()) {
    // uma textura por tarefa: a thread principal respira entre elas
    if (index > 0) await new Promise((resolve) => setTimeout(resolve, 0));
    const canvas = document.createElement('canvas');
    canvas.width = PATTERN_W;
    canvas.height = PATTERN_H;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      draw(ctx, fonts, names[index] ?? '');
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy);
    texture.minFilter = LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    textures.push(texture);
  }
  return textures;
}

/** Halo radial (poça de luz sob a stack). */
export function createGlowTexture(): Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255, 255, 255, 1)');
    g.addColorStop(0.25, 'rgba(255, 255, 255, 0.45)');
    g.addColorStop(0.6, 'rgba(255, 255, 255, 0.08)');
    g.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
