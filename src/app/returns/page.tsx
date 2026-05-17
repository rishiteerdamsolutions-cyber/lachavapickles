export const metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Returns</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Returns & refunds</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        <p>
          Because our products are food items, we accept returns only for damaged or incorrect
          shipments reported within 48 hours of delivery with photos.
        </p>
        <p>
          Contact us at{" "}
          <a href="mailto:orders@lachavapickles.com" className="text-accent hover:underline">
            orders@lachavapickles.com
          </a>{" "}
          or WhatsApp with your order ID. Approved cases receive a replacement or refund to the
          original payment method.
        </p>
      </div>
    </div>
  );
}
