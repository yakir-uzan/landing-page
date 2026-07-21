import { process } from '../data/content.js';

export default function Process() {
  return (
    <section id="process" className="bg-cream py-24 text-ink md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="md:sticky md:top-28 md:h-fit">
          <p className="eyebrow reveal mb-4 text-clay-deep">{process.eyebrow}</p>
          <h2 className="reveal text-giant font-800 text-ink">{process.title}</h2>
        </div>

        <div>
          {process.steps.map((step, i) => (
            <div
              key={step.no}
              className={`reveal flex gap-6 py-8 ${
                i !== process.steps.length - 1 ? 'border-b border-ink/12' : ''
              }`}
            >
              <span className="font-display text-4xl font-800 text-clay-deep md:text-5xl">{step.no}</span>
              <div>
                <h3 className="text-2xl font-700 md:text-3xl">{step.name}</h3>
                <p className="mt-2 max-w-md text-lg leading-relaxed text-ink/65">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
