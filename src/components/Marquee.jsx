import { marqueeItems } from '../data/content.js';

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <section className="border-y border-cream/10 bg-ink-soft py-6 md:py-8" aria-hidden="true">
      <div className="overflow-hidden">
        <div className="marquee-track">
          {row.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8 font-display text-2xl font-700 text-cream/80 md:text-4xl">{item}</span>
              <span className="text-clay">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
