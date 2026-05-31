import Link from "next/link";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="app-content py-[clamp(1.5rem,5vw,3rem)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-shop-muted">Contact</p>
      <h1 className="shop-page-title mt-2">Get in touch</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        For orders, combos, bulk enquiries, or shipping questions — reach us directly.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6">
        <p className="text-sm">
          <span className="font-semibold text-brand">Phone / WhatsApp:</span>{" "}
          <a href="tel:+916302112848" className="text-brand hover:underline">
            +91 63021 12848
          </a>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-brand">PhonePe / GPay:</span>{" "}
          <span className="text-ink">63021 12848</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-brand">Email:</span>{" "}
          <a href="mailto:orders@lachavapickles.com" className="text-brand hover:underline">
            orders@lachavapickles.com
          </a>
        </p>
        <p className="text-sm text-muted">Husnabad, Telangana 503001</p>
        <p className="text-sm">
          <span className="font-semibold text-brand">Instagram:</span>{" "}
          <a
            href="https://instagram.com/lachava_pickles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            @lachava_pickles
          </a>
        </p>
      </div>

      <p className="mt-6 text-sm text-muted">
        Prefer to browse?{" "}
        <Link href="/products" className="font-semibold text-brand hover:underline">
          Shop pickles
        </Link>
      </p>
    </div>
  );
}
