"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const SERVICIOS_AGENDA = [
  "Consulta General",
  "Vacunación",
  "Desparasitación",
  "Estética Coyotl",
  "Estancia Coyotl",
  "Odontología Veterinaria",
  "Intervención de Mínima Invasión",
];

const HORARIOS_SEMANA = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const HORARIOS_SABADO = ["11:00", "12:00", "13:00", "14:00", "15:00"];

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

interface AgendaModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function AgendaModal({ open, onClose, defaultService }: AgendaModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [form, setForm] = useState({
    ownerName: "", phone: "", email: "",
    petName: "", species: "Perro", breed: "",
    service: defaultService || "Consulta General",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedDate("");
      setSelectedTime("");
      setForm((f) => ({ ...f, service: defaultService || "Consulta General" }));
      setConfirmed(false);
    }
  }, [open, defaultService]);

  // Fetch occupied times when date is selected
  useEffect(() => {
    if (!selectedDate) return;
    supabase
      .from("appointments")
      .select("time")
      .eq("date", selectedDate)
      .neq("status", "cancelada")
      .then(({ data }) => {
        setOccupiedTimes((data || []).map((r: any) => r.time?.slice(0, 5)));
      });
  }, [selectedDate]);

  // Calendar helpers
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isSaturday(dateStr: string) {
    return new Date(dateStr + "T12:00:00").getDay() === 6;
  }

  const HORARIOS = selectedDate && isSaturday(selectedDate) ? HORARIOS_SABADO : HORARIOS_SEMANA;

  function isDisabled(day: number) {
    const d = new Date(calYear, calMonth, day);
    return d < today || d.getDay() === 0; // past or Sunday
  }

  function selectDate(day: number) {
    const d = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(d);
    setSelectedTime("");
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  }

  function validateStep2(): boolean {
    const errs: Record<string, boolean> = {};
    if (form.ownerName.length < 2) errs.ownerName = true;
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = true;
    if (form.petName.length < 2) errs.petName = true;
    if (!form.species) errs.species = true;
    if (!form.service) errs.service = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleConfirm() {
    if (!validateStep2()) return;
    setSaving(true);

    try {
      // 1. Find or create owner
      let ownerId: string;
      const phoneClean = form.phone.replace(/\D/g, "");
      const { data: existingOwner } = await supabase
        .from("owners").select("id").eq("phone", phoneClean).limit(1).single();

      if (existingOwner) {
        ownerId = existingOwner.id;
      } else {
        const { data: newOwner } = await supabase
          .from("owners").insert({ name: form.ownerName, phone: phoneClean, email: form.email || null })
          .select("id").single();
        ownerId = newOwner?.id || "";
      }

      // 2. Find or create patient
      let patientId: string;
      const { data: existingPatient } = await supabase
        .from("patients").select("id").eq("owner_id", ownerId).eq("name", form.petName).limit(1).single();

      if (existingPatient) {
        patientId = existingPatient.id;
      } else {
        const { data: newPatient } = await supabase
          .from("patients").insert({
            name: form.petName, species: form.species, breed: form.breed || null, owner_id: ownerId,
          }).select("id").single();
        patientId = newPatient?.id || "";
      }

      // 3. Create appointment
      await supabase.from("appointments").insert({
        patient_id: patientId, owner_id: ownerId,
        service: form.service, date: selectedDate, time: selectedTime,
        origin: "Web/Landing", status: "pendiente", notes: form.notes || null,
      });

      setConfirmed(true);
      setStep(3);
    } catch {
      alert("Hubo un problema al agendar tu cita. Intenta de nuevo o contáctanos por WhatsApp.");
    }

    setSaving(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2d0057]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 text-[#555] hover:bg-gray-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="mb-6 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-[#ff006b]" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div>
            <h2 className="mb-1 text-xl font-extrabold text-[#2d0057]">
              {defaultService === "Estancia Coyotl" ? "Reservar Estancia" : "Agendar Consulta"}
            </h2>
            <p className="mb-6 text-sm text-[#555]">Selecciona fecha y hora</p>

            {/* Calendar */}
            <div className="mb-6 rounded-2xl border border-gray-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <button onClick={prevMonth} className="rounded-lg p-2 hover:bg-gray-100">←</button>
                <span className="font-bold text-[#2d0057]">{MESES[calMonth]} {calYear}</span>
                <button onClick={nextMonth} className="rounded-lg p-2 hover:bg-gray-100">→</button>
              </div>
              <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-[#555]">
                {DIAS.map((d) => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const disabled = isDisabled(day);
                  const selected = dateStr === selectedDate;
                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => selectDate(day)}
                      className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                        disabled ? "text-gray-300 cursor-not-allowed" :
                        selected ? "bg-[#ff006b] text-white" :
                        "text-[#2d0057] hover:bg-[#ff006b]/10"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-[#2d0057]">Horarios disponibles</p>
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS.map((h) => {
                    const occupied = occupiedTimes.includes(h);
                    const selected = h === selectedTime;
                    return (
                      <button
                        key={h}
                        disabled={occupied}
                        onClick={() => setSelectedTime(h)}
                        className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                          occupied ? "bg-gray-100 text-gray-400 cursor-not-allowed" :
                          selected ? "bg-[#ff006b] text-white" :
                          "border border-gray-200 text-[#2d0057] hover:border-[#ff006b] hover:bg-[#ff006b]/5"
                        }`}
                      >
                        {occupied ? "Ocupado" : h}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime}
              className="w-full rounded-2xl bg-[#ff006b] py-3.5 font-bold text-white transition-colors hover:bg-[#e6005f] disabled:opacity-40"
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Step 2: Patient data */}
        {step === 2 && (
          <div>
            <h2 className="mb-1 text-xl font-extrabold text-[#2d0057]">Datos del paciente</h2>
            <p className="mb-6 text-sm text-[#555]">{selectedDate} a las {selectedTime}</p>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff006b]">Datos del dueño</p>
              <Field label="Nombre completo" value={form.ownerName} onChange={(v) => setForm({ ...form, ownerName: v })} error={errors.ownerName} required />
              <Field label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} required placeholder="10 dígitos" />
              <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="Opcional" />

              <p className="text-xs font-bold uppercase tracking-wider text-[#ff006b]">Datos de la mascota</p>
              <Field label="Nombre de la mascota" value={form.petName} onChange={(v) => setForm({ ...form, petName: v })} error={errors.petName} required />
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Especie *</label>
                <select value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} className={`w-full rounded-xl border px-3 py-2.5 text-sm ${errors.species ? "border-red-400" : "border-gray-200"}`}>
                  <option>Perro</option>
                  <option>Gato</option>
                </select>
              </div>
              <Field label="Raza" value={form.breed} onChange={(v) => setForm({ ...form, breed: v })} placeholder="Opcional" />

              <p className="text-xs font-bold uppercase tracking-wider text-[#ff006b]">Servicio</p>
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Servicio *</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm">
                  {SERVICIOS_AGENDA.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Notas adicionales</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="¿Algo que debamos saber sobre tu mascota?" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 rounded-2xl border border-gray-200 py-3 font-bold text-[#555]">← Volver</button>
              <button onClick={handleConfirm} disabled={saving} className="flex-1 rounded-2xl bg-[#ff006b] py-3 font-bold text-white disabled:opacity-50">
                {saving ? "Agendando..." : "Confirmar cita →"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && confirmed && (
          <div className="text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#4bbb00]/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4bbb00" strokeWidth="3" className="h-10 w-10">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-extrabold text-[#2d0057]">¡Cita agendada! 🐾</h2>

            <div className="mx-auto my-6 max-w-sm rounded-2xl border border-gray-200 bg-[#f9fafb] p-5 text-left text-sm">
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-[#555]">Fecha:</span><span className="font-bold text-[#2d0057]">{formatDate(selectedDate)}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Hora:</span><span className="font-bold text-[#2d0057]">{selectedTime}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Servicio:</span><span className="font-bold text-[#2d0057]">{form.service}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Mascota:</span><span className="font-bold text-[#2d0057]">{form.petName}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Dueño:</span><span className="font-bold text-[#2d0057]">{form.ownerName}</span></div>
              </div>
            </div>

            <p className="mb-6 text-sm text-[#555]">
              Te contactaremos por WhatsApp al <strong>{form.phone}</strong> para confirmar tu cita.
            </p>

            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-2xl border border-gray-200 py-3 font-bold text-[#555]">Cerrar</button>
              <button onClick={() => { setStep(1); setSelectedDate(""); setSelectedTime(""); setConfirmed(false); }} className="flex-1 rounded-2xl bg-[#ff006b] py-3 font-bold text-white">Agendar otra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  error?: boolean; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[#2d0057]">{label} {required && "*"}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#ff006b] focus:ring-2 focus:ring-[#ff006b]/20 ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">Este campo es obligatorio</p>}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
