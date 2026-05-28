"use client";

interface Bar {
  label: string;
  value: number;
  sublabel?: string;
}

export function AnalyticsBarChart({
  bars,
  valuePrefix = "",
  highlightMax = true,
}: {
  bars: Bar[];
  valuePrefix?: string;
  highlightMax?: boolean;
}) {
  const max = Math.max(1, ...bars.map((b) => b.value));

  const maxVal = Math.max(...bars.map((b) => b.value));

  return (
    <div className="space-y-2">
      {bars.map((bar) => {
        const pct = (bar.value / max) * 100;
        const isMax = highlightMax && bar.value === maxVal && maxVal > 0;
        return (
          <div key={bar.label} className="flex items-center gap-3">
            <span
              className={`w-14 shrink-0 text-xs font-medium ${isMax ? "text-accent" : "text-muted"}`}
            >
              {bar.label}
            </span>
            <div className="flex-1 h-7 rounded-md bg-surface overflow-hidden">
              <div
                className={`h-full rounded-md transition-all ${isMax ? "bg-accent" : "bg-forest/70"}`}
                style={{ width: `${pct}%`, minWidth: bar.value > 0 ? "4px" : 0 }}
              />
            </div>
            <span className="w-16 text-right text-xs font-semibold text-ink tabular-nums">
              {valuePrefix}
              {bar.value}
              {bar.sublabel ? (
                <span className="block text-[10px] font-normal text-muted">{bar.sublabel}</span>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function AnalyticsSparkline({
  points,
}: {
  points: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...points.map((p) => p.value));

  return (
    <div className="flex items-end gap-px h-24 w-full">
      {points.map((p) => {
        const h = (p.value / max) * 100;
        return (
          <div
            key={p.label}
            className="flex-1 flex flex-col items-center justify-end group relative"
            style={{ minWidth: 0 }}
          >
            <div
              className="w-full bg-accent/80 rounded-t-sm group-hover:bg-accent transition-colors"
              style={{ height: `${h}%`, minHeight: p.value > 0 ? 4 : 0 }}
              title={`${p.label}: ${p.value} orders`}
            />
          </div>
        );
      })}
    </div>
  );
}
