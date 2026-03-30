export const SERVICIOS_LISTA = [
  "Consulta General",
  "Intervención de Mínima Invasión",
  "Odontología Veterinaria",
  "Vacunación",
  "Desparasitación",
  "Estancia Coyotl",
  "Estética Coyotl",
] as const;

export const PRECIOS_SERVICIO: Record<string, number> = {
  "Consulta General": 250,
  "Intervención de Mínima Invasión": 0,
  "Odontología Veterinaria": 0,
  "Vacunación": 350,
  "Desparasitación": 200,
  "Estancia Coyotl": 350,
  "Estética Coyotl": 250,
};

export const ORIGENES = ["Web/Landing", "WhatsApp", "Presencial", "Teléfono"] as const;

export const ESTADOS_CITA = ["pendiente", "confirmada", "atendida", "completada", "cancelada"] as const;

export const ESTADOS_PAGO = ["pendiente", "pagado"] as const;

export const ESTADOS_ESTANCIA = ["reservada", "checkin", "activa", "checkout"] as const;

export const CATEGORIAS_INVENTARIO = [
  "Medicamentos",
  "Vacunas",
  "Desparasitantes",
  "Alimento",
  "Material Quirúrgico",
  "Estética",
] as const;

export const PILARES_BLOG = [
  "P1 Educativo",
  "P2 Tips",
  "P3 Prueba social",
  "P4 Estética",
  "P5 Estancia",
  "P6 Detrás de cámaras",
  "P7 Campañas",
] as const;

export const COLOR_ESTADO: Record<string, string> = {
  pendiente: "#ffab00",
  confirmada: "#00c7ff",
  atendida: "#4bbb00",
  completada: "#888",
  cancelada: "#ff4444",
};

export const COLOR_ORIGEN: Record<string, string> = {
  "Web/Landing": "#00c7ff",
  WhatsApp: "#25D366",
  Presencial: "#ffab00",
  "Teléfono": "#888",
};

export const COLOR_PAGO: Record<string, string> = {
  pendiente: "#ffab00",
  pagado: "#4bbb00",
};

export const COLOR_ESTANCIA: Record<string, string> = {
  reservada: "#00c7ff",
  checkin: "#ffab00",
  activa: "#4bbb00",
  checkout: "#888",
};

export const COLOR_STOCK = {
  ok: "#4bbb00",
  bajo: "#ffab00",
  agotado: "#ff4444",
};

export const WHATSAPP_BASE = "https://wa.me/5215634461745";

export function whatsappUrl(mensaje: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(mensaje)}`;
}

export const SIDEBAR_ITEMS = [
  { key: "inicio", label: "Inicio", icon: "🏠", href: "/admin" },
  { key: "citas", label: "Citas", icon: "📋", href: "/admin/citas" },
  { key: "pacientes", label: "Pacientes", icon: "🐾", href: "/admin/pacientes" },
  { key: "inventario", label: "Inventario", icon: "📦", href: "/admin/inventario" },
  { key: "estancias", label: "Estancias", icon: "🏡", href: "/admin/estancias" },
  { key: "blog", label: "Blog", icon: "✍️", href: "/admin/blog-editor" },
  { key: "resenas", label: "Reseñas", icon: "⭐", href: "/admin/resenas" },
] as const;
