import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({ open, title, subtitle, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
    >
      <div
        ref={ref}
        tabIndex={-1}
        className="w-full max-w-sm rounded-lg border border-swift-border bg-swift-surface p-6 outline-none"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-swift-warm">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-swift-muted">{subtitle}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-outline" disabled={loading}>
            {t.common.cancel}
          </button>
          <button onClick={onConfirm} className="btn-gold" disabled={loading}>
            {t.common.delete}
          </button>
        </div>
      </div>
    </div>
  );
}
