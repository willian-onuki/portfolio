'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Registro único dos plugins do GSAP. Importe `gsap`/`ScrollTrigger` sempre
 * daqui para garantir o registro antes do uso.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
}

export { gsap, ScrollTrigger };

/** Media queries usadas com gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';
