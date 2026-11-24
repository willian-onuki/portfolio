import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Cena 3D (React Three Fiber): objetos do three.js são mutados de forma
    // imperativa dentro do loop de quadros (useFrame) e de efeitos — o padrão
    // do R3F, fora do ciclo de render do React. A regra de imutabilidade do
    // React Compiler não modela esse loop, então fica desligada só aqui.
    files: ['src/three/**/*.{ts,tsx}'],
    rules: { 'react-hooks/immutability': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
