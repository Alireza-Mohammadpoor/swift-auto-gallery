import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { articleImageUrl, formatArticleDate, readingMinutes } from "@/utils/article";
import type { Article } from "@/types/article";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  const { t } = useLanguage();
  const img = articleImageUrl(article.cover_image_path);
  const catName = article.category ? (article.language === "fa" ? article.category.name_fa : article.category.name_en) : null;

  return (
    <Link
      to={`/blog/${encodeURIComponent(article.slug)}`}
      dir={article.language === "fa" ? "rtl" : "ltr"}
      className={`group overflow-hidden rounded-lg border border-swift-border bg-swift-surface transition-all hover:border-swift-gold/50 ${
        large ? "grid md:grid-cols-2" : "flex flex-col"
      }`}
    >
      <div className={`overflow-hidden bg-swift-charcoal ${large ? "aspect-[16/10] md:aspect-auto md:min-h-[320px]" : "aspect-[16/10]"}`}>
        {img && (
          <img
            src={img}
            alt={article.cover_image_alt ?? ""}
            width={800}
            height={500}
            loading={large ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${large ? "justify-center md:p-8" : ""}`}>
        {catName && <p className="section-label">{catName}</p>}
        <h3 className={`mt-2 font-bold text-swift-warm ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>{article.title}</h3>
        {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-swift-muted">{article.excerpt}</p>}
        <p className="mt-4 text-xs text-swift-muted">
          {article.published_at && formatArticleDate(article.published_at, article.language)} ·{" "}
          {readingMinutes(article.content)} {t.blog.minRead}
        </p>
      </div>
    </Link>
  );
}
