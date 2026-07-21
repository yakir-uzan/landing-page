/* ═══════════════════════════════════════════
   הסטודיו של יקיר — שולחן עבודה חי
   ═══════════════════════════════════════════ */

/* ═══ הגדרות — לעדכן כאן בלבד ═══ */
const CONFIG = {
  brandName: 'הסטודיו של יקיר',      // שם המותג — מוחלף בכל מקום בדף
  whatsapp: '972538227642',          // מספר וואטסאפ בינלאומי בלי + (למשל 972501234567)
  formspreeEndpoint: '',             // כתובת Formspree. ריק = הטופס נשלח דרך וואטסאפ
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 901px) and (pointer: fine)').matches;

/* ═══ מותג + שנה + וואטסאפ ═══ */
document.querySelectorAll('.brand-name').forEach(el => (el.textContent = CONFIG.brandName));
document.getElementById('year').textContent = new Date().getFullYear();

// תאריך עברי־מלל לכותרת העיתון (ערכת "העיתון")
(() => {
  const npDate = document.getElementById('npDate');
  if (!npDate) return;
  try {
    npDate.textContent = new Intl.DateTimeFormat('he-IL', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date());
  } catch {
    npDate.textContent = new Date().toLocaleDateString('he-IL');
  }
})();

function waUrl(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}
document.querySelectorAll('.wa-link').forEach(a => {
  a.href = waUrl('היי, הגעתי מהאתר שלך ואשמח לדבר על פרויקט.');
  a.target = '_blank';
  a.rel = 'noopener';
});

/* ═══ מודלים — פתיחה, סגירה, פוקוס ═══ */
const overlay = document.getElementById('overlay');
let openSheet = null;
let lastTrigger = null;

function openModal(id, trigger) {
  const sheet = document.getElementById(id);
  if (!sheet) return;
  overlay.hidden = false;
  sheet.hidden = false;
  openSheet = sheet;
  lastTrigger = trigger || null;
  document.body.style.overflow = 'hidden';
  sheet.querySelector('.sheet-close').focus();
}

function closeModal() {
  if (!openSheet) return;
  openSheet.hidden = true;
  overlay.hidden = true;
  document.body.style.overflow = '';
  if (lastTrigger) lastTrigger.focus();
  openSheet = null;
}

overlay.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) closeModal();
});
addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ═══ פריטי השולחן: גרירה בדסקטופ, קליק פותח ═══ */
let topZ = 10;

document.querySelectorAll('.desk-item').forEach(item => {
  const modalId = item.dataset.modal;

  // אנימציית הנחיתה על השולחן רצה פעם אחת בלבד — אחרי שהסתיימה מסמנים settled,
  // אחרת היא רצה שוב בכל פעם שמסירים את מחלקת הגרירה והפריט "נעלם וחוזר".
  // (מכוון ל-settle בלבד כדי לא לחסום אנימציות של ערכות אחרות)
  item.addEventListener('animationend', e => {
    if (e.animationName === 'settle') item.classList.add('settled');
  });

  // גרירה חופשית בכל מסך — עכבר או מגע. קליק/הקשה בלי גרירה פותח את הדף
  let startX, startY, baseX, baseY, dragging, moved;

  item.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    moved = false;                       // איפוס בכל לחיצה — גם בערכות בלי גרירה
    if (document.documentElement.dataset.theme !== 'desk') return; // גרירה רק על השולחן
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = +(item.dataset.x || 0);
    baseY = +(item.dataset.y || 0);
    // לא לוכדים כאן — לכידת מצביע מוקדמת מבטלת את אירוע ה-click של הקשה פשוטה
  });

  item.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) > 6) {
      moved = true;
      try { item.setPointerCapture(e.pointerId); } catch {}  // לכידה רק כשגרירה מתחילה בפועל
      item.style.zIndex = ++topZ;
      item.classList.add('settled'); // שלא תרוץ שוב אנימציית הנחיתה אחרי שחרור
      item.classList.add('dragging');
      // המבקר הבין את הרעיון — התגית "משתחררת" ונופלת
      document.querySelectorAll('.drag-tag').forEach(t => t.classList.add('done'));
    }
    if (moved) {
      item.dataset.x = baseX + dx;
      item.dataset.y = baseY + dy;
      item.style.translate = `${baseX + dx}px ${baseY + dy}px`;
    }
  });

  item.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    try { item.releasePointerCapture(e.pointerId); } catch {}
    item.classList.remove('dragging');
    // הפתיחה מטופלת באירוע click כשלא הייתה גרירה — אמין יותר במגע
  });

  item.addEventListener('pointercancel', () => {
    dragging = false;
    item.classList.remove('dragging');
  });

  // מקלדת: Enter/רווח פותחים (בערכת השולחן, שבה אין אירוע click רגיל)
  item.addEventListener('keydown', e => {
    if (document.documentElement.dataset.theme !== 'desk') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(modalId, item);
    }
  });

  // הקשה בלי גרירה פותחת את הדף — בכל הערכות ובכל מסך
  item.addEventListener('click', () => {
    if (!moved) openModal(modalId, item);
  });
});

