// @ts-nocheck
"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Badge from "@/components/admin/Badge";

interface Lead {
  id: string; name: string; phone: string; email: string;
  tool: string; data: any; created_at: string;
}

const TOOL_LABELS: Record<string, string> = {
  sintomas: "🩺 Síntomas",
  vacunacion: "💉 Vacunación",
  estancia: "🏡 Estancia",
};

const TOOL_COLORS: Record<string, string> = {
  sintomas: "#ff006b",
  vacunacion: "#4bbb00",
  estancia: "#8b00fb",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100);
    setLeads((data || []) as Lead[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#2d0057]">📊 Leads de Herramientas</h1>
        <p className="text-sm text-[#555]">Personas que usaron las herramientas del sitio web</p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" /></div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-3xl">📊</p>
          <p className="mt-2 text-sm text-[#555]">Aún no hay leads — llegarán cuando los usuarios usen las herramientas</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[#f9fafb] text-left text-xs font-semibold text-[#555]">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Herramienta</th>
                <th className="px-4 py-3">Datos</th>
                <th className="px-4 py-3">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 transition-colors hover:bg-[#f8f8f8]">
                  <td className="px-4 py-3 text-xs text-[#555]">
                    {new Date(lead.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-4 py-3 font-bold text-[#2d0057]">{lead.name || "—"}</td>
                  <td className="px-4 py-3">{lead.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge label={TOOL_LABELS[lead.tool] || lead.tool} color={TOOL_COLORS[lead.tool] || "#888"} />
                  </td>
                  <td className="px-4 py-3 text-xs text-[#555]">
                    {lead.data && typeof lead.data === "object"
                      ? Object.entries(lead.data).map(([k, v]) => (
                          <span key={k} className="mr-2">{k}: <strong>{Array.isArray(v) ? (v as string[]).join(", ") : String(v)}</strong></span>
                        ))
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.phone && (
                      <a href={`https://wa.me/52${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#25D366] px-3 py-1 text-xs font-bold text-white">
                        💬
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
