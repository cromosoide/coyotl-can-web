"use client";

import { useState, type ReactNode } from "react";
import FadeIn from "./animations/FadeIn";

interface FAQItem {
  q: string;
  a: ReactNode;
}

const WA_LINK = "https://wa.me/525634461745";

const FAQS: FAQItem[] = [
  {
    q: "¿Cuánto cuesta la consulta veterinaria en Lindavista?",
    a: (
      <>
        La consulta veterinaria general en Coyotl Can tiene un costo de <strong>$250 MXN</strong>. Incluye revisión completa de tu mascota, orientación sobre prevención y seguimiento personalizado. Somos una de las clínicas veterinarias con mejor relación calidad-precio en Lindavista y la alcaldía Gustavo A. Madero.{" "}
        <a href="/landing/consulta" className="font-semibold text-[#ff006b] underline">Agenda tu consulta aquí</a>.
      </>
    ),
  },
  {
    q: "¿Necesito hacer cita o puedo llegar directamente?",
    a: (
      <>
        Te recomendamos agendar tu cita para garantizar tu horario y reducir tiempos de espera. Puedes hacerlo directamente desde nuestra{" "}
        <a href="/landing/consulta" className="font-semibold text-[#ff006b] underline">página de citas</a>{" "}
        o por{" "}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">WhatsApp al 56 3446 1745</a>.
        {" "}Si prefieres llegar sin cita también te atendemos, pero podrías tener que esperar dependiendo de la demanda del día.
      </>
    ),
  },
  {
    q: "¿Qué es la Estancia Coyotl y cómo funciona?",
    a: (
      <>
        La Estancia Coyotl es nuestro servicio de cuidado profesional para tu mascota cuando sales de viaje, tienes una emergencia o simplemente no puedes estar con ella. Tu mascota queda con profesionales que la cuidan como propia: incluye alimentación personalizada, espacio limpio y cómodo, y te enviamos una <strong>foto diaria por WhatsApp</strong> para que veas cómo está. Es la alternativa ideal si buscas estancia para mascotas en la CDMX, especialmente en Lindavista y la zona norte.{" "}
        <a href="/landing/estancia" className="font-semibold text-[#ff006b] underline">Reserva tu estancia aquí</a>.
      </>
    ),
  },
  {
    q: "¿Atienden gatos además de perros?",
    a: (
      <>
        Sí, en Coyotl Can atendemos <strong>perros y gatos</strong>. Sabemos que los felinos necesitan un manejo diferente, por eso contamos con espacios diferenciados para que se sientan cómodos y seguros durante su visita. Si buscas un veterinario para gatos en Lindavista, estamos a tus órdenes.{" "}
        <a href={`${WA_LINK}?text=${encodeURIComponent("Hola, tengo un gato y quisiera agendar una consulta")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">Escríbenos por WhatsApp</a>.
      </>
    ),
  },
  {
    q: "¿Qué servicios de estética canina ofrecen?",
    a: (
      <>
        Estética Coyotl ofrece baño, corte, cepillado, limpieza de oídos y cuidado integral del pelaje de tu mascota. Lo que nos diferencia es que estamos dentro de una clínica veterinaria: si durante el servicio de estética detectamos algún problema de piel, oídos o parásitos, <strong>te avisamos en ese momento</strong> y podemos atenderlo de inmediato. Servicio de estética canina y felina en Lindavista, CDMX.{" "}
        <a href={`${WA_LINK}?text=${encodeURIComponent("Hola, quisiera agendar un servicio de Estética Coyotl")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">Agenda estética por WhatsApp</a>.
      </>
    ),
  },
  {
    q: "¿Cuál es el horario de atención de la clínica?",
    a: (
      <>
        Nuestro horario es de <strong>lunes a viernes de 11:00 a 19:00 hrs</strong> y <strong>sábados de 11:00 a 16:00 hrs</strong>. Los domingos permanecemos cerrados. Para agendar cita o consultar disponibilidad, escríbenos por{" "}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">WhatsApp</a>.
      </>
    ),
  },
  {
    q: "¿Dónde están ubicados exactamente?",
    a: (
      <>
        Coyotl Can está en <strong>Irapuato 11, colonia Lindavista, alcaldía Gustavo A. Madero, Ciudad de México, C.P. 07300</strong>. Estamos a una cuadra del metro Lindavista (Línea 6) y muy cerca de Avenida Montevideo. Si vienes desde Indios Verdes, Vallejo, Tepeyac, Industrial o Ticomán, llegas en menos de 10 minutos. Tenemos facilidad de estacionamiento en la calle.{" "}
        <a href="#contacto" className="font-semibold text-[#ff006b] underline">Ver mapa</a>.
      </>
    ),
  },
  {
    q: "¿Ofrecen servicio de vacunación para perros y gatos?",
    a: (
      <>
        Sí, ofrecemos esquemas de <strong>vacunación completos para perros y gatos</strong>: vacuna múltiple (moquillo, parvovirus, hepatitis), antirrábica (obligatoria en CDMX), leptospirosis y más. La vacunación empieza desde las 6-8 semanas de edad. Consulta nuestra{" "}
        <a href="/blog/cuando-vacunar-cachorro" className="font-semibold text-[#ff006b] underline">guía completa de vacunación</a>{" "}
        o{" "}
        <a href={`${WA_LINK}?text=${encodeURIComponent("Hola, quisiera agendar vacunación para mi mascota")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">agenda tu cita por WhatsApp</a>.
      </>
    ),
  },
  {
    q: "¿Qué incluye la Estancia Coyotl exactamente?",
    a: (
      <>
        La Estancia Coyotl incluye: <strong>cuidado profesional</strong> durante toda la estancia, <strong>alimentación personalizada</strong> según la dieta de tu mascota, espacio cómodo y limpio, y una <strong>foto diaria enviada por WhatsApp</strong> para que estés tranquilo. No usamos jaulas — tu mascota tiene espacio para moverse. Precio desde $350 MXN por noche.{" "}
        <a href="/landing/estancia" className="font-semibold text-[#ff006b] underline">Más información y reserva</a>.
      </>
    ),
  },
  {
    q: "¿Puedo pagar con tarjeta?",
    a: "Sí, aceptamos efectivo y tarjeta de débito/crédito. Próximamente habilitaremos pagos con transferencia SPEI.",
  },
  {
    q: "¿Cómo puedo agendar mi cita?",
    a: (
      <>
        Tienes 3 formas de agendar: <strong>1)</strong> Desde nuestra{" "}
        <a href="/landing/consulta" className="font-semibold text-[#ff006b] underline">página web</a>{" "}
        seleccionando fecha y hora disponible. <strong>2)</strong> Por{" "}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">WhatsApp al 56 3446 1745</a>.{" "}
        <strong>3)</strong> Llamando al 55 5754 5221. La forma más rápida es por la web — ves disponibilidad en tiempo real.
      </>
    ),
  },
  {
    q: "¿Qué es la intervención de mínima invasión?",
    a: (
      <>
        Es una técnica veterinaria avanzada que permite realizar procedimientos con incisiones muy pequeñas, lo que significa <strong>menos dolor, recuperación más rápida (8-10 días vs 30+)</strong> y menor riesgo para tu mascota. En Coyotl Can llevamos más de 500 intervenciones exitosas con esta técnica. Si tu mascota necesita un procedimiento y quieres saber si es candidata para mínima invasión,{" "}
        <a href={`${WA_LINK}?text=${encodeURIComponent("Hola, quisiera más información sobre intervención de mínima invasión")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">consúltanos por WhatsApp</a>.
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#fff0f7] px-5 py-2 text-sm font-bold text-[#ff006b]">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
            Preguntas frecuentes sobre veterinaria en Lindavista
          </h2>
          <p className="text-[#555]">
            Todo lo que necesitas saber sobre nuestros servicios veterinarios en la CDMX
          </p>
        </FadeIn>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div className="rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-bold text-[#2d0057] sm:text-base">{faq.q}</span>
                  <span className={`shrink-0 text-lg text-[#ff006b] transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[#555]">{faq.a}</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA after FAQ */}
        <FadeIn className="mt-10 text-center">
          <p className="mb-4 text-sm text-[#555]">¿No encuentras lo que buscas?</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#20b858] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
