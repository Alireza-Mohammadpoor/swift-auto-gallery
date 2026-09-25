import { Link } from "react-router-dom";
import { Gauge, Fuel, Cog, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatAED, formatMileage } from "@/utils/format";
import type { Vehicle } from "@/types/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLanguage();
  const primaryImage = vehicle.images?.find((img) => img.isPrimary) ?? vehicle.images?.[0];

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="group overflow-hidden rounded-lg border border-swift-border bg-swift-surface transition-all duration-300 hover:border-swift-gold/50 hover:shadow-lg hover:shadow-swift-gold/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-swift-charcoal">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-swift-muted">
            <Cog size={40} strokeWidth={1} />
          </div>
        )}
        {vehicle.is_featured && (
          <span className="absolute start-3 top-3 flex items-center gap-1 rounded-full bg-swift-black/80 px-2.5 py-1 text-xs font-semibold text-swift-gold backdrop-blur">
            <Star size={12} fill="currentColor" />
            {t.vehicle.featured}
          </span>
        )}
        {!vehicle.is_available && (
          <span className="absolute end-3 top-3 rounded-full bg-swift-black/80 px-2.5 py-1 text-xs font-semibold text-swift-muted backdrop-blur">
            {t.vehicle.unavailable}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-swift-warm">
          {vehicle.brand} {vehicle.model} {vehicle.trim ? `· ${vehicle.trim}` : ""}
        </h3>
        <p className="mt-1 text-sm text-swift-muted">{vehicle.year}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-swift-muted">
          {typeof vehicle.mileage === "number" && (
            <span className="flex items-center gap-1">
              <Gauge size={13} />
              {formatMileage(vehicle.mileage, t.vehicle.km)}
            </span>
          )}
          {vehicle.fuel_type && (
            <span className="flex items-center gap-1">
              <Fuel size={13} />
              {vehicle.fuel_type}
            </span>
          )}
          {vehicle.transmission && (
            <span className="flex items-center gap-1">
              <Cog size={13} />
              {vehicle.transmission}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-swift-border pt-4">
          <span className="text-lg font-bold text-swift-gold">{formatAED(vehicle.price_aed)}</span>
          <span className="text-xs font-medium text-swift-warm/70 group-hover:text-swift-gold">
            {t.vehicles.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  );
}
