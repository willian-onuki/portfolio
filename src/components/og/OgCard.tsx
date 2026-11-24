import { ImageResponse } from 'next/og';
import type { Content } from '@/content/types';

export const ogSize = { width: 1200, height: 630 };

/** Imagem de compartilhamento (1200×630) gerada no build a partir do conteúdo. */
export function renderOgCard(content: Content) {
  const plate = (y: number, opacity: number, accent = false) => (
    <path
      d={`M200 ${40 + y} L370 ${125 + y} L200 ${210 + y} L30 ${125 + y} Z`}
      fill={accent ? 'rgba(255,106,43,0.16)' : 'rgba(18,18,23,0.9)'}
      stroke={accent ? '#ff6a2b' : `rgba(238,236,231,${opacity})`}
      strokeWidth={accent ? 3 : 2}
    />
  );
  const [line1, ...rest] = content.meta.ogTitle.split(' — ');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'radial-gradient(circle at 78% 45%, rgba(255,106,43,0.22), rgba(10,10,11,0) 45%), #0a0a0b',
          color: '#eeece7',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '62%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: '#a3a3a9' }}>
            <div style={{ width: 12, height: 12, background: '#ff6a2b', borderRadius: 3 }} />
            {content.meta.jobTitle}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{line1}</div>
            <div style={{ fontSize: 38, color: '#ff6a2b', lineHeight: 1.2 }}>{rest.join(' — ')}</div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#a3a3a9' }}>React · Next.js · React Native · Node.js · MySQL · PostgreSQL</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38%' }}>
          <svg width="400" height="460" viewBox="0 0 400 460">
            {plate(230, 0.4)}
            {plate(115, 0.7)}
            {plate(0, 1, true)}
            <path d="M150 140 V370 M240 110 V340 M290 150 V380" stroke="rgba(255,176,138,0.5)" strokeWidth="2" strokeDasharray="4 8" />
            <circle cx="150" cy="140" r="7" fill="#ff6a2b" />
            <circle cx="240" cy="110" r="7" fill="#ff6a2b" />
            <circle cx="290" cy="150" r="7" fill="#ff6a2b" />
          </svg>
        </div>
      </div>
    ),
    ogSize,
  );
}
