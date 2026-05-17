import { WeightOption } from "@/types/product";
import { cn } from "@/lib/cn";

interface Props {
  options: WeightOption[];
  selected: string;
  onSelect: (id: string) => void;
  formatPrice: (amount: number) => string;
  disabled?: boolean;
}

export default function WeightSelector({
  options,
  selected,
  onSelect,
  formatPrice,
  disabled,
}: Props) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink mb-3">Select size</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "min-h-[44px] rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-surface-elevated text-ink hover:border-accent/40",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>{opt.label}</span>
              <span className="ml-2 text-muted">
                {formatPrice(opt.priceINR)}
                {opt.originalPriceINR && opt.originalPriceINR > opt.priceINR && (
                  <span className="ml-1 line-through text-xs">
                    {formatPrice(opt.originalPriceINR)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
