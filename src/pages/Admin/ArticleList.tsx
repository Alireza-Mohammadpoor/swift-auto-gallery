import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminArticles, useCategories, type AdminArticleFilters } from "@/hooks/useArticles";
import { supabase } from "@/lib/supabase/client";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import type { Article, ArticleStatus } from "@/types/article";

const sel = "rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none";

export function ArticleList() {
  const { t, language } = useLanguage();
  const qc = useQueryClient();
  const [filters, setFilters] = useState<AdminArticleFilters>({ page: 1, status: "", language: "", categoryId: "" });
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useAdminArticles({ ...filters, search });
  const { data: categories } = useCategories();
  const [target, setTarget] = useState<Article | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "articles"] });
    qc.invalidateQueries({ queryKey: ["articles"] });
  };

  const patch = async (a: Article, changes: Partial<{ status: ArticleStatus; is_featured: boolean; published_at: string | null }>) => {
    setBusy(a.id);
    setMessage(null);
    const { error } = await supabase.from("articles").update(changes).eq("id", a.id);
    setBusy(null);
    if (error) setMessage(t.adminBlog.actionError);
    refresh();
  };

  const publish = (a: Article) => patch(a, { status: "published", published_at: a.published_at ?? new Date().toISOString() });

  const remove = async () => {
    if (!target) return;
    setBusy(target.id);
    const { error } = await supabase.from("articles").delete().eq("id", target.id);
    setBusy(null);
    setTarget(null);
    if (error) setMessage(t.adminBlog.actionError);
    refresh();
  };

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / 20));
  const isScheduled = (a: Article) => a.status === "published" && !!a.published_at && new Date(a.published_at) > new Date();
  const fmt = (iso: string) => new Date(iso).toLocaleString(language === "fa" ? "fa-IR" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  const catName = (a: Article) => (a.category ? (language === "fa" ? a.category.name_fa : a.category.name_en) : "—");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-swift-warm">{t.adminBlog.articles}</h1>
        <NavLink to="/admin/articles/new" className="btn-gold !py-2 text-sm"><Plus size={16} />{t.adminBlog.newArticle}</NavLink>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input className={sel} placeholder={t.adminBlog.search} aria-label={t.adminBlog.search} value={search}
          onChange={(e) => { setSearch(e.target.value); setFilters((f) => ({ ...f, page: 1 })); }} />
        <select className={sel} aria-label={t.adminBlog.allStatuses} value={filters.status ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as ArticleStatus | "", page: 1 }))}>
          <option value="">{t.adminBlog.allStatuses}</option>
          {(["draft", "review", "published", "archived"] as const).map((s) => <option key={s} value={s}>{t.adminBlog.status[s]}</option>)}
        </select>
        <select className={sel} aria-label={t.adminBlog.allLanguages} value={filters.language ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, language: e.target.value as "fa" | "en" | "", page: 1 }))}>
          <option value="">{t.adminBlog.allLanguages}</option>
          <option value="fa">{t.adminBlog.fa}</option>
          <option value="en">{t.adminBlog.en}</option>
        </select>
        <select className={sel} aria-label={t.adminBlog.allCategories} value={filters.categoryId ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, categoryId: e.target.value, page: 1 }))}>
          <option value="">{t.adminBlog.allCategories}</option>
          {categories?.map((c) => <option key={c.id} value={c.id}>{language === "fa" ? c.name_fa : c.name_en}</option>)}
        </select>
      </div>

      {message && <p role="alert" className="mb-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{message}</p>}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : isError ? (
        <EmptyState title={t.common.error} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState title={t.adminBlog.noArticles} action={<NavLink to="/admin/articles/new" className="btn-gold">{t.adminBlog.newArticle}</NavLink>} />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-swift-border">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-swift-charcoal text-xs uppercase text-swift-muted">
                <tr>
                  <th className="px-4 py-3 text-start">{t.adminBlog.titleLabel}</th>
                  <th className="px-4 py-3 text-start">{t.adminBlog.language}</th>
                  <th className="px-4 py-3 text-start">{t.adminBlog.category}</th>
                  <th className="px-4 py-3 text-start">{t.adminBlog.updatedAt}</th>
                  <th className="px-4 py-3 text-end" />
                </tr>
              </thead>
              <tbody>
                {data.items.map((a) => (
                  <tr key={a.id} className="border-t border-swift-border bg-swift-surface align-top">
                    <td className="px-4 py-3">
                      <p className="font-medium text-swift-warm">{a.title}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
                        <span className="rounded-full bg-swift-border px-2 py-0.5 text-swift-warm/80">
                          {isScheduled(a) ? t.adminBlog.scheduled : t.adminBlog.status[a.status]}
                        </span>
                        {a.is_featured && <span className="rounded-full bg-swift-gold/10 px-2 py-0.5 text-swift-gold">{t.adminBlog.featured}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 uppercase text-swift-muted">{a.language}</td>
                    <td className="px-4 py-3 text-swift-muted">{catName(a)}</td>
                    <td className="px-4 py-3 text-swift-muted">{fmt(a.updated_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {a.status !== "published" ? (
                          <button disabled={busy === a.id} onClick={() => publish(a)} className="rounded-md border border-swift-border px-2.5 py-1 text-xs hover:border-swift-gold hover:text-swift-gold">{t.adminBlog.publish}</button>
                        ) : (
                          <button disabled={busy === a.id} onClick={() => patch(a, { status: "draft" })} className="rounded-md border border-swift-border px-2.5 py-1 text-xs hover:border-swift-gold hover:text-swift-gold">{t.adminBlog.unpublish}</button>
                        )}
                        <button disabled={busy === a.id} onClick={() => patch(a, { status: a.status === "archived" ? "draft" : "archived" })} className="rounded-md border border-swift-border px-2.5 py-1 text-xs hover:border-swift-gold hover:text-swift-gold">
                          {a.status === "archived" ? t.adminBlog.restore : t.adminBlog.archive}
                        </button>
                        <button disabled={busy === a.id} onClick={() => patch(a, { is_featured: !a.is_featured })} aria-label={t.adminBlog.featured} aria-pressed={a.is_featured}
                          className={`rounded-md border border-swift-border p-1.5 ${a.is_featured ? "text-swift-gold" : "text-swift-muted"}`}><Star size={14} /></button>
                        {a.status === "published" && (
                          <NavLink to={`/blog/${encodeURIComponent(a.slug)}`} target="_blank" aria-label={t.adminBlog.view} className="rounded-md border border-swift-border p-1.5 text-swift-warm/80 hover:text-swift-gold"><ExternalLink size={14} /></NavLink>
                        )}
                        <NavLink to={`/admin/articles/${a.id}/edit`} aria-label={t.common.edit} className="rounded-md border border-swift-border p-1.5 text-swift-warm/80 hover:text-swift-gold"><Pencil size={14} /></NavLink>
                        <button onClick={() => setTarget(a)} aria-label={t.adminBlog.delete} className="rounded-md border border-swift-border p-1.5 text-swift-warm/80 hover:text-red-400"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button className="btn-outline !py-2" disabled={filters.page <= 1} onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}>{t.blog.prev}</button>
              <span className="text-sm text-swift-muted">{filters.page} / {totalPages}</span>
              <button className="btn-outline !py-2" disabled={filters.page >= totalPages} onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}>{t.blog.next}</button>
            </div>
          )}
        </>
      )}

      <ConfirmDialog open={!!target} title={t.adminBlog.deleteConfirm} subtitle={t.adminBlog.deleteSub} onConfirm={remove} onCancel={() => setTarget(null)} loading={!!busy} />
    </div>
  );
}
