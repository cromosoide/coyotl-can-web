"use client";

import FadeIn from "./animations/FadeIn";

const features = [
  { icono: "🐾", texto: "Cuidado profesional las 24 horas" },
  { icono: "🍽️", texto: "Alimentación personalizada" },
  { icono: "📸", texto: "Foto diaria de tu mascota" },
];

export default function EstanciaDestacada() {
  return (
    <section
      className="animate-gradient-shift relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, #8b00fb, #7400d4, #8b00fb, #a033fc)" }}
    >
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <FadeIn>
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white/90">Estancia Coyotl</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">Con profesionales que los cuidan como propios</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-10 text-lg text-white/70">Mientras tú descansas o viajas, tu mascota está en las mejores manos.</p>
            </FadeIn>
            <div className="mb-10 flex flex-col gap-4">
              {features.map((f, i) => (
                <FadeIn key={f.texto} delay={0.3 + i * 0.1} direction="left">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3">
                    <span className="text-2xl">{f.icono}</span>
                    <span className="text-sm font-semibold text-white">{f.texto}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.5}>
              <a href="/landing/estancia" className="inline-flex items-center gap-3 rounded-2xl bg-[#ffab00] px-9 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-[#e69a00] hover:shadow-2xl active:scale-95 sm:text-lg">
                Reservar Estancia
              </a>
            </FadeIn>
          </div>

          <FadeIn direction="scale" className="hidden lg:block">
            <img src="/coyotl-hero.png" alt="Mascota feliz en Estancia Coyotl Can Lindavista" className="rounded-3xl border-4 border-white/10 shadow-2xl" loading="lazy" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
