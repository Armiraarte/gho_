/**
 * ConexionSection.tsx
 * Sección 4 — Conexión Empresarial:
 * - El fondo vuelve gradualmente a oscuro (ink)
 * - El planeta se acerca a la cámara y se centra con mayor escala
 * - Cuatro puntos luminosos conceptuales con líneas finas de interconexión
 * - Al pasar el cursor, se sincroniza el foco y se despliega nombre y sector
 * - Enlaces directos a las páginas oficiales de cada empresa
 */

import React from 'react';
import { hermosilloData, CompanyInfo } from '../data/hermosilloData';
import { ArrowUpRight, Network, Sparkles, ExternalLink } from 'lucide-react';

interface ConexionSectionProps {
  onHoverCompany: (companyId: string | null) => void;
  onSelectCompany: (company: CompanyInfo) => void;
  hoveredCompanyId: string | null;
}

export const ConexionSection: React.FC<ConexionSectionProps> = ({
  onHoverCompany,
  onSelectCompany,
  hoveredCompanyId,
}) => {
  return (
    <section
      id="conexion"
      className="relative z-10 py-32 sm:py-44 px-6 sm:px-8 text-white border-t border-neutral-900 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
            <Network className="w-4 h-4 text-platinum" />
            <span>INTERCONEXIÓN ESTRATÉGICA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
            Conexión Empresarial
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto">
            La integración de cuatro pilares de valor: derecho, bienes raíces, tecnología e infraestructura ejecutiva convergiendo en un ecosistema armónico.
          </p>
        </div>

        {/* Central interactive spacer where the enlarged Earth with connecting lines rotates */}
        <div className="h-[280px] sm:h-[380px] lg:h-[420px] pointer-events-none flex items-center justify-center">
          <div className="text-xs font-mono text-neutral-500 bg-graphite/40 px-3 py-1.5 rounded-full border border-neutral-800">
            Pase el cursor sobre las divisiones para iluminar su nodo en el planeta
          </div>
        </div>

        {/* 4 Interactive Division Cards connected with the 3D globe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hermosilloData.companies.map((company) => {
            const isHovered = hoveredCompanyId === company.id;

            return (
              <div
                key={company.id}
                onMouseEnter={() => onHoverCompany(company.id)}
                onMouseLeave={() => onHoverCompany(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer ${
                  isHovered
                    ? 'bg-graphite border-platinum shadow-xl shadow-platinum/10 -translate-y-1'
                    : 'bg-graphite/85 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-platinum">
                      {company.number}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: company.accentColor }}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {company.name}
                  </h3>

                  <p className="text-xs text-silver font-mono">
                    {company.sector}
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light pt-1">
                    {company.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCompany(company)}
                    className="text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Detalles →
                  </button>

                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-platinum text-neutral-400 hover:text-white transition-colors"
                    aria-label={`Visitar sitio de ${company.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
