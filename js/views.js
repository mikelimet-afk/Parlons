// Every screen. V[name](param, fresh) returns HTML; A[name] are click actions (data-act); AF[name] runs after render.
(function () {
  const FR = window.FR, E = FR.engine, { esc, bi, t, tt } = FR;
  const S = () => FR.state;
  const V = FR.views = {}, A = FR.act = {}, AF = FR.after = {};
  const pc = (a, b) => b ? Math.round(a / b * 100) : 0;
  const frs = x => '<span lang="fr">' + esc(x) + '</span>';
  const back = (to, k) => '<button class="back" data-act="go" data-to="' + to + '">← ' + tt(k || 'back') + '</button>';
  const say = x => '<button class="mini" data-act="say" data-text="' + esc(x) + '" aria-label="listen">🔊</button>';
  const btn = (k, act, data, cls) => '<button class="btn ' + (cls || '') + '" data-act="' + act + '" ' + (data || '') + '>' + tt(k) + '</button>';
  const stars = p => { const n = p >= 0.9 ? 3 : p >= 0.7 ? 2 : 1; return '<span class="stars">' + '★'.repeat(n) + '<i>' + '★'.repeat(3 - n) + '</i></span>'; };
  const dateStr = ts => new Date(ts).toLocaleDateString(FR.fr() ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short' });
  const PRAISE = ['Bravo !', 'Parfait !', 'Très bien !', 'Exactement !', 'Super !', 'Bien joué !'];

  // ---------- shared cards ----------
  FR.stepCard = st => {
    let title, desc, b;
    if (st.kind === 'comeback') { title = tt('step_comeback'); desc = tt('step_comeback_d'); b = btn('start', 'start', 'data-kind="comeback"', 'primary'); }
    else if (st.kind === 'review') { title = tt('step_review', { n: st.n }); desc = st.wait ? tt('step_review_wait', { t: FR.dur(st.wait) }) : tt('step_review_d'); b = btn('start_review', 'start', 'data-kind="review"', 'primary'); }
    else if (st.kind === 'checkpoint') { title = tt('checkpoint') + ' · ' + bi(st.ch.t); desc = tt('step_cp_d'); b = btn('start_quiz', 'start', 'data-kind="checkpoint" data-id="' + st.ch.id + '"', 'primary'); }
    else if (st.kind === 'lesson') { title = bi(st.lesson.t); desc = tt('step_lesson_d'); b = btn('open_lesson', 'go', 'data-to="lesson/' + st.lesson.id + '"', 'primary'); }
    else if (st.kind === 'wait') { title = tt('step_wait', { t: FR.dur(st.ms) }); desc = tt('step_wait_d'); b = btn('practice_mix', 'go', 'data-to="practice"', 'primary') + btn('reading', 'go', 'data-to="read"'); }
    else { title = tt('step_free'); desc = tt('step_free_d'); b = btn('practice_mix', 'go', 'data-to="practice"', 'primary'); }
    return '<section class="card step"><small class="eyebrow">' + tt('next_up') + '</small><h3>' + title + '</h3><p class="mute">' + desc + '</p><div class="row">' + b + '</div></section>';
  };
  const gateCard = () => {
    const g = S().gate; if (!g) return '';
    return '<section class="card warn"><h3>' + tt('gate_t', { n: g.lost }) + '</h3><p>' + tt('gate_d') + '</p><p class="chips">' +
      g.ids.filter(x => FR.lessonBy[x]).map(x => '<span class="chip">' + bi(FR.lessonBy[x].t) + '</span>').join('') + '</p>' + btn('start_comeback', 'start', 'data-kind="comeback"', 'primary') + '</section>';
  };

  // ---------- home ----------
  V.home = () => {
    const s = S(), day = E.day(), goal = E.pace().goal, st = s.streak, lit = st.last === FR.dayStr();
    const h = new Date().getHours(), hello = h < 12 ? 'Bonjour !' : h < 18 ? 'Bon après-midi !' : 'Bonsoir !';
    const left = FR.dayDiff(FR.dayStr(), s.settings.target);
    const tiles = [['basics', '🔤', 'basics'], ['learn', '🧭', 'lessons'], ['practice', '🔀', 'practice_mix'], ['gender', '⚖️', 'gender_quiz'], ['rules', '📐', 'rules'], ['everyday', '💬', 'everyday'], ['read', '📖', 'reading'], ['exam', '🎓', 'exam'], ['dict', '📚', 'dictionary'], ['typing', '⌨️', 'typing'], ['coach', '✨', 'coach'], ['progress', '📈', 'progress'], ['tips', '💡', 'tips']]
      .map(x => '<button class="tile-nav" data-act="go" data-to="' + x[0] + '"><span>' + x[1] + '</span>' + tt(x[2]) + '</button>').join('');
    return '<section class="card hero"><div class="hero-top"><div><h1 lang="fr">' + hello + '</h1><p class="mute">' + tt('home_sub') + '</p></div>' +
      '<button class="streak' + (lit ? ' lit' : '') + '" data-act="glance"><span class="flame">🔥</span><b>' + st.count + '</b><small>' + tt('streak') + '</small></button></div>' +
      '<div class="bar"><i style="width:' + Math.min(100, pc(day.xp, goal)) + '%"></i></div><small class="mute">' + day.xp + ' / ' + goal + ' XP · ' + tt('today_goal') + '</small></section>' +
      gateCard() + (s.gate ? '' : FR.stepCard(E.nextStep())) +
      '<h2>' + tt('explore') + '</h2><div class="grid stagger">' + tiles + '</div>' +
      (left > 0 ? '<p class="mute center small">' + tt('target_left', { n: left, d: s.settings.target }) + '</p>' : '');
  };

  // ---------- learn ----------
  V.learn = () => {
    const s = S(), nl = E.nextLesson(), left = E.spacingLeft();
    let h = '<h1>' + tt('lessons') + '</h1><p class="mute">' + tt('learn_sub') + '</p>' + gateCard();
    if (left > 0 && !s.gate) h += '<p class="note">⏳ ' + tt('spacing_note', { t: FR.dur(left) }) + '</p>';
    FR.COURSE.forEach((ch, ci) => {
      const unl = E.chUnlocked(ci), done = !!s.chapters[ch.id], nd = ch.lessons.filter(l => s.lessons[l.id]).length, all = nd === ch.lessons.length;
      h += '<section class="card chapter' + (unl ? '' : ' locked') + (done ? ' done' : '') + '"><div class="ch-h"><div><small class="eyebrow">' + tt('chapter') + ' ' + (ci + 1) + ' · ' + ch.lvl + '</small><h3>' + bi(ch.t) + '</h3></div><span class="badge">' + (done ? '🏆' : unl ? nd + '/' + ch.lessons.length : '🔒') + '</span></div>' +
        '<div class="bar thin"><i style="width:' + pc(nd + (done ? 1 : 0), ch.lessons.length + 1) + '%"></i></div><div class="nodes stagger">';
      ch.lessons.forEach((l, i) => {
        const L = s.lessons[l.id], isNext = nl && nl.lesson === l;
        h += '<button class="node' + (L ? ' done' : '') + (isNext ? ' next' : '') + '" data-act="go" data-to="lesson/' + l.id + '"' + (unl ? '' : ' aria-disabled="true"') + '><span class="node-i">' + (L ? '✓' : i + 1) + '</span><span class="node-t">' + bi(l.t) + '</span>' + (L ? stars(L.best) : '') + '</button>';
      });
      h += '<button class="node cp' + (done ? ' done' : '') + (all && !done && unl ? ' next' : '') + '" data-act="start" data-kind="checkpoint" data-id="' + ch.id + '"' + (unl && all ? '' : ' aria-disabled="true"') + '><span class="node-i">🏁</span><span class="node-t">' + tt('checkpoint') + '</span><small class="mute">' + (done ? tt('passed') : all ? tt('cp_ready') : tt('cp_locked')) + '</small></button></div></section>';
    });
    return h;
  };

  V.lesson = id => {
    const l = FR.lessonBy[id]; if (!l) return V.learn();
    const s = S(), L = s.lessons[l.id], unl = E.chUnlocked(l.ci), left = E.spacingLeft(), ws = E.lw(l.id), rule = FR.RULES.find(r => r.id === l.rule);
    let cta;
    if (!unl) cta = '<p class="note">🔒 ' + tt('ch_locked') + '</p>';
    else if (!L && s.gate) cta = '<p class="note">' + tt('gate_short') + '</p>' + btn('start_comeback', 'start', 'data-kind="comeback"', 'primary');
    else if (!L && left > 0) cta = '<p class="note">⏳ ' + tt('spacing_note', { t: FR.dur(left) }) + '</p>' + btn('mix_related', 'start', 'data-kind="practice" data-ids="' + l.id + '" data-rel="1"');
    else cta = btn(L ? 'redo_lesson' : 'start_lesson', 'start', 'data-kind="lesson" data-id="' + l.id + '"', 'primary') +
      btn('only_this', 'start', 'data-kind="practice" data-ids="' + l.id + '"') + btn('mix_related', 'start', 'data-kind="practice" data-ids="' + l.id + '" data-rel="1"');
    return back('learn', 'lessons') + '<small class="eyebrow">' + tt('chapter') + ' ' + (l.ci + 1) + ' · ' + bi(l.ch.t) + '</small><h1>' + bi(l.t) + '</h1>' + (L ? '<p>' + stars(L.best) + ' <span class="mute">' + tt('best') + ' ' + Math.round(L.best * 100) + '%</span></p>' : '') +
      '<section class="card"><h3>' + tt('key_points') + '</h3><ul class="tips">' + l.tips.map(x => '<li>' + bi(x) + '</li>').join('') + '</ul>' +
      (rule ? '<button class="link" data-act="go" data-to="rules/' + rule.id + '">📐 ' + bi(rule.t) + ' →</button>' : '') + '</section>' +
      '<section class="card"><h3>' + tt('words') + '</h3><div class="wl stagger">' + ws.map(w => '<div class="wl-r"><b lang="fr">' + esc(w.g ? FR.withArt(w) : w.fr) + '</b>' + say(w.fr) + '<span>' + esc(w.en) + '</span></div>').join('') + '</div><p class="hint">' + tt('hint_press') + '</p></section>' +
      '<div class="col">' + cta + '</div>';
  };

  // ---------- starting sessions ----------
  const attrs = d => Object.keys(d).filter(k => k !== 'act' && k !== 'force').map(k => 'data-' + k + '="' + esc(d[k]) + '"').join(' ');
  A.start = d => {
    const s = S();
    if (!FR.master.on && d.kind !== 'practice' && d.kind !== 'vocab' && d.kind !== 'review' && d.kind !== 'gender' && d.kind !== 'comeback' && s.gate && !(d.kind === 'lesson' && s.lessons[d.id])) { FR.toast(tt('gate_short')); return; }
    if (s.session && !d.force) {
      FR.sheet('<h3>' + tt('busy_t') + '</h3><p class="mute">' + bi(s.session.title) + ' · ' + (s.session.i + 1) + '/' + s.session.queue.length + '</p><div class="col">' + btn('resume', 'go', 'data-to="session"', 'primary') + '<button class="btn" data-act="start" data-force="1" ' + attrs(d) + '>' + tt('start_new') + '</button></div>');
      return;
    }
    const ss = E.build(d.kind, d);
    if (!ss) { FR.toast(tt('nothing')); return; }
    s.session = ss; FR.save(); FR.closeSheet();
    if (document.body.dataset.r === 'session') FR.refresh(true); else FR.go('session');
  };

  // ---------- session ----------
  V.session = () => {
    const ss = S().session; if (!ss) return '';
    const q = ss.queue[ss.i], cur = ss.cur, n = ss.queue.length;
    let body = '<small class="qlab">' + tt(q.lab) + (q.retry ? ' · ' + tt('again') : '') + '</small><div class="qterm" lang="' + q.tl + '">' + esc(q.term) + (q.tl === 'fr' && q.sk !== 'grammar' ? say(q.term) : '') + '</div>' + (q.sub ? '<div class="qsub mute">' + esc(q.sub) + '</div>' : '');
    if (q.type === 'mcq') {
      body += '<div class="opts">' + q.opts.map((o, i) => {
        let c = 'opt'; if (cur) c += i === q.a ? ' ok' : i === cur.pick ? ' bad' : ' dim';
        return '<button class="' + c + '" data-act="ans" data-i="' + i + '">' + (q.ol === 'k' ? tt(o) : '<span lang="' + q.ol + '">' + esc(o) + '</span>') + '</button>';
      }).join('') + '</div>';
    } else if (q.type === 'type') {
      if (q.listen) body = body.replace('<div class="qterm" lang="en"></div>', '<div class="qterm"><button class="btn" data-act="say" data-text="' + esc(q.answer) + '">🔊 ' + tt('listen_again') + '</button></div>');
      body += '<form id="typef" class="typebox"><input id="typein" class="search big-in' + (cur ? (cur.ok ? ' ok' : ' bad') : '') + '" lang="fr" autocomplete="off" autocapitalize="off" spellcheck="false" data-kb="1" value="' + esc(cur ? cur.typed : '') + '"' + (cur ? ' readonly' : '') + ' placeholder="' + esc(FR.t('type_ph')) + '">' +
        (cur ? '' : '<button class="btn primary">' + tt('check') + '</button>') + '</form>';
    } else {
      const used = ss.build;
      body += '<div class="line' + (cur ? (cur.ok ? ' ok' : ' bad') : '') + '">' + (used.length ? used.map((ti, j) => '<button class="tile on" data-act="untile" data-j="' + j + '" lang="fr">' + esc(q.tiles[ti]) + '</button>').join('') : '<span class="mute">' + tt('tap_words') + '</span>') + '</div>' +
        '<div class="bank">' + q.tiles.map((x, i) => used.includes(i) ? '<span class="tile ghost">' + esc(x) + '</span>' : '<button class="tile" data-act="tile" data-i="' + i + '" lang="fr">' + esc(x) + '</button>').join('') + '</div>' +
        (cur ? '' : '<button class="btn primary" data-act="check"' + (used.length ? '' : ' aria-disabled="true"') + '>' + tt('check') + '</button>');
    }
    if (cur) {
      body += '<div class="fb ' + (cur.ok ? 'ok' : 'bad') + '"><div class="fb-h">' + (cur.ok ? '<b lang="fr">' + esc(cur.praise) + '</b>' : '<b>' + tt('not_quite') + '</b>') + (q.say ? say(q.say) : '') + '</div>' +
        (!cur.ok && (q.type === 'build' || q.type === 'type') ? '<p>' + tt('correct_is') + ' <b lang="fr">' + esc(q.type === 'type' && q.g ? FR.withArt({ fr: q.answer, g: q.g }) : q.answer) + '</b></p>' + (cur.gender ? '<p>' + tt('type_gender') + '</p>' : '') : '') +
        (cur.accent ? '<p class="accent-note">✍️ ' + tt('type_accent') + ' <b lang="fr" class="acc-w">' + cur.html + '</b></p>' : '') +
        (q.why ? '<p>' + bi(q.why) + '</p>' : '') + (q.ex ? '<p class="ex"><span lang="fr">' + esc(q.ex[0]) + '</span><br><span class="mute">' + esc(q.ex[1]) + '</span></p>' : '') +
        (cur.nudge ? '<p class="nudge">☕ ' + tt(cur.nudge) + '</p>' : '') +
        '<button class="btn primary" data-act="next">' + tt('continue') + '</button></div>';
    }
    return '<div class="sess-h"><button class="x" data-act="go" data-to="home" aria-label="leave">✕</button><div class="bar"><i style="width:' + pc(ss.i + (cur ? 1 : 0), n) + '%"></i></div><small>' + (ss.i + 1) + '/' + n + '</small></div>' +
      '<small class="eyebrow">' + bi(ss.title) + '</small><div class="qcard">' + body + '</div>' +
      '<p class="center"><button class="link mute" data-act="endsess">' + tt('end_session') + '</button></p>';
  };
  AF.session = () => {
    const ss = S().session; if (!ss) { FR.go('home'); return; }
    const q = ss.queue[ss.i], f = document.getElementById('typef');
    if (q && q.listen && !ss.cur && !q.played) { q.played = 1; setTimeout(() => FR.speak(q.answer), 350); }
    if (f) {
      const inp = document.getElementById('typein');
      f.addEventListener('submit', e => { e.preventDefault(); A.typecheck(); });
      if (!ss.cur) { FR.kb.attach(inp, () => A.typecheck()); if (!FR.kb.active()) inp.focus(); } else FR.kb.hide();
    } else FR.kb.hide();
  };
  A.typecheck = () => {
    const ss = S().session; if (!ss || ss.cur) return;
    const q = ss.queue[ss.i], inp = document.getElementById('typein'), typed = inp ? inp.value : '';
    if (!typed.trim()) { FR.toast(tt('type_empty')); return; }
    const r = E.checkType(q, typed);
    if (r.accent) { const x = S().tags['S:accents'] || (S().tags['S:accents'] = { r: 0, w: 0 }); x.w++; }
    resolve(r.ok, -1, { typed, accent: r.accent, html: r.html, gender: r.gender });
  };
  function resolve(ok, pick, extra) {
    const ss = S().session, q = ss.queue[ss.i];
    if (!q.retry) {
      E.mark(q, ok); ok ? ss.right++ : ss.wrong++; ss.last.push(ok ? 1 : 0);
      if (!ok) { ss.missed.push(q.k); ss.queue.push(Object.assign({}, q, { retry: 1 })); }
    } else if (!ok && q.retry < 2) ss.queue.push(Object.assign({}, q, { retry: q.retry + 1 }));
    FR.sfx(ok);
    ss.cur = Object.assign({ ok, pick, praise: PRAISE[Math.floor(Math.random() * PRAISE.length)], nudge: E.tick(ss) }, extra || {});
    FR.save(); FR.refresh();
    if (ok) { const el = document.querySelector('.opt.ok, .line.ok, .big-in.ok'); FR.burst(el); if (!q.retry) FR.floatXp(el, '+5 XP'); }
    const fb = document.querySelector('.fb'); if (fb && fb.scrollIntoView) fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  A.ans = d => { const ss = S().session; if (!ss || ss.cur) return; resolve(+d.i === ss.queue[ss.i].a, +d.i); };
  A.tile = d => { const ss = S().session; if (!ss || ss.cur) return; ss.build.push(+d.i); FR.save(); FR.refresh(); };
  A.untile = d => { const ss = S().session; if (!ss || ss.cur) return; ss.build.splice(+d.j, 1); FR.save(); FR.refresh(); };
  A.check = () => { const ss = S().session; if (!ss || ss.cur || !ss.build.length) return; const q = ss.queue[ss.i]; resolve(ss.build.map(i => q.tiles[i]).join(' ') === q.answer, -1); };
  A.next = () => {
    const ss = S().session; if (!ss) return;
    ss.i++; ss.cur = null; ss.build = [];
    if (ss.i >= ss.queue.length) {
      const tot = ss.right + ss.wrong, fast = tot >= 5 && (Date.now() - ss.t0) / tot < 6000, ev = E.finish();
      FR.go('result'); FR.kb.hide();
      setTimeout(() => { FR.cheer(tot ? S().last.p : 0, fast, S().last.title); if (ev.length) FR.celebrate(ev); }, 350);
    }
    else { FR.save(); FR.refresh(true); }
  };
  A.endsess = (d, el) => {
    if (!el.dataset.sure) { el.dataset.sure = 1; el.innerHTML = tt('tap_again'); return; }
    S().session = null; FR.save(); FR.go('home');
  };

  V.result = () => {
    const r = S().last; if (!r) return V.home();
    const p = Math.round(r.p * 100), failed = r.kind === 'checkpoint' && !r.pass;
    const missed = r.missed.map(k => E.keyLabel(k)).filter(Boolean);
    return '<div class="center result"><small class="eyebrow">' + bi(r.title) + '</small><div class="ring" style="--p:' + p + '"><b>' + p + '%</b></div><h1 lang="fr">' + (failed ? 'Presque !' : p >= 90 ? 'Excellent !' : p >= 70 ? 'Bien joué !' : 'Courage !') + '</h1>' +
      '<p>' + tt('res_line', { r: r.right, n: r.total }) + ' · <b>+' + r.xp + ' XP</b></p>' + (failed ? '<p class="note">' + tt('cp_fail') + '</p>' : '') + '</div>' +
      '<section class="card coachmsg"><span>✨</span><p>' + tt(r.coach) + '</p></section>' +
      (missed.length ? '<section class="card"><h3>' + tt('to_review') + '</h3><div class="wl">' + missed.map(m => '<div class="wl-r"><b lang="fr">' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></div>').join('') + '</div></section>' : '') +
      FR.stepCard(E.nextStep()) + '<div class="col">' + btn('home', 'go', 'data-to="home"') + '</div>';
  };

  // ---------- practice mix ----------
  const pm = { ids: new Set(), rel: true, n: 12 };
  V.practice = () => {
    let h = '<h1>' + tt('practice_mix') + '</h1><p class="mute">' + tt('practice_sub') + '</p>';
    FR.COURSE.forEach((ch, ci) => {
      const unl = E.chUnlocked(ci);
      h += '<h4>' + bi(ch.t) + (unl ? '' : ' 🔒') + '</h4><div class="chips">' + ch.lessons.map(l => '<button class="chip' + (pm.ids.has(l.id) ? ' on' : '') + '" data-act="pmtog" data-id="' + l.id + '"' + (unl ? '' : ' aria-disabled="true"') + '>' + (S().lessons[l.id] ? '✓ ' : '') + bi(l.t) + '</button>').join('') + '</div>';
    });
    const rel = pm.rel && pm.ids.size ? E.related([...pm.ids]).filter(x => !pm.ids.has(x)) : [];
    h += '<section class="card"><label class="switch"><input type="checkbox" data-chg="pmrel"' + (pm.rel ? ' checked' : '') + '><span>' + tt('mix_toggle') + '</span></label>' +
      (rel.length ? '<p class="mute small">+ ' + rel.map(x => bi(FR.lessonBy[x].t)).join(', ') + '</p>' : '') +
      '<div class="seg">' + [8, 12, 20].map(n => '<button class="' + (pm.n === n ? 'on' : '') + '" data-act="pmn" data-n="' + n + '">' + n + ' ' + tt('questions') + '</button>').join('') + '</div></section>' +
      '<div class="col"><button class="btn primary" data-act="start" data-kind="practice" data-ids="' + [...pm.ids].join(',') + '" data-rel="' + (pm.rel ? 1 : 0) + '" data-n="' + pm.n + '"' + (pm.ids.size ? '' : ' aria-disabled="true"') + '>' + tt('start') + '</button>' +
      (E.due().length ? btn('start_review', 'start', 'data-kind="review"') : '') + '</div>';
    return h;
  };
  A.pmtog = d => { pm.ids.has(d.id) ? pm.ids.delete(d.id) : pm.ids.add(d.id); FR.refresh(); };
  A.pmn = d => { pm.n = +d.n; FR.refresh(); };
  FR.chg = { pmrel: el => { pm.rel = el.checked; FR.refresh(); } };

  // ---------- gender quiz ----------
  V.gender = () => {
    const a = E.tagAcc('S:gender'), r = FR.RULES.find(x => x.id === 'genre');
    return '<h1>' + tt('gender_quiz') + '</h1><section class="card"><p>' + tt('gender_intro') + '</p>' +
      r.pts.map(p => '<div class="pt"><b>' + esc(p[0]) + '</b><span lang="fr">' + esc(p[1][0]) + '</span></div>').join('') + '</section>' +
      (a ? '<p class="mute">' + tt('gender_acc', { p: Math.round(a.a * 100), n: a.n }) + '</p><div class="bar"><i style="width:' + Math.round(a.a * 100) + '%"></i></div>' : '') +
      '<div class="col">' + btn('gender_met', 'start', 'data-kind="gender"', 'primary') + btn('gender_all', 'start', 'data-kind="gender" data-all="1"') + '</div>';
  };

  // ---------- dictionary ----------
  const dq = { q: '', f: 'all', open: '', th: '' };
  const POS = { prep: ['preposition', 'préposition'], noun: ['noun', 'nom'], verb: ['verb', 'verbe'], adj: ['adjective', 'adjectif'], adv: ['adverb', 'adverbe'], phrase: ['phrase', 'expression'], interj: ['interjection', 'interjection'], num: ['number', 'nombre'], pron: ['pronoun', 'pronom'], conj: ['conjunction', 'conjonction'] };
  function dictList() {
    const q = FR.norm(dq.q.trim());
    const all = FR.words.filter(w => (!dq.th || w.topic === dq.th) && (dq.f === 'all' || (dq.f === 'bonus' ? w.topic === 'bonus' : dq.f === 'other' ? !['noun', 'verb', 'adj'].includes(w.pos) && w.topic !== 'bonus' : w.pos === dq.f)) && (!q || FR.norm(w.fr).includes(q) || (!E.locked(w) && FR.norm(w.en).includes(q))))
      .sort((a, b) => FR.norm(a.fr).localeCompare(FR.norm(b.fr)));
    if (!all.length) return '<p class="mute center">' + tt('no_results') + '</p>';
    const MAX = 120, ws = all.slice(0, MAX);
    return (dq.th ? '<div class="col"><button class="btn primary" data-act="start" data-kind="vocab" data-topic="' + esc(dq.th) + '">' + tt('quiz_theme') + '</button></div>' : '') +
      '<p class="hint">' + (all.length > MAX ? tt('showing', { n: MAX, t: all.length }) : tt('n_words', { n: all.length })) + '</p>' + ws.map(w => {
      const lock = E.locked(w), open = dq.open === w.fr && !lock, it = S().items['w:' + w.fr];
      let h = '<div class="entry' + (open ? ' open' : '') + (lock ? ' lockd' : '') + '" data-act="dopen" data-w="' + esc(w.fr) + '"><div class="entry-h"><b lang="fr">' + esc(w.fr) + '</b>' + (w.g ? '<span class="g g-' + w.g + '">' + (w.g === 'mf' ? 'm/f' : w.g) + '</span>' : '') + '<span class="en">' + (lock ? '🔒 ' + tt('streak_reward') : esc(w.en)) + '</span></div>';
      if (open) h += '<div class="entry-b"><p class="mute small">' + bi(POS[w.pos] || [w.pos, w.pos]) + (w.g ? ' · <span lang="fr">' + esc(FR.withArt(w) + ', ' + FR.withArt(w, true)) + '</span>' : '') + '</p><p class="pronl">' + say(w.fr) + ' <i>' + esc(w.pron || '≈ ' + FR.approx(w.fr)) + '</i></p>' +
        (w.ex ? '<p class="ex"><span lang="fr">' + esc(w.ex) + '</span> ' + say(w.ex) + '<br><span class="mute">' + esc(w.exEn) + '</span></p>' : '') + (w.note ? '<p class="usage">💡 ' + esc(w.note) + '</p>' : '') +
        '<p class="mute small">' + tt('memory') + ' <span class="dots">' + [1, 2, 3, 4, 5, 6].map(i => '<i class="' + (it && it.b >= i ? 'on' : '') + '"></i>').join('') + '</span>' + (FR.lessonBy[w.topic] ? ' · <button class="link" data-act="go" data-to="lesson/' + w.topic + '">' + bi(FR.lessonBy[w.topic].t) + '</button>' : FR.TOPICS[w.topic] ? ' · ' + bi(FR.TOPICS[w.topic]) : '') + '</p></div>';
      return h + '</div>';
    }).join('');
  }
  V.dict = (p, fresh) => {
    if (fresh && p) { dq.q = p; dq.open = p; dq.f = 'all'; }
    const fl = [['all', 'f_all'], ['noun', 'f_nouns'], ['verb', 'f_verbs'], ['adj', 'f_adj'], ['other', 'f_other'], ['bonus', 'f_bonus']];
    return '<h1>' + tt('dictionary') + '</h1><input id="dq" class="search" type="search" placeholder="' + esc(t('search_ph')) + '" value="' + esc(dq.q) + '" autocomplete="off">' +
      '<div class="chips scroll" id="dchips">' + fl.map(f => '<button class="chip' + (dq.f === f[0] ? ' on' : '') + '" data-act="dfilter" data-f="' + f[0] + '">' + tt(f[1]) + '</button>').join('') + '</div>' +
      '<select class="search" data-chg="dtheme"><option value="">' + esc(t('all_themes')) + '</option>' + Object.keys(FR.TOPICS).map(k => '<option value="' + esc(k) + '"' + (dq.th === k ? ' selected' : '') + '>' + esc(FR.pick(FR.TOPICS[k])) + '</option>').join('') + '</select>' +
      '<p class="hint">' + tt('dict_count', { n: FR.words.filter(w => !E.locked(w)).length, b: FR.words.filter(E.locked).length }) + '</p><div id="dlist" class="entries">' + dictList() + '</div>';
  };
  FR.chg.dtheme = el => { dq.th = el.value; document.getElementById('dlist').innerHTML = dictList(); };
  AF.dict = () => { const i = document.getElementById('dq'); if (i) i.addEventListener('input', () => { dq.q = i.value; document.getElementById('dlist').innerHTML = dictList(); }); };
  A.dopen = (d, el, e) => { if (e.target.closest('button')) return; dq.open = dq.open === d.w ? '' : d.w; document.getElementById('dlist').innerHTML = dictList(); };
  A.dfilter = (d, el) => { dq.f = d.f; document.querySelectorAll('#dchips .chip').forEach(c => c.classList.toggle('on', c === el)); document.getElementById('dlist').innerHTML = dictList(); };
  A.say = d => { if (FR.stopReading) FR.stopReading(); FR.speak(d.text); };

  // ---------- rules ----------
  let openRule = '';
  V.rules = (p, fresh) => {
    if (fresh && p) openRule = p;
    return '<h1>' + tt('rules') + '</h1><p class="mute">' + tt('rules_sub') + '</p><div class="stagger">' + FR.RULES.map(r => {
      const o = openRule === r.id;
      return '<section class="card rule' + (o ? ' open' : '') + '" id="rule-' + r.id + '"><button class="rule-h" data-act="rule" data-id="' + r.id + '"><h3>' + bi(r.t) + '</h3><span>' + (o ? '−' : '+') + '</span></button>' +
        (o ? '<div class="rule-b"><p>' + bi(r.sum) + '</p>' + r.pts.map(p => '<div class="pt"><b lang="fr">' + esc(p[0]) + '</b><span>' + bi(p[1]) + '</span></div>').join('') +
          '<h4>' + tt('examples') + '</h4>' + r.ex.map(x => '<p class="ex"><span lang="fr">' + esc(x[0]) + '</span> ' + say(x[0]) + '<br><span class="mute">' + esc(x[1]) + '</span></p>').join('') +
          (FR.lessonBy[r.lesson] && E.chUnlocked(FR.lessonBy[r.lesson].ci) ? btn('practise_rule', 'start', 'data-kind="practice" data-ids="' + r.lesson + '"', 'primary') : '') + '</div>' : '') + '</section>';
    }).join('') + '</div>';
  };
  AF.rules = (p, fresh) => { if (fresh && p) { const el = document.getElementById('rule-' + p); if (el) el.scrollIntoView({ block: 'start' }); } };
  A.rule = d => { openRule = openRule === d.id ? '' : d.id; FR.refresh(); };

  // ---------- everyday French ----------
  let evTab = 'pairs', phCat = 'all';
  A.phcat = d => { phCat = d.c; FR.refresh(); };
  V.everyday = () => {
    const s = S(), rp = s.rp, R = rp && FR.ROLEPLAYS.find(x => x.id === rp.id);
    if (R) {
      const tn = R.turns[rp.i];
      if (!tn) { // finished
        return '<div class="center result"><div class="ring" style="--p:' + pc(rp.score, R.turns.length) + '"><b>' + rp.score + '/' + R.turns.length + '</b></div><h1 lang="fr">' + (rp.score === R.turns.length ? 'Parfait !' : 'Pas mal !') + '</h1><p>' + bi(R.t) + '</p><p class="mute">' + tt('rp_done') + '</p></div><div class="col">' + btn('again_btn', 'rpstart', 'data-id="' + R.id + '"') + btn('back', 'rpquit', '', 'primary') + '</div>';
      }
      const picked = rp.pick != null;
      return '<div class="sess-h"><button class="x" data-act="rpquit">✕</button><div class="bar"><i style="width:' + pc(rp.i + (picked ? 1 : 0), R.turns.length) + '%"></i></div><small>' + (rp.i + 1) + '/' + R.turns.length + '</small></div>' +
        '<small class="eyebrow">' + bi(R.t) + ' · <span class="reg ' + R.reg + '">' + tt(R.reg) + '</span></small><p class="mute">' + bi(R.who) + '</p><div class="qcard">' +
        (tn.npc ? '<div class="bubble"><span lang="fr">' + esc(tn.npc[0]) + '</span> ' + say(tn.npc[0]) + '<br><small class="mute">' + esc(tn.npc[1]) + '</small></div>' : '') +
        '<small class="qlab">' + (tn.task ? bi(tn.task) : tt('rp_reply')) + '</small><div class="opts">' + tn.opts.map((o, i) => {
          let c = 'opt'; if (picked) c += o[2] ? ' ok' : i === rp.pick ? ' bad' : ' dim';
          return '<button class="' + c + '" data-act="rppick" data-i="' + i + '"><span lang="fr">' + esc(o[0]) + '</span>' + (picked ? '<small class="mute">' + esc(o[1]) + '</small>' : '') + '</button>';
        }).join('') + '</div>' +
        (picked ? '<div class="fb ' + (tn.opts[rp.pick][2] ? 'ok' : 'bad') + '"><p>' + esc(tn.opts[rp.pick][3]) + '</p>' + (tn.opts[rp.pick][2] ? '' : '<p class="mute">✓ ' + esc(tn.opts.find(o => o[2])[3]) + '</p>') + btn('continue', 'rpnext', '', 'primary') + '</div>' : '') + '</div>';
    }
    let h = '<h1>' + tt('everyday') + '</h1><p class="mute">' + tt('everyday_sub') + '</p><div class="seg">' + [['pairs', 'ev_pairs'], ['rp', 'ev_rp']].map(x => '<button class="' + (evTab === x[0] ? 'on' : '') + '" data-act="evtab" data-t="' + x[0] + '">' + tt(x[1]) + '</button>').join('') + '</div>';
    if (evTab === 'pairs') {
      const list = FR.PAIRS.filter(p => phCat === 'all' || p[0] === phCat);
      h += '<div class="chips scroll">' + [['all', ['All', 'Tout']]].concat(Object.entries(FR.PHRASE_CATS)).map(c => '<button class="chip' + (phCat === c[0] ? ' on' : '') + '" data-act="phcat" data-c="' + c[0] + '">' + bi(c[1]) + '</button>').join('') + '</div><p class="hint">' + tt('n_phrases', { n: list.length }) + '</p>' +
        '<div class="stagger">' + list.map(p => '<section class="card pair"><small class="mute">' + esc(p[3]) + ' · ' + bi(FR.PHRASE_CATS[p[0]]) + '</small><div class="pair-r"><span class="reg formal">' + tt('formal') + '</span><span lang="fr">' + esc(p[1]) + '</span>' + say(p[1]) + '</div><div class="pair-r"><span class="reg casual">' + tt('casual') + '</span><span lang="fr">' + esc(p[2]) + '</span>' + say(p[2].split(' / ')[0]) + '</div>' + (p[4] ? '<p class="usage">💡 ' + esc(p[4]) + '</p>' : '') + '</section>').join('') + '</div>';
    }
    else h += '<div class="stagger">' + FR.ROLEPLAYS.map(r => '<section class="card"><div class="ch-h"><div><h3>' + bi(r.t) + '</h3><span class="reg ' + r.reg + '">' + tt(r.reg) + '</span></div><span class="badge">' + (r.id in s.roleplay ? s.roleplay[r.id] + '/' + r.turns.length : '🎭') + '</span></div><p class="mute">' + bi(r.who) + '</p>' + btn('play', 'rpstart', 'data-id="' + r.id + '"', 'primary') + '</section>').join('') + '</div>';
    return h;
  };
  A.evtab = d => { evTab = d.t; FR.refresh(); };
  A.rpstart = d => { S().rp = { id: d.id, i: 0, score: 0, pick: null }; FR.save(); FR.refresh(true); };
  A.rppick = d => {
    const rp = S().rp; if (!rp || rp.pick != null) return;
    const R = FR.ROLEPLAYS.find(x => x.id === rp.id), ok = !!R.turns[rp.i].opts[+d.i][2];
    rp.pick = +d.i; if (ok) rp.score++; FR.sfx(ok);
    const x = S().tags['S:register'] || (S().tags['S:register'] = { r: 0, w: 0 }); ok ? x.r++ : x.w++;
    FR.save(); FR.refresh(); if (ok) FR.burst(document.querySelector('.opt.ok'));
  };
  A.rpnext = () => {
    const s = S(), rp = s.rp, R = FR.ROLEPLAYS.find(x => x.id === rp.id);
    rp.i++; rp.pick = null;
    if (rp.i >= R.turns.length) { s.roleplay[R.id] = Math.max(s.roleplay[R.id] || 0, rp.score); E.reward(10 + rp.score * 5, { k: 'roleplay', ti: R.t, r: rp.score, n: R.turns.length }); setTimeout(() => FR.cheer(rp.score / R.turns.length, 0, R.t), 350); }
    FR.save(); FR.refresh(true);
  };
  A.rpquit = () => { S().rp = null; evTab = 'rp'; FR.save(); FR.refresh(true); };

  // ---------- reading ----------
  const rf = { cat: 'all', len: 'all', tab: 'p' }; let showEn = false;
  const LEN = { s: 'len_s', m: 'len_m', l: 'len_l' };
  // Stories are split into pages; a page is addressed as "storyId~pageNumber" (1-based).
  FR.STORIES = (FR.STORIES || []).map(s => {
    if (s.pages) return s;
    const pages = [];
    s.text.trim().split('\n').forEach(l => {
      l = l.trim(); if (!l) return;
      if (l.startsWith('## ')) pages.push({ t: l.slice(3).split(' | '), s: [] });
      else if (pages.length) { const p = l.split(' | '); pages[pages.length - 1].s.push([p[0], p[1] || '']); }
    });
    return Object.assign(s, { pages });
  });
  FR.findText = id => {
    const p = FR.PASSAGES.find(x => x.id === id); if (p) return p;
    const [sid, n] = String(id || '').split('~'), st = FR.STORIES.find(x => x.id === sid);
    if (!st) return null;
    const k = Math.max(1, Math.min(st.pages.length, +n || 1)), pg = st.pages[k - 1];
    return { id: sid + '~' + k, s: pg.s, t: pg.t, story: st, page: k };
  };
  const sentHtml = P => P.s.map((x, i) => '<p class="sent' + (paraStart(P, i) ? ' brk' : '') + (rd && rd.id === P.id && rd.i === i ? ' now' : '') + '"><span lang="fr">' + esc(x[0]) + '</span>' + say(x[0]) + '<span class="tr">' + esc(x[1]) + '</span></p>').join('');
  const rdControls = P => '<div class="row"><label class="switch"><input type="checkbox" data-chg="showen"' + (showEn ? ' checked' : '') + '><span>' + tt('show_en') + '</span></label><span id="rdctl" class="row tight">' + rdButtons(P.id) + '</span></div>' +
    '<small class="mute">' + tt('rd_gap') + '</small>' + seg('readPause', [[300, 'gap_s'], [800, 'gap_m'], [1600, 'gap_l']]);
  function storyPage(P) {
    const st = P.story, n = P.page, N = st.pages.length, go = k => 'data-act="go" data-to="read/' + st.id + '~' + k + '"';
    (S().spos = S().spos || {})[st.id] = n; FR.save();
    const nav = '<div class="row spread pager">' + (n > 1 ? '<button class="btn" ' + go(n - 1) + '>← ' + tt('x_prev') + '</button>' : '<span></span>') + '<b>' + tt('page_n', { n, t: N }) + '</b>' +
      (n < N ? '<button class="btn primary" ' + go(n + 1) + '>' + tt('x_next') + ' →</button>' : '<button class="btn primary" data-act="storydone" data-id="' + st.id + '">' + tt('st_finish') + '</button>') + '</div>';
    return back('read', 'reading') + '<small class="eyebrow">' + st.icon + ' ' + bi(st.by) + ' · ' + st.lvl + '</small><h1 lang="fr">' + esc(st.t[0]) + '</h1>' +
      '<div class="bar thin"><i style="width:' + Math.round(n / N * 100) + '%"></i></div>' + rdControls(P) +
      '<p class="hint">' + tt('hint_swipe') + '</p><article class="passage book' + (showEn ? ' en' : '') + '" id="book" data-n="' + n + '" data-sid="' + st.id + '"><h2 class="pg-t" lang="fr">' + esc(P.t[0]) + '</h2><p class="mute pg-st">' + esc(P.t[1]) + '</p>' + sentHtml(P) + '<p class="pg-no">— ' + n + ' —</p></article>' + nav;
  }
  V.read = id => {
    const P = id && FR.findText(id);
    if (P && P.story) return storyPage(P);
    if (P) {
      const done = S().read[P.id];
      return back('read', 'reading') + '<small class="eyebrow">' + bi(FR.CATS[P.cat]) + ' · ' + tt(LEN[P.len]) + '</small><h1 lang="fr">' + esc(P.t[0]) + '</h1><p class="mute">' + esc(P.t[1]) + '</p>' +
        rdControls(P) + '<p class="hint">' + tt('hint_read') + '</p><article class="passage' + (showEn ? ' en' : '') + '">' + sentHtml(P) + '</article>' +
        '<div class="col">' + (done ? '<p class="note center">✓ ' + tt('read_done') + '</p>' : btn('mark_read', 'markread', 'data-id="' + P.id + '"', 'primary')) + '</div>';
    }
    const tabs = '<div class="seg">' + [['p', 'passages_tab'], ['s', 'stories']].map(x => '<button class="' + (rf.tab === x[0] ? 'on' : '') + '" data-act="rftab" data-v="' + x[0] + '">' + tt(x[1]) + '</button>').join('') + '</div>';
    if (rf.tab === 's') {
      const pos = S().spos || {};
      return '<h1>' + tt('reading') + '</h1><p class="mute">' + tt('stories_sub') + '</p>' + tabs + '<div class="stagger">' + FR.STORIES.map(st => {
        const done = S().read['st:' + st.id], at = pos[st.id];
        return '<button class="card passcard story-card" data-act="go" data-to="read/' + st.id + '~' + (at && !done ? at : 1) + '"><span class="st-icon">' + st.icon + '</span><div><small class="eyebrow">' + st.lvl + ' · ' + tt('st_pages', { n: st.pages.length }) + (done ? ' · ✓' : at ? ' · ' + tt('page_n', { n: at, t: st.pages.length }) : '') + '</small><h3 lang="fr">' + esc(st.t[0]) + '</h3><span class="mute">' + bi(st.by) + '</span></div></button>';
      }).join('') + '</div>';
    }
    const list = FR.PASSAGES.filter(p => (rf.cat === 'all' || p.cat === rf.cat) && (rf.len === 'all' || p.len === rf.len));
    return '<h1>' + tt('reading') + '</h1><p class="mute">' + tt('read_sub') + '</p>' + tabs +
      '<div class="chips scroll"><button class="chip' + (rf.cat === 'all' ? ' on' : '') + '" data-act="rfcat" data-v="all">' + tt('f_all') + '</button>' + Object.keys(FR.CATS).map(c => '<button class="chip' + (rf.cat === c ? ' on' : '') + '" data-act="rfcat" data-v="' + c + '">' + bi(FR.CATS[c]) + '</button>').join('') + '</div>' +
      '<div class="seg">' + ['all', 's', 'm', 'l'].map(l => '<button class="' + (rf.len === l ? 'on' : '') + '" data-act="rflen" data-v="' + l + '">' + tt(l === 'all' ? 'f_all' : LEN[l]) + '</button>').join('') + '</div>' +
      '<div class="stagger">' + (list.length ? list.map(p => '<button class="card passcard" data-act="go" data-to="read/' + p.id + '"><small class="eyebrow">' + bi(FR.CATS[p.cat]) + ' · ' + tt(LEN[p.len]) + (S().read[p.id] ? ' · ✓' : '') + '</small><h3 lang="fr">' + esc(p.t[0]) + '</h3><span class="mute">' + esc(p.t[1]) + '</span></button>').join('') : '<p class="mute center">' + tt('no_results') + '</p>') + '</div>';
  };
  A.rftab = d => { rf.tab = d.v; FR.refresh(true); };
  A.storydone = d => {
    const st = FR.STORIES.find(x => x.id === d.id); if (!st) return;
    const first = !S().read['st:' + st.id];
    S().read['st:' + st.id] = Date.now(); (S().spos || {})[st.id] = 0;
    E.reward(first ? 40 : 10, { k: 'read', ti: [st.t[1], st.t[0]], r: 0, n: 0 });
    FR.cheer(1, 0, st.t);
    rf.tab = 's'; FR.go('read');
  };
  // Swipe left / right to turn story pages.
  AF.read = () => {
    const b = document.getElementById('book'); if (!b) return;
    let x0 = 0, y0 = 0;
    b.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    b.addEventListener('pointerup', e => {
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
      const n = +b.dataset.n + (dx < 0 ? 1 : -1), st = FR.STORIES.find(x => x.id === b.dataset.sid);
      if (st && n >= 1 && n <= st.pages.length) FR.go('read/' + st.id + '~' + n);
    });
  };
  A.rfcat = d => { rf.cat = d.v; FR.refresh(); };
  A.rflen = d => { rf.len = d.v; FR.refresh(); };
  FR.chg.showen = el => { showEn = el.checked; const a = document.querySelector('.passage'); if (a) a.classList.toggle('en', showEn); };
  // Listening: one sentence at a time, with a pause between sentences and a longer one between paragraphs.
  let rd = null; // { id, i, paused, t }
  const paraSize = P => { const n = P.s.length; if (n < 6 || P.s[0][0][0] === '—') return 0; return Math.ceil(n / Math.round(n / 3.5)); };
  const paraStart = (P, i) => { const z = P.br ? 0 : paraSize(P); return i > 0 && (P.br ? P.br.includes(i) : z && i % z === 0); };
  const rdButtons = id => {
    const on = rd && rd.id === id;
    return '<button class="btn small" data-act="readall" data-id="' + id + '">' + (on ? (rd.paused ? '▶ ' + tt('rd_resume') : '⏸ ' + tt('rd_pause')) : '🔊 ' + tt('listen_all')) + '</button>' + (on ? '<button class="btn small" data-act="readstop">■ ' + tt('rd_stop') + '</button>' : '');
  };
  const rdPaint = () => {
    const c = document.getElementById('rdctl'); if (c && rd) c.innerHTML = rdButtons(rd.id);
    document.querySelectorAll('.passage .sent').forEach((el, j) => el.classList.toggle('now', !!rd && j === rd.i));
  };
  const rdStop = () => {
    if (!rd) return;
    const id = rd.id; clearTimeout(rd.t); rd = null;
    if (FR.canSpeak()) speechSynthesis.cancel();
    const c = document.getElementById('rdctl'); if (c) c.innerHTML = rdButtons(id);
    document.querySelectorAll('.passage .sent.now').forEach(el => el.classList.remove('now'));
  };
  FR.stopReading = rdStop;
  const rdStep = () => {
    if (!rd || rd.paused) return;
    const P = FR.findText(rd.id), me = rd;
    if (!P || rd.i >= P.s.length) { rdStop(); return; }
    rdPaint();
    const el = document.querySelectorAll('.passage .sent')[rd.i]; if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    FR.speak(P.s[rd.i][0], () => {
      if (rd !== me || rd.paused) return;
      rd.i++;
      rd.t = setTimeout(rdStep, (S().settings.readPause || 800) * (paraStart(P, rd.i) ? 2 : 1));
    });
  };
  A.readall = d => {
    if (!FR.canSpeak()) { FR.toast(tt('no_voice')); return; }
    if (rd && rd.id === d.id) { // pause / resume
      rd.paused = !rd.paused; clearTimeout(rd.t);
      if (rd.paused) { speechSynthesis.cancel(); rdPaint(); } else rdStep();
      return;
    }
    rdStop(); rd = { id: d.id, i: 0, paused: false, t: 0 }; rdStep();
  };
  A.readstop = rdStop;
  A.markread = d => { S().read[d.id] = Date.now(); const P = FR.PASSAGES.find(x => x.id === d.id); E.reward(P.len === 'l' ? 20 : P.len === 'm' ? 15 : 10, { k: 'read', ti: [P.t[1], P.t[0]], r: 0, n: 0 }); FR.toast('📖 ' + tt('read_xp')); FR.refresh(); FR.cheer(1, 0, P.t); };

  // ---------- progress ----------
  let histAll = false;
  V.progress = () => {
    const s = S(), st = E.stats(), days = [];
    for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * FR.DAY), k = FR.dayStr(d); days.push({ k, xp: (s.days[k] || {}).xp || 0, l: d.getDate() }); }
    const mx = Math.max(E.pace().goal, ...days.map(d => d.xp));
    const earned = s.milestones.slice().sort((a, b) => b.t - a.t), nextMs = E.MS.filter(m => !s.milestones.some(x => x.id === m.id)).slice(0, 3);
    const mist = Object.keys(s.items).filter(k => s.items[k].w > 0).sort((a, b) => s.items[b].w - s.items[a].w).slice(0, 8).map(k => ({ k, l: E.keyLabel(k), w: s.items[k].w })).filter(x => x.l);
    const adv = E.advice(), hist = histAll ? s.history : s.history.slice(0, 8);
    const KN = { lesson: '📘', review: '🔁', practice: '🔀', checkpoint: '🏁', comeback: '💪', gender: '⚖️', roleplay: '🎭', read: '📖', exam: '🎓' };
    return '<h1>' + tt('progress') + '</h1><div class="stats stagger">' +
      [['🔥', s.streak.count, 'streak'], ['⭐', st.xp, 'xp_total'], ['📚', st.learned, 'words_learned'], ['🎯', st.acc == null ? '–' : Math.round(st.acc * 100) + '%', 'accuracy']].map(x => '<div class="stat card"><span>' + x[0] + '</span><b>' + x[1] + '</b><small>' + tt(x[2]) + '</small></div>').join('') + '</div>' +
      '<section class="card"><h3>' + tt('course_prog') + '</h3><div class="bar"><i style="width:' + pc(st.lessons + st.chapters, st.total + FR.COURSE.length) + '%"></i></div><div class="cefr"><span>A1</span><span>A2</span><span>B1</span></div><p class="mute small">' + tt('course_line', { l: st.lessons, t: st.total, c: st.chapters, ct: FR.COURSE.length, m: st.mastered, b: s.streak.best }) + '</p></section>' +
      '<section class="card"><h3>' + tt('last14') + '</h3><div class="chart">' + days.map(d => '<div class="cbar"><i style="height:' + Math.max(3, pc(d.xp, mx)) + '%" class="' + (d.xp ? 'on' : '') + '"></i><small>' + d.l + '</small></div>').join('') + '</div></section>' +
      '<section class="card"><h3>' + tt('focus') + '</h3>' + (adv.length ? adv.map(a => '<div class="adv"><p>' + bi(a.txt, { p: a.pct }) + '</p><button class="btn small" data-act="' + a.btn[1] + '" ' + a.btn[2] + '>' + tt(a.btn[0]) + '</button></div>').join('') : '<p class="mute">' + tt(st.r + st.w < 10 ? 'adv_early' : 'adv_none') + '</p>') + '</section>' +
      '<section class="card"><h3>' + tt('mistakes') + '</h3>' + (mist.length ? '<div class="wl">' + mist.map(m => '<div class="wl-r"><b lang="fr">' + esc(m.l[0]) + '</b><span>' + esc(m.l[1]) + '</span><small class="miss">×' + m.w + '</small></div>').join('') + '</div>' : '<p class="mute">' + tt('no_mistakes') + '</p>') + '</section>' +
      '<section class="card"><h3>' + tt('milestones') + '</h3>' + (earned.length ? earned.map(m => { const def = E.MS.find(x => x.id === m.id); return def ? '<div class="ms on"><span>' + def.i + '</span><p>' + bi(def.t) + '</p><small class="mute">' + dateStr(m.t) + '</small></div>' : ''; }).join('') : '<p class="mute">' + tt('no_ms') + '</p>') +
      (nextMs.length ? '<h4>' + tt('next_ms') + '</h4>' + nextMs.map(m => '<div class="ms"><span>' + m.i + '</span><p>' + bi(m.t) + '</p></div>').join('') : '') + '</section>' +
      '<section class="card" id="history"><h3>' + tt('history') + '</h3>' + (hist.length ? hist.map(x => '<div class="hist"><span>' + (KN[x.k] || '•') + '</span><p>' + bi(x.ti) + '<small class="mute">' + dateStr(x.t) + (x.n ? ' · ' + x.r + '/' + x.n : '') + '</small></p><b>+' + x.xp + '</b></div>').join('') + (s.history.length > 8 ? '<button class="link" data-act="histall">' + tt(histAll ? 'show_less' : 'show_all') + '</button>' : '') : '<p class="mute">' + tt('no_hist') + '</p>') + '</section>';
  };
  A.histall = () => { histAll = !histAll; FR.refresh(); };
  AF.progress = (p, fresh) => { if (fresh && p === 'history') { const el = document.getElementById('history'); if (el) el.scrollIntoView(); } };

  // ---------- quick glance ----------
  A.glance = () => {
    const s = S(), d = E.day(), goal = E.pace().goal, lit = s.streak.last === FR.dayStr(), nl = E.nextLesson(), due = E.due().length;
    let ch = '', nextLine = '';
    if (nl) {
      const c = nl.ch || nl.checkpoint, ci = FR.COURSE.indexOf(c), left = c.lessons.filter(l => !s.lessons[l.id]).length;
      ch = '<div class="gl-r"><span>🏆</span><p>' + tt('chapter') + ' ' + (ci + 1) + ' · ' + bi(c.t) + '<small class="mute">' + (left ? tt('gl_left', { n: left }) : tt('gl_cp')) + '</small></p></div><div class="bar thin"><i style="width:' + pc(c.lessons.length - left, c.lessons.length + 1) + '%"></i></div>';
      nextLine = nl.lesson ? tt('gl_next', { l: FR.pick(nl.lesson.t) }) + (left === 1 ? ' ' + tt('gl_soon') : '') : tt('gl_cp_next');
    } else nextLine = tt('step_free_d');
    const msg = d.xp >= goal ? 'gl_done' : d.xp > 0 ? 'gl_some' : 'gl_none';
    FR.sheet('<h3>' + tt('today') + '</h3><p class="gl-msg">' + tt(msg, { n: Math.max(0, goal - d.xp) }) + '</p>' +
      '<div class="bar"><i style="width:' + Math.min(100, pc(d.xp, goal)) + '%"></i></div><small class="mute">' + d.xp + ' / ' + goal + ' XP</small>' +
      '<div class="gl-grid"><div><b>' + d.n + '</b><small>' + tt('sessions') + '</small></div><div><b>' + (d.r + d.w ? pc(d.r, d.r + d.w) + '%' : '–') + '</b><small>' + tt('accuracy') + '</small></div><div><b>' + Math.round(d.ms / 60000) + '</b><small>min</small></div><div><b>' + due + '</b><small>' + tt('due') + '</small></div></div>' +
      '<div class="gl-r"><span>🔥</span><p>' + tt('streak_n', { n: s.streak.count }) + '<small class="mute">' + tt(lit ? 'streak_safe' : 'streak_open') + '</small></p></div>' + ch +
      '<p class="note">➜ ' + nextLine + '</p><div class="col">' + btn('gl_history', 'go', 'data-to="progress/history"', 'primary') + '</div>');
  };

  // ---------- coach ----------
  let coachTab = 'next';
  // One single-series chart: bars (daily values) or a line (running total). Hover / tap shows the exact value.
  function chart(pts, kind, unit) {
    const W = 320, Hh = 130, pl = 30, pb = 18, mx = Math.max(1, ...pts.map(p => p.v)), n = pts.length, bw = (W - pl) / n;
    const y = v => Hh - pb - (v / mx) * (Hh - pb - 8), x = i => pl + bw * i + bw / 2;
    let g = '';
    [...new Set([0, 0.5, 1].map(f => Math.round(mx * f)))].forEach(v => { const yy = y(v); g += '<line x1="' + pl + '" x2="' + W + '" y1="' + yy + '" y2="' + yy + '" class="cg"/><text x="' + (pl - 4) + '" y="' + (yy + 3) + '" class="cl" text-anchor="end">' + v + '</text>'; });
    let marks = '';
    if (kind === 'bar') pts.forEach((p, i) => { const h = Math.max(p.v ? 2 : 0, Hh - pb - y(p.v)), w = Math.max(2, bw - 2); marks += '<rect x="' + (x(i) - w / 2) + '" y="' + (Hh - pb - h) + '" width="' + w + '" height="' + h + '" rx="' + Math.min(4, w / 2) + '" class="cb"/>'; });
    else { marks = '<polyline points="' + pts.map((p, i) => x(i) + ',' + y(p.v)).join(' ') + '" class="cline"/>'; const l = pts.length - 1; marks += '<circle cx="' + x(l) + '" cy="' + y(pts[l].v) + '" r="4" class="cdot"/>'; }
    const hits = pts.map((p, i) => '<rect x="' + (pl + bw * i) + '" y="0" width="' + bw + '" height="' + (Hh - pb) + '" class="chit" data-tip="' + esc(p.l + ': ' + p.v + ' ' + unit) + '"/>').join('');
    const lab = [0, Math.floor(n / 2), n - 1].map(i => '<text x="' + x(i) + '" y="' + (Hh - 4) + '" class="cl" text-anchor="middle">' + esc(pts[i].s) + '</text>').join('');
    return '<div class="chartbox"><svg viewBox="0 0 ' + W + ' ' + Hh + '" class="csvg" role="img">' + g + marks + lab + hits + '</svg><div class="ctip" hidden></div></div>' +
      '<details class="small"><summary>' + tt('as_table') + '</summary><div class="wl">' + pts.filter(p => p.v).slice(-10).map(p => '<div class="wl-r"><span>' + esc(p.l) + '</span><b>' + p.v + ' ' + esc(unit) + '</b></div>').join('') + '</div></details>';
  }
  function series(days) {
    const s = S(), rows = [];
    for (let i = 0; i < days; i++) { const d = new Date(Date.now() - i * FR.DAY); rows.push({ d, r: s.days[FR.dayStr(d)] || {} }); }
    // Running total of words learned, walked back from today's total (only days tracked since this update change it).
    let words = E.stats().learned;
    rows.forEach(a => { a.words = Math.max(0, words); words -= a.r.nw || 0; });
    return rows.reverse().map(a => ({ l: dateStr(a.d), s: a.d.getDate() + '/' + (a.d.getMonth() + 1), xp: a.r.xp || 0, words: a.words, min: Math.round((a.r.ms || 0) / 60000) }));
  }
  V.coach = () => {
    const P = E.level(), auto = S().settings.pacing === 'auto', a = E.accRecent(), st = E.stats();
    let body = '';
    if (coachTab === 'next') {
      const n = E.nextStep(), why = { comeback: 'why_comeback', review: 'why_review', checkpoint: 'why_cp', lesson: 'why_lesson', wait: 'why_wait', free: 'why_free' }[n.kind];
      body = FR.stepCard(n) + '<section class="card coachmsg"><span>✨</span><p>' + tt(why) + '</p></section>' +
        '<section class="card"><h3>' + tt('pacing') + '</h3><p>' + tt('pace_now', { p: FR.t('p_' + P) }) + (auto ? ' ' + tt('pace_auto') : '') + '</p><p class="mute small">' + (a == null ? tt('pace_nodata') : tt('pace_acc', { p: Math.round(a * 100) })) + '</p></section>';
    } else if (coachTab === 'better') {
      const adv = E.advice(), it = S().items;
      const weak = Object.keys(it).filter(k => it[k].w > 0).sort((x, y) => (it[y].w - it[y].r * 0.3) - (it[x].w - it[x].r * 0.3)).slice(0, 6).map(k => E.keyLabel(k)).filter(Boolean);
      const sk = ['vocab', 'grammar', 'gender', 'order', 'typing', 'register'].map(k => ({ k, a: E.tagAcc('S:' + k) })).filter(x => x.a);
      body = '<section class="card"><h3>' + tt('focus') + '</h3>' + (adv.length ? adv.map(x => '<div class="adv"><p>' + bi(x.txt, { p: x.pct }) + '</p><button class="btn small" data-act="' + x.btn[1] + '" ' + x.btn[2] + '>' + tt(x.btn[0]) + '</button></div>').join('') : '<p class="mute">' + tt(st.r + st.w < 10 ? 'adv_early' : 'adv_none') + '</p>') + '</section>' +
        (sk.length ? '<section class="card"><h3>' + tt('skills') + '</h3>' + sk.map(x => '<div class="skill"><span>' + tt('sk_' + x.k) + '</span><div class="bar thin"><i style="width:' + Math.round(x.a.a * 100) + '%"></i></div><b>' + Math.round(x.a.a * 100) + '%</b></div>').join('') + '</section>' : '') +
        (weak.length ? '<section class="card"><h3>' + tt('mistakes') + '</h3><div class="wl">' + weak.map(m => '<div class="wl-r"><b lang="fr">' + esc(m[0]) + '</b><span>' + esc(m[1]) + '</span></div>').join('') + '</div>' + (E.due().length ? '<div class="col">' + btn('start_review', 'start', 'data-kind="review"', 'primary') + '</div>' : '') + '</section>' : '');
    } else {
      const pts = series(30);
      body = '<div class="stats">' + [['🔥', S().streak.count, 'streak'], ['⭐', st.xp, 'xp_total'], ['📚', st.learned, 'words_learned'], ['🎯', st.acc == null ? '–' : Math.round(st.acc * 100) + '%', 'accuracy']].map(x => '<div class="stat card"><span>' + x[0] + '</span><b>' + x[1] + '</b><small>' + tt(x[2]) + '</small></div>').join('') + '</div>' +
        '<section class="card"><h3>' + tt('ch_xp') + '</h3>' + chart(pts.map(p => ({ l: p.l, s: p.s, v: p.xp })), 'bar', 'XP') + '</section>' +
        '<section class="card"><h3>' + tt('ch_words') + '</h3>' + chart(pts.map(p => ({ l: p.l, s: p.s, v: p.words })), 'line', FR.t('words_learned')) + '</section>' +
        '<section class="card"><h3>' + tt('ch_min') + '</h3>' + chart(pts.map(p => ({ l: p.l, s: p.s, v: p.min })), 'bar', 'min') + '</section>' +
        '<div class="col">' + btn('gl_history', 'go', 'data-to="progress"') + '</div>';
    }
    return '<h1>' + tt('coach') + '</h1><p class="mute">' + tt('coach_sub') + '</p><div class="col coach-q">' +
      [['next', 'cq_next', '🧭'], ['better', 'cq_better', '🎯'], ['prog', 'cq_prog', '📈']].map(q => '<button class="btn' + (coachTab === q[0] ? ' primary' : '') + '" data-act="coachq" data-t="' + q[0] + '">' + q[2] + ' ' + tt(q[1]) + '</button>').join('') + '</div>' + body;
  };
  A.coachq = d => { coachTab = d.t; FR.refresh(true); };
  AF.coach = () => {
    document.querySelectorAll('.chartbox').forEach(box => {
      const tip = box.querySelector('.ctip');
      const show = e => { const h = e.target.closest('.chit'); if (!h) return; tip.hidden = false; tip.textContent = h.dataset.tip; const r = box.getBoundingClientRect(), hr = h.getBoundingClientRect(); tip.style.left = Math.max(0, Math.min(r.width - 160, hr.left - r.left + hr.width / 2 - 80)) + 'px'; box.querySelectorAll('.chit.on').forEach(x => x.classList.remove('on')); h.classList.add('on'); };
      box.addEventListener('pointermove', show); box.addEventListener('pointerdown', show);
      box.addEventListener('pointerleave', () => { tip.hidden = true; box.querySelectorAll('.chit.on').forEach(x => x.classList.remove('on')); });
    });
  };

  // ---------- settings ----------
  const seg = (k, opts) => '<div class="seg wrap">' + opts.map(o => '<button class="' + (String(S().settings[k]) === String(o[0]) ? 'on' : '') + '" data-act="set" data-k="' + k + '" data-v="' + o[0] + '">' + (o[2] ? esc(o[1]) : tt(o[1])) + '</button>').join('') + '</div>';
  V.settings = () => {
    const st = S().settings;
    return '<h1>' + tt('settings') + '</h1>' +
      '<section class="card"><h3>' + tt('language') + '</h3>' + seg('lang', [['en', 'English', 1], ['fr', 'Français', 1]]) + '<p class="hint">' + tt('hint_press') + '</p></section>' +
      '<section class="card"><h3>' + tt('theme') + '</h3>' + seg('theme', [['simple', 'th_simple'], ['minimal', 'th_minimal'], ['frenchy', 'th_frenchy']]) + '<h4>' + tt('motion') + '</h4>' + seg('motion', [['full', 'mo_full'], ['calm', 'mo_calm']]) + '<h4>' + tt('sounds') + '</h4>' + seg('sound', [['on', 'snd_on'], ['off', 'snd_off']]) + '</section>' +
      '<section class="card"><h3>' + tt('pacing') + '</h3>' + seg('pacing', [['auto', 'p_auto'], ['easy', 'p_easy'], ['medium', 'p_medium'], ['hard', 'p_hard']]) + '<p class="mute small">' + tt('pd_' + st.pacing) + '</p></section>' +
      '<section class="card"><h3>' + tt('spacing') + '</h3><p class="mute small">' + tt('spacing_d') + '</p>' + seg('spacing', [[0, 'sp_none'], [30, '30 min', 1], [60, '1 h', 1], [240, '4 h', 1], [720, '12 h', 1], [1440, '24 h', 1]]) + '</section>' +
      '<section class="card"><h3>' + tt('reminder') + '</h3><p class="mute small">' + tt('reminder_d') + '</p><div class="row"><input type="time" class="search" data-set="remind" value="' + esc(st.remind) + '">' + btn('notif_on', 'notif', '', 'small') + '</div></section>' +
      '<section class="card"><h3>' + tt('kb_set') + '</h3><p class="mute small">' + tt('kb_set_d') + '</p>' + seg('kb', [['auto', 'kb_auto'], ['on', 'kb_on'], ['off', 'kb_off']]) + seg('kbLayout', [['azerty', 'AZERTY', 1], ['qwerty', 'QWERTY', 1]]) + '</section>' +
      '<section class="card"><h3>' + tt('voice') + '</h3>' + seg('voice', [[0.7, 'v_slow'], [0.9, 'v_normal'], [1, 'v_natural']]) + '<button class="btn small" data-act="say" data-text="Bonjour ! Comment allez-vous aujourd\'hui ?">🔊 ' + tt('test') + '</button></section>' +
      '<section class="card"><h3>' + tt('target') + '</h3><p class="mute small">' + tt('target_d') + '</p><input type="date" class="search" data-set="target" value="' + esc(st.target) + '"></section>' +
      '<section class="card"><h3>' + tt('data') + '</h3><p class="mute small">' + tt('data_d') + '</p><div class="row">' + btn('export', 'export', '', 'small') + '<label class="btn small">' + tt('import') + '<input type="file" accept="application/json,.json" data-chg="import" hidden></label>' + btn('reset', 'reset', '', 'small danger') + '</div></section>' +
      '<div class="col">' + btn('tips', 'go', 'data-to="tips"') + '</div><p class="mute center small">Parlons ! · v2</p>';
  };
  A.set = d => { S().settings[d.k] = ['spacing', 'voice', 'readPause'].includes(d.k) ? +d.v : d.v; FR.save(); FR.applySettings(); FR.shell(); FR.refresh(); if (d.k === 'sound' && d.v === 'on') FR.sfx(true); if (d.k === 'kb' && FR.kb) FR.kb.dismissed = false; };
  A.lang = () => A.set({ k: 'lang', v: FR.fr() ? 'en' : 'fr' });
  A.notif = () => { if (!('Notification' in window)) { FR.toast(tt('notif_no')); return; } Notification.requestPermission().then(p => FR.toast(tt(p === 'granted' ? 'notif_ok' : 'notif_no'))); };
  A.export = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([FR.exportData()], { type: 'application/json' })); a.download = 'parlons-backup-' + FR.dayStr() + '.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
  FR.chg.import = el => { const f = el.files[0]; if (!f) return; f.text().then(txt => { try { FR.importData(txt); FR.applySettings(); FR.shell(); FR.refresh(); FR.toast(tt('import_ok')); } catch (e) { FR.toast(tt('import_bad')); } }); };
  A.reset = (d, el) => { if (!el.dataset.sure) { el.dataset.sure = 1; el.innerHTML = tt('tap_again'); return; } FR.resetAll(); FR.applySettings(); FR.shell(); FR.go('home'); FR.refresh(); };

  // ---------- misc ----------
  A.go = (d, el) => { if (el && el.getAttribute('aria-disabled')) return; FR.closeSheet(); FR.closePop(); FR.go(d.to); };
  A.closesheet = () => FR.closeSheet();
  A.celenext = () => FR.nextCele();
})();
