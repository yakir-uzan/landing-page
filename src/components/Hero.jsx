import { useEffect, useRef } from 'react';
import { hero, waUrl } from '../data/content.js';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = rootRef.current?.querySelectorAll('.hero-line span');
    if (!lines?.length) return;

    if (reduced) {
      lines.forEach((l) => {
        l.style.transform = 'none';
        l.style.opacity = '1';
      });
      return;
    }

    let rafId;
    let tl;
    const startedAt = performance.now();
    function run() {
      const gsap = window.gsap;
      if (!gsap) {
        if (performance.now() - startedAt > 4000) return; // המצב הטבעי (גלוי) נשאר
        rafId = requestAnimationFrame(run);
        return;
      }
      tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.7 })
        .from(lines, { yPercent: 115, opacity: 0, duration: 1.05, stagger: 0.12 }, '-=0.4')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');
    }
    run();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (tl) tl.kill();
    };
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div
        className="pointer-events-none absolute -top-1/4 right-0 h-[70vh] w-[70vh] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(217,79,42,0.5), transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[50vh] w-[50vh] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(63,90,69,0.6), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="wrap relative">
        <p className="hero-kicker eyebrow mb-6">{hero.kicker}</p>

        <h1 className="text-mega font-900">
          {hero.titleLines.map((line, i) => (
            <span key={i} className="hero-line block overflow-hidden pb-[0.08em]">
              <span className="block">
                {i === 1 ? (
                  <>
                    שאנשים <em className="not-italic text-clay">{hero.emphasis}</em>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-lg text-cream/70 md:text-xl">{hero.sub}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={waUrl()} target="_blank" rel="noopener" className="hero-cta btn-clay">
            <span>{hero.ctaPrimary}</span>
          </a>
          <a href="#work" className="hero-cta btn-ghost">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em]">גלול</span>
          <span className="h-10 w-px animate-pulse bg-cream/40" />
        </div>
      </div>
    </section>
  );
}
