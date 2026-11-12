// The "coach": question building, spaced repetition, streaks, pacing, milestones and advice.
// Everything runs on the device; nothing is sent anywhere.
(function () {
  const FR = window.FR, DAY = FR.DAY;
  const E = FR.engine = {};
  const S = () => FR.state;

  // ---------- course index ----------
  FR.lessons = [];
  FR.lessonBy = {};
  FR.COURSE.forEach((ch, ci) => ch.lessons.forEach(l => { l.ch = ch; l.ci = ci; FR.lessons.push(l); FR.lessonBy[l.id] = l; }));
  // A lesson's words: dictionary entries tagged with the lesson, plus the extra headwords listed for it.
  const lwCache = {};
  E.lw = id => lwCache[id] || (lwCache[id] = (() => {
    const l = FR.lessonBy && FR.lessonBy[id], more = ((l && l.more) || (FR.LESSON_MORE || {})[id] || '').split(',').map(x => x.trim()).filter(Boolean);
    const out = FR.words.filter(w => w.topic === id);
    more.forEach(m => { const w = FR.wordBy[m]; if (w && !out.includes(w)) out.push(w); });
    return out;
  })());
  E.locked = w => w.topic === 'bonus' && !S().bonus.includes(w.fr);

  // ---------- pacing ----------
  // Review intervals in days per memory box (expanding spaced repetition).
  const IV = [0, 1, 2, 4, 8, 16, 32];
  // q: questions per lesson, goal: daily XP, brk: minutes of study before a rest is suggested, rev: max review items.
  const PACE = { easy: { q: 8, goal: 50, brk: 15, rev: 8 }, medium: { q: 12, goal: 100, brk: 25, rev: 12 }, hard: { q: 16, goal: 160, brk: 35, rev: 20 } };
  E.accRecent = () => { const r = S().recent.slice(-40); return r.length ? r.reduce((a, b) => a + b, 0) / r.length : null; };
  // Automatic pacing aims for roughly 75–90 % correct answers: above that it pushes, below it eases off.
  E.level = () => {
    const p = S().settings.pacing;
    if (p !== 'auto') return p;
    const a = E.accRecent();
    if (a == null || S().recent.length < 15) return 'medium';
    return a >= 0.9 ? 'hard' : a >= 0.75 ? 'medium' : 'easy';
  };
  E.pace = () => PACE[E.level()];
  E.day = (d = FR.dayStr()) => S().days[d] || (S().days[d] = { xp: 0, r: 0, w: 0, n: 0, ms: 0 });

  // ---------- progress helpers ----------
  E.chUnlocked = ci => ci === 0 || (FR.master && FR.master.on) || !!S().chapters[FR.COURSE[ci - 1].id];
  E.chLessonsDone = ch => ch.lessons.every(l => S().lessons[l.id]);
  E.nextLesson = () => {
    for (let ci = 0; ci < FR.COURSE.length; ci++) {
      const ch = FR.COURSE[ci];
      if (S().chapters[ch.id]) continue;
      if (!E.chUnlocked(ci)) return null;
      const l = ch.lessons.find(x => !S().lessons[x.id]);
      return l ? { lesson: l, ch } : { checkpoint: ch };
    }
    return null;
  };
  E.spacingLeft = () => FR.master && FR.master.on ? 0 : Math.max(0, S().lastNewAt + S().settings.spacing * 60000 - Date.now());
  E.due = () => { const now = Date.now(), it = S().items; return Object.keys(it).filter(k => it[k].d <= now && E.fromKey(k, true)).sort((a, b) => it[a].d - it[b].d); };
  E.stats = () => {
    const s = S(), it = s.items; let learned = 0, mastered = 0, xp = 0, r = 0, w = 0;
    Object.keys(it).forEach(k => { if (k[0] === 'w') { if (it[k].b >= 1) learned++; if (it[k].b >= 4) mastered++; } });
    Object.values(s.days).forEach(d => { xp += d.xp; r += d.r; w += d.w; });
    return { learned, mastered, xp, r, w, acc: r + w ? r / (r + w) : null, lessons: Object.keys(s.lessons).length, total: FR.lessons.length, chapters: Object.keys(s.chapters).length };
  };
  E.tagAcc = t => { const x = S().tags[t]; return x && x.r + x.w ? { n: x.r + x.w, a: x.r / (x.r + x.w) } : null; };

  // ---------- gender hints ----------
  const GP = [[/(tion|sion)$/, 'f', '-tion / -sion'], [/té$/, 'f', '-té'], [/ette$/, 'f', '-ette'], [/(ance|ence)$/, 'f', '-ance / -ence'], [/ure$/, 'f', '-ure'], [/ie$/, 'f', '-ie'], [/ée$/, 'f', '-ée'],
    [/age$/, 'm', '-age'], [/ment$/, 'm', '-ment'], [/eau$/, 'm', '-eau'], [/isme$/, 'm', '-isme'], [/oir$/, 'm', '-oir']];
  const GN = { m: ['masculine', 'masculin'], f: ['feminine', 'féminin'] };
  E.genderHint = w => {
    const art = FR.withArt(w) + ', ' + FR.withArt(w, true);
    if (w.g === 'mf') return ['This noun takes either article, depending on the person: ' + art + '.', 'Ce nom prend les deux articles, selon la personne : ' + art + '.'];
    const p = GP.find(x => x[0].test(w.fr));
    if (!p) return ['No reliable ending here — learn it with its article: ' + art + '.', 'Pas de terminaison fiable — apprenez-le avec son article : ' + art + '.'];
    if (p[1] === w.g) return ['Nouns ending in ' + p[2] + ' are usually ' + GN[w.g][0] + ': ' + art + '.', 'Les noms en ' + p[2] + ' sont généralement ' + GN[w.g][1] + 's : ' + art + '.'];
    return ['Exception! Most ' + p[2] + ' nouns are ' + GN[p[1]][0] + ', but this one is ' + GN[w.g][0] + ': ' + art + '.', 'Exception ! Les noms en ' + p[2] + ' sont souvent ' + GN[p[1]][1] + 's, mais celui-ci est ' + GN[w.g][1] + ' : ' + art + '.'];
  };

  // ---------- question builders ----------
  const mcq = (base, correct, wrongs) => { const opts = FR.shuffle([correct, ...wrongs]); return Object.assign(base, { type: 'mcq', opts, a: opts.indexOf(correct) }); };
  const others = (w, n) => {
    let pool = FR.words.filter(x => x !== w && x.pos === w.pos && x.en !== w.en && !E.locked(x));
    if (pool.length < n) pool = FR.words.filter(x => x !== w && x.en !== w.en && !E.locked(x));
    return FR.sample(pool, n);
  };
  E.qWord = (w, dir) => {
    dir = dir || (Math.random() < 0.5 ? 'f' : 'e');
    const o = others(w, 3), b = { k: 'w:' + w.fr, L: w.topic, sk: 'vocab', ex: w.ex ? [w.ex, w.exEn] : null, say: w.fr };
    return dir === 'f'
      ? mcq(Object.assign(b, { lab: 'q_means', term: w.fr, tl: 'fr', ol: 'en' }), w.en, o.map(x => x.en))
      : mcq(Object.assign(b, { lab: 'q_howsay', term: w.en, tl: 'en', ol: 'fr' }), w.fr, o.map(x => x.fr));
  };
  E.qGender = (w, three) => ({ type: 'mcq', k: 'n:' + w.fr, L: w.topic, sk: 'gender', lab: 'q_gender', term: w.fr, tl: 'fr', sub: w.en, ol: 'k',
    opts: three ? ['masc', 'fem', 'both'] : ['masc', 'fem'], a: { m: 0, f: 1, mf: 2 }[w.g], why: E.genderHint(w), say: FR.withArt(w).replace(' / la', '') });
  E.qGram = (l, i) => {
    const g = l.g[i], c = g[1][g[2]];
    return mcq({ k: 'g:' + l.id + ':' + i, L: l.id, sk: 'grammar', lab: 'q_fill', term: g[0], tl: 'fr', ol: 'fr', why: g[3] || '',
      say: g[0].split('___').length === 2 && !/[(=→]/.test(g[0]) ? g[0].replace('___', c).replace("' ", "'") : '' }, c, g[1].filter((_, j) => j !== g[2]));
  };
  const glue = s => s.replace(/ ([?!:;])/g, ' $1');
  E.qBuild = (l, i) => { const f = glue(l.s[i][0]); return { type: 'build', k: 'b:' + l.id + ':' + i, L: l.id, sk: 'order', lab: 'q_build', term: l.s[i][1], tl: 'en', answer: f, tiles: FR.shuffle(f.split(' ')), say: l.s[i][0] }; };
  // Checks a typed answer. Missing accents still count as correct, with a note; a wrong article (le/la) counts as wrong.
  const clean = s => String(s).toLowerCase().replace(/[’`]/g, "'").replace(/oe/g, 'œ').replace(/[.!?;:,«»"]/g, '').replace(/\s+/g, ' ').trim();
  E.checkType = (q, typed) => {
    let t = clean(typed); const ans = clean(q.answer);
    const art = t.match(/^(le |la |les |l'|un |une )/);
    if (art && !ans.startsWith(art[0].trim())) {
      t = t.slice(art[0].length);
      const a = art[0].trim(), fem = a === 'la' || a === 'une', masc = a === 'le' || a === 'un';
      if (((q.g === 'm' && fem) || (q.g === 'f' && masc)) && FR.norm(t) === FR.norm(ans)) return { ok: false, gender: true };
    }
    if (t === ans) return { ok: true };
    if (FR.norm(t) === FR.norm(ans)) {
      // Highlight the letters whose accent was missing or wrong.
      const a = [...q.answer], b = [...t]; let h = '';
      a.forEach((c, i) => { const same = (b[i] || '').toLowerCase() === c.toLowerCase(); h += same ? FR.esc(c) : '<mark>' + FR.esc(c) + '</mark>'; });
      return { ok: true, accent: true, html: a.length === b.length ? h : FR.esc(q.answer) };
    }
    return { ok: false };
  };
  // Typing questions: from the English meaning (or from the sound, "dictation"), write the French word.
  E.qType = (w, dict) => ({ type: 'type', k: 't:' + w.fr, L: w.topic, sk: 'typing', lab: dict ? 'q_dict' : 'q_type', term: dict ? '' : w.en, tl: 'en', answer: w.fr, g: w.g, pos: w.pos, listen: !!dict, say: w.fr, ex: w.ex ? [w.ex, w.exEn] : null });
  E.fromKey = (k, test) => {
    const [t, a, b] = k.split(':');
    if (t === 't') { const w = FR.wordBy[a]; if (!w || E.locked(w)) return null; return test ? true : E.qType(w, Math.random() < 0.3); }
    if (t === 'w' || t === 'n') { const w = FR.wordBy[a]; if (!w || E.locked(w)) return null; return test ? true : t === 'w' ? E.qWord(w) : E.qGender(w, true); }
    const l = FR.lessonBy[a]; if (!l) return null;
    if (t === 'g') return l.g[b] ? (test ? true : E.qGram(l, +b)) : null;
    if (t === 'b') return l.s[b] ? (test ? true : E.qBuild(l, +b)) : null;
    return null;
  };
  E.keyLabel = k => {
    const [t, a, b] = k.split(':'), w = FR.wordBy[a], l = FR.lessonBy[a];
    if (t === 'w' && w) return [w.fr, w.en];
    if (t === 't' && w) return [w.fr, w.en];
    if (t === 'n' && w) return [FR.withArt(w), GN[w.g] ? FR.pick(GN[w.g]) : FR.t('both')];
    if (t === 'g' && l && l.g[b]) return [l.g[b][0].replace('___', '[' + l.g[b][1][l.g[b][2]] + ']'), ''];
    if (t === 'b' && l && l.s[b]) return [l.s[b][0], l.s[b][1]];
    return null;
  };
  const lessonKeys = l => [...E.lw(l.id).map(w => 'w:' + w.fr), ...E.lw(l.id).filter(w => w.fr.length < 18).map(w => 't:' + w.fr),...E.lw(l.id).filter(w => w.g === 'm' || w.g === 'f').map(w => 'n:' + w.fr), ...l.g.map((_, i) => 'g:' + l.id + ':' + i), ...l.s.map((_, i) => 'b:' + l.id + ':' + i)];
  const weakFirst = keys => { const it = S().items; return FR.shuffle(keys).sort((x, y) => (it[x] ? it[x].b : 0.5) - (it[y] ? it[y].b : 0.5)); };
  const fromKeys = (keys, n) => FR.shuffle(weakFirst(keys).slice(0, n).map(k => E.fromKey(k)).filter(Boolean));

  function lessonQ(l, n) {
    const ws = FR.shuffle(E.lw(l.id));
    // Every word is met once (multiple choice, or typed for about a third of them), plus grammar, gender and sentence building.
    n = Math.min(26, Math.max(n, ws.length + 5));
    const cat = { g: l.g.map((_, i) => E.qGram(l, i)), v: ws.map((w, i) => i % 3 === 2 && w.fr.length < 18 ? E.qType(w, i % 6 === 5) : E.qWord(w, i % 2 ? 'e' : 'f')),n: ws.filter(w => w.g === 'm' || w.g === 'f').slice(0, 3).map(w => E.qGender(w)), b: l.s.map((_, i) => E.qBuild(l, i)) };
    const order = ['v', 'v', 'g', 'v', 'n', 'v', 'g', 'v', 'b'], out = [];
    for (let i = 0; out.length < n && i < 160; i++) { const c = cat[order[i % order.length]]; if (c.length) out.push(c.shift()); }
    out.forEach(q => { q.L = l.id; });
    return out;
  }
  E.related = ids => {
    const set = new Set(ids);
    ids.forEach(id => {
      const l = FR.lessonBy[id]; if (!l) return;
      const i = FR.lessons.indexOf(l);
      [FR.lessons[i - 1], FR.lessons[i + 1]].forEach(x => { if (x && E.chUnlocked(x.ci)) set.add(x.id); });
      (l.rel || []).forEach(r => { const x = FR.lessonBy[r]; if (x && E.chUnlocked(x.ci)) set.add(r); });
    });
    return [...set];
  };

  // ---------- sessions ----------
  E.build = (kind, d) => {
    const P = E.pace(), T = FR.S;
    let queue = [], title, id = d.id || '';
    if (kind === 'lesson') { const l = FR.lessonBy[id]; if (!l) return null; queue = lessonQ(l, P.q); title = l.t; }
    else if (kind === 'review') { queue = FR.shuffle(E.due().slice(0, P.rev).map(k => E.fromKey(k)).filter(Boolean)); title = T.review_t; }
    else if (kind === 'practice') {
      let ids = String(d.ids || '').split(',').filter(x => FR.lessonBy[x]);
      if (d.rel === '1') ids = E.related(ids);
      queue = fromKeys(ids.flatMap(x => lessonKeys(FR.lessonBy[x])), +d.n || P.q);
      title = ids.length === 1 ? FR.lessonBy[ids[0]].t : T.practice_t; id = ids.join(',');
    }
    else if (kind === 'vocab') {
      const ws = FR.words.filter(w => w.topic === d.topic);
      queue = fromKeys([...ws.map(w => 'w:' + w.fr), ...ws.filter(w => w.g === 'm' || w.g === 'f').map(w => 'n:' + w.fr)], P.q);
      title = FR.TOPICS[d.topic] || T.practice_t; id = d.topic;
    }
    else if (kind === 'checkpoint') { const ch = FR.COURSE.find(c => c.id === id); if (!ch) return null; queue = fromKeys(ch.lessons.flatMap(lessonKeys), P.q + 4); title = [T.checkpoint[0] + ' · ' + ch.t[0], T.checkpoint[1] + ' · ' + ch.t[1]]; }
    else if (kind === 'comeback') { const g = S().gate; if (!g) return null; queue = fromKeys(g.ids.filter(x => FR.lessonBy[x]).flatMap(x => lessonKeys(FR.lessonBy[x])), 10); title = T.comeback_t; }
    else if (kind === 'gender') {
      const done = S().lessons;
      let ns = FR.words.filter(w => w.pos === 'noun' && w.g && !E.locked(w) && (d.all === '1' || w.topic === 'genre' || done[w.topic]));
      if (ns.length < 6) ns = FR.words.filter(w => w.pos === 'noun' && w.g && !E.locked(w));
      queue = FR.shuffle(weakFirst(ns.map(w => 'n:' + w.fr)).slice(0, 10).map(k => E.qGender(FR.wordBy[k.slice(2)], true))); title = T.gender_t;
    }
    if (!queue.length) return null;
    return { kind, id, title, queue, i: 0, right: 0, wrong: 0, missed: [], last: [], t0: Date.now(), cur: null, build: [] };
  };

  E.mark = (q, ok) => {
    const s = S(), it = s.items[q.k] || (s.items[q.k] = { b: 0, r: 0, w: 0, d: 0 }), was = it.b;
    if (ok && was < 1 && q.k[0] === 'w') { const dd = E.day(); dd.nw = (dd.nw || 0) + 1; }
    if (ok) { it.r++; it.b = Math.min(6, it.b + 1); } else { it.w++; it.b = Math.max(0, it.b - 2); }
    it.d = it.b ? new Date().setHours(0, 0, 0, 0) + IV[it.b] * DAY : Date.now();
    ['L:' + q.L, 'S:' + q.sk].forEach(tg => { const x = s.tags[tg] || (s.tags[tg] = { r: 0, w: 0 }); ok ? x.r++ : x.w++; });
    s.recent.push(ok ? 1 : 0); if (s.recent.length > 80) s.recent.shift();
    const d = E.day(); ok ? d.r++ : d.w++;
  };
  // Tracks continuous study time; returns a nudge key when a rest would help.
  E.tick = ss => {
    const s = S(), now = Date.now();
    if (s.lastAns) E.day().ms += Math.min(now - s.lastAns, 60000);
    const b = s.block && now - s.block.z < 5 * 60000 ? s.block : (s.block = { a: now, z: now, n: 0 });
    b.z = now; s.lastAns = now;
    if ((now - b.a) / 60000 >= E.pace().brk && !b.n) { b.n = 1; return 'nudge_rest'; }
    if (ss && !ss.tired && ss.last.length >= 6 && ss.last.slice(-6).filter(x => !x).length >= 4) { ss.tired = 1; return 'nudge_tired'; }
    return null;
  };
  E.blockMin = () => { const b = S().block; return b && Date.now() - b.z < 5 * 60000 ? (b.z - b.a) / 60000 : 0; };

  // ---------- streak ----------
  E.checkStreak = () => {
    const s = S(), st = s.streak;
    if (st.count > 0 && st.last && FR.dayDiff(st.last, FR.dayStr()) > 1) {
      const lost = st.count; st.count = 0;
      const done = FR.lessons.filter(l => s.lessons[l.id]);
      if (done.length) {
        const acc = l => { const a = E.tagAcc('L:' + l.id); return a ? a.a : 1; };
        const ids = done.slice().sort((x, y) => acc(x) - acc(y) || s.lessons[y.id].t - s.lessons[x.id].t).slice(0, 3).map(l => l.id);
        s.gate = { ids, lost };
      }
      FR.save();
    }
  };
  E.activity = () => {
    const s = S(), st = s.streak, td = FR.dayStr();
    if (st.last === td) return null;
    st.count = st.last && FR.dayDiff(st.last, td) === 1 ? st.count + 1 : 1;
    st.last = td; st.best = Math.max(st.best, st.count);
    let words = [];
    if (st.count >= 2) {
      words = FR.words.filter(w => w.topic === 'bonus' && !s.bonus.includes(w.fr)).slice(0, st.count % 7 === 0 ? 5 : 2);
      words.forEach(w => s.bonus.push(w.fr));
    }
    return { icon: '🔥', title: [st.count + '-day streak!', 'Série de ' + st.count + ' jours !'], sub: words.length ? FR.S.cel_bonus : (st.count === 1 ? FR.S.cel_streak1 : FR.S.cel_streak), words, confetti: st.count > 1 };
  };

  // ---------- milestones ----------
  const nth = (n, f) => s => f(s) >= n;
  const learned = () => E.stats().learned;
  E.MS = [
    { id: 'first', i: '🌱', t: ['First lesson completed', 'Première leçon terminée'], c: s => Object.keys(s.lessons).length >= 1 },
    ...FR.COURSE.map((ch, i) => ({ id: 'ch:' + ch.id, i: '🏆', t: ['Chapter ' + (i + 1) + ' complete: ' + ch.t[0], 'Chapitre ' + (i + 1) + ' terminé : ' + ch.t[1]], c: s => !!s.chapters[ch.id] })),
    ...[3, 7, 14, 30, 100].map(n => ({ id: 'st' + n, i: '🔥', t: [n + '-day streak', 'Série de ' + n + ' jours'], c: s => s.streak.best >= n })),
    ...[25, 50, 100, 150].map(n => ({ id: 'w' + n, i: '📚', t: [n + ' words learned', n + ' mots appris'], c: nth(n, learned) })),
    { id: 'read5', i: '📖', t: ['5 passages read', '5 textes lus'], c: s => Object.keys(s.read).length >= 5 },
    { id: 'rp', i: '🎭', t: ['Every roleplay completed', 'Tous les jeux de rôle terminés'], c: s => FR.ROLEPLAYS.every(r => r.id in s.roleplay) },
    { id: 'exam', i: '🎓', t: ['First mock exam finished', 'Premier examen blanc terminé'], c: s => s.exams.length >= 1 }
  ];
  E.checkMilestones = () => {
    const s = S(), out = [];
    E.MS.forEach(m => { if (!s.milestones.some(x => x.id === m.id) && m.c(s)) { s.milestones.push({ id: m.id, t: Date.now() }); if (m.id.slice(0, 3) !== 'ch:') out.push({ icon: m.i, title: FR.S.cel_ms, sub: m.t }); } });
    return out;
  };
  // XP + streak + milestones for activities outside the quiz engine (reading, roleplay, exams).
  E.reward = (xp, hist) => {
    const d = E.day(); d.xp += xp; d.n++;
    if (hist) { S().history.unshift(Object.assign({ t: Date.now(), xp }, hist)); S().history.length = Math.min(S().history.length, 300); }
    const ev = []; const st = E.activity(); if (st) ev.push(st);
    ev.push(...E.checkMilestones()); FR.save();
    if (ev.length) FR.celebrate(ev);
  };

  // ---------- finishing a session ----------
  E.finish = () => {
    const s = S(), ss = s.session, now = Date.now(), tot = ss.right + ss.wrong, p = tot ? ss.right / tot : 0, ev = [];
    let xp = ss.right * 5;
    const res = { kind: ss.kind, id: ss.id, title: ss.title, right: ss.right, total: tot, p, missed: ss.missed.slice(0, 12), t: now };
    if (ss.kind === 'lesson') {
      const L = s.lessons[ss.id] || (s.lessons[ss.id] = { n: 0, best: 0 });
      if (!L.done) { xp += 20; s.lastNewAt = now; res.first = true; }
      L.done = true; L.n++; L.best = Math.max(L.best, p); L.t = now;
    }
    if (ss.kind === 'checkpoint') {
      res.pass = p >= 0.7;
      if (res.pass && !s.chapters[ss.id]) {
        s.chapters[ss.id] = { t: now }; xp += 50;
        const ci = FR.COURSE.findIndex(c => c.id === ss.id), ch = FR.COURSE[ci], nx = FR.COURSE[ci + 1];
        ev.push({ icon: '🏆', title: FR.S.cel_chapter, sub: ['Chapter ' + (ci + 1) + ' · ' + ch.t[0], 'Chapitre ' + (ci + 1) + ' · ' + ch.t[1]], body: nx ? ['New chapter unlocked: ' + nx.t[0], 'Nouveau chapitre débloqué : ' + nx.t[1]] : FR.S.cel_all, confetti: true, big: true });
      }
    }
    if (ss.kind === 'comeback') { s.gate = null; xp += 10; ev.push({ icon: '💪', title: FR.S.cel_back, sub: FR.S.cel_back_sub, confetti: false }); }
    const d = E.day(); d.xp += xp; d.n++; res.xp = xp;
    s.history.unshift({ t: now, k: ss.kind, ti: ss.title, r: ss.right, n: tot, xp });
    s.history.length = Math.min(s.history.length, 300);
    const st = E.activity(); if (st) ev.push(st);
    ev.push(...E.checkMilestones());
    res.coach = E.afterMsg(p);
    s.session = null; s.last = res; FR.save();
    return ev;
  };
  E.afterMsg = p => {
    const d = E.day(), P = E.pace();
    if (d.xp >= 2 * P.goal) return 'coach_enough';
    if (E.blockMin() >= P.brk) return 'coach_rest';
    if (p < 0.6) return 'coach_slow';
    if (p >= 0.9) return d.xp < P.goal ? 'coach_push' : 'coach_great';
    return d.xp < P.goal ? 'coach_ok' : 'coach_goal';
  };

  // ---------- what next / advice ----------
  E.nextStep = () => {
    const s = S();
    if (s.gate) return { kind: 'comeback' };
    const due = E.due().length, nl = E.nextLesson();
    if (due >= 6) return { kind: 'review', n: due };
    if (nl && nl.checkpoint) return { kind: 'checkpoint', ch: nl.checkpoint };
    if (nl && nl.lesson) { const left = E.spacingLeft(); if (left > 0) return due ? { kind: 'review', n: due, wait: left } : { kind: 'wait', ms: left, lesson: nl.lesson }; return { kind: 'lesson', lesson: nl.lesson }; }
    return due ? { kind: 'review', n: due } : { kind: 'free' };
  };
  E.advice = () => {
    const out = [];
    FR.lessons.map(l => ({ l, a: E.tagAcc('L:' + l.id) })).filter(x => x.a && x.a.n >= 4 && x.a.a < 0.75).sort((x, y) => x.a.a - y.a.a).slice(0, 3)
      .forEach(x => out.push({ txt: ['“' + x.l.t[0] + '” — ' + Math.round(x.a.a * 100) + '% correct. Go through it again.', '« ' + x.l.t[1] + ' » — ' + Math.round(x.a.a * 100) + ' % de réussite. À reprendre.'], btn: ['practise', 'start', 'data-kind="practice" data-ids="' + x.l.id + '"'] }));
    const SK = { gender: ['adv_gender', 'go', 'data-to="gender"'], grammar: ['adv_grammar', 'go', 'data-to="rules"'], vocab: ['adv_vocab', 'go', 'data-to="dict"'], order: ['adv_order', 'go', 'data-to="practice"'], register: ['adv_register', 'go', 'data-to="everyday"'] };
    Object.keys(SK).forEach(k => { const a = E.tagAcc('S:' + k); if (a && a.n >= 6 && a.a < 0.75) out.push({ txt: FR.S[SK[k][0]], pct: Math.round(a.a * 100), btn: ['open', SK[k][1], SK[k][2]] }); });
    const due = E.due().length;
    if (due) out.push({ txt: [due + ' items are due for review — reviewing just before you forget is what makes memories last.', due + ' éléments à réviser — réviser juste avant d\'oublier, c\'est ce qui fixe la mémoire.'], btn: ['review', 'start', 'data-kind="review"'] });
    return out;
  };
})();
