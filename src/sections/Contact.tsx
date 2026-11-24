'use client';

import { useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import type { Content, Intent } from '@/content/types';
import { mailto, site, whatsappLink } from '@/config/site';
import { fillTemplate } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { RichText } from '@/components/ui/RichText';
import { useSmoothScroll } from '@/providers/smooth-scroll-context';
import styles from './Contact.module.css';

type Channel = 'email' | 'whatsapp';

/**
 * Conversão: dois públicos (clientes e recrutadores), um compositor que monta
 * a mensagem e a abre no e-mail ou no WhatsApp (nada é enviado a servidor
 * nenhum) e os canais diretos.
 */
export function Contact({ content }: { content: Content }) {
  const { contact, a11y } = content;
  const { composer, channels, audiences } = contact;
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [intent, setIntent] = useState<Intent['id']>('web');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const focusComposer = (event: MouseEvent<HTMLAnchorElement>, next: Intent['id']) => {
    event.preventDefault();
    setIntent(next);
    if (formRef.current) scrollTo(formRef.current);
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 900);
  };

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = (submitter?.value as Channel | undefined) ?? 'email';
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const nextErrors = {
      name: name ? undefined : composer.errors.name,
      message: message ? undefined : composer.errors.message,
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.message) {
      event.currentTarget.querySelector<HTMLElement>(nextErrors.name ? '[name="name"]' : '[name="message"]')?.focus();
      return;
    }
    const intentLabel = composer.intents.find((item) => item.id === intent)?.label ?? '';
    const values = {
      intent: intentLabel,
      name,
      company: company ? fillTemplate(composer.companyFragment, { company }) : '',
      message,
    };
    const body = fillTemplate(composer.body, values);
    if (channel === 'whatsapp') {
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = mailto(fillTemplate(composer.subject, values), body);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = mailto();
    }
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <header className={styles.head} data-reveal>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="contact-title" className={styles.title}>
            <RichText value={contact.title} />
          </h2>
          <p className="section-lead">{contact.lead}</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.audiences}>
            <article className={styles.audience} data-reveal>
              <p className={styles.kicker}>{audiences.clients.kicker}</p>
              <h3>{audiences.clients.title}</h3>
              <p>{audiences.clients.text}</p>
              <div className={styles.audienceActions}>
                <MagneticLink className="btn btn--primary" href="#composer" onClick={(event) => focusComposer(event, 'web')}>
                  {audiences.clients.cta}
                  <Icon name="arrow-right" />
                </MagneticLink>
              </div>
            </article>

            <article className={styles.audience} data-reveal>
              <p className={styles.kicker}>{audiences.recruiters.kicker}</p>
              <h3>{audiences.recruiters.title}</h3>
              <p>{audiences.recruiters.text}</p>
              <div className={styles.audienceActions}>
                <ExternalLink className="btn btn--ghost" href={site.cv} newTabLabel={a11y.newTab}>
                  <Icon name="file" />
                  {audiences.recruiters.cv}
                </ExternalLink>
                <ExternalLink className="btn btn--ghost" href={site.linkedin} newTabLabel={a11y.newTab}>
                  <Icon name="linkedin" />
                  {audiences.recruiters.linkedin}
                </ExternalLink>
                <ExternalLink className="btn btn--ghost" href={site.github} newTabLabel={a11y.newTab}>
                  <Icon name="github" />
                  {audiences.recruiters.github}
                </ExternalLink>
              </div>
            </article>
          </div>

          <form id="composer" ref={formRef} className={styles.composer} onSubmit={send} noValidate aria-labelledby={`${formId}-title`} data-reveal>
            <h3 id={`${formId}-title`} className={styles.composerTitle}>
              {composer.title}
            </h3>

            <fieldset className={styles.intents}>
              <legend>{composer.intentLabel}</legend>
              <div className={styles.intentList}>
                {composer.intents.map((item) => (
                  <label key={item.id} className={styles.intent}>
                    <input type="radio" name="intent" value={item.id} checked={intent === item.id} onChange={() => setIntent(item.id)} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${formId}-name`}>{composer.nameLabel}</label>
                <input
                  ref={nameRef}
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={composer.namePlaceholder}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                  required
                />
                {errors.name ? (
                  <p id={`${formId}-name-error`} className={styles.error} role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label htmlFor={`${formId}-company`}>{composer.companyLabel}</label>
                <input id={`${formId}-company`} name="company" type="text" autoComplete="organization" placeholder={composer.companyPlaceholder} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-message`}>{composer.messageLabel}</label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={5}
                placeholder={composer.messagePlaceholder}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-hint`}
                required
              />
              {errors.message ? (
                <p id={`${formId}-message-error`} className={styles.error} role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className={styles.send}>
              <button type="submit" name="channel" value="email" className="btn btn--primary">
                <Icon name="mail" />
                {composer.sendEmail}
              </button>
              <button type="submit" name="channel" value="whatsapp" className="btn btn--ghost">
                <Icon name="whatsapp" />
                {composer.sendWhatsapp}
              </button>
            </div>
            <p id={`${formId}-hint`} className={styles.hint}>
              {composer.hint}
            </p>
          </form>
        </div>

        <div className={styles.channels} data-reveal>
          <h3 className={styles.channelsTitle}>{channels.title}</h3>
          <ul role="list" className={styles.channelList}>
            <li className={styles.channel}>
              <span className={styles.channelLabel}>{channels.email}</span>
              <div className={styles.emailRow}>
                <a className="link" href={mailto()}>
                  {site.email}
                </a>
                <button type="button" className={styles.copy} onClick={copyEmail} aria-live="polite">
                  <Icon name={copied ? 'check' : 'copy'} />
                  <span>{copied ? channels.copied : channels.copy}</span>
                </button>
              </div>
            </li>
            <li className={styles.channel}>
              <span className={styles.channelLabel}>{channels.whatsapp}</span>
              <ExternalLink className="link" href={whatsappLink()} newTabLabel={a11y.newTab}>
                {site.phoneDisplay}
                <Icon name="arrow-up-right" />
              </ExternalLink>
            </li>
            <li className={styles.channel}>
              <span className={styles.channelLabel}>{channels.linkedin}</span>
              <ExternalLink className="link" href={site.linkedin} newTabLabel={a11y.newTab}>
                /in/willian-onuki
                <Icon name="arrow-up-right" />
              </ExternalLink>
            </li>
            <li className={styles.channel}>
              <span className={styles.channelLabel}>{channels.github}</span>
              <ExternalLink className="link" href={site.github} newTabLabel={a11y.newTab}>
                @{site.githubUser}
                <Icon name="arrow-up-right" />
              </ExternalLink>
            </li>
            <li className={styles.channel}>
              <span className={styles.channelLabel}>{channels.location}</span>
              <span>
                {site.location.city}, {site.location.region} — {content.locale === 'pt' ? 'Brasil' : 'Brazil'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
