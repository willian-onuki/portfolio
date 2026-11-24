/**
 * Poses-chave da stack ao longo da rolagem. Posições horizontais/verticais
 * são frações da meia-largura/meia-altura visíveis (a composição acompanha a
 * proporção da tela); o tamanho é relativo ao "encaixe" na tela.
 *
 *   P0 Hero        — montada, à direita do título
 *   P1 Manifesto   — recua, gira e esmaece sob o texto
 *   P2 Stack       — explodida (camadas separadas), entra em foco
 *   P3 fim da Stack — mesma pose, com leve giro
 */
export interface Pose {
  x: number;
  y: number;
  z: number;
  scale: number;
  pitch: number;
  yaw: number;
  /** Distância entre camadas (centro a centro). */
  spread: number;
  /** Brilho global (0..1). */
  dim: number;
}

interface KeyPose {
  xF: number;
  yF: number;
  z: number;
  size: number;
  pitch: number;
  yaw: number;
  spread: number;
  dim: number;
}

interface Layout {
  /** Encaixe: fração da meia-largura / meia-altura que a stack pode ocupar. */
  wFit: number;
  hFit: number;
  keys: readonly [KeyPose, KeyPose, KeyPose, KeyPose];
}

const DESKTOP: Layout = {
  wFit: 0.44,
  hFit: 0.62,
  keys: [
    { xF: 0.5, yF: -0.02, z: 0, size: 1, pitch: 0.58, yaw: -0.62, spread: 0.46, dim: 1 },
    { xF: 0.6, yF: 0.04, z: -2.6, size: 0.85, pitch: 0.72, yaw: -1.3, spread: 0.72, dim: 0.26 },
    { xF: 0.47, yF: -0.02, z: 0, size: 0.9, pitch: 0.4, yaw: -0.55, spread: 1.08, dim: 1 },
    { xF: 0.47, yF: -0.02, z: 0, size: 0.9, pitch: 0.4, yaw: -0.22, spread: 1.08, dim: 1 },
  ],
};

const MOBILE: Layout = {
  wFit: 0.84,
  hFit: 0.42,
  keys: [
    { xF: 0, yF: 0.5, z: 0, size: 1, pitch: 0.56, yaw: -0.62, spread: 0.44, dim: 1 },
    { xF: 0, yF: 0.42, z: -2, size: 0.85, pitch: 0.75, yaw: -1.2, spread: 0.6, dim: 0.2 },
    { xF: 0, yF: 0.46, z: 0, size: 0.92, pitch: 0.46, yaw: -0.55, spread: 0.86, dim: 1 },
    { xF: 0, yF: 0.46, z: 0, size: 0.92, pitch: 0.46, yaw: -0.25, spread: 0.86, dim: 1 },
  ],
};

/** Meia-largura projetada da stack com escala 1 (unidades do mundo). */
const STACK_RADIUS = 1.9;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const KEYS = ['xF', 'yF', 'z', 'size', 'pitch', 'yaw', 'spread', 'dim'] as const;

function blendKey(a: KeyPose, b: KeyPose, t: number, out: KeyPose): KeyPose {
  for (const k of KEYS) out[k] = mix(a[k], b[k], t);
  return out;
}

const tmpA: KeyPose = { ...DESKTOP.keys[0] };
const tmpB: KeyPose = { ...DESKTOP.keys[0] };

function keyAt(layout: Layout, scrollY: number, marks: readonly number[], out: KeyPose): KeyPose {
  const [m0, m1, m2, m3] = marks;
  const k = layout.keys;
  if (scrollY <= m1) return blendKey(k[0], k[1], smooth(clamp01((scrollY - m0) / Math.max(1, m1 - m0))), out);
  if (scrollY <= m2) return blendKey(k[1], k[2], smooth(clamp01((scrollY - m1) / Math.max(1, m2 - m1))), out);
  return blendKey(k[2], k[3], clamp01((scrollY - m2) / Math.max(1, m3 - m2)), out);
}

/**
 * Pose para a rolagem atual. Entre retrato e paisagem, as duas composições
 * são misturadas pela proporção da tela (tablets ficam no meio do caminho).
 */
export function poseAt(scrollY: number, marks: readonly number[], halfW: number, halfH: number, out: Pose): Pose {
  const aspect = halfW / halfH;
  const m = smooth(clamp01((aspect - 0.78) / (1.22 - 0.78)));
  const d = keyAt(DESKTOP, scrollY, marks, tmpA);
  const p = keyAt(MOBILE, scrollY, marks, tmpB);
  const wFit = mix(MOBILE.wFit, DESKTOP.wFit, m);
  const hFit = mix(MOBILE.hFit, DESKTOP.hFit, m);
  const fit = Math.min(halfW * wFit, halfH * hFit) / STACK_RADIUS;

  out.x = mix(p.xF, d.xF, m) * halfW;
  out.y = mix(p.yF, d.yF, m) * halfH;
  out.z = mix(p.z, d.z, m);
  out.scale = mix(p.size, d.size, m) * fit;
  out.pitch = mix(p.pitch, d.pitch, m);
  out.yaw = mix(p.yaw, d.yaw, m);
  out.spread = mix(p.spread, d.spread, m);
  out.dim = mix(p.dim, d.dim, m);
  return out;
}
