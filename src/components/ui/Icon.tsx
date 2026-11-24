import type { ReactNode, SVGProps } from 'react';

/**
 * Ícones em SVG inline (traço 1.6, grade 24 px) — sem biblioteca externa.
 * Decorativos por padrão (aria-hidden); o texto ao lado dá o significado.
 */
export type IconName =
  | 'arrow-right'
  | 'arrow-down'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'whatsapp'
  | 'file'
  | 'copy'
  | 'check'
  | 'menu'
  | 'close'
  | 'pin'
  | 'globe';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-down': <path {...stroke} d="M12 5v14M6 13l6 6 6-6" />,
  'arrow-up': <path {...stroke} d="M12 19V5M6 11l6-6 6 6" />,
  'arrow-up-right': <path {...stroke} d="M7 17 17 7M8 7h9v9" />,
  github: (
    <path
      fill="currentColor"
      d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.3-3.3-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M5.3 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM3.6 8.9h3.4v11.3H3.6V8.9Zm5.6 0h3.3v1.5h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3v6.3h-3.4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.2V8.9Z"
    />
  ),
  mail: (
    <>
      <rect {...stroke} x="3" y="5" width="18" height="14" rx="2.5" />
      <path {...stroke} d="m4 7 8 6 8-6" />
    </>
  ),
  whatsapp: (
    <path
      fill="currentColor"
      d="M12 2.3a9.6 9.6 0 0 0-8.3 14.5L2.4 21.6l4.9-1.3A9.6 9.6 0 1 0 12 2.3Zm0 17.6c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a8 8 0 1 1 6.7 3.6Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.3-.3Z"
    />
  ),
  file: (
    <>
      <path {...stroke} d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" />
      <path {...stroke} d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  copy: (
    <>
      <rect {...stroke} x="8" y="8" width="12" height="12" rx="2.5" />
      <path {...stroke} d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
    </>
  ),
  check: <path {...stroke} d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path {...stroke} d="M4 8h16M4 16h16" />,
  close: <path {...stroke} d="M6 6l12 12M18 6 6 18" />,
  pin: (
    <>
      <path {...stroke} d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle {...stroke} cx="12" cy="10" r="2.4" />
    </>
  ),
  globe: (
    <>
      <circle {...stroke} cx="12" cy="12" r="9" />
      <path {...stroke} d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
    </>
  ),
};

const arrowDirection: Partial<Record<IconName, string>> = {
  'arrow-right': 'right',
  'arrow-down': 'down',
  'arrow-up-right': 'up-right',
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" data-arrow={arrowDirection[name]} {...props}>
      {paths[name]}
    </svg>
  );
}
