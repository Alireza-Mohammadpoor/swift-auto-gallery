import { useParams, Navigate, NavLink } from "react-router-dom";
import { Phone, MessageCircle, Gauge, Fuel, Cog, Palette, MapPin, Flag } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useVehicle } from "@/hooks/useVehicles";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import { SEO } from "@/components/common/SEO";
import { formatAED, formatMileage } from "@/utils/format";
import { buildVehicleTitle, buildVehicleDescription, buildVehicleStructuredData } from "@/utils/seo";
import { buildPhoneUrl, buildWhatsAppUrl } from "@/utils/whatsapp";

export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: vehicle, isLoading, isError } = useVehicle(id);

  if (isLoading) {
    return (
      <div className="container-swift py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !vehicle) {
    return <Navigate to="/vehicles/not-found" replace />;
  }

  const spec = [
    { icon: Gauge, label: t.vehicle.mileage, value: vehicle.mileage != null ? formatMileage(vehicle.mileage, t.vehicle.km) : null },
    { icon: Fuel, label: t.vehicle.fuel, value: vehicle.fuel_type },
    { icon: Cog, label: t.vehicle.transmission, value: vehicle.transmission },
    { icon: Cog, label: t.vehicle.engine, value: vehicle.engine },
    { icon: Cog, label: t.vehicle.engineSize, value: vehicle.engine_size },
    { icon: Cog, label: t.vehicle.bodyType, value: vehicle.body_type },
    { icon: Palette, label: t.vehicle.color, value: vehicle.color },
    { icon: MapPin, label: t.vehicle.spec, value: vehicle.regional_specification },
    { icon: Flag, label: t.vehicle.country, value: vehicle.country },
  ].filter((s) => s.value);

  const description = language === "fa" ? vehicle.description_fa : vehicle.description_en;
  const whatsappMessage = t.vehicle.whatsappMessage(vehicle.brand, vehicle.model, vehicle.year);

  return (
    <>
      <SEO
        title={buildVehicleTitle(vehicle, language)}
        description={buildVehicleDescription(vehicle, language)}
        path={`/vehicles/${vehicle.id}`}
        structuredData={buildVehicleStructuredData(vehicle)}
        image={vehicle.images?.[0]?.url}
      />

      <div className="container-swift py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <VehicleGallery images={vehicle.images ?? []} alt={`${vehicle.brand} ${vehicle.model}`} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {vehicle.is_featured && (
                <span className="rounded-full bg-swift-gold/10 px-3 py-1 text-xs font-semibold text-swift-gold">
                  {t.vehicle.featured}
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  vehicle.is_available ? "bg-green-500/10 text-green-400" : "bg-swift-border text-swift-muted"
                }`}
              >
                {vehicle.is_available ? t.vehicle.available : t.vehicle.unavailable}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold text-swift-warm">
              {vehicle.brand} {vehicle.model} {vehicle.trim ? `· ${vehicle.trim}` : ""}
            </h1>
            <p className="mt-1 text-swift-muted">{vehicle.year}</p>
            <p className="mt-4 text-3xl font-extrabold text-swift-gold">{formatAED(vehicle.price_aed)}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={buildPhoneUrl()} className="btn-gold">
                <Phone size={16} />
                {t.vehicle.call}
              </a>
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle size={16} />
                {t.vehicle.whatsapp}
              </a>
            </div>

            {spec.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-swift-border pt-6">
                {spec.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm">
                    <s.icon size={16} className="shrink-0 text-swift-gold" />
                    <span className="text-swift-muted">{s.label}:</span>
                    <span className="text-swift-warm">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {description && (
              <div className="mt-8 border-t border-swift-border pt-6">
                <h2 className="section-label mb-2">
                  {language === "fa" ? t.vehicle.descriptionFa : t.vehicle.descriptionEn}
                </h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-swift-warm/90">{description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <NavLink to="/vehicles" className="text-sm text-swift-gold hover:underline">
            ← {t.vehicle.backToVehicles}
          </NavLink>
        </div>
      </div>
    </>
  );
}
