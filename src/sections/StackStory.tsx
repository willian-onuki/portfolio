'use client';

import { useRef, useState } from 'react';
import type { Content } from '@/content/types';
import { ScrollTrigger } from '@/lib/gsap';
import { stage } from '@/lib/stage';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { RichText } from '@/components/ui/RichText';
import styles from './StackStory.module.css';

/**
 * "Do pixel ao banco": a stack 3D se abre e cada passo da rolagem destaca uma
 * camada (interface → API → dados), com as competências daquela camada.
 * A camada ativa vai para lib/stage.ts (lida pela cena a cada quadro).
 */
export function StackStory({ content }: { content: Content }) {
  const { stack } = content;
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    const set = (index: number) => {
      stage.activeLayer = index;
      stage.invalidate();
      setActive(index);
    };
    const triggers = steps.map((step, index) =>
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        end: 'bottom 62%',
        onToggle: (self) => {
          if (self.isActive) set(index);
          else if (index === 0 && self.direction < 0) set(-1);
          else if (index === steps.length - 1 && self.direction > 0) set(-1);
        },
      }),
    );
    return () => {
      triggers.forEach((t) => t.kill());
      stage.activeLayer = -1;
    };
  }, []);

  return (
    <section id="stack" ref={rootRef} className={styles.stack} aria-labelledby="stack-title">
      <div className="container">
        <header className={styles.head} data-reveal>
          <p className="eyebrow">{stack.eyebrow}</p>
          <h2 id="stack-title" className="section-title">
            <RichText value={stack.title} />
          </h2>
          <p className="section-lead">{stack.lead}</p>
        </header>

        <ol role="list" className={styles.steps}>
          {stack.layers.map((layer, index) => (
            <li key={layer.index} className={styles.step} data-step={index} data-active={active === index ? '' : undefined}>
              <article className={styles.card}>
                <p className={styles.index}>
                  <span>{layer.index}</span>
                  <span aria-hidden="true" className={styles.rule} />
                  <span>{layer.name}</span>
                </p>
                <h3 className={styles.title}>{layer.title}</h3>
                <p className={styles.text}>{layer.text}</p>
                <ul role="list" className="chips" aria-label={layer.name}>
                  {layer.tech.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        <aside className={styles.crosscut} data-reveal aria-labelledby="crosscut-title">
          <h3 id="crosscut-title" className={styles.crosscutTitle}>
            {stack.crosscut.title}
          </h3>
          <ul role="list" className={styles.crosscutList}>
            {stack.crosscut.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
