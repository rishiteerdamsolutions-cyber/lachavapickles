import Image from "next/image";
import { PickleProduct, ProductCategory } from "@/types/product";
import { resolveProductImage } from "@/lib/product-images";
import { cn } from "@/lib/cn";

const PALETTES: Record<
  ProductCategory,
  { from: string; to: string; accent: string; glyph: string }
> = {
  veg: {
    from: "from-[#2D5A4A]",
    to: "to-[#1a3830]",
    accent: "text-emerald-200/90",
    glyph: "🥭",
  },
  "non-veg": {
    from: "from-[#5c2e1a]",
    to: "to-[#3d1a0f]",
    accent: "text-amber-200/90",
    glyph: "🫙",
  },
};

interface Props {
  product: PickleProduct;
  className?: string;
  compact?: boolean;
}

export default function ProductVisual({ product, className, compact }: Props) {
  const src = resolveProductImage(product);
  const p = PALETTES[product.category];
  const initial = product.name.charAt(0).toUpperCase();

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface",
          compact ? "min-h-[120px]" : "min-h-[200px] aspect-square",
          className
        )}
      >
        <Image
          src={src}
          alt={product.name}
          fill
          className="object-cover"
          sizes={compact ? "120px" : "(max-width: 640px) 50vw, 320px"}
        />
        {product.nameTelugu && (
          <p
            className={cn(
              "absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent px-2 py-2 text-xs font-medium text-white text-center",
              compact && "text-[10px] py-1"
            )}
          >
            {product.nameTelugu}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br",
        p.from,
        p.to,
        compact ? "min-h-[120px]" : "min-h-[200px] aspect-square",
        className
      )}
    >
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <span className={cn("text-4xl sm:text-5xl", compact && "text-2xl")} aria-hidden>
        {p.glyph}
      </span>
      <span
        className={cn(
          "mt-2 font-display text-3xl sm:text-4xl font-semibold text-white/20 select-none",
          compact && "text-xl mt-1"
        )}
        aria-hidden
      >
        {initial}
      </span>
      {product.nameTelugu && (
        <p className={cn("mt-1 text-xs font-medium", p.accent, compact && "text-[10px]")}>
          {product.nameTelugu}
        </p>
      )}
    </div>
  );
}
