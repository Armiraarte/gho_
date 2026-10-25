/**
 * App.tsx
 * GRUPO HERMOSILLO DE OCCIDENTE — Rediseño Web Corporativo
 * 
 * Regla Fundamental: UN SOLO PLANETA TIERRA 3D PERSISTENTE
 * - Un único Canvas WebGL en toda la aplicación.
 * - Una única instancia del planeta Tierra fotorrealista.
 * - Cambia de posición, tamaño, rotación y profundidad según el scroll del usuario
 *   (GSAP ScrollTrigger, ver components/3d/earthChoreography.ts).
 * - Coreografía sincronizada:
 *   Hero (centro) -> Corporativo (derecha) -> Hermosillo y Asociados (derecha)
 *   -> Hermosillo Inmobiliaria (izquierda) -> ARMiRARTE (derecha)
 *   -> Espacio Chapultepec (izquierda) -> Filosofía (pequeño y discreto, fondo blanco)
 *   -> Conexiones (centro con mayor escala y nodos activos) -> Contacto (centro composición final).
 */

import React, { useState, useRef, useCallback } from 'react';
import { EarthScene, EarthTransformState } from './components/3d/EarthScene';
import { useEarthChoreography, INITIAL_EARTH_STATE } from './components/3d/earthChoreography';
import { Header } from './components/Header';
import { HeroVideo } from './components/HeroVideo';
import { HeroSection } from './components/HeroSection';
import { CorporativoSection } from './components/CorporativoSection';
import { EcosistemaSection } from './components/EcosistemaSection';
import { FilosofiaSection } from './components/FilosofiaSection';
import { ConexionSection } from './components/ConexionSection';
import { ContactoSection } from './components/ContactoSection';
import { CompanyModal } from './components/CompanyModal';
import { CompanyInfo } from './data/hermosilloData';

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);
  const [hoveredCompanyId, setHoveredCompanyId] = useState<string | null>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Estado objetivo del planeta: GSAP ScrollTrigger lo escribe directamente
  // (sin re-render de React por cada evento de scroll) y EarthScene lo lee cada frame.
  const earthStateRef = useRef<EarthTransformState>({ ...INITIAL_EARTH_STATE });
  useEarthChoreography(earthStateRef, setIsLightMode);

  const handleScrollToCorporativo = () => {
    const el = document.getElementById('vision');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCompany = useCallback((comp: CompanyInfo) => {
    setSelectedCompany(comp);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCompany(null);
  }, []);

  return (
    <div
      className={`relative min-h-screen font-sans transition-colors duration-700 ${
        isLightMode ? 'bg-paper text-ink' : 'bg-ink text-paper'
      }`}
    >
      {/* 
        EL ÚNICO PLANETA TIERRA PERSISTENTE
        Permanece fijo en la ventana durante todo el scroll.
        Nunca se desmonta, nunca se duplica, nunca se reinicia.
      */}
      {/* Video aéreo de Guadalajara detrás del planeta (solo en el hero) */}
      <HeroVideo />

      <EarthScene
        stateRef={earthStateRef}
        onSelectCompany={handleSelectCompany}
        hoveredCompanyId={hoveredCompanyId}
      />

      {/* Top Navigation Bar */}
      <Header isLightMode={isLightMode} />

      {/* Main Single-Page Narrative Flow */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Intro & Hero */}
        <HeroSection onScrollDown={handleScrollToCorporativo} />

        {/* Sección 1 — El corporativo */}
        <CorporativoSection />

        {/* Sección 2 — Nuestro ecosistema (Las 4 empresas con coreografía de scroll) */}
        <EcosistemaSection onSelectCompany={handleSelectCompany} />

        {/* Sección 3 — Filosofía empresarial (Fondo blanco cálido, planeta discreto) */}
        <FilosofiaSection />

        {/* Sección 4 — Conexión empresarial (Planeta al centro, nodos luminosos) */}
        <ConexionSection
          onHoverCompany={setHoveredCompanyId}
          onSelectCompany={handleSelectCompany}
          hoveredCompanyId={hoveredCompanyId}
        />

        {/* Sección 5 — Contacto & Footer (Composición final continua) */}
        <ContactoSection />
      </main>

      {/* Modal de Detalle Exhaustivo para las 4 empresas */}
      <CompanyModal company={selectedCompany} onClose={handleCloseModal} />
    </div>
  );
}
