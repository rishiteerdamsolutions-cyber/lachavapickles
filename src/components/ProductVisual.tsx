import { PickleProduct } from "@/types/product";
import { cn } from "@/lib/cn";

interface Props {
  product: PickleProduct;
  className?: string;
  compact?: boolean;
}

export default function ProductVisual({ product, className, compact }: Props) {
  const hasImage = Boolean(product.imagePath?.trim());

  return (
    <div
      className={cn(
        "pickle-backdrop relative overflow-hidden",
        compact ? "aspect-square min-h-[120px]" : "aspect-square w-full",
        className
      )}
    >
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imagePath}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span className="select-none font-display text-4xl text-white/20" aria-hidden>
            {product.name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}
