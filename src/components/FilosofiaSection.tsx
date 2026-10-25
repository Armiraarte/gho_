/**
 * FilosofiaSection.tsx
 * Sección 3 — Filosofía Empresarial:
 * - Transición de fondo a blanco cálido (paper)
 * - El planeta 3D se aleja suavemente como elemento secundario de fondo
 * - Título: "La fortaleza de pertenecer a algo más grande."
 * - Bloques editoriales: Gestión Estratégica, Excelencia Profesional, Ética Empresarial, Innovación y Evolución
 */

import React from 'react';
import { hermosilloData } from '../data/hermosilloData';
import { Compass, ShieldCheck, Scale, Lightbulb } from 'lucide-react';

export const FilosofiaSection: React.FC = () => {
  const pillars = hermosilloData.philosophy.pillars;

  const getPillarIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Compass className="w-5 h-5 text-platinum-deep" />;
      case '02':
        return <ShieldCheck className="w-5 h-5 text-neutral-800" />;
      case '03':
        return <Scale className="w-5 h-5 text-platinum-deep" />;
      case '04':
        return <Lightbulb className="w-5 h-5 text-neutral-800" />;
      default:
        return <Compass className="w-5 h-5 text-platinum-deep" />;
    }
  };

  return (
    <section
      id="filosofia"
      className="relative z-10 py-32 sm:py-44 px-6 sm:px-8 text-ink w-full"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Editorial Eyebrow & Master Title */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase">
            <span>FILOSOFÍA DEL HOLDING</span>
            <span aria-hidden="true">·</span>
            <span>PRINCIPIOS CORPORATIVOS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink font-display text-balance leading-[1.12]">
            {hermosilloData.philosophy.title}
          </h2>

          <p className="text-base sm:text-xl text-neutral-600 font-light leading-relaxed pt-2">
            {hermosilloData.philosophy.description}
          </p>
        </div>

        {/* 4 Pillars Editorial Grid with Clean Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="text-sm font-mono font-bold text-platinum-deep tracking-wider">
                  {pillar.number}.
                </span>
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  {getPillarIcon(pillar.number)}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-ink font-display">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Institutional Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-graphite text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-platinum">
              GOBERNANZA Y RESPONSABILIDAD
            </div>
            <div className="text-xl sm:text-2xl font-semibold font-display text-white">
              Crecimiento ordenado, solidez jurídica y vanguardia tecnológica al servicio de nuestros clientes.
            </div>
          </div>
          <a
            href="#contacto"
            className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-ink bg-platinum hover:bg-white rounded-xl transition-all whitespace-nowrap shadow-md cursor-pointer shrink-0"
          >
            Contactar al Holding
          </a>
        </div>
      </div>
    </section>
  );
};
