import Link from "next/link";
import { getAllProducts } from "@/lib/products-db";
import { comboPacks } from "@/data/combos";
import HomePrice from "@/components/HomePrice";

const TRUST = [
  "Homestyle recipes",
  "No artificial preservatives",
  "Sun-dried spices",
  "Stone-ground masala",
  "Pan-India shipping",
  "FSSAI certified",
];

const PROCESS = [
  { step: "01", title: "Select & prep", desc: "Seasonal mangoes, gongura, and spices sourced fresh." },
  { step: "02", title: "Stone grind", desc: "Masala ground on traditional stone — never factory-blended." },
  { step: "03", title: "Sun & age", desc: "Sun-dried chillies, aged in oil for depth of flavour." },
  { step: "04", title: "Hand seal", desc: "Every jar filled, sealed, and packed in Nizamabad." },
];

const REVIEWS = [
  {
    quote: "Avakaya ante idi ayya! Exactly like my Naani used to make in Karimnagar.",
    author: "Srikanth R., Hyderabad",
  },
  {
    quote: "Gongura pickle ki inka nowhere compares. Ordered 3 times already.",
    author: "Meena P., Bengaluru",
  },
  {
    quote: "Prawn pickle arrived well-packed. Taste is 10/10 — recommended to every Telugu abroad.",
    author: "Anil K., USA",
  },
];

export default async function Home() {
  const all = await getAllProducts();
  const featured = all.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,#e85d2c33,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_100%,#2d5a4a33,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Nizamabad · Telangana
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-2xl">
            Pickles made the way your ammamma still does
          </h1>
          <p className="mt-6 max-w-lg text-lg text-surface/70 leading-relaxed">
            Avakaya, Gongura, Royyala & more — stone-ground spices, cold-pressed sesame oil, zero
            shortcuts.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/veg-pickles"
              className="inline-flex min-h-[48px] items-center rounded-full bg-accent px-7 font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Shop veg pickles
            </Link>
            <Link
              href="/non-veg-pickles"
              className="inline-flex min-h-[48px] items-center rounded-full border border-surface/30 px-7 font-semibold hover:bg-surface/10 transition-colors"
            >
              Non-veg range
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-elevated">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {TRUST.map((t) => (
            <span key={t} className="text-xs sm:text-sm font-medium text-muted">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 px-4">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink">
              Maa intlo puttina ruchi
            </h2>
            <p className="mt-2 text-muted text-sm uppercase tracking-widest">Born in our kitchen</p>
            <p className="mt-6 text-ink-muted leading-relaxed">
              Lachava began in Nizamabad, where our grandmother Lachavamma spent summers pickling
              mangoes, gongura, and tamarind — recipes passed down, never written down for outsiders.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We don&apos;t batch-compromise. Every jar is Telangana tradition, bottled.
            </p>
            <Link
              href="/story"
              className="inline-flex mt-8 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              Read our story →
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-forest-soft p-8 sm:p-10">
            <p className="font-display text-2xl text-forest italic leading-snug">
              &ldquo;Pickle ante just condiment kadu — idi maa culture, maa memory, maa
              identity.&rdquo;
            </p>
            <p className="mt-4 text-sm text-muted">— Lachavamma&apos;s kitchen philosophy</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface-elevated border-y border-border">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl text-ink">Featured pickles</h2>
              <p className="mt-1 text-muted">Handpicked from our kitchen</p>
            </div>
            <Link href="/veg-pickles" className="text-sm font-semibold text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <HomePrice key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-ink text-center">How we make it</h2>
          <p className="text-center text-muted mt-2 mb-14 max-w-md mx-auto">
            Four steps. No factory lines.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((s) => (
              <article
                key={s.step}
                className="rounded-2xl border border-border bg-surface-elevated p-6 hover:border-accent/30 transition-colors"
              >
                <span className="text-3xl font-display text-accent/40">{s.step}</span>
                <h3 className="mt-3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-ink text-surface">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl">Combo packs</h2>
          <p className="mt-2 text-surface/60">Curated bundles — better value</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {comboPacks.slice(0, 4).map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-surface/10 bg-surface/5 p-6 flex flex-col"
              >
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="mt-2 text-sm text-surface/60 flex-1">{c.description}</p>
                <p className="mt-4">
                  <span className="text-2xl font-bold text-accent">₹{c.priceINR}</span>
                  <span className="ml-2 text-sm line-through text-surface/40">
                    ₹{c.originalPriceINR}
                  </span>
                </p>
                <Link
                  href="/contact"
                  className="mt-4 text-sm font-semibold text-accent hover:underline"
                >
                  Order combo →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/combos" className="text-sm font-semibold text-surface/80 hover:text-white">
              All combo packs
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-ink text-center">What customers say</h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <blockquote
                key={r.author}
                className="rounded-2xl bg-surface-elevated border border-border p-6"
              >
                <p className="text-ink-muted italic leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-medium text-ink">— {r.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Ready for that old familiar taste?</h2>
          <p className="mt-4 text-white/85">
            Order today — we ship across India with care-packed glass jars.
          </p>
          <Link
            href="/veg-pickles"
            className="inline-flex mt-8 min-h-[48px] items-center rounded-full bg-white px-8 font-semibold text-accent hover:bg-surface transition-colors"
          >
            Start shopping
          </Link>
        </div>
      </section>
    </>
  );
}
