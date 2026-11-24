import type { Metadata } from 'next';
import Link from 'next/link';
import { fontVariables } from '@/lib/fonts';
import { pt } from '@/content/pt';
import { en } from '@/content/en';
import { LogoMark } from '@/components/ui/Logo';
import '@/styles/globals.css';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: `404 — ${pt.notFound.title} · ${en.notFound.title}`,
  robots: { index: false, follow: true },
};

/** 404 para qualquer rota inexistente (PT e EN têm root layouts próprios). */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className={styles.body}>
        <main className={styles.main}>
          <LogoMark size={44} />
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>{pt.notFound.title}</h1>
          <p className={styles.text}>{pt.notFound.text}</p>
          <p className={styles.text} lang="en">
            {en.notFound.text}
          </p>
          <div className={styles.actions}>
            <Link className="btn btn--primary" href="/">
              {pt.notFound.cta}
            </Link>
            <Link className="btn btn--ghost" href="/en" hrefLang="en" lang="en">
              {en.notFound.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
