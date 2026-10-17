import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminArticle, useCategories } from "@/hooks/useArticles";
import { supabase } from "@/lib/supabase/client";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { articleImageUrl, slugify, uploadArticleImage } from "@/utils/article";
import type { Article, ArticleStatus, ContentNode } from "@/types/article";
import type { Language } from "@/types/language";

const EMPTY_DOC: ContentNode = { type: "doc", content: [] };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const input = "w-full rounded-md border border-swift-border bg-swift-black px-3 py-2.5 text-sm text-swift-warm focus:border-swift-gold focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-swift-warm/80";

interface FormState {
  title: string; slug: string; language: Language; excerpt: string; author_name: string;
  category_id: string; translation_group_id: string; status: ArticleStatus; is_featured: boolean;
  published_at: string; // datetime-local
  seo_title: string; seo_description: string; canonical_url: string;
  cover_image_path: string; cover_image_alt: string; social_image_path: string; sources: string;
}

const blank: FormState = {
  title: "", slug: "", language: "fa", excerpt: "", author_name: "", category_id: "", translation_group_id: "",
  status: "draft", is_featured: false, published_at: "", seo_title: "", seo_description: "", canonical_url: "",
  cover_image_path: "", cover_image_alt: "", social_image_path: "", sources: "",
};

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

