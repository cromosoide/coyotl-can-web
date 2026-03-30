"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import Badge from "@/components/admin/Badge";
import { COLOR_ESTADO, COLOR_PAGO, SERVICIOS_LISTA, PRECIOS_SERVICIO, ORIGENES } from "@/lib/dashboard-constants";
import * as XLSX from "xlsx";

interface Owner { id: string; name: string; phone: string; email: string; address: string; }
interface Patient {
  id: string; name: string; species: string; breed: string; birth_date: string;
  weight: number; notes: string; owner_id: string; owner: Owner | null;
}
interface Appt {
  id: string; date: string; time: string; service: string; status: string;
  medical_notes: any; payment_status: string; payment_amount: number;
}

function calcAge(birthDate: string | null): string {
  if (!birthDate) return "—";
  const diff = Date.now() - new Date(birthDate).getTime();
  const years = Math.floor(diff / (365.25 * 86400000));
  const months = Math.floor((diff % (365.25 * 86400000)) / (30.44 * 86400000));
  if (years > 0) return `${years} año${years > 1 ? "s" : ""}`;
  return `${months} mes${months !== 1 ? "es" : ""}`;
}

export default function PacientesPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("patients")
      .select("*, owner:owners(*)")
      .order("name");
    setPatients((data || []) as unknown as Patient[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = patients.filter((p) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return p.name.toLowerCase().includes(s) || p.owner?.name?.toLowerCase().includes(s) || p.breed?.toLowerCase().includes(s);
  });

  function exportExcel() {
    const rows = patients.map((p) => ({
      Mascota: p.name, Especie: p.species, Raza: p.breed || "",
      "Fecha nacimiento": p.birth_date || "", Peso: p.weight || "",
      Dueño: p.owner?.name || "", Teléfono: p.owner?.phone || "", Email: p.owner?.email || "",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pacientes");
    XLSX.writeFile(wb, "pacientes_coyotl_can.xlsx");
    toast("Excel exportado");
  }

  if (selected) {
    return <ExpedientePaciente patient={selected} onBack={() => { setSelected(null); load(); }} toast={toast} />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#2d0057]">🐾 Pacientes</h1>
        <button onClick={exportExcel} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-[#555] hover:bg-gray-50">
          📥 Exportar Excel
        </button>
      </div>

      <input
        placeholder="Buscar por mascota, dueño o raza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#ff006b]"
      />

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-3xl">🐾</p>
          <p className="mt-2 text-sm text-[#555]">No hay pacientes registrados</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[#f9fafb] text-left text-xs font-semibold text-[#555]">
                <th className="px-4 py-3">Mascota</th>
                <th className="px-4 py-3">Especie</th>
                <th className="px-4 py-3">Raza</th>
                <th className="px-4 py-3">Edad</th>
                <th className="px-4 py-3">Dueño</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 transition-colors hover:bg-[#f8f8f8]">
                  <td className="px-4 py-3 font-bold text-[#2d0057]">{p.name}</td>
                  <td className="px-4 py-3">{p.species}</td>
                  <td className="px-4 py-3">{p.breed || "—"}</td>
                  <td className="px-4 py-3">{calcAge(p.birth_date)}</td>
                  <td className="px-4 py-3 font-semibold">{p.owner?.name || "—"}</td>
                  <td className="px-4 py-3">
                    {p.owner?.phone ? (
                      <a href={`https://wa.me/52${p.owner.phone.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                        {p.owner.phone}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(p)} className="rounded-xl bg-[#8b00fb] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#7400d4]">
                      Ver expediente
                    </button>
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

function ExpedientePaciente({ patient, onBack, toast }: { patient: Patient; onBack: () => void; toast: (m: string) => void }) {
  const [tab, setTab] = useState<"historial" | "notas" | "estancias" | "info">("historial");
  const [appts, setAppts] = useState<Appt[]>([]);
  const [stays, setStays] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...patient, ownerName: patient.owner?.name || "", ownerPhone: patient.owner?.phone || "", ownerEmail: patient.owner?.email || "", ownerAddress: patient.owner?.address || "" });
  const [showNewAppt, setShowNewAppt] = useState(false);

  useEffect(() => {
    supabase.from("appointments").select("*").eq("patient_id", patient.id).order("date", { ascending: false }).then(({ data }) => setAppts((data || []) as Appt[]));
    supabase.from("stays").select("*").eq("patient_id", patient.id).order("check_in", { ascending: false }).then(({ data }) => setStays(data || []));
  }, [patient.id]);

  async function saveEdit() {
    await supabase.from("patients").update({
      name: editData.name, species: editData.species, breed: editData.breed,
      birth_date: editData.birth_date || null, weight: editData.weight || null, notes: editData.notes,
    }).eq("id", patient.id);
    if (patient.owner_id) {
      await supabase.from("owners").update({
        name: editData.ownerName, phone: editData.ownerPhone, email: editData.ownerEmail, address: editData.ownerAddress,
      }).eq("id", patient.owner_id);
    }
    toast("Datos actualizados");
    setEditing(false);
    onBack();
  }

  async function quickAppt() {
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("appointments").insert({
      patient_id: patient.id, owner_id: patient.owner_id,
      service: "Consulta General", date: today, time: "10:00",
      origin: "Presencial", payment_amount: 250,
    });
    toast("Cita creada");
    const { data } = await supabase.from("appointments").select("*").eq("patient_id", patient.id).order("date", { ascending: false });
    setAppts((data || []) as Appt[]);
  }

  const tabs = [
    { key: "historial", label: "Historial de citas" },
    { key: "notas", label: "Notas médicas" },
    { key: "estancias", label: "Estancias" },
    { key: "info", label: "Información" },
  ] as const;

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm font-semibold text-[#ff006b] hover:underline">← Volver a pacientes</button>

      {/* Header */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#2d0057]">{patient.name}</h2>
            <p className="text-sm text-[#555]">{patient.species} · {patient.breed || "Sin raza"} · {calcAge(patient.birth_date)} · {patient.weight ? `${patient.weight} kg` : ""}</p>
            <p className="mt-1 text-sm font-semibold text-[#2d0057]">{patient.owner?.name}</p>
            <p className="text-xs text-[#555]">{patient.owner?.phone} · {patient.owner?.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={quickAppt} className="rounded-xl bg-[#8b00fb] px-4 py-2 text-xs font-bold text-white hover:bg-[#7400d4]">Agendar cita</button>
            {patient.owner?.phone && (
              <a href={`https://wa.me/52${patient.owner.phone.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white">
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-[#ff006b] text-white" : "bg-gray-100 text-[#555] hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        {tab === "historial" && (
          appts.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#555]">Sin citas registradas</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-[#555]">
                  <th className="pb-2">Fecha</th><th className="pb-2">Servicio</th>
                  <th className="pb-2">Estado</th><th className="pb-2">Pago</th>
                </tr>
              </thead>
              <tbody>
                {appts.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50">
                    <td className="py-2">{a.date} {a.time?.slice(0, 5)}</td>
                    <td className="py-2">{a.service}</td>
                    <td className="py-2"><Badge label={a.status} color={COLOR_ESTADO[a.status] || "#888"} /></td>
                    <td className="py-2"><Badge label={a.payment_status === "pagado" ? `$${a.payment_amount}` : "Pendiente"} color={COLOR_PAGO[a.payment_status] || "#888"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {tab === "notas" && (
          appts.filter((a) => a.medical_notes && Object.values(a.medical_notes).some((v: any) => v)).length === 0 ? (
            <p className="py-8 text-center text-sm text-[#555]">Sin notas médicas</p>
          ) : (
            <div className="space-y-4">
              {appts.filter((a) => a.medical_notes && Object.values(a.medical_notes).some((v: any) => v)).map((a) => (
                <details key={a.id} className="rounded-xl border border-gray-100 p-4">
                  <summary className="cursor-pointer font-semibold text-[#2d0057]">
                    {a.date} — {a.service}
                  </summary>
                  <div className="mt-3 grid gap-2 text-sm">
                    {Object.entries(a.medical_notes).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}><span className="font-semibold text-[#ff006b]">{k}:</span> {String(v)}</div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )
        )}

        {tab === "estancias" && (
          stays.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#555]">Sin estancias registradas</p>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-[#555]"><th className="pb-2">Check-in</th><th className="pb-2">Check-out</th><th className="pb-2">Estado</th><th className="pb-2">Pago</th></tr></thead>
              <tbody>
                {stays.map((s: any) => (
                  <tr key={s.id} className="border-b border-gray-50">
                    <td className="py-2">{s.check_in}</td><td className="py-2">{s.check_out}</td>
                    <td className="py-2"><Badge label={s.status} color={s.status === "activa" ? "#4bbb00" : "#888"} /></td>
                    <td className="py-2"><Badge label={s.payment_status === "pagado" ? `$${s.payment_amount}` : "Pendiente"} color={COLOR_PAGO[s.payment_status] || "#888"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {tab === "info" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Nombre", key: "name", val: editData.name },
              { label: "Especie", key: "species", val: editData.species },
              { label: "Raza", key: "breed", val: editData.breed },
              { label: "Fecha nacimiento", key: "birth_date", val: editData.birth_date, type: "date" },
              { label: "Peso (kg)", key: "weight", val: editData.weight, type: "number" },
              { label: "Notas", key: "notes", val: editData.notes },
              { label: "Dueño", key: "ownerName", val: editData.ownerName },
              { label: "Teléfono dueño", key: "ownerPhone", val: editData.ownerPhone },
              { label: "Email dueño", key: "ownerEmail", val: editData.ownerEmail },
              { label: "Dirección dueño", key: "ownerAddress", val: editData.ownerAddress },
            ].map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-xs font-semibold text-[#2d0057]">{f.label}</label>
                {editing ? (
                  <input
                    type={f.type || "text"}
                    value={f.val || ""}
                    onChange={(e) => setEditData({ ...editData, [f.key]: e.target.value })}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="text-sm text-[#555]">{String(f.val || "—")}</p>
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="rounded-xl bg-[#8b00fb] px-5 py-2 text-sm font-bold text-white hover:bg-[#7400d4]">Guardar</button>
                  <button onClick={() => setEditing(false)} className="rounded-xl border px-5 py-2 text-sm font-semibold text-[#555]">Cancelar</button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)} className="rounded-xl border border-[#ff006b] px-5 py-2 text-sm font-bold text-[#ff006b] hover:bg-[#ff006b]/5">Editar datos</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