/* ═══ ערכת העורך: גשם אותיות עברי ═══ */
const techRain = (() => {
  const canvas = document.getElementById('techRain');
  const ctx = canvas.getContext('2d');
  const glyphs = 'אבגדהוזחטיכלמנסעפצקרשת01{}<>/=+*;';
  const fontSize = 15;
  let raf = null, cols = 0, drops = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    cols = Math.ceil(innerWidth / (fontSize * 1.6));
    drops = Array.from({ length: cols }, () => Math.random() * -60);
  }

  function step() {
    // שכבת דהייה — יוצרת את שובל הטיפות
    ctx.fillStyle = 'rgba(11, 14, 20, 0.09)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px Consolas, monospace';
    for (let i = 0; i < cols; i++) {
      const ch = glyphs[(Math.random() * glyphs.length) | 0];
      ctx.fillStyle = Math.random() < 0.06
        ? 'rgba(255, 180, 84, 0.5)'
        : 'rgba(105, 125, 150, 0.22)';
      ctx.fillText(ch, i * fontSize * 1.6, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.32;
    }
    raf = requestAnimationFrame(step);
  }

  return {
    start() {
      if (raf || reducedMotion) return;
      resize();
      ctx.fillStyle = '#0b0e14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      addEventListener('resize', resize);
      raf = requestAnimationFrame(step);
    },
    stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      removeEventListener('resize', resize);
    },
  };
})();

/* ═══ ערכת העורך: הפקודה שמקלידה את עצמה ═══ */
let techTypeTimer = null;
function typeTechCmd() {
  const el = document.getElementById('techCmdText');
  const text = '$ yakir build --for "העסק שלך"  ✓ done in 0.4s';
  clearInterval(techTypeTimer);
  if (reducedMotion) { el.textContent = text; return; }
  el.textContent = '';
  let i = 0;
  techTypeTimer = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(techTypeTimer);
  }, 42);
}

