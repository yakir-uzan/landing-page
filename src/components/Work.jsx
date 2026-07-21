import { useEffect, useRef } from 'react';
import { work, waUrl } from '../data/content.js';

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let rafId;
    let triggers = [];
    let cancelled = false;
    const startedAt = performance.now();

    function setup() {
      if (cancelled) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) {
        if (performance.now() - startedAt > 3000) return;
        rafId = requestAnimationFrame(setup);
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      const imgs = rootRef.current?.querySelectorAll('.work-img') || [];
      imgs.forEach((img) => {
        const t = gsap.to(img, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.work-item'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        triggers.push(t);
      });
    }
    setup();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      triggers.forEach((t) => t?.scrollTrigger?.kill());
    };
  }, []);

  return (
    <section id="work" ref={rootRef} className="py-24 md:py-36">
      <div className="wrap">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow reveal mb-4">{work.eyebrow}</p>
          <h2 className="reveal text-giant font-800">{work.title}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {work.items.map((item) => (
            <a
              key={item.name}
              href={item.img}
              target="_blank"
              rel="noopener"
              data-cursor="hover"
              className="work-item reveal group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-soft">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="work-img absolute inset-0 h-[124%] w-full -translate-y-[10%] object-cover transition-transform duration-700 ease-clay group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 rounded-full bg-clay px-4 py-1.5 text-sm font-600 text-cream">
                  {item.type}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-2xl font-700">{item.name}</h3>
                <p className="mt-1 text-cream/60">{item.result}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="reveal mt-14 max-w-xl text-lg text-cream/60">
          {work.note}{' '}
          <a href={waUrl()} target="_blank" rel="noopener" className="text-clay underline underline-offset-4">
            שלח הודעה
          </a>
        </p>
      </div>
    </section>
  );
}
