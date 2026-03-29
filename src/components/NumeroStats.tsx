"use client";

import ScrollReveal from "./animations/ScrollReveal";
import AnimatedCounter from "./animations/AnimatedCounter";

const stats = [
  { target: 15, suffix: "+", label: "Años de experiencia", sublabel: "Cuidando a tu familia animal", color: "#ff006b" },
  { target: 1000, suffix: "+", label: "Familias atendidas", sublabel: "Que confían en nosotros", color: "#8b00fb" },
  { target: 500, suffix: "+", label: "Intervenciones exitosas", sublabel: "De mínima invasión", color: "#4bbb00" },
  { target: 5, suffix: ".0", label: "Estrellas en Google", sublabel: "Calificación perfecta", color: "#ffab00" },
];

export default function NumeroStats() {
  return (
    <section className="relative overflow-hidden bg-[#ff006b] py-20 sm:py-28">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm font-bold text-white">
            Números que hablan
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            La confianza se mide en resultados
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  className="block text-5xl font-extrabold sm:text-6xl"
                  duration={2.5}
                />
                <div
                  className="mx-auto my-4 h-1 w-12 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <p className="text-base font-bold text-white">{stat.label}</p>
                <p className="mt-1 text-sm text-white/50">{stat.sublabel}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
