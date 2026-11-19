window.FR = window.FR || {};
// Reviews that make you remember (docs/design-reviews.md).
// - The better you know a word, the harder its question: buttons, then typing, then typing inside a sentence.
// - A clue appears after 10 seconds; "Help me" gives the clue, then the answer.
// - Every mistake gets a one-line reason and comes back later in the session in a stricter form.
(function () {
  const E = FR.engine, S = () => FR.state;
  const CLUE_MS = 10000, RETEST_GAP = 4; // the retest comes back after at least 3 other questions

  Object.assign(FR.S, {
    q_cloze: ['Type the missing word', 'Écrivez le mot qui manque'],
    q_fill_type: ['Type the missing word', 'Écrivez le mot qui manque'],
    help_me: ['Help me', 'Aidez-moi'],
    help_show: ['Show me the answer', 'Montrez-moi la réponse'],
    clue: ['Clue', 'Indice'],
    clue_starts: ['Starts with {a}', 'Commence par {a}'],
    clue_letters: ['Starts with {a} · {n} letters', 'Commence par {a} · {n} lettres'],
    here_answer: ['Here’s the answer', 'Voici la réponse'],
    helped_note: ['That’s fine. You’ll see it again in a few questions, and again tomorrow.', 'Pas de souci. Il revient dans quelques questions, puis demain.'],
    retest_lab: ['Second try, a bit harder', 'Deuxième essai, un peu plus dur'],
    cant_listen: ['Can’t listen now', 'Je ne peux pas écouter'],
    noaudio_on: ['Listening questions are now reading ones until this session ends.', 'Jusqu’à la fin de la séance, les questions d’écoute passent à l’écrit.'],
    helped_n: ['{n} answered with help', '{n} avec de l’aide']
  });

  // ---------- which form a review question takes ----------
  // How well a word is known: the best level among its items (meaning, typed, gender).
  E.wordLevel = w => { const it = S().items; return Math.max(0, ...['w:', 't:', 'n:'].map(p => (it[p + w.fr] || {}).b || 0)); };
  const keepKey = (q, k) => Object.assign(q, { k });

  // Find the word (or one of its forms) inside its example sentence, so it can be blanked out.
  function formIn(w) {
    if (!w.ex) return null;
    const toks = w.ex.match(/[A-Za-zÀ-ÿœŒ'’-]+/g) || [], base = w.fr.toLowerCase();
    if (base.includes(' ')) return w.ex.toLowerCase().includes(base) ? w.ex.substr(w.ex.toLowerCase().indexOf(base), base.length) : null;
    for (let t of toks) {
      const c = t.replace(/^[a-z]’|^[a-z]'/i, '');
      if (c.toLowerCase() === base) return c;
      const r = FR.lemma && FR.lemma(c.toLowerCase());
      if (r && String(r.fr).toLowerCase() === base) return c;
    }
    return null;
  }
  const blankOut = (s, form) => s.replace(new RegExp('(^|[^A-Za-zÀ-ÿœŒ])' + form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-zÀ-ÿœŒ])'), '$1_____');
  // Type the missing word inside its sentence, with the English shown.
  E.qCloze = (w, k) => {
    const form = formIn(w); if (!form) return null;
    return { type: 'type', k: k || 't:' + w.fr, L: w.topic, sk: 'typing', lab: 'q_cloze', term: blankOut(w.ex, form), tl: 'fr', sub: w.exEn || w.en, hint: w.en,
      answer: form, pos: w.pos, say: w.ex, ex: [w.ex, w.exEn], word: w.fr, cloze: 1 };
  };
  // Grammar blank, typed instead of picked.
  E.qGramType = (l, i, k) => {
    const g = l.g[i], c = g[1][g[2]];
    if (!/___/.test(g[0]) || c.length > 24) return null;
    return { type: 'type', k: k || 'g:' + l.id + ':' + i, L: l.id, sk: 'grammar', lab: 'q_fill_type', term: g[0], tl: 'fr', answer: c, why: g[3] || '', gram: 1,
      say: g[0].split('___').length === 2 && !/[(=→]/.test(g[0]) ? g[0].replace('___', c).replace("' ", "'") : '' };
  };

  // Review question for a stored item: the form depends on how well the word is known.
  E.reviewQ = k => {
    const [t, a, b] = k.split(':');
    if (t === 'w' || t === 't') {
      const w = FR.wordBy[a]; if (!w || E.locked(w)) return null;
      const lv = E.wordLevel(w);
      if (lv >= 4) { const q = E.qCloze(w, k); if (q) return q; }
      if (lv >= 2 || t === 't') return keepKey(E.qType(w, t === 't' && lv < 2 && Math.random() < 0.3), k);
      return E.fromKey(k);
    }
    if (t === 'g') {
      const l = FR.lessonBy[a], it = S().items[k];
      if (l && l.g[b] && it && it.b >= 2) { const q = E.qGramType(l, +b, k); if (q) return q; }
    }
    return E.fromKey(k);
  };

  // The retest after a mistake: one step stricter than what was missed.
  E.stricter = q => {
    const [t, a, b] = q.k.split(':'), w = FR.wordBy[a];
    let n = null;
    if ((t === 'w' || t === 't') && w) n = q.type === 'mcq' ? keepKey(E.qType(w, false), q.k) : (!q.cloze && E.qCloze(w, q.k));
    else if (t === 'g' && q.type === 'mcq') { const l = FR.lessonBy[a]; n = l && E.qGramType(l, +b, q.k); }
    n = n || Object.assign({}, q, { opts: q.opts ? FR.shuffle(q.opts.slice()) : q.opts });
    if (n.opts && q.opts && n.opts !== q.opts) n.a = n.opts.indexOf(q.opts[q.a]);
    return Object.assign(n, { retry: (q.retry || 0) + 1, lab2: 'retest_lab', why: n.why || q.why, whyLine: q.whyLine });
  };

  // ---------- clues ----------
  const wordOf = q => { const [t, a] = q.k.split(':'); return (t === 'w' || t === 't' || t === 'n') ? FR.wordBy[a] : null; };
  // Every clue has the same shape: one line of context (a sentence, a rule or the topic),
  // then, for typed answers, the first letter and length. A clue never contains the answer itself.
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Blank out every whole-word appearance of the answer (and its parts, for answers like "ne … pas").
  const hide = (s, ans) => {
    if (!s || !ans) return s;
    String(ans).split(/\s*…\s*|\s*\.\.\.\s*/).filter(p => p.trim()).sort((a, b) => b.length - a.length).forEach(p => {
      s = s.replace(new RegExp('(^|[^A-Za-zÀ-ÿœŒ])' + reEsc(p.trim().replace(/['’]$/, '')) + '(?=$|[^A-Za-zÀ-ÿœŒ])', 'gi'), '$1___');
    });
    return s;
  };
  const frLine = s => '<span lang="fr">' + FR.esc(s) + '</span>';
  const enLine = s => '<span class="mute">' + FR.esc(s) + '</span>';
  const topicLine = w => { const t = w && !/^x:inapp/.test(w.topic || '') && FR.TOPICS && FR.TOPICS[w.topic]; return t ? FR.bi(['Topic: ', 'Thème : ']) + '<b>' + FR.esc(FR.pick(t)) + '</b>' : ''; };
  const shapeLine = ans => { const letters = ans.replace(/[^A-Za-zÀ-ÿœŒ]/g, ''); return FR.tt('clue_letters', { a: letters.charAt(0).toUpperCase(), n: letters.length }); };
  // The rule from a grammar reason, with the answer taken out ("Pain is masculine: ___.").
  const ruleLine = (why, ans) => { const r = FR.pick(why); const h = hide(r, ans); return /[A-Za-zÀ-ÿ]{3}/.test(h.replace(/___/g, '')) ? FR.esc(h) : ''; };
  const genderLine = w => {
    if (w.g === 'mf') return FR.bi(['It names a person. Think about who it is.', 'Ce mot désigne une personne. Pensez à qui c’est.']);
    const p = E.genderEnding && E.genderEnding(w);
    if (!p) return FR.bi(['Its ending doesn’t help here. Try saying it with “le” and with “la”: which one have you heard?', 'Sa terminaison n’aide pas ici. Dites-le avec « le » puis avec « la » : lequel avez-vous déjà entendu ?']);
    if (p.rule === w.g) return FR.bi(['Look at the ending, ' + p.end + '. Most nouns with it share one gender.', 'Regardez la terminaison, ' + p.end + '. La plupart des noms qui l’ont ont le même genre.']);
    return FR.bi(['Careful: this one breaks the usual rule for nouns ending in ' + p.end + '.', 'Attention : celui-ci ne suit pas la règle habituelle des noms en ' + p.end + '.']);
  };
  FR.clueHtml = q => {
    const w = wordOf(q), lines = [];
    if (q.type === 'type') {
      if (q.cloze) lines.push(FR.bi(['Means: ', 'Veut dire : ']) + '<b>' + FR.esc(hide(q.hint || '', q.answer)) + '</b>');
      else if (q.gram) { const r = q.why && ruleLine(q.why, q.answer); if (r) lines.push(r); }
      else if (q.listen && w) lines.push(FR.bi(['Means: ', 'Veut dire : ']) + '<b>' + FR.esc(hide(w.en, q.answer)) + '</b>');
      else if (w && w.ex) { const f = formIn(w); if (f) lines.push(frLine(hide(blankOut(w.ex, f), q.answer)) + (w.exEn ? '<br>' + enLine(hide(w.exEn, q.answer)) : '')); }
      if (!lines.length && w) lines.push(topicLine(w));
      lines.push(shapeLine(q.answer));
    } else if (q.type === 'mcq') {
      const ans = q.opts && q.opts[q.a];
      if (q.sk === 'gender' && w) lines.push(genderLine(w));
      else if (q.sk === 'grammar') { const r = q.why && ruleLine(q.why, ans); if (r) lines.push(r); }
      else if (w && q.ol === 'en') {
        // French word shown, English to pick: see the word used in a French sentence (no translation, that would give it away).
        if (w.ex) lines.push(frLine(w.ex));
        else if (ans) lines.push(FR.tt('clue_starts', { a: String(ans).charAt(0).toUpperCase() }));
      } else if (w) {
        // English shown, French to pick: the French sentence with the word blanked, and its English.
        const f = w.ex && formIn(w);
        if (f) lines.push(frLine(hide(blankOut(w.ex, f), ans)) + (w.exEn ? '<br>' + enLine(hide(w.exEn, ans)) : ''));
        else if (ans) lines.push(FR.tt('clue_starts', { a: String(ans).replace(/^[^A-Za-zÀ-ÿœŒ]+/, '').charAt(0).toUpperCase() }));
      }
      if (!lines.length && w) lines.push(topicLine(w));
    } else if (q.type === 'build') {
      lines.push(FR.bi(['It starts with: ', 'Ça commence par : ']) + '<b lang="fr">' + FR.esc(q.answer.split(' ')[0]) + '</b>');
    }
    let html = lines.filter(Boolean).join('<br>');
    if (!html) html = FR.bi(['Read the question again slowly, word by word. Which option fits every part of it?', 'Relisez la question lentement, mot par mot. Quelle réponse va avec chaque partie ?']);
    return '<b class="clue-t">💡 ' + FR.tt('clue') + '</b> ' + html;
  };

  // ---------- reason lines after a mistake ----------
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  FR.whyLine = (q, pick, typed) => {
    const w = wordOf(q);
    if (q.type === 'mcq' && q.sk === 'vocab' && w && pick >= 0) {
      const o = q.opts[pick], x = FR.words.find(y => q.ol === 'en' ? y.en === o : y.fr === o);
      if (x) return q.ol === 'en'
        ? ['“' + o + '” would be ' + FR.withArt(x) + '. ' + cap(FR.withArt(w)) + ' means “' + w.en + '”.', '« ' + o + ' », ce serait ' + FR.withArt(x) + '. ' + cap(FR.withArt(w)) + ' veut dire « ' + w.en + ' ».']
        : [cap(FR.withArt(x)) + ' means “' + x.en + '”. “' + w.en + '” is ' + FR.withArt(w) + '.', cap(FR.withArt(x)) + ' veut dire « ' + x.en + ' ». « ' + w.en + ' », c’est ' + FR.withArt(w) + '.'];
    }
    if (q.type === 'type' && typed) {
      const t = typed.trim().toLowerCase().replace(/^(le |la |les |l'|l’|un |une )/, ''), r = t && FR.lemma && FR.lemma(t);
      const target = (q.word || q.answer).toLowerCase();
      if (r && String(r.fr).toLowerCase() !== target && String(r.fr).toLowerCase() !== q.answer.toLowerCase())
        return ['You wrote ' + t + ', which means “' + (r.en || '').split(',')[0] + '”.', 'Vous avez écrit ' + t + ', qui veut dire « ' + (r.en || '').split(',')[0] + ' ».'];
      if (FR.norm(t).length && near(FR.norm(t), FR.norm(q.answer)))
        return ['Almost. It’s spelled ' + q.answer + '.', 'Presque. Ça s’écrit ' + q.answer + '.'];
    }
    return null;
  };
  // Within two edits of each other.
  function near(a, b) {
    if (Math.abs(a.length - b.length) > 2) return false;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length] <= 2;
  }

  // ---------- clue timer (counts only while the app is on screen) ----------
  let timer = 0, waited = 0, last = 0, forQ = null;
  FR.clueTimer = () => {
    clearInterval(timer);
    const ss = S().session; if (!ss || ss.cur) return;
    const q = ss.queue[ss.i]; if (forQ !== q) { forQ = q; waited = 0; }
    if (ss.help) { showClue(); return; }
    last = Date.now();
    timer = setInterval(() => {
      const now = Date.now(); if (!document.hidden) waited += now - last; last = now;
      const s2 = S().session;
      if (!s2 || s2.cur || s2.queue[s2.i] !== q || document.body.dataset.r !== 'session') { clearInterval(timer); return; }
      if (waited >= CLUE_MS) { clearInterval(timer); s2.help = 1; FR.save(); showClue(); }
    }, 250);
  };
  function showClue() {
    const ss = S().session, box = document.getElementById('clue'), b = document.getElementById('helpbtn'); if (!ss || !box) return;
    box.innerHTML = FR.clueHtml(ss.queue[ss.i]); box.hidden = false; box.classList.add('in');
    if (b) b.innerHTML = '🙋 ' + FR.tt('help_show');
  }
  FR.act.help = () => {
    const ss = S().session; if (!ss || ss.cur) return;
    if (!ss.help) { ss.help = 1; FR.save(); clearInterval(timer); showClue(); return; }
    clearInterval(timer); FR.resolveHelped();
  };
  // "Can't listen now": listening questions become reading ones for the rest of this session.
  FR.act.noaudio = () => {
    const ss = S().session; if (!ss) return; ss.noaudio = 1;
    ss.queue.forEach((q, i) => { if (i >= ss.i && q.listen) { const w = wordOf(q); Object.assign(q, { listen: false, lab: 'q_type', term: w ? w.en : q.term }); } });
    FR.stopSpeak && FR.stopSpeak(); FR.toast(FR.tt('noaudio_on')); FR.save(); FR.refresh();
  };
})();
