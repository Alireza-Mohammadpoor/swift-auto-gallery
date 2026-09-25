import { NavLink } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";

export function NotFound() {
  const { t } = useLanguage();
  return (
    <>
      <SEO title="404" description="Page not found" path="/404" noindex />
      <div className="container-swift flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-6xl font-extrabold text-swift-gold">404</p>
        <h1 className="mt-4 text-xl font-semibold text-swift-warm">{t.vehicle.notFoundTitle}</h1>
        <NavLink to="/" className="btn-gold mt-8">
          {t.vehicle.backToHome}
        </NavLink>
      </div>
    </>
  );
}
