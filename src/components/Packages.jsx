import { packages, waUrl } from '../data/content.js';

export default function Packages() {
  return (
    <section id="packages" className="py-24 md:py-36">
      <div className="wrap">
        <div className="mb-6 max-w-2xl">
          <p className="eyebrow reveal mb-4">{packages.eyebrow}</p>
          <h2 className="reveal text-giant font-800">{packages.title}</h2>
        </div>
        <p className="reveal mb-16 max-w-xl text-lg text-cream/60">{packages.intro}</p>

        <div className="grid gap-6 lg:grid-cols-3">
          {packages.tiers.map((tier) => (
            <article
              key={tier.name}
              data-cursor="hover"
              className={`reveal relative flex flex-col rounded-3xl border p-8 transition-transform duration-500 ease-clay hover:-translate-y-1.5 md:p-10 ${
                tier.highlight ? 'border-clay bg-clay/10' : 'border-cream/12 bg-ink-soft'
              }`}
            >
              {tier.flag && (
                <span className="absolute -top-3 right-8 rounded-full bg-clay px-4 py-1 text-xs font-700 text-cream">
                  {tier.flag}
                </span>
              )}
              <h3 className="text-2xl font-700">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-sm text-cream/50">{tier.priceNote}</span>
                <span className="font-display text-4xl font-900 text-cream">{tier.price}</span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-cream/75">
                    <span className="mt-1 text-clay">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waUrl(`היי, מעניין אותי מסלול "${tier.name}". אפשר לדבר?`)}
                target="_blank"
                rel="noopener"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-transform duration-300 ease-clay hover:scale-[1.03] ${
                  tier.highlight ? 'bg-clay text-cream' : 'border border-cream/25 text-cream'
                }`}
              >
                נתאים לעסק שלך
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
