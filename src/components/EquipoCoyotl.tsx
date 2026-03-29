import { ESPECIALIDADES } from "@/lib/constants";

export default function EquipoCoyotl() {
  return (
    <section id="nosotros" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#8002f2]">
            Equipo Coyotl Can
          </p>
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl md:text-4xl">
            Un equipo de expertos respaldando a tu mascota
          </h2>
          <p className="mx-auto max-w-2xl text-[#555]">
            Médicos con formación UNAM y red de especialistas certificados, liderados por nuestra
            Directora Médica, para brindar atención integral en cada área.
          </p>
        </div>

        {/* Specialties grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ESPECIALIDADES.map((esp) => (
            <div
              key={esp.nombre}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#f5f5f5] p-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#8002f2]/10 text-2xl">
                {esp.icono}
              </span>
              <h3 className="mb-1 text-sm font-bold text-[#2d0057]">{esp.nombre}</h3>
              <p className="text-xs leading-relaxed text-[#555]">{esp.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
