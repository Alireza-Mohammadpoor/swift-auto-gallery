import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublishedVehicles } from "@/hooks/useVehicles";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { VehicleGridSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { SEO } from "@/components/common/SEO";
import { SITE_NAME } from "@/utils/seo";
import { buildPhoneUrl } from "@/utils/whatsapp";
import type { VehicleFilters as Filters } from "@/types/vehicle";

export function Vehicles() {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<Filters>({ sortBy: "newest" });
  const { data: vehicles, isLoading, isError } = usePublishedVehicles(filters);

  const facets = useMemo(() => {
    const source = vehicles ?? [];
    const uniq = (arr: (string | null)[]) => Array.from(new Set(arr.filter(Boolean))) as string[];
    return {
      brands: uniq(source.map((v) => v.brand)),
      bodyTypes: uniq(source.map((v) => v.body_type)),
      fuelTypes: uniq(source.map((v) => v.fuel_type)),
      transmissions: uniq(source.map((v) => v.transmission)),
    };
  }, [vehicles]);

  return (
    <>
      <SEO
        title={`${t.vehicles.title} | ${SITE_NAME}`}
        description={
          language === "fa"
            ? "مشاهده موجودی خودروهای اتو گالری سوییفت در جزیره کیش."
            : "Browse the Swift Auto Gallery vehicle inventory in Kish Island."
        }
        path="/vehicles"
      />

      <section className="container-swift py-12 lg:py-16">
        <div className="mb-8 text-center">
          <p className="section-label">{t.vehicles.subtitle}</p>
          <h1 className="mt-2 text-3xl font-bold text-swift-warm sm:text-4xl">{t.vehicles.title}</h1>
        </div>

        <div className="mb-8">
          <VehicleFilters filters={filters} onChange={setFilters} {...facets} />
        </div>

        {isLoading ? (
          <VehicleGridSkeleton count={9} />
        ) : isError ? (
          <EmptyState title={t.common.error} />
        ) : vehicles && vehicles.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-swift-muted">
              {vehicles.length} {t.vehicles.resultsCount}
            </p>
            <VehicleGrid vehicles={vehicles} />
          </>
        ) : (
          <EmptyState
            title={t.vehicles.empty}
            subtitle={t.vehicles.emptySubtitle}
            action={
              <a href={buildPhoneUrl()} className="btn-gold">
                {t.contact.call}
              </a>
            }
          />
        )}
      </section>
    </>
  );
}
