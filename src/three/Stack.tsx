'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  Shape,
  type Texture,
} from 'three';
import { stage } from '@/lib/stage';
import { createStudioEnvironment } from './environment';
import { createGlowTexture, createLayerTextures, PORTS } from './patterns';
import { poseAt, type Pose } from './poses';
import type { QualitySettings } from './quality';

/* Dimensões de cada camada (unidades do mundo) */
const W = 3.2;
const D = 2.1;
const T = 0.07;
const BEVEL = 0.014;
const RADIUS = 0.16;
const TOP = T / 2 + BEVEL;

const EMBER = new Color('#ff6a2b');
const LAYERS = 3;

const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Posição das portas no plano da camada (x, z). */
const PORT_XZ = PORTS.map((p) => [(p.u - 0.5) * W, (p.v - 0.5) * D] as const);

function createSlabGeometry(): ExtrudeGeometry {
  const shape = new Shape();
  const x = -W / 2;
  const y = -D / 2;
  const r = RADIUS;
  shape.moveTo(x + r, y);
  shape.lineTo(x + W - r, y);
  shape.absarc(x + W - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + W, y + D - r);
  shape.absarc(x + W - r, y + D - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + D);
  shape.absarc(x + r, y + D - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  const geometry = new ExtrudeGeometry(shape, {
    depth: T,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelSegments: 3,
    curveSegments: 10,
  });
  // extrusão ao longo de Y, centralizada
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -T / 2, 0);
  return geometry;
}

/**
 * Vidro escuro com reflexo do estúdio (scene.environment) e bordas laterais
 * que acendem em brasa (emissão extra via onBeforeCompile).
 */
function createGlassMaterial(clearcoat: boolean) {
  const params = {
    color: new Color('#0c0d11'),
    roughness: 0.12,
    metalness: 0,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    envMapIntensity: 1.6,
  };
  const material = clearcoat
    ? new MeshPhysicalMaterial({ ...params, clearcoat: 1, clearcoatRoughness: 0.08 })
    : new MeshStandardMaterial(params);
  const rim = { value: new Color(0, 0, 0) };
  // borda de "acrílico iluminado": só as laterais (normal do objeto na
  // horizontal) emitem — as faces de cima continuam vidro escuro
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRim = rim;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjNormal;')
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nvObjNormal = objectNormal;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRim;\nvarying vec3 vObjNormal;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float side = 1.0 - abs(normalize(vObjNormal).y);
        totalEmissiveRadiance += uRim * side * side;`,
      );
  };
  material.customProgramCacheKey = () => (clearcoat ? 'stack-glass-cc' : 'stack-glass');
  return { material, rim };
}

const PACKET_VERTEX = /* glsl */ `
  attribute vec2 aPort;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aDir;
  uniform float uTime;
  uniform float uHalf;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vFade;
  void main() {
    float t = fract(uTime * aSpeed + aPhase);
    float k = aDir > 0.0 ? t : 1.0 - t;
    float y = mix(-uHalf, uHalf, k);
    vFade = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.82, 1.0, t));
    vec4 mv = modelViewMatrix * vec4(aPort.x, y, aPort.y, 1.0);
    gl_PointSize = uSize * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const PACKET_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);
    float a = (glow * glow * 0.8 + core) * vFade * uOpacity;
    gl_FragColor = vec4(mix(uColor, vec3(1.0, 0.92, 0.86), core), a);
  }
