/**
 * hermosilloData.ts
 * Información oficial e integral de GRUPO HERMOSILLO DE OCCIDENTE
 * y sus cuatro empresas matrices:
 * 1. Hermosillo y Asociados
 * 2. Hermosillo Inmobiliaria
 * 3. ARMiRARTE
 * 4. Espacio Chapultepec
 */

// Importadas para que Vite las incluya en el build de producción
import imgAsociados from '../assets/images/hermosillo_asociados_legal_1792901403390.jpg';
import imgInmobiliaria from '../assets/images/hermosillo_inmobiliaria_realestate_1792901404087.jpg';
import imgArmirarte from '../assets/images/armirarte_tech_software_1792901404290.jpg';
import imgChapultepec from '../assets/images/espacio_chapultepec_offices_1792901404101.jpg';
import logoGrupo from '../assets/images/logos/grupo-hermosillo-de-occidente.png';
import logoAsociados from '../assets/images/logos/hermosillo-y-asociados.png';
import logoInmobiliaria from '../assets/images/logos/hermosillo-inmobiliaria.png';
import logoArmirarte from '../assets/images/logos/armirarte.png';
import logoChapultepec from '../assets/images/logos/espacio-chapultepec-blanco.png';

export interface CompanyInfo {
  id: string;
  number: string;
  name: string;
  shortName: string;
  sector: string;
  tagline: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  image: string;
  url: string;
  accentColor: string;
  /** Logotipo en blanco sobre transparente (para fondos oscuros) */
  logo: string;
  // Punto en el planeta: los 4 nodos forman una constelación alrededor de Guadalajara
  markerPosition: {
    lat: number;
    lng: number;
  };
}

