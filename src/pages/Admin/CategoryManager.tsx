import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCategories } from "@/hooks/useArticles";
import { supabase } from "@/lib/supabase/client";
import { slugify } from "@/utils/article";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import type { ArticleCategory } from "@/types/article";

const input = "w-full rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none";

export function CategoryManager() {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const { data: categories, isLoading } = useCategories();
  const [form, setForm] = useState({ slug: "", name_fa: "", name_en: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [target, setTarget] = useState<ArticleCategory | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["article-categories"] });

  const add = async (e: FormEvent) => {
    e.preventDefault();
    const slug = slugify(form.slug || form.name_en);
    if (!slug || !form.name_fa.trim() || !form.name_en.trim()) return setError(t.adminBlog.titleRequired);
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from("article_categories").insert({
      slug, name_fa: form.name_fa.trim(), name_en: form.name_en.trim(), sort_order: (categories?.length ?? 0) + 1,
    });
    setSaving(false);
    if (err) return setError(err.code === "23505" ? t.adminBlog.slugTaken : t.adminBlog.saveError);
    setForm({ slug: "", name_fa: "", name_en: "" });
    refresh();
  };

  const rename = async (c: ArticleCategory, field: "name_fa" | "name_en", value: string) => {
    if (!value.trim() || value === c[field]) return;
   //  const { error: err } = await supabase.from("article_categories").update({ [field]: value.trim() }).eq("id", c.id);
	const { error: err } = await supabase
  .from("article_categories")
  .update(
    { [field]: value.trim() } as unknown as import("../../types/database").Database["public"]["Tables"]["article_categories"]["Update"]
  )
  .eq("id", c.id);
    if (err) setError(t.adminBlog.saveError);
    refresh();
  };

  const remove = async () => {
    if (!target) return;
    const { error: err } = await supabase.from("article_categories").delete().eq("id", target.id);
    setTarget(null);
    if (err) setError(t.adminBlog.actionError);
    refresh();
    qc.invalidateQueries({ queryKey: ["articles"] });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-swift-warm">{t.adminBlog.categories}</h1>
      {error && <p role="alert" className="mb-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

      <form onSubmit={add} className="surface-card mb-8 grid grid-cols-1 gap-3 p-5 sm:grid-cols-4">
        <input className={input} dir="rtl" placeholder={t.adminBlog.nameFa} aria-label={t.adminBlog.nameFa} value={form.name_fa} onChange={(e) => setForm({ ...form, name_fa: e.target.value })} />
        <input className={input} dir="ltr" placeholder={t.adminBlog.nameEn} aria-label={t.adminBlog.nameEn} value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
        <input className={input} dir="ltr" placeholder="slug" aria-label="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <button className="btn-gold !py-2 text-sm" disabled={saving}>{t.adminBlog.addCategory}</button>
      </form>

      {isLoading ? <p className="text-swift-muted">{t.common.loading}</p> : (
        <ul className="space-y-3">
          {categories?.map((c) => (
            <li key={c.id} className="surface-card grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[1fr_1fr_auto_auto]">
              <input className={input} dir="rtl" defaultValue={c.name_fa} aria-label={t.adminBlog.nameFa} onBlur={(e) => rename(c, "name_fa", e.target.value)} />
              <input className={input} dir="ltr" defaultValue={c.name_en} aria-label={t.adminBlog.nameEn} onBlur={(e) => rename(c, "name_en", e.target.value)} />
              <code className="text-xs text-swift-muted" dir="ltr">{c.slug}</code>
              <button onClick={() => setTarget(c)} aria-label={t.adminBlog.delete} className="rounded-md border border-swift-border p-2 text-swift-warm/80 hover:text-red-400"><Trash2 size={14} /></button>
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog open={!!target} title={t.adminBlog.deleteCategoryConfirm} onConfirm={remove} onCancel={() => setTarget(null)} />
    </div>
  );
}
