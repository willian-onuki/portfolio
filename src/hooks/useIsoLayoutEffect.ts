import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect no navegador, useEffect no servidor. */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
