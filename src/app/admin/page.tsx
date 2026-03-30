"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Badge from "@/components/admin/Badge";
import { COLOR_ESTADO, COLOR_PAGO } from "@/lib/dashboard-constants";

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: string;
  payment_status: string;
  payment_amount: number;
  notes: string;
  owner: { name: string; phone: string } | null;
  patient: { name: string; species: string } | null;
}

export default function AdminHome() {
  const [todayAppts, setTodayAppts] = useState<Appointment[]>([]);
  const [activeStays, setActiveStays] = useState(0);
  const [lowStock, setLowStock] = useState<{ name: string }[]>([]);
  const [recentReviews, setRecentReviews] = useState(0);
  const [financials, setFinancials] = useState({ today: 0, week: 0, month: 0 });
  const [serviceBreakdown, setServiceBreakdown] = useState<{ service: string; count: number; total: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];

    const [appts, stays, stock, reviews, paidToday, paidWeek, paidMonth] = await Promise.all([
      supabase.from("appointments").select("*, owner:owners(*), patient:patients(*)").eq("date", today).order("time"),
      supabase.from("stays").select("id").in("status", ["checkin", "activa"]),
      supabase.from("inventory").select("name, stock_current, stock_minimum").filter("stock_current", "lte", "stock_minimum" as unknown as number),
      supabase.from("reviews").select("id").gte("created_at", weekAgo),
      supabase.from("appointments").select("payment_amount").eq("date", today).eq("payment_status", "pagado"),
      supabase.from("appointments").select("payment_amount").gte("date", weekAgo).eq("payment_status", "pagado"),
      supabase.from("appointments").select("payment_amount").gte("date", monthStart).eq("payment_status", "pagado"),
    ]);

    // Workaround: filter low stock client-side since Supabase doesn't support column-to-column comparison easily
    const lowStockItems = (stock.data || []).filter((i: any) => i.stock_current <= i.stock_minimum);

    setTodayAppts((appts.data || []) as unknown as Appointment[]);
    setActiveStays(stays.data?.length || 0);
    setLowStock(lowStockItems);
    setRecentReviews(reviews.data?.length || 0);
    setFinancials({
      today: (paidToday.data || []).reduce((s: number, r: any) => s + (r.payment_amount || 0), 0),
      week: (paidWeek.data || []).reduce((s: number, r: any) => s + (r.payment_amount || 0), 0),
      month: (paidMonth.data || []).reduce((s: number, r: any) => s + (r.payment_amount || 0), 0),
    });

    // Service breakdown for the month
    const breakdown = await supabase
      .from("appointments")
      .select("service, payment_amount")
      .gte("date", monthStart)
      .eq("payment_status", "pagado");

    const grouped: Record<string, { count: number; total: number }> = {};
    (breakdown.data || []).forEach((r: any) => {
      if (!grouped[r.service]) grouped[r.service] = { count: 0, total: 0 };
      grouped[r.service].count++;
      grouped[r.service].total += r.payment_amount || 0;
    });
    setServiceBreakdown(Object.entries(grouped).map(([service, v]) => ({ service, ...v })));

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-[#2d0057]">🏠 Inicio</h1>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Citas hoy" value={todayAppts.length} color="#ff006b" icon="📋" />
        <KPICard title="Estancias activas" value={activeStays} color="#8b00fb" icon="🏡" />
        <KPICard title="Stock bajo" value={lowStock.length} color={lowStock.length > 0 ? "#ff4444" : "#4bbb00"} icon="📦" />
        <KPICard title="Reseñas nuevas" value={recentReviews} color="#ffab00" icon="⭐" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agenda del día */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-[#2d0057]">📋 Agenda de hoy</h2>
          {todayAppts.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#555]">No hay citas para hoy 🐾</p>
          ) : (
            <div className="space-y-3">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-[#2d0057]">
                      {a.time?.slice(0, 5)} — {a.patient?.name || "Sin mascota"}
                    </p>
                    <p className="text-xs text-[#555]">{a.service} · {a.owner?.name || "Sin dueño"}</p>
                  </div>
                  <Badge label={a.status} color={COLOR_ESTADO[a.status] || "#888"} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finanzas */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-[#2d0057]">💰 Resumen financiero</h2>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#f9fafb] p-3 text-center">
              <p className="text-lg font-extrabold text-[#ff006b]">${financials.today.toLocaleString()}</p>
              <p className="text-xs text-[#555]">Hoy</p>
            </div>
            <div className="rounded-xl bg-[#f9fafb] p-3 text-center">
              <p className="text-lg font-extrabold text-[#8b00fb]">${financials.week.toLocaleString()}</p>
              <p className="text-xs text-[#555]">Semana</p>
            </div>
            <div className="rounded-xl bg-[#f9fafb] p-3 text-center">
              <p className="text-lg font-extrabold text-[#4bbb00]">${financials.month.toLocaleString()}</p>
              <p className="text-xs text-[#555]">Mes</p>
            </div>
          </div>

          {serviceBreakdown.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-[#555]">
                  <th className="pb-2">Servicio</th>
                  <th className="pb-2 text-center"># Citas</th>
                  <th className="pb-2 text-right">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {serviceBreakdown.map((s) => (
                  <tr key={s.service} className="border-b border-gray-50">
                    <td className="py-2 font-semibold text-[#2d0057]">{s.service}</td>
                    <td className="py-2 text-center">{s.count}</td>
                    <td className="py-2 text-right font-semibold text-[#4bbb00]">${s.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Alertas de inventario */}
        {lowStock.length > 0 && (
          <div className="rounded-2xl border border-[#ff4444]/30 bg-[#ff4444]/5 p-5 lg:col-span-2">
            <h2 className="mb-2 font-bold text-[#ff4444]">⚠ Productos con stock bajo</h2>
            <p className="text-sm text-[#555]">
              {lowStock.map((p) => p.name).join(", ")}
            </p>
          </div>
        )}

        {/* Recordatorios de mañana */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 font-bold text-[#2d0057]">📲 Recordatorios pendientes</h2>
          <TomorrowReminders />
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, color, icon }: { title: string; value: number; color: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-extrabold" style={{ color }}>{value}</span>
      </div>
      <p className="text-sm font-semibold text-[#555]">{title}</p>
    </div>
  );
}

function TomorrowReminders() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    supabase
      .from("appointments")
      .select("*, owner:owners(*), patient:patients(*)")
      .eq("date", tomorrow)
      .eq("status", "confirmada")
      .order("time")
      .then(({ data }) => {
        setReminders(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-sm text-[#555]">Cargando...</p>;
  if (reminders.length === 0) return <p className="text-sm text-[#555]">No hay recordatorios para mañana 🐾</p>;

  return (
    <div className="space-y-3">
      {reminders.map((r) => {
        const msg = `Hola ${r.owner?.name || ""}, le recordamos que mañana tiene cita en Coyotl Can para ${r.patient?.name || "su mascota"} a las ${r.time?.slice(0, 5)}. ¿Todo confirmado? 🐾`;
        return (
          <div key={r.id} className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[#2d0057]">
                {r.time?.slice(0, 5)} — {r.patient?.name} ({r.owner?.name})
              </p>
              <p className="text-xs text-[#555]">{r.service}</p>
            </div>
            <a
              href={`https://wa.me/5215634461745?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
            >
              Enviar recordatorio
            </a>
          </div>
        );
      })}
    </div>
  );
}
