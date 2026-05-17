import Link from "next/link";
import { comboPacks } from "@/data/combos";

export default function CombosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Bundles</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Combo packs</h1>
      <p className="mt-2 text-muted mb-12">Curated sets — better value when you stock the pantry</p>

      <div className="space-y-6">
        {comboPacks.map((c, i) => (
          <article
            key={c.id}
            className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <span className="text-xs font-bold text-accent/60">0{i + 1}</span>
            <h2 className="mt-2 text-xl font-semibold text-ink">{c.name}</h2>
            <p className="mt-2 text-muted">{c.description}</p>
            <p className="text-sm text-forest mt-1">{c.items}</p>
            <p className="mt-5">
              <span className="text-3xl font-bold text-accent">₹{c.priceINR}</span>
              <span className="ml-3 text-lg line-through text-muted">₹{c.originalPriceINR}</span>
              <span className="ml-3 text-sm font-medium text-forest">
                Save ₹{c.originalPriceINR - c.priceINR}
              </span>
            </p>
            <Link
              href="/contact"
              className="inline-flex mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Order this combo
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
