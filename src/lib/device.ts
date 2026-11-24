/** Detecção de capacidade do dispositivo (sem dependências). */

export type QualityTier = 'low' | 'medium' | 'high';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

const SOFTWARE_GPU = /SwiftShader|llvmpipe|softpipe|Basic Render|Microsoft Basic/i;

/**
 * Checagem barata (sem criar contexto): criar um contexto WebGL só para
 * testar custa caro — a cena cria o seu, e uma falha real cai no
 * SceneBoundary (fallback estático).
 */
export const supportsWebGL = (): boolean =>
  typeof window !== 'undefined' &&
  (typeof window.WebGL2RenderingContext !== 'undefined' || typeof window.WebGLRenderingContext !== 'undefined');

/** Renderização por software (sem GPU)? Lido do contexto já criado pela cena. */
export function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? '');
    return SOFTWARE_GPU.test(name);
  } catch {
    return false;
  }
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isCoarsePointer = (): boolean => window.matchMedia('(pointer: coarse)').matches;

/**
 * Palpite inicial de qualidade, antes de medir o FPS real (o monitor da cena
 * ainda pode baixar a resolução). Celular começa no médio; aparelho com pouca
 * memória/CPU, no baixo. GPU por software também vai para o baixo (Scene.tsx).
 */
export function initialQualityTier(): QualityTier {
  const nav = navigator as NavigatorWithMemory;
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  if (memory <= 2 || cores <= 2) return 'low';
  if (isCoarsePointer() || window.innerWidth < 900 || memory <= 4) return 'medium';
  return 'high';
}
