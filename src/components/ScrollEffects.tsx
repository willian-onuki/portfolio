'use client';

import { useEffect } from 'react';
import { gsap, MOTION_OK, ScrollTrigger } from '@/lib/gsap';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';

/**
 * Efeitos globais de rolagem:
 * - revelação dos elementos [data-reveal] em lotes (ScrollTrigger.batch);
 * - a folha clara sobe sobre o palco 3D, que recua e escurece (scrub);
 * - refresh dos ScrollTriggers quando fontes/imagens mudam o layout.
 */
export function ScrollEffects() {
  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        items.forEach((el) => el.setAttribute('data-revealed', ''));
        gsap.set(items, { opacity: 0, y: 32 });
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
        });

        gsap.fromTo(
          '.stage',
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.2,
            ease: 'none',
            scrollTrigger: { trigger: '.content-sheet', start: 'top bottom', end: 'top top', scrub: true },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    void document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return null;
}
