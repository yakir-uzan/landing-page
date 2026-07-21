import { useEffect, useState } from 'react';
import { config, nav, waUrl } from '../data/content.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-clay ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-cream/10' : 'bg-transparent'
      }`}
    >
      <nav className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="font-display text-lg font-800 tracking-tight text-cream">
          {config.brandName}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-cream transition-transform duration-300 ease-clay hover:scale-105 md:inline-flex"
          >
            בוא נדבר
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 md:hidden"
            aria-label="תפריט"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-cream">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-cream/10 bg-ink/95 backdrop-blur-md md:hidden">
          <ul className="wrap flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block py-2 text-cream/80">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-cream"
              >
                בוא נדבר
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
