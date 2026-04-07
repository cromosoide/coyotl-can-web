// @ts-nocheck
"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import Badge from "@/components/admin/Badge";
import { PILARES_BLOG } from "@/lib/dashboard-constants";

interface Post {
  id: string; title: string; slug: string; excerpt: string; content: string;
  image_url: string; pillar: string; status: string; published_at: string; created_at: string;
}

function toSlug(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function BlogEditorPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState<Post | null | "new">(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts((data || []) as Post[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function deletePost(id: string) {
    if (!confirm("¿Eliminar este post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    toast("Post eliminado");
    load();
  }

  async function toggleStatus(post: Post) {
    const newStatus = post.status === "draft" ? "published" : "draft";
    const update: any = { status: newStatus };
    if (newStatus === "published") update.published_at = new Date().toISOString();
    await supabase.from("posts").update(update).eq("id", post.id);
    toast(newStatus === "published" ? "Post publicado" : "Post despublicado");
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#2d0057]">✍️ Blog</h1>
        <button onClick={() => setShowEditor("new")} className="rounded-xl bg-[#8b00fb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7400d4]">+ Nuevo Post</button>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff006b] border-t-transparent" /></div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center"><p className="text-3xl">✍️</p><p className="mt-2 text-sm text-[#555]">Sin posts — crea el primero</p></div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold text-[#2d0057]">{p.title}</h3>
                  <Badge label={p.status === "published" ? "Publicado" : "Borrador"} color={p.status === "published" ? "#4bbb00" : "#ffab00"} />
                  {p.pillar && <span className="text-xs text-[#555]">{p.pillar}</span>}
                </div>
                <p className="text-xs text-[#555]">{p.excerpt || "Sin extracto"}</p>
                <p className="mt-1 text-xs text-[#888]">/{p.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleStatus(p)} className={`rounded-lg px-3 py-1 text-xs font-bold text-white ${p.status === "published" ? "bg-[#ffab00]" : "bg-[#4bbb00]"}`}>
                  {p.status === "published" ? "Despublicar" : "Publicar"}
                </button>
                <button onClick={() => setShowEditor(p)} className="rounded-lg bg-[#8b00fb] px-3 py-1 text-xs font-bold text-white">Editar</button>
                <button onClick={() => deletePost(p.id)} className="rounded-lg bg-[#ff4444] px-3 py-1 text-xs font-bold text-white">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditor && (
        <PostEditorModal
          post={showEditor === "new" ? null : showEditor}
          onClose={() => { setShowEditor(null); load(); }}
          toast={toast}
        />
      )}
    </div>
  );
}

function PostEditorModal({ post, onClose, toast }: { post: Post | null; onClose: () => void; toast: (m: string) => void }) {
  const [form, setForm] = useState({
    title: post?.title || "", slug: post?.slug || "", excerpt: post?.excerpt || "",
    content: post?.content || "", image_url: post?.image_url || "",
    pillar: post?.pillar || PILARES_BLOG[0], status: post?.status || "draft",
  });
  const [saving, setSaving] = useState(false);

  function handleTitleChange(title: string) {
    setForm({ ...form, title, slug: post ? form.slug : toSlug(title) });
  }

  async function save() {
    setSaving(true);
    const data = {
      ...form,
      published_at: form.status === "published" ? (post?.published_at || new Date().toISOString()) : null,
    };

    if (post) {
      await supabase.from("posts").update(data).eq("id", post.id);
      toast("Post actualizado");
    } else {
      await supabase.from("posts").insert(data);
      toast("Post creado");
    }
    setSaving(false);
    onClose();
  }

  return (
    <Modal open title={post ? "Editar Post" : "Nuevo Post"} onClose={onClose} wide>
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Título</label>
          <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Slug</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm text-[#555]" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Extracto</label>
          <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Contenido</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full rounded-xl border px-3 py-2 text-sm font-mono" placeholder="Escribe el contenido del post aquí..." />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2d0057]">URL imagen destacada</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Pilar</label>
            <select value={form.pillar} onChange={(e) => setForm({ ...form, pillar: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm">
              {PILARES_BLOG.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2d0057]">Estado</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </div>
        <button onClick={save} disabled={saving || !form.title || !form.slug} className="rounded-xl bg-[#8b00fb] px-5 py-3 font-bold text-white disabled:opacity-50">
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}
