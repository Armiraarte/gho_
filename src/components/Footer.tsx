/**
 * Footer.tsx
 * Pie de página de Grupo Hermosillo de Occidente:
 * - Logotipo del holding y lema
 * - Navegación a las secciones de la página
 * - Logotipos de las 4 empresas con enlace a su sitio
 * - Aviso de derechos
 */

import React from 'react';
import { hermosilloData } from '../data/hermosilloData';
import { SECTIONS } from '../data/sections';


export const Footer: React.FC = () => {
  const { holding, companies } = hermosilloData;

  return (
    <footer className="bg-ink-deep text-neutral-400 py-16 border-t border-neutral-900 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Logotipo y navegación */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-neutral-800/80">
          <div className="space-y-4">
            <img src={holding.logo} alt={holding.name} className="h-14 w-auto" />
            <p className="text-neutral-300 font-light max-w-sm">{holding.tagline}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-neutral-300 font-medium" aria-label="Secciones">
            {SECTIONS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Empresas del holding */}
        <div className="space-y-5">
          <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-widest">Empresas del Holding</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companies.map((c) => (
              <a
                key={c.id}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 items-center justify-center rounded-xl border border-neutral-800/80 bg-graphite/40 px-6 transition-colors hover:border-platinum/40 hover:bg-graphite"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-12 max-w-full w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Derechos */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 text-neutral-300 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} {holding.name}. Todos los derechos reservados.
          </div>
          <div>
            <span>Guadalajara, Jalisco · </span>
            <a href={holding.officialWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-platinum transition-colors">
              grupohermosillodeoccidente.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
