/**
 * HeroVideo.tsx
 * Video aéreo de Guadalajara (blanco y negro) como fondo del hero.
 * Va detrás del planeta 3D y se desplaza con la página.
 * - Versión ligera en móvil.
 * - Con "reducir movimiento" activado se muestra solo la imagen fija.
 * - Se pausa cuando el hero sale de pantalla (no gasta recursos mientras se recorre el sitio).
 */

import React, { useEffect, useRef, useState } from 'react';
import desktopVideo from '../assets/images/videos/hero-bg-desktop-bw.mp4';
import mobileVideo from '../assets/images/videos/hero-bg-mobile-bw.mp4';
import poster from '../assets/images/videos/hero-poster.jpg';

const MOBILE_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const HeroVideo: React.FC = () => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reduceMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reproducir solo mientras el hero está visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [reduceMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-0 h-svh min-h-[640px] overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {reduceMotion ? (
        <img src={poster} alt="" className="absolute inset-0 size-full object-cover opacity-70" />
      ) : (
        <video
          ref={videoRef}
          key={isMobile ? 'mobile' : 'desktop'}
          className="absolute inset-0 size-full object-cover opacity-70"
          src={isMobile ? mobileVideo : desktopVideo}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Velos para que el texto y el planeta se lean sobre el video */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
    </div>
  );
};
