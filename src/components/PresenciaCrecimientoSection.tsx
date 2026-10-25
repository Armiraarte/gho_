/**
 * PresenciaCrecimientoSection.tsx
 * Sección de Presencia Global e Indicadores de Crecimiento:
 * - Indicadores corporativos auditados con contexto y unidades explícitas
 * - Cobertura en 4 continentes con centros operativos y proyectos estratégicos
 * - Desglose interactivo por región y sector de actividad
 */

import React, { useState } from 'react';
import { corporateData } from '../data/corporateData';
import { Globe2, MapPin, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';

export const PresenciaCrecimientoSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'europa' | 'norteamerica' | 'latam' | 'asiapacifico'>('europa');

  const regionalData = {
    europa: {
      title: 'Europa & EMEA',
      headquarters: 'Madrid, España (Sede Corporativa Central)',
      description: 'Epicentro histórico y sede directiva de Terra Group. Concentra el desarrollo de energía marina eólica, infraestructuras portuarias en el Mediterráneo y gestión patrimonial en Londres y Madrid.',
      hubs: ['Madrid', 'Bilbao', 'Valencia', 'Róterdam', 'Berlín', 'Londres'],
      kpi: '3.2 GW Capacidad Renovable · 24 Parques Eólicos y Solares',
      compliance: 'Cumplimiento directiva UE Taxonomía Verde & ESG Nivel AAA',
    },
    norteamerica: {
      title: 'América del Norte',
      headquarters: 'Miami, FL (Sede Regional Américas) & San Francisco, CA',
      description: 'Lidera la investigación en tecnologías de inteligencia artificial (Terra Tech) y desarrollos urbanos bioclimáticos de vanguardia en el sur de Florida.',
      hubs: ['Miami', 'San Francisco', 'Nueva York'],
      kpi: '68 Patentes Registradas · 1.4M m² en Desarrollos LEED',
      compliance: 'Certificaciones USGBC LEED Platinum y Estándar SEC',
    },
    latam: {
      title: 'Latinoamérica',
      headquarters: 'Ciudad de México & São Paulo, Brasil',
      description: 'Foco en agricultura regenerativa y biotecnología aplicada (Terra Bio), además de proyectos urbanos icónicos y corredores logísticos en el Canal de Panamá.',
      hubs: ['Ciudad de México', 'São Paulo', 'Bogotá', 'Panamá'],
      kpi: '320,000 Ha Regeneradas · 42 Formulaciones Bio patentadas',
      compliance: 'Protocolo de Kioto & Alianzas con Comunidades Indígenas',
    },
    asiapacifico: {
      title: 'Asia-Pacífico',
      headquarters: 'Singapur (Hub Marítimo & Logística)',
      description: 'Supervisa el corredor comercial marítimo transoceánico con terminales automatizadas y distribución a más de 48 puertos internacionales.',
      hubs: ['Singapur', 'Hong Kong', 'Tokio'],
      kpi: '2.1M TEUs Anuales · 32 Centros de Distribución Inteligente',
      compliance: 'Certificación IMO 2030 de Eficiencia en Carga Marítima',
    },
  };

  const currentRegion = regionalData[selectedRegion];

  return (
    <section id="presencia" className="relative py-28 sm:py-36 bg-[#080d1a] border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span>EXPANSIÓN Y SOSTENIBILIDAD</span>
            <span aria-hidden="true">·</span>
            <span>PRESENCIA MULTINACIONAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
            Presencia y Crecimiento Sostenible
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light">
            Estructura operativa distribuida estratégicamente para conectar los mayores centros de innovación, producción y comercio global.
          </p>
        </div>

        {/* Corporate Metrics Grid (Audited and Managed) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {corporateData.stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-300">
                {stat.context}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Regional Explorer */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800 shadow-2xl space-y-8">
          {/* Region Selector Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-slate-300 uppercase mr-3">
              Región de Operación:
            </span>
            {(
              [
                ['europa', 'Europa & EMEA'],
                ['norteamerica', 'América del Norte'],
                ['latam', 'Latinoamérica'],
                ['asiapacifico', 'Asia-Pacífico'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedRegion === key
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Regional Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentRegion.headquarters}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {currentRegion.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {currentRegion.description}
              </p>

              {/* Operating Hubs Chips (Unboxed with separators) */}
              <div className="pt-2">
                <div className="text-xs font-mono text-slate-300 uppercase mb-2">
                  Ciudades y Nodos de Operación:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  {currentRegion.hubs.map((hub, idx) => (
                    <React.Fragment key={hub}>
                      <span className="text-slate-200 font-medium">{hub}</span>
                      {idx < currentRegion.hubs.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional KPI Card */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Indicadores Regionales</span>
              </div>

              <div className="text-sm font-semibold text-white">
                {currentRegion.kpi}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{currentRegion.compliance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
