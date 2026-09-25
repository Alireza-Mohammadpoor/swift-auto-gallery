import { cx } from "@/utils/format";

export function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-swift-border bg-swift-surface">
      <div className="aspect-[4/3] bg-swift-charcoal" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-swift-charcoal" />
        <div className="h-3 w-1/3 rounded bg-swift-charcoal" />
        <div className="h-5 w-1/2 rounded bg-swift-charcoal" />
      </div>
    </div>
  );
}

export function VehicleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded bg-swift-charcoal", className)} />;
}
