import { useEffect } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// גלילה חלקה גלובלית עם Lenis (נטען מ-CDN) + סנכרון עם ScrollTrigger.
export default function useLenis() {
  useEffect(() => {
    if (prefersReduced()) return;

    let lenis;
    let rafId;
    let cancelled = false;
    const startedAt = performance.now();

    function start() {
      if (cancelled) return;
      const Lenis = window.Lenis;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!Lenis || !gsap || !ScrollTrigger) {
        if (performance.now() - startedAt > 4000) return; // ויתור — גלילת דפדפן רגילה
        rafId = requestAnimationFrame(start);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    }

    start();

    function onAnchorClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelled = true;
      document.removeEventListener('click', onAnchorClick);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      if (window.gsap) window.gsap.ticker.lagSmoothing(500, 33);
      window.__lenis = undefined;
    };
  }, []);
}
