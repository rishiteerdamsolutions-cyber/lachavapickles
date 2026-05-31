import Link from "next/link";
import { ComboPack } from "@/data/combos";
import { formatINRDecimal } from "@/lib/format-price";
import WishlistHeartButton from "./WishlistHeartButton";

interface Props {
  combo: ComboPack;
}

export default function ComboProductCard({ combo }: Props) {
  return (
    <article className="shop-product-card flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden pickle-backdrop">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
          <span className="text-3xl" aria-hidden>
            ⭐
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider opacity-90">
            Combo offer
          </p>
        </div>
        <WishlistHeartButton itemId={combo.id} />
      </div>

      <div className="shop-product-meta flex flex-1 flex-col pt-2.5">
        <h3 className="shop-product-title">{combo.name}</h3>
        <p className="shop-product-tags">Combos, Shop All</p>
        <p className="shop-product-price">
          {formatINRDecimal(combo.priceINR)}
          <span className="ml-1.5 text-[11px] font-normal line-through opacity-60">
            {formatINRDecimal(combo.originalPriceINR)}
          </span>
        </p>
        <Link href="/combos" className="shop-select-btn">
          SELECT OPTIONS
        </Link>
      </div>
    </article>
  );
}
