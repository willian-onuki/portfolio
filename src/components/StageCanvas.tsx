'use client';

import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { supportsWebGL } from '@/lib/device';
import { stage } from '@/lib/stage';
import styles from './StageCanvas.module.css';

/** O chunk 3D (three + R3F) é baixado sob demanda, fora do bundle inicial. */
const Scene = dynamic(() => import('@/three/Scene'), { ssr: false, loading: () => null });

/** Erro no 3D (chunk que falhou, contexto perdido…): só o canvas sai; a página segue. */
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // aviso (não erro): a página segue completa, com a ilustração estática
    console.warn('[3D] cena desativada; usando a ilustração estática.', error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let webglSupport: boolean | null = null;
const noop = () => () => undefined;
/** WebGL disponível? (null no servidor e na hidratação). */
const useWebGLSupport = () =>
  useSyncExternalStore(
    noop,
    () => (webglSupport ??= supportsWebGL()),
    () => null,
  );

/**
 * Mede os marcos de rolagem que guiam a coreografia 3D (lib/stage.ts):
 * início do Hero, centro do Manifesto, início e fim da Stack. Só quando o
 * layout muda (ResizeObserver) — nunca por quadro.
 */
function useStageMarks() {
  useEffect(() => {
    const measure = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const box = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { top: rect.top + y, height: rect.height };
      };
      const hero = box('home');
      const manifesto = box('manifesto');
      const stack = box('stack');
      if (!hero || !manifesto || !stack) return;
      const m0 = hero.top;
      const m1 = Math.max(m0 + 1, manifesto.top + manifesto.height / 2 - vh / 2);
      const m2 = Math.max(m1 + 1, stack.top);
      const m3 = Math.max(m2 + 1, stack.top + stack.height - vh);
      stage.marks = [m0, m1, m2, m3];
      stage.viewportH = vh;
      stage.invalidate();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    void document.fonts?.ready.then(measure);
    window.addEventListener('load', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', measure);
    };
  }, []);
}

interface StageCanvasProps {
  /** Elemento que contém as seções sobre o 3D (Hero → Stack). */
  trackId: string;
  layerNames: readonly string[];
}

/**
 * Palco 3D fixo atrás do Hero, do Manifesto e da Stack.
 * - O chunk 3D é pedido quando o navegador fica ocioso (não disputa com o
 *   conteúdo principal); o canvas entra com fade quando o 1º quadro fica pronto.
 * - Pausa (frameloop "never") quando o trilho sai da tela ou a aba fica oculta.
 * - Sem WebGL: ilustração estática em SVG.
 */
export function StageCanvas({ trackId, layerNames }: StageCanvasProps) {
  const supported = useWebGLSupport();
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const active = inView && pageVisible;

  useStageMarks();

  useEffect(() => {
    if (!supported) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setLoad(true), { timeout: 900 });
    return () => cancel(id);
  }, [supported]);

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '10% 0px' });
    observer.observe(track);
    return () => observer.disconnect();
  }, [trackId]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setFailed(true), []);
  const showFallback = supported === false || failed;

  return (
    <div
      className={`stage ${styles.stage}${ready ? ` ${styles.ready}` : ''}${active ? '' : ` ${styles.paused}`}`}
      aria-hidden="true"
    >
      <div className={styles.backdrop} />
      {showFallback ? <StaticStack /> : null}
      {supported && load && !failed ? (
        <SceneBoundary onError={onError}>
          <Scene active={active} layerNames={layerNames} onReady={onReady} />
        </SceneBoundary>
      ) : null}
      <div className={styles.vignette} />
    </div>
  );
}

/** Ilustração estática (sem WebGL): as três camadas em perspectiva isométrica. */
function StaticStack() {
  const layer = (y: number, opacity: number) => (
    <g transform={`translate(0 ${y})`} opacity={opacity}>
      <path d="M200 40 L380 130 L200 220 L20 130 Z" fill="rgb(18 18 23 / 0.85)" stroke="rgb(238 236 231 / 0.45)" strokeWidth="1.5" />
      <path d="M20 130 L20 140 L200 230 L380 140 L380 130" fill="none" stroke="rgb(255 106 43 / 0.5)" strokeWidth="1.5" />
      <circle cx="140" cy="140" r="5" fill="#ff6a2b" />
      <circle cx="230" cy="110" r="5" fill="#ff6a2b" />
      <circle cx="280" cy="150" r="5" fill="#ff6a2b" />
    </g>
  );
  return (
    <svg className={styles.static} viewBox="0 0 400 460" role="presentation">
      {layer(220, 0.7)}
      {layer(110, 0.85)}
      {layer(0, 1)}
      <path d="M140 140v220M230 110v220M280 150v220" stroke="rgb(255 176 138 / 0.4)" strokeDasharray="3 6" />
    </svg>
  );
}
