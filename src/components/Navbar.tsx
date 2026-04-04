"use client";

import { useEffect, useState } from "react";
import { CONTACTO } from "@/lib/constants";
import AgendaModal from "./AgendaModal";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Coyotl Can" className="h-10 w-auto" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-[#333] transition-colors hover:text-[#ff006b]">
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setShowAgenda(true)}
          className="hidden items-center gap-2 rounded-xl bg-[#ff006b] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#e6005f] hover:shadow-lg active:scale-95 md:inline-flex"
        >
          Agendar cita
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#333] md:hidden"
          aria-label="Menú"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]">
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); setShowAgenda(true); }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff006b] px-5 py-3 text-sm font-bold text-white"
          >
            Agendar cita
          </button>
        </div>
      )}
    </nav>

    <AgendaModal open={showAgenda} onClose={() => setShowAgenda(false)} defaultService="Consulta General" />
    </>
  );
}
