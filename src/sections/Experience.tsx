import type { Content } from '@/content/types';
import { RichText } from '@/components/ui/RichText';
import styles from './Experience.module.css';

/** Trajetória profissional: linha do tempo com contexto, realizações e stack. */
export function Experience({ content }: { content: Content }) {
  const { experience } = content;
  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-title">
      <div className="container">
        <header className={styles.head} data-reveal>
          <p className="eyebrow">{experience.eyebrow}</p>
          <h2 id="experience-title" className="section-title">
            <RichText value={experience.title} />
          </h2>
          <p className="section-lead">{experience.lead}</p>
        </header>

        <ol role="list" className={styles.timeline}>
          {experience.items.map((job) => (
            <li key={`${job.company}-${job.start}`} className={styles.job} data-reveal>
              <div className={styles.when}>
                <p className={styles.period}>
                  <time dateTime={job.start}>{job.period.split(' — ')[0]}</time>
                  {' — '}
                  {job.end ? <time dateTime={job.end}>{job.period.split(' — ')[1]}</time> : <span>{job.period.split(' — ')[1]}</span>}
                </p>
                <div className={styles.badges}>
                  {job.current ? (
                    <span className={`${styles.badge} ${styles.current}`}>
                      <span aria-hidden="true" />
                      {experience.labels.current}
                    </span>
                  ) : null}
                  {job.freelance ? <span className={styles.badge}>{experience.labels.freelance}</span> : null}
                </div>
              </div>

              <div className={styles.body}>
                <h3 className={styles.company}>{job.company}</h3>
                <p className={styles.role}>{job.role}</p>
                <p className={styles.context}>{job.context}</p>
                <ul className={styles.highlights}>
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul role="list" className="chips" aria-label={`${experience.labels.stack} — ${job.company}`}>
                  {job.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
