"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LOCALE_LABELS, type Locale } from "@/i18n/translations";
import { cn } from "@/lib/cn";

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-border bg-surface p-0.5 text-xs font-semibold",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "te"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-full px-2.5 py-1.5 transition-colors min-w-[2.75rem]",
            locale === code
              ? "bg-ink text-surface"
              : "text-muted hover:text-ink"
          )}
        >
          {code === "en" ? "EN" : "తె"}
        </button>
      ))}
      <span className="sr-only">{LOCALE_LABELS[locale]}</span>
    </div>
  );
}
