import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-ink text-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-surface">Lachava</p>
            <p className="text-xs uppercase tracking-[0.2em] text-surface/50 mt-1">
              Telangana Pickles
            </p>
            <p className="mt-4 max-w-sm text-sm text-surface/60 leading-relaxed">
              Handcrafted in Nizamabad. Stone-ground spices, cold-pressed sesame oil.
            </p>
            <p className="mt-3 font-display text-lg italic text-accent-soft/90">
              Ammamma Cheyyi Ruchi
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface/50 mb-4">
              Shop
            </h3>
            <div className="flex flex-col gap-2 text-sm text-surface/70">
              <Link href="/veg-pickles" className="hover:text-white transition-colors">
                Veg pickles
              </Link>
              <Link href="/non-veg-pickles" className="hover:text-white transition-colors">
                Non-veg pickles
              </Link>
              <Link href="/combos" className="hover:text-white transition-colors">
                Combo packs
              </Link>
              <Link href="/story" className="hover:text-white transition-colors">
                Our story
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface/50 mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-surface/70">
              <p>Husnabad, Telangana 503001</p>
              <a href="tel:+919581963980" className="hover:text-white transition-colors">
                +91 95819 63980
              </a>
              <a
                href="mailto:orders@lachavapickles.com"
                className="hover:text-white transition-colors"
              >
                orders@lachavapickles.com
              </a>
              <a
                href="https://instagram.com/lachava_pickles"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @lachava_pickles
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-surface/40">
          <p>© {new Date().getFullYear()} Lachava Telangana Pickles</p>
          <div className="flex gap-4">
            <Link href="/shipping" className="hover:text-surface/70">
              Shipping
            </Link>
            <Link href="/returns" className="hover:text-surface/70">
              Returns
            </Link>
            <Link href="/privacy" className="hover:text-surface/70">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