/* ═══ ערכת הגלקסיה: כוכבים, כוכבים נופלים, שובל עכבר, פרלקסה וטילט ═══ */
const galaxyFx = (() => {
  const starsCv = document.getElementById('gxStars');
  const trailCv = document.getElementById('gxTrail');
  const sctx = starsCv.getContext('2d');
  const tctx = trailCv.getContext('2d');
  const desk = document.getElementById('desk');
  const cards = [...document.querySelectorAll('.desk-item')];
  let raf = null, active = false;
  let stars = [], shots = [], parts = [];

  function resize() {
    [starsCv, trailCv].forEach(c => { c.width = innerWidth; c.height = innerHeight; });
    const count = Math.min(220, (innerWidth * innerHeight) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 0.3 + Math.random() * 1.3,
      p: Math.random() * Math.PI * 2,
      s: 0.5 + Math.random() * 1.5,
    }));
  }

  function onMove(e) {
    // פרלקסה של כל שדה הכרטיסים
    desk.style.setProperty('--gxx', (e.clientX / innerWidth - 0.5) * -16 + 'px');
    desk.style.setProperty('--gxy', (e.clientY / innerHeight - 0.5) * -12 + 'px');
    // חלקיקי שובל
    for (let k = 0; k < 2; k++) {
      parts.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4,
        life: 1, hue: 170 + Math.random() * 130,
      });
    }
    if (parts.length > 150) parts.splice(0, parts.length - 150);
  }

  function step(t) {
    // כוכבים מהבהבים
    sctx.clearRect(0, 0, starsCv.width, starsCv.height);
    for (const st of stars) {
      const a = 0.3 + 0.55 * Math.abs(Math.sin((t / 1000) * st.s + st.p));
      sctx.beginPath();
      sctx.arc(st.x, st.y, st.r, 0, 7);
      sctx.fillStyle = `rgba(210, 224, 255, ${a})`;
      sctx.fill();
    }
    // כוכב נופל מדי פעם
    if (Math.random() < 0.007) {
      shots.push({
        x: starsCv.width * (0.2 + Math.random() * 0.8),
        y: starsCv.height * Math.random() * 0.45,
        vx: -(6 + Math.random() * 5), vy: 3 + Math.random() * 2, life: 1,
      });
    }
    for (const sh of shots) {
      sctx.strokeStyle = `rgba(190, 212, 255, ${sh.life})`;
      sctx.lineWidth = 1.6;
      sctx.beginPath();
      sctx.moveTo(sh.x, sh.y);
      sctx.lineTo(sh.x - sh.vx * 6, sh.y - sh.vy * 6);
      sctx.stroke();
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.02;
    }
    shots = shots.filter(s => s.life > 0);
    // שובל העכבר — זוהר מצטבר
    tctx.clearRect(0, 0, trailCv.width, trailCv.height);
    tctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.life -= 0.028;
      if (p.life <= 0) continue;
      const r = 11 * p.life + 2;
      const g = tctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${0.32 * p.life})`);
      g.addColorStop(1, 'transparent');
      tctx.fillStyle = g;
      tctx.beginPath();
      tctx.arc(p.x, p.y, r, 0, 7);
      tctx.fill();
    }
    parts = parts.filter(p => p.life > 0);
    tctx.globalCompositeOperation = 'source-over';
    raf = requestAnimationFrame(step);
  }

  // טילט תלת־ממדי לכרטיס שמתחת לעכבר
  function tiltMove(e) {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
    card.style.setProperty('--gmx', (x + 0.5) * 100 + '%');
    card.style.setProperty('--gmy', (y + 0.5) * 100 + '%');
  }
  function tiltLeave(e) { e.currentTarget.style.transform = ''; }

  return {
    start() {
      if (active) return;
      active = true;
      resize();
      addEventListener('resize', resize);
      if (!reducedMotion) raf = requestAnimationFrame(step);
      if (isDesktop) {
        addEventListener('mousemove', onMove);
        cards.forEach(c => {
          c.addEventListener('mousemove', tiltMove);
          c.addEventListener('mouseleave', tiltLeave);
        });
      }
    },
    stop() {
      if (!active) return;
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      removeEventListener('resize', resize);
      removeEventListener('mousemove', onMove);
      cards.forEach(c => {
        c.removeEventListener('mousemove', tiltMove);
        c.removeEventListener('mouseleave', tiltLeave);
        c.style.transform = '';
      });
      desk.style.removeProperty('--gxx');
      desk.style.removeProperty('--gxy');
      sctx.clearRect(0, 0, starsCv.width, starsCv.height);
      tctx.clearRect(0, 0, trailCv.width, trailCv.height);
      parts = []; shots = [];
    },
  };
})();

/* ═══ ערכת היוקרה: ספוטלייט שעוקב אחרי העכבר ═══ */
const luxFx = (() => {
  function onMove(e) {
    document.documentElement.style.setProperty('--luxx', e.clientX + 'px');
    document.documentElement.style.setProperty('--luxy', e.clientY + 'px');
  }
  return {
    start() { if (isDesktop) addEventListener('mousemove', onMove); },
    stop() {
      removeEventListener('mousemove', onMove);
      document.documentElement.style.removeProperty('--luxx');
      document.documentElement.style.removeProperty('--luxy');
    },
  };
})();

/* ═══ מחליף הסגנונות ═══ */
const THEMES = ['desk', 'swiss', 'tech', 'soft', 'galaxy', 'neon', 'paper', 'blueprint', 'arcade', 'lux'];
const THEME_LABELS = {
  desk: 'השולחן', swiss: 'המגזין', tech: 'העורך', soft: 'הסטארטאפ', galaxy: 'הגלקסיה',
  neon: 'הניאון', paper: 'העיתון', blueprint: 'הבלופרינט', arcade: 'הארקייד', lux: 'היוקרה',
};
// טקסט הפס הרץ לערכות שמשתמשות בו
const THEME_STRIPS = {
  paper: 'מהדורת הבוקר · דף נחיתה תוך שבוע · האתר הזה קיים בעשרה עיצובים — נסו להחליף למטה · נפתחו תאריכים לפרויקטים חדשים · ',
  arcade: 'SCORE 009900 ★ HI-SCORE 999999 ★ PLAYER 1 READY ★ INSERT COIN ★ ',
};

function setTheme(name) {
  if (!THEMES.includes(name)) name = 'desk';
  document.documentElement.dataset.theme = name;
  try { localStorage.setItem('studio-theme', name); } catch {}
  document.querySelectorAll('[data-theme-set]').forEach(b =>
    b.classList.toggle('active', b.dataset.themeSet === name)
  );
  // כפתור הערכה הנוכחית + סגירת הפאנל
  document.getElementById('dockCurrentLabel').textContent = THEME_LABELS[name];
  closeDockPanel();
  // הפס הרץ
  const stripText = THEME_STRIPS[name] || '';
  document.getElementById('stripA').textContent = stripText;
  document.getElementById('stripB').textContent = stripText;
  // איפוס מיקומים שנגררו — שלא יישברו בפריסות האחרות
  document.querySelectorAll('.desk-item').forEach(it => {
    it.style.translate = '';
    it.style.transform = '';
    it.style.zIndex = '';
    it.dataset.x = 0;
    it.dataset.y = 0;
  });
  // אפקטים ייחודיים לכל ערכה — מדליקים רק את מה שפעיל
  if (name === 'tech') {
    techRain.start();
    typeTechCmd();
  } else {
    techRain.stop();
    clearInterval(techTypeTimer);
  }
  if (name === 'galaxy') galaxyFx.start();
  else galaxyFx.stop();
  if (name === 'lux') luxFx.start();
  else luxFx.stop();
}

/* פתיחה/סגירה של פאנל הערכות */
const styleDock = document.querySelector('.style-dock');
const dockCurrent = document.getElementById('dockCurrent');
function closeDockPanel() {
  styleDock.classList.remove('open');
  dockCurrent.setAttribute('aria-expanded', 'false');
}
dockCurrent.addEventListener('click', () => {
  const open = styleDock.classList.toggle('open');
  dockCurrent.setAttribute('aria-expanded', open);
});
document.addEventListener('click', e => {
  if (!e.target.closest('.style-dock')) closeDockPanel();
});
addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDockPanel();
});

document.querySelectorAll('[data-theme-set]').forEach(btn =>
  btn.addEventListener('click', () => setTheme(btn.dataset.themeSet))
);
document.querySelectorAll('[data-modal-open]').forEach(btn =>
  btn.addEventListener('click', () => openModal(btn.dataset.modalOpen, btn))
);

let savedTheme = 'desk';
try { savedTheme = localStorage.getItem('studio-theme') || 'desk'; } catch {}
setTheme(savedTheme);

/* ═══ טופס — Formspree או וואטסאפ ═══ */
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !phone) {
    note.textContent = 'רק שם וטלפון — ואני כבר חוזר אליך.';
    note.className = 'form-note err';
    return;
  }

  const msg =
    `פנייה חדשה מהאתר:\n` +
    `שם: ${name}\nטלפון: ${phone}` +
    (form.message.value.trim() ? `\nנושא: ${form.message.value.trim()}` : '');

  if (CONFIG.formspreeEndpoint) {
    note.textContent = 'שולח…';
    note.className = 'form-note';
    try {
      const res = await fetch(CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message: form.message.value }),
      });
      if (!res.ok) throw new Error();
      note.textContent = 'התקבל. אחזור אליך עוד היום.';
      note.className = 'form-note ok';
      form.reset();
    } catch {
      note.textContent = 'משהו נתקע — נסה שוב, או פשוט שלח וואטסאפ.';
      note.className = 'form-note err';
    }
  } else {
    window.open(waUrl(msg), '_blank', 'noopener');
    note.textContent = 'נפתח וואטסאפ עם הפרטים — נשאר רק לשלוח.';
    note.className = 'form-note ok';
  }
});
