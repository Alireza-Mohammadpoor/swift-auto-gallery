import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";

export function BlogNotFound() {
  const { t } = useLanguage();
  return (
    <>
      <SEO title={t.blog.notFoundTitle} description={t.blog.notFoundSubtitle} path="/blog" noindex />
      <div className="container-swift flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-swift-gold/10 text-swift-gold"><Newspaper size={28} /></div>
        <h1 className="mt-6 text-2xl font-semibold text-swift-warm">{t.blog.notFoundTitle}</h1>
        <p className="mt-2 max-w-md text-swift-muted">{t.blog.notFoundSubtitle}</p>
        <div className="mt-8 flex gap-4">
          <Link to="/blog" className="btn-gold">{t.blog.backToBlog}</Link>
          <Link to="/" className="btn-outline">{t.blog.home}</Link>
        </div>
      </div>
    </>
  );
}
