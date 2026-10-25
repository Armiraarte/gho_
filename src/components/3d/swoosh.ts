/**
 * swoosh.ts
 * La "curva" del logotipo: una banda plana que envuelve al planeta en espiral,
 * con punta afilada al inicio, ancho máximo al frente y una cola larga que se adelgaza.
 */

import * as THREE from 'three';

export interface SwooshOptions {
  /** Radio de la órbita (unidades del mundo) */
  radius: number;
  /** Ancho máximo de la banda */
  maxWidth: number;
  /** Vueltas que da la banda (>1 hace que la cola pase por fuera de la punta, como en el logo) */
  turns?: number;
  /** Cuánto crece el radio al final de la espiral (0.1 = 10%) */
  growth?: number;
  /** Ángulo (rad) donde nace la punta */
  startAngle?: number;
  segments?: number;
}

/** Perfil del ancho a lo largo de la banda: sube rápido, pico cerca del 22% y cola larga */
const widthProfile = (t: number) => Math.pow(Math.sin(Math.PI * Math.pow(t, 0.55)), 1.6);

export function createSwooshGeometry({
  radius,
  maxWidth,
  turns = 1.08,
  growth = 0.1,
  startAngle = THREE.MathUtils.degToRad(200),
  segments = 400,
}: SwooshOptions): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = startAngle - t * turns * Math.PI * 2;
    const r = radius * (1 + growth * t);
    const halfWidth = (maxWidth * widthProfile(t)) / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    positions.push((r - halfWidth) * cos, 0, (r - halfWidth) * sin, (r + halfWidth) * cos, 0, (r + halfWidth) * sin);
    normals.push(0, 1, 0, 0, 1, 0);

    // La cola se apaga un poco hacia el final
    const shade = 1 - 0.45 * t;
    colors.push(shade, shade, shade, shade, shade, shade);

    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
}
