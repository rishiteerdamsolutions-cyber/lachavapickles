export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Privacy</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Privacy policy</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed text-sm">
        <p>
          We collect name, phone, email, and shipping address only to fulfil orders and communicate
          about your purchase. Payment data is processed securely by Razorpay — we do not store card
          details.
        </p>
        <p>
          We do not sell your personal information. Order records may be retained for accounting and
          customer support.
        </p>
        <p>
          Questions:{" "}
          <a href="mailto:orders@lachavapickles.com" className="text-accent hover:underline">
            orders@lachavapickles.com
          </a>
        </p>
      </div>
    </div>
  );
}