export function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { t, language: uiLang } = useLanguage();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: existing, isLoading } = useAdminArticle(id);
  const { data: categories } = useCategories();

  const [form, setForm] = useState<FormState>(blank);
  const [doc, setDoc] = useState<ContentNode>(EMPTY_DOC);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loaded, setLoaded] = useState<Article | null>(null);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"cover" | "social" | null>(null);

  useEffect(() => {
    if (!existing) return;
    setLoaded(existing);
    setSlugTouched(true);
    setDoc((existing.content as ContentNode) ?? EMPTY_DOC);
    setForm({
      title: existing.title, slug: existing.slug, language: existing.language, excerpt: existing.excerpt ?? "",
      author_name: existing.author_name ?? "", category_id: existing.category_id ?? "",
      translation_group_id: existing.translation_group_id ?? "", status: existing.status, is_featured: existing.is_featured,
      published_at: toLocalInput(existing.published_at), seo_title: existing.seo_title ?? "",
      seo_description: existing.seo_description ?? "", canonical_url: existing.canonical_url ?? "",
      cover_image_path: existing.cover_image_path ?? "", cover_image_alt: existing.cover_image_alt ?? "",
      social_image_path: existing.social_image_path ?? "", sources: (existing.source_urls ?? []).join("\n"),
    });
    setDirty(false);
  }, [existing]);

  // Warn on tab close / refresh with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => { setForm((p) => ({ ...p, [k]: v })); setDirty(true); };

  const onTitle = (v: string) => {
    setForm((p) => ({ ...p, title: v, slug: slugTouched ? p.slug : slugify(v) }));
    setDirty(true);
  };

  const uploadImage = async (kind: "cover" | "social", file: File | undefined) => {
    if (!file) return;
    setUploading(kind);
    const res = await uploadArticleImage(file);
    setUploading(null);
    if (!res.ok) return setBanner({ ok: false, text: res.reason === "type" ? t.adminBlog.invalidImage : res.reason === "size" ? t.adminBlog.tooLarge : t.adminBlog.uploadError });
    set(kind === "cover" ? "cover_image_path" : "social_image_path", res.path);
  };

  const dir = form.language === "fa" ? "rtl" : "ltr";
  const editorKey = useMemo(() => `${loaded?.id ?? "new"}-${form.language}`, [loaded?.id, form.language]);

  const submit = async (e: FormEvent, forcedStatus?: ArticleStatus) => {
    e.preventDefault();
    if (saving) return;
    setBanner(null);
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = t.adminBlog.titleRequired;
    if (!slugify(form.slug)) errs.slug = t.adminBlog.slugRequired;
    if (form.canonical_url && !/^https:\/\//i.test(form.canonical_url)) errs.canonical_url = t.adminBlog.canonicalInvalid;
    if (form.translation_group_id && !UUID.test(form.translation_group_id)) errs.translation_group_id = t.adminBlog.invalidGroup;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (loaded && loaded.status === "published" && loaded.slug !== slugify(form.slug) && !window.confirm(t.adminBlog.slugChangeWarning)) return;

    const status = forcedStatus ?? form.status;
    const publishedAt = form.published_at ? new Date(form.published_at).toISOString() : status === "published" ? (loaded?.published_at ?? new Date().toISOString()) : null;
    const sources = form.sources.split("\n").map((s) => s.trim()).filter(Boolean);

    const payload = {
      title: form.title.trim(), slug: slugify(form.slug), language: form.language,
      excerpt: form.excerpt.trim() || null, content: doc, author_name: form.author_name.trim() || null,
      category_id: form.category_id || null, translation_group_id: form.translation_group_id || null,
      status, is_featured: form.is_featured, published_at: publishedAt,
      seo_title: form.seo_title.trim() || null, seo_description: form.seo_description.trim() || null,
      canonical_url: form.canonical_url.trim() || null,
      cover_image_path: form.cover_image_path || null, cover_image_alt: form.cover_image_alt.trim() || null,
      social_image_path: form.social_image_path || null, source_urls: sources,
    };

    setSaving(true);
    let errorCode: string | undefined;
    let failed = false;
    if (loaded) {
      // Optimistic concurrency: only update if nobody changed the row since we loaded it.
      // const { data, error } = await supabase.from("articles").update(payload).eq("id", loaded.id).eq("updated_at", loaded.updated_at).select("id");
		const { data, error } = await supabase
		.from("articles")
		.update(
			payload as unknown as import("../../types/database").Database["public"]["Tables"]["articles"]["Update"]
		)
		.eq("id", loaded.id)
		.eq("updated_at", loaded.updated_at)
		.select("id");
      if (error) { failed = true; errorCode = error.code; }
      else if (!data || data.length === 0) { setSaving(false); return setBanner({ ok: false, text: t.adminBlog.conflict }); }
    } else {
      // const { error } = await supabase.from("articles").insert(payload);
		const { error } = await supabase
  .from("articles")
  .insert(
    payload as unknown as import("../../types/database").Database["public"]["Tables"]["articles"]["Insert"]
  );
      if (error) { failed = true; errorCode = error.code; }
    }
    setSaving(false);

    if (failed) {
      if (errorCode === "23505") { setErrors({ slug: t.adminBlog.slugTaken }); return; }
      return setBanner({ ok: false, text: t.adminBlog.saveError });
    }
    setDirty(false);
    qc.invalidateQueries({ queryKey: ["admin"] });
    qc.invalidateQueries({ queryKey: ["articles"] });
    setBanner({ ok: true, text: t.adminBlog.saved });
    setTimeout(() => navigate("/admin/articles"), 500);
  };

  const cancel = () => { if (!dirty || window.confirm(t.adminBlog.unsaved)) navigate("/admin/articles"); };

  if (isEdit && isLoading) return <p className="text-swift-muted">{t.common.loading}</p>;
  if (isEdit && !isLoading && !existing) return <p className="text-swift-muted">{t.blog.notFoundTitle}</p>;

  const cover = articleImageUrl(form.cover_image_path);
  const social = articleImageUrl(form.social_image_path);
  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-red-400">{errors[k]}</p>;

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-swift-warm">{isEdit ? t.adminBlog.editArticle : t.adminBlog.newArticle}</h1>
        <button type="button" onClick={() => setPreview((p) => !p)} className="btn-outline !py-2 text-sm" aria-pressed={preview}>
          {preview ? t.adminBlog.editMode : t.adminBlog.preview}
        </button>
      </div>

      {banner && <p role="status" className={`rounded-md px-4 py-3 text-sm ${banner.ok ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{banner.text}</p>}
      <p className="rounded-md border border-swift-border bg-swift-charcoal px-4 py-3 text-xs text-swift-muted">{t.adminBlog.sourcesNote}</p>

      {preview ? (
        <article dir={dir} className="surface-card p-6">
          {cover && <img src={cover} alt={form.cover_image_alt} className="mb-6 w-full rounded-lg object-cover" />}
          <h2 className="text-3xl font-extrabold text-swift-warm">{form.title}</h2>
          {form.excerpt && <p className="mt-3 text-swift-muted">{form.excerpt}</p>}
          <div className="mt-6"><ArticleContent doc={doc} /></div>
        </article>
      ) : null}

      <div className={preview ? "hidden" : "space-y-6"}>
        <section className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="title">{t.adminBlog.titleLabel} *</label>
            <input id="title" dir={dir} className={input} value={form.title} onChange={(e) => onTitle(e.target.value)} />
            {err("title")}
          </div>
          <div>
            <label className={label} htmlFor="slug">{t.adminBlog.slug} *</label>
            <input id="slug" dir="ltr" className={input} value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "")); }} />
            {err("slug")}
          </div>
          <div>
            <label className={label} htmlFor="language">{t.adminBlog.language}</label>
            <select id="language" className={input} value={form.language} onChange={(e) => set("language", e.target.value as Language)}>
              <option value="fa">{t.adminBlog.fa}</option><option value="en">{t.adminBlog.en}</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="excerpt">{t.adminBlog.excerpt}</label>
            <textarea id="excerpt" dir={dir} rows={3} className={input} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="author">{t.adminBlog.author}</label>
            <input id="author" dir={dir} className={input} value={form.author_name} onChange={(e) => set("author_name", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="category">{t.adminBlog.category}</label>
            <select id="category" className={input} value={form.category_id} onChange={(e) => set("category_id", e.target.value)}>
              <option value="">{t.adminBlog.noCategory}</option>
              {categories?.map((c) => <option key={c.id} value={c.id}>{uiLang === "fa" ? c.name_fa : c.name_en}</option>)}
            </select>
          </div>
        </section>

        <section className="surface-card space-y-3 p-6">
          <h2 className="section-label">{t.adminBlog.cover}</h2>
          <div className="flex flex-wrap items-start gap-4">
            {cover && <img src={cover} alt="" className="h-28 w-44 rounded-md border border-swift-border object-cover" />}
            <div className="flex-1 space-y-3">
              <label className="btn-outline inline-flex cursor-pointer !py-2 text-sm">
                {uploading === "cover" ? <><Loader2 size={14} className="animate-spin" />{t.adminBlog.uploading}</> : <><Upload size={14} />{t.adminBlog.uploadImage}</>}
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp,image/avif" disabled={!!uploading} onChange={(e) => uploadImage("cover", e.target.files?.[0])} />
              </label>
              {cover && <button type="button" className="ms-3 text-xs text-red-400" onClick={() => set("cover_image_path", "")}>{t.adminBlog.removeImage}</button>}
              <div>
                <label className={label} htmlFor="coveralt">{t.adminBlog.coverAlt}</label>
                <input id="coveralt" dir={dir} className={input} value={form.cover_image_alt} onChange={(e) => set("cover_image_alt", e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="section-label mb-3">{t.adminBlog.body}</h2>
          <RichTextEditor key={editorKey} value={doc} dir={dir} onChange={(d) => { setDoc(d); setDirty(true); }} onError={(m) => setBanner({ ok: false, text: m })} />
        </section>

        <section className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className={label} htmlFor="seot">{t.adminBlog.seoTitle}</label>
            <input id="seot" dir={dir} className={input} value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="seod">{t.adminBlog.seoDescription}</label>
            <textarea id="seod" dir={dir} rows={2} maxLength={200} className={input} value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} /></div>
          <div><label className={label} htmlFor="canon">{t.adminBlog.canonical}</label>
            <input id="canon" dir="ltr" className={input} value={form.canonical_url} onChange={(e) => set("canonical_url", e.target.value)} />{err("canonical_url")}</div>
          <div><label className={label}>{t.adminBlog.socialImage}</label>
            <div className="flex items-center gap-3">
              {social && <img src={social} alt="" className="h-10 w-16 rounded border border-swift-border object-cover" />}
              <label className="btn-outline inline-flex cursor-pointer !py-1.5 text-xs"><Upload size={12} />{uploading === "social" ? t.adminBlog.uploading : t.adminBlog.uploadImage}
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp,image/avif" disabled={!!uploading} onChange={(e) => uploadImage("social", e.target.files?.[0])} /></label>
              {social && <button type="button" className="text-xs text-red-400" onClick={() => set("social_image_path", "")}>{t.adminBlog.removeImage}</button>}
            </div></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="src">{t.adminBlog.sources}</label>
            <textarea id="src" dir="ltr" rows={3} className={input} value={form.sources} onChange={(e) => set("sources", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="grp">{t.adminBlog.translationGroup}</label>
            <div className="flex gap-2">
              <input id="grp" dir="ltr" className={input} value={form.translation_group_id} onChange={(e) => set("translation_group_id", e.target.value)} />
              <button type="button" className="btn-outline !py-2 text-xs whitespace-nowrap" onClick={() => set("translation_group_id", crypto.randomUUID())}>{t.adminBlog.generateGroup}</button>
            </div>
            <p className="mt-1 text-xs text-swift-muted">{t.adminBlog.translationHint}</p>{err("translation_group_id")}</div>
        </section>

        <section className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
          <div><label className={label} htmlFor="status">{t.adminBlog.status.draft} / {t.adminBlog.status.published}</label>
            <select id="status" className={input} value={form.status} onChange={(e) => set("status", e.target.value as ArticleStatus)}>
              {(["draft", "review", "published", "archived"] as const).map((s) => <option key={s} value={s}>{t.adminBlog.status[s]}</option>)}
            </select></div>
          <div><label className={label} htmlFor="pub">{t.adminBlog.publishedAt}</label>
            <input id="pub" type="datetime-local" className={input} value={form.published_at} onChange={(e) => set("published_at", e.target.value)} /></div>
          <label className="flex items-center gap-2 self-end pb-2 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-swift-gold" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} />{t.adminBlog.featured}
          </label>
          <p className="text-xs text-swift-muted sm:col-span-3">{t.adminBlog.scheduleHint}</p>
        </section>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={cancel} className="btn-outline" disabled={saving}>{t.common.cancel}</button>
        <button type="submit" className="btn-gold" disabled={saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : null}{t.adminBlog.save}</button>
      </div>
    </form>
  );
}
