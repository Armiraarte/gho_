/**
 * ContactoSection.tsx
 * Sección 5 — Contacto & Cierre de Grupo Hermosillo de Occidente:
 * - El planeta 3D se centra con iluminación noble transmitiendo continuidad
 * - Titular: "Construyamos nuevas posibilidades."
 * - Formulario corporativo con validación y respuesta instantánea
 * - Datos reales del holding y enlaces a las cuatro empresas
 * - Pie de página (componente Footer)
 */

import React, { useState } from 'react';
import { hermosilloData } from '../data/hermosilloData';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Footer } from './Footer';

export const ContactoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    division: 'holding',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contacto"
      className="relative z-10 pt-32 text-white border-t border-neutral-900 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* Contact Master Headline */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-silver uppercase">
            <span>RELACIONES CORPORATIVAS</span>
            <span aria-hidden="true">·</span>
            <span>OCCIDENTE DE MÉXICO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
            Construyamos nuevas posibilidades.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto">
            Le invitamos a conocer las oportunidades de colaboración, asesoría legal, gestión inmobiliaria patrimonial o innovación tecnológica con Grupo Hermosillo de Occidente.
          </p>
        </div>

        {/* 2-Column Split: Institutional Contact Info + Corporate Inbound Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Corporate HQ */}
          <div className="lg:col-span-5 space-y-8 p-8 rounded-2xl bg-graphite/90 border border-neutral-800/80">
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Sede Central del Holding
              </h3>
              <p className="text-xs text-silver font-mono mt-1">
                Guadalajara, Jalisco, México
              </p>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-platinum shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Ubicación</div>
                  <div className="text-neutral-400 font-light text-xs pt-0.5">
                    {hermosilloData.holding.headquarters}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-platinum shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Correo Electrónico</div>
                  <a
                    href={`mailto:${hermosilloData.holding.contactEmail}`}
                    className="text-neutral-400 hover:text-white font-light text-xs pt-0.5 transition-colors"
                  >
                    {hermosilloData.holding.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-platinum shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Teléfono de Enlace</div>
                  <a
                    href={`tel:${hermosilloData.holding.contactPhone}`}
                    className="text-neutral-400 hover:text-white font-light text-xs pt-0.5 transition-colors"
                  >
                    {hermosilloData.holding.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/80">
              <div className="text-xs font-mono uppercase tracking-wider text-silver mb-3">
                Enlaces a Sitios Oficiales:
              </div>
              <div className="flex flex-col gap-2">
                {hermosilloData.companies.map((comp) => (
                  <a
                    key={comp.id}
                    href={comp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-neutral-300 hover:text-platinum transition-colors py-1 border-b border-neutral-800/40 last:border-0"
                  >
                    <span>{comp.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inbound Corporate Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-graphite/95 border border-neutral-800/90 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Mensaje Transmitido con Éxito
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto font-light">
                  Agradecemos su interés en Grupo Hermosillo de Occidente. Su comunicación ha sido canalizada a la dirección correspondiente.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre o razón social"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-platinum transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-platinum transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      División de Interés
                    </label>
                    <div className="relative">
                    <select
                      value={formData.division}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-ink/90 border border-neutral-800 text-white text-sm focus:outline-none focus:border-platinum transition-colors cursor-pointer"
                    >
                      <option value="holding">Holding General</option>
                      <option value="legal">Hermosillo y Asociados (Servicios Jurídicos)</option>
                      <option value="inmobiliaria">Hermosillo Inmobiliaria (Venta/Renta)</option>
                      <option value="tech">ARMiRARTE (Software e Inteligencia Artificial)</option>
                      <option value="oficinas">Espacio Chapultepec (Oficinas Ejecutivas)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Mensaje o Propuesta *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detalle los requerimientos o consulta para el corporativo..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-platinum transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-ink bg-platinum hover:bg-white rounded-xl transition-all shadow-md shadow-black/40 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Transmitiendo...' : 'Enviar Mensaje Corporativo'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Pie de página (fondo sólido: el planeta no pasa por detrás del texto) */}
      <div className="mt-32">
        <Footer />
      </div>
    </section>
  );
};
