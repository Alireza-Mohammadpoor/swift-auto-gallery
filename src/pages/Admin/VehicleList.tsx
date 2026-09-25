import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminVehicles } from "@/hooks/useVehicles";
import { supabase } from "@/lib/supabase/client";
import { formatAED } from "@/utils/format";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Skeleton } from "@/components/common/LoadingSkeleton";
import type { Vehicle } from "@/types/vehicle";

export function VehicleList() {
  const { t } = useLanguage();
  const { data: vehicles, isLoading } = useAdminVehicles();
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);
  const [deleting, setDeleting] = useState(false);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "vehicles"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    queryClient.invalidateQueries({ queryKey: ["vehicles"] });
  };

  const toggleField = async (vehicle: Vehicle, field: "is_published" | "is_featured" | "is_available") => {
    await supabase
      .from("vehicles")
      .update({ [field]: !vehicle[field] })
      .eq("id", vehicle.id);
    invalidate();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("vehicles").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    invalidate();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-swift-warm">{t.admin.manageVehicles}</h1>
        <NavLink to="/admin/vehicles/new" className="btn-gold !py-2 text-sm">
          <Plus size={16} />
          {t.admin.addVehicle}
        </NavLink>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : !vehicles || vehicles.length === 0 ? (
        <EmptyState
          title={t.admin.noVehicles}
          action={
            <NavLink to="/admin/vehicles/new" className="btn-gold">
              {t.admin.addVehicle}
            </NavLink>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-swift-border">
          <table className="w-full min-w-[720px] text-start text-sm">
            <thead className="bg-swift-charcoal text-xs uppercase text-swift-muted">
              <tr>
                <th className="px-4 py-3 text-start">Vehicle</th>
                <th className="px-4 py-3 text-start">Price</th>
                <th className="px-4 py-3 text-start">Status</th>
                <th className="px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-t border-swift-border bg-swift-surface">
                  <td className="px-4 py-3">
                    <p className="font-medium text-swift-warm">
                      {vehicle.brand} {vehicle.model} {vehicle.year}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-swift-gold">{formatAED(vehicle.price_aed)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => toggleField(vehicle, "is_published")}
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          vehicle.is_published ? "bg-green-500/10 text-green-400" : "bg-swift-border text-swift-muted"
                        }`}
                      >
                        {vehicle.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {vehicle.is_published ? t.admin.publish : t.admin.unpublish}
                      </button>
                      <button
                        onClick={() => toggleField(vehicle, "is_featured")}
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          vehicle.is_featured ? "bg-swift-gold/10 text-swift-gold" : "bg-swift-border text-swift-muted"
                        }`}
                      >
                        <Star size={12} />
                        {t.vehicle.featured}
                      </button>
                      <button
                        onClick={() => toggleField(vehicle, "is_available")}
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          vehicle.is_available ? "bg-blue-500/10 text-blue-400" : "bg-swift-border text-swift-muted"
                        }`}
                      >
                        {vehicle.is_available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {vehicle.is_available ? t.vehicle.available : t.vehicle.unavailable}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="flex justify-end gap-2">
                      <NavLink
                        to={`/admin/vehicles/${vehicle.id}/edit`}
                        className="rounded-md border border-swift-border p-2 text-swift-warm/80 hover:border-swift-gold hover:text-swift-gold"
                        aria-label={t.common.edit}
                      >
                        <Pencil size={14} />
                      </NavLink>
                      <button
                        onClick={() => setDeleteTarget(vehicle)}
                        className="rounded-md border border-swift-border p-2 text-swift-warm/80 hover:border-red-400 hover:text-red-400"
                        aria-label={t.common.delete}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={t.admin.deleteConfirm}
        subtitle={t.admin.deleteConfirmSubtitle}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
