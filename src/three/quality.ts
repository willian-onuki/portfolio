import type { QualityTier } from '@/lib/device';

export type { QualityTier };

/**
 * Configuração por nível. Quando o FPS cai, primeiro desce a resolução (sem
 * recompilar shaders); só depois o nível — que troca materiais e partículas.
 */
export interface QualitySettings {
  tier: QualityTier;
  /** Teto do devicePixelRatio (4K/retina não explodem o custo). */
  maxDpr: number;
  antialias: boolean;
  /** Vidro com verniz (clearcoat) — o material mais caro da cena. */
  clearcoat: boolean;
  packetsPerPort: number;
  dust: number;
}

export const QUALITY: Record<QualityTier, QualitySettings> = {
  high: { tier: 'high', maxDpr: 1.75, antialias: true, clearcoat: true, packetsPerPort: 9, dust: 360 },
  medium: { tier: 'medium', maxDpr: 1.5, antialias: true, clearcoat: true, packetsPerPort: 7, dust: 180 },
  low: { tier: 'low', maxDpr: 1, antialias: false, clearcoat: false, packetsPerPort: 5, dust: 0 },
};

export const stepDown = (tier: QualityTier): QualityTier => (tier === 'high' ? 'medium' : 'low');
