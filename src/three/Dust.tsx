'use client';

import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three';
import { stage } from '@/lib/stage';

const VERTEX = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.12 + aSeed * 6.2831) * 0.22;
    p.x += cos(uTime * 0.09 + aSeed * 4.0) * 0.16;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (10.0 + aSeed * 16.0) * uPixelRatio / -mv.z;
    vAlpha = 0.12 + aSeed * 0.26;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(1.0, 0.92, 0.86, a);
  }
`;

/** Poeira de luz ao fundo: profundidade e um leve parallax com a rolagem. */
export function Dust({ count }: { count: number }) {
  const { points, material } = useMemo(() => {
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (rand() * 2 - 1) * 10;
      positions[i * 3 + 1] = (rand() * 2 - 1) * 7;
      positions[i * 3 + 2] = -8 + rand() * 10;
      seeds[i] = rand();
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    const mat = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
    });
    const pts = new Points(geometry, mat);
    pts.frustumCulled = false;
    pts.renderOrder = 0;
    return { points: pts, material: mat };
  }, [count]);

  useEffect(
    () => () => {
      points.geometry.dispose();
      material.dispose();
    },
    [points, material],
  );

  useFrame((state, delta) => {
    if (!stage.reducedMotion) material.uniforms.uTime.value += Math.min(delta, 0.1);
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    points.position.y = (stage.scrollY / Math.max(1, stage.viewportH)) * 0.8;
  });

  return <primitive object={points} />;
}
