/**
 * earthChoreography.ts
 * Coreografía del planeta 3D ligada al scroll con GSAP ScrollTrigger.
 *
 * - Cada sección define una "pose" del planeta (posición, escala, rotación, arcos, tarjetas, curva).
 * - Los 4 nodos están alrededor de Guadalajara: el planeta mira siempre a México y en cada
 *   sección de empresa se destaca SU tarjeta.
 * - La curva se pone en espejo según el lado de la pantalla para que su punta no quede tras el texto.
 * - Los tweens escriben en un objeto mutable (ref): no hay re-render de React por scroll.
 * - EarthScene lee ese objeto en cada frame y suaviza el movimiento (damping).
 */

import { useLayoutEffect, type MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { EarthTransformState } from './EarthScene';
import { hermosilloData } from '../../data/hermosilloData';

gsap.registerPlugin(ScrollTrigger);

type EarthPose = Omit<EarthTransformState, 'introProgress'>;

interface EarthStage {
  /** id del elemento del DOM que activa la pose */
  id: string;
  desktop: EarthPose;
  mobile: EarthPose;
  /** Fondo claro (sección editorial) */
  isLight?: boolean;
}

const DEG = Math.PI / 180;
const GUADALAJARA = { lat: 20.67, lng: -103.35 };

/**
 * rotationY que deja la longitud `lng` mirando a la cámara.
 * `shift` compensa que el planeta esté desplazado a un lado (la cara visible gira hacia el centro).
 */
const faceLng = (lng: number, shift = 0) => Math.PI / 2 - shift - (lng + 180) * DEG;

/** rotationX que deja la latitud un poco arriba del centro */
const tiltFor = (lat: number) => Math.min(Math.max(lat * DEG - 0.25, 0), 0.5);

// Compensación de giro según el lado de la pantalla (ver EarthScene: x relativo al ancho)
const SHIFT_RIGHT = 0.29;
const SHIFT_LEFT = -0.29;

// Curva: 1 = como el logo (punta a la izquierda), -1 = espejo (punta a la derecha)
const CURVE_LOGO = 1;
const CURVE_MIRROR = -1;

// x se mide relativo al ancho visible: -1 borde izquierdo, 0 centro, 1 borde derecho.
// ±0.55 centra el planeta en la mitad vacía de la pantalla (la otra mitad es texto).
const RIGHT_DESKTOP = { x: 0.55, y: 0, z: 0, scale: 0.9, curveMirror: CURVE_MIRROR };
const LEFT_DESKTOP = { x: -0.55, y: 0, z: 0, scale: 0.9, curveMirror: CURVE_LOGO };
const RIGHT_MOBILE = { x: 0.3, y: 0.4, z: -0.4, scale: 0.75, curveMirror: CURVE_MIRROR };
const LEFT_MOBILE = { x: -0.3, y: 0.4, z: -0.4, scale: 0.75, curveMirror: CURVE_LOGO };

/** Sin empresa destacada: todas las tarjetas iguales */
const NO_FOCUS = { focusIndex: 0, focusAmount: 0 };

const companies = hermosilloData.companies;

/** Pose de una sección de empresa: el planeta mira a su nodo y destaca su tarjeta */
function companyStage(index: number, side: 'left' | 'right'): EarthStage {
  const { lat, lng } = companies[index].markerPosition;
  const isRight = side === 'right';
  const shared = { rotationX: tiltFor(lat), connectionsOpacity: 0.35, focusIndex: index, focusAmount: 1, globeOpacity: 1 };
  return {
    id: `empresa-${companies[index].id}`,
    desktop: {
      ...(isRight ? RIGHT_DESKTOP : LEFT_DESKTOP),
      ...shared,
      rotationY: faceLng(lng, isRight ? SHIFT_RIGHT : SHIFT_LEFT),
      labelsOpacity: 1,
    },
    mobile: {
      ...(isRight ? RIGHT_MOBILE : LEFT_MOBILE),
      ...shared,
      rotationY: faceLng(lng),
      labelsOpacity: 0.9,
    },
  };
}

export const EARTH_STAGES: EarthStage[] = [
  {
    // Guadalajara al frente: la sede del grupo y sus 4 empresas
    id: 'inicio',
    desktop: {
      x: 0.44, y: 0, z: 0, scale: 0.95,
      rotationY: faceLng(GUADALAJARA.lng, 0.24), rotationX: tiltFor(GUADALAJARA.lat),
      connectionsOpacity: 0.2, labelsOpacity: 1, ...NO_FOCUS, curveMirror: CURVE_MIRROR,
      globeOpacity: 0, // oculto arriba: se ve el video completo
    },
    mobile: {
      x: 0, y: 0, z: 0, scale: 0.85,
      rotationY: faceLng(GUADALAJARA.lng), rotationX: tiltFor(GUADALAJARA.lat),
      connectionsOpacity: 0.2, labelsOpacity: 0, ...NO_FOCUS, curveMirror: CURVE_LOGO,
      globeOpacity: 0,
    },
  },
  {
    id: 'vision',
    desktop: {
      ...RIGHT_DESKTOP, x: 0.65,
      rotationY: faceLng(GUADALAJARA.lng, 0.34), rotationX: 0.2,
      connectionsOpacity: 0.35, labelsOpacity: 1, ...NO_FOCUS, globeOpacity: 1,
    },
    mobile: {
      ...RIGHT_MOBILE,
      rotationY: faceLng(GUADALAJARA.lng), rotationX: 0.2,
      connectionsOpacity: 0.35, labelsOpacity: 0, ...NO_FOCUS, globeOpacity: 1,
    },
  },
  companyStage(0, 'right'),
  companyStage(1, 'left'),
  companyStage(2, 'right'),
  companyStage(3, 'left'),
  {
    id: 'filosofia',
    isLight: true,
    // Pequeño y discreto, sin tarjetas
    // En escritorio a la derecha, en el espacio libre junto al título (no detrás del párrafo)
    desktop: {
      x: 0.62, y: 0.35, z: -1.6, scale: 0.5, rotationY: faceLng(GUADALAJARA.lng) - 0.6, rotationX: 0.15,
      connectionsOpacity: 0, labelsOpacity: 0, focusIndex: 3, focusAmount: 0, curveMirror: CURVE_LOGO, globeOpacity: 1,
    },
    mobile: {
      x: 0, y: 0.1, z: -2.8, scale: 0.35, rotationY: faceLng(GUADALAJARA.lng) - 0.6, rotationX: 0.15,
      connectionsOpacity: 0, labelsOpacity: 0, focusIndex: 3, focusAmount: 0, curveMirror: CURVE_LOGO, globeOpacity: 1,
    },
  },
  {
    id: 'conexion',
    // Acercamiento al Occidente de México: la red de las 4 empresas al centro, arcos encendidos
    desktop: {
      x: 0, y: 0, z: 0.4, scale: 1.5, rotationY: faceLng(GUADALAJARA.lng), rotationX: GUADALAJARA.lat * DEG,
      connectionsOpacity: 1, labelsOpacity: 1, ...NO_FOCUS, curveMirror: CURVE_LOGO, globeOpacity: 1,
    },
    mobile: {
      x: 0, y: 0, z: 0.4, scale: 1.1, rotationY: faceLng(GUADALAJARA.lng), rotationX: GUADALAJARA.lat * DEG,
      connectionsOpacity: 1, labelsOpacity: 0.9, ...NO_FOCUS, curveMirror: CURVE_LOGO, globeOpacity: 1,
    },
  },
  {
    // Guadalajara asomando bajo el formulario, tenue y sin tarjetas para no estorbar al texto
    id: 'contacto',
    desktop: {
      x: 0, y: -1.6, z: 0, scale: 0.95, rotationY: faceLng(GUADALAJARA.lng), rotationX: 0.15,
      connectionsOpacity: 0.3, labelsOpacity: 0, ...NO_FOCUS, curveMirror: CURVE_LOGO, globeOpacity: 0.6,
    },
    mobile: {
      x: 0, y: -1.2, z: 0, scale: 0.8, rotationY: faceLng(GUADALAJARA.lng), rotationX: 0.15,
      connectionsOpacity: 0.3, labelsOpacity: 0, ...NO_FOCUS, curveMirror: CURVE_LOGO, globeOpacity: 0.6,
    },
  },
];

/** Elige el ángulo equivalente (±2π) más cercano al de la sección anterior: el giro nunca da vueltas de más */
function unwrapRotations(poses: EarthPose[]): EarthPose[] {
  const out: EarthPose[] = [];
  poses.forEach((pose, i) => {
    if (i === 0) return out.push(pose);
    const prev = out[i - 1].rotationY;
    const turns = Math.round((prev - pose.rotationY) / (2 * Math.PI));
    out.push({ ...pose, rotationY: pose.rotationY + turns * 2 * Math.PI });
  });
  return out;
}

export const INITIAL_EARTH_STATE: EarthTransformState = { ...EARTH_STAGES[0].desktop, introProgress: 1 };

/**
 * Conecta el estado del planeta con el scroll.
 * Cada transición ocurre mientras la parte superior de la sección siguiente
 * sube del borde inferior de la pantalla hasta el 30% superior.
 */
export function useEarthChoreography(
  stateRef: MutableRefObject<EarthTransformState>,
  onLightModeChange: (isLight: boolean) => void
) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023.98px)' }, (ctx) => {
      const { isDesktop } = ctx.conditions as { isDesktop: boolean };
      const state = stateRef.current;
      const poses = unwrapRotations(EARTH_STAGES.map((s) => (isDesktop ? s.desktop : s.mobile)));

      gsap.set(state, poses[0]);

      for (let i = 1; i < EARTH_STAGES.length; i++) {
        const el = document.getElementById(EARTH_STAGES[i].id);
        if (!el) continue;

        gsap.fromTo(state, { ...poses[i - 1] }, {
          ...poses[i],
          ease: 'power2.inOut',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 30%',
            // scrub: true sigue el scroll exacto y respeta el orden al subir/bajar rápido.
            // La suavidad la pone EarthScene con damping en cada frame.
            scrub: true,
          },
        });
      }

      EARTH_STAGES.filter((s) => s.isLight).forEach((s) => {
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => onLightModeChange(self.isActive),
        });
      });
    });

    return () => mm.revert();
  }, [stateRef, onLightModeChange]);
}
