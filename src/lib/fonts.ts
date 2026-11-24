import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

/**
 * Fontes auto-hospedadas pelo next/font (sem requisição a terceiros em
 * produção, sem salto de layout graças ao fallback ajustado):
 *   Geist — títulos e texto · Geist Mono — rótulos técnicos e metadados ·
 *   Instrument Serif itálico — os trechos em destaque.
 */
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

export const fontVariables = `${geist.variable} ${geistMono.variable} ${instrument.variable}`;
