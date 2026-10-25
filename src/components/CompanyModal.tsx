/**
 * CompanyModal.tsx
 * Modal de Resumen Exhaustivo para cada una de las 4 empresas de Grupo Hermosillo de Occidente
 */

import React, { useEffect } from 'react';
import { CompanyInfo } from '../data/hermosilloData';
import { X, ExternalLink, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CompanyModalProps {
  company: CompanyInfo | null;
  onClose: () => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({ company, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (company) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [company, onClose]);

  if (!company) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={company.name} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-graphite-deep border border-neutral-700/80 rounded-2xl shadow-2xl overflow-y-auto z-10 text-white flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-graphite-deep border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-platinum">
              {company.number}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              División Oficial del Holding
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-silver">
              {company.sector}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {company.name}
            </h3>
            <p className="text-sm font-medium text-platinum pt-0.5">
              "{company.tagline}"
            </p>
          </div>

          {/* Photo */}
          <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden border border-neutral-800">
            <img
              src={company.image}
              alt={company.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-deep/90 via-transparent to-transparent" />
          </div>

          {/* Extended Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-silver">
              Alcance y Especialización
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {company.longDescription}
            </p>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-silver">
              Servicios & Capacidades Principales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {company.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs text-neutral-300 p-2.5 rounded-lg bg-graphite/60 border border-neutral-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-platinum shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-platinum" />
              <span>Entidad 100% integrada en Grupo Hermosillo de Occidente</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-ink bg-platinum hover:bg-white rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Ir al Sitio Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
