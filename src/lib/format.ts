/** Substitui {chaves} num modelo de texto (mensagens do formulário de contato). */
export const fillTemplate = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
