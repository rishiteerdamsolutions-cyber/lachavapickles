"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PickleProduct, spiceDisplay } from "@/types/product";
import WeightSelector from "@/components/WeightSelector";
import ProductTagBadge, { StockBadge } from "@/components/ProductTagBadge";
import ProductVisual from "@/components/ProductVisual";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<PickleProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setProduct(data);
          setSelectedVariant(data.weightOptions?.[0]?.id ?? "");
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-muted">Loading…</div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-muted">Product not found</p>
        <Link href="/veg-pickles" className="mt-4 inline-block text-accent font-semibold">
          Browse pickles
        </Link>
      </div>
    );
  }

  const selected = product.weightOptions.find((w) => w.id === selectedVariant)!;
  const outOfStock = !product.available || product.tag === "out_of_stock";
  const backHref = product.category === "veg" ? "/veg-pickles" : "/non-veg-pickles";

  const handleAddToCart = () => {
    if (outOfStock || !selected) return;
    addItem(
      {
        productId: product.id,
        productName: product.name,
        variantId: selected.id,
        variantLabel: selected.label,
        priceINR: selected.priceINR,
      },
      quantity
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
      <Link href={backHref} className="text-sm text-muted hover:text-accent mb-8 inline-block">
        ← Back to {product.category === "veg" ? "veg" : "non-veg"} pickles
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        <ProductVisual product={product} className="rounded-2xl" />

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <ProductTagBadge tag={product.tag} />
            <StockBadge available={product.available} tag={product.tag} />
          </div>
          {product.nameTelugu && (
            <p className="text-sm font-medium text-forest">{product.nameTelugu}</p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl text-ink mt-1">{product.name}</h1>
          <p className="text-muted mt-1">{product.subtitle}</p>
          <p className="mt-3 text-sm text-muted">{spiceDisplay(product.spiceLevel)} spice</p>
          <p className="mt-6 text-ink-muted leading-relaxed">{product.description}</p>

          <div className="mt-10">
            <WeightSelector
              options={product.weightOptions}
              selected={selectedVariant}
              onSelect={setSelectedVariant}
              formatPrice={format}
              disabled={outOfStock}
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center rounded-xl border border-border self-start">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="min-w-[44px] min-h-[44px] px-4 hover:bg-surface transition-colors"
              >
                −
              </button>
              <span className="px-4 font-medium min-w-[2rem] text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="min-w-[44px] min-h-[44px] px-4 hover:bg-surface transition-colors"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="min-h-[48px] flex-1 rounded-full bg-accent px-6 font-semibold text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {outOfStock
                ? "Out of stock"
                : `Add to cart — ${format(selected.priceINR * quantity)}`}
            </button>
          </div>
          <p className="mt-4 text-xs text-muted">
            Shipping extra by weight & location. Non-veg: refrigerate after opening.
          </p>
        </div>
      </div>
    </div>
  );
}
