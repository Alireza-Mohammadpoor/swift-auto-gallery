import { supabase } from "@/lib/supabase/client";
import type { ContentNode } from "@/types/article";

export const ARTICLE_BUCKET = "article-media";
export const PAGE_SIZE = 9;

export function articleImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return supabase.storage.from(ARTICLE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Readable URL slug; keeps Persian letters, strips punctuation. */
export function slugify(input: string): string {
  return input
    .normalize("NFKC")
    .replace(/[\u200c\u200f\u200e]/g, "-") // ZWNJ / direction marks -> hyphen
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractText(node: ContentNode | undefined): string {
  if (!node) return "";
  if (node.text) return node.text;
  return (node.content ?? []).map(extractText).join(" ");
}

export function readingMinutes(doc: ContentNode): number {
  const words = extractText(doc).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface TocItem {
  id: string;
  level: number;
  text: string;
}

export function headingId(index: number, text: string): string {
  return `h-${index}-${slugify(text).slice(0, 40)}`;
}

export function buildToc(doc: ContentNode): TocItem[] {
  const items: TocItem[] = [];
  (doc.content ?? []).forEach((n) => {
    if (n.type === "heading") {
      const text = extractText(n).trim();
      if (text) items.push({ id: headingId(items.length, text), level: Number(n.attrs?.level ?? 2), text });
    }
  });
  return items;
}

const SAFE_LINK = /^(https?:|mailto:|tel:|\/(?!\/))/i;
export function isSafeHref(href: unknown): href is string {
  return typeof href === "string" && SAFE_LINK.test(href.trim());
}
export function isSafeImageSrc(src: unknown): src is string {
  return typeof src === "string" && /^https?:\/\//i.test(src.trim());
}

export function formatArticleDate(iso: string, lang: "fa" | "en"): string {
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type UploadResult = { ok: true; path: string; url: string } | { ok: false; reason: "type" | "size" | "upload" };

/** Validates and uploads an image to the article-media bucket (admin-only via RLS). */
export async function uploadArticleImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return { ok: false, reason: "type" };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, reason: "size" };
  const ext = file.type.split("/")[1];
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(ARTICLE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (error) return { ok: false, reason: "upload" };
  return { ok: true, path, url: articleImageUrl(path) as string };
}
