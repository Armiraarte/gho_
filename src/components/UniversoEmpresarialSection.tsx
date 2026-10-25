/**
 * UniversoEmpresarialSection.tsx
 * Ecosistema Interactivo: El usuario navega entre las filiales del grupo
 * - El planeta 3D rota automáticamente hacia las coordenadas geográficas de cada empresa
 * - Tarjeta corporativa de alta sofisticación con logotipo, sector, proyectos y KPIs
 * - Carrusel/selector horizontal de empresas para navegación táctil y de escritorio
 * - Microinteracciones de precisión
 */

import React, { useState } from 'react';
import { EarthCanvas } from './3d/EarthCanvas';
import { Company, corporateData } from '../data/corporateData';
import { 
  Zap, 
  Cpu, 
  Ship, 
  Building, 
  Coins, 
  Dna, 
  ArrowRight, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface UniversoEmpresarialSectionProps {
  onOpenCompanyModal: (company: Company) => void;
}

// Icon helper per company category
const getCompanyIcon = (category: string) => {
  switch (category) {
    case 'energia':
      return <Zap className="w-4 h-4 text-sky-400" />;
    case 'tecnologia':
      return <Cpu className="w-4 h-4 text-indigo-400" />;
    case 'logistica':
      return <Ship className="w-4 h-4 text-cyan-400" />;
    case 'urbanismo':
      return <Building className="w-4 h-4 text-emerald-400" />;
    case 'capital':
      return <Coins className="w-4 h-4 text-amber-400" />;
    case 'biociencias':
      return <Dna className="w-4 h-4 text-teal-400" />;
    default:
      return <Zap className="w-4 h-4 text-sky-400" />;
  }
};

export const UniversoEmpresarialSection: React.FC<UniversoEmpresarialSectionProps> = ({
  onOpenCompanyModal,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(corporateData.companies[0]);

  const handleSelectCompany = (comp: Company) => {
    setSelectedCompany(comp);
  };

  const handleNext = () => {
    const currentIndex = corporateData.companies.findIndex((c) => c.id === selectedCompany.id);
    const nextIndex = (currentIndex + 1) % corporateData.companies.length;
    setSelectedCompany(corporateData.companies[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = corporateData.companies.findIndex((c) => c.id === selectedCompany.id);
    const prevIndex = (currentIndex - 1 + corporateData.companies.length) % corporateData.companies.length;
    setSelectedCompany(corporateData.companies[prevIndex]);
  };

  return (
    <section id="universo" className="relative py-24 sm:py-32 bg-[#050811] border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-12">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 mb-2">
              <span>EXPLORADOR GEOESPACIAL</span>
              <span aria-hidden="true">·</span>
              <span>6 DIVISIONES ACTIVAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
              Nuestro Universo Empresarial
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-light">
            Seleccione una compañía para enfocar el planeta y desplegar el expediente corporativo de la división.
          </p>
        </div>

        {/* Interactive Showcase Grid: 3D Globe + Company Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left/Center: 3D Earth with dynamic focus */}
          <div className="lg:col-span-7 h-[380px] sm:h-[480px] lg:h-[580px] rounded-2xl bg-gradient-to-b from-slate-900/40 to-slate-950/80 border border-slate-800/80 relative overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Interactive Badge indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 backdrop-blur-sm text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCompany.brandColor }} />
              <span>ENFOCANDO: {selectedCompany.shortName.toUpperCase()}</span>
            </div>

            {/* Geographical coordinates read-out */}
            <div className="absolute top-4 right-4 z-10 text-[11px] font-mono text-slate-300 bg-slate-950/80 border border-slate-800/80 px-2.5 py-1 rounded-md">
              <span>{selectedCompany.coordinates.lat.toFixed(4)}° N, {selectedCompany.coordinates.lng.toFixed(4)}° E</span>
            </div>

            <EarthCanvas
              mode="universe"
              selectedCompanyId={selectedCompany.id}
              onSelectCompany={handleSelectCompany}
              autoRotateSpeed={0.0006}
              className="w-full h-full"
            />

            {/* Controls bottom helper */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs text-slate-300">
              <span className="hidden sm:inline">Haga clic sobre un pin del globo para enfocar</span>
              <div className="flex items-center gap-2 pointer-events-auto ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Empresa anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Empresa siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Focused Corporate Dossier Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-slate-800/80 shadow-2xl relative space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${selectedCompany.brandColor}22` }}
                  >
                    {getCompanyIcon(selectedCompany.category)}
                  </div>
                  <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                    {selectedCompany.sector}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  Est. {selectedCompany.founded}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
                {selectedCompany.name}
              </h3>
              <p className="text-xs text-sky-400 font-medium mt-1">
                "{selectedCompany.tagline}"
              </p>
            </div>

            {/* Representative Image Thumbnail */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-800 group">
              <img
                src={selectedCompany.image}
                alt={selectedCompany.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{selectedCompany.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {selectedCompany.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800/60">
              {selectedCompany.metrics.map((metric, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-sm sm:text-base font-bold font-display text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to inspect company dossier */}
            <div className="pt-2">
              <button
                onClick={() => onOpenCompanyModal(selectedCompany)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 border border-slate-700 rounded-xl hover:border-sky-400 hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-md"
              >
                <span>Conocer Expediente de {selectedCompany.shortName}</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Selector Tabs across All 6 Companies */}
        <div className="pt-4">
          <div className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-3">
            Exploración Rápida de Subsidiarias:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {corporateData.companies.map((company, index) => {
              const isSelected = company.id === selectedCompany.id;
              return (
                <button
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-sky-400/80 shadow-lg shadow-sky-950/50'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-300">
                      0{index + 1}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: company.brandColor }}
                    />
                  </div>
                  <div className={`text-xs font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {company.shortName}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate mt-0.5">
                    {company.sector.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
