'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Atração "magnética" sutil para CTAs: o elemento segue o ponteiro alguns
 * pixels. Só com mouse/trackpad (hover fino) e sem movimento reduzido.
 * Escreve apenas `transform` (sem reflow).
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.22): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let rect: DOMRect | null = null;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      frame = 0;
      el.style.transform = tx || ty ? `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)` : '';
    };
    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (event: PointerEvent) => {
      rect ??= el.getBoundingClientRect();
      tx = (event.clientX - (rect.left + rect.width / 2)) * strength;
      ty = (event.clientY - (rect.top + rect.height / 2)) * strength;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rect = null;
      tx = 0;
      ty = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, strength]);
}
