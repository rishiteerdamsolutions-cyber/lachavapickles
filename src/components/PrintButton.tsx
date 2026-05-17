"use client";

export default function PrintButton() {
  return (
    <div className="fixed bottom-6 right-6 print:hidden font-sans z-40">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-ink text-surface px-5 py-2.5 text-sm font-semibold shadow-lg hover:bg-ink-muted transition-colors"
      >
        Print / PDF
      </button>
    </div>
  );
}
