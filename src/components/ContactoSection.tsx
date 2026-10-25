/**
 * ContactoSection.tsx
 * Sección 5 — Contacto & Cierre de Grupo Hermosillo de Occidente:
 * - El planeta 3D asoma bajo el titular como composición final
 * - Titular: "Construyamos nuevas posibilidades."
 * - Pie de página (componente Footer)
 */

import React from 'react';
import { Footer } from './Footer';

export const ContactoSection: React.FC = () => {
  return (
    <section
      id="contacto"
      className="relative z-10 pt-32 text-white border-t border-neutral-900 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
            <span>RELACIONES CORPORATIVAS</span>
            <span aria-hidden="true">·</span>
            <span>GUADALAJARA, JALISCO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
            Construyamos nuevas posibilidades.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto">
            Le invitamos a conocer las oportunidades de colaboración, asesoría legal, gestión inmobiliaria patrimonial o innovación tecnológica con Grupo Hermosillo de Occidente.
          </p>
        </div>
      </div>

      {/* Espacio para que el planeta cierre la composición antes del pie de página */}
      <div className="h-[40vh] min-h-[260px]" aria-hidden="true" />

      {/* Pie de página (fondo sólido: el planeta no pasa por detrás del texto) */}
      <Footer />
    </section>
  );
};
