/**
 * WelcomeScreen.tsx
 * Experiencia de Bienvenida Cinematográfica:
 * 1. Oscuridad absoluta inicial
 * 2. Punto focal de luz que se expande
 * 3. Revelación del planeta Tierra 3D con atmósfera y líneas de conexión
 * 4. Metamorfosis hacia el logotipo corporativo oficial de Terra Group
 * 5. Tipografía elegante y transición fluida a la página principal
 */

import React, { useState, useEffect } from 'react';
import { EarthCanvas } from './3d/EarthCanvas';
import { corporateData } from '../data/corporateData';
import { Globe, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  // Step sequence:
  // 0: Deep void (0 - 1s)
  // 1: Focal point of light (1 - 2.5s)
  // 2: Earth reveals & zooms in with connection lines (2.5 - 5.5s)
  // 3: Logo morphing & corporate name reveal (5.5 - 8s)
  // 4: Complete transition trigger ready
  const [phase, setPhase] = useState<number>(0);
  const [introProgress, setIntroProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Phase 1: Light beacon awakens
    const t1 = setTimeout(() => setPhase(1), 800);
    // Phase 2: Earth reveals and camera approaches
    const t2 = setTimeout(() => {
      setPhase(2);
      // Animate intro zoom progress
      let p = 0;
      const interval = setInterval(() => {
        p += 0.035;
        if (p >= 1) {
          p = 1;
          clearInterval(interval);
        }
        setIntroProgress(p);
      }, 50);
    }, 2200);

    // Phase 3: Logo morphing & typography
    const t3 = setTimeout(() => setPhase(3), 5800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#03060f] transition-opacity duration-1000 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Star Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* PHASE 1: Focal Point of Light */}
      <div
        className={`absolute transition-all duration-1000 ease-out pointer-events-none ${
          phase === 1
            ? 'scale-100 opacity-100'
            : phase >= 2
            ? 'scale-150 opacity-20'
            : 'scale-0 opacity-0'
        }`}
      >
        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_80px_30px_rgba(56,189,248,0.8)]" />
      </div>

      {/* PHASE 2 & 3: 3D Earth Viewport */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full max-w-5xl max-h-[85vh]">
          <EarthCanvas
            mode="intro"
            introProgress={introProgress}
            autoRotateSpeed={0.0028}
          />
        </div>
      </div>

      {/* PHASE 3: Logo Morphing Overlay & Typography */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Transforming Corporate Emblem */}
        <div className="relative mb-6 group">
          {/* Outer ring */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-sky-400/30 flex items-center justify-center backdrop-blur-sm bg-slate-950/60 shadow-[0_0_50px_rgba(56,189,248,0.25)] transition-transform duration-700">
            {/* Inner rotating orbital ring */}
            <div className="absolute inset-1 rounded-full border-t-2 border-sky-400/80 animate-[spin_8s_linear_infinite]" />
            {/* Earth silhouette emblem */}
            <div className="relative flex items-center justify-center text-sky-300">
              <Globe className="w-12 h-12 stroke-[1.25] text-sky-400" />
            </div>
          </div>
        </div>

        {/* Corporate Wordmark */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 font-display">
          {corporateData.holding.name}
        </h1>

        {/* Official Slogan */}
        <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl mb-8 tracking-wide">
          "{corporateData.holding.tagline}"
        </p>

        {/* Call to action & Enter */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleEnter}
            className="group flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide text-white bg-slate-900 border border-slate-700/80 rounded-xl hover:border-sky-400/60 hover:bg-slate-800 transition-all duration-200 shadow-lg shadow-black/40 hover:shadow-sky-500/10 cursor-pointer"
          >
            <span>Explorar Ecosistema Corporativo</span>
            <ArrowRight className="w-4 h-4 text-sky-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Top right Skip Button for Instant Access */}
      <button
        onClick={handleEnter}
        className="absolute top-6 right-6 z-20 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-slate-600 bg-slate-950/40 cursor-pointer"
        aria-label="Omitir introducción cinematográfica"
      >
        Omitir Introducción →
      </button>

      {/* Bottom Legal Brand Trust Signature */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center text-xs text-slate-300 tracking-wider">
        <span>{corporateData.holding.legalName}</span>
        <span className="mx-2" aria-hidden="true">·</span>
        <span>Gobernanza Global & Sostenibilidad</span>
      </div>
    </div>
  );
};
