import Link from "next/link";
import { comboPacks } from "@/data/combos";
import { formatINRDecimal } from "@/lib/format-price";

export default function CombosPage() {
  return (
    <div className="app-content py-[clamp(1rem,4vw,2rem)]">
      <h1 className="shop-page-title">Combo packs</h1>
      <p className="mt-1 text-sm text-shop-muted">Curated sets — better value</p>

      <div className="mt-6 space-y-4">
        {comboPacks.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-xl bg-white">
            <div className="pickle-backdrop flex aspect-[2/1] flex-col items-center justify-center p-6 text-center text-white">
              <span className="text-3xl">⭐</span>
              <h2 className="mt-2 text-lg font-bold">{c.name}</h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted">{c.description}</p>
              <p className="mt-2 text-xs text-muted">{c.items}</p>
              <p className="mt-4">
                <span className="text-2xl font-bold text-brand">{formatINRDecimal(c.priceINR)}</span>
                <span className="ml-2 text-sm line-through text-muted">
                  {formatINRDecimal(c.originalPriceINR)}
                </span>
              </p>
              <Link href="/contact" className="shop-select-btn mt-5">
                ORDER THIS COMBO
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
