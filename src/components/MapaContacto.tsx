import { CONTACTO } from "@/lib/constants";

export default function MapaContacto() {
  return (
    <section id="contacto" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#e5006b]">
            Contacto
          </p>
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">
            Visítanos en Lindavista
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <iframe
              src={CONTACTO.googleMapsEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Coyotl Can"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e5006b]/10 text-xl">
                📍
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">Dirección</p>
                <p className="text-sm text-[#555]">{CONTACTO.direccion}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#70b62c]/10 text-xl">
                🕐
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">Horario</p>
                <p className="text-sm text-[#555]">{CONTACTO.horario}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8002f2]/10 text-xl">
                📞
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">Teléfono</p>
                <a
                  href={CONTACTO.telefonoLink}
                  className="text-sm text-[#e5006b] hover:underline"
                >
                  {CONTACTO.telefono}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-xl">
                💬
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">WhatsApp</p>
                <a
                  href={CONTACTO.whatsappMensaje}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#e5006b] hover:underline"
                >
                  {CONTACTO.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fab200]/10 text-xl">
                ✉️
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">Email</p>
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="text-sm text-[#e5006b] hover:underline"
                >
                  {CONTACTO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
