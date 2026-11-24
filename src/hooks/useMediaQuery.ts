'use client';

import { useCallback, useSyncExternalStore } from 'react';

/** Assina uma media query; no servidor devolve `serverFallback`. */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => serverFallback);
}

export const useReducedMotion = (): boolean => useMediaQuery('(prefers-reduced-motion: reduce)');
