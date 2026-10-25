/**
 * earthTexture.ts
 * Textura del planeta con geografía real (Natural Earth 1:50m vía world-atlas)
 * en la paleta Platino: océano grafito, continentes platino, costas y fronteras definidas.
 */

import * as THREE from 'three';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Geometry, Position } from 'geojson';
import worldUrl from 'world-atlas/countries-50m.json?url';

const PALETTE = {
  oceanEdge: '#08080a',
  oceanMid: '#141417',
  graticule: 'rgba(229, 228, 226, 0.05)',
  land: '#4a4946',
  landHighlight: '#6d6c68', // México (sede del grupo)
  coast: 'rgba(240, 239, 236, 0.78)',
  border: 'rgba(240, 239, 236, 0.2)',
  // Mapa de rugosidad: continentes más pulidos (brillo metálico), océano mate
  roughLand: '#6b6b6b',
  roughOcean: '#e0e0e0',
};

const MEXICO_ID = '484';
const GUADALAJARA = { lat: 20.6597, lng: -103.3496 };

export interface EarthTextures {
  map: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
  /** Se resuelve cuando los continentes ya están dibujados */
  ready: Promise<void>;
  dispose: () => void;
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext('2d')! };
}

/** Traza geometrías GeoJSON en proyección equirectangular (la que usa la esfera UV). */
function traceGeometry(ctx: CanvasRenderingContext2D, geom: Geometry, w: number, h: number) {
  const traceLine = (coords: Position[], close: boolean) => {
    let prevLng: number | null = null;
    coords.forEach(([lng, lat], i) => {
      const x = ((lng + 180) / 360) * w;
      const y = ((90 - lat) / 180) * h;
      // Saltar el corte del antimeridiano para no dibujar rayas horizontales
      if (i === 0 || (prevLng !== null && Math.abs(lng - prevLng) > 180)) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      prevLng = lng;
    });
    if (close) ctx.closePath();
  };

  switch (geom.type) {
    case 'Polygon':
      geom.coordinates.forEach((ring) => traceLine(ring, true));
      break;
    case 'MultiPolygon':
      geom.coordinates.forEach((poly) => poly.forEach((ring) => traceLine(ring, true)));
      break;
    case 'LineString':
      traceLine(geom.coordinates, false);
      break;
    case 'MultiLineString':
      geom.coordinates.forEach((line) => traceLine(line, false));
      break;
    case 'GeometryCollection':
      geom.geometries.forEach((g) => traceGeometry(ctx, g, w, h));
      break;
  }
}

export function createEarthTextures(width: number): EarthTextures {
  const height = width / 2;
  const px = width / 4096; // grosor de línea relativo a la resolución

  // --- Mapa de color ---
  const color = makeCanvas(width, height);
  const c = color.ctx;
  const ocean = c.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, PALETTE.oceanEdge);
  ocean.addColorStop(0.5, PALETTE.oceanMid);
  ocean.addColorStop(1, PALETTE.oceanEdge);
  c.fillStyle = ocean;
  c.fillRect(0, 0, width, height);

  // Retícula de latitud/longitud cada 15°
  c.strokeStyle = PALETTE.graticule;
  c.lineWidth = 1.5 * px;
  c.beginPath();
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * height;
    c.moveTo(0, y);
    c.lineTo(width, y);
  }
  for (let lng = -180; lng < 180; lng += 15) {
    const x = ((lng + 180) / 360) * width;
    c.moveTo(x, 0);
    c.lineTo(x, height);
  }
  c.stroke();

  // --- Mapa de rugosidad (menor resolución basta) ---
  const rough = makeCanvas(2048, 1024);
  rough.ctx.fillStyle = PALETTE.roughOcean;
  rough.ctx.fillRect(0, 0, 2048, 1024);

  const map = new THREE.CanvasTexture(color.canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  const roughness = new THREE.CanvasTexture(rough.canvas);
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.ClampToEdgeWrapping;

  let disposed = false;

  const ready = fetch(worldUrl)
    .then((res) => res.json() as Promise<Topology>)
    .then((topo) => {
      if (disposed) return;
      const countries = topo.objects.countries as GeometryCollection;
      const land = feature(topo, topo.objects.land as GeometryCollection);
      const mexico = countries.geometries.find((g) => String(g.id) === MEXICO_ID);
      const borders = mesh(topo, countries, (a, b) => a !== b);

      // Continentes
      c.beginPath();
      land.features.forEach((f) => traceGeometry(c, f.geometry, width, height));
      c.fillStyle = PALETTE.land;
      c.fill('evenodd');

      // México resaltado
      if (mexico) {
        c.beginPath();
        const mx = feature(topo, mexico);
        if ('geometry' in mx) traceGeometry(c, mx.geometry, width, height);
        c.fillStyle = PALETTE.landHighlight;
        c.fill('evenodd');
      }

      // Fronteras entre países
      c.beginPath();
      traceGeometry(c, borders, width, height);
      c.strokeStyle = PALETTE.border;
      c.lineWidth = 1.2 * px;
      c.lineJoin = 'round';
      c.stroke();

      // Línea de costa
      c.beginPath();
      land.features.forEach((f) => traceGeometry(c, f.geometry, width, height));
      c.strokeStyle = PALETTE.coast;
      c.lineWidth = 2 * px;
      c.stroke();

      // Brillo en Guadalajara
      const gx = ((GUADALAJARA.lng + 180) / 360) * width;
      const gy = ((90 - GUADALAJARA.lat) / 180) * height;
      const r = 14 * px;
      const glow = c.createRadialGradient(gx, gy, 0, gx, gy, r);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      glow.addColorStop(0.35, 'rgba(229, 228, 226, 0.45)');
      glow.addColorStop(1, 'rgba(229, 228, 226, 0)');
      c.fillStyle = glow;
      c.beginPath();
      c.arc(gx, gy, r, 0, Math.PI * 2);
      c.fill();

      // Rugosidad: continentes pulidos
      rough.ctx.beginPath();
      land.features.forEach((f) => traceGeometry(rough.ctx, f.geometry, 2048, 1024));
      rough.ctx.fillStyle = PALETTE.roughLand;
      rough.ctx.fill('evenodd');

      map.needsUpdate = true;
      roughness.needsUpdate = true;
    })
    .catch((err) => {
      console.warn('No se pudo cargar el mapa del mundo:', err);
    });

  return {
    map,
    roughness,
    ready,
    dispose: () => {
      disposed = true;
      map.dispose();
      roughness.dispose();
    },
  };
}
