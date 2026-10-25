/**
 * EarthScene.tsx
 * ÚNICA ESCENA 3D PERSISTENTE PARA GRUPO HERMOSILLO DE OCCIDENTE
 *
 * - Un solo Canvas WebGL persistente en toda la experiencia (se crea una vez).
 * - Planeta con geografía real (ver earthTexture.ts) en paleta Platino.
 * - La "curva" del logotipo envolviendo al planeta (ver swoosh.ts).
 * - Movimiento ligado al scroll: GSAP escribe el estado en `stateRef`
 *   (ver earthChoreography.ts) y aquí se suaviza en cada frame.
 * - 4 nodos alrededor de Guadalajara, cada uno con una tarjeta (foto o icono)
 *   abierta en abanico y unida a su punto con una línea guía.
 */

import React, { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { hermosilloData, CompanyInfo } from '../../data/hermosilloData';
import { createEarthTextures } from './earthTexture';
import { createSwooshGeometry } from './swoosh';

export interface EarthTransformState {
  /** Horizontal relativo al ancho visible: -1 borde izquierdo, 0 centro, 1 borde derecho */
  x: number;
  /** Vertical y profundidad en unidades del mundo 3D */
  y: number;
  z: number;
  scale: number;
  rotationY: number;
  rotationX: number;
  connectionsOpacity: number;
  /** Visibilidad de las tarjetas sobre los puntos (0–1) */
  labelsOpacity: number;
  /** Índice de la empresa destacada (0–3); se interpola entre secciones */
  focusIndex: number;
  /** 0 = todas las tarjetas iguales, 1 = solo la destacada al 100% */
  focusAmount: number;
  /** Orientación de la curva: 1 = como el logo (punta a la izquierda), -1 = espejo */
  curveMirror: number;
  /** Opacidad de todo el planeta (0 = oculto: con la página arriba se ve el video del hero) */
  globeOpacity: number;
  introProgress: number; // 0 (oculto) a 1 (visible)
}

interface EarthSceneProps {
  /** Estado objetivo del planeta, lo escribe GSAP ScrollTrigger (ver earthChoreography.ts) */
  stateRef: MutableRefObject<EarthTransformState>;
  onSelectCompany?: (company: CompanyInfo) => void;
  hoveredCompanyId?: string | null;
}

const EARTH_RADIUS = 2.3;
const PLATINUM = 0xe5e4e2;
/** Elementos sobre los que un clic NO debe abrir una empresa del planeta */
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, label, [role="button"], [aria-modal="true"]';

// Convert lat/lng to 3D Cartesian coordinates on sphere
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/** Tarjeta de una empresa: su logotipo sobre la foto en blanco y negro, con su nombre */
const MarkerCard: React.FC<{ company: CompanyInfo }> = ({ company }) => (
  <div className="flex flex-col items-center">
    <div className="relative size-[72px] rounded-full p-[2px] bg-gradient-to-b from-white via-platinum-soft to-silver/40 shadow-[0_10px_30px_rgba(0,0,0,0.65),0_0_24px_rgba(229,228,226,0.2)]">
      <div className="relative size-full rounded-full overflow-hidden bg-ink border-2 border-ink">
        <img
          src={company.image}
          alt=""
          draggable={false}
          className="absolute inset-0 size-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <img
          src={company.logo}
          alt=""
          draggable={false}
          className="absolute inset-0 m-auto max-w-[72%] max-h-[56%] object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        />
      </div>
    </div>
    <div className="-mt-2.5 relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink border border-platinum/30 whitespace-nowrap shadow-lg shadow-black/60">
      <span className="font-mono text-[10px] text-silver">{company.number}</span>
      <span className="text-[11px] font-semibold tracking-tight text-platinum">{company.shortName}</span>
    </div>
  </div>
);

export const EarthScene: React.FC<EarthSceneProps> = ({ stateRef, onSelectCompany, hoveredCompanyId }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  // Props que cambian guardadas en refs: la escena WebGL se crea UNA sola vez
  // y nunca se reconstruye por un hover o un re-render del padre.
  const onSelectCompanyRef = useRef(onSelectCompany);
  onSelectCompanyRef.current = onSelectCompany;
  const hoveredCompanyIdRef = useRef(hoveredCompanyId);
  hoveredCompanyIdRef.current = hoveredCompanyId;

  const companies = hermosilloData.companies;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to balance performance
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Resolución: máximo 1.5x en pantallas retina (2x casi duplica el costo por cuadro).
    // Si el equipo no sostiene ~45 fps, baja sola hasta 1x (ver render loop).
    let pixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    container.prepend(renderer.domElement);

    // earthRoot: posición y escala (scroll). globe: rotación del planeta.
    // La curva cuelga de earthRoot: acompaña al planeta pero no gira con él.
    const earthRoot = new THREE.Group();
    scene.add(earthRoot);
    const globe = new THREE.Group();
    earthRoot.add(globe);
    const segments = isSoftwareGl ? 48 : 96;
    const disposables: { dispose: () => void }[] = [];

    // --- Planeta ---
    const texWidth = !isSoftwareGl && renderer.capabilities.maxTextureSize >= 4096 ? 4096 : 2048;
    const textures = createEarthTextures(texWidth);
    textures.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: textures.map,
      roughnessMap: textures.roughness,
      roughness: 1,
      metalness: 0.15,
      // El propio mapa como emisivo tenue: los continentes se leen también en el lado oscuro
      emissiveMap: textures.map,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.16,
    });
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, segments, segments);
    globe.add(new THREE.Mesh(earthGeometry, earthMaterial));
    disposables.push(earthGeometry, earthMaterial);

    // --- Atmósfera platino ---
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.88, 0.88, 0.86, 1.0) * intensity * 0.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereGeometry = new THREE.SphereGeometry(EARTH_RADIUS * 1.13, 64, 64);
    earthRoot.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
    disposables.push(atmosphereGeometry, atmosphereMaterial);

    // --- La curva del logotipo ---
    const curveMirror = new THREE.Group(); // espejo horizontal según el lado de la pantalla
    earthRoot.add(curveMirror);
    const swooshGeometry = createSwooshGeometry({ radius: EARTH_RADIUS * 1.16, maxWidth: EARTH_RADIUS * 0.2, growth: 0.07 });
    const swooshMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8b7b3,
      vertexColors: true,
      metalness: 0.55,
      roughness: 0.28,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(0x5e5d5a),
      emissiveIntensity: 0.3,
    });
    const swoosh = new THREE.Mesh(swooshGeometry, swooshMaterial);
    swoosh.rotation.order = 'ZXY'; // primero se inclina hacia la cámara, luego se pone en diagonal
    swoosh.rotation.x = 0.45;
    swoosh.rotation.z = 0.5;
    curveMirror.add(swoosh);
    disposables.push(swooshGeometry, swooshMaterial);

    // --- Nodos de las 4 empresas ---
    const beacons: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>[] = [];
    const pulses: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>[] = [];
    const anchors: THREE.Object3D[] = [];
    const ringGeo = new THREE.RingGeometry(0.018, 0.028, 32);
    const pulseGeo = new THREE.RingGeometry(0.028, 0.033, 48);
    const beaconGeo = new THREE.SphereGeometry(0.02, 16, 16);
    beaconGeo.translate(0, 0, 0.035);
    disposables.push(ringGeo, pulseGeo, beaconGeo);

    companies.forEach((company) => {
      const pos = latLongToVector3(company.markerPosition.lat, company.markerPosition.lng, EARTH_RADIUS * 1.003);
      const pinHolder = new THREE.Group();
      pinHolder.position.copy(pos);
      pinHolder.lookAt(pos.clone().multiplyScalar(2));

      const accent = new THREE.Color(company.accentColor);

      const ringMat = new THREE.MeshBasicMaterial({ color: accent, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
      pinHolder.add(new THREE.Mesh(ringGeo, ringMat));

      // Onda que se expande y desvanece
      const pulseMat = new THREE.MeshBasicMaterial({ color: accent, side: THREE.DoubleSide, transparent: true, opacity: 0 });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pinHolder.add(pulse);
      pulses.push(pulse);

      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: accent,
        emissiveIntensity: 0.9,
        metalness: 0.6,
        roughness: 0.2,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.userData = { company };
      pinHolder.add(beacon);
      beacons.push(beacon);

      // Punto de anclaje de la línea guía: el propio nodo
      const anchor = new THREE.Object3D();
      anchor.position.set(0, 0, 0.035);
      pinHolder.add(anchor);
      anchors.push(anchor);

      disposables.push(ringMat, pulseMat, beaconMat);
      globe.add(pinHolder);
    });

    // --- Arcos de conexión entre empresas ---
    const arcMaterials: THREE.LineBasicMaterial[] = [];
    for (let i = 0; i < companies.length; i++) {
      for (let j = i + 1; j < companies.length; j++) {
        const start = latLongToVector3(companies[i].markerPosition.lat, companies[i].markerPosition.lng, EARTH_RADIUS * 1.004);
        const end = latLongToVector3(companies[j].markerPosition.lat, companies[j].markerPosition.lng, EARTH_RADIUS * 1.004);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dist = start.distanceTo(end);
        mid.normalize().multiplyScalar(EARTH_RADIUS * (1.012 + Math.min(dist * 0.35, 0.3)));
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
        const mat = new THREE.LineBasicMaterial({ color: PLATINUM, transparent: true, opacity: 0 });
        arcMaterials.push(mat);
        disposables.push(geo, mat);
        globe.add(new THREE.Line(geo, mat));
      }
    }

    // --- Iluminación de estudio ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 2.5, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xdedcd7, 1.1);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);
    scene.add(new THREE.HemisphereLight(0xcfcdc8, 0x0a0a0b, 0.55));

    // --- Encuadre responsivo ---
    // x de las poses se mide en mitades del ancho visible; en escritorio estrecho (< 16:10)
    // el planeta se reduce para no invadir el texto.
    let viewHalfWidth = 1;
    let viewFit = 1;
    let isMobileView = false;
    let baseOpacity = 1;
    const updateFraming = () => {
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      viewHalfWidth = halfHeight * camera.aspect;
      isMobileView = window.innerWidth < 1024;
      viewFit = isMobileView ? 1 : THREE.MathUtils.clamp(camera.aspect / 1.6, 0.72, 1);
      // En móvil el planeta queda detrás del texto: atenuarlo para no restar legibilidad
      baseOpacity = isMobileView ? 0.6 : 1;
    };
    updateFraming();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateFraming();
    };
    window.addEventListener('resize', handleResize);

    // --- Interacción ---
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let pointerHoverIndex = -1;
    let globeAlpha = 0; // opacidad actual del planeta (suavizada)
    // Caja de cada tarjeta en pantalla, calculada en el render loop (sin leer el DOM al mover el mouse)
    const cardBoxes = companies.map(() => ({ visible: false, cx: 0, cy: 0, hw: 0, hh: 0 }));
    const cardSizes = companies.map(() => ({ w: 0, h: 0 }));

    /** Índice de la tarjeta visible bajo el cursor, o -1 */
    const cardAt = (clientX: number, clientY: number) => {
      for (let i = 0; i < cardBoxes.length; i++) {
        const b = cardBoxes[i];
        if (b.visible && Math.abs(clientX - b.cx) <= b.hw && Math.abs(clientY - b.cy) <= b.hh) return i;
      }
      return -1;
    };

    // Escribir estilos solo cuando cambian (evita trabajo de estilo/pintado en cada cuadro)
    const lastStyle = new Map<object, Record<string, string>>();
    const setStyle = (el: HTMLElement, prop: 'visibility' | 'opacity' | 'zIndex' | 'transform', value: string) => {
      let cache = lastStyle.get(el);
      if (!cache) lastStyle.set(el, (cache = {}));
      if (cache[prop] === value) return;
      cache[prop] = value;
      el.style[prop] = value;
    };
    const setAttr = (el: SVGElement, name: string, value: string) => {
      let cache = lastStyle.get(el);
      if (!cache) lastStyle.set(el, (cache = {}));
      if (cache[name] === value) return;
      cache[name] = value;
      el.setAttribute(name, value);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      const overInteractive = (e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR);
      const idx = overInteractive ? -1 : cardAt(e.clientX, e.clientY);
      if (idx !== pointerHoverIndex) {
        pointerHoverIndex = idx;
        document.body.style.cursor = idx >= 0 ? 'pointer' : '';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = (e: MouseEvent) => {
      const onSelect = onSelectCompanyRef.current;
      if (!onSelect) return;
      if ((e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR)) return;
      if (globeAlpha < 0.5) return; // planeta oculto: no hay nada que seleccionar

      const idx = cardAt(e.clientX, e.clientY);
      if (idx >= 0) {
        onSelect(companies[idx]);
        return;
      }

      const pointer = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(beacons, false)[0];
      if (hit?.object.userData?.company) onSelect(hit.object.userData.company);
    };
    window.addEventListener('click', handleClick);

    // --- Render loop ---
    const timer = new THREE.Timer();
    timer.connect(document); // pausa el tiempo con la pestaña oculta
    const tmp = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const screen = companies.map(() => ({ x: 0, y: 0, facing: 0 }));
    let labelsAlpha = 0;
    let frameId = 0;
    let perfFrames = 0;
    let perfTime = 0;

    const animate = (timestamp?: number) => {
      timer.update(timestamp);
      // Limitar delta: al volver de otra pestaña no debe "teletransportarse"
      const delta = Math.min(timer.getDelta(), 0.1);
      const elapsed = timer.getElapsed();

      // Calidad adaptativa: si el promedio baja de ~45 fps, reducir resolución (sin pasar de 1x)
      if (elapsed > 3 && pixelRatio > 1 && !document.hidden) {
        perfFrames++;
        perfTime += delta;
        if (perfFrames >= 90) {
          if (perfTime / perfFrames > 1 / 45) {
            pixelRatio = Math.max(1, pixelRatio - 0.25);
            renderer.setPixelRatio(pixelRatio);
          }
          perfFrames = 0;
          perfTime = 0;
        }
      }
      const target = stateRef.current;
      const hoveredId = hoveredCompanyIdRef.current;

      // Posición, escala y rotación suavizadas hacia el estado de GSAP
      earthRoot.position.x = THREE.MathUtils.damp(earthRoot.position.x, target.x * viewHalfWidth, 3.5, delta);
      earthRoot.position.y = THREE.MathUtils.damp(earthRoot.position.y, target.y, 3.5, delta);
      earthRoot.position.z = THREE.MathUtils.damp(earthRoot.position.z, target.z, 3.5, delta);
      const scale = THREE.MathUtils.damp(earthRoot.scale.x, target.scale * viewFit, 3.5, delta);
      earthRoot.scale.setScalar(scale);
      globe.rotation.x = THREE.MathUtils.damp(globe.rotation.x, target.rotationX, 3.0, delta);
      globe.rotation.y = THREE.MathUtils.damp(globe.rotation.y, target.rotationY, 3.0, delta);

      // Curva: gira en espejo al cambiar de lado y "respira" suavemente
      let mirror = THREE.MathUtils.damp(curveMirror.scale.x, target.curveMirror, 3.0, delta);
      if (Math.abs(mirror) < 0.02) mirror = mirror < 0 ? -0.02 : 0.02; // evita una escala 0 degenerada
      curveMirror.scale.x = mirror;
      swoosh.rotation.y = Math.sin(elapsed * 0.35) * 0.06;

      arcMaterials.forEach((mat) => {
        mat.opacity = THREE.MathUtils.damp(mat.opacity, target.connectionsOpacity * 0.6, 3.0, delta);
      });

      // Énfasis por empresa: 1 = destacada, baja según la distancia al índice enfocado
      const emphasis = companies.map(
        (_, i) => 1 - target.focusAmount * Math.min(1, Math.abs(target.focusIndex - i))
      );

      // Nodos: brillo según énfasis/hover y onda de pulso
      beacons.forEach((beacon, i) => {
        const isHovered = beacon.userData.company.id === hoveredId || i === pointerHoverIndex;
        const targetIntensity = isHovered ? 2.4 : 0.6 + emphasis[i] * 0.8 + target.connectionsOpacity * 0.4;
        beacon.material.emissiveIntensity = THREE.MathUtils.damp(beacon.material.emissiveIntensity, targetIntensity, 5.0, delta);

        const phase = (elapsed * 0.45 + i * 0.25) % 1;
        pulses[i].scale.setScalar(1 + phase * 2.2);
        pulses[i].material.opacity = (1 - phase) * 0.5 * (0.4 + 0.6 * emphasis[i]);
      });

      // Parallax suave de cámara con el cursor
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouse.x * 0.15, 2.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, mouse.y * 0.12, 2.0, delta);
      camera.lookAt(0, 0, 0);

      keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, 2.5 * target.introProgress, 3.0, delta);
      rimLight.intensity = THREE.MathUtils.damp(rimLight.intensity, 1.1 * target.introProgress, 3.0, delta);

      // Aparición del planeta: oculto con la página arriba (se ve el video), visible al desplazarse
      globeAlpha = THREE.MathUtils.damp(globeAlpha, target.globeOpacity, 5.0, delta);
      setStyle(container, 'opacity', (globeAlpha * baseOpacity).toFixed(3));
      if (globeAlpha < 0.005) {
        // Oculto: no gastar GPU dibujándolo
        cardBoxes.forEach((b) => (b.visible = false));
        frameId = requestAnimationFrame(animate);
        return;
      }

      renderer.render(scene, camera);

      // --- Tarjetas: proyectar los nodos a pantalla y abrirlas en abanico ---
      labelsAlpha = THREE.MathUtils.damp(labelsAlpha, target.labelsOpacity, 4.0, delta);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const sizeFactor = THREE.MathUtils.clamp(scale / 0.9, 0.8, 1.1) * (isMobileView ? 0.85 : 1);

      let cx = 0;
      let cy = 0;
      anchors.forEach((anchor, i) => {
        anchor.getWorldPosition(tmp);
        normal.copy(tmp).sub(earthRoot.position).normalize();
        toCamera.copy(camera.position).sub(tmp).normalize();
        screen[i].facing = normal.dot(toCamera); // 1 = de frente, 0 = en el borde, <0 = detrás
        tmp.project(camera);
        screen[i].x = (tmp.x * 0.5 + 0.5) * w;
        screen[i].y = (-tmp.y * 0.5 + 0.5) * h;
        cx += screen[i].x / anchors.length;
        cy += screen[i].y / anchors.length;
      });

      anchors.forEach((_, i) => {
        const el = labelRefs.current[i];
        const card = cardRefs.current[i];
        const line = lineRefs.current[i];
        if (!el || !card || !line) return;

        const front = THREE.MathUtils.smoothstep(screen[i].facing, 0.2, 0.5) * labelsAlpha;
        const box = cardBoxes[i];
        box.visible = front >= 0.5 && globeAlpha > 0.5;
        if (front < 0.01) {
          setStyle(el, 'visibility', 'hidden');
          return;
        }

        // Dirección del abanico: del centro del grupo hacia el nodo
        let dx = screen[i].x - cx;
        let dy = screen[i].y - cy;
        const len = Math.hypot(dx, dy);
        if (len < 2) {
          dx = 0;
          dy = -1;
        } else {
          dx /= len;
          dy /= len;
        }
        const reach = (95 + 45 * Math.abs(dx)) * sizeFactor;
        const ox = dx * reach;
        const oy = dy * reach;

        const isHovered = companies[i].id === hoveredId || i === pointerHoverIndex;
        const opacity = isHovered ? labelsAlpha : front * (0.3 + 0.7 * emphasis[i]);
        const s = sizeFactor * (0.82 + 0.18 * emphasis[i]) * (isHovered ? 1.1 : 1);

        setStyle(el, 'visibility', 'visible');
        setStyle(el, 'opacity', opacity.toFixed(2));
        setStyle(el, 'zIndex', String(Math.round(emphasis[i] * 10) + (isHovered ? 20 : 0)));
        setStyle(el, 'transform', `translate3d(${screen[i].x.toFixed(1)}px, ${screen[i].y.toFixed(1)}px, 0)`);
        setAttr(line, 'x2', ox.toFixed(1));
        setAttr(line, 'y2', oy.toFixed(1));
        setStyle(card, 'transform', `translate(${ox.toFixed(1)}px, ${oy.toFixed(1)}px) translate(-50%, -50%) scale(${s.toFixed(3)})`);

        // Tamaño base de la tarjeta (se mide una sola vez) para el hit-test del mouse
        const size = cardSizes[i];
        if (size.w === 0) {
          size.w = card.offsetWidth;
          size.h = card.offsetHeight;
        }
        box.cx = screen[i].x + ox;
        box.cy = screen[i].y + oy;
        box.hw = (size.w * s) / 2;
        box.hh = (size.h * s) / 2;
      });

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      timer.dispose();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = '';

      textures.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [stateRef, companies]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {companies.map((company, i) => (
        <div
          key={company.id}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
          style={{ visibility: 'hidden', opacity: 0 }}
        >
          {/* Línea guía del nodo a la tarjeta */}
          <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1">
            <line
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="rgba(229, 228, 226, 0.55)"
              strokeWidth="1"
            />
          </svg>
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
          >
            <MarkerCard company={company} />
          </div>
        </div>
      ))}
    </div>
  );
};
