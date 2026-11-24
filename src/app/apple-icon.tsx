import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Ícone para a tela inicial do iOS (a mesma marca do favicon). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0b' }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M16 25.6 4.5 20 16 14.4 27.5 20Z" fill="none" stroke="#eeece7" strokeOpacity="0.45" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 20.6 4.5 15 16 9.4 27.5 15Z" fill="none" stroke="#eeece7" strokeOpacity="0.8" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 15.6 4.5 10 16 4.4 27.5 10Z" fill="#ff6a2b" fillOpacity="0.2" stroke="#ff6a2b" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
