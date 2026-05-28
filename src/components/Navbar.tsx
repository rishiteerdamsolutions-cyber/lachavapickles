"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "@/components/BrandLogo";
import LanguageToggle from "@/components/LanguageToggle";

const links = [
  { href: "/veg-pickles", key: "nav.veg" },
  { href: "/non-veg-pickles", key: "nav.nonveg" },
  { href: "/combos", key: "nav.combos" },
  { href: "/story", key: "nav.story" },
  { href: "/contact", key: "nav.contact" },
] as const;

export default function Navbar() {
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface-elevated/90 backdrop-blur-lg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandLogo size="md" />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-ink hover:bg-surface transition-colors"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link
            href="/veg-pickles"
            className="hidden sm:inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-surface hover:bg-ink-muted transition-colors"
          >
            {t("nav.shop")}
          </Link>
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface transition-colors"
            aria-label={t("nav.cart")}
          >
            <ShoppingBag className="h-5 w-5 text-ink" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border px-4 py-4 space-y-1 bg-surface-elevated">
          <div className="px-3 pb-2">
            <LanguageToggle />
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/veg-pickles"
            onClick={() => setOpen(false)}
            className="block rounded-lg bg-accent px-3 py-3 text-center font-semibold text-white mt-2"
          >
            {t("nav.shopPickles")}
          </Link>
        </nav>
      )}
    </header>
  );
}
