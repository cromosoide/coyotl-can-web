import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog · Consejos Veterinarios · Coyotl Can · Lindavista CDMX",
  description:
    "Tips de salud animal, prevención y cuidados para tu mascota. Contenido educativo de Coyotl Can, clínica veterinaria en Lindavista, CDMX. Vacunación, estética canina, estancia y más.",
  openGraph: {
    title: "Blog · Consejos Veterinarios · Coyotl Can",
    description: "Tips de salud animal, prevención y cuidados para tu mascota en Lindavista, CDMX.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Coyotl Can · Veterinaria Lindavista",
  },
  alternates: {
    canonical: "https://coyotl-can.vercel.app/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="mb-8 text-xs text-[#555]">
          <a href="/" className="text-[#ff006b] hover:underline">Inicio</a>
          <span className="mx-2">›</span>
          <span>Blog</span>
        </nav>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-[#2d0057] sm:text-4xl">Blog Coyotl Can</h1>
          <p className="text-[#555]">Consejos y tips para cuidar mejor a tu mascota en Lindavista, CDMX</p>
        </div>
        <BlogClient />
      </div>
    </main>
  );
}
