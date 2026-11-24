/**
 * Marca: três placas isométricas empilhadas — a mesma stack do 3D — com a de
 * cima acesa em brasa. Também é a base do favicon (app/icon.svg).
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 19.6 4.5 14 16 8.4 27.5 14 16 19.6Z" transform="translate(0 6)" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 19.6 4.5 14 16 8.4 27.5 14 16 19.6Z" transform="translate(0 1)" fill="none" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 19.6 4.5 14 16 8.4 27.5 14 16 19.6Z" transform="translate(0 -4)" fill="#ff6a2b" fillOpacity="0.18" stroke="#ff6a2b" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
