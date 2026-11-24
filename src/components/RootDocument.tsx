import type { ReactNode } from 'react';
import type { Content } from '@/content/types';
import { fontVariables } from '@/lib/fonts';
import '@/styles/globals.css';

/**
 * Documento HTML de cada idioma (PT e EN têm root layouts próprios para que
 * o <html lang> já saia certo do servidor).
 * O script inline marca `.js` antes da primeira pintura: só então os
 * elementos com revelação no scroll começam ocultos.
 */
export function RootDocument({ content, children }: { content: Content; children: ReactNode }) {
  return (
    <html lang={content.htmlLang} className={fontVariables} suppressHydrationWarning>
      <body>
        {/* roda antes de pintar o conteúdo que vem depois dele */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
