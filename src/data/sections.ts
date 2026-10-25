/**
 * sections.ts
 * Secciones de la página: una sola fuente para el navbar, el footer y las anclas.
 * Los `id` son las anclas de la URL (#inicio, #vision…) y deben coincidir con el `id` de cada <section>.
 */

export const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'vision', label: 'Visión' },
  { id: 'sociedades', label: 'Sociedades' },
  { id: 'filosofia', label: 'Filosofía' },
  { id: 'conexion', label: 'Conexión' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** Enlaces del navbar (Contacto va aparte como botón) */
export const NAV_SECTIONS = SECTIONS.filter((s) => s.id !== 'contacto');
