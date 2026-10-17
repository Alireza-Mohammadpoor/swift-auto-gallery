import type { Language } from "./language";

export type ArticleStatus = "draft" | "review" | "published" | "archived";

export interface ArticleCategory {
  id: string;
  slug: string;
  name_fa: string;
  name_en: string;
  sort_order: number;
}

/** Tiptap/ProseMirror JSON node */
export interface ContentNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: ContentNode[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  text?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  language: Language;
  excerpt: string | null;
  content: ContentNode;
  cover_image_path: string | null;
  cover_image_alt: string | null;
  author_name: string | null;
  category_id: string | null;
  category: ArticleCategory | null;
  translation_group_id: string | null;
  status: ArticleStatus;
  is_featured: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  social_image_path: string | null;
  source_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface ArticleFilters {
  language?: Language;
  categorySlug?: string;
  search?: string;
  page: number;
}
