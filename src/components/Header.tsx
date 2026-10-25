/**
 * Header.tsx
 * Navegación superior de Grupo Hermosillo de Occidente.
 * - Logotipo a la izquierda, secciones al centro (mayúsculas espaciadas) y botón de Contacto.
 * - La sección visible se resalta en blanco con un brillo suave.
 */

import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { hermosilloData } from '../data/hermosilloData';
import { NAV_SECTIONS, SECTIONS, type SectionId } from '../data/sections';

interface HeaderProps {
  isLightMode?: boolean;
}

/** Sección que cruza la línea media de la pantalla */
function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('inicio');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export const Header: React.FC<HeaderProps> = ({ isLightMode = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sobre la sección clara (sin fondo en el header) el texto pasa a oscuro
  const onLight = isLightMode && !isScrolled;

  const linkClass = (isActive: boolean) =>
    isActive
      ? onLight
        ? 'text-ink'
        : 'text-white [text-shadow:0_0_14px_rgba(255,255,255,0.55)]'
      : onLight
        ? 'text-neutral-500 hover:text-ink'
        : 'text-neutral-400 hover:text-neutral-100';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,border-color] duration-300 ${
        isScrolled
          ? 'bg-ink/95 border-b border-white/5 py-3 shadow-xl shadow-black/30'
          : 'bg-gradient-to-b from-ink/70 to-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Logotipo */}
        <a href="#inicio" className="shrink-0" aria-label={`${hermosilloData.holding.name}, ir al inicio`}>
          <img
            src={hermosilloData.holding.logo}
            alt={hermosilloData.holding.name}
            width={117}
            height={48}
            className={`h-11 sm:h-12 w-auto transition-[filter] duration-300 ${onLight ? 'invert' : ''}`}
          />
        </a>

        {/* Secciones */}
        <nav aria-label="Secciones principales" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-12">
            {NAV_SECTIONS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block py-2 text-[12px] font-medium uppercase tracking-[0.3em] whitespace-nowrap transition-[color,text-shadow] duration-300 ${linkClass(isActive)}`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Acción principal */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contacto"
            aria-current={activeId === 'contacto' ? 'true' : undefined}
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors ${
              activeId === 'contacto'
                ? 'bg-platinum text-ink border-platinum'
                : onLight
                  ? 'border-ink/30 text-ink hover:bg-ink hover:text-paper'
                  : 'border-platinum/30 text-platinum hover:bg-platinum hover:text-ink'
            }`}
          >
            Contacto
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2.5 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 bg-graphite/80"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <nav id="menu-movil" aria-label="Secciones principales" className="lg:hidden mt-3 border-y border-neutral-800 bg-ink px-6 py-6">
          <ul className="flex flex-col gap-1">
            {SECTIONS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block py-3 text-[13px] font-medium uppercase tracking-[0.3em] ${
                      isActive ? 'text-white [text-shadow:0_0_14px_rgba(255,255,255,0.55)]' : 'text-neutral-400'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
