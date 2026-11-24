/**
 * Estado compartilhado entre o DOM (rolagem, ponteiro, ScrollTriggers) e a
 * cena 3D. Objeto mutável simples — sem React state — para trocar dados a
 * cada quadro sem re-renderizações. A cena lê os valores dentro do useFrame.
 *
 * Este módulo NÃO importa three.js: fica no bundle inicial sem puxar o 3D.
 */
export interface StageState {
  /** Rolagem vertical (px), gravada no evento de scroll — o loop 3D não lê o layout. */
  scrollY: number;
  viewportH: number;
  /**
   * Marcos de rolagem (px, coordenadas do documento) medidos só quando o
   * layout muda: [início do Hero, centro do Manifesto, início da Stack, fim da Stack].
   * A cena interpola as poses-chave entre eles.
   */
  marks: [number, number, number, number];
  /** Camada destacada na seção Stack: 0 interface · 1 API · 2 dados · -1 nenhuma. */
  activeLayer: number;
  /** Ponteiro normalizado (-1..1) para parallax. */
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  /** Pede um novo quadro (frameloop "demand" com movimento reduzido). */
  invalidate: () => void;
}

export const stage: StageState = {
  scrollY: 0,
  viewportH: 800,
  marks: [0, 800, 1600, 3200],
  activeLayer: -1,
  pointer: { x: 0, y: 0 },
  reducedMotion: false,
  invalidate: () => undefined,
};
