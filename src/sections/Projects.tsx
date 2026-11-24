import type { Content } from '@/content/types';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { RichText } from '@/components/ui/RichText';
import { Schematic } from '@/components/Schematic';
import styles from './Projects.module.css';

/**
 * Projetos em destaque: cada card tem o diagrama da arquitetura real do
 * projeto (dados dos repositórios), problema/solução, destaques e stack.
 * Depois, o arquivo com os demais projetos públicos.
 */
export function Projects({ content }: { content: Content }) {
  const { projects, a11y, locale } = content;
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className="container">
        <header className={styles.head} data-reveal>
          <p className="eyebrow">{projects.eyebrow}</p>
          <h2 id="projects-title" className="section-title">
            <RichText value={projects.title} />
          </h2>
          <p className="section-lead">{projects.lead}</p>
        </header>

        <div className={styles.featured}>
          {projects.featured.map((project, index) => (
            <article key={project.id} className={styles.project} aria-labelledby={`project-${project.id}`} data-reveal>
              <figure className={styles.visual}>
                <div className={styles.visualTop}>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.visualLabel}>{projects.labels.architecture}</span>
                </div>
                <Schematic id={project.id} locale={locale} title={`${projects.labels.architecture} — ${project.name}`} description={project.diagramAlt} />
              </figure>

              <div className={styles.info}>
                <p className={styles.kind}>{project.kind}</p>
                <h3 id={`project-${project.id}`} className={styles.name}>
                  {project.name}
                </h3>
                <p className={styles.summary}>{project.summary}</p>

                <h4 className={styles.label}>{projects.labels.highlights}</h4>
                <ul className={styles.highlights}>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h4 className="sr-only">{projects.labels.stack}</h4>
                <ul role="list" className="chips">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className={styles.links}>
                  {project.links.map((link) => (
                    <ExternalLink
                      key={link.href}
                      href={link.href}
                      newTabLabel={a11y.newTab}
                      className={`btn btn--sm ${link.kind === 'demo' ? 'btn--primary' : 'btn--ghost'}`}
                    >
                      {link.kind === 'repo' ? <Icon name="github" /> : null}
                      {link.label}
                      <Icon name="arrow-up-right" />
                    </ExternalLink>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.archive} data-reveal>
          <h3 className={styles.archiveTitle}>{projects.archiveTitle}</h3>
          <ul role="list" className={styles.archiveList}>
            {projects.archive.map((item) => (
              <li key={item.name}>
                <ExternalLink className={styles.row} href={item.href} newTabLabel={a11y.newTab}>
                  <span className={styles.rowName}>{item.name}</span>
                  <span className={styles.rowText}>{item.text}</span>
                  <span className={styles.rowStack}>{item.stack.join(' · ')}</span>
                  <Icon name="arrow-up-right" className={styles.rowIcon} />
                </ExternalLink>
              </li>
            ))}
          </ul>
          <ExternalLink className={`link ${styles.viewAll}`} href={`${site.github}?tab=repositories`} newTabLabel={a11y.newTab}>
            <Icon name="github" />
            {projects.viewAll}
            <Icon name="arrow-up-right" />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
