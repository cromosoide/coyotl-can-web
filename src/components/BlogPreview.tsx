import Link from "next/link";

const PLACEHOLDER_POSTS = [
  {
    slug: "cuando-vacunar-cachorro",
    titulo: "¿Cuándo vacunar a tu cachorro? Guía completa",
    extracto: "Conoce el esquema de vacunación ideal para proteger a tu cachorro desde los primeros meses.",
    imagen: null,
    pilar: "Educativo",
  },
  {
    slug: "senales-emergencia-mascota",
    titulo: "5 señales de emergencia en tu mascota",
    extracto: "Aprende a identificar los signos de alerta que requieren atención veterinaria inmediata.",
    imagen: null,
    pilar: "Tips",
  },
  {
    slug: "cuidados-despues-intervencion",
    titulo: "Cuidados post-intervención de mínima invasión",
    extracto: "Tu mascota se recupera más rápido con estos cuidados esenciales en casa.",
    imagen: null,
    pilar: "Educativo",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-[#fafafa] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#70b62c]">Blog</p>
          <h2 className="mb-4 text-2xl font-extrabold text-[#2d0057] sm:text-3xl">
            Contenido para cuidar mejor a tu mascota
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_POSTS.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#8002f2]/10 to-[#e5006b]/10">
                <span className="text-4xl">🐾</span>
              </div>
              <div className="p-5">
                <span className="mb-2 inline-block rounded-full bg-[#70b62c]/10 px-3 py-1 text-xs font-bold text-[#70b62c]">
                  {post.pilar}
                </span>
                <h3 className="mb-2 font-bold text-[#2d0057]">{post.titulo}</h3>
                <p className="mb-4 text-sm text-[#555]">{post.extracto}</p>
                <span className="text-sm font-semibold text-[#e5006b]">
                  Leer más →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2d0057] px-6 py-3 text-sm font-bold text-[#2d0057] transition-colors hover:bg-[#2d0057] hover:text-white"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
