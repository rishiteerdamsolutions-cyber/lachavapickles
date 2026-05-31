"use client";

import Link from "next/link";
import type { ComboPack } from "@/data/combos";
import type { PickleProduct } from "@/types/product";
import type { SiteSettings } from "@/types/site-settings";
import { pickText } from "@/types/site-settings";
import { useLanguage } from "@/context/LanguageContext";
import PickleProductCard from "@/components/PickleProductCard";
import { useCurrency } from "@/context/CurrencyContext";

const TRUST_KEYS = [
  "trust.homestyle",
  "trust.noPreservatives",
  "trust.sunDried",
  "trust.stoneGround",
  "trust.shipping",
  "trust.fssai",
] as const;

interface Props {
  featured: PickleProduct[];
  combos: ComboPack[];
  settings: SiteSettings;
}

export default function HomeContent({ featured, combos, settings }: Props) {
  const { locale, t } = useLanguage();
  const { format } = useCurrency();

  const announcement = pickText(settings.announcement, locale);

  return (
    <>
      {announcement.trim() && (
        <div className="bg-accent text-white text-center text-sm font-medium py-2 px-4">
          {announcement}
        </div>
      )}

      <section className="relative overflow-hidden bg-ink text-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,#e85d2c33,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {pickText(settings.hero.badge, locale)}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-2xl">
            {pickText(settings.hero.title, locale)}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-surface/70 leading-relaxed">
            {pickText(settings.hero.subtitle, locale)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/veg-pickles"
              className="inline-flex min-h-[48px] items-center rounded-full bg-accent px-7 font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              {pickText(settings.hero.ctaVeg, locale)}
            </Link>
            <Link
              href="/non-veg-pickles"
              className="inline-flex min-h-[48px] items-center rounded-full border border-surface/30 px-7 font-semibold hover:bg-surface/10 transition-colors"
            >
              {pickText(settings.hero.ctaNonVeg, locale)}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-elevated">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {TRUST_KEYS.map((key) => (
            <span key={key} className="text-xs sm:text-sm font-medium text-muted">
              {t(key)}
            </span>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 px-4">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink">
              {pickText(settings.story.title, locale)}
            </h2>
            <p className="mt-2 text-muted text-sm uppercase tracking-widest">
              {pickText(settings.story.subtitle, locale)}
            </p>
            <p className="mt-6 text-ink-muted leading-relaxed">
              {pickText(settings.story.body1, locale)}
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              {pickText(settings.story.body2, locale)}
            </p>
            <Link
              href="/story"
              className="inline-flex mt-8 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              {locale === "te" ? "మొత్తం కథ చూడండి →" : "Read our story →"}
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {locale === "te" ? "ఎందుకు లచవ?" : "Why Lachava?"}
            </p>
            <ul className="mt-6 space-y-4 text-ink-muted text-sm leading-relaxed">
              <li>
                {locale === "te"
                  ? "తెలంగాణ ఇంటి వంటకాలు — ఫ్యాక్టరీ రుచి కాదు."
                  : "Telangana homestyle — not factory flavour."}
              </li>
              <li>
                {locale === "te"
                  ? "ప్రతి జార్‌లో రాతి మసాలా, ఎండబెట్టిన మిరప."
                  : "Stone-ground masala and sun-dried chillies in every jar."}
              </li>
              <li>
                {locale === "te"
                  ? "ఆర్డర్ చేసి ఇంటికే డెలివరీ — భారతదేశం మొత్తం."
                  : "Order online — we ship across India."}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl text-ink">{t("home.featured")}</h2>
            <Link href="/veg-pickles" className="text-sm font-semibold text-accent">
              {t("home.viewAll")} →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PickleProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-ink mb-10">{t("home.combos")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {combos.map((c) => (
              <Link
                key={c.id}
                href="/combos"
                className="rounded-2xl border border-border bg-surface-elevated p-5 hover:border-accent/40 transition-colors"
              >
                <h3 className="font-semibold text-ink">
                  {locale === "te" && c.nameTelugu ? c.nameTelugu : c.name}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {locale === "te" && c.descriptionTelugu
                    ? c.descriptionTelugu
                    : c.description}
                </p>
                <p className="mt-4 font-semibold text-accent">{format(c.priceINR)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
