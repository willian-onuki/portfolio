'use client';

import { createContext, useContext } from 'react';

export interface SmoothScrollApi {
  /** Rola suavemente até um seletor/elemento, compensando o header fixo. */
  scrollTo: (target: string | HTMLElement, options?: { immediate?: boolean }) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: (target) => {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ block: 'start' });
  },
});

export const useSmoothScroll = (): SmoothScrollApi => useContext(SmoothScrollContext);
