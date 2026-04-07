// @ts-nocheck
"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import Badge from "@/components/admin/Badge";
import { CATEGORIAS_INVENTARIO, COLOR_STOCK } from "@/lib/dashboard-constants";
import * as XLSX from "xlsx";

interface Item {
  id: string; name: string; category: string; stock_current: number; stock_minimum: number;
  price_buy: number; price_sell: number; supplier: string; last_restock: string; notes: string;
}
interface Movement { id: string; type: string; quantity: number; reason: string; date: string; }

export default function InventarioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState<Item | null>(null);
  const [showMovement, setShowMovement] = useState<Item | null>(null);
  const [showHistory, setShowHistory] = useState<Item | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase.from("inventory").select("*").order("name");
    setItems((data || []) as Item[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const lowStock = items.filter((i) => i.stock_current <= i.stock_minimum);
  const filtered = items.filter((i) => {
    if (filterCat && i.category !== filterCat) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function stockColor(item: Item) {
    if (item.stock_current === 0) return COLOR_STOCK.agotado;
    if (item.stock_current <= item.stock_minimum) return COLOR_STOCK.bajo;
    return COLOR_STOCK.ok;
  }
  function stockLabel(item: Item) {
    if (item.stock_current === 0) return "AGOTADO";
    if (item.stock_current <= item.stock_minimum) return "BAJO";
    return "OK";
  }

  function exportExcel() {
    const rows = items.map((i) => ({
      Producto: i.name, Categoría: i.category, "Stock actual": i.stock_current,
      "Stock mínimo": i.stock_minimum, "Precio compra": i.price_buy || "",
      "Precio venta": i.price_sell || "", Proveedor: i.supplier || "",
      "Última reposición": i.last_restock || "", Estado: stockLabel(i),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");
    XLSX.writeFile(wb, "inventario_coyotl_can.xlsx");
    toast("Excel exportado");
  }

  async function deleteItem(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    await supabase.from("inventory").delete().eq("id", id);
    toast("Producto eliminado");
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#2d0057]">📦 Inventario</h1>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-[#555] hover:bg-gray-50">📥 Exportar Excel</button>
          <button onClick={() => setShowAdd(true)} className="rounded-xl bg-[#8b00fb] px-5 py-2 text-sm font-bold text-white hover:bg-[#7400d4]">+ Agregar</button>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="mb-4 rounded-2xl border border-[#ff4444]/30 bg-[#ff4444]/5 px-5 py-3">
          <p className="text-sm font-bold text-[#ff4444]">⚠ {lowStock.length} producto{lowStock.length > 1 ? "s" : ""} con stock bajo: {lowStock.map((i) => i.name).join(", ")}</p>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-3">
        <input placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#ff006b]" />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
          <option value="">Todas las categorías</option>
          {CATEGORIAS_INVENTARIO.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center"><p className="text-3xl">📦</p><p className="mt-2 text-sm text-[#555]">Sin productos registrados</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-[#f9fafb] text-left text-xs font-semibold text-[#555]">
              <th className="px-4 py-3">Producto</th><th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Stock</th><th className="px-4 py-3">Mín</th>
              <th className="px-4 py-3">P. Compra</th><th className="px-4 py-3">P. Venta</th>
              <th className="px-4 py-3">Estado</th><th className="px-4 py-3">Acciones</th>
            </tr></thead>
            <tbody>
              {filtered.map((i) => (
                <tr key={i.id} className="border-b border-gray-50 transition-colors hover:bg-[#f8f8f8]">
                  <td className="px-4 py-3 font-bold text-[#2d0057]">{i.name}</td>
                  <td className="px-4 py-3 text-xs">{i.category}</td>
                  <td className="px-4 py-3 font-bold">{i.stock_current}</td>
                  <td className="px-4 py-3 text-[#555]">{i.stock_minimum}</td>
                  <td className="px-4 py-3">{i.price_buy ? `$${i.price_buy}` : "—"}</td>
                  <td className="px-4 py-3">{i.price_sell ? `$${i.price_sell}` : "—"}</td>
                  <td className="px-4 py-3"><Badge label={stockLabel(i)} color={stockColor(i)} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setShowMovement(i)} className="rounded-lg bg-[#8b00fb] px-2 py-1 text-xs font-bold text-white">+/-</button>
                      <button onClick={() => setShowHistory(i)} className="rounded-lg bg-gray-200 px-2 py-1 text-xs">📋</button>
                      <button onClick={() => setShowEdit(i)} className="rounded-lg bg-[#ffab00] px-2 py-1 text-xs text-white">✏️</button>
                      <button onClick={() => deleteItem(i.id)} className="rounded-lg bg-[#ff4444] px-2 py-1 text-xs text-white">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && <ItemFormModal onClose={() => { setShowAdd(false); load(); }} toast={toast} />}
      {showEdit && <ItemFormModal item={showEdit} onClose={() => { setShowEdit(null); load(); }} toast={toast} />}
      {showMovement && <MovementModal item={showMovement} onClose={() => { setShowMovement(null); load(); }} toast={toast} />}
      {showHistory && <HistoryModal item={showHistory} onClose={() => setShowHistory(null)} />}
    </div>
  );
}

function ItemFormModal({ item, onClose, toast }: { item?: Item; onClose: () => void; toast: (m: string) => void }) {
  const [form, setForm] = useState({
    name: item?.name || "", category: item?.category || CATEGORIAS_INVENTARIO[0],
    stock_current: item?.stock_current ?? 0, stock_minimum: item?.stock_minimum ?? 5,
    price_buy: item?.price_buy ?? 0, price_sell: item?.price_sell ?? 0,
    supplier: item?.supplier || "", notes: item?.notes || "",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (item) {
      await supabase.from("inventory").update(form).eq("id", item.id);
      toast("Producto actualizado");
    } else {
      await supabase.from("inventory").insert(form);
      toast("Producto agregado");
    }
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title={item ? "Editar Producto" : "Agregar Producto"} onClose={onClose}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Nombre</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Categoría</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm">{CATEGORIAS_INVENTARIO.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Proveedor</label><input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Stock actual</label><input type="number" value={form.stock_current} onChange={(e) => setForm({ ...form, stock_current: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Stock mínimo</label><input type="number" value={form.stock_minimum} onChange={(e) => setForm({ ...form, stock_minimum: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Precio compra $</label><input type="number" value={form.price_buy} onChange={(e) => setForm({ ...form, price_buy: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-xs font-semibold text-[#2d0057]">Precio venta $</label><input type="number" value={form.price_sell} onChange={(e) => setForm({ ...form, price_sell: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" /></div>
        <div className="sm:col-span-2"><button onClick={save} disabled={saving || !form.name} className="w-full rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white hover:bg-[#7400d4] disabled:opacity-50">{saving ? "Guardando..." : "Guardar"}</button></div>
      </div>
    </Modal>
  );
}

function MovementModal({ item, onClose, toast }: { item: Item; onClose: () => void; toast: (m: string) => void }) {
  const [type, setType] = useState<"entrada" | "salida">("entrada");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const newStock = type === "entrada" ? item.stock_current + quantity : Math.max(0, item.stock_current - quantity);
    await supabase.from("inventory_movements").insert({ inventory_id: item.id, type, quantity, reason });
    await supabase.from("inventory").update({ stock_current: newStock, last_restock: type === "entrada" ? new Date().toISOString().split("T")[0] : item.last_restock }).eq("id", item.id);
    toast(`Movimiento registrado: ${type} ${quantity}`);
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title={`Movimiento: ${item.name}`} onClose={onClose}>
      <p className="mb-4 text-sm text-[#555]">Stock actual: <strong>{item.stock_current}</strong></p>
      <div className="grid gap-3">
        <div className="flex gap-2">
          <button onClick={() => setType("entrada")} className={`flex-1 rounded-xl py-2 text-sm font-bold ${type === "entrada" ? "bg-[#4bbb00] text-white" : "border bg-white text-[#555]"}`}>+ Entrada</button>
          <button onClick={() => setType("salida")} className={`flex-1 rounded-xl py-2 text-sm font-bold ${type === "salida" ? "bg-[#ff4444] text-white" : "border bg-white text-[#555]"}`}>- Salida</button>
        </div>
        <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(+e.target.value)} placeholder="Cantidad" className="rounded-xl border px-3 py-2 text-sm" />
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motivo (compra, uso, vencimiento...)" className="rounded-xl border px-3 py-2 text-sm" />
        <button onClick={save} disabled={saving || quantity < 1} className="rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white disabled:opacity-50">{saving ? "Guardando..." : "Registrar"}</button>
      </div>
    </Modal>
  );
}

function HistoryModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const [movements, setMovements] = useState<Movement[]>([]);
  useEffect(() => {
    supabase.from("inventory_movements").select("*").eq("inventory_id", item.id).order("date", { ascending: false }).limit(50).then(({ data }) => setMovements((data || []) as Movement[]));
  }, [item.id]);

  return (
    <Modal open title={`Historial: ${item.name}`} onClose={onClose}>
      {movements.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#555]">Sin movimientos registrados</p>
      ) : (
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs text-[#555]"><th className="pb-2">Fecha</th><th className="pb-2">Tipo</th><th className="pb-2">Cant.</th><th className="pb-2">Motivo</th></tr></thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="border-b border-gray-50">
                <td className="py-2 text-xs">{new Date(m.date).toLocaleDateString()}</td>
                <td className="py-2"><Badge label={m.type} color={m.type === "entrada" ? "#4bbb00" : "#ff4444"} /></td>
                <td className="py-2 font-bold">{m.quantity}</td>
                <td className="py-2 text-xs text-[#555]">{m.reason || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  );
}
