import Link from "next/link";
import FadeIn from "./animations/FadeIn";

const TOOLS = [
  {
    href: "/herramientas/sintomas",
    emoji: "🩺",
    titulo: "¿Mi mascota está enferma?",
    descripcion: "Responde unas preguntas y te orientamos sobre qué hacer con los síntomas de tu mascota.",
    color: "#ff006b",
  },
  {
    href: "/herramientas/vacunacion",
    emoji: "💉",
    titulo: "Calculadora de vacunación",
    descripcion: "Descubre qué vacunas necesita tu perro o gato según su edad y esquema actual.",
    color: "#4bbb00",
  },
  {
    href: "/herramientas/estancia",
    emoji: "🏡",
    titulo: "Cotiza tu Estancia",
    descripcion: "Calcula el costo de la estancia de tu mascota mientras sales de viaje.",
    color: "#8b00fb",
  },
];

export default function Herramientas() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#ff006b]/10 px-5 py-2 text-sm font-bold text-[#ff006b]">Herramientas gratuitas</span>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#2d0057] sm:text-4xl">
            Cuida a tu mascota desde casa
          </h2>
          <p className="mx-auto max-w-2xl text-[#555]">
            Usa nuestras herramientas interactivas para evaluar la salud de tu mascota, conocer su esquema de vacunación o cotizar una estancia.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <FadeIn key={tool.href} delay={i * 0.1}>
              <Link href={tool.href} className="group block rounded-3xl border-2 border-gray-200 bg-white p-7 text-center transition-all hover:border-[#ff006b]/30 hover:shadow-lg hover:shadow-[#ff006b]/5">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: `${tool.color}10` }}>
                  {tool.emoji}
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-[#2d0057]">{tool.titulo}</h3>
                <p className="mb-4 text-sm text-[#555]">{tool.descripcion}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: tool.color }}>
                  Empezar <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
