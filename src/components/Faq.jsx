import { useState } from 'react';
import { faq } from '../data/content.js';

function Item({ q, a, isOpen, onToggle }) {
  return (
    <div className="reveal border-b border-cream/12">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-right"
      >
        <span className="text-xl font-600 md:text-2xl">{q}</span>
        <span
          className={`shrink-0 text-2xl text-clay transition-transform duration-300 ease-clay ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-400 ease-clay ${
          isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-lg leading-relaxed text-cream/65">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="md:sticky md:top-28 md:h-fit">
          <p className="eyebrow reveal mb-4">{faq.eyebrow}</p>
          <h2 className="reveal text-giant font-800">{faq.title}</h2>
        </div>
        <div>
          {faq.items.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
