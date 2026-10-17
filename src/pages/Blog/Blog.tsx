import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCategories, useFeaturedArticle, usePublishedArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { VehicleCardSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { SEO } from "@/components/common/SEO";
import { PAGE_SIZE } from "@/utils/article";
import { SITE_NAME } from "@/utils/seo";

export function Blog() {
  const { t, language } = useLanguage();
  const { slug: categorySlug } = useParams<{ slug: string }>();
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page") ?? 1) || 1);
  const urlSearch = params.get("q") ?? "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  useEffect(() => {
    const id = setTimeout(() => {
      if (searchInput !== urlSearch) {
        const next = new URLSearchParams(params);
        if (searchInput) next.set("q", searchInput); else next.delete("q");
        next.delete("page");
        setParams(next, { replace: true });
      }
    }, 350);
    return () => clearTimeout(id);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: categories } = useCategories();
  const { data: featured } = useFeaturedArticle(language);
  const { data, isLoading, isError } = usePublishedArticles({
    language,
    categorySlug,
    search: urlSearch || undefined,
    page,
  });

  const category = categories?.find((c) => c.slug === categorySlug);
  const catName = category ? (language === "fa" ? category.name_fa : category.name_en) : null;
  const showFeatured = !!featured && !categorySlug && !urlSearch && page === 1;
  const items = (data?.items ?? []).filter((a) => !(showFeatured && a.id === featured?.id));
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));
  const basePath = categorySlug ? `/blog/category/${categorySlug}` : "/blog";

  const goPage = (p: number) => {
    const next = new URLSearchParams(params);
    if (p > 1) next.set("page", String(p)); else next.delete("page");
    setParams(next);
    window.scrollTo({ top: 0 });
  };

  const title = catName ? `${catName} | ${t.blog.title} | ${SITE_NAME}` : `${t.blog.title} | ${SITE_NAME}`;

  return (
    <>
      <SEO
        title={title}
        description={t.blog.subtitle}
        path={page > 1 ? `${basePath}?page=${page}` : basePath}
        locale={language}
        noindex={!!urlSearch}
      />

      <section className="border-b border-swift-border bg-gradient-to-b from-swift-charcoal to-swift-black">
        <div className="container-swift py-14 text-center lg:py-20">
          <p className="section-label">{t.blog.heroLabel}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-swift-warm sm:text-5xl">{catName ?? t.blog.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-swift-muted">{t.blog.subtitle}</p>
        </div>
      </section>

      <div className="container-swift py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav aria-label={t.blog.category} className="flex flex-wrap gap-2">
            <Link
              to="/blog"
              className={`rounded-full border px-4 py-1.5 text-sm ${!categorySlug ? "border-swift-gold bg-swift-gold/10 text-swift-gold" : "border-swift-border text-swift-warm/80 hover:border-swift-gold/60"}`}
            >
              {t.blog.allCategories}
            </Link>
            {categories?.map((c) => (
              <Link
                key={c.id}
                to={`/blog/category/${c.slug}`}
                aria-current={c.slug === categorySlug ? "page" : undefined}
                className={`rounded-full border px-4 py-1.5 text-sm ${c.slug === categorySlug ? "border-swift-gold bg-swift-gold/10 text-swift-gold" : "border-swift-border text-swift-warm/80 hover:border-swift-gold/60"}`}
              >
                {language === "fa" ? c.name_fa : c.name_en}
              </Link>
            ))}
          </nav>
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-swift-muted" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              aria-label={t.blog.searchPlaceholder}
              className="w-full rounded-md border border-swift-border bg-swift-black py-2.5 ps-9 pe-3 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
            />
          </div>
        </div>

        {showFeatured && featured && (
          <section aria-label={t.blog.featured} className="mb-10">
            <p className="section-label mb-3">{t.blog.featured}</p>
            <ArticleCard article={featured} large />
          </section>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <VehicleCardSkeleton key={i} />)}
          </div>
        ) : isError ? (
          <EmptyState title={t.blog.error} />
        ) : items.length === 0 && !showFeatured ? (
          <EmptyState
            title={categorySlug || urlSearch ? t.blog.emptyFiltered : t.blog.empty}
            subtitle={categorySlug || urlSearch ? undefined : t.blog.emptySubtitle}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
                <button className="btn-outline !py-2" disabled={page <= 1} onClick={() => goPage(page - 1)}>{t.blog.prev}</button>
                <span className="text-sm text-swift-muted">{t.blog.page} {page} / {totalPages}</span>
                <button className="btn-outline !py-2" disabled={page >= totalPages} onClick={() => goPage(page + 1)}>{t.blog.next}</button>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
}
