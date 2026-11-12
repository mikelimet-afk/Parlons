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
  function frLookup(raw) {
    const w = raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[-']+|[-']+$/g, '');
    if (!w) return null;
    const hit = x => FR.wordBy[x] ? { fr: FR.wordBy[x].fr, en: FR.wordBy[x].en, pron: FR.wordBy[x].pron, entry: FR.wordBy[x] }
      : gloss[x] ? { fr: x, en: gloss[x] } : null;
    let r = hit(w);
    if (r) return r;
    if (w.includes("'")) { // l'homme, j'habite, qu'il
      const rest = w.slice(w.indexOf("'") + 1);
      r = frLookup(rest);
      if (r) return r;
      return hit(w.slice(0, w.indexOf("'")));
    }
    // simple inflection guesses: plural, feminine, common verb endings
    const tries = [[/s$/, ''], [/x$/, ''], [/e$/, ''], [/es$/, ''], [/aux$/, 'al'], [/elle$/, 'eau'], [/(e|es|ons|ez|ent|é|ée|és|ées|ais|ait|aient|era|erai|eras|erons|erez|eront)$/, 'er'], [/(is|it|issons|issez|issent|i)$/, 'ir'], [/ne$/, 'n']];
    for (const [re, to] of tries) {
      if (re.test(w)) { const c = w.replace(re, to); const h = c !== w && hit(c); if (h && c.length > 1) return Object.assign({ form: w }, h); }
    }
    if (w.includes('-')) { for (const p of w.split('-')) { const h = hit(p); if (h) return h; } }
    return null;
  }
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
      if (w.length > 3) w = w.replace(/(er|ez)$/, 'é');
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
