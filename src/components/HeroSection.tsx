/**
 * HeroSection.tsx
 * Introducción y Hero de Grupo Hermosillo de Occidente:
 * - Planeta Tierra 3D como protagonista en el centro / centro-derecha
 * - Revelación cinematográfica con luz tenue y rotación sobre su eje
 * - Título corporativo oficial: GRUPO HERMOSILLO DE OCCIDENTE
 * - Slogan: "Un grupo. Múltiples horizontes."
 */

import React from 'react';
import { hermosilloData } from '../data/hermosilloData';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onScrollDown: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Top spacing */}
      <div className="pt-4" />

      {/* Main Hero Typography Block */}
      <div className="max-w-2xl space-y-6 my-auto text-left">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
          <span>HOLDING EMPRESARIAL</span>
          <span aria-hidden="true">·</span>
          <span className="text-platinum">GUADALAJARA, JALISCO</span>
          <span aria-hidden="true">·</span>
          <span>4 SOCIEDADES</span>
        </div>

        {/* Master Corporate Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] font-display text-balance">
          GRUPO HERMOSILLO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-paper to-silver">
            DE OCCIDENTE
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-neutral-300 font-light tracking-wide leading-relaxed text-balance">
          "{hermosilloData.holding.tagline}"
        </p>

        {/* Brief value proposition */}
        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg">
          Desde Guadalajara, consolidamos servicios jurídicos, gestión inmobiliaria patrimonial, ingeniería de software e inteligencia artificial, y entornos corporativos bajo una misma visión de futuro.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onScrollDown}
            className="group flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-graphite border border-neutral-700 hover:border-platinum/70 rounded-xl transition-all shadow-lg shadow-black/40 hover:bg-graphite-hover cursor-pointer"
          >
            <span>Explorar el Corporativo</span>
            <ArrowRight className="w-4 h-4 text-platinum transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#sociedades"
            className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl transition-all"
          >
            <span>Nuestras 4 Empresas</span>
          </a>
        </div>
      </div>

    </section>
  );
};
