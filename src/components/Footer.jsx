import { config, nav, waUrl } from '../data/content.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/10 py-14">
      <div className="wrap">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="font-display text-3xl font-900 tracking-tight md:text-5xl">
              {config.brandName}
            </a>
            <p className="mt-4 max-w-sm text-cream/55">
              אתרים ואפליקציות לעסקים קטנים. נבנה ביד, בלי תבניות.
            </p>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex rounded-full bg-clay px-6 py-3 font-semibold text-cream transition-transform duration-300 ease-clay hover:scale-105"
            >
              בוא נדבר בוואטסאפ
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-cream/60 transition-colors hover:text-cream">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hairline my-10" />
        <div className="flex flex-col gap-2 text-sm text-cream/40 md:flex-row md:justify-between">
          <span>נבנה ביד. בלי תבניות. © {year} {config.founder}</span>
          <span>עיצוב בהשראת clay.global</span>
        </div>
      </div>
    </footer>
  );
}
