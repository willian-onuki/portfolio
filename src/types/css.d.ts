import 'react';

declare module 'react' {
  /** Variáveis CSS customizadas em `style` (ex.: { '--i': 2 }). */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
