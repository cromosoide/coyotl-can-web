"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";

interface Review {
  id: string; name: string; text: string; rating: number; date: string; visible: boolean;
}

export default function ResenasPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState<Review | null | "new">(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews((data || []) as Review[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleVisible(id: string, visible: boolean) {
    await supabase.from("reviews").update({ visible: !visible }).eq("id", id);
    toast(visible ? "Reseña ocultada" : "Reseña visible");
    load();
  }

  async function deleteReview(id: string) {
    if (!confirm("¿Eliminar esta reseña?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    toast("Reseña eliminada");
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#2d0057]">⭐ Reseñas</h1>
        <button onClick={() => setShowAdd("new")} className="rounded-xl bg-[#8b00fb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7400d4]">+ Agregar Reseña</button>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" /></div>
      ) : reviews.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center"><p className="text-3xl">⭐</p><p className="mt-2 text-sm text-[#555]">Sin reseñas — agrega la primera</p></div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className={`rounded-2xl border bg-white p-5 ${r.visible ? "border-gray-200" : "border-dashed border-gray-300 opacity-60"}`}>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-bold text-[#2d0057]">{r.name}</p>
                    <div className="flex text-[#ffab00]">
                      {[...Array(r.rating)].map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {r.date && <span className="text-xs text-[#555]">{r.date}</span>}
                  </div>
                  <p className="text-sm text-[#555]">&ldquo;{r.text}&rdquo;</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => toggleVisible(r.id, r.visible)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold ${r.visible ? "bg-[#4bbb00] text-white" : "border border-gray-300 text-[#555]"}`}
                  >
                    {r.visible ? "👁 Visible" : "Oculta"}
                  </button>
                  <button onClick={() => setShowAdd(r)} className="rounded-lg bg-[#ffab00] px-2 py-1 text-xs font-bold text-white">✏️</button>
                  <button onClick={() => deleteReview(r.id)} className="rounded-lg bg-[#ff4444] px-2 py-1 text-xs font-bold text-white">🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <ReviewFormModal
          review={showAdd === "new" ? null : showAdd}
          onClose={() => { setShowAdd(null); load(); }}
          toast={toast}
        />
      )}
    </div>
  );
}

function ReviewFormModal({ review, onClose, toast }: { review: Review | null; onClose: () => void; toast: (m: string) => void }) {
  const [form, setForm] = useState({
    name: review?.name || "", text: review?.text || "",
    rating: review?.rating ?? 5, date: review?.date || new Date().toISOString().split("T")[0],
    visible: review?.visible ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (review) {
      await supabase.from("reviews").update(form).eq("id", review.id);
      toast("Reseña actualizada");
    } else {
      await supabase.from("reviews").insert(form);
      toast("Reseña agregada");
    }
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title={review ? "Editar Reseña" : "Agregar Reseña"} onClose={onClose}>
      <div className="grid gap-3">
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Nombre del cliente</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Reseña</label><textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Estrellas</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setForm({ ...form, rating: n })} className="text-2xl">
                  {n <= form.rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>
          <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Fecha</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="rounded" />
          <span className="font-semibold text-[#2d0057]">Visible en el sitio</span>
        </label>
        <button onClick={save} disabled={saving || !form.name || !form.text} className="rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white disabled:opacity-50">{saving ? "Guardando..." : "Guardar"}</button>
      </div>
    </Modal>
  );
}
