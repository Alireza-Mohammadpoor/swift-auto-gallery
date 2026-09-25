import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-swift-border bg-swift-surface/50 px-6 py-20 text-center">
      {icon && <div className="mb-4 text-swift-gold">{icon}</div>}
      <p className="text-lg font-medium text-swift-warm">{title}</p>
      {subtitle && <p className="mt-2 max-w-md text-sm text-swift-muted">{subtitle}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
