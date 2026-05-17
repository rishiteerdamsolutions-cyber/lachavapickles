import Link from "next/link";
import { Noto_Sans_Telugu } from "next/font/google";
import QuotationCard from "@/components/QuotationCard";
import PrintButton from "@/components/PrintButton";
import {
  QUOTATION_FOOTER,
  QUOTATION_INTRO,
  QUOTATION_PACKAGES,
} from "@/data/quotations";

const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  variable: "--font-telugu",
});

export const metadata = {
  title: "సేవా అంచనా పత్రం",
  robots: { index: false, follow: false },
};

export default function QuotationPage() {
  return (
    <div className={`${telugu.className} bg-surface min-h-full`}>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 print:py-8">
        <div className="text-center mb-10 print:mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent font-[family-name:var(--font-jakarta)]">
            Lachava Telangana Pickles
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-ink">
            {QUOTATION_INTRO.title}
          </h1>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 mb-10 text-[15px] leading-relaxed text-ink-muted print:mb-6">
          <p className="font-semibold text-ink">{QUOTATION_INTRO.salutation}</p>
          <p className="mt-4">{QUOTATION_INTRO.paragraph}</p>
        </div>

        <div className="space-y-10 print:space-y-8">
          {QUOTATION_PACKAGES.map((pkg) => (
            <QuotationCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <footer className="mt-12 rounded-2xl border border-border bg-ink text-surface p-6 sm:p-8 text-center print:mt-8">
          <p className="text-surface/80">{QUOTATION_FOOTER.closing}</p>
          <p className="mt-6 text-lg font-semibold">{QUOTATION_FOOTER.thanks}</p>
          <p className="mt-2 text-xl font-bold text-accent">{QUOTATION_FOOTER.name}</p>
          <a
            href={`tel:+91${QUOTATION_FOOTER.phone}`}
            className="mt-2 inline-block text-surface/90 hover:text-white font-[family-name:var(--font-jakarta)]"
          >
            {QUOTATION_FOOTER.phone}
          </a>
          <p className="mt-4 text-sm text-surface/50 font-[family-name:var(--font-jakarta)]">
            {QUOTATION_FOOTER.date}
          </p>
        </footer>

        <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden font-[family-name:var(--font-jakarta)]">
          <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">
            ← Back to store
          </Link>
          <a
            href={`https://wa.me/91${QUOTATION_FOOTER.phone}?text=${encodeURIComponent("నమస్కారం, అంచనా పత్రం గురించి మాట్లాడాలనుకుంటున్నాను.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            WhatsApp ఆదిత్య
          </a>
        </div>
      </div>

      <PrintButton />
    </div>
  );
}
