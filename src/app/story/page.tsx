import Link from "next/link";

const TIMELINE = [
  { year: "1950s", title: "Ammamma's kitchen", desc: "Lachavamma begins pickling in Nizamabad — recipes passed orally, never written for outsiders." },
  { year: "Today", title: "Same stone, same oil", desc: "We still grind on stone, sun-dry chillies, and seal every jar by hand." },
  { year: "Promise", title: "No shortcuts", desc: "No preservatives, no factory masala blends, no compromise on heat or tang." },
];

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our story</p>
      <h1 className="mt-3 font-display text-4xl text-ink leading-tight">
        Maa intlo puttina ruchi
      </h1>
      <p className="mt-2 text-muted">Born in our kitchen · Nizamabad</p>

      <p className="mt-10 text-ink-muted leading-relaxed">
        Lachava Telangana Pickles began not in a factory, but in a kitchen in Nizamabad — where our
        grandmother, <strong className="text-ink">Lachavamma</strong>, would spend entire summers
        pickling mamidikaya, chinthakaya, and nimmakaya the way her mother taught her.
      </p>
      <p className="mt-6 text-ink-muted leading-relaxed">
        Since generations, our family has been grinding spices on stone, pickling in earthen jars,
        and sealing the soul of Telangana into every bottle.
      </p>

      <blockquote className="my-12 rounded-2xl border border-border bg-forest-soft px-8 py-8">
        <p className="font-display text-xl italic text-forest leading-snug">
          &ldquo;Pickle ante just condiment kadu — idi maa culture, maa memory, maa identity.&rdquo;
        </p>
      </blockquote>

      <div className="space-y-8">
        {TIMELINE.map((t) => (
          <div key={t.year} className="flex gap-6">
            <span className="shrink-0 font-display text-2xl text-accent/50 w-16">{t.year}</span>
            <div>
              <h2 className="font-semibold text-ink">{t.title}</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl text-ink mt-14 mb-4">Shelf life & storage</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold text-ink">Type</th>
              <th className="text-left p-4 font-semibold text-ink">Unopened</th>
              <th className="text-left p-4 font-semibold text-ink">After opening</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-4 text-ink-muted">Veg pickles</td>
              <td className="p-4">6–12 months</td>
              <td className="p-4">Refrigerate, use within 4–6 weeks</td>
            </tr>
            <tr>
              <td className="p-4 text-ink-muted">Non-veg pickles</td>
              <td className="p-4">3–6 months</td>
              <td className="p-4">Refrigerate always, use within 3–4 weeks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Link
        href="/veg-pickles"
        className="inline-flex mt-12 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface hover:bg-ink-muted transition-colors"
      >
        Shop pickles
      </Link>
    </div>
  );
}
