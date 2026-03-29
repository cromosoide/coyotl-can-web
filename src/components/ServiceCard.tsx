"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ServiceCardProps {
  nombre: string;
  subtitulo: string;
  descripcion: string;
  precio: string;
  icono: string;
  whatsappMsg: string;
  index?: number;
}

export default function ServiceCard({
  nombre,
  subtitulo,
  descripcion,
  precio,
  icono,
  whatsappMsg,
  index = 0,
}: ServiceCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={prefersReduced ? {} : { y: -6, scale: 1.03 }}
      className="group flex flex-col rounded-3xl border border-[#ff006b]/10 bg-white p-7 shadow-sm transition-shadow will-change-transform hover:shadow-xl hover:shadow-[#ff006b]/10"
    >
      {/* Icon + badge */}
      <div className="mb-5 flex items-start justify-between">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff006b]/8 text-3xl transition-transform group-hover:rotate-3">
          {icono}
        </span>
        <span className="rounded-full bg-[#ff006b]/10 px-4 py-1.5 text-xs font-bold text-[#ff006b]">
          {precio}
        </span>
      </div>

      {/* Content */}
      <h3 className="mb-1 text-lg font-extrabold text-[#2d0057]">{nombre}</h3>
      <p className="mb-3 text-sm font-semibold text-[#ff006b]">{subtitulo}</p>
      <p className="mb-7 flex-1 text-sm leading-relaxed text-[#555]">{descripcion}</p>

      {/* CTA — violeta */}
      <a
        href={whatsappMsg}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(nombre)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8b00fb] px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#7400d4] hover:shadow-lg hover:shadow-[#8b00fb]/25 active:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Agendar
      </a>
    </motion.div>
  );
}
