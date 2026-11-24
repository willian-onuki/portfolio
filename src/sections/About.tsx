import Image from 'next/image';
import type { Content } from '@/content/types';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { RichText } from '@/components/ui/RichText';
import portrait from '../../public/images/willian-onuki.jpg';
import styles from './About.module.css';

/** Sobre: retrato, trajetória, princípios de trabalho, formação e currículo. */
export function About({ content }: { content: Content }) {
  const { about, a11y } = content;
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.portrait} data-reveal>
          <div className={styles.frame}>
            <Image
              src={portrait}
              alt={about.photoAlt}
              sizes="(min-width: 900px) 360px, 70vw"
              quality={80}
              placeholder="blur"
              className={styles.photo}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>{site.fullName}</span>
            <span>
              {site.location.city}, {site.location.region}
            </span>
          </figcaption>
        </figure>

        <div className={styles.content}>
          <header className={styles.head} data-reveal>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 id="about-title" className="section-title">
              <RichText value={about.title} />
            </h2>
          </header>

          <div className={styles.paragraphs} data-reveal>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className={styles.facts} data-reveal>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.block} data-reveal>
            <h3 className={styles.blockTitle}>{about.principlesTitle}</h3>
            <ol role="list" className={styles.principles}>
              {about.principles.map((principle, index) => (
                <li key={principle.title}>
                  <span className={styles.principleIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.block} data-reveal>
            <h3 className={styles.blockTitle}>{about.educationTitle}</h3>
            <ul role="list" className={styles.education}>
              {about.education.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.org}</span>
                  <span className={styles.detail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <ExternalLink className="btn btn--primary" href={site.cv} newTabLabel={a11y.newTab}>
              <Icon name="file" />
              {about.cv}
              <Icon name="arrow-up-right" />
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
