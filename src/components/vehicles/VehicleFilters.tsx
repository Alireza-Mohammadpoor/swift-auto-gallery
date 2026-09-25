import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { VehicleFilters as Filters } from "@/types/vehicle";

interface VehicleFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  brands: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
}

export function VehicleFilters({
  filters,
  onChange,
  brands,
  bodyTypes,
  fuelTypes,
  transmissions,
}: VehicleFiltersProps) {
  const { t } = useLanguage();

  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const hasActiveFilters =
    filters.brand || filters.bodyType || filters.fuelType || filters.transmission || filters.featuredOnly;

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="relative mb-4">
        <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-swift-muted" />
        <input
          type="text"
          value={filters.search ?? ""}
          onChange={(e) => update({ search: e.target.value })}
          placeholder={t.vehicles.searchPlaceholder}
          className="w-full rounded-md border border-swift-border bg-swift-black py-2.5 ps-9 pe-3 text-sm text-swift-warm placeholder:text-swift-muted focus:border-swift-gold focus:outline-none"
        />
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-swift-muted">
        <SlidersHorizontal size={14} />
        {t.vehicles.filters}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <select
          value={filters.brand ?? ""}
          onChange={(e) => update({ brand: e.target.value || undefined })}
          className="rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
        >
          <option value="">{t.vehicles.brand}</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={filters.bodyType ?? ""}
          onChange={(e) => update({ bodyType: e.target.value || undefined })}
          className="rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
        >
          <option value="">{t.vehicles.bodyType}</option>
          {bodyTypes.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={filters.fuelType ?? ""}
          onChange={(e) => update({ fuelType: e.target.value || undefined })}
          className="rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
        >
          <option value="">{t.vehicles.fuelType}</option>
          {fuelTypes.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <select
          value={filters.transmission ?? ""}
          onChange={(e) => update({ transmission: e.target.value || undefined })}
          className="rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
        >
          <option value="">{t.vehicles.transmission}</option>
          {transmissions.map((tr) => (
            <option key={tr} value={tr}>{tr}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-swift-warm/80">
          <input
            type="checkbox"
            checked={!!filters.featuredOnly}
            onChange={(e) => update({ featuredOnly: e.target.checked || undefined })}
            className="h-4 w-4 rounded border-swift-border accent-swift-gold"
          />
          {t.vehicles.featuredOnly}
        </label>

        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy ?? "newest"}
            onChange={(e) => update({ sortBy: e.target.value as Filters["sortBy"] })}
            className="rounded-md border border-swift-border bg-swift-black px-3 py-2 text-sm text-swift-warm focus:border-swift-gold focus:outline-none"
          >
            <option value="newest">{t.vehicles.sortNewest}</option>
            <option value="price_asc">{t.vehicles.sortPriceAsc}</option>
            <option value="price_desc">{t.vehicles.sortPriceDesc}</option>
            <option value="year_desc">{t.vehicles.sortYear}</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => onChange({ search: filters.search, sortBy: filters.sortBy })}
              className="flex items-center gap-1 rounded-md border border-swift-border px-3 py-2 text-xs text-swift-muted hover:border-swift-gold hover:text-swift-gold"
            >
              <X size={13} />
              {t.vehicles.clearFilters}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
