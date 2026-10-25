/**
 * CorporativoSection.tsx
 * Sección 1 — El Corporativo:
 * - El planeta 3D se ubica en el lado derecho girando suavemente.
 * - El contenido institucional se presenta en el lado izquierdo.
 * - Título principal: "Una visión que integra múltiples industrias."
 * - Descripción oficial, filosofía, valores y diferenciadores del holding.
 */

import React from 'react';
import { hermosilloData } from '../data/hermosilloData';
import { ShieldCheck, Scale, Compass, Award, CheckCircle2 } from 'lucide-react';

export const CorporativoSection: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative min-h-screen flex items-center py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto w-full z-10"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Institutional Content (60% width on desktop) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
            <span>EL CORPORATIVO</span>
            <span aria-hidden="true">·</span>
            <span>IDENTIDAD & ESTRUCTURA</span>
          </div>

          {/* Master Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display text-balance leading-[1.12]">
            {hermosilloData.holding.visionTitle}
          </h2>

          {/* Core Official Description */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light text-balance">
            {hermosilloData.holding.description}
          </p>

          {/* Institutional Differentiators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-5 rounded-xl bg-graphite/85 border border-neutral-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-platinum">
                <Scale className="w-4 h-4" />
                <span>Gobernanza & Seguridad</span>
              </div>
              <div className="text-sm font-semibold text-white">
                Certeza Jurídica Integral
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Cada operación está respaldada por la experiencia y el blindaje de nuestra división legal, otorgando solidez a clientes y socios.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-graphite/85 border border-neutral-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-silver">
                <Compass className="w-4 h-4" />
                <span>Sinergia Transversal</span>
              </div>
              <div className="text-sm font-semibold text-white">
                Cuatro Divisiones Especializadas
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Autonomía operativa en cada empresa con el respaldo patrimonial, tecnológico y de infraestructura que brinda la corporación.
              </p>
            </div>
          </div>

          {/* Institutional Value Commitments */}
          <div className="pt-2 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-platinum shrink-0" />
              <span>Sede corporativa central en Guadalajara, Jalisco, conectando con todo el occidente y el país.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-platinum shrink-0" />
              <span>Gestión inmobiliaria comercial y residencial sin intermediaciones ajenas ni actividades constructivas.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-platinum shrink-0" />
              <span>Innovación continua mediante modelos de inteligencia artificial y desarrollo de software propio.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual framing space where the 3D Earth floats */}
        <div className="lg:col-span-5 h-[320px] sm:h-[450px] lg:h-[550px] flex items-center justify-center relative pointer-events-none">
          {/* Subtle ambient blur helping text contrast against Earth */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-ink/70 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
