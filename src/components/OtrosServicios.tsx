import { OTROS_SERVICIOS, CONTACTO } from "@/lib/constants";

export default function OtrosServicios() {
  return (
    <section className="bg-[#fafafa] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">
            Otros Servicios
          </h2>
          <p className="text-[#555]">Todo lo que tu mascota necesita, en un solo lugar.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OTROS_SERVICIOS.map((servicio) => (
            <div
              key={servicio.nombre}
              className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-3 text-3xl">{servicio.icono}</span>
              <h3 className="mb-2 font-bold text-[#2d0057]">{servicio.nombre}</h3>
              <p className="mb-4 flex-1 text-sm text-[#555]">{servicio.descripcion}</p>
              <a
                href={CONTACTO.whatsappMensaje}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-[#e5006b] px-5 py-2 text-sm font-bold text-[#e5006b] transition-colors hover:bg-[#e5006b] hover:text-white"
              >
                Agendar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
