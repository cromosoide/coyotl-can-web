export const CONTACTO = {
  telefono: "55 5754 5221",
  telefonoLink: "tel:+525557545221",
  whatsapp: "56 3446 1745",
  whatsappLink: "https://wa.me/5215634461745",
  whatsappMensaje: "https://wa.me/5215634461745?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita",
  email: "hola@coyotlcan.mx",
  direccion: "Irapuato 11, Col. Lindavista, Alcaldía Gustavo A. Madero, CDMX",
  direccionCorta: "Irapuato 11, Lindavista, CDMX",
  horario: "Lun-Sáb: 9:00 - 20:00 | Dom: 10:00 - 14:00",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.5!2d-99.1297!3d19.4875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIrapuato+11%2C+Lindavista%2C+CDMX!5e0!3m2!1ses!2smx!4v1",
  redes: {
    instagram: "https://www.instagram.com/coyotlcan/",
    facebook: "https://www.facebook.com/coyotlcan/",
    tiktok: "https://www.tiktok.com/@coyotlcan",
  },
} as const;

export const SERVICIOS = [
  {
    id: "consulta",
    nombre: "Consulta Médica",
    subtitulo: "Revisión completa",
    descripcion:
      "Atención veterinaria integral con revisión completa, estudios y seguimiento personalizado para tu mascota.",
    precio: "$250",
    icono: "🩺",
    whatsappMsg:
      "https://wa.me/5215634461745?text=Hola%2C%20quiero%20agendar%20una%20consulta%20m%C3%A9dica",
  },
  {
    id: "estancia",
    nombre: "Estancia Coyotl",
    subtitulo: "Cuidado profesional",
    descripcion:
      "Con profesionales que los cuidan como propios. Alimentación, cuidado diario y foto de tu mascota.",
    precio: "Desde $350/día",
    icono: "🏡",
    whatsappMsg:
      "https://wa.me/5215634461745?text=Hola%2C%20quiero%20reservar%20una%20estancia",
  },
  {
    id: "estetica",
    nombre: "Estética Coyotl",
    subtitulo: "Grooming profesional",
    descripcion:
      "Baño, corte, limpieza de oídos y más. Higiene profunda sin estrés para tu mascota.",
    precio: "Desde $300",
    icono: "✂️",
    whatsappMsg:
      "https://wa.me/5215634461745?text=Hola%2C%20quiero%20agendar%20est%C3%A9tica%20para%20mi%20mascota",
  },
  {
    id: "preventivo",
    nombre: "Preventivo",
    subtitulo: "Vacunación y desparasitación",
    descripcion:
      "Esquema de vacunación completo y desparasitación para mantener a tu mascota protegida.",
    precio: "Desde $200",
    icono: "💉",
    whatsappMsg:
      "https://wa.me/5215634461745?text=Hola%2C%20quiero%20agendar%20vacunaci%C3%B3n",
  },
] as const;

export const OTROS_SERVICIOS = [
  {
    nombre: "Estancia Coyotl",
    descripcion: "Cuidado profesional mientras no estás.",
    icono: "🏡",
  },
  {
    nombre: "Estética Coyotl",
    descripcion: "Higiene profunda sin estrés.",
    icono: "✂️",
  },
  {
    nombre: "Laboratorio Interno",
    descripcion: "Resultados el mismo día para decisiones rápidas.",
    icono: "🔬",
  },
  {
    nombre: "Urgencias",
    descripcion: "Atención inmediata cuando más lo necesitas.",
    icono: "🚨",
  },
] as const;

export const ESPECIALIDADES = [
  { nombre: "Consulta Médica", descripcion: "Atención veterinaria integral", icono: "🩺" },
  { nombre: "Ortopedia", descripcion: "Corrección y rehabilitación estructural", icono: "🦴" },
  { nombre: "Oftalmología", descripcion: "Cuidado avanzado de la visión", icono: "👁️" },
  { nombre: "Radiología", descripcion: "Estudios de imagen inmediatos", icono: "📷" },
  {
    nombre: "Aves y Especies Exóticas",
    descripcion: "Atención especializada con médicos certificados",
    icono: "🦜",
  },
] as const;

export const REVIEWS = [
  {
    nombre: "María García",
    mascota: "Luna · Labrador",
    texto:
      "La intervención fue increíble. Luna se recuperó en solo 10 días y apenas tiene cicatriz. El equipo de Coyotl Can nos dio mucha confianza desde el primer momento.",
    rating: 5,
  },
  {
    nombre: "Roberto Hernández",
    mascota: "Michi · Gato Persa",
    texto:
      "Por fin una clínica que entiende a los gatos. Michi siempre odiaba ir al veterinario, pero aquí estuvo tranquilo. La atención es de primer nivel.",
    rating: 5,
  },
  {
    nombre: "Ana Martínez",
    mascota: "Rocky · Bulldog",
    texto:
      "Salvaron a Rocky de una emergencia. Su dedicación y conocimiento son excepcionales. No cambiaríamos de clínica por nada.",
    rating: 5,
  },
] as const;

export const STATS = {
  experiencia: "15+",
  familias: "1,000+",
  intervenciones: "+500",
} as const;

export const FEATURES = [
  {
    titulo: "Clínica de Referencia",
    descripcion: "Tu punto de confianza en Lindavista",
    icono: "🏥",
  },
  {
    titulo: "Atención integral",
    descripcion: "Cuidado completo para tu mascota",
    icono: "❤️",
  },
  {
    titulo: "Resultados el mismo día",
    descripcion: "Decisiones rápidas y claras",
    icono: "⚡",
  },
] as const;
