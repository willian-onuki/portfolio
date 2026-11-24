'use client';

import { useRef } from 'react';
import type { Content } from '@/content/types';
import { gsap, MOTION_OK } from '@/lib/gsap';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { SplitWords } from '@/components/ui/SplitWords';
import styles from './Manifesto.module.css';

/**
 * Declaração em texto grande: as palavras acendem conforme a rolagem
 * (scrub), com o bloco preso no centro da tela (sticky). A stack 3D recua
 * e esmaece atrás (poses.ts → P1).
 */
export function Manifesto({ content }: { content: Content }) {
  const { manifesto } = content;
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>('[data-word]');
        gsap.fromTo(
          words,
          // piso de opacidade: mesmo antes de acender, o texto grande mantém
          // contraste ≥ 3:1 (o acento em brasa precisa de mais opacidade)
          { opacity: (_: number, el: HTMLElement) => (el.classList.contains('em') ? 0.72 : 0.4) },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: { trigger: root, start: 'top 75%', end: 'center 45%', scrub: 0.4 },
          },
        );
        gsap.fromTo(
          '[data-fact]',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: '[data-facts]', start: 'top 85%', once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={rootRef} className={styles.manifesto} aria-labelledby="manifesto-title">
      <div className={styles.sticky}>
        <div className={`container ${styles.inner}`}>
          <h2 id="manifesto-title" className="eyebrow">
            {manifesto.eyebrow}
          </h2>
          <p className={styles.statement}>
            <SplitWords value={manifesto.text} wordClassName={styles.word} />
          </p>
          <ul role="list" className={styles.facts} data-facts>
            {manifesto.facts.map((fact) => (
              <li key={fact.kicker} className={styles.fact} data-fact>
                <span className={styles.kicker}>{fact.kicker}</span>
                <strong className={styles.value}>{fact.value}</strong>
                <span className={styles.text}>{fact.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
