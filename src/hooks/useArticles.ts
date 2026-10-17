import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { PAGE_SIZE } from "@/utils/article";
import type { Article, ArticleCategory, ArticleFilters, ArticleStatus } from "@/types/article";
import type { Language } from "@/types/language";

const SELECT = "*, category:article_categories(id, slug, name_fa, name_en, sort_order)";

const asArticles = (d: unknown) => (d ?? []) as Article[];

/** Strip characters that have meaning inside PostgREST filter strings. */
const cleanSearch = (s: string) => s.replace(/[,()%*\\:]/g, " ").trim();

export function useCategories() {
  return useQuery({
    queryKey: ["article-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("article_categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ArticleCategory[];
    },
  });
}

// ---------- Public (RLS limits rows to published + due) ----------

export function usePublishedArticles(filters: ArticleFilters) {
  return useQuery({
    queryKey: ["articles", "public", filters],
    queryFn: async () => {
      let categoryId: string | undefined;
      if (filters.categorySlug) {
        const { data: cat, error: catError } = await supabase
          .from("article_categories")
          .select("id")
          .eq("slug", filters.categorySlug)
          .maybeSingle();
        if (catError) throw catError;
        if (!cat) return { items: [] as Article[], total: 0 };
        categoryId = cat.id;
      }

      const from = (filters.page - 1) * PAGE_SIZE;
      let q = supabase
        .from("articles")
        .select(SELECT, { count: "exact" })
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (filters.language) q = q.eq("language", filters.language);
      if (categoryId) q = q.eq("category_id", categoryId);
      const term = filters.search ? cleanSearch(filters.search) : "";
      if (term) q = q.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`);

      const { data, error, count } = await q;
      if (error) throw error;
      return { items: asArticles(data), total: count ?? 0 };
    },
  });
}

export function useFeaturedArticle(language: Language) {
  return useQuery({
    queryKey: ["articles", "featured", language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(SELECT)
        .eq("status", "published")
        .eq("is_featured", true)
        .eq("language", language)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Article | null) ?? null;
    },
  });
}

/** Slug is unique per language, so prefer the UI language but accept the other. */
export function useArticleBySlug(slug: string | undefined, preferred: Language) {
  return useQuery({
    queryKey: ["articles", "slug", slug, preferred],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(SELECT)
        .eq("slug", slug as string)
        .eq("status", "published");
      if (error) throw error;
      const rows = asArticles(data);
      return rows.find((a) => a.language === preferred) ?? rows[0] ?? null;
    },
  });
}

/** Published articles in the same translation group (RLS hides unpublished ones). */
export function useTranslations(groupId: string | null | undefined) {
  return useQuery({
    queryKey: ["articles", "translations", groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, language, title")
        .eq("translation_group_id", groupId as string)
        .eq("status", "published");
      if (error) throw error;
      return (data ?? []) as Pick<Article, "id" | "slug" | "language" | "title">[];
    },
  });
}

export function useRelatedArticles(article: Article | null | undefined) {
  return useQuery({
    queryKey: ["articles", "related", article?.id],
    enabled: !!article,
    queryFn: async () => {
      const a = article as Article;
      let q = supabase
        .from("articles")
        .select(SELECT)
        .eq("status", "published")
        .eq("language", a.language)
        .neq("id", a.id)
        .order("published_at", { ascending: false })
        .limit(3);
      if (a.category_id) q = q.eq("category_id", a.category_id);
      const { data, error } = await q;
      if (error) throw error;
      return asArticles(data);
    },
  });
}

// ---------- Admin (RLS: is_admin()) ----------

export interface AdminArticleFilters {
  page: number;
  search?: string;
  status?: ArticleStatus | "";
  language?: Language | "";
  categoryId?: string;
}

export function useAdminArticles(f: AdminArticleFilters) {
  return useQuery({
    queryKey: ["admin", "articles", f],
    queryFn: async () => {
      const from = (f.page - 1) * 20;
      let q = supabase
        .from("articles")
        .select(SELECT, { count: "exact" })
        .order("updated_at", { ascending: false })
        .range(from, from + 19);
      if (f.status) q = q.eq("status", f.status);
      if (f.language) q = q.eq("language", f.language);
      if (f.categoryId) q = q.eq("category_id", f.categoryId);
      const term = f.search ? cleanSearch(f.search) : "";
      if (term) q = q.ilike("title", `%${term}%`);
      const { data, error, count } = await q;
      if (error) throw error;
      return { items: asArticles(data), total: count ?? 0 };
    },
  });
}

export function useAdminArticle(id: string | undefined) {
  return useQuery({
    queryKey: ["admin", "article", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("articles").select(SELECT).eq("id", id as string).maybeSingle();
      if (error) throw error;
      return (data as unknown as Article | null) ?? null;
    },
  });
}
