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
    imagen: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80",
    ctaText: "Agendar Consulta",
    ctaHref: "/landing/consulta",
    ctaExternal: false,
  },
  {
    id: "estancia",
    nombre: "Estancia Coyotl",
    subtitulo: "Cuidado profesional",
    descripcion:
      "Con profesionales que los cuidan como propios. Alimentación, cuidado diario y foto de tu mascota.",
    precio: "Desde $350/día",
    icono: "🏡",
    imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    ctaText: "Reservar Estancia",
    ctaHref: "/landing/estancia",
    ctaExternal: false,
  },
  {
    id: "estetica",
    nombre: "Estética Coyotl",
    subtitulo: "Servicio completo de belleza",
    descripcion:
      "Baño, corte, limpieza de oídos y más. Higiene profunda sin estrés para tu mascota.",
    precio: "Desde $300",
    icono: "✂️",
    imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80",
    ctaText: "Agendar Estética",
    ctaHref: "https://wa.me/525534461745?text=Hola%2C%20quisiera%20agendar%20un%20servicio%20de%20Est%C3%A9tica%20Coyotl",
    ctaExternal: true,
  },
  {
    id: "preventivo",
    nombre: "Preventivo",
    subtitulo: "Vacunación y desparasitación",
    descripcion:
      "Esquema de vacunación completo y desparasitación para mantener a tu mascota protegida.",
    precio: "Desde $200",
    icono: "💉",
    imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    ctaText: "Agendar Vacunación",
    ctaHref: "https://wa.me/525534461745?text=Hola%2C%20quisiera%20agendar%20una%20cita%20de%20Vacunaci%C3%B3n",
    ctaExternal: true,
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
    descripcion: "Limpieza dental y cuidado oral profesional.",
    icono: "🔬",
  },
  {
    nombre: "Odontología Veterinaria",
    descripcion: "Limpieza dental y cuidado oral profesional.",
    icono: "🦷",
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
    avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=120&q=80",
  },
  {
    nombre: "Roberto Hernández",
    mascota: "Michi · Gato Persa",
    texto:
      "Por fin una clínica que entiende a los gatos. Michi siempre odiaba ir al veterinario, pero aquí estuvo tranquilo. La atención es de primer nivel.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=120&q=80",
  },
  {
    nombre: "Ana Martínez",
    mascota: "Rocky · Bulldog",
    texto:
      "La atención a Rocky fue excepcional. Su dedicación y conocimiento son de primer nivel. No cambiaríamos de clínica por nada.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=120&q=80",
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
    titulo: "Medicina con alma",
    descripcion: "Cuidamos a tu familia animal con el trato que merece",
    icono: "⚡",
  },
] as const;
