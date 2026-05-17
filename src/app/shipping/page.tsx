export const metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20 prose prose-sm max-w-none">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Shipping</p>
      <h1 className="mt-3 font-display text-4xl text-ink not-prose">Delivery & packing</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed not-prose">
        <p>
          We ship pan-India via trusted couriers. Glass jars are bubble-wrapped and boxed with
          cushioning to minimise breakage in transit.
        </p>
        <p>
          Shipping cost depends on weight, pin code, and courier rates — shown at checkout before
          payment where applicable. Typical dispatch is 2–4 business days after confirmed payment.
        </p>
        <p>
          Non-veg pickles must be refrigerated after opening. Store all pickles in a cool, dry place
          away from direct sunlight.
        </p>
      </div>
    </div>
  );
}
