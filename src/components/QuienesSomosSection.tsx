/**
 * QuienesSomosSection.tsx
 * Sección Editorial Institucional:
 * - Transición de fondo oscuro a fondo blanco cálido / arquitectónico
 * - Titular principal: "Diferentes empresas. Una misma visión."
 * - Fotografía corporativa de la sede central
 * - Apartados estructurados: Historia, Misión, Visión y Valores Institucionales
 */

import React, { useState } from 'react';
import { corporateData } from '../data/corporateData';
import { Target, Eye, Shield, History, ArrowRight } from 'lucide-react';

export const QuienesSomosSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mision' | 'vision' | 'valores' | 'historia'>('mision');

  return (
    <section id="quienes-somos" className="relative py-28 sm:py-36 bg-[#f8fafc] text-slate-900 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Editorial Eyebrow & Master Title */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-500 uppercase">
            <span>PERFIL INSTITUCIONAL</span>
            <span aria-hidden="true">·</span>
            <span>HOLDING INTERNACIONAL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 font-display text-balance leading-[1.1]">
            {corporateData.institutional.title}
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed pt-2">
            {corporateData.institutional.statement}
          </p>
        </div>

        {/* 2-Column Editorial Spread: HQ Architecture + Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Architectural Monumental Photo */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="/src/assets/images/corporate_hq_architectural_1792899900686.jpg"
              alt="Sede Central Corporativa de Terra Group"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="text-xs font-mono tracking-wider text-sky-300">
                SEDE CENTRAL CORPORATIVA
              </div>
              <div className="text-sm font-medium text-slate-100">
                {corporateData.holding.headquarters}
              </div>
            </div>
          </div>

          {/* Institutional Content & Interactive Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                {corporateData.holding.fullDescription}
              </p>
              <p className="text-slate-500 font-light text-sm">
                Nuestra arquitectura operativa descentralizada dota a cada subsidiaria de plena agilidad de mercado, mientras el grupo central asegura respaldo patrimonial, gobernanza y sinergias tecnológicas transcontinentales.
              </p>
            </div>

            {/* Interactive Tab Controls (Functional Buttons) */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl border border-slate-300/80">
              <button
                onClick={() => setActiveTab('mision')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mision'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-sky-600" />
                <span>Misión</span>
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Visión</span>
              </button>

              <button
                onClick={() => setActiveTab('valores')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'valores'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Valores</span>
              </button>

              <button
                onClick={() => setActiveTab('historia')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'historia'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5 text-amber-600" />
                <span>Trayectoria</span>
              </button>
            </div>

            {/* Tab Body Displays */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm min-h-[220px]">
              {activeTab === 'mision' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold">
                    Propósito Primario
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Excelencia Operativa & Responsabilidad Social
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {corporateData.institutional.mission}
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold">
                    Horizonte 2035
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Liderazgo en Transición Ecológica & Tecnológica
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {corporateData.institutional.vision}
                  </p>
                </div>
              )}

              {activeTab === 'valores' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {corporateData.institutional.values.map((v, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-xs font-bold text-slate-900">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {v.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'historia' && (
                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                  {corporateData.institutional.milestones.map((m, i) => (
                    <div key={i} className="flex gap-4 items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="font-mono text-xs font-bold text-sky-700 w-16 shrink-0 pt-0.5">
                        {m.year}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{m.title}</div>
                        <div className="text-xs text-slate-500">{m.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
