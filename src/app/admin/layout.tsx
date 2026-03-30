"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SIDEBAR_ITEMS } from "@/lib/dashboard-constants";
import { ToastProvider } from "@/components/admin/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#f9fafb]">
        {/* Sidebar - desktop */}
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="border-b border-gray-100 px-6 py-5">
              <h1 className="text-lg font-extrabold text-[#2d0057]">🐾 Coyotl Can</h1>
              <p className="text-xs text-[#555]">Panel Administrativo</p>
            </div>
            <nav className="flex-1 px-3 py-4">
              {SIDEBAR_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-[#ff006b]/10 text-[#ff006b]"
                        : "text-[#555] hover:bg-gray-50 hover:text-[#2d0057]"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-[#2d0057]/30" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-64 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-6 py-5">
                <h1 className="text-lg font-extrabold text-[#2d0057]">🐾 Coyotl Can</h1>
              </div>
              <nav className="px-3 py-4">
                {SIDEBAR_ITEMS.map((item) => {
                  const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        active ? "bg-[#ff006b]/10 text-[#ff006b]" : "text-[#555] hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-[#555] hover:bg-gray-100 lg:hidden"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-[#2d0057]">Panel Administrativo</span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-[#555] transition-colors hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
