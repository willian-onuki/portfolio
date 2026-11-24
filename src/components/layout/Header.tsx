'use client';

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import type { Content, SectionId } from '@/content/types';
import { useSmoothScroll } from '@/providers/smooth-scroll-context';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';
import styles from './Header.module.css';

interface HeaderProps {
  content: Content;
}

/**
 * Header fixo: transparente no topo, vidro ao rolar, claro sobre a folha de
 * conteúdo. Destaca a seção visível (aria-current) com um indicador que
 * desliza. O menu mobile é irmão do <header> (o backdrop-filter do header
 * viraria o bloco de contenção de um filho position: fixed).
 */
export function Header({ content }: HeaderProps) {
  const { nav, a11y } = content;
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // "rolado" e "sobre a folha clara": leitura barata de scrollY em rAF;
  // a posição da folha é medida só quando o layout muda.
  useEffect(() => {
    let frame = 0;
    const sheet = { top: Infinity, bottom: -Infinity };
    const measure = () => {
      const el = document.querySelector<HTMLElement>('.content-sheet');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      sheet.top = rect.top + window.scrollY;
      sheet.bottom = rect.bottom + window.scrollY;
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const probe = y + 36;
      setOnLight(probe >= sheet.top && probe < sheet.bottom);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measure();
    update();
    const observer = new ResizeObserver(() => {
      measure();
      update();
    });
    observer.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // seção ativa sem cálculo de layout por rolagem
  useEffect(() => {
    const sections = nav.items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    const top = document.getElementById('home');
    const topObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(null);
    }, { rootMargin: '0px 0px -60% 0px' });
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [nav.items]);

  // indicador deslizante sob o item ativo
  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const link = active ? navEl.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!link) {
      navEl.style.setProperty('--ind-o', '0');
      return;
    }
    navEl.style.setProperty('--ind-x', `${link.offsetLeft}px`);
    navEl.style.setProperty('--ind-w', `${link.offsetWidth}px`);
    navEl.style.setProperty('--ind-o', '1');
  }, [active]);

  // menu mobile: Esc fecha, foco entra no menu e volta ao botão, rolagem travada
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('menu-open');
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <header
        className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ''}${menuOpen ? ` ${styles.open}` : ''}`}
        data-theme={onLight && !menuOpen ? 'light' : undefined}
      >
        <div className={`container ${styles.inner}`}>
          <a className={styles.brand} href="#home" onClick={(event) => onNavigate(event, 'home')} aria-label={a11y.home}>
            <LogoMark />
            <span className={styles.name} aria-hidden="true">
              Willian <span>Onuki</span>
            </span>
          </a>

          <nav ref={navRef} className={styles.nav} aria-label={a11y.nav}>
            <ul role="list">
              {nav.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={(event) => onNavigate(event, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <span className={styles.indicator} aria-hidden="true" />
          </nav>

          <div className={styles.actions}>
            <a className={styles.lang} href={nav.language.href} hrefLang={nav.language.hrefLang} lang={nav.language.hrefLang}>
              <span aria-hidden="true">{nav.language.short}</span>
              <span className="sr-only">{nav.language.label}</span>
            </a>
            <a className={`btn btn--primary btn--sm ${styles.cta}`} href="#contact" onClick={(event) => onNavigate(event, 'contact')}>
              {nav.cta}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
              <span className="sr-only">{menuOpen ? a11y.menuClose : a11y.menuOpen}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={styles.mobileMenu}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label={a11y.mobileNav}
      >
        <nav aria-label={a11y.mobileNav}>
          <ul role="list">
            {nav.items.map((item, index) => (
              <li key={item.id} style={{ '--i': index }}>
                <a href={`#${item.id}`} onClick={(event) => onNavigate(event, item.id)}>
                  <span className={styles.menuIndex}>0{index + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuFooter}>
          <a className="btn btn--primary btn--block" href="#contact" onClick={(event) => onNavigate(event, 'contact')}>
            {nav.cta}
            <Icon name="arrow-right" />
          </a>
          <a className={`btn btn--ghost btn--block`} href={nav.language.href} hrefLang={nav.language.hrefLang}>
            <Icon name="globe" />
            {nav.language.label}
          </a>
        </div>
      </div>
    </>
  );
}
