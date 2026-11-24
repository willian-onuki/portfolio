'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { initialQualityTier, isSoftwareRenderer, prefersReducedMotion } from '@/lib/device';
import { stage } from '@/lib/stage';
import { QUALITY, stepDown, type QualityTier } from './quality';
import { Stack } from './Stack';
import { Dust } from './Dust';

/** Degraus de resolução antes de trocar de nível (troca sem recompilar shaders). */
const DPR_STEPS = [1, 0.8, 0.66] as const;

/**
 * Monitor de FPS enxuto: depois do aquecimento, mede janelas de 90 quadros;
 * abaixo de ~42 fps pede um degrau a menos de qualidade.
 */
function FpsMonitor({ onDecline }: { onDecline: () => void }) {
  const acc = useRef({ warm: 0, frames: 0, sum: 0, declines: 0 });
  useFrame((_, delta) => {
    const a = acc.current;
    if (stage.reducedMotion || a.declines >= 4) return;
    a.warm += delta;
    if (a.warm < 3) return;
    if (delta > 0.25) return; // volta de pausa / aba oculta
    a.frames += 1;
    a.sum += delta;
    if (a.frames < 90) return;
    const avg = a.sum / a.frames;
    a.frames = 0;
    a.sum = 0;
    if (avg > 1 / 42) {
      a.declines += 1;
      a.warm = 1.5;
      onDecline();
    }
  });
  return null;
}

/** Liga o "invalidate" do R3F ao estado compartilhado (frameloop "demand"). */
function InvalidateBridge() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    stage.invalidate = () => invalidate();
    return () => {
      stage.invalidate = () => undefined;
    };
  }, [invalidate]);
  return null;
}

interface SceneProps {
  /** false = palco fora da tela ou aba oculta → renderização pausada. */
  active: boolean;
  layerNames: readonly string[];
  onReady: () => void;
}

/**
 * Raiz do 3D (chunk carregado sob demanda).
 * - DPR com teto por nível; o FPS real baixa primeiro a resolução, depois o nível.
 * - frameloop "never" fora da tela e até os shaders compilarem; "demand"
 *   com movimento reduzido (só redesenha quando a rolagem muda).
 * - Fundo transparente: o gradiente/grade do palco (CSS) aparece por trás.
 */
export default function Scene({ active, layerNames, onReady }: SceneProps) {
  const [tier, setTier] = useState<QualityTier>(initialQualityTier);
  const [dprStep, setDprStep] = useState(0);
  const [reduced] = useState(prefersReducedMotion);
  /** Só renderiza depois que os shaders compilaram (Stack.tsx). */
  const [compiled, setCompiled] = useState(false);
  const onCompiled = useCallback(() => setCompiled(true), []);
  const quality = QUALITY[tier];
  const deviceDpr = window.devicePixelRatio || 1;
  const dpr = Math.max(1, Math.min(deviceDpr, quality.maxDpr) * DPR_STEPS[dprStep]);

  useEffect(() => {
    stage.reducedMotion = reduced;
  }, [reduced]);

  const dprStepRef = useRef(0);
  const onDecline = useCallback(() => {
    if (dprStepRef.current < DPR_STEPS.length - 1) {
      dprStepRef.current += 1;
      setDprStep(dprStepRef.current);
    } else {
      setTier((current) => stepDown(current));
    }
  }, []);

  return (
    <Canvas
      frameloop={active && compiled ? (reduced ? 'demand' : 'always') : 'never'}
      dpr={dpr}
      gl={{ antialias: quality.antialias, alpha: true, stencil: false, powerPreference: 'high-performance' }}
      camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0, 11] }}
      onCreated={({ gl }) => {
        performance.mark('stage:renderer');
        gl.setClearColor(0x000000, 0);
        // Em produção, não esperar a compilação de cada shader para checar
        // erros (getShaderInfoLog é síncrono e trava a thread principal).
        gl.debug.checkShaderErrors = process.env.NODE_ENV !== 'production';
        // Sem GPU (renderização por software): direto para o nível baixo.
        if (isSoftwareRenderer(gl.getContext())) setTier('low');
      }}
      aria-hidden="true"
    >
      <InvalidateBridge />
      <Stack quality={quality} layerNames={layerNames} onCompiled={onCompiled} onReady={onReady} />
      {quality.dust > 0 ? <Dust count={quality.dust} /> : null}
      {reduced ? null : <FpsMonitor onDecline={onDecline} />}
    </Canvas>
  );
}
