"use client";

import Link from "next/link";
import type { ComboPack } from "@/data/combos";
import { useLanguage } from "@/context/LanguageContext";

export default function CombosListing({ combos }: { combos: ComboPack[] }) {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {locale === "te" ? "ప్యాక్‌లు" : "Bundles"}
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink">{t("home.combos")}</h1>
      <p className="mt-2 text-muted mb-12">
        {locale === "te"
          ? "కాంబోలు — ఒకేసారి ఎక్కువ రుచులు, తక్కువ ధర"
          : "Curated sets — better value when you stock the pantry"}
      </p>

      <div className="space-y-6">
        {combos.map((c, i) => (
          <article
            key={c.id}
            className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <span className="text-xs font-bold text-accent/60">0{i + 1}</span>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              {locale === "te" && c.nameTelugu ? c.nameTelugu : c.name}
            </h2>
            <p className="mt-2 text-muted">
              {locale === "te" && c.descriptionTelugu ? c.descriptionTelugu : c.description}
            </p>
            <p className="text-sm text-forest mt-1">
              {locale === "te" && c.itemsTelugu ? c.itemsTelugu : c.items}
            </p>
            <p className="mt-5">
              <span className="text-3xl font-bold text-accent">₹{c.priceINR}</span>
              <span className="ml-3 text-lg line-through text-muted">₹{c.originalPriceINR}</span>
            </p>
            <Link
              href="/contact"
              className="inline-flex mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              {locale === "te" ? "ఈ కాంబో ఆర్డర్ చేయండి" : "Order this combo"}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
