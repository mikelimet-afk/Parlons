window.FR = window.FR || {};
// TCF Canada track (docs/design-tcf-canada.md): full mocks in the real format, practice sets,
// scores per CEFR level, NCLC estimates, AI marking for writing and speaking, and the weakest skill.
(function () {
  const FR = window.FR, E = FR.engine, A = FR.act, AF = FR.after, V = FR.views, { esc, bi, tt } = FR, S = () => FR.state;
  const T = FR.TCFCA; if (!T) return;

  Object.assign(FR.S, {
    tcf_t: ['TCF Canada', 'TCF Canada'],
    tcf_sub: ['Mocks in the real format, practice by part, and an estimate of your NCLC level in each skill.', 'Examens blancs au vrai format, entraînement par épreuve et estimation de votre niveau NCLC dans chaque compétence.'],
    tcf_target: ['Target: NCLC {n} in all four skills', 'Objectif : NCLC {n} dans les quatre compétences'],
    tcf_days: ['{n} days to your test', 'Plus que {n} jours avant le test'],
    tcf_nodate: ['Test date not set', 'Date du test non fixée'],
    tcf_L: ['Listening', 'Compréhension orale'], tcf_R: ['Reading', 'Compréhension écrite'], tcf_W: ['Writing', 'Expression écrite'], tcf_S: ['Speaking', 'Expression orale'],
    tcf_no_est: ['no estimate yet', 'pas encore d’estimation'],
    tcf_full: ['Full mock', 'Examen blanc complet'],
    tcf_practice: ['Practice · 10 questions', 'Entraînement · 10 questions'],
    tcf_start_part: ['Start', 'Commencer'], tcf_resume: ['Resume', 'Reprendre'], tcf_done_part: ['Done · redo', 'Fait · refaire'],
    tcf_part_info_L: ['39 questions · 35 min', '39 questions · 35 min'], tcf_part_info_R: ['39 questions · 60 min', '39 questions · 60 min'],
    tcf_part_info_W: ['3 tasks · 60 min', '3 tâches · 60 min'], tcf_part_info_S: ['3 tasks · about 12 min', '3 tâches · environ 12 min'],
    tcf_next: ['Today’s best exam task', 'La tâche d’examen la plus utile aujourd’hui'],
    tcf_weak: ['{s}: {why}. Try {what}.', '{s} : {why}. Essayez {what}.'],
    tcf_est: ['Estimate', 'Estimation'], tcf_est_note: ['An estimate from this mock, not an official result.', 'Une estimation tirée de cet examen blanc, pas un résultat officiel.'],
    tcf_by_level: ['By level', 'Par niveau'],
    tcf_score: ['Score', 'Score'],
    tcf_mark_ai: ['Mark with AI', 'Faire corriger par l’IA'], tcf_marking: ['Marking…', 'Correction…'], tcf_ai_off: ['AI marking is available when the AI is on and you’re online. Use the checklist meanwhile.', 'La correction par l’IA est possible quand l’IA est activée et que vous êtes en ligne. Utilisez la liste en attendant.'],
    tcf_ai_nokey: ['The free AI needs a key now. Add a free Google Gemini key in AI settings, then press Mark with AI again.', 'L’IA gratuite demande maintenant une clé. Ajoutez une clé Google Gemini gratuite dans les réglages IA, puis relancez la correction.'],
    tcf_ai_fail: ['The AI couldn’t mark this right now. Try again in a moment.', 'L’IA n’a pas pu corriger pour l’instant. Réessayez dans un moment.'],
    tcf_ai_est: ['AI estimate', 'Estimation IA'],
    tcf_selfcheck: ['Tick what you did', 'Cochez ce que vous avez fait'],
    tcf_model: ['Model answer', 'Exemple de réponse'],
    tcf_record: ['Speak', 'Parler'], tcf_stop: ['Stop', 'Arrêter'], tcf_no_mic: ['Speech-to-text isn’t available in this browser. Type what you would say instead.', 'La dictée vocale n’est pas disponible dans ce navigateur. Écrivez ce que vous diriez.'],
    tcf_transcript: ['What you said (fix any words the browser misheard)', 'Ce que vous avez dit (corrigez les mots mal compris)'],
    tcf_task_time: ['Time for this task', 'Temps pour cette tâche'],
    tcf_finish_part: ['Finish this part', 'Terminer cette épreuve'],
    tcf_corrections: ['Corrections', 'Corrections'],
    tcf_other: ['Other exams', 'Autres examens'],
    tcf_plays_left: ['plays left', 'écoutes restantes'],
    tcf_canada_soon: ['For Canada, TCF Canada and TEF Canada each have their own section with full mocks (above). The exams below are the general versions.', 'Pour le Canada, le TCF Canada et le TEF Canada ont chacun leur section avec des examens blancs complets (ci-dessus). Les examens ci-dessous sont les versions générales.'],
    tcf_check_bands: ['NCLC bands follow IRCC’s TCF Canada table. Check the current table on canada.ca before you rely on them.', 'Les seuils NCLC suivent le tableau TCF Canada d’IRCC. Vérifiez le tableau à jour sur canada.ca.']
  });

  // ---------- data ----------
  // Stable shuffle per question, so options don't always put the answer in the same place.
  const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const seeded = (arr, seed) => { const a = arr.slice(); let x = seed || 1; for (let i = a.length - 1; i > 0; i--) { x = (Math.imul(x, 1103515245) + 12345) >>> 0; const j = x % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const parse = raw => String(raw).split('\n').map(l => l.trim()).filter(l => /^[LR]\|/.test(l)).map(l => {
    const [part, lv, text, q, opts, c, why] = l.split('|'), o = opts.split('~'), right = o[+c], sh = seeded(o, hash(q + text));
    return { part, l: lv, a: part === 'L' ? text : '', p: part === 'R' ? text : '', q, o: sh, c: sh.indexOf(right), why: why || '' };
  });
  // The two Canadian exams share this engine. Estimates are made on the CEFR-based TCF scale, then
  // shown as NCLC; for TEF Canada the matching TEF points band is shown too.
  const EX = {
    tcfca: { id: 'tcfca', name: 'TCF Canada', data: T, min: { L: 35, R: 60, W: 60, S: 12 }, est: 'tcfEst',
      info: { L: ['39 questions · 35 min', '39 questions · 35 min'], R: ['39 questions · 60 min', '39 questions · 60 min'], W: ['3 tasks · 60 min', '3 tâches · 60 min'], S: ['3 tasks · about 12 min', '3 tâches · environ 12 min'] } },
    tefca: { id: 'tefca', name: 'TEF Canada', data: FR.TEFCA || { mocks: [] }, min: { L: 40, R: 60, W: 60, S: 15 }, est: 'tefEst',
      info: { L: ['40 questions · 40 min', '40 questions · 40 min'], R: ['40 questions · 60 min', '40 questions · 60 min'], W: ['2 sections · 60 min', '2 sections · 60 min'], S: ['2 role-plays · 15 min', '2 mises en situation · 15 min'] },
      // IRCC TEF Canada → NCLC (lowest points for each level). To be checked against canada.ca before release.
      pts: { L: [[316, 10], [298, 9], [280, 8], [249, 7], [217, 6], [181, 5], [145, 4]], R: [[263, 10], [248, 9], [233, 8], [207, 7], [181, 6], [151, 5], [121, 4]],
        W: [[393, 10], [371, 9], [349, 8], [310, 7], [271, 6], [226, 5], [181, 4]], S: [[393, 10], [371, 9], [349, 8], [310, 7], [271, 6], [226, 5], [181, 4]] },
      max: { L: 360, R: 300, W: 450, S: 450 } }
  };
  Object.values(EX).forEach(x => x.data.mocks.forEach(m => { m.L = parse(m.raw).filter(y => y.part === 'L'); m.R = parse(m.raw).filter(y => y.part === 'R'); m.W = m.tasks.filter(y => y.part === 'write'); m.S = m.tasks.filter(y => y.part === 'speak'); }));
  let cx = 'tcfca'; const X = () => EX[cx];
  const POOL = parse(T.pool);
  const mockBy = id => EX.tcfca.data.mocks.concat(EX.tefca.data.mocks).find(m => m.id === id);
  // The TEF points band for an NCLC level, e.g. "249–279".
  const tefBand = (sk, n) => { const t = EX.tefca.pts[sk], i = t.findIndex(x => x[1] === n); if (i < 0) return ''; return t[i][0] + '–' + (i ? t[i - 1][0] - 1 : EX.tefca.max[sk]); };
  const tefNote = (sk, n) => cx === 'tefca' && n >= 4 ? ' · ≈ ' + tefBand(sk, n) + ' / ' + EX.tefca.max[sk] + ' TEF' : '';

  // ---------- scoring ----------
  const W8 = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  // IRCC TCF Canada → NCLC (lowest score for each level). To be checked against canada.ca before release.
  const NCLC = {
    L: [[549, 10], [523, 9], [503, 8], [458, 7], [398, 6], [369, 5], [331, 4]],
    R: [[549, 10], [524, 9], [499, 8], [453, 7], [406, 6], [375, 5], [342, 4]],
    W: [[16, 10], [14, 9], [12, 8], [10, 7], [7, 6], [6, 5], [4, 4]],
    S: [[16, 10], [14, 9], [12, 8], [10, 7], [7, 6], [6, 5], [4, 4]]
  };
  const toNclc = (sk, v) => { for (const [min, n] of NCLC[sk]) if (v >= min) return n; return v > 0 ? 3 : 0; };
  // Multiple choice, on the TCF's 100–699 scale where each CEFR level spans 100 points
  // (A1 100–199 … B2 400–499, C1 500–599): 100 plus up to 100 points per level, from your accuracy at that level.
  // So all right up to B2 and none above lands near 500. Shown as a range.
  function scoreMcq(items, ans) {
    const by = {};
    items.forEach((it, i) => { const ok = ans[i] === it.c, b = by[it.l] || (by[it.l] = { r: 0, n: 0 }); b.n++; if (ok) b.r++; });
    const sc = Math.min(699, Math.round(100 + Object.keys(W8).reduce((a, l) => a + (by[l] ? 100 * by[l].r / by[l].n : 0), 0)));
    return { sc, lo: Math.max(100, sc - 25), hi: Math.min(699, sc + 25), by, r: items.filter((it, i) => ans[i] === it.c).length, n: items.length };
  }

  // ---------- goal ----------
  const goal = () => (S().settings.goal || '');
  // Which exam the screens show: the one in progress, else the goal, else the one picked on the hub.
  const sync = () => { const r = S().tcfRun, g = goal(), pk = S().examPick; if (r && r.x) cx = r.x; else if (pk && EX[pk]) cx = pk; else if (EX[g]) cx = g; };
  FR.tcf = {
    on: () => !!EX[goal()],
    target: () => +(S().settings.nclc || 7),
    daysLeft: () => { const d = S().settings.testDate; if (!d) return null; return Math.ceil((new Date(d + 'T12:00') - Date.now()) / FR.DAY); },
    est: () => S()[X().est] || (S()[X().est] = {}),
    // The skill furthest behind: no estimate first, then the lowest.
    weakest: () => {
      const e = FR.tcf.est(), order = ['S', 'W', 'L', 'R'];
      const none = order.find(k => !e[k]); if (none) return { sk: none, why: 'none' };
      const k = order.slice().sort((a, b) => e[a].nclc - e[b].nclc)[0]; return { sk: k, why: 'low', nclc: e[k].nclc };
    }
  };
  const pl = x => x[FR.fr() ? 1 : 0];
  const what = sk => cx === 'tefca' && (sk === 'S' || sk === 'W') ? pl(sk === 'S' ? ['Speaking Section A (5 min)', 'la section A d’expression orale (5 min)'] : ['Writing Section A (about 20 min)', 'la section A d’expression écrite (environ 20 min)']) : pl(sk === 'S' ? ['Speaking Task 2 (about 5 min)', 'la tâche 2 d’expression orale (environ 5 min)'] : sk === 'W' ? ['Writing Task 1 (about 15 min)', 'la tâche 1 d’expression écrite (environ 15 min)'] : ['a 10-question practice set', 'un entraînement de 10 questions']);
  const weakLine = () => {
    const w = FR.tcf.weakest(), e = FR.tcf.est()[w.sk];
    return tt('tcf_weak', { s: FR.t('tcf_' + w.sk), why: w.why === 'none' ? FR.t('tcf_no_est') : 'NCLC ' + e.nclc + ' / ' + FR.tcf.target(), what: what(w.sk) });
  };
  const weakAct = () => { const w = FR.tcf.weakest().sk, m1 = (X().data.mocks[0] || {}).id; return (w === 'S' || w === 'W') && m1 ? 'data-act="tcfstart" data-m="' + m1 + '" data-p="' + w + '"' : 'data-act="tcfprac" data-p="' + w + '"'; };

  // Exam card for the home screen.
  FR.tcfCard = () => {
    if (!FR.tcf.on()) return ''; sync();
    const e = FR.tcf.est(), dl = FR.tcf.daysLeft(), tg = FR.tcf.target();
    return '<section class="card tcf-card"><div class="ch-h"><div><small class="eyebrow">🇨🇦 ' + X().name + '</small><h3>' + tt('tcf_target', { n: tg }) + '</h3></div><span class="badge">' + (dl != null && dl >= 0 ? tt('tcf_days', { n: dl }) : tt('tcf_nodate')) + '</span></div>' +
      '<div class="skills4">' + ['L', 'R', 'W', 'S'].map(k => { const x = e[k], p = x ? Math.min(100, Math.round(x.nclc / 10 * 100)) : 0, ok = x && x.nclc >= tg;
        return '<div class="sk4' + (ok ? ' ok' : '') + '"><small>' + tt('tcf_' + k) + '</small><b>' + (x ? 'NCLC ' + x.nclc : '–') + '</b><div class="bar thin"><i style="width:' + p + '%"></i><span class="tgt" style="left:' + tg * 10 + '%"></span></div></div>'; }).join('') + '</div>' +
      '<p class="mute small">' + weakLine() + '</p><div class="row"><button class="btn primary" ' + weakAct() + '>' + tt('tcf_next') + '</button><button class="btn" data-act="go" data-to="tcf">' + X().name + ' →</button></div></section>';
  };

  // ---------- hub ----------
  const run = () => S().tcfRun;
  const resKey = (m, p) => m + ':' + p;
  V.tcf = p => {
    sync(); if (p === 'result' && S().tcfLast && S().tcfLast.x) cx = S().tcfLast.x;
    if (p === 'run' && run()) return runView();
    if (p === 'result' && S().tcfLast) return resultView();
    sync();
    const s = S(), e = FR.tcf.est(), R = s.tcfRes || {}, dl = FR.tcf.daysLeft();
    let h = '<div class="chips">' + Object.values(EX).map(x => '<button class="chip' + (x.id === cx ? ' on' : '') + '" data-act="tcfx" data-x="' + x.id + '">🇨🇦 ' + x.name + '</button>').join('') + '</div>' +
      '<h1>🇨🇦 ' + X().name + '</h1><p class="mute">' + tt('tcf_sub') + '</p>' +
      '<section class="card"><h3>' + tt('tcf_target', { n: FR.tcf.target() }) + '</h3><p class="mute small">' + (dl != null && dl >= 0 ? tt('tcf_days', { n: dl }) : tt('tcf_nodate')) + ' · <button class="link" data-act="goalsheet">' + bi(['Change goal or date', 'Changer l’objectif ou la date']) + '</button></p>' +
      '<div class="skills4">' + ['L', 'R', 'W', 'S'].map(k => '<div class="sk4"><small>' + tt('tcf_' + k) + '</small><b>' + (e[k] ? 'NCLC ' + e[k].nclc : '–') + '</b><small class="mute">' + (e[k] ? esc(e[k].src || '') : tt('tcf_no_est')) + '</small></div>').join('') + '</div>' +
      '<p class="mute small">' + weakLine() + '</p><button class="btn primary" ' + weakAct() + '>' + tt('tcf_next') + '</button></section>';
    h += '<section class="card"><h3>' + tt('tcf_practice') + '</h3>' + (cx === 'tefca' ? '<p class="mute small">' + bi(['Practice questions are shared by both exams: the skills are the same.', 'Les questions d’entraînement sont communes aux deux examens : les compétences sont les mêmes.']) + '</p>' : '') + '<div class="row">' + ['L', 'R'].map(k => '<button class="btn" data-act="tcfprac" data-p="' + k + '">' + (k === 'L' ? '🎧 ' : '📄 ') + tt('tcf_' + k) + '</button>').join('') + '</div></section>';
    X().data.mocks.forEach(m => {
      h += '<section class="card"><h3>' + bi(m.t) + ' · ' + tt('tcf_full') + '</h3>' + ['L', 'R', 'W', 'S'].map(k => {
        const r = run(), mine = r && r.m === m.id && r.p === k, done = R[resKey(m.id, k)];
        return '<div class="tcf-part"><div><b>' + ({ L: '🎧 ', R: '📄 ', W: '✍️ ', S: '🎙 ' }[k]) + tt('tcf_' + k) + '</b><small class="mute">' + bi(X().info[k]) + (done ? ' · ' + (done.nclc ? 'NCLC ' + done.nclc : done.r + '/' + done.n) : '') + '</small></div>' +
          '<button class="btn small' + (mine ? ' primary' : '') + '" data-act="tcfstart" data-m="' + m.id + '" data-p="' + k + '">' + tt(mine ? 'tcf_resume' : done ? 'tcf_done_part' : 'tcf_start_part') + '</button></div>';
      }).join('') + '</section>';
    });
    return h + '<p class="hint">' + tt('tcf_check_bands') + '</p><p class="center"><button class="link" data-act="go" data-to="exam">' + tt('tcf_other') + ' →</button></p>';
  };

  // ---------- running a part ----------
  const items = r => r.prac ? r.items : (mockBy(r.m) || {})[r.p] || [];
  const clock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const words = s => (String(s || '').trim().match(/\S+/g) || []).length;
  A.tcfstart = d => {
    const s = S(), r = s.tcfRun;
    if (r && r.m === d.m && r.p === d.p && !r.prac) { FR.go('tcf/run'); return; }
    const begin = () => { s.tcfRun = { x: cx, m: d.m, p: d.p, i: 0, ans: {}, txt: {}, plays: {}, left: X().min[d.p] * 60000, tleft: {} }; FR.save(); FR.closeSheet(); FR.go('tcf/run'); };
    if (r) { FR.sheet('<h3>' + bi(['Start a new part?', 'Commencer une nouvelle épreuve ?']) + '</h3><p>' + bi(['You have another part in progress. Starting this one will discard it.', 'Une autre épreuve est en cours. Commencer celle-ci l’effacera.']) + '</p><div class="col"><button class="btn primary" data-act="tcfgo">' + bi(['Go back to it', 'Y retourner']) + '</button><button class="btn danger" data-act="tcfnew" data-m="' + d.m + '" data-p="' + d.p + '">' + bi(['Discard and start', 'Effacer et commencer']) + '</button></div>'); return; }
    begin();
  };
  A.tcfgo = () => { FR.closeSheet(); FR.go('tcf/run'); };
  A.tcfx = d => { cx = d.x; S().examPick = d.x; FR.save(); FR.refresh(true); };
  A.tcfnew = d => { S().tcfRun = null; A.tcfstart(d); };
  A.tcfprac = d => {
    const pool = POOL.filter(x => x.part === d.p), seen = S().tcfSeen || (S().tcfSeen = {});
    const pick = FR.shuffle(pool).sort((a, b) => (seen[a.q] || 0) - (seen[b.q] || 0)).slice(0, 10).sort((a, b) => (W8[a.l] || 0) - (W8[b.l] || 0));
    pick.forEach(x => { seen[x.q] = (seen[x.q] || 0) + 1; });
    S().tcfRun = { x: cx, m: 'pool', p: d.p, prac: 1, items: pick, i: 0, ans: {}, txt: {}, plays: {}, left: 0, tleft: {} }; FR.save(); FR.go('tcf/run');
  };

  function runView() {
    const r = run(), list = items(r), n = list.length, it = list[r.i], last = r.i === n - 1, open = r.p === 'W' || r.p === 'S';
    let h = '<div class="sess-h"><button class="x" data-act="tcfquit" aria-label="quit">✕</button><div class="bar"><i style="width:' + Math.round((r.i + 1) / n * 100) + '%"></i></div>' +
      (r.prac ? '<small>' + (r.i + 1) + '/' + n + '</small>' : '<small id="tclock2" class="clock">' + clock(r.left) + '</small>') + '</div>' +
      '<small class="eyebrow">' + X().name + ' · ' + tt('tcf_' + r.p) + (open ? '' : ' · ' + it.l) + ' · ' + (r.i + 1) + '/' + n + '</small><div class="qcard">';
    if (!open) {
      if (it.a) {
        const left = 2 - (r.plays[r.i] || 0);
        h += FR.canSpeak() ? '<button class="btn" data-act="tcfplay"' + (left ? '' : ' aria-disabled="true"') + '>▶ ' + tt('x_listen') + ' <small>(' + left + ' ' + tt('tcf_plays_left') + ')</small></button>' : '<blockquote lang="fr">' + esc(it.a) + '</blockquote>';
      }
      if (it.p) h += '<blockquote lang="fr">' + esc(it.p) + '</blockquote>';
      h += '<p lang="fr" class="xq">' + esc(it.q) + '</p><div class="opts">' + it.o.map((o, i) => '<button class="opt' + (r.ans[r.i] === i ? ' sel' : '') + '" data-act="tcfpick" data-i="' + i + '"><span lang="fr">' + esc(o) + '</span></button>').join('') + '</div>';
    } else {
      h += '<h3>' + bi(it.t) + '</h3><p lang="fr" class="xq pre">' + esc(it.q) + '</p>';
      if (r.p === 'W') h += '<textarea id="ttxt" class="search" rows="10" lang="fr" spellcheck="false">' + esc(r.txt[r.i] || '') + '</textarea><small class="mute" id="twc">' + words(r.txt[r.i]) + ' ' + tt('x_words') + ' · ' + it.min + '–' + it.max + '</small>';
      else {
        const tl = r.tleft[r.i] != null ? r.tleft[r.i] : it.sec * 1000;
        h += '<p class="mute small">' + tt('tcf_task_time') + ': <b id="ttask">' + clock(tl) + '</b></p>' +
          (SR ? '<button class="btn primary" id="micbtn" data-act="tcfmic">🎙 ' + tt('tcf_record') + '</button>' : '<p class="note">' + tt('tcf_no_mic') + '</p>') +
          '<label class="mute small" for="ttxt">' + tt('tcf_transcript') + '</label><textarea id="ttxt" class="search" rows="7" lang="fr">' + esc(r.txt[r.i] || '') + '</textarea>';
      }
    }
    return h + '</div><div class="row spread">' + (r.i ? '<button class="btn" data-act="tcfnav" data-d="-1">← ' + tt('x_prev') + '</button>' : '<span></span>') +
      (last ? '<button class="btn primary" data-act="tcffinish">' + tt('tcf_finish_part') + '</button>' : '<button class="btn primary" data-act="tcfnav" data-d="1">' + tt('x_next') + ' →</button>') + '</div>';
  }
  A.tcfpick = d => { const r = run(); if (!r) return; r.ans[r.i] = +d.i; FR.save(); FR.refresh(); };
  A.tcfnav = d => { const r = run(); if (!r) return; micStop(); r.i = Math.max(0, Math.min(items(r).length - 1, r.i + +d.d)); FR.save(); FR.refresh(true); };
  A.tcfplay = () => { const r = run(), it = items(r)[r.i]; if ((r.plays[r.i] || 0) >= 2) { FR.toast(tt('x_noplays')); return; } r.plays[r.i] = (r.plays[r.i] || 0) + 1; FR.save(); FR.refresh(); FR.speak(it.a); };
  A.tcfquit = () => {
    FR.sheet('<h3>' + tt('x_quit_t') + '</h3><p>' + bi(['Your answers for this part will be deleted and you would need to start it again.', 'Vos réponses pour cette épreuve seront effacées et il faudra la recommencer.']) + '</p><div class="col">' +
      '<button class="btn primary" data-act="closesheet">' + tt('x_keep') + '</button><button class="btn danger" data-act="tcfdiscard">' + tt('x_quit_yes') + '</button><button class="link mute" data-act="tcfleave">' + tt('x_leave') + '</button></div>');
  };
  A.tcfdiscard = () => { micStop(); S().tcfRun = null; FR.save(); FR.closeSheet(); FR.go('tcf'); };
  A.tcfleave = () => { micStop(); FR.closeSheet(); FR.go('tcf'); };

  // ---------- speech-to-text for speaking ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  function micStop() { if (rec) { try { rec.stop(); } catch (e) {} rec = null; } const b = document.getElementById('micbtn'); if (b) b.innerHTML = '🎙 ' + tt('tcf_record'); }
  A.tcfmic = () => {
    if (!SR) return; if (rec) { micStop(); return; }
    const ta = document.getElementById('ttxt'), r = run(), base = (ta.value ? ta.value.trim() + ' ' : '');
    rec = new SR(); rec.lang = 'fr-FR'; rec.continuous = true; rec.interimResults = true;
    let fin = '';
    rec.onresult = ev => { let inter = ''; for (let i = ev.resultIndex; i < ev.results.length; i++) { const t = ev.results[i][0].transcript; if (ev.results[i].isFinal) fin += t + ' '; else inter += t; } ta.value = base + fin + inter; r.txt[r.i] = ta.value; FR.save(); };
    rec.onerror = () => micStop(); rec.onend = () => { if (rec) micStop(); };
    try { rec.start(); document.getElementById('micbtn').innerHTML = '⏹ ' + tt('tcf_stop'); } catch (e) { micStop(); }
  };

  // ---------- finishing a part ----------
  A.tcffinish = (d, el) => {
    if (el && !el.dataset.sure) { el.dataset.sure = 1; el.innerHTML = tt('tap_again'); return; }
    const s = S(), r = run(); if (!r) return; micStop(); clearInterval(timer);
    cx = r.x || cx;
    const list = items(r), res = { x: cx, m: r.m, p: r.p, prac: r.prac, t: Date.now(), ans: r.ans, txt: r.txt, items: r.prac ? list : null };
    if (r.p === 'L' || r.p === 'R') {
      Object.assign(res, scoreMcq(list, r.ans));
      if (!r.prac && Object.keys(r.ans).length === list.length) { res.nclc = toNclc(r.p, res.sc); FR.tcf.est()[r.p] = { nclc: res.nclc, sc: res.sc, src: bi(mockBy(r.m).t).replace(/<[^>]+>/g, ''), t: res.t }; }
      feedMisses(list, r.ans);
    }
    s.tcfLast = res; if (!r.prac) { const R = s.tcfRes || (s.tcfRes = {}); R[resKey(r.m, r.p)] = { t: res.t, r: res.r, n: res.n, nclc: res.nclc }; }
    s.tcfRun = null; FR.save(); FR.go('tcf/result');
    if (res.n) { E.reward(10 + res.r * 2, { k: 'exam', ti: [X().name + ' · ' + FR.S['tcf_' + r.p][0], X().name + ' · ' + FR.S['tcf_' + r.p][1]], r: res.r, n: res.n }); setTimeout(() => FR.cheer(res.r / res.n, 0, [X().name, X().name]), 350); }
    else E.reward(25, { k: 'exam', ti: [X().name + ' · ' + FR.S['tcf_' + r.p][0], X().name + ' · ' + FR.S['tcf_' + r.p][1]], r: 0, n: 0 });
  };
  // Missed questions add their key words to the review list (up to 6 per part).
  function feedMisses(list, ans) {
    const it = S().items, now = Date.now(); let added = 0;
    list.forEach((x, i) => {
      if (ans[i] === x.c || added >= 6) return;
      const toks = (x.o[x.c] + ' ' + x.q).match(/[A-Za-zÀ-ÿœŒ'’-]{4,}/g) || [];
      for (const t of toks) {
        const r = FR.lemma(t.toLowerCase()), w = r && FR.wordBy[r.fr];
        if (w && !E.locked(w) && !(it['w:' + w.fr] && it['w:' + w.fr].b >= 3)) { const o = it['w:' + w.fr] || (it['w:' + w.fr] = { b: 0, r: 0, w: 0, d: 0 }); o.d = now; added++; break; }
      }
    });
  }

  // ---------- results ----------
  function resultView() {
    const R = S().tcfLast, list = R.prac ? R.items : mockBy(R.m)[R.p];
    let h = '<button class="back" data-act="go" data-to="tcf">← ' + X().name + '</button><small class="eyebrow">' + X().name + ' · ' + tt('tcf_' + R.p) + (R.prac ? ' · ' + tt('tcf_practice') : ' · ' + bi(mockBy(R.m).t)) + '</small>';
    if (R.p === 'L' || R.p === 'R') {
      const p = Math.round(R.r / R.n * 100);
      h += '<div class="center result"><div class="ring" style="--p:' + p + '"><b>' + R.r + '/' + R.n + '</b></div>' +
        (R.nclc != null ? '<p><span class="badge big">' + tt('tcf_est') + ': NCLC ' + R.nclc + '</span></p><p class="mute small">' + R.lo + '–' + R.hi + ' / 699 TCF' + tefNote(R.p, R.nclc) + ' · ' + tt('tcf_est_note') + '</p>' : '') + '</div>' +
        '<section class="card"><h3>' + tt('tcf_by_level') + '</h3>' + Object.keys(W8).filter(l => R.by[l]).map(l => '<div class="pt"><b>' + l + '</b><span>' + R.by[l].r + '/' + R.by[l].n + '</span></div><div class="bar thin"><i style="width:' + Math.round(R.by[l].r / R.by[l].n * 100) + '%"></i></div>').join('') + '</section>' +
        list.map((it, i) => { const a = R.ans[i], ok = a === it.c;
          return '<section class="card xr ' + (ok ? 'ok' : 'bad') + '"><small class="eyebrow">' + (ok ? '✓' : '✗') + ' ' + it.l + '</small>' + (it.a ? '<blockquote lang="fr">' + esc(it.a) + ' <button class="mini" data-act="say" data-text="' + esc(it.a) + '">🔊</button></blockquote>' : '') + (it.p ? '<blockquote lang="fr">' + esc(it.p) + '</blockquote>' : '') +
            '<p lang="fr" class="xq">' + esc(it.q) + '</p>' + (ok ? '' : '<p class="mute">' + tt('x_your') + ' <span lang="fr">' + (a == null ? '—' : esc(it.o[a])) + '</span></p>') + '<p>' + tt('x_correct') + ' <b lang="fr">' + esc(it.o[it.c]) + '</b></p>' + (it.why ? '<p class="whyl small">👉 ' + esc(it.why) + '</p>' : '') + '</section>'; }).join('');
    } else {
      const marks = R.marks || {};
      h += list.map((it, i) => {
        const txt = R.txt[i] || '', m = marks[i];
        return '<section class="card"><h3>' + bi(it.t) + '</h3><p lang="fr" class="xq pre small">' + esc(it.q) + '</p>' + (txt ? '<blockquote lang="fr" class="pre">' + esc(txt) + '</blockquote><p class="mute small">' + words(txt) + ' ' + tt('x_words') + (it.min ? ' · ' + it.min + '–' + it.max : '') + '</p>' : '') +
          (m ? markHtml(m) : txt ? (FR.aiOn() ? '<button class="btn primary" data-act="tcfmark" data-i="' + i + '">✨ ' + tt('tcf_mark_ai') + '</button>' : '<p class="mute small">' + tt('tcf_ai_off') + '</p>') : '') +
          '<h4>' + tt('tcf_selfcheck') + '</h4><ul class="checks">' + it.checks.map((c, j) => '<li><label><input type="checkbox" data-chg="tcfcheck" data-i="' + i + '" data-j="' + j + '"' + ((R.ticks || {})[i + ':' + j] ? ' checked' : '') + '> ' + esc(c) + '</label></li>').join('') + '</ul>' +
          '<details><summary>' + tt('tcf_model') + '</summary><p lang="fr" class="pre">' + esc(it.model) + '</p><button class="mini" data-act="say" data-text="' + esc(it.model) + '">🔊</button></details></section>';
      }).join('');
      const sc = partScore(R);
      if (sc != null) h = h.replace('</small>', '</small><div class="center result"><span class="badge big">' + tt('tcf_ai_est') + ': ' + sc + '/20 · NCLC ' + toNclc(R.p, sc) + tefNote(R.p, toNclc(R.p, sc)) + '</span><p class="mute small">' + tt('tcf_est_note') + '</p></div>');
    }
    return h;
  }
  const markHtml = m => '<div class="aimark"><p><b>' + tt('tcf_score') + ': ' + m.score + '/20</b> · NCLC ' + toNclc(S().tcfLast.p, m.score) + tefNote(S().tcfLast.p, toNclc(S().tcfLast.p, m.score)) + '</p>' +
    (m.corrections && m.corrections.length ? '<h4>' + tt('tcf_corrections') + '</h4><ul class="tips">' + m.corrections.map(c => '<li><s lang="fr">' + esc(c.wrong || '') + '</s> → <b lang="fr">' + esc(c.right || '') + '</b>' + (c.why ? '<br><small class="mute">' + esc(c.why) + '</small>' : '') + '</li>').join('') + '</ul>' : '') +
    (m.advice ? '<p class="whyl small">👉 ' + esc(m.advice) + '</p>' : '') + '</div>';
  // Part score: the average of the marked tasks; also updates the skill estimate.
  function partScore(R) {
    const ms = Object.values(R.marks || {}).map(m => +m.score).filter(x => !isNaN(x)); if (!ms.length) return null;
    return Math.round(ms.reduce((a, b) => a + b, 0) / ms.length);
  }
  FR.chg.tcfcheck = el => { const R = S().tcfLast; if (!R) return; R.ticks = R.ticks || {}; R.ticks[el.dataset.i + ':' + el.dataset.j] = el.checked; FR.save(); };
  A.tcfmark = (d, el) => {
    const R = S().tcfLast, it = (R.prac ? R.items : mockBy(R.m)[R.p])[+d.i], txt = R.txt[+d.i]; if (!txt || !window.FreeLLM) return;
    el.setAttribute('aria-disabled', 'true'); el.innerHTML = '⏳ ' + tt('tcf_marking');
    const kind = R.p === 'W' ? 'written answer' : 'spoken answer (a speech-to-text transcript, so ignore punctuation and small transcription slips)';
    const sys = 'You are an experienced ' + X().name + ' examiner. Mark strictly but fairly, using the official criteria: task completion, coherence and organisation, range of vocabulary, grammatical accuracy' + (R.p === 'S' ? ', fluency' : '') + '. Give a whole-number score out of 20 (10-11 is about NCLC 7 / B2-, 14+ is C1). Write corrections and advice in English.';
    const prompt = 'Task (' + (R.p === 'W' ? 'Writing' : 'Speaking') + ' ' + it.n + '): ' + it.q + (it.min ? '\nExpected length: ' + it.min + '-' + it.max + ' words.' : '') + '\n\nCandidate\'s ' + kind + ':\n"""' + txt + '"""\n\n' +
      'Return JSON: {"score": <0-20>, "corrections": [{"wrong": "exact phrase from the answer", "right": "corrected French", "why": "short reason"}] (3 to 5 items, most important first), "advice": "one sentence on what would raise the score most"}';
    FreeLLM.json(prompt, sys).then(m => {
      m.score = Math.max(0, Math.min(20, Math.round(+m.score || 0)));
      R.marks = R.marks || {}; R.marks[+d.i] = m;
      const sc = partScore(R); if (sc != null && !R.prac) FR.tcf.est()[R.p] = { nclc: toNclc(R.p, sc), sc, src: bi(mockBy(R.m).t).replace(/<[^>]+>/g, '') + ' · AI', t: Date.now() };
      FR.save(); FR.refresh();
    }).catch(e => {
      el.removeAttribute('aria-disabled'); el.innerHTML = '✨ ' + tt('tcf_mark_ai');
      // No working AI and no key saved: open AI settings so a free key can be added.
      if (/^NOKEY/.test(String(e && e.message || e))) { FR.toast(tt('tcf_ai_nokey'), 6000); FreeLLM.setup(); }
      else FR.toast(tt('tcf_ai_fail'));
    });
  };

  // ---------- timers and inputs while a part runs ----------
  let timer = 0;
  AF.tcf = p => {
    clearInterval(timer);
    if (p !== 'run' || !run()) { micStop(); return; }
    const r = run(), list = items(r), it = list[r.i], ta = document.getElementById('ttxt');
    if (ta) ta.addEventListener('input', () => { r.txt[r.i] = ta.value; const wc = document.getElementById('twc'); if (wc) wc.textContent = words(ta.value) + ' ' + FR.t('x_words') + ' · ' + it.min + '–' + it.max; FR.save(); });
    if (r.prac) return;
    timer = setInterval(() => {
      const r2 = run(); if (!r2 || location.hash.indexOf('tcf/run') < 0) { clearInterval(timer); return; }
      if (document.hidden) return;
      r2.left -= 1000; const c = document.getElementById('tclock2'); if (c) { c.textContent = clock(r2.left); c.classList.toggle('low', r2.left < 120000); }
      if (r2.p === 'S') { const tl = (r2.tleft[r2.i] != null ? r2.tleft[r2.i] : it.sec * 1000) - 1000; r2.tleft[r2.i] = Math.max(0, tl); const t2 = document.getElementById('ttask'); if (t2) { t2.textContent = clock(tl); t2.classList.toggle('low', tl < 30000); } if (tl === 0) { micStop(); FR.toast(bi(['Time for this task is up.', 'Le temps de cette tâche est écoulé.']).replace(/<[^>]+>/g, '')); } }
      if (r2.left % 5000 < 1000) FR.save();
      if (r2.left <= 0) { FR.toast(tt('x_time_up')); A.tcffinish(); }
    }, 1000);
  };
})();
