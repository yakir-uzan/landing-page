import { useState } from 'react';
import { contact, waUrl } from '../data/content.js';

export default function Contact() {
  const [note, setNote] = useState({ text: '', kind: '' });

  function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone) {
      setNote({ text: 'רק שם וטלפון — ואני כבר חוזר אליך.', kind: 'err' });
      return;
    }

    const msg =
      `פנייה חדשה מהאתר:\n` +
      `שם: ${name}\nטלפון: ${phone}` +
      (message ? `\nנושא: ${message}` : '');

    window.open(waUrl(msg), '_blank', 'noopener');
    setNote({ text: 'נפתח וואטסאפ עם הפרטים — נשאר רק לשלוח.', kind: 'ok' });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 md:py-36">
      <div className="wrap">
        <div className="rounded-[2.5rem] border border-cream/12 bg-ink-soft p-8 md:p-16">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow reveal mb-4">{contact.eyebrow}</p>
              <h2 className="reveal text-giant font-800">{contact.title}</h2>
              <p className="reveal mt-6 max-w-md text-lg text-cream/60">{contact.sub}</p>
              <a href={waUrl()} target="_blank" rel="noopener" className="reveal btn-clay mt-8">
                <span>{contact.waCta}</span>
              </a>
            </div>

            <form onSubmit={onSubmit} noValidate className="reveal flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-cream/60">שם</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="rounded-xl border border-cream/15 bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-clay"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-cream/60">טלפון</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="rounded-xl border border-cream/15 bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-clay"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-cream/60">
                  על מה נדבר? <span className="text-cream/40">(לא חובה)</span>
                </span>
                <input
                  name="message"
                  type="text"
                  placeholder="יש לי עסק ל—, מתלבט בין אתר לדף נחיתה"
                  className="rounded-xl border border-cream/15 bg-ink px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-clay"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-cream px-6 py-3.5 font-semibold text-ink transition-transform duration-300 ease-clay hover:scale-[1.02]"
              >
                {contact.formCta}
              </button>
              {note.text && (
                <p role="status" className={`text-sm ${note.kind === 'err' ? 'text-clay' : 'text-cream/70'}`}>
                  {note.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
