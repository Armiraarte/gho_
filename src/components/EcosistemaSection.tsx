/**
 * EcosistemaSection.tsx
 * Sección 2 — Nuestro Ecosistema: "Cuatro empresas. Una misma visión."
 * 
 * Coreografía continua sincronizada con el planeta Tierra 3D:
 * 01. Hermosillo y Asociados — Planeta a la derecha, contenido a la izquierda
 * 02. Hermosillo Inmobiliaria — Planeta a la izquierda, contenido a la derecha
 * 03. ARMiRARTE — Planeta a la derecha, contenido a la izquierda
 * 04. Espacio Chapultepec — Planeta a la izquierda, contenido a la derecha
 */

import React from 'react';
import { hermosilloData, CompanyInfo } from '../data/hermosilloData';
import { 
  Scale, 
  Building2, 
  Cpu, 
  Briefcase, 
  ArrowUpRight, 
  CheckCircle, 
  ExternalLink 
} from 'lucide-react';

interface EcosistemaSectionProps {
  onSelectCompany: (company: CompanyInfo) => void;
}

export const EcosistemaSection: React.FC<EcosistemaSectionProps> = ({ onSelectCompany }) => {
  const companies = hermosilloData.companies;

  const getCompanyIcon = (id: string) => {
    switch (id) {
      case 'hermosillo-asociados':
        return <Scale className="w-5 h-5 text-platinum" />;
      case 'hermosillo-inmobiliaria':
        return <Building2 className="w-5 h-5 text-silver" />;
      case 'armirarte':
        return <Cpu className="w-5 h-5 text-platinum" />;
      case 'espacio-chapultepec':
        return <Briefcase className="w-5 h-5 text-silver" />;
      default:
        return <Scale className="w-5 h-5 text-platinum" />;
    }
  };

  return (
    <section id="sociedades" className="relative z-10 w-full">
      {/* Intro Gateway Title */}
      <div className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
          <span>PORTAFOLIO DE EMPRESAS</span>
          <span aria-hidden="true">·</span>
          <span>SINERGIA HOLDING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
          Cuatro empresas. Una misma visión.
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto">
          Cada filial opera con liderazgo autónomo en su disciplina, potenciada por los recursos y la solidez institucional del grupo.
        </p>
      </div>

      {/* 4 Choreographed Subsidiary Stages */}
      <div className="space-y-36 sm:space-y-48 pb-32">
        {companies.map((company, index) => {
          // Even index: content on left, Earth on right.
          // Odd index: content on right, Earth on left.
          const isContentOnLeft = index % 2 === 0;

          return (
            <div
              key={company.id}
              id={`empresa-${company.id}`}
              className="min-h-[85vh] flex items-center px-6 sm:px-8 max-w-7xl mx-auto w-full"
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Content Block */}
                <div
                  className={`space-y-6 ${
                    isContentOnLeft
                      ? 'lg:col-span-6 lg:order-1 text-left'
                      : 'lg:col-span-6 lg:col-start-7 lg:order-2 text-left'
                  }`}
                >
                  {/* Company Number and Sector Kicker */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-platinum tracking-tight">
                      {company.number}
                    </span>
                    <span className="w-8 h-[1px] bg-neutral-700" />
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-silver">
                      {getCompanyIcon(company.id)}
                      <span>{company.sector}</span>
                    </div>
                  </div>

                  {/* Company Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
                    {company.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base font-medium text-platinum">
                    "{company.tagline}"
                  </p>

                  {/* Representative High-End Photo without covering Earth */}
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group max-w-xl">
                    <img
                      src={company.image}
                      alt={company.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-xs font-mono">
                      <img
                        src={company.logo}
                        alt={`Logotipo de ${company.name}`}
                        className="h-10 sm:h-12 w-auto max-w-[55%] object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                      />
                      <span className="text-silver shrink-0">Sede Occidente</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
                    {company.description}
                  </p>

                  {/* Key Capabilities Bullet Points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {company.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-platinum shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Official Navigation Link & Details Action */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-graphite hover:bg-graphite-hover border border-neutral-700 hover:border-platinum/70 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <span>Sitio Oficial de {company.shortName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-platinum" />
                    </a>

                    <button
                      onClick={() => onSelectCompany(company)}
                      className="px-4 py-3 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Ver Resumen Completo →
                    </button>
                  </div>
                </div>

                {/* Empty framing zone for the persistent 3D Earth */}
                <div
                  className={`hidden lg:block lg:col-span-6 pointer-events-none ${
                    isContentOnLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
