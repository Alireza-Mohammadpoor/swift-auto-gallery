import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Link2, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useArticleBySlug, useRelatedArticles, useTranslations } from "@/hooks/useArticles";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import { SEO } from "@/components/common/SEO";
import { articleImageUrl, buildToc, formatArticleDate, isSafeHref, readingMinutes } from "@/utils/article";
import { buildArticleStructuredData, buildBreadcrumbStructuredData, SITE_NAME, SITE_URL } from "@/utils/seo";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { BlogNotFound } from "./BlogNotFound";

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { data: article, isLoading, isError } = useArticleBySlug(slug, language);
  const { data: translations } = useTranslations(article?.translation_group_id);
  const { data: related } = useRelatedArticles(article);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="container-swift max-w-3xl py-12 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="aspect-[16/9] w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (isError || !article) return <BlogNotFound />;

  const lang = article.language;
  const dir = lang === "fa" ? "rtl" : "ltr";
  const cover = articleImageUrl(article.cover_image_path);
  const social = articleImageUrl(article.social_image_path) ?? cover ?? undefined;
  const toc = buildToc(article.content);
  const catName = article.category ? (lang === "fa" ? article.category.name_fa : article.category.name_en) : null;
  const path = `/blog/${encodeURIComponent(article.slug)}`;
  const url = `${SITE_URL}${path}`;
  const description = article.seo_description || article.excerpt || article.title;
  const otherLang = translations?.find((x) => x.language !== lang);
  const alternates = translations && translations.length > 1
    ? translations.map((x) => ({ lang: x.language, path: `/blog/${encodeURIComponent(x.slug)}` }))
    : undefined;
  const sources = article.source_urls.filter(isSafeHref);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const waMsg = lang === "fa"
    ? `سلام، مقاله «${article.title}» را خواندم و سوالی دارم.`
    : `Hello, I read "${article.title}" and have a question.`;

  return (
    <>
      <SEO
        title={article.seo_title || `${article.title} | ${SITE_NAME}`}
        description={description}
        path={path}
        canonicalUrl={article.canonical_url ?? undefined}
        image={social}
        ogType="article"
        locale={lang}
        alternates={alternates}
        publishedTime={article.published_at ?? undefined}
        modifiedTime={article.updated_at}
        structuredData={[
          buildArticleStructuredData({
            title: article.title,
            description,
            slug: article.slug,
            language: lang,
            image: social,
            authorName: article.author_name,
            publishedAt: article.published_at,
            updatedAt: article.updated_at,
          }),
          buildBreadcrumbStructuredData([
            { name: t.blog.home, path: "/" },
            { name: t.nav.blog, path: "/blog" },
            { name: article.title, path },
          ]),
        ]}
      />

      <article dir={dir} className="container-swift max-w-3xl py-10 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-swift-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-swift-gold">{t.blog.home}</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/blog" className="hover:text-swift-gold">{t.nav.blog}</Link></li>
            {article.category && (
              <>
                <li aria-hidden>/</li>
                <li><Link to={`/blog/category/${article.category.slug}`} className="hover:text-swift-gold">{catName}</Link></li>
              </>
            )}
          </ol>
        </nav>

        {catName && <p className="section-label">{catName}</p>}
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-swift-warm sm:text-4xl">{article.title}</h1>
        {article.excerpt && <p className="mt-4 text-lg leading-8 text-swift-muted">{article.excerpt}</p>}

        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-swift-muted">
          {article.author_name && <span>{t.blog.by} {article.author_name}</span>}
          {article.published_at && <span>{formatArticleDate(article.published_at, lang)}</span>}
          {article.published_at && new Date(article.updated_at).getTime() - new Date(article.published_at).getTime() > 86_400_000 && (
            <span>{t.blog.updated}: {formatArticleDate(article.updated_at, lang)}</span>
          )}
          <span>{readingMinutes(article.content)} {t.blog.minRead}</span>
        </p>

        {otherLang && (
          <p className="mt-3 text-sm">
            <span className="text-swift-muted">{t.blog.otherLanguage} </span>
            <Link to={`/blog/${encodeURIComponent(otherLang.slug)}`} className="text-swift-gold underline">{otherLang.title}</Link>
          </p>
        )}

        {cover && (
          <figure className="my-8">
            <img src={cover} alt={article.cover_image_alt ?? ""} width={1200} height={675} className="w-full rounded-lg border border-swift-border object-cover" />
          </figure>
        )}

        {toc.length > 2 && (
          <nav aria-label={t.blog.toc} className="surface-card mb-8 p-5">
            <p className="section-label mb-3">{t.blog.toc}</p>
            <ul className="space-y-1.5 text-sm">
              {toc.map((i) => (
                <li key={i.id} style={{ paddingInlineStart: `${(i.level - 2) * 16}px` }}>
                  <a href={`#${i.id}`} className="text-swift-warm/80 hover:text-swift-gold">{i.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <ArticleContent doc={article.content} />

        {sources.length > 0 && (
          <section className="mt-10 border-t border-swift-border pt-6">
            <h2 className="section-label mb-3">{t.blog.sources}</h2>
            <ul className="space-y-1 text-sm" dir="ltr">
              {sources.map((s) => (
                <li key={s}><a href={s} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-swift-gold hover:underline">{s}</a></li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-swift-border pt-6 text-sm">
          <span className="text-swift-muted">{t.blog.share}:</span>
          <button onClick={copy} className="flex items-center gap-1.5 rounded-md border border-swift-border px-3 py-1.5 hover:border-swift-gold hover:text-swift-gold">
            <Link2 size={14} /> {copied ? t.blog.linkCopied : t.blog.copyLink}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-swift-border px-3 py-1.5 hover:border-swift-gold hover:text-swift-gold"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>

        <aside className="surface-card mt-10 p-6 text-center">
          <h2 className="text-lg font-semibold text-swift-warm">{t.blog.ctaTitle}</h2>
          <p className="mt-1 text-sm text-swift-muted">{t.blog.ctaText}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/vehicles" className="btn-gold !py-2 text-sm">{t.blog.browseVehicles}</Link>
            <Link to="/services" className="btn-outline !py-2 text-sm">{t.blog.ourServices}</Link>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2 text-sm">{t.vehicle.whatsapp}</a>
          </div>
        </aside>
      </article>

      {related && related.length > 0 && (
        <section className="container-swift pb-16">
          <h2 className="section-label mb-5">{t.blog.related}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}
    </>
  );
}
