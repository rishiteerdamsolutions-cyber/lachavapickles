"use client";

import { useEffect, useState } from "react";
import { PickleProduct, ProductCategory } from "@/types/product";
import PickleProductCard from "./PickleProductCard";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "./CurrencySelector";

interface Props {
  category: ProductCategory;
  title: string;
  subtitle?: string;
}

export default function ProductListing({ category, title, subtitle }: Props) {
  const [products, setProducts] = useState<PickleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { format } = useCurrency();

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
        </div>
        <CurrencySelector />
      </div>

      {loading ? (
        <p className="text-center text-muted py-16">Loading pickles…</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted py-16">No products in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <PickleProductCard key={p.id} product={p} formatPrice={format} />
          ))}
        </div>
      )}
    </section>
  );
}
