/**
 * NuestrasEmpresasSection.tsx
 * Cuadrícula moderna de las filiales de Terra Group con tarjetas premium:
 * - Emblema distintivo y sector comercial
 * - Fotografía de alta fidelidad con microinteracción de zoom en hover
 * - Métricas cuantitativas y proyectos insignia
 * - Botón interactivo "Explorar División" que abre el expediente completo
 */

import React, { useState } from 'react';
import { Company, corporateData } from '../data/corporateData';
import { ArrowUpRight, Globe, Zap, Cpu, Ship, Building, Coins, Dna } from 'lucide-react';

interface NuestrasEmpresasSectionProps {
  onOpenCompanyModal: (company: Company) => void;
}

export const NuestrasEmpresasSection: React.FC<NuestrasEmpresasSectionProps> = ({
  onOpenCompanyModal,
}) => {
  const [filter, setFilter] = useState<string>('todas');

  const filteredCompanies = filter === 'todas'
    ? corporateData.companies
    : corporateData.companies.filter((c) => c.category === filter);

  const filterCategories = [
    { id: 'todas', label: 'Todas las Divisiones' },
    { id: 'energia', label: 'Energía' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'logistica', label: 'Logística' },
    { id: 'urbanismo', label: 'Urbanismo' },
    { id: 'capital', label: 'Capital' },
    { id: 'biociencias', label: 'Biociencias' },
  ];

  return (
    <section id="empresas" className="relative py-28 sm:py-36 bg-[#050811] border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 mb-2">
              <span>PORTAFOLIO DE INVERSIONES</span>
              <span aria-hidden="true">·</span>
              <span>6 COMPAÑÍAS LÍDERES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
              Nuestras Empresas
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-light">
            Especialización sectorial profunda, autonomía de gestión y alineación irrestricta con los más altos estándares éticos y medioambientales.
          </p>
        </div>

        {/* Filter Tabs (Interactive Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                filter === cat.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Premium Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="group relative rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-sky-950/20"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={company.image}
                  alt={company.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Company Tagline Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 tracking-wider">
                    EST. {company.founded}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{
                      backgroundColor: `${company.brandColor}25`,
                      color: company.accentLight,
                    }}
                  >
                    {company.location.split('/')[0]}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 mb-1">
                    {company.sector}
                  </div>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-sky-300 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-light">
                    {company.description}
                  </p>
                </div>

                {/* Primary Metric Preview */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    {company.metrics[0].label}
                  </span>
                  <span className="font-bold text-white font-display tabular-nums">
                    {company.metrics[0].value}
                  </span>
                </div>

                {/* Card Action */}
                <button
                  onClick={() => onOpenCompanyModal(company)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-200 group-hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <span>Explorar División</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
