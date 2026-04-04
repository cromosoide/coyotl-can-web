"use client";

import { CONTACTO } from "@/lib/constants";
import FadeIn from "./animations/FadeIn";

export default function MapaContacto() {
  return (
    <section id="contacto" className="bg-[#f9fafb] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">Contacto</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl md:text-5xl">Visítanos en Lindavista</h2>
        </FadeIn>
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="overflow-hidden rounded-3xl border border-[#ff006b]/10 shadow-lg">
              <iframe src={CONTACTO.googleMapsEmbed} width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Coyotl Can veterinaria Lindavista CDMX" />
            </div>
          </FadeIn>
          <FadeIn direction="right" className="flex flex-col justify-center gap-7">
            {[
              { icono: "📍", titulo: "Dirección", texto: CONTACTO.direccion, color: "#ff006b" },
              { icono: "🕐", titulo: "Horario", texto: CONTACTO.horario, color: "#4bbb00" },
              { icono: "📞", titulo: "Teléfono", texto: CONTACTO.telefono, link: CONTACTO.telefonoLink, color: "#8b00fb" },
              { icono: "💬", titulo: "WhatsApp", texto: CONTACTO.whatsapp, link: CONTACTO.whatsappMensaje, external: true, color: "#25D366" },
              { icono: "✉️", titulo: "Email", texto: CONTACTO.email, link: `mailto:${CONTACTO.email}`, color: "#ffab00" },
            ].map((item) => (
              <div key={item.titulo} className="group flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl" style={{ backgroundColor: `${item.color}15` }}>{item.icono}</span>
                <div>
                  <p className="font-extrabold text-[#2d0057]">{item.titulo}</p>
                  {item.link ? (
                    <a href={item.link} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="text-sm text-[#ff006b] transition-colors hover:underline">{item.texto}</a>
                  ) : (
                    <p className="text-sm text-[#555]">{item.texto}</p>
                  )}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
