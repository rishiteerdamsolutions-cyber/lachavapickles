import { QuotationPackage } from "@/data/quotations";

function Divider() {
  return <hr className="border-0 h-px bg-border my-6" />;
}

export default function QuotationCard({ pkg }: { pkg: QuotationPackage }) {
  return (
    <article className="rounded-2xl border border-border bg-surface-elevated shadow-sm overflow-hidden print:break-inside-avoid">
      <header className="bg-ink text-surface px-6 py-4">
        <p className="text-xs uppercase tracking-widest text-surface/60">ప్యాకేజ్ పేరు</p>
        <h2 className="font-display text-xl sm:text-2xl mt-1">{pkg.packageName}</h2>
      </header>

      <div className="p-6 sm:p-8 space-y-6 text-[15px] leading-relaxed text-ink">
        <section>
          <h3 className="font-semibold text-forest flex items-center gap-2">
            <span aria-hidden>✅</span> అందించే సేవలు
          </h3>
          <ul className="mt-3 space-y-2 list-disc list-inside text-ink-muted marker:text-accent">
            {pkg.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {pkg.adminFeatures && (
            <div className="mt-4 pl-1">
              <p className="font-semibold text-ink text-sm">అడ్మిన్ ప్యానల్ (లాగిన్ తో):</p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-ink-muted marker:text-accent pl-2">
                {pkg.adminFeatures.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-muted">అడ్మిన్ వాడకం ఎలాగో శిక్షణ ఇవ్వడం (Training)</p>
            </div>
          )}
        </section>

        {pkg.note && (
          <section className="rounded-xl bg-amber-50 border border-amber-200/80 px-4 py-3 text-sm text-amber-950">
            <p className="font-semibold">⚠️ గమనిక:</p>
            <p className="mt-1">{pkg.note}</p>
          </section>
        )}

        {pkg.highlight && (
          <section className="rounded-xl bg-forest-soft border border-forest/20 px-4 py-3 text-sm">
            <p className="font-semibold text-forest">⭐ ప్రత్యేకత:</p>
            <p className="mt-1 text-ink-muted">{pkg.highlight}</p>
          </section>
        )}

        <Divider />

        <section>
          <h3 className="font-semibold text-ink flex items-center gap-2">
            <span aria-hidden>💰</span> ధర వివరాలు
          </h3>
          <dl className="mt-4 space-y-2">
            {pkg.pricing.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/60 last:border-0"
              >
                <dt className="text-ink-muted">{row.label}</dt>
                <dd className="font-semibold text-ink sm:text-right whitespace-nowrap">{row.amount}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Divider />

        <section className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-ink">పని పూర్తయ్యే సమయం</p>
            <p className="mt-1 text-ink-muted">{pkg.timeline}</p>
          </div>
          <div>
            <p className="font-semibold text-ink">చెల్లింపు విధానం</p>
            <ul className="mt-1 space-y-1 text-ink-muted list-disc list-inside">
              {pkg.payment.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <p className="text-sm font-medium text-accent">{pkg.validity}</p>
      </div>
    </article>
  );
}
