"use client";

import Link from "next/link";
import { PickleProduct, spiceDisplay } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import {
  productDisplayName,
  productDisplaySubtitle,
} from "@/lib/product-display";
import ProductTagBadge, { StockBadge } from "./ProductTagBadge";
import ProductVisual from "./ProductVisual";

interface Props {
  product: PickleProduct;
  formatPrice: (amount: number) => string;
}

export default function PickleProductCard({ product, formatPrice }: Props) {
  const { locale, t } = useLanguage();
  const minPrice = Math.min(...product.weightOptions.map((w) => w.priceINR));
  const outOfStock = !product.available || product.tag === "out_of_stock";
  const name = productDisplayName(product, locale);
  const subtitle = productDisplaySubtitle(product, locale);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={outOfStock ? "pointer-events-none opacity-60" : "group"}
    >
      <article className="overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
        <div className="relative">
          <ProductVisual product={product} className="rounded-none" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <ProductTagBadge tag={product.tag} />
            <StockBadge available={product.available} tag={product.tag} />
          </div>
        </div>
        <div className="p-5">
          {locale === "en" && product.nameTelugu && (
            <p className="text-xs font-medium text-forest">{product.nameTelugu}</p>
          )}
          {locale === "te" && product.name !== name && (
            <p className="text-xs font-medium text-muted">{product.name}</p>
          )}
          <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted">{subtitle}</p>
          <p className="mt-2 text-xs text-muted">{spiceDisplay(product.spiceLevel)}</p>
          <p className="mt-3 font-semibold text-accent">
            {outOfStock
              ? t("product.outOfStock")
              : `${t("product.from")} ${formatPrice(minPrice)}`}
          </p>
        </div>
      </article>
    </Link>
  );
}
