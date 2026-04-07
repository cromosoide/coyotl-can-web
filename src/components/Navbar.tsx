const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Herramientas", href: "/herramientas/sintomas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "#contacto" },
];

const WA_AGENDAR = "https://wa.me/525634461745?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Coyotl Can" className="h-10 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-[#333] transition-colors hover:text-[#ff006b]">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="/landing/consulta"
          className="hidden items-center gap-2 rounded-xl bg-[#ff006b] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#e6005f] hover:shadow-lg md:inline-flex"
        >
          Agendar cita
        </a>

        {/* Mobile hamburger — HTML puro con details/summary, zero JS */}
        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-[#333] [-webkit-appearance:none] [&::-webkit-details-marker]:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="block rounded-lg px-4 py-3 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]">
                {link.label}
              </a>
            ))}
            <a
              href={WA_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff006b] px-5 py-3 text-sm font-bold text-white"
            >
              Agendar cita
            </a>
          </div>
        </details>
      </div>
    </nav>
  );
}