export const hermosilloData = {
  holding: {
    name: "GRUPO HERMOSILLO DE OCCIDENTE",
    shortName: "Grupo Hermosillo",
    /** Logotipo en blanco sobre transparente */
    logo: logoGrupo,
    tagline: "Un grupo. Múltiples horizontes.",
    visionTitle: "Una visión que integra múltiples industrias.",
    description:
      "Grupo Hermosillo de Occidente es un holding empresarial que integra servicios jurídicos, gestión inmobiliaria, desarrollo tecnológico y espacios corporativos bajo una misma visión de crecimiento, profesionalismo e innovación.",
    officialWebsite: "https://grupohermosillodeoccidente.com",
    contactEmail: "contacto@grupohermosillodeoccidente.com",
    contactPhone: "+52 (33) 3616 8000",
    headquarters: "Av. Chapultepec Sur, Guadalajara, Jalisco, México",
  },

  philosophy: {
    title: "La fortaleza de pertenecer a algo más grande.",
    description:
      "El valor de nuestro holding radica en la conjunción sinérgica de disciplinas esenciales para la economía moderna: la certeza del derecho, el valor del patrimonio, la potencia de la tecnología y la infraestructura del trabajo.",
    pillars: [
      {
        number: "01",
        title: "Gestión Estratégica",
        description:
          "Gobierno corporativo centralizado con visión a largo plazo, garantizando solidez patrimonial y sinergia transversal entre cada empresa.",
      },
      {
        number: "02",
        title: "Excelencia Profesional",
        description:
          "Rigor y especialización técnica inquebrantables en cada una de las industrias que abarcamos, respaldados por trayectorias reconocidas.",
      },
      {
        number: "03",
        title: "Ética Empresarial",
        description:
          "Transparencia, cumplimiento irrestricto de la ley y confianza mutua depositada por nuestros clientes, aliados y colaboradores.",
      },
      {
        number: "04",
        title: "Innovación y Evolución",
        description:
          "Adopción activa de herramientas de vanguardia, inteligencia artificial y metodologías ágiles para liderar la transformación de cada sector.",
      },
    ],
  },

  companies: [
    {
      id: "hermosillo-asociados",
      number: "01",
      name: "Hermosillo y Asociados",
      shortName: "Hermosillo Legal",
      sector: "Servicios Jurídicos, Consultoría y Asesoría Legal",
      tagline: "Certeza jurídica, consultoría estratégica y blindaje corporativo",
      description:
        "Firma legal especializada en asesoría corporativa, litigio estratégico, consultoría patrimonial y derecho mercantil. Protegemos los intereses legales y operativos de empresas y particulares.",
      longDescription:
        "Hermosillo y Asociados se erige como el pilar jurídico del holding. Con una trayectoria caracterizada por la integridad y la profundidad analítica, la firma acompaña a líderes de negocio en transacciones complejas, auditorías legales preventivas, estructuración contractual y resolución de controversias con los más rigurosos estándares éticos.",
      capabilities: [
        "Derecho Corporativo y Mercantil",
        "Estructuración y Blindaje Patrimonial",
        "Litigio Estratégico y Arbitraje",
        "Cumplimiento Normativo (Compliance)",
      ],
      image: imgAsociados,
      logo: logoAsociados,
      url: "https://grupohermosillodeoccidente.com/hermosillo-y-asociados",
      accentColor: "#E5E4E2",
      markerPosition: { lat: 22.2, lng: -103.35 }, // Norte de Guadalajara
    },
    {
      id: "hermosillo-inmobiliaria",
      number: "02",
      name: "Hermosillo Inmobiliaria",
      shortName: "Hermosillo Inmuebles",
      sector: "Comercialización, Venta, Renta y Gestión de Propiedades",
      tagline: "Intermediación inmobiliaria de alto nivel y valor patrimonial",
      description:
        "Especialistas en la comercialización, promoción, compraventa y arrendamiento de inmuebles residenciales, corporativos e industriales de alto perfil. No operamos como constructora; gestionamos transacciones de excelencia.",
      longDescription:
        "Hermosillo Inmobiliaria enfoca su experiencia en el mercado de bienes raíces premium. Brindamos asesoría personalizada en avalúos comerciales, estrategias de colocación inmobiliaria, análisis de plusvalía y negociación integral para propietarios, compradores e inversionistas que buscan maximizar el rendimiento de sus activos inmobiliarios.",
      capabilities: [
        "Venta y Renta de Inmuebles de Alto Perfil",
        "Gestión Integral de Arrendamientos Corporativos",
        "Valuación y Análisis Estratégico de Mercado",
        "Asesoría en Portafolios de Inversión Inmobiliaria",
      ],
      image: imgInmobiliaria,
      logo: logoInmobiliaria,
      url: "https://grupohermosillodeoccidente.com/hermosillo-inmobiliaria",
      accentColor: "#A9A9A6",
      markerPosition: { lat: 20.67, lng: -101.85 }, // Oriente de Guadalajara
    },
    {
      id: "armirarte",
      number: "03",
      name: "ARMiRARTE",
      shortName: "ARMiRARTE Tech",
      sector: "Desarrollo de Software, Inteligencia Artificial, Automatización y Tecnología",
      tagline: "Ingeniería de software de vanguardia y sistemas de inteligencia artificial",
      description:
        "Desarrollo de plataformas digitales a medida, algoritmos de inteligencia artificial aplicada, soluciones de automatización de procesos empresariales y consultoría tecnológica de alto impacto.",
      longDescription:
        "ARMiRARTE constituye el motor de innovación y desarrollo digital del conglomerado. Diseña arquitecturas de software robustas, modelos de aprendizaje automatizado y herramientas de automatización operativa que optimizan flujos de trabajo corporativos, permitiendo a las organizaciones escalar con eficiencia, seguridad y liderazgo tecnológico.",
      capabilities: [
        "Desarrollo de Software Empresarial a Medida",
        "Modelos e Integraciones de Inteligencia Artificial",
        "Automatización de Procesos (RPA & Workflows)",
        "Arquitectura Cloud & Ciberseguridad Aplicada",
      ],
      image: imgArmirarte,
      logo: logoArmirarte,
      url: "https://grupohermosillodeoccidente.com/armirarte",
      accentColor: "#E5E4E2",
      markerPosition: { lat: 20.67, lng: -104.85 }, // Poniente de Guadalajara
    },
    {
      id: "espacio-chapultepec",
      number: "04",
      name: "Espacio Chapultepec",
      shortName: "Espacio Chapultepec",
      sector: "Oficinas, Espacios Corporativos y Entornos Empresariales",
      tagline: "Entornos ejecutivos concebidos para el prestigio y la productividad",
      description:
        "Renta de oficinas privadas, salas de juntas equipadas y entornos empresariales prémium situados en la zona corporativa y financiera más emblemática de Guadalajara.",
      longDescription:
        "Espacio Chapultepec ofrece una infraestructura de primer nivel para empresas, despachos y profesionales exigentes. Combina diseño arquitectónico funcional, tecnología de conectividad de alta velocidad, amenidades ejecutivas y servicios administrativos integrales que proyectan una imagen corporativa impecable y favorecen la productividad.",
      capabilities: [
        "Oficinas Privadas Ejecutivas Amuebladas",
        "Salas de Juntas con Tecnología de Telepresencia",
        "Domicilio Fiscal y Comercial Corporativo",
        "Servicios de Recepción y Hospitalidad Empresarial",
      ],
      image: imgChapultepec,
      logo: logoChapultepec,
      url: "https://grupohermosillodeoccidente.com/espacio-chapultepec",
      accentColor: "#A9A9A6",
      markerPosition: { lat: 19.17, lng: -103.35 }, // Sur de Guadalajara
    },
  ] as CompanyInfo[],
};
