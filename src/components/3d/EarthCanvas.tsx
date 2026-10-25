/**
 * EarthCanvas.tsx
 * High-Fidelity Procedural 3D Earth for TERRA GROUP
 * Implements realistic atmosphere, continents texture, city glow nodes,
 * connecting orbital arcs, company pins, and smooth camera transitions.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Company, corporateData } from '../../data/corporateData';

interface EarthCanvasProps {
  mode: 'intro' | 'hero' | 'universe' | 'contact';
  selectedCompanyId?: string;
  onSelectCompany?: (company: Company) => void;
  introProgress?: number; // 0 to 1
  autoRotateSpeed?: number;
  className?: string;
}

// Helper to convert lat/lng to 3D Cartesian coordinates
export function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate high-resolution procedural Earth texture
function createProceduralEarthTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep oceanic base gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#030814');
  oceanGrad.addColorStop(0.3, '#07152b');
  oceanGrad.addColorStop(0.5, '#0a1a38');
  oceanGrad.addColorStop(0.7, '#07152b');
  oceanGrad.addColorStop(1, '#030814');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle latitude navigation grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw stylized, realistic continents using simplified spherical polygon approximations
  ctx.fillStyle = '#112238'; // Dark landmass
  ctx.strokeStyle = '#1e3a5f';
  ctx.lineWidth = 2;

  // Function to project lat/lon to texture canvas
  const toX = (lon: number) => ((lon + 180) / 360) * width;
  const toY = (lat: number) => ((90 - lat) / 180) * height;

  const drawContinent = (points: [number, number][], fillColor = '#0f243d') => {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    points.forEach(([lat, lon], idx) => {
      const x = toX(lon);
      const y = toY(lat);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // North America
  drawContinent([
    [70, -165], [72, -130], [60, -70], [45, -55], [30, -80],
    [25, -80], [18, -95], [15, -90], [10, -75], [15, -100],
    [22, -105], [32, -117], [48, -125], [58, -140], [65, -168]
  ], '#152c48');

  // South America
  drawContinent([
    [12, -72], [10, -60], [-5, -35], [-22, -41], [-35, -55],
    [-55, -68], [-52, -75], [-20, -70], [-5, -80], [8, -78]
  ], '#132842');

  // Europe
  drawContinent([
    [70, 25], [60, 30], [55, 40], [45, 30], [36, -5],
    [43, -9], [48, -5], [54, 8], [60, 5], [70, 20]
  ], '#173352');

  // Africa
  drawContinent([
    [35, -5], [37, 10], [32, 32], [12, 51], [5, 48],
    [-10, 40], [-25, 32], [-34, 18], [-22, 14], [5, 10],
    [5, -2], [15, -17], [28, -13]
  ], '#132a45');

  // Asia
  drawContinent([
    [75, 100], [70, 170], [60, 160], [40, 130], [22, 115],
    [10, 105], [8, 77], [25, 60], [40, 50], [55, 60],
    [65, 80]
  ], '#152d4b');

  // Australia & Oceania
  drawContinent([
    [-12, 130], [-15, 145], [-25, 153], [-38, 145],
    [-35, 115], [-22, 114], [-15, 125]
  ], '#12263f');

  // Antarctica
  drawContinent([
    [-70, -180], [-65, -90], [-68, 0], [-65, 90], [-70, 180],
    [-89, 180], [-89, -180]
  ], '#1e3857');

  // Add subtle terrain elevation dots and night-side city glow nodes
  ctx.fillStyle = '#38bdf8';
  corporateData.companies.forEach((comp) => {
    const cx = toX(comp.coordinates.lng);
    const cy = toY(comp.coordinates.lat);
    // Radial glow for company locations
    const radGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 14);
    radGlow.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
    radGlow.addColorStop(0.4, 'rgba(56, 189, 248, 0.3)');
    radGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = radGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();

    // Central core dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  const mapTexture = new THREE.CanvasTexture(canvas);
  mapTexture.colorSpace = THREE.SRGBColorSpace;
  mapTexture.wrapS = THREE.RepeatWrapping;
  mapTexture.wrapT = THREE.ClampToEdgeWrapping;

  // Bump map
  const bumpTexture = new THREE.CanvasTexture(canvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  return { map: mapTexture, bump: bumpTexture };
}

export const EarthCanvas: React.FC<EarthCanvasProps> = ({
  mode,
  selectedCompanyId,
  onSelectCompany,
  introProgress = 1,
  autoRotateSpeed = 0.0015,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number>(0);

  // Focus Earth toward specific coordinates smoothly
  const focusOnCoordinates = useCallback((lat: number, lng: number) => {
    if (!earthGroupRef.current) return;
    // Calculate required Y and X rotation so that the pin faces camera (Z positive)
    const targetY = -((lng + 90) * Math.PI) / 180;
    const targetX = (lat * Math.PI) / 180 * 0.5;
    targetRotationRef.current = { x: targetX, y: targetY };
  }, []);

  // Update target coordinates when selectedCompanyId changes
  useEffect(() => {
    if (selectedCompanyId) {
      const comp = corporateData.companies.find((c) => c.id === selectedCompanyId);
      if (comp) {
        focusOnCoordinates(comp.coordinates.lat, comp.coordinates.lng);
      }
    }
  }, [selectedCompanyId, focusOnCoordinates]);

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

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Initial camera position according to mode
    if (mode === 'intro') {
      camera.position.set(0, 0, 16);
    } else if (mode === 'hero') {
      camera.position.set(1.5, 0.3, 7.5);
    } else if (mode === 'universe') {
      camera.position.set(0, 0, 6.2);
    } else {
      camera.position.set(0, -0.4, 6.8);
    }
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Master Earth Group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;

    // Earth Sphere Radius
    const earthRadius = 2.4;
    const earthSegments = isSoftwareGl ? 32 : 64;

    // Textures
    const { map: earthMap, bump: earthBump } = createProceduralEarthTexture();
    earthMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Earth Material (PBR MeshStandardMaterial)
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthMap,
      bumpMap: earthBump,
      bumpScale: 0.04,
      metalness: 0.15,
      roughness: 0.65,
      emissive: new THREE.Color(0x061122),
      emissiveIntensity: 0.4,
    });

    const earthGeometry = new THREE.SphereGeometry(earthRadius, earthSegments, earthSegments);
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Procedural Cloud Layer
    const cloudsCanvas = document.createElement('canvas');
    cloudsCanvas.width = 1024;
    cloudsCanvas.height = 512;
    const cctx = cloudsCanvas.getContext('2d')!;
    cctx.fillStyle = 'rgba(0,0,0,0)';
    cctx.fillRect(0, 0, 1024, 512);
    // Draw subtle, wispy swirling cloud patterns
    cctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 40; i++) {
      const cx = (i * 26) % 1024;
      const cy = 100 + Math.sin(i * 0.7) * 160 + (i % 3) * 40;
      cctx.beginPath();
      cctx.ellipse(cx, cy, 60 + (i % 4) * 25, 18 + (i % 3) * 10, (i * 0.2) % Math.PI, 0, Math.PI * 2);
      cctx.fill();
    }
    const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.018, earthSegments, earthSegments),
      cloudsMaterial
    );
    earthGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // Atmosphere Rayleigh Glow (Custom Shader Backside Sphere)
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
        gl_FragColor = vec4(0.22, 0.65, 1.0, 1.0) * intensity * 0.9;
      }
    `;
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.14, earthSegments, earthSegments),
      atmosphereMaterial
    );
    earthGroup.add(atmosphereMesh);

    // Orbital Rings (thin, elegant titanium & cyan lines)
    const ringGroup = new THREE.Group();
    const createOrbitalRing = (radius: number, tiltX: number, tiltY: number, color: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(96);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
      });
      const ring = new THREE.Line(geometry, material);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };
    ringGroup.add(createOrbitalRing(earthRadius * 1.35, Math.PI / 2.8, 0.4, 0x38bdf8));
    ringGroup.add(createOrbitalRing(earthRadius * 1.55, -Math.PI / 3.2, -0.6, 0x94a3b8));
    earthGroup.add(ringGroup);

    // Subtle star dust particles around
    const starsCount = isSoftwareGl ? 120 : 350;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Pins Group & Company Markers
    const pinsGroup = new THREE.Group();
    pinsGroupRef.current = pinsGroup;
    earthGroup.add(pinsGroup);

    const pinMeshes: THREE.Mesh[] = [];

    corporateData.companies.forEach((company) => {
      const pos = latLongToVector3(company.coordinates.lat, company.coordinates.lng, earthRadius * 1.01);
      const pinHolder = new THREE.Group();
      pinHolder.position.copy(pos);

      // Orient pin outward perpendicular to surface
      pinHolder.lookAt(pos.clone().multiplyScalar(2));

      // 1. Glowing base ring
      const ringGeo = new THREE.RingGeometry(0.04, 0.08, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(company.brandColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const baseRing = new THREE.Mesh(ringGeo, ringMat);
      pinHolder.add(baseRing);

      // 2. Pillar stem
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.28, 8);
      stemGeo.translate(0, 0.14, 0);
      stemGeo.rotateX(Math.PI / 2);
      const stemMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.2,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      pinHolder.add(stem);

      // 3. Glowing beacon head
      const beaconGeo = new THREE.SphereGeometry(0.055, 16, 16);
      beaconGeo.translate(0, 0, 0.28);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(company.accentLight),
        emissive: new THREE.Color(company.brandColor),
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.3,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.userData = { companyId: company.id, company };
      pinHolder.add(beacon);
      pinMeshes.push(beacon);

      pinsGroup.add(pinHolder);
    });

    // Connecting Great Circle Arcs between companies
    const arcsGroup = new THREE.Group();
    arcsGroupRef.current = arcsGroup;
    earthGroup.add(arcsGroup);

    // Create 3D curved connection lines
    const companies = corporateData.companies;
    for (let i = 0; i < companies.length; i++) {
      const nextIndex = (i + 1) % companies.length;
      const start = latLongToVector3(companies[i].coordinates.lat, companies[i].coordinates.lng, earthRadius * 1.015);
      const end = latLongToVector3(companies[nextIndex].coordinates.lat, companies[nextIndex].coordinates.lng, earthRadius * 1.015);

      // Calculate elevated midpoint for the curve
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(earthRadius * (1.06 + Math.min(distance * 0.06, 0.3)));

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.32,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(line);
    }

    // Studio Lighting Rig
    // Key Light (warm-white sun directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    // Secondary Rim Light (cool blue)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Ambient Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x050811, 0.6);
    scene.add(hemiLight);

    // Mouse / Touch Interactivity
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Update normalized mouse coordinates for raycasting
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = clientX - previousPointerPositionRef.current.x;
        const deltaY = clientY - previousPointerPositionRef.current.y;
        targetRotationRef.current.y += deltaX * 0.005;
        targetRotationRef.current.x = Math.max(-1.2, Math.min(1.2, targetRotationRef.current.x + deltaY * 0.004));
        previousPointerPositionRef.current = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(pinMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.company && onSelectCompany) {
          onSelectCompany(hit.userData.company);
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    container.addEventListener('click', handleClick);

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Exponential Damping
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (earthGroup) {
        // Auto-rotation if not manually dragging
        if (!isDraggingRef.current) {
          targetRotationRef.current.y += autoRotateSpeed;
        }

        // Smooth damping towards target rotation
        earthGroup.rotation.y = THREE.MathUtils.damp(earthGroup.rotation.y, targetRotationRef.current.y, 4.0, delta);
        earthGroup.rotation.x = THREE.MathUtils.damp(earthGroup.rotation.x, targetRotationRef.current.x, 4.0, delta);

        // Clouds rotate slightly faster on Y for realistic differential drift
        if (cloudsMeshRef.current) {
          cloudsMeshRef.current.rotation.y += 0.0003;
        }

        // Gentle ring precession
        ringGroup.rotation.z += 0.0004;
      }

      // Parallax mouse tilt for hero mode
      if (mode === 'hero' && cameraRef.current) {
        const targetCamX = 1.5 + mouseRef.current.x * 0.25;
        const targetCamY = 0.3 + mouseRef.current.y * 0.18;
        cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, targetCamX, 2.5, delta);
        cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetCamY, 2.5, delta);
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('click', handleClick);

      // Dispose Three.js objects
      earthGeometry.dispose();
      earthMaterial.dispose();
      earthMap.dispose();
      earthBump.dispose();
      cloudsMaterial.dispose();
      cloudsTexture.dispose();
      atmosphereMaterial.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, autoRotateSpeed, onSelectCompany]);

  // Handle intro zoom if in intro mode
  useEffect(() => {
    if (mode === 'intro' && cameraRef.current) {
      // Zoom from distance 16 down to 6.5 based on introProgress
      const zPos = 16 - introProgress * 9.5;
      cameraRef.current.position.z = zPos;
    }
  }, [mode, introProgress]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full canvas-container cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Globo terráqueo 3D interactivo que representa las empresas globales de Terra Group"
    />
  );
};
