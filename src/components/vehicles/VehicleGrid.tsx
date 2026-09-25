import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "./VehicleCard";

export function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((v) => (
        <VehicleCard key={v.id} vehicle={v} />
      ))}
    </div>
  );
}
