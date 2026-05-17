"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/cn";

export default function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={cn("inline-flex rounded-full border border-border bg-surface-elevated p-1", className)}>
      {(["INR", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
            currency === c ? "bg-ink text-surface" : "text-muted hover:text-ink"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
