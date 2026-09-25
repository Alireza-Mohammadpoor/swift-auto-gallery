import { NavLink } from "react-router-dom";
import { CarFront } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/common/SEO";

export function VehicleNotFound() {
  const { t } = useLanguage();
  return (
    <>
      <SEO title={t.vehicle.notFoundTitle} description={t.vehicle.notFoundSubtitle} path="/vehicles/not-found" noindex />
      <div className="container-swift flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-swift-gold/10 text-swift-gold">
          <CarFront size={28} />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-swift-warm">{t.vehicle.notFoundTitle}</h1>
        <p className="mt-2 max-w-md text-swift-muted">{t.vehicle.notFoundSubtitle}</p>
        <div className="mt-8 flex gap-4">
          <NavLink to="/vehicles" className="btn-gold">{t.vehicle.backToVehicles}</NavLink>
          <NavLink to="/" className="btn-outline">{t.vehicle.backToHome}</NavLink>
        </div>
      </div>
    </>
  );
}
