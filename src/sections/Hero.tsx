'use client';

import { useRef, type MouseEvent } from 'react';
import type { Content } from '@/content/types';
import { site } from '@/config/site';
import { gsap, MOTION_OK } from '@/lib/gsap';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { useSmoothScroll } from '@/providers/smooth-scroll-context';
import { Icon } from '@/components/ui/Icon';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { SplitWords, countWords } from '@/components/ui/SplitWords';
import styles from './Hero.module.css';

export function Hero({ content }: { content: Content }) {
  const { hero, a11y } = content;
  const rootRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  // saída amarrada à rolagem (desktop): o texto sobe e esmaece enquanto a
  // stack recua para o manifesto
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom 15%', scrub: 0.5 } })
          .to('[data-hero-copy]', { yPercent: -12, opacity: 0, ease: 'none' }, 0)
          .to('[data-hero-meta]', { y: -30, opacity: 0, ease: 'none' }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    scrollTo(target);
  };

  // índice da 1ª palavra de cada linha: o atraso escalonado segue de uma linha para a outra
  const lines = hero.title.map((line, index) => ({
    line,
    start: hero.title.slice(0, index).reduce((total, previous) => total + countWords(previous), 0),
  }));

  return (
    <section id="home" ref={rootRef} className={styles.hero} data-align-top aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy} data-hero-copy>
          {site.availableForWork ? (
            <p className={`${styles.status} ${styles.fade}`} style={{ '--d': 0 }}>
              <span className={styles.pulse} aria-hidden="true" />
              {hero.status}
            </p>
          ) : null}
          <p className={`${styles.eyebrow} ${styles.fade}`} style={{ '--d': 1 }}>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {lines.map(({ line, start }, index) => (
              <span key={index} className={styles.line}>
                <SplitWords value={line} start={start} wordClassName={styles.word} maskClassName={styles.mask} />
              </span>
            ))}
          </h1>
          <p className={`${styles.lead} ${styles.rise}`} style={{ '--d': 4 }}>
            {hero.lead}
          </p>
          <div className={`${styles.actions} ${styles.fade}`} style={{ '--d': 5 }}>
            <MagneticLink className="btn btn--primary" href="#projects" onClick={(event) => go(event, '#projects')}>
              {hero.primaryCta}
              <Icon name="arrow-down" />
            </MagneticLink>
            <MagneticLink className="btn btn--ghost" href="#contact" onClick={(event) => go(event, '#contact')}>
              {hero.secondaryCta}
              <Icon name="arrow-right" />
            </MagneticLink>
          </div>
          <ul role="list" className={`${styles.links} ${styles.fade}`} style={{ '--d': 6 }}>
            <li>
              <ExternalLink className="link" href={site.github} newTabLabel={a11y.newTab}>
                <Icon name="github" />
                {hero.links.github}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="link" href={site.linkedin} newTabLabel={a11y.newTab}>
                <Icon name="linkedin" />
                {hero.links.linkedin}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="link" href={site.cv} newTabLabel={a11y.newTab}>
                <Icon name="file" />
                {hero.links.cv}
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className={styles.meta} data-hero-meta>
          <dl className={`${styles.facts} ${styles.fade}`} style={{ '--d': 7 }}>
            {hero.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <a className={`${styles.scroll} ${styles.fade}`} style={{ '--d': 8 }} href="#manifesto" onClick={(event) => go(event, '#manifesto')}>
            <span className={styles.scrollTrack} aria-hidden="true">
              <span />
            </span>
            {hero.scrollHint}
          </a>
        </div>

        <p className="sr-only">{a11y.sceneDescription}</p>
      </div>
    </section>
  );
}
