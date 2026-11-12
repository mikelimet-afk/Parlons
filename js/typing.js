// Typing test: type French words, phrases or passages against the clock (30 s to 2 min). Content is drawn at random every time.
(function () {
  const FR = window.FR, E = FR.engine, { esc, bi, tt } = FR, S = () => FR.state;
  const V = FR.views, A = FR.act, AF = FR.after;
  const T = { mode: 'words', dur: 60, phase: 'setup' };
  let timer = 0;
  function makeText(mode) {
    if (mode === 'words') {
      const pool = FR.words.filter(w => !E.locked(w) && !/[ '’?!.,]/.test(w.fr) && w.fr.length > 1);
      return FR.sample(pool, 120).map(w => w.fr.toLowerCase()).join(' ');
    }
    if (mode === 'phrases') {
      const ex = FR.words.filter(w => w.ex && !E.locked(w) && w.ex.length < 70 && !w.ex.includes('—')).map(w => w.ex);
      const ph = FR.PAIRS.map(p => p[1]).concat(FR.PAIRS.map(p => p[2].split(' / ')[0]));
      return FR.sample(ex.concat(ph), 30).join(' ');
    }
    // passages: a random stretch of consecutive sentences from a reading passage or a story page
    const texts = FR.PASSAGES.map(p => p.s).concat(FR.STORIES.flatMap(st => st.pages.map(pg => pg.s)));
    const t = texts[Math.floor(Math.random() * texts.length)], start = Math.floor(Math.random() * Math.max(1, t.length - 4));
    return t.slice(start).concat(texts[Math.floor(Math.random() * texts.length)]).map(x => x[0].replace(/^— /, '')).join(' ');
  }
  function start() {
    T.words = makeText(T.mode).split(/\s+/).filter(Boolean);
    Object.assign(T, { phase: 'run', i: 0, done: [], left: T.dur * 1000, started: 0, chars: 0 });
    FR.refresh(true);
  }
  const wordHtml = () => T.words.slice(Math.max(0, T.i - 12), T.i + 40).map((w, j0) => {
    const j = j0 + Math.max(0, T.i - 12), d = T.done[j];
    return '<span class="tw' + (j === T.i ? ' cur' : d ? ' ' + d.s : '') + '" lang="fr">' + esc(w) + '</span>';
  }).join(' ');
  function results() {
    const d = T.done, ok = d.filter(x => x.s === 'ok'), acc = d.filter(x => x.s === 'acc'), bad = d.filter(x => x.s === 'bad');
    const mins = T.dur / 60, chars = ok.concat(acc).reduce((a, x) => a + x.w.length + 1, 0);
    return { ok: ok.length, acc: acc.length, bad: bad.length, n: d.length, wpm: Math.round(chars / 5 / mins), p: d.length ? (ok.length + acc.length * 0.5) / d.length : 0, list: acc.concat(bad).slice(0, 14) };
  }
  V.typing = () => {
    if (T.phase === 'run') {
      return '<div class="sess-h"><button class="x" data-act="typequit">✕</button><div class="bar"><i id="tbar" style="width:' + Math.round((1 - T.left / (T.dur * 1000)) * 100) + '%"></i></div><small id="tclock" class="clock">' + Math.ceil(T.left / 1000) + 's</small></div>' +
        '<small class="eyebrow">' + tt('ty_' + T.mode) + ' · ' + tt('ty_go') + '</small><div class="qcard"><div id="twords" class="twords">' + wordHtml() + '</div>' +
        '<input id="tyin" class="search big-in" lang="fr" autocomplete="off" autocapitalize="off" spellcheck="false" data-kb="1" placeholder="' + esc(FR.t('ty_ph')) + '"><p class="hint">' + tt('ty_hint') + '</p></div>';
    }
    if (T.phase === 'done') {
      const r = T.res;
      return '<div class="center result"><small class="eyebrow">' + tt('typing') + ' · ' + tt('ty_' + T.mode) + ' · ' + T.dur + 's</small><div class="ring" style="--p:' + Math.min(100, Math.round(r.p * 100)) + '"><b>' + r.wpm + '<small> ' + tt('ty_wpm') + '</small></b></div>' +
        '<p>' + tt('ty_line', { ok: r.ok, n: r.n }) + (r.acc ? ' · ' + tt('ty_acc', { n: r.acc }) : '') + '</p></div>' +
        (r.list.length ? '<section class="card"><h3>' + tt('ty_check') + '</h3><div class="wl">' + r.list.map(x => '<div class="wl-r"><b lang="fr">' + esc(x.w) + '</b><span class="' + (x.s === 'acc' ? 'accent-note' : 'miss') + '">' + esc(x.t || '—') + '</span></div>').join('') + '</div></section>' : '') +
        '<div class="col"><button class="btn primary" data-act="typestart">' + tt('again_btn') + '</button><button class="btn" data-act="typesetup">' + tt('ty_change') + '</button></div>';
    }
    const best = (S().typing || {})[T.mode + T.dur];
    return '<h1>' + tt('typing') + '</h1><p class="mute">' + tt('typing_sub') + '</p>' +
      '<section class="card"><h3>' + tt('ty_what') + '</h3><div class="seg wrap">' + ['words', 'phrases', 'passages'].map(m => '<button class="' + (T.mode === m ? 'on' : '') + '" data-act="tymode" data-v="' + m + '">' + tt('ty_' + m) + '</button>').join('') + '</div>' +
      '<h3>' + tt('ty_time') + '</h3><div class="seg wrap">' + [30, 60, 90, 120].map(s => '<button class="' + (T.dur === s ? 'on' : '') + '" data-act="tydur" data-v="' + s + '">' + (s < 60 ? s + ' s' : s % 60 ? '1 min 30' : s / 60 + ' min') + '</button>').join('') + '</div>' +
      (best ? '<p class="mute small">' + tt('ty_best', { n: best }) + '</p>' : '') + '<div class="col"><button class="btn primary" data-act="typestart">' + tt('start') + '</button></div></section>' +
      '<section class="card"><h3>' + tt('ty_how') + '</h3><ul class="tips"><li>' + tt('ty_r1') + '</li><li>' + tt('ty_r2') + '</li><li>' + tt('ty_r3') + '</li></ul></section>';
  };
  function finish() {
    clearInterval(timer); T.phase = 'done'; T.res = results();
    const s = S(), key = T.mode + T.dur; s.typing = s.typing || {};
    if (!s.typing[key] || T.res.wpm > s.typing[key]) s.typing[key] = T.res.wpm;
    const x = s.tags['S:typing'] || (s.tags['S:typing'] = { r: 0, w: 0 }); x.r += T.res.ok; x.w += T.res.bad + T.res.acc;
    FR.kb.hide(); FR.refresh(true);
    E.reward(Math.round(5 + T.res.ok / 2), { k: 'typing', ti: ['Typing test (' + T.res.wpm + ' wpm)', 'Test de frappe (' + T.res.wpm + ' mots/min)'], r: T.res.ok, n: T.res.n });
    FR.cheer(T.res.p, T.res.wpm >= 30, null);
  }
  AF.typing = () => {
    clearInterval(timer);
    const inp = document.getElementById('tyin'); if (!inp) { FR.kb.hide(); return; }
    const commit = () => {
      const t = inp.value.trim(); if (!t) return;
      const w = T.words[T.i], s = t === w ? 'ok' : FR.norm(t) === FR.norm(w) ? 'acc' : 'bad';
      T.done[T.i] = { w, t, s }; T.i++; inp.value = '';
      document.getElementById('twords').innerHTML = wordHtml();
      if (T.i >= T.words.length - 5) T.words = T.words.concat(makeText(T.mode).split(/\s+/));
    };
    inp.addEventListener('input', () => {
      if (!T.started) {
        T.started = Date.now();
        timer = setInterval(() => {
          T.left = T.dur * 1000 - (Date.now() - T.started);
          const c = document.getElementById('tclock'), b = document.getElementById('tbar');
          if (c) { c.textContent = Math.max(0, Math.ceil(T.left / 1000)) + 's'; c.classList.toggle('low', T.left < 10000); }
          if (b) b.style.width = Math.min(100, Math.round((1 - T.left / (T.dur * 1000)) * 100)) + '%';
          if (T.left <= 0 || document.body.dataset.r !== 'typing') { if (document.body.dataset.r === 'typing') finish(); else clearInterval(timer); }
        }, 200);
      }
      if (/\s$/.test(inp.value)) commit();
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commit(); } });
    FR.kb.attach(inp, commit);
    if (!FR.kb.active()) inp.focus();
  };
  A.tymode = d => { T.mode = d.v; FR.refresh(); };
  A.tydur = d => { T.dur = +d.v; FR.refresh(); };
  A.typestart = start;
  A.typesetup = () => { T.phase = 'setup'; FR.refresh(true); };
  A.typequit = () => { clearInterval(timer); T.phase = 'setup'; FR.kb.hide(); FR.refresh(true); };
})();
