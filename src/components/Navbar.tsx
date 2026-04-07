const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "#contacto" },
];

const TOOLS = [
  { label: "🩺 ¿Mi mascota está enferma?", href: "/herramientas/sintomas" },
  { label: "💉 Calculadora de vacunación", href: "/herramientas/vacunacion" },
  { label: "🏡 Cotiza tu Estancia", href: "/herramientas/estancia" },
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

          {/* Herramientas dropdown — HTML details/summary */}
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-[#333] transition-colors hover:text-[#ff006b] [-webkit-appearance:none] [&::-webkit-details-marker]:hidden">
              Herramientas
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </summary>
            <div className="absolute left-0 top-10 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
              {TOOLS.map((tool) => (
                <a key={tool.href} href={tool.href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]">
                  {tool.label}
                </a>
              ))}
            </div>
          </details>
        </div>

        {/* Desktop CTA */}
        <a
          href="/landing/consulta"
          className="hidden items-center gap-2 rounded-xl bg-[#ff006b] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#e6005f] hover:shadow-lg md:inline-flex"
        >
          Agendar cita
        </a>

        {/* Mobile hamburger */}
        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-[#333] [-webkit-appearance:none] [&::-webkit-details-marker]:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="block rounded-lg px-4 py-3 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]">
                {link.label}
              </a>
            ))}
            {/* Herramientas submenu inline */}
            <p className="mt-2 px-4 text-xs font-bold uppercase tracking-wider text-[#ff006b]">Herramientas</p>
            {TOOLS.map((tool) => (
              <a key={tool.href} href={tool.href} className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-[#333] transition-colors hover:bg-[#fff0f7] hover:text-[#ff006b]">
                {tool.label}
              </a>
            ))}
            <a
              href={WA_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff006b] px-5 py-3 text-sm font-bold text-white"
            >
              Agendar cita
            </a>
          </div>
        </details>
      </div>
    </nav>
  );
}
