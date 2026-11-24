'use client';

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/device';
import { stage } from '@/lib/stage';
import { SmoothScrollContext, type SmoothScrollApi } from './smooth-scroll-context';

const headerOffset = (): number => {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
  return parseFloat(value) || 72;
};

/**
 * Rolagem suave (Lenis) sincronizada ao ticker do GSAP: ScrollTrigger, Lenis e
 * o loop 3D andam no mesmo quadro, sem "tremidas" entre camadas. Com
 * prefers-reduced-motion o Lenis não é criado e a rolagem é a nativa.
 * No toque, o Lenis mantém a rolagem nativa (syncTouch desligado).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Rolagem e viewport gravados no evento — o loop 3D nunca lê o layout.
  useEffect(() => {
    const onScroll = () => {
      stage.scrollY = window.scrollY;
      stage.invalidate();
    };
    const onResize = () => {
      stage.viewportH = window.innerHeight;
    };
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Ponteiro global normalizado (-1..1) → parallax da cena.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      stage.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // anchors: links #âncora (rodapé etc.) também rolam suavemente. O recuo
    // do header vem do CSS (scroll-padding-top no <html>), que o Lenis já
    // desconta sozinho — nada de offset extra aqui.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      autoRaf: false,
      anchors: { duration: 1.5 },
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo(target, options) {
        const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
        if (!el) return;
        // Seções de tela cheia sobre o 3D alinham ao topo; as demais, abaixo
        // do header. O Lenis já desconta scroll-padding-top (= altura do
        // header) e scroll-margin-top; a rolagem nativa, não.
        const alignTop = el.hasAttribute('data-align-top');
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(el, { offset: alignTop ? headerOffset() : 0, immediate: options?.immediate, duration: 1.5 });
        } else {
          const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          const top = el.getBoundingClientRect().top + window.scrollY - (alignTop ? 0 : headerOffset() + margin);
          window.scrollTo({ top, behavior: 'auto' });
        }
        // Foco acompanha a navegação (teclado / leitores de tela).
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        if (el.id) history.replaceState(null, '', `#${el.id}`);
      },
    }),
    [],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
