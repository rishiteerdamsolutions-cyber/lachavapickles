import { ProductTag, TAG_LABELS } from "@/types/product";
import { cn } from "@/lib/cn";

interface Props {
  tag: ProductTag;
  className?: string;
}

export default function ProductTagBadge({ tag, className }: Props) {
  if (!tag || tag === "out_of_stock") return null;
  const meta = TAG_LABELS[tag];
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}

export function StockBadge({
  available,
  tag,
}: {
  available: boolean;
  tag: ProductTag;
}) {
  if (available && tag !== "out_of_stock") return null;
  return (
    <span className="inline-flex rounded-full bg-gray-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
      Out of stock
    </span>
  );
}
