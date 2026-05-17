import Link from "next/link";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Get in touch</h1>
      <p className="mt-6 text-ink-muted leading-relaxed">
        For orders, combos, bulk enquiries, or shipping questions — reach us directly.
      </p>

      <div className="mt-10 space-y-4 rounded-2xl border border-border bg-surface-elevated p-8">
        <p className="text-sm">
          <span className="font-semibold text-ink">Phone:</span>{" "}
          <a href="tel:+919581963980" className="text-accent hover:underline">
            +91 95819 63980
          </a>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-ink">Email:</span>{" "}
          <a href="mailto:orders@lachavapickles.com" className="text-accent hover:underline">
            orders@lachavapickles.com
          </a>
        </p>
        <p className="text-sm text-muted">Husnabad, Telangana 503001</p>
        <p className="text-sm">
          <span className="font-semibold text-ink">Instagram:</span>{" "}
          <a
            href="https://instagram.com/lachava_pickles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            @lachava_pickles
          </a>
        </p>
      </div>

      <p className="mt-8 text-sm text-muted">
        Prefer to browse?{" "}
        <Link href="/veg-pickles" className="text-accent font-semibold hover:underline">
          Shop pickles
        </Link>
      </p>
    </div>
  );
}
