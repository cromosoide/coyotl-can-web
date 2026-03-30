"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACTO } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={prefersReduced ? {} : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-extrabold text-[#ff006b]">
          Coyotl Can
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-[#ff006b]"
                  : "text-[#333] hover:text-[#ff006b]"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[#ff006b]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <a
          href="/landing/consulta"
          className="hidden items-center gap-2 rounded-xl bg-[#8b00fb] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#7400d4] hover:shadow-lg active:scale-95 md:inline-flex"
        >
          Agendar cita
        </a>

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-200 bg-white px-4 pb-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/landing/consulta"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#8b00fb] px-5 py-3 text-sm font-bold text-white"
          >
            Agendar cita
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