`;

function createPackets(perPort: number) {
  const count = PORT_XZ.length * perPort;
  const geometry = new BufferGeometry();
  const port = new Float32Array(count * 2);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const dir = new Float32Array(count);
  // determinístico (sem Math.random): mesma coreografia a cada carga
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i += 1) {
    const p = PORT_XZ[i % PORT_XZ.length];
    port[i * 2] = p[0];
    port[i * 2 + 1] = p[1];
    phase[i] = rand();
    speed[i] = 0.16 + rand() * 0.14;
    dir[i] = i % 2 === 0 ? -1 : 1; // requisição desce, resposta sobe
  }
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute('aPort', new BufferAttribute(port, 2));
  geometry.setAttribute('aPhase', new BufferAttribute(phase, 1));
  geometry.setAttribute('aSpeed', new BufferAttribute(speed, 1));
  geometry.setAttribute('aDir', new BufferAttribute(dir, 1));
  const material = new ShaderMaterial({
    vertexShader: PACKET_VERTEX,
    fragmentShader: PACKET_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uHalf: { value: 0.5 },
      uSize: { value: 70 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
      uColor: { value: EMBER.clone() },
    },
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 60;
  return { points, material };
}

function createPillars() {
  const positions: number[] = [];
  for (const [x, z] of PORT_XZ) positions.push(x, -1, z, x, 1, z);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  const material = new LineBasicMaterial({
    color: new Color('#ffb08a'),
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    blending: AdditiveBlending,
    toneMapped: false,
  });
  const lines = new LineSegments(geometry, material);
  lines.renderOrder = 55;
  lines.frustumCulled = false;
  return { lines, material };
}

interface StackProps {
  quality: QualitySettings;
  layerNames: readonly string[];
  /** Shaders compilados: a cena pode começar a renderizar. */
  onCompiled: () => void;
  /** Primeiros quadros desenhados: o canvas pode aparecer. */
  onReady: () => void;
}

/** Cede a thread principal (o navegador processa entrada/pintura antes de seguir). */
const yieldToMain = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export function Stack({ quality, layerNames, onCompiled, onReady }: StackProps) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const [textures, setTextures] = useState<Texture[] | null>(null);

  const root = useRef<Group>(null);
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const layerRefs = useRef<Array<Group | null>>([]);

  // Preparação em etapas curtas, cedendo a thread principal entre elas (a
  // página continua respondendo): ambiente de reflexos → texturas das
  // camadas (quando a fonte mono chega) → compilação dos shaders.
  useEffect(() => {
    let alive = true;
    let env: Texture | null = null;
    void (async () => {
      await yieldToMain();
      if (!alive) return;
      env = createStudioEnvironment(gl);
      scene.environment = env;
      await yieldToMain();
      if (!alive) return;
      performance.mark('stage:textures-start');
      const list = await createLayerTextures(gl.capabilities.getMaxAnisotropy(), layerNames);
      performance.measure('stage:textures', 'stage:textures-start');
      if (alive) setTextures(list);
      else list.forEach((t) => t.dispose());
    })();
    return () => {
      alive = false;
      if (env) {
        scene.environment = null;
        env.dispose();
      }
    };
  }, [gl, scene, layerNames]);

  useEffect(() => () => textures?.forEach((t) => t.dispose()), [textures]);

  const slabGeometry = useMemo(() => createSlabGeometry(), []);
  const patternGeometry = useMemo(() => {
    const g = new PlaneGeometry(W - 0.04, D - 0.04);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const glass = useMemo(
    () => Array.from({ length: LAYERS }, () => createGlassMaterial(quality.clearcoat)),
    [quality.clearcoat],
  );
  const patternMaterials = useMemo(
    () =>
      Array.from(
        { length: LAYERS },
        () =>
          new MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            blending: AdditiveBlending,
            toneMapped: false,
            opacity: 0,
          }),
      ),
    [],
  );
  const packets = useMemo(() => createPackets(quality.packetsPerPort), [quality.packetsPerPort]);
  const pillars = useMemo(() => createPillars(), []);
  const glow = useMemo(() => {
    const texture = createGlowTexture();
    const material = new MeshBasicMaterial({
      map: texture,
      color: EMBER,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      toneMapped: false,
      opacity: 0,
    });
    const geometry = new PlaneGeometry(7.5, 5.2);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new Mesh(geometry, material);
    mesh.renderOrder = 1;
    return { mesh, material, texture, geometry };
  }, []);


  // limpeza de GPU
  useEffect(() => () => slabGeometry.dispose(), [slabGeometry]);
  useEffect(() => () => patternGeometry.dispose(), [patternGeometry]);
  useEffect(() => () => glass.forEach((g) => g.material.dispose()), [glass]);
  useEffect(() => () => patternMaterials.forEach((m) => m.dispose()), [patternMaterials]);
  useEffect(
    () => () => {
      packets.points.geometry.dispose();
      packets.material.dispose();
    },
    [packets],
  );
  useEffect(
    () => () => {
      pillars.lines.geometry.dispose();
      pillars.material.dispose();
    },
    [pillars],
  );
  useEffect(
    () => () => {
      glow.geometry.dispose();
      glow.material.dispose();
      glow.texture.dispose();
    },
    [glow],
  );

  // Texturas prontas: aplica nos materiais e compila TODOS os shaders em
  // paralelo (KHR_parallel_shader_compile) antes do primeiro quadro — a
  // cena só começa a renderizar depois disso (Scene.tsx), sem travadas.
  // "Pronto" (fade-in do canvas) sai 2 quadros depois.
  const readyFrames = useRef(-1);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!textures) return;
    patternMaterials.forEach((m, i) => {
      m.map = textures[i];
      m.needsUpdate = true;
    });
    let alive = true;
    performance.mark('stage:compile-start');
    void gl
      .compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (!alive) return;
        performance.measure('stage:compile', 'stage:compile-start');
        readyFrames.current = 0;
        onCompiled();
        invalidate();
      });
    return () => {
      alive = false;
    };
  }, [textures, patternMaterials, gl, scene, camera, onCompiled, invalidate]);

  // estado animado (sem React state)
  const motion = useRef({
    pose: null as Pose | null,
    target: { x: 0, y: 0, z: 0, scale: 1, pitch: 0, yaw: 0, spread: 0.5, dim: 1 } as Pose,
    px: 0,
    py: 0,
    intensity: [1, 1, 1],
    lift: [0, 0, 0],
    introStart: -1,
    time: 0,
  });

  useFrame((state, rawDelta) => {
    const m = motion.current;
    const dt = Math.min(rawDelta, 0.1);
    const reduced = stage.reducedMotion;
    if (!reduced) m.time += dt;
    const t = m.time;

    if (readyFrames.current >= 0 && readyFrames.current < 2) {
      readyFrames.current += 1;
      if (readyFrames.current === 2) {
        performance.mark('stage:ready');
        onReady();
      }
      // com frameloop "demand" (movimento reduzido) nada pediria o 2º quadro
      else state.invalidate();
    }
    if (!textures) return;
    if (m.introStart < 0) m.introStart = t;
    const intro = reduced ? 1 : clamp01((t - m.introStart) / 2.4);

    const { width, height } = state.viewport;
    const target = poseAt(stage.scrollY, stage.marks, width / 2, height / 2, m.target);
    if (!m.pose || reduced) m.pose = { ...target };
    const p = m.pose;
    const k = 5.5;
    p.x = damp(p.x, target.x, k, dt);
    p.y = damp(p.y, target.y, k, dt);
    p.z = damp(p.z, target.z, k, dt);
    p.scale = damp(p.scale, target.scale, k, dt);
    p.pitch = damp(p.pitch, target.pitch, k, dt);
    p.yaw = damp(p.yaw, target.yaw, k, dt);
    p.spread = damp(p.spread, target.spread, k, dt);
    p.dim = damp(p.dim, target.dim, k, dt);

    m.px = reduced ? 0 : damp(m.px, stage.pointer.x, 3, dt);
    m.py = reduced ? 0 : damp(m.py, stage.pointer.y, 3, dt);

    const introEase = easeOut(intro);
    // na entrada as camadas "pousam" de baixo para cima
    const spread = p.spread + (1 - introEase) * 0.9;

    const r = root.current;
    const tl = tilt.current;
    const sp = spin.current;
    if (!r || !tl || !sp) return;
    const float = reduced ? 0 : Math.sin(t * 0.6) * 0.05;
    r.position.set(p.x, p.y + float, p.z);
    r.scale.setScalar(p.scale);
    tl.rotation.x = p.pitch - m.py * 0.06;
    sp.rotation.y = p.yaw + (reduced ? 0 : Math.sin(t * 0.21) * 0.06) + m.px * 0.14;

    const active = stage.activeLayer;
    for (let i = 0; i < LAYERS; i += 1) {
      const layer = layerRefs.current[i];
      if (!layer) continue;
      const isActive = active === i;
      const focus = active < 0 ? 1 : isActive ? 1 : 0.22;
      m.intensity[i] = reduced ? focus : damp(m.intensity[i], focus, 4.5, dt);
      m.lift[i] = reduced ? (isActive ? 0.14 : 0) : damp(m.lift[i], isActive ? 0.14 : 0, 4.5, dt);
      // ordem de entrada: dados (2) → API (1) → interface (0)
      const appear = clamp01((intro - (LAYERS - 1 - i) * 0.16) / 0.55);
      const breathe = reduced ? 0 : Math.sin(t * 0.8 + i * 1.7) * 0.012;
      layer.position.y = (1 - i) * spread + m.lift[i] + breathe;

      const level = m.intensity[i] * p.dim * appear;
      patternMaterials[i].opacity = level;
      const g = glass[i];
      g.material.opacity = (0.22 + 0.3 * m.intensity[i]) * p.dim * appear;
      const rimStrength = (0.18 + (isActive ? 1.5 : 0.28) * m.intensity[i]) * p.dim * appear;
      g.rim.value.copy(EMBER).multiplyScalar(rimStrength);
    }

    const pm = packets.material.uniforms;
    pm.uTime.value = t;
    pm.uHalf.value = spread;
    pm.uSize.value = 64 * p.scale;
    pm.uPixelRatio.value = state.gl.getPixelRatio();
    pm.uOpacity.value = p.dim * clamp01((intro - 0.5) / 0.4);

    pillars.lines.scale.y = spread;
    pillars.material.opacity = 0.32 * p.dim * clamp01((intro - 0.35) / 0.4);

    glow.mesh.position.y = -spread - 0.35;
    glow.material.opacity = 0.34 * p.dim * introEase;
  });

  return (
    <group ref={root} visible={textures !== null}>
      <group ref={tilt}>
        <group ref={spin}>
          <primitive object={glow.mesh} />
          {Array.from({ length: LAYERS }, (_, i) => (
            <group
              key={i}
              ref={(el: Group | null) => {
                layerRefs.current[i] = el;
              }}
            >
              <mesh geometry={slabGeometry} material={glass[i].material} renderOrder={10 + (LAYERS - 1 - i) * 3} />
              <mesh
                geometry={patternGeometry}
                material={patternMaterials[i]}
                position-y={TOP + 0.002}
                renderOrder={11 + (LAYERS - 1 - i) * 3}
              />
            </group>
          ))}
          <primitive object={pillars.lines} />
          <primitive object={packets.points} />
        </group>
      </group>
    </group>
  );
}
