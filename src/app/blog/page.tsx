import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog · Coyotl Can · Clínica Veterinaria Integral",
  description: "Consejos, tips y contenido educativo para el cuidado de tu mascota.",
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 py-20">
      <span className="mb-4 text-5xl">🐾</span>
      <h1 className="mb-4 text-center text-3xl font-extrabold text-[#2d0057]">
        Blog Coyotl Can
      </h1>
      <p className="mb-8 max-w-md text-center text-[#555]">
        Pronto encontrarás aquí consejos, tips y contenido educativo para cuidar mejor a tu
        mascota. Estamos preparando contenido increíble.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[#e5006b] px-6 py-3 font-bold text-white transition-colors hover:bg-[#cc005f]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
