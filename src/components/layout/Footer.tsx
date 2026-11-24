import type { Content } from '@/content/types';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { LogoMark } from '@/components/ui/Logo';
import styles from './Footer.module.css';

export function Footer({ content }: { content: Content }) {
  const { footer, nav, a11y } = content;
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <LogoMark size={36} />
            <div>
              <p className={styles.name}>{site.name}</p>
              <p className={styles.tagline}>{footer.tagline}</p>
            </div>
          </div>
          <nav aria-label={a11y.nav}>
            <ul role="list" className={styles.links}>
              {nav.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul role="list" className={styles.social}>
            <li>
              <ExternalLink href={site.github} newTabLabel={a11y.newTab} aria-label="GitHub">
                <Icon name="github" />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.linkedin} newTabLabel={a11y.newTab} aria-label="LinkedIn">
                <Icon name="linkedin" />
              </ExternalLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} aria-label="E-mail">
                <Icon name="mail" />
              </a>
            </li>
          </ul>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          Willian Onuki
        </p>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <p>{footer.colophon}</p>
          <a className={styles.top_link} href="#home">
            {footer.backToTop}
            <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
