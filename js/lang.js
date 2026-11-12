// Dictionary index, word lookup, approximate pronunciation, speech, and the long-press popup.
(function () {
  const FR = window.FR;

  // ---------- dictionary ----------
  FR.words = FR.DICT_RAW.trim().split('\n').map(l => {
    const [fr, en, pos, g, pron, ex, exEn, note, topic] = l.split('|');
    return { fr, en, pos, g, pron, ex, exEn, note, topic };
  });
  FR.wordBy = {};
  FR.words.forEach(w => { FR.wordBy[w.fr] = w; });
  // Themed word packs (js/data/words-*.js). Line: french|english|code|example|translation|pronunciation (optional).
  // code: m / f / mf = noun with that gender, v verb, a adjective, d adverb, p phrase, c conjunction, r preposition, o pronoun, i interjection.
  const CODE = { m: ['noun', 'm'], f: ['noun', 'f'], mf: ['noun', 'mf'], v: ['verb', ''], a: ['adj', ''], d: ['adv', ''], p: ['phrase', ''], c: ['conj', ''], r: ['prep', ''], o: ['pron', ''], i: ['interj', ''], num: ['num', ''] };
  FR.TOPICS = {};
  (FR.DICT_MORE || []).forEach(raw => {
    let topic = '';
    raw.split('\n').forEach(l => {
      l = l.trim(); if (!l) return;
      if (l[0] === '#') { const h = l.slice(1).split('|'); topic = 'x:' + h[0]; FR.TOPICS[topic] = [h[1], h[2]]; return; }
      const [fr, en, code, ex, exEn, pron] = l.split('|');
      if (!fr || !en || FR.wordBy[fr]) return;
      const c = CODE[code] || ['phrase', ''];
      const w = { fr, en, pos: c[0], g: c[1], pron: pron || '', ex: ex || '', exEn: exEn || '', note: '', topic };
      FR.words.push(w); FR.wordBy[fr] = w;
    });
  });
  const gloss = {};
  FR.GLOSS_RAW.split(';').forEach(p => { const i = p.indexOf('='); if (i > 0) gloss[p.slice(0, i)] = p.slice(i + 1); });
  const rev = {}; // english -> french words
  const addRev = (en, fr) => en.split(',').forEach(x => {
    x = x.replace(/\(.*?\)/g, '').trim().toLowerCase().replace(/^to /, '');
    if (x && !(rev[x] || (rev[x] = [])).includes(fr)) rev[x].push(fr);
  });
  FR.words.forEach(w => addRev(w.en, w.fr));
  Object.keys(gloss).forEach(k => { if (k.length > 1) addRev(gloss[k], k); });

  const VOW = 'aeiouyàâäéèêëîïôöùûüœh';
  FR.withArt = (w, indef) => {
    if (indef) return (w.g === 'f' ? 'une ' : w.g === 'mf' ? 'un / une ' : 'un ') + w.fr;
    if (VOW.includes(w.fr[0])) return "l'" + w.fr;
    return (w.g === 'f' ? 'la ' : w.g === 'mf' ? 'le / la ' : 'le ') + w.fr;
  };

  // ---------- lookup ----------
  // Irregular verb forms (js/data/forms.js) and a lower-case index of headwords.
  const FORMS = {};
  (FR.FORMS_RAW || '').split(';').forEach(p => { const [inf, fs] = p.trim().split(':'); if (fs) fs.trim().split(/\s+/).forEach(f => { if (!FORMS[f]) FORMS[f] = inf; }); });
  FR.wordLow = {};
  FR.words.forEach(w => { const k = w.fr.toLowerCase(); if (!FR.wordLow[k]) FR.wordLow[k] = w; });
  const entry = x => FR.wordLow[x] || FR.wordLow['se ' + x] || FR.wordLow["s'" + x];
  const union = (a, b) => { const out = []; (a + ',' + b).split(/[,;]/).map(s => s.trim()).filter(Boolean).forEach(s => { if (!out.includes(s)) out.push(s); }); return out.join(', '); };
  const hit = x => {
    const e = entry(x);
    if (e) return { fr: e.fr, en: gloss[x] ? union(gloss[x], e.en) : e.en, pron: e.pron, entry: e };
    return gloss[x] ? { fr: x, en: gloss[x] } : null;
  };
  // Ending rules, tried in order: [ending, replacements]. Covers plurals, feminines, adverbs and regular verb endings.
  const ENDS = [
    ['aux', ['al', 'ail']], ['eaux', ['eau']], ['eux', ['eu']], ['s', ['']], ['x', ['']],
    ['euse', ['eux', 'eur']], ['euses', ['eux', 'eur']], ['rice', ['eur']], ['rices', ['eur']], ['ive', ['if']], ['ives', ['if']], ['ère', ['er']], ['ères', ['er']],
    ['elle', ['el', 'eau']], ['elles', ['el', 'eau']], ['enne', ['en']], ['ennes', ['en']], ['onne', ['on']], ['ette', ['et']], ['ète', ['et']], ['che', ['c']], ['que', ['c']], ['gue', ['g']],
    ['amment', ['ant']], ['emment', ['ent']], ['ement', ['e', '']], ['ment', ['', 'e']],
    ['es', ['', 'e', 'er']], ['e', ['', 'er']], ['ée', ['er', 'é']], ['ées', ['er', 'é']], ['és', ['er', 'é']], ['é', ['er']],
    ['ons', ['er', 're', 'ir']], ['ez', ['er', 're', 'ir']], ['ent', ['er', 're', 'ir']], ['ant', ['er', 're', 'ir']],
    ['ais', ['er', 're', 'ir']], ['ait', ['er', 're', 'ir']], ['ions', ['er', 're', 'ir']], ['iez', ['er', 're', 'ir']], ['aient', ['er', 're', 'ir']],
    ['erai', ['er']], ['eras', ['er']], ['era', ['er']], ['erons', ['er']], ['erez', ['er']], ['eront', ['er']], ['erais', ['er']], ['erait', ['er']], ['erions', ['er']], ['eraient', ['er']],
    ['ai', ['er']], ['as', ['er']], ['a', ['er']], ['âmes', ['er']], ['èrent', ['er']], ['ât', ['er']],
    ['issons', ['ir']], ['issez', ['ir']], ['issent', ['ir']], ['issais', ['ir']], ['issait', ['ir']], ['issaient', ['ir']], ['issant', ['ir']], ['isse', ['ir']], ['irent', ['ir', 're']],
    ['irai', ['ir', 're']], ['ira', ['ir', 're']], ['iront', ['ir', 're']], ['irait', ['ir', 're']], ['iraient', ['ir', 're']], ['is', ['ir', 're']], ['it', ['ir', 're']], ['i', ['ir']], ['ie', ['ir']], ['ies', ['ir']], ['is', ['ir']],
    ['rai', ['re']], ['ra', ['re']], ['ront', ['re']], ['rait', ['re']], ['raient', ['re']], ['u', ['re', 'oir']], ['ue', ['re', 'oir']], ['us', ['re', 'oir']], ['ues', ['re', 'oir']], ['t', ['re']], ['d', ['dre']], ['ds', ['dre']]
  ];
  function lemma(w) {
    let r = hit(w); if (r) return r;
    if (FORMS[w]) { r = hit(FORMS[w]); if (r) return Object.assign({ form: w }, r); }
    for (const [end, reps] of ENDS) {
      if (w.length <= end.length + 1 || !w.endsWith(end)) continue;
      const stem = w.slice(0, -end.length);
      for (const rep of reps) {
        for (const c of [stem + rep, stem.replace(/ç$/, 'c').replace(/ge$/, 'g') + rep, stem.replace(/è(?=[^aeiouéèê]+$)/, 'e') + rep, stem.replace(/è(?=[^aeiouéèê]+$)/, 'é') + rep, stem.replace(/(l|t)\1$/, '$1') + rep, stem.replace(/i$/, 'y') + rep]) {
          if (c.length < 2) continue;
          r = hit(c) || (FORMS[c] && hit(FORMS[c]));
          if (r) return Object.assign({ form: w }, r);
        }
      }
    }
    return null;
  }
  function frLookup(raw) {
    const w = raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[-']+|[-']+$/g, '');
    if (!w) return null;
    let r = lemma(w);
    if (r) return r;
    if (w.includes("'")) { // l'homme, j'habite, qu'il, aujourd'hui
      const i = w.indexOf("'");
      r = frLookup(w.slice(i + 1)); if (r) return r;
      return hit(w.slice(0, i)) || hit(w.slice(0, i) + 'e');
    }
    if (w.includes('-')) { for (const p of w.split('-')) { const h = lemma(p); if (h) return h; } }
    return null;
  }
  FR.lemma = w => frLookup(w);
  // Words added without an example borrow a short sentence from the app's lessons, readings or stories.
  (function borrowExamples() {
    const pairs = [];
    (FR.COURSE || []).forEach(c => (c.lessons || []).forEach(l => (l.s || []).forEach(s => pairs.push(s))));
    (FR.PASSAGES || []).forEach(p => (p.s || []).forEach(s => pairs.push(s)));
    (FR.STORIES || []).forEach(st => String(st.text || '').split('\n').forEach(l => {
      if (/^\s*##/.test(l)) return; const [f, e] = l.split('|'); if (f && e) pairs.push([f.trim(), e.trim()]);
    }));
    pairs.forEach(([f, e]) => {
      if (!f || !e || f.length > 110) return;
      f.split(/[^A-Za-zÀ-ÿœŒ'’-]+/).forEach(t => {
        if (t.length < 2) return;
        const r = frLookup(t.toLowerCase()), w = r && FR.wordLow[String(r.fr || '').toLowerCase()];
        if (w && !w.ex) { w.ex = f; w.exEn = e; }
      });
    });
  })();
  function enLookup(raw) {
    const w = raw.toLowerCase().replace(/[’`]/g, "'");
    for (const c of [w, w.replace(/s$/, ''), w.replace(/es$/, ''), w.replace(/ed$/, ''), w.replace(/ed$/, 'e'), w.replace(/ing$/, ''), w.replace(/ing$/, 'e')]) {
      if (rev[c]) { const fr = rev[c][0], e = FR.wordBy[fr]; return { en: w, fr: rev[c].slice(0, 3).join(', '), first: fr, pron: e ? e.pron : '', entry: e }; }
    }
    return null;
  }
  FR.lookup = (word, isFr) => isFr ? frLookup(word) : enLookup(word);

  // ---------- approximate pronunciation for words not in the dictionary ----------
  const V = 'aeiouyéèêëàâîïôûùœ';
  const RULES = [
    [/^tion/, 'syohn', 1], [/^ouill/, 'ooy', 1], [/^euill?/, 'uhy', 1], [/^aill?(?![aeiouyé])/, 'ahy', 1], [/^eill?(?![aeiouyé])/, 'ay', 1], [/^ien(?![aeiouyéèêhnm])/, 'yan', 1], [/^ill$/, 'eey', 1], [/^eau/, 'oh', 1], [/^au/, 'oh', 1], [/^(oeu|œu)/, 'uh', 1], [/^(ou|où|oû)/, 'oo', 1], [/^oi/, 'wa', 1],
    [/^(ai|aî|ei)(?![nm](?![aeiouy]))/, 'eh', 1], [/^eu/, 'uh', 1],
    [/^(ain|ein|aim|in|im|yn|ym)(?![aeiouyéèêhnm])/, 'an', 1], [/^(an|am|en|em)(?![aeiouyéèêhnm])/, 'ahn', 1],
    [/^(on|om)(?![aeiouyéèêhnm])/, 'ohn', 1], [/^(un|um)(?![aeiouyéèêhnm])/, 'uhn', 1],
    [/^ill/, 'y', 0], [/^gn/, 'ny', 0], [/^ch/, 'sh', 0], [/^ph/, 'f', 0], [/^th/, 't', 0], [/^qu/, 'k', 0], [/^gu(?=[eiéèê])/, 'g', 0],
    [/^g(?=[eiéèêy])/, 'zh', 0], [/^c(?=[eiéèêy])/, 's', 0], [/^ç/, 's', 0], [/^c/, 'k', 0], [/^j/, 'zh', 0], [/^h/, '', 0], [/^x/, 'ks', 0],
    [/^é/, 'ay', 1], [/^[èêë]/, 'eh', 1], [/^[àâ]/, 'ah', 1], [/^[îï]/, 'ee', 1], [/^ô/, 'oh', 1], [/^[ûùu]/, 'ew', 1], [/^œ/, 'uh', 1],
    [/^[yi]/, 'ee', 1], [/^a/, 'a', 1], [/^o/, 'o', 1], [/^e/, 'uh', 1]
  ];
  FR.approx = word => {
    let s = word.toLowerCase().replace(/[’']/g, '').replace(/-/g, ' ');
    return s.split(' ').filter(Boolean).map(w => {
      if (w.length > 3) w = w.replace(/(er|ez)$/, 'é').replace(/ets?$/, 'è');
      w = w.replace(/gue(s?)$/, 'g_').replace(/que(s?)$/, 'k_').replace(/ge(s?)$/, 'j_').replace(/ce(s?)$/, 'ç_').replace(/ille(s?)$/, 'ill_');
      if (w.endsWith('_')) { /* ending already handled */ }
      else if (w.length > 2 && /es$/.test(w) && w.length > 3) w = w.slice(0, -2) + '_';
      else if (w.length > 2 && /e$/.test(w)) w = w.slice(0, -1) + '_';
      else if (w.length > 2) w = w.replace(/[sxtdpz]+$/, '');
      const keep = w.endsWith('_'); if (keep) w = w.slice(0, -1);
      const tok = [];
      let i = 0;
      while (i < w.length) {
        const rest = w.slice(i);
        let done = false;
        for (const [re, out, isV] of RULES) {
          const m = rest.match(re);
          if (m) { if (out) tok.push([out, isV]); i += m[0].length; done = true; break; }
        }
        if (!done) {
          let c = w[i];
          if (c === 's' && i > 0 && V.includes(w[i - 1]) && V.includes(w[i + 1] || '')) c = 'z';
          if (!(tok.length && tok[tok.length - 1][0] === c)) tok.push([c, 0]);
          i++;
        }
      }
      let o = '';
      tok.forEach((t, k) => {
        o += t[0];
        const a = tok[k + 1], b = tok[k + 2];
        if (t[1] && a && ((!a[1] && b && b[1]) || a[1])) o += '-';
      });
      return o;
    }).join(' ');
  };
  FR.pron = word => { const e = FR.wordBy[word.toLowerCase()]; return e && e.pron ? e.pron : '≈ ' + FR.approx(word); };

  // ---------- speech ----------
  FR.canSpeak = () => 'speechSynthesis' in window;
  FR.speak = (text, onend) => {
    if (!FR.canSpeak()) { FR.toast(FR.tt('no_voice')); if (onend) onend(); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/_+/g, ' '));
      u.lang = 'fr-FR'; u.rate = FR.state.settings.voice || 0.9;
      const v = speechSynthesis.getVoices().find(x => /^fr/i.test(x.lang));
      if (v) u.voice = v;
      if (onend) { u.onend = onend; u.onerror = onend; }
      speechSynthesis.speak(u);
    } catch (e) { if (onend) onend(); }
  };

  // ---------- long-press popup ----------
  let timer = 0, sx = 0, sy = 0, fired = false, hl = null;
  const WORD = /[\p{L}\p{N}'’\-]/u;
  function closePop() {
    const p = document.getElementById('pop'); if (p) p.remove();
    if (window.CSS && CSS.highlights) CSS.highlights.delete('lp');
  }
  FR.closePop = closePop;
  function wordAt(x, y) {
    // Find the word whose box contains the point. (Caret APIs do not work inside buttons.)
    const el = document.elementFromPoint(x, y);
    if (!el || el.textContent.length > 8000) return null;
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), re = new RegExp(WORD.source + '+', 'gu'), range = document.createRange();
    let node;
    while ((node = tw.nextNode())) {
      const txt = node.textContent; let m;
      if (!txt.trim()) continue;
      re.lastIndex = 0;
      while ((m = re.exec(txt))) {
        range.setStart(node, m.index); range.setEnd(node, m.index + m[0].length);
        for (const rc of range.getClientRects()) {
          if (x >= rc.left - 3 && x <= rc.right + 3 && y >= rc.top - 3 && y <= rc.bottom + 3) {
            const word = m[0].replace(/^[-'’]+|[-'’]+$/g, '');
            if (!word || !/\p{L}/u.test(word)) return null;
            return { word, range, rect: rc, el: node.parentElement };
          }
        }
      }
    }
    return null;
  }
  function showWord(x, y, target) {
    if (!target || !target.closest || target.closest('input,textarea,select,#pop')) return false;
    const hit = wordAt(x, y);
    if (!hit) return false;
    const langEl = hit.el.closest('[lang]');
    const lg = langEl && langEl !== document.documentElement ? langEl.getAttribute('lang') : (FR.fr() ? 'fr' : 'en');
    const isFr = lg === 'fr';
    const res = FR.lookup(hit.word, isFr);
    const altEl = hit.el.closest('[data-alt]');
    const frWord = isFr ? (res && res.entry ? res.entry.fr : hit.word) : (res ? res.first : '');
    const pron = frWord ? (res && res.pron ? res.pron : FR.pron(frWord)) : '';
    const e = FR.esc;
    let h = '<div class="pop-w"><b' + (isFr ? ' lang="fr"' : '') + '>' + e(hit.word) + '</b>' +
      (frWord ? '<button class="mini" data-act="say" data-text="' + e(frWord) + '" aria-label="listen">🔊</button>' : '') + '</div>';
    if (res) {
      h += '<div class="pop-t">' + (isFr ? e(res.en) : '<span lang="fr">' + e(res.fr) + '</span>') + '</div>';
      if (res.form && res.entry) h += '<div class="pop-s">' + FR.tt('form_of') + ' <span lang="fr">' + e(res.entry.fr) + '</span></div>';
    } else if (!altEl) h += '<div class="pop-s">' + FR.tt('no_entry') + '</div>';
    if (pron) h += '<div class="pop-p">' + FR.tt('pron') + ' <i>' + e(pron) + '</i></div>';
    if (altEl) h += '<div class="pop-alt">' + (FR.fr() ? 'EN' : 'FR') + ' · ' + e(altEl.dataset.alt) + '</div>';
    if (res && res.entry) h += '<button class="link" data-act="go" data-to="dict/' + encodeURIComponent(res.entry.fr) + '">' + FR.tt('open_dict') + ' →</button>';
    closePop();
    const p = document.createElement('div');
    p.id = 'pop'; p.className = 'pop'; p.innerHTML = h;
    document.body.appendChild(p);
    const pw = p.offsetWidth, ph = p.offsetHeight, r = hit.rect;
    let left = Math.max(8, Math.min(window.innerWidth - pw - 8, r.left + r.width / 2 - pw / 2));
    let top = r.top - ph - 10; if (top < 8) { top = r.bottom + 10; p.classList.add('below'); }
    p.style.left = left + 'px'; p.style.top = top + 'px';
    if (window.CSS && CSS.highlights && window.Highlight) CSS.highlights.set('lp', new Highlight(hit.range));
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (er) {} }
    if (frWord && document.body.dataset.r === 'read') FR.speak(frWord);
    return true;
  }
  FR.initLongPress = () => {
    const cancel = () => clearTimeout(timer);
    document.addEventListener('pointerdown', e => {
      if (!e.target.closest || !e.target.closest('#pop')) closePop();
      if (e.button) return;
      sx = e.clientX; sy = e.clientY; fired = false; cancel();
      const tg = e.target;
      timer = setTimeout(() => { fired = showWord(sx, sy, tg); }, 480);
    }, true);
    document.addEventListener('pointermove', e => { if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 12) cancel(); }, true);
    ['pointerup', 'pointercancel', 'scroll'].forEach(ev => document.addEventListener(ev, cancel, true));
    document.addEventListener('click', e => { if (fired) { fired = false; e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener('contextmenu', e => { if (!e.target.closest('input,textarea')) e.preventDefault(); });
  };
})();
