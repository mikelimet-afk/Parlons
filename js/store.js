// Saved state (feature: memory) + small helpers shared by every file.
(function () {
  const FR = window.FR = window.FR || {};
  const KEY = 'parlons.v1';
  FR.DAY = 864e5;

  const defaults = () => ({
    v: 1,
    settings: { lang: 'en', theme: 'simple', pacing: 'auto', spacing: 0, remind: '', motion: 'full', target: '2027-12-31', voice: 0.9, sound: 'on', readPause: 800 },
    items: {},      // spaced-repetition memory per item: {b: box, r: right, w: wrong, d: due}
    lessons: {},    // lesson id -> {done, n, best, t}
    chapters: {},   // chapter id -> {t}
    tags: {},       // accuracy per lesson ("L:id") and per skill ("S:vocab")
    days: {},       // per-day totals
    history: [],    // finished sessions
    milestones: [], // {id, t}
    streak: { count: 0, best: 0, last: '' },
    gate: null,     // set when a streak is lost: topics to repeat before new lessons
    bonus: [],      // unlocked streak-reward words
    session: null,  // exercise in progress (survives leaving the screen)
    exam: null,     // mock exam in progress
    exams: [],      // finished mock exams
    rp: null,       // roleplay in progress
    roleplay: {},   // best roleplay scores
    read: {},       // passages read
    recent: [],     // last answers (1/0) for automatic pacing
    lastNewAt: 0, last: null, block: null, lastAns: 0, remindedDay: ''
  });

  FR.load = () => {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { s = {}; }
    const d = defaults();
    FR.state = Object.assign(d, s);
    FR.state.settings = Object.assign(defaults().settings, s.settings || {});
    FR.state.streak = Object.assign(defaults().streak, s.streak || {});
  };
  FR.save = () => { try { localStorage.setItem(KEY, JSON.stringify(FR.state)); } catch (e) { /* storage full or blocked */ } };
  FR.resetAll = () => { try { localStorage.removeItem(KEY); } catch (e) {} FR.load(); };
  FR.exportData = () => JSON.stringify(FR.state, null, 1);
  FR.importData = txt => { const s = JSON.parse(txt); if (!s || typeof s !== 'object' || !s.settings) throw new Error('bad file'); localStorage.setItem(KEY, JSON.stringify(s)); FR.load(); };

  // ---------- helpers ----------
  FR.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  FR.dayStr = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  FR.dayDiff = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / FR.DAY);
  FR.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  FR.sample = (a, n) => FR.shuffle(a).slice(0, n);
  FR.norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  FR.dur = ms => { const m = Math.ceil(ms / 60000); return m >= 60 ? Math.floor(m / 60) + ' h ' + (m % 60 ? (m % 60) + ' min' : '') : m + ' min'; };

  // ---------- interface language ----------
  const fill = (s, v) => v ? String(s).replace(/\{(\w+)\}/g, (_, k) => (k in v ? v[k] : '')) : s;
  FR.fr = () => FR.state.settings.lang === 'fr';
  FR.pick = (x, v) => Array.isArray(x) ? fill(x[FR.fr() ? 1 : 0], v) : fill(x, v);
  // bi(): text in the current language, carrying the other language for long-press.
  FR.bi = (x, v) => {
    if (!Array.isArray(x)) return FR.esc(fill(x, v));
    const i = FR.fr() ? 1 : 0;
    return '<span data-alt="' + FR.esc(fill(x[1 - i], v)) + '">' + FR.esc(fill(x[i], v)) + '</span>';
  };
  FR.t = (k, v) => FR.pick(FR.S[k] || [k, k], v);
  FR.tt = (k, v) => FR.bi(FR.S[k] || [k, k], v);
})();
