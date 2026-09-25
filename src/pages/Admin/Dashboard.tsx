import { NavLink } from "react-router-dom";
import { Car, CheckCircle2, EyeOff, Star, PackageCheck, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useDashboardStats } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/common/LoadingSkeleton";

export function Dashboard() {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useDashboardStats();

  const cards = [
    { label: t.admin.totalVehicles, value: stats?.total, icon: Car },
    { label: t.admin.publishedVehicles, value: stats?.published, icon: CheckCircle2 },
    { label: t.admin.unpublishedVehicles, value: stats?.unpublished, icon: EyeOff },
    { label: t.admin.featuredVehicles, value: stats?.featured, icon: Star },
    { label: t.admin.availableVehicles, value: stats?.available, icon: PackageCheck },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-swift-warm">{t.admin.dashboard}</h1>
        <NavLink to="/admin/vehicles/new" className="btn-gold !py-2 text-sm">
          <Plus size={16} />
          {t.admin.addVehicle}
        </NavLink>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="surface-card p-5">
            <card.icon size={20} className="text-swift-gold" />
            <p className="mt-3 text-2xl font-bold text-swift-warm">
              {isLoading ? <Skeleton className="h-7 w-10" /> : card.value ?? 0}
            </p>
            <p className="mt-1 text-xs text-swift-muted">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <NavLink to="/admin/vehicles" className="text-sm font-medium text-swift-gold hover:underline">
          {t.admin.manageVehicles} →
        </NavLink>
      </div>
    </div>
  );
}
