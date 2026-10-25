/**
 * Archivo de Configuración Corporativa - TERRA GROUP
 * Este archivo centraliza la información editable del corporativo, sus empresas,
 * indicadores de crecimiento, presencia global e historia institucional.
 */

export interface Company {
  id: string;
  name: string;
  shortName: string;
  sector: string;
  category: 'energia' | 'tecnologia' | 'logistica' | 'capital' | 'urbanismo' | 'biociencias';
  tagline: string;
  description: string;
  longDescription: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  keyProjects: string[];
  image: string;
  brandColor: string; // Accent color hex
  accentLight: string;
  founded: string;
  website: string;
}

export interface CorporateData {
  holding: {
    name: string;
    legalName: string;
    tagline: string;
    slogan: string;
    shortDescription: string;
    fullDescription: string;
    foundedYear: number;
    headquarters: string;
  };
  stats: {
    id: string;
    value: string;
    number: number;
    prefix?: string;
    suffix?: string;
    label: string;
    context: string;
  }[];
  institutional: {
    title: string;
    statement: string;
    mission: string;
    vision: string;
    values: {
      title: string;
      description: string;
    }[];
    milestones: {
      year: string;
      title: string;
      description: string;
    }[];
  };
  philosophy: {
    quote: string;
    lead: string;
    pillars: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  offices: {
    city: string;
    country: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    timezone: string;
  }[];
  companies: Company[];
}

export const corporateData: CorporateData = {
  holding: {
    name: "TERRA GROUP",
    legalName: "Terra Global Holdings S.A.",
    tagline: "Un mundo de empresas. Una visión de futuro.",
    slogan: "Liderazgo global a través de la diversificación estratégica",
    shortDescription: "Grupo empresarial multinacional con presencia en infraestructuras sostenibles, tecnología avanzada, logística internacional, desarrollo urbano e inversión de capital.",
    fullDescription: "Articulamos un ecosistema de compañías líderes en sus respectivos sectores, impulsando la innovación continua, la responsabilidad ambiental y la creación de valor a largo plazo para las comunidades y accionistas.",
    foundedYear: 1998,
    headquarters: "Paseo de la Castellana 216, Madrid · One Biscayne Tower, Miami",
  },

  stats: [
    {
      id: "companies",
      value: "6",
      number: 6,
      label: "Empresas del Grupo",
      context: "Consolidadas y autónomas",
    },
    {
      id: "continents",
      value: "4",
      number: 4,
      label: "Continentes",
      context: "Con operaciones y proyectos activos",
    },
    {
      id: "experience",
      value: "28+",
      number: 28,
      suffix: "+",
      label: "Años de Trayectoria",
      context: "Solidez y gobernanza institucional",
    },
    {
      id: "projects",
      value: "140+",
      number: 140,
      suffix: "+",
      label: "Proyectos Realizados",
      context: "Infraestructura, energía y tecnología",
    },
    {
      id: "collaborators",
      value: "12,500+",
      number: 12500,
      suffix: "+",
      label: "Colaboradores",
      context: "Equipo multidisciplinario global",
    },
    {
      id: "aum",
      value: "$4.2B",
      number: 4.2,
      prefix: "$",
      suffix: "B",
      label: "Activos Gestionados",
      context: "Patrimonio e infraestructura global",
    },
  ],

  institutional: {
    title: "Diferentes empresas. Una misma visión.",
    statement: "No concebimos el crecimiento como una simple acumulación de activos, sino como la responsabilidad de conectar capacidades humanas y tecnológicas para resolver los desafíos de nuestra era.",
    mission: "Impulsar el progreso socioeconómico y tecnológico mediante la creación y escalado de empresas de alto impacto, cimentadas en la excelencia operativa, el rigor ético y la sostenibilidad planetaria.",
    vision: "Consolidarnos como el conglomerado empresarial de referencia a nivel internacional por su capacidad de anticipar el futuro, integrar soluciones complejas y generar prosperidad compartida para las próximas generaciones.",
    values: [
      {
        title: "Integridad y Buen Gobierno",
        description: "Transparencia absoluta, cumplimiento normativo estricto y salvaguarda de la confianza depositada por nuestros socios e inversores.",
      },
      {
        title: "Innovación con Propósito",
        description: "Inversión sistemática en I+D y tecnologías limpias que generen ventajas competitivas reales y beneficio social medible.",
      },
      {
        title: "Sostenibilidad Planetaria",
        description: "Compromiso de cero emisiones netas en nuestras operaciones hacia 2040 y protección activa del capital natural.",
      },
      {
        title: "Visión Intergeneracional",
        description: "Estrategias de inversión paciente orientadas a la durabilidad y al legado, evitando el cortoplacismo especulativo.",
      },
    ],
    milestones: [
      {
        year: "1998",
        title: "Fundación del Grupo",
        description: "Inicio de actividades en ingeniería e infraestructuras estratégicas en el sur de Europa.",
      },
      {
        year: "2007",
        title: "Expansión Transatlántica",
        description: "Apertura de la sede regional en Miami y entrada al mercado logístico e inmobiliario del continente americano.",
      },
      {
        year: "2015",
        title: "Consorcio de Energía Limpia",
        description: "Creación de Terra Energy & Infrastructure con foco en parques eólicos marinos y plantas fotovoltaicas avanzadas.",
      },
      {
        year: "2021",
        title: "Ecosistema Tecnológico y Capital",
        description: "Lanzamiento de Terra Tech Innovations y Terra Capital para acelerar la transformación digital e industrial.",
      },
      {
        year: "Presente",
        title: "Ecosistema Global Integrado",
        description: "Seis divisiones sinérgicas operando con estándares ESG globales y un modelo corporativo descentralizado.",
      },
    ],
  },

  philosophy: {
    quote: "No solo construimos empresas. Conectamos oportunidades.",
    lead: "La fortaleza de Terra Group reside en la sinergia orgánica de nuestras subsidiarias: cuando la logística inteligente se combina con la energía limpia y el capital paciente, la escala del impacto no tiene precedentes.",
    pillars: [
      {
        number: "01",
        title: "Gobernanza Corporativa y Autonomía",
        description: "Cada empresa cuenta con su propio consejo de administración especializado, respaldado por la solidez financiera y los lineamientos éticos de la matriz.",
      },
      {
        number: "02",
        title: "Descarbonización y Criterios ESG",
        description: "Todas las decisiones de inversión deben superar rigurosas auditorías de huella de carbono y retorno social antes de su aprobación.",
      },
      {
        number: "03",
        title: "Innovación Abierta y Transferencia Tecnológica",
        description: "Los avances desarrollados en nuestros centros de I+D se transfieren de manera horizontal entre todas las compañías del consorcio.",
      },
      {
        number: "04",
        title: "Desarrollo del Talento Humano",
        description: "Fomentamos la movilidad interna, la formación continua de posgrado y la atracción de líderes con vocación transformadora.",
      },
    ],
  },

  offices: [
    {
      city: "Madrid",
      country: "España",
      role: "Sede Corporativa Europa & EMEA",
      address: "Paseo de la Castellana 216, Planta 28",
      phone: "+34 91 800 4500",
      email: "madrid@terragroup-holdings.com",
      timezone: "CET (UTC+1)",
    },
    {
      city: "Miami",
      country: "Estados Unidos",
      role: "Sede Regional Américas",
      address: "One Biscayne Tower, Suite 3400",
      phone: "+1 (305) 920-7400",
      email: "miami@terragroup-holdings.com",
      timezone: "EST (UTC-5)",
    },
    {
      city: "Ciudad de México",
      country: "México",
      role: "Centro de Operaciones LatAm",
      address: "Paseo de la Reforma 483, Torre Reforma",
      phone: "+52 55 4160 3800",
      email: "cdmx@terragroup-holdings.com",
      timezone: "CST (UTC-6)",
    },
    {
      city: "Singapur",
      country: "Singapur",
      role: "Hub Asia-Pacífico & Logística",
      address: "Marina Bay Financial Centre, Tower 2",
      phone: "+65 6712 9000",
      email: "singapore@terragroup-holdings.com",
      timezone: "SGT (UTC+8)",
    },
  ],

  companies: [
    {
      id: "terra-energy",
      name: "Terra Energy & Infrastructure",
      shortName: "Terra Energy",
      sector: "Energía Renovable & Redes Eléctricas",
      category: "energia",
      tagline: "Generación de energía limpia e infraestructuras resilientes",
      description: "Desarrollo, financiación y operación de macroparques eólicos marinos, plantas solares flotantes y redes eléctricas inteligentes de alta eficiencia.",
      longDescription: "Terra Energy lidera la transición hacia una matriz energética descarbonizada en Europa y América. Con más de 3.2 GW de capacidad instalada y en desarrollo, la empresa diseña soluciones de almacenamiento energético a escala de red y contratos PPA corporativos que garantizan suministro 100% renovable a grandes industrias.",
      location: "Madrid & Bilbao (España) / Cobertura Europa",
      coordinates: {
        lat: 40.4168,
        lng: -3.7038,
      },
      metrics: [
        { label: "Capacidad Renovable", value: "3.2 GW" },
        { label: "CO2 Evitado Anual", value: "2.8M Ton" },
        { label: "Parques en Operación", value: "24" },
      ],
      keyProjects: [
        "Parque Eólico Offshore Mar Cantábrico (450 MW)",
        "Complejo Solar Flotante Alentejo (220 MW)",
        "Baterías de Almacenamiento Grid-Scale Huelva (100 MWh)",
      ],
      image: "/src/assets/images/company_energy_infra_1792899900834.jpg",
      brandColor: "#0ea5e9", // Sky blue
      accentLight: "#38bdf8",
      founded: "2015",
      website: "https://energy.terragroup-holdings.com",
    },
    {
      id: "terra-tech",
      name: "Terra Tech Innovations",
      shortName: "Terra Tech",
      sector: "Software Empresarial, IA & Cloud",
      category: "tecnologia",
      tagline: "Inteligencia computacional e infraestructura digital soberana",
      description: "Desarrollo de arquitecturas de datos seguras, modelos de inteligencia artificial para optimización industrial y plataformas cloud de alta disponibilidad.",
      longDescription: "Terra Tech es el brazo de innovación tecnológica del conglomerado. Sus centros de investigación en Silicon Valley y Berlín desarrollan algoritmos de aprendizaje profundo para predecir fluctuaciones en cadenas de suministro globales, mantenimiento predictivo de turbinas y gemelos digitales de megaobras de infraestructura.",
      location: "San Francisco, CA (EE.UU.) & Berlín (Alemania)",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
      metrics: [
        { label: "Patentes Registradas", value: "68" },
        { label: "Uptime Cloud Global", value: "99.99%" },
        { label: "Inversión Anual en I+D", value: "$48M" },
      ],
      keyProjects: [
        "Plataforma Atlas OS para Gemelos Digitales de Ciudades",
        "Red Neural de Optimización Logística Intercontinental",
        "Infraestructura Segura Multi-Cloud Sovereign",
      ],
      image: "/src/assets/images/company_tech_innovation_1792899902141.jpg",
      brandColor: "#6366f1", // Indigo
      accentLight: "#818cf8",
      founded: "2019",
      website: "https://tech.terragroup-holdings.com",
    },
    {
      id: "terra-logistics",
      name: "Terra Logistics & Supply Chain",
      shortName: "Terra Logistics",
      sector: "Logística Multimodal & Puertos Inteligentes",
      category: "logistica",
      tagline: "Conexión fluida de corredores comerciales intercontinentales",
      description: "Operador de terminales marítimas automatizadas, flota de transporte descarbonizado y almacenes robotizados con trazabilidad blockchain.",
      longDescription: "Con presencia en los nodos portuarios estratégicos de Róterdam, Singapur, Panamá y Valencia, Terra Logistics garantiza el movimiento eficiente de mercancías críticas con los estándares más exigentes de puntualidad, seguridad y reducción de huella de carbono por tonelada métrica transportada.",
      location: "Singapur & Róterdam / Rutas Marítimas Globales",
      coordinates: {
        lat: 1.3521,
        lng: 103.8198,
      },
      metrics: [
        { label: "TEUs Movilizados", value: "2.1M / año" },
        { label: "Centros de Distribución", value: "32" },
        { label: "Países Conectados", value: "48" },
      ],
      keyProjects: [
        "Terminal de Contenedores Automatizada Puerto de Valencia",
        "Corredor Logístico Verde Transoceánico Asia-Europa",
        "Plataforma de Trazabilidad Cero-Papel para Carga Refrigerada",
      ],
      image: "/src/assets/images/company_logistics_port_1792899904145.jpg",
      brandColor: "#0284c7", // Ocean cyan
      accentLight: "#38bdf8",
      founded: "2008",
      website: "https://logistics.terragroup-holdings.com",
    },
    {
      id: "terra-urban",
      name: "Terra Urban Development",
      shortName: "Terra Urban",
      sector: "Arquitectura Biofílica & Ciudades Inteligentes",
      category: "urbanismo",
      tagline: "Entornos urbanos sostenibles y arquitectura corporativa icónica",
      description: "Diseño y edificación de distritos de uso mixto certificados LEED Platinum, torres corporativas bioclimáticas y espacios regenerativos.",
      longDescription: "Terra Urban concibe la arquitectura como un organismo vivo que dialoga con su entorno natural y social. Sus desarrollos integran jardines verticales con sistemas de recirculación de aguas grises, envolventes fotovoltaicas y materiales locales de baja huella de carbono, redefiniendo el skyline de las principales capitales.",
      location: "Miami, FL (EE.UU.) & Ciudad de México",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
      metrics: [
        { label: "Metros Cuadrados LEED", value: "1.4M m²" },
        { label: "Premios Internacionales", value: "19" },
        { label: "Eficiencia Hídrica", value: "-45%" },
      ],
      keyProjects: [
        "Torre Terra Aurora (Distrito Financiero Miami)",
        "Distrito Bioclimático Bosque Real (Ciudad de México)",
        "Complejo Corporativo Sostenible Castellana Norte (Madrid)",
      ],
      image: "/src/assets/images/company_urban_architecture_1792899902908.jpg",
      brandColor: "#10b981", // Emerald
      accentLight: "#34d399",
      founded: "2011",
      website: "https://urban.terragroup-holdings.com",
    },
    {
      id: "terra-capital",
      name: "Terra Capital & Investments",
      shortName: "Terra Capital",
      sector: "Banca Privada, Venture & Capital Paciente",
      category: "capital",
      tagline: "Asignación estratégica de capital hacia la economía real",
      description: "Vehículos de inversión directa en infraestructuras críticas, fondos de capital de riesgo para deep-tech y financiación estructurada sostenible.",
      longDescription: "Terra Capital administra el tesoro corporativo y gestiona fondos co-invertidos con fondos soberanos e institucionales globales. Su tesis se enfoca en activos tangibles y compañías con ventajas defensivas que aceleran la descarbonización industrial y la soberanía alimentaria y tecnológica.",
      location: "Londres (Reino Unido) & Madrid",
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
      metrics: [
        { label: "Capital Comprometido", value: "$1.8B" },
        { label: "TIR Neta Histórica", value: "14.2%" },
        { label: "Participaciones Activas", value: "18" },
      ],
      keyProjects: [
        "Fondo Terra Climate Transition Fund I ($600M)",
        "Financiación Estructurada de Concesiones Viales y de Agua",
        "Programa de Coinversión con Fondos de Pensiones Nórdicos",
      ],
      image: "/src/assets/images/corporate_hq_architectural_1792899900686.jpg",
      brandColor: "#f59e0b", // Amber gold
      accentLight: "#fbbf24",
      founded: "2003",
      website: "https://capital.terragroup-holdings.com",
    },
    {
      id: "terra-bio",
      name: "Terra Bio & Life Sciences",
      shortName: "Terra Bio",
      sector: "Biotecnología Agrícola & Biomateriales",
      category: "biociencias",
      tagline: "Ciencia regenerativa para la seguridad alimentaria planetaria",
      description: "Investigación aplicada en biofertilizantes microbianos, semillas resistentes a sequías y sustitutos bioplásticos a partir de residuos agroindustriales.",
      longDescription: "Terra Bio conjuga la biología sintética ética con el conocimiento agronómico tradicional. En sus laboratorios de biotecnología aplicada, científicos de doce nacionalidades desarrollan bioestimulantes que mejoran el rendimiento de cultivos sin contaminar acuíferos subterráneos.",
      location: "São Paulo (Brasil) & Valencia (España)",
      coordinates: {
        lat: -23.5505,
        lng: -46.6333,
      },
      metrics: [
        { label: "Hectáreas Regeneradas", value: "320,000" },
        { label: "Formulaciones Patentadas", value: "42" },
        { label: "Reducción de Químicos", value: "-60%" },
      ],
      keyProjects: [
        "Bioestimulante Microbiano TerraShield para Soja y Maíz",
        "Planta de Polímeros Compostables a partir de Caña de Azúcar",
        "Red de Laboratorios Agroecológicos Certificados LatAm",
      ],
      image: "/src/assets/images/company_energy_infra_1792899900834.jpg",
      brandColor: "#059669", // Dark emerald
      accentLight: "#10b981",
      founded: "2018",
      website: "https://bio.terragroup-holdings.com",
    },
  ],
};
