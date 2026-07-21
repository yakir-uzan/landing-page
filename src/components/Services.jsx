import { services } from '../data/content.js';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36">
      <div className="wrap">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow reveal mb-4">{services.eyebrow}</p>
          <h2 className="reveal text-giant font-800">{services.title}</h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 md:grid-cols-2">
          {services.items.map((s) => (
            <article
              key={s.no}
              data-cursor="hover"
              className="reveal group relative bg-ink p-8 transition-colors duration-500 ease-clay hover:bg-ink-soft md:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm font-600 text-clay">{s.no}</span>
                <span className="translate-x-2 text-2xl text-cream/30 opacity-0 transition-all duration-500 ease-clay group-hover:translate-x-0 group-hover:text-clay group-hover:opacity-100">
                  ←
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-700 md:text-4xl">{s.name}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/60">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
