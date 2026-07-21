import { useEffect } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// חושף בגלילה את כל האלמנטים עם class="reveal" בתוך scope נתון.
// כולל רשת ביטחון: אם GSAP לא נטען מה-CDN — חושפים הכול, שלא יישאר בלתי-נראה.
export default function useReveal(scopeRef, deps = []) {
  useEffect(() => {
    const scope = scopeRef?.current || document;

    function forceRevealAll() {
      scope.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    if (prefersReduced()) {
      forceRevealAll();
      return;
    }

    let rafId;
    let triggers = [];
    let cancelled = false;
    const startedAt = performance.now();

    // אם הספריות לא נטענו תוך 2.5 שניות — מוודאים שהתוכן נראה בכל מקרה.
    const safety = setTimeout(() => {
      if (!window.gsap || !window.ScrollTrigger) forceRevealAll();
    }, 2500);

    function setup() {
      if (cancelled) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) {
        if (performance.now() - startedAt > 3000) return; // רשת הביטחון תטפל
        rafId = requestAnimationFrame(setup);
        return;
      }
      gsap.registerPlugin(ScrollTrigger);

      const els = gsap.utils.toArray(scope.querySelectorAll('.reveal'));
      if (!els.length) return;

      triggers = ScrollTrigger.batch(els, {
        start: 'top 88%',
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    }

    setup();

    return () => {
      cancelled = true;
      clearTimeout(safety);
      if (rafId) cancelAnimationFrame(rafId);
      triggers.forEach((t) => t && t.kill && t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
