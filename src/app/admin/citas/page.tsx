// @ts-nocheck
"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import Badge from "@/components/admin/Badge";
import {
  SERVICIOS_LISTA, PRECIOS_SERVICIO, ORIGENES, ESTADOS_CITA,
  COLOR_ESTADO, COLOR_ORIGEN, COLOR_PAGO, whatsappUrl,
} from "@/lib/dashboard-constants";

interface Owner { id: string; name: string; phone: string; email: string; }
interface Patient { id: string; name: string; species: string; breed: string; owner_id: string; }
interface Appt {
  id: string; date: string; time: string; service: string; status: string;
  origin: string; notes: string; medical_notes: any; payment_status: string;
  payment_amount: number; patient_id: string; owner_id: string;
  owner: Owner | null; patient: Patient | null;
}

export default function CitasPage() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMedNotes, setShowMedNotes] = useState<Appt | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState<Appt | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterService, setFilterService] = useState("");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*, owner:owners(*), patient:patients(*)")
      .order("date", { ascending: false })
      .order("time", { ascending: true })
      .limit(100);
    setAppts((data || []) as unknown as Appt[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const todayCount = appts.filter((a) => a.date === new Date().toISOString().split("T")[0]).length;

  const filtered = appts.filter((a) => {
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterService && a.service !== filterService) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        a.owner?.name?.toLowerCase().includes(s) ||
        a.patient?.name?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  async function updateStatus(id: string, status: string) {
    await supabase.from("appointments").update({ status }).eq("id", id);
    if (status === "atendida") {
      const appt = appts.find((a) => a.id === id);
      if (appt) setShowMedNotes({ ...appt, status: "atendida" });
    }
    toast(`Estado actualizado a ${status}`);
    load();
  }

  async function deleteAppt(id: string) {
    if (!confirm("¿Eliminar esta cita?")) return;
    await supabase.from("appointments").delete().eq("id", id);
    toast("Cita eliminada");
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2d0057]">📋 Citas</h1>
          <p className="text-sm text-[#555]">{todayCount} citas hoy</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-[#8b00fb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7400d4]"
        >
          + Agregar Cita
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          placeholder="Buscar cliente o mascota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#ff006b]"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
        >
          <option value="">Todos los estados</option>
          {ESTADOS_CITA.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
        >
          <option value="">Todos los servicios</option>
          {SERVICIOS_LISTA.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-3xl">📋</p>
          <p className="mt-2 text-sm text-[#555]">No hay citas — ¡buen momento para descansar! 🐾</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[#f9fafb] text-left text-xs font-semibold text-[#555]">
                <th className="px-4 py-3">Fecha/Hora</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Mascota</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Origen</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Pago</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 transition-colors hover:bg-[#f8f8f8]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#2d0057]">{a.date}</p>
                    <p className="text-xs text-[#555]">{a.time?.slice(0, 5)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#2d0057]">{a.owner?.name || "—"}</p>
                    {a.owner?.phone && (
                      <a href={`https://wa.me/52${a.owner.phone.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] hover:underline">
                        {a.owner.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{a.patient?.name || "—"}</p>
                    <p className="text-xs text-[#555]">{a.patient?.species}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">{a.service}</td>
                  <td className="px-4 py-3">
                    <Badge label={a.origin} color={COLOR_ORIGEN[a.origin] || "#888"} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={a.status} color={COLOR_ESTADO[a.status] || "#888"} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      label={a.payment_status === "pagado" ? `$${a.payment_amount}` : "Pendiente"}
                      color={COLOR_PAGO[a.payment_status] || "#888"}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setShowWhatsApp(a)} className="rounded-lg bg-[#25D366] p-1.5 text-white" title="WhatsApp">
                        💬
                      </button>
                      {a.status === "pendiente" && (
                        <button onClick={() => updateStatus(a.id, "confirmada")} className="rounded-lg bg-[#00c7ff] p-1.5 text-white" title="Confirmar">
                          ✓
                        </button>
                      )}
                      {a.status === "confirmada" && (
                        <button onClick={() => updateStatus(a.id, "atendida")} className="rounded-lg bg-[#4bbb00] p-1.5 text-white" title="Atendida">
                          ✓✓
                        </button>
                      )}
                      {a.status !== "cancelada" && (
                        <button onClick={() => updateStatus(a.id, "cancelada")} className="rounded-lg bg-[#ff4444] p-1.5 text-white" title="Cancelar">
                          ✗
                        </button>
                      )}
                      <button onClick={() => deleteAppt(a.id)} className="rounded-lg bg-gray-200 p-1.5 text-gray-600" title="Eliminar">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add appointment modal */}
      {showModal && <AddAppointmentModal onClose={() => { setShowModal(false); load(); }} toast={toast} />}

      {/* Medical notes modal */}
      {showMedNotes && (
        <MedicalNotesModal appt={showMedNotes} onClose={() => { setShowMedNotes(null); load(); }} toast={toast} />
      )}

      {/* WhatsApp templates */}
      {showWhatsApp && (
        <WhatsAppTemplates appt={showWhatsApp} onClose={() => setShowWhatsApp(null)} />
      )}
    </div>
  );
}

function AddAppointmentModal({ onClose, toast }: { onClose: () => void; toast: (m: string) => void }) {
  const [owners, setOwners] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [newOwner, setNewOwner] = useState({ name: "", phone: "", email: "" });
  const [newPatient, setNewPatient] = useState({ name: "", species: "Perro", breed: "" });
  const [isNewOwner, setIsNewOwner] = useState(false);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [form, setForm] = useState({
    service: SERVICIOS_LISTA[0] as string,
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    origin: "Presencial" as string,
    payment_amount: PRECIOS_SERVICIO[SERVICIOS_LISTA[0]],
    payment_status: "pendiente",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("owners").select("*").order("name").then(({ data }) => setOwners(data || []));
  }, []);

  useEffect(() => {
    if (selectedOwner) {
      supabase.from("patients").select("*").eq("owner_id", selectedOwner).order("name").then(({ data }) => setPatients(data || []));
    }
  }, [selectedOwner]);

  async function handleSave() {
    setSaving(true);
    let ownerId = selectedOwner;
    let patientId = selectedPatient;

    if (isNewOwner) {
      const { data } = await supabase.from("owners").insert(newOwner).select("id").single();
      ownerId = data?.id || "";
    }

    if (isNewPatient && ownerId) {
      const { data } = await supabase.from("patients").insert({ ...newPatient, owner_id: ownerId }).select("id").single();
      patientId = data?.id || "";
    }

    await supabase.from("appointments").insert({
      patient_id: patientId || null,
      owner_id: ownerId || null,
      service: form.service,
      date: form.date,
      time: form.time,
      origin: form.origin,
      payment_amount: form.payment_amount,
      payment_status: form.payment_status,
      notes: form.notes,
    });

    toast("Cita creada");
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title="Agregar Cita" onClose={onClose} wide>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Owner */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Cliente</label>
          {!isNewOwner ? (
            <div className="flex gap-2">
              <select value={selectedOwner} onChange={(e) => setSelectedOwner(e.target.value)} className="flex-1 rounded-xl border px-3 py-2 text-sm">
                <option value="">Seleccionar cliente...</option>
                {owners.map((o) => <option key={o.id} value={o.id}>{o.name} — {o.phone}</option>)}
              </select>
              <button onClick={() => setIsNewOwner(true)} className="rounded-xl border border-[#ff006b] px-3 py-2 text-xs font-bold text-[#ff006b]">+ Nuevo</button>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-3">
              <input placeholder="Nombre" value={newOwner.name} onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })} className="rounded-xl border px-3 py-2 text-sm" />
              <input placeholder="Teléfono" value={newOwner.phone} onChange={(e) => setNewOwner({ ...newOwner, phone: e.target.value })} className="rounded-xl border px-3 py-2 text-sm" />
              <input placeholder="Email" value={newOwner.email} onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })} className="rounded-xl border px-3 py-2 text-sm" />
            </div>
          )}
        </div>

        {/* Patient */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Mascota</label>
          {!isNewPatient ? (
            <div className="flex gap-2">
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="flex-1 rounded-xl border px-3 py-2 text-sm">
                <option value="">Seleccionar mascota...</option>
                {patients.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.species}</option>)}
              </select>
              <button onClick={() => setIsNewPatient(true)} className="rounded-xl border border-[#ff006b] px-3 py-2 text-xs font-bold text-[#ff006b]">+ Nueva</button>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-3">
              <input placeholder="Nombre" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="rounded-xl border px-3 py-2 text-sm" />
              <select value={newPatient.species} onChange={(e) => setNewPatient({ ...newPatient, species: e.target.value })} className="rounded-xl border px-3 py-2 text-sm">
                <option>Perro</option><option>Gato</option><option>Ave</option><option>Exótico</option><option>Otro</option>
              </select>
              <input placeholder="Raza" value={newPatient.breed} onChange={(e) => setNewPatient({ ...newPatient, breed: e.target.value })} className="rounded-xl border px-3 py-2 text-sm" />
            </div>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Servicio</label>
          <select
            value={form.service}
            onChange={(e) => {
              const svc = e.target.value;
              setForm({ ...form, service: svc, payment_amount: PRECIOS_SERVICIO[svc] || 0 });
            }}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          >
            {SERVICIOS_LISTA.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Origin */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Origen</label>
          <select value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm">
            {ORIGENES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Date + Time */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Fecha</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Hora</label>
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>

        {/* Payment */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Monto $</label>
          <input type="number" value={form.payment_amount} onChange={(e) => setForm({ ...form, payment_amount: Number(e.target.value) })} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Estado de pago</label>
          <select value={form.payment_status} onChange={(e) => setForm({ ...form, payment_status: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm">
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
          </select>
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#2d0057]">Notas</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>

        <div className="sm:col-span-2">
          <button onClick={handleSave} disabled={saving} className="w-full rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white hover:bg-[#7400d4] disabled:opacity-50">
            {saving ? "Guardando..." : "Guardar Cita"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function MedicalNotesModal({ appt, onClose, toast }: { appt: Appt; onClose: () => void; toast: (m: string) => void }) {
  const [notes, setNotes] = useState({
    motivo: "", sintomas: "", diagnostico: "", tratamiento: "",
    medicamentos: "", seguimiento: "", proximaVisita: "", adicionales: "",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await supabase.from("appointments").update({ medical_notes: notes }).eq("id", appt.id);
    toast("Notas médicas guardadas");
    setSaving(false);
    onClose();
  }

  const fields = [
    { key: "motivo", label: "Motivo de consulta" },
    { key: "sintomas", label: "Síntomas observados" },
    { key: "diagnostico", label: "Diagnóstico" },
    { key: "tratamiento", label: "Tratamiento indicado" },
    { key: "medicamentos", label: "Medicamentos recetados" },
    { key: "seguimiento", label: "Seguimiento recomendado" },
    { key: "proximaVisita", label: "Fecha próxima visita" },
    { key: "adicionales", label: "Notas adicionales" },
  ];

  return (
    <Modal open title="Notas Médicas" onClose={onClose} wide>
      <p className="mb-4 text-sm text-[#555]">
        {appt.patient?.name} — {appt.service} — {appt.date}
      </p>
      <div className="grid gap-3">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs font-semibold text-[#2d0057]">{f.label}</label>
            <textarea
              value={(notes as any)[f.key]}
              onChange={(e) => setNotes({ ...notes, [f.key]: e.target.value })}
              rows={2}
              className="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
        ))}
        <button onClick={save} disabled={saving} className="rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white hover:bg-[#7400d4] disabled:opacity-50">
          {saving ? "Guardando..." : "Guardar notas"}
        </button>
      </div>
    </Modal>
  );
}

function WhatsAppTemplates({ appt, onClose }: { appt: Appt; onClose: () => void }) {
  const name = appt.owner?.name || "";
  const pet = appt.patient?.name || "su mascota";
  const phone = appt.owner?.phone?.replace(/\s/g, "") || "";
  const base = `https://wa.me/52${phone}`;

  const templates = [
    {
      label: "Confirmar cita",
      msg: `Hola ${name}, le confirmamos su cita en Coyotl Can para ${pet} el ${appt.date} a las ${appt.time?.slice(0, 5)}. Lo esperamos en Irapuato 11, Lindavista. 🐾`,
    },
    {
      label: "Recordatorio",
      msg: `Hola ${name}, le recordamos que mañana tiene cita en Coyotl Can para ${pet} a las ${appt.time?.slice(0, 5)}. ¿Todo confirmado? 🐾`,
    },
    {
      label: "Post-visita",
      msg: `Hola ${name}, ¿cómo sigue ${pet} tras la visita? Esperamos que esté mucho mejor 🐾 Si tuvieron una buena experiencia, nos ayudaría mucho su opinión en Google.`,
    },
    {
      label: "Mensaje libre",
      msg: "",
    },
  ];

  return (
    <Modal open title="Enviar WhatsApp" onClose={onClose}>
      <div className="space-y-3">
        {templates.map((t) => (
          <a
            key={t.label}
            href={`${base}?text=${encodeURIComponent(t.msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors hover:bg-[#25D366]/5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">💬</span>
            <div>
              <p className="text-sm font-bold text-[#2d0057]">{t.label}</p>
              {t.msg && <p className="text-xs text-[#555] line-clamp-2">{t.msg}</p>}
            </div>
          </a>
        ))}
      </div>
    </Modal>
  );
}
