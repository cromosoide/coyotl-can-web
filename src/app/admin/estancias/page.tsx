"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import Badge from "@/components/admin/Badge";
import { COLOR_ESTANCIA, ESTADOS_ESTANCIA, COLOR_PAGO } from "@/lib/dashboard-constants";

interface Stay {
  id: string; check_in: string; check_out: string; status: string;
  daily_notes: any[]; notes: string; payment_status: string; payment_amount: number;
  patient_id: string; owner_id: string;
  patient: { name: string; species: string } | null;
  owner: { name: string; phone: string } | null;
}

const MAX_CAPACITY = 5;

export default function EstanciasPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showNotes, setShowNotes] = useState<Stay | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase.from("stays").select("*, patient:patients(*), owner:owners(*)").order("check_in", { ascending: false });
    setStays((data || []) as unknown as Stay[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const active = stays.filter((s) => s.status === "checkin" || s.status === "activa").length;

  async function updateStatus(id: string, status: string) {
    await supabase.from("stays").update({ status }).eq("id", id);
    toast(`Estado actualizado a ${status}`);
    load();
  }

  async function deleteStay(id: string) {
    if (!confirm("¿Eliminar esta estancia?")) return;
    await supabase.from("stays").delete().eq("id", id);
    toast("Estancia eliminada");
    load();
  }

  function daysBetween(a: string, b: string) {
    return Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2d0057]">🏡 Estancias</h1>
          <p className="text-sm text-[#555]">{active}/{MAX_CAPACITY} lugares ocupados</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="rounded-xl bg-[#8b00fb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7400d4]">+ Nueva Estancia</button>
      </div>

      {active >= MAX_CAPACITY && (
        <div className="mb-4 rounded-2xl border border-[#ff4444]/30 bg-[#ff4444]/5 px-5 py-3">
          <p className="text-sm font-bold text-[#ff4444]">⚠ Capacidad máxima alcanzada ({MAX_CAPACITY} lugares)</p>
        </div>
      )}

      {/* Capacity bar */}
      <div className="mb-6 overflow-hidden rounded-full bg-gray-200">
        <div className="h-3 rounded-full bg-[#8b00fb] transition-all" style={{ width: `${(active / MAX_CAPACITY) * 100}%` }} />
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" /></div>
      ) : stays.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center"><p className="text-3xl">🏡</p><p className="mt-2 text-sm text-[#555]">Sin estancias registradas</p></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stays.map((s) => (
            <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-extrabold text-[#2d0057]">{s.patient?.name || "—"}</p>
                  <p className="text-xs text-[#555]">{s.owner?.name} · {s.patient?.species}</p>
                </div>
                <Badge label={s.status} color={COLOR_ESTANCIA[s.status] || "#888"} />
              </div>
              <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-[#f9fafb] p-2"><p className="font-bold text-[#2d0057]">{s.check_in}</p><p className="text-[#555]">Check-in</p></div>
                <div className="rounded-lg bg-[#f9fafb] p-2"><p className="font-bold text-[#2d0057]">{s.check_out}</p><p className="text-[#555]">Check-out</p></div>
                <div className="rounded-lg bg-[#f9fafb] p-2"><p className="font-bold text-[#2d0057]">{daysBetween(s.check_in, s.check_out)}</p><p className="text-[#555]">Días</p></div>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Badge label={s.payment_status === "pagado" ? `$${s.payment_amount}` : "Pago pendiente"} color={COLOR_PAGO[s.payment_status] || "#888"} />
                {s.owner?.phone && (
                  <a href={`https://wa.me/52${s.owner.phone.replace(/\s/g, "")}?text=${encodeURIComponent(`Hola ${s.owner.name}, ${s.patient?.name || "su mascota"} tuvo un excelente día hoy en la Estancia Coyotl. 🐾`)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#25D366] px-3 py-1 text-xs font-bold text-white">💬 WhatsApp</a>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {s.status === "reservada" && <button onClick={() => updateStatus(s.id, "checkin")} className="rounded-lg bg-[#ffab00] px-2 py-1 text-xs font-bold text-white">Check-in</button>}
                {s.status === "checkin" && <button onClick={() => updateStatus(s.id, "activa")} className="rounded-lg bg-[#4bbb00] px-2 py-1 text-xs font-bold text-white">Activar</button>}
                {s.status === "activa" && <button onClick={() => updateStatus(s.id, "checkout")} className="rounded-lg bg-gray-400 px-2 py-1 text-xs font-bold text-white">Check-out</button>}
                <button onClick={() => setShowNotes(s)} className="rounded-lg bg-[#00c7ff] px-2 py-1 text-xs font-bold text-white">📝 Notas</button>
                <button onClick={() => deleteStay(s.id)} className="rounded-lg bg-[#ff4444] px-2 py-1 text-xs font-bold text-white">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && <AddStayModal onClose={() => { setShowAdd(false); load(); }} toast={toast} />}
      {showNotes && <DailyNotesModal stay={showNotes} onClose={() => { setShowNotes(null); load(); }} toast={toast} />}
    </div>
  );
}

function AddStayModal({ onClose, toast }: { onClose: () => void; toast: (m: string) => void }) {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [form, setForm] = useState({ check_in: new Date().toISOString().split("T")[0], check_out: "", payment_amount: 350, payment_status: "pendiente", notes: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("patients").select("*, owner:owners(*)").order("name").then(({ data }) => setPatients(data || []));
  }, []);

  async function save() {
    setSaving(true);
    const patient = patients.find((p) => p.id === selectedPatient);
    await supabase.from("stays").insert({
      patient_id: selectedPatient || null, owner_id: patient?.owner_id || null,
      check_in: form.check_in, check_out: form.check_out,
      payment_amount: form.payment_amount, payment_status: form.payment_status, notes: form.notes,
    });
    toast("Estancia creada");
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title="Nueva Estancia" onClose={onClose}>
      <div className="grid gap-3">
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Mascota</label>
          <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm">
            <option value="">Seleccionar...</option>
            {patients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.species}) — {p.owner?.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Check-in</label><input type="date" value={form.check_in} onChange={(e) => setForm({ ...form, check_in: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Check-out</label><input type="date" value={form.check_out} onChange={(e) => setForm({ ...form, check_out: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Monto $</label><input type="number" value={form.payment_amount} onChange={(e) => setForm({ ...form, payment_amount: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Pago</label><select value={form.payment_status} onChange={(e) => setForm({ ...form, payment_status: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm"><option value="pendiente">Pendiente</option><option value="pagado">Pagado</option></select></div>
        </div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Notas</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <button onClick={save} disabled={saving || !selectedPatient || !form.check_out} className="rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white disabled:opacity-50">{saving ? "Guardando..." : "Crear Estancia"}</button>
      </div>
    </Modal>
  );
}

function DailyNotesModal({ stay, onClose, toast }: { stay: Stay; onClose: () => void; toast: (m: string) => void }) {
  const [notes, setNotes] = useState<any[]>(Array.isArray(stay.daily_notes) ? stay.daily_notes : []);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function addNote() {
    setSaving(true);
    const updated = [...notes, { date: new Date().toISOString().split("T")[0], text: newNote }];
    await supabase.from("stays").update({ daily_notes: updated }).eq("id", stay.id);
    setNotes(updated);
    setNewNote("");
    toast("Nota agregada");
    setSaving(false);
  }

  return (
    <Modal open title={`Notas diarias: ${stay.patient?.name || "Estancia"}`} onClose={onClose}>
      <div className="mb-4 space-y-2">
        {notes.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#555]">Sin notas aún</p>
        ) : (
          notes.map((n: any, i: number) => (
            <div key={i} className="rounded-xl bg-[#f9fafb] p-3">
              <p className="text-xs font-bold text-[#ff006b]">{n.date}</p>
              <p className="text-sm text-[#555]">{n.text}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="¿Cómo estuvo la mascota hoy?" rows={2} className="flex-1 rounded-xl border px-3 py-2 text-sm" />
        <button onClick={addNote} disabled={saving || !newNote} className="rounded-xl bg-[#8b00fb] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">Agregar</button>
      </div>
    </Modal>
  );
}
