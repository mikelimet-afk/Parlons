window.FR = window.FR || {};
// B1 reading comprehension (docs/design-b1.md): original texts with questions, like the TCF reading section.
// A text is FR.CR entry { id, kind, t:[fr,en], s:[[fr,en]], q:[[type, qFr, qEn, opts, correctIdx, why, word?]], lesson?, story? }.
// type: main, who, detail, infer, word, tone, tf. For tf, opts can be omitted (Vrai / Faux / On ne sait pas).
(function () {
  const FR = window.FR, E = FR.engine, A = FR.act, V = FR.views, { esc, bi, tt } = FR, S = () => FR.state;
  FR.CR = FR.CR || [];

  Object.assign(FR.S, {
    compr_tab: ['Comprehension', 'Compréhension'],
    compr_sub: ['B1 texts with questions: the main message, who is who, details, what is implied, and the writer’s tone. Like the TCF reading section.', 'Des textes B1 avec des questions : l’idée principale, les personnages, les détails, les sous-entendus et le ton. Comme l’épreuve de lecture du TCF.'],
    compr_n: ['{n} questions', '{n} questions'],
    compr_best: ['best {p}%', 'meilleur {p} %'],
    compr_qs: ['Questions', 'Questions'],
    compr_score: ['{r} out of {n}', '{r} sur {n}'],
    compr_again: ['Try again', 'Recommencer'],
    compr_more: ['More texts', 'Autres textes'],
    compr_story: ['Questions on the story', 'Questions sur l’histoire'],
    compr_read_first: ['Read the story first →', 'Lire d’abord l’histoire →'],
    compr_lesson: ['Read & answer: {t} →', 'Lire et répondre : {t} →'],
    compr_from: ['From the lesson “{t}”', 'Tiré de la leçon « {t} »'],
    compr_words: ['Words from the questions you missed are now in your reviews.', 'Les mots des questions manquées sont dans vos révisions.'],
    compr_great: ['You understood the text well.', 'Vous avez bien compris le texte.'],
    compr_ok: ['Good. Reread the sentences behind the questions you missed.', 'Bien. Relisez les phrases liées aux questions manquées.'],
    compr_low: ['Read it again with English under each sentence, then try again.', 'Relisez avec l’anglais sous chaque phrase, puis recommencez.']
  });
  const QT = {
    main: ['Main message', 'Idée principale'], who: ['Who’s who', 'Les personnes'], detail: ['Detail', 'Détail'],
    infer: ['Reading between the lines', 'Sous-entendu'], word: ['Word in context', 'Mot en contexte'],
    tone: ['Purpose & tone', 'But et ton'], tf: ['True, false or not said', 'Vrai, faux ou non dit']
  };
  FR.CR_KINDS = {
    email: ['Emails & messages', 'Courriels et messages'], notice: ['Notices & ads', 'Annonces et avis'], news: ['News', 'Actualité'],
    opinion: ['Opinion', 'Opinion'], interview: ['Interviews', 'Entretiens'], story: ['Stories', 'Récits'],
    dialogue: ['Conversations', 'Conversations'], letter: ['Letters', 'Lettres'], blog: ['Blogs', 'Blogues']
  };
  const TF = ['Vrai', 'Faux', 'On ne sait pas'];
  const crBy = id => FR.CR.find(x => x.id === id);
  const opts = q => q[3] || TF;

  // The attempt in progress: answer order is shuffled once per attempt (true / false questions keep theirs).
  let cur = null; // { id, order: [[...]], picks: [] }
  const start = c => {
    cur = { id: c.id, picks: [], order: c.q.map(q => { const ix = opts(q).map((_, i) => i); return q[3] ? FR.shuffle(ix) : ix; }) };
  };
  const st = () => S().cr || (S().cr = {});

  const qHtml = (c, q, i) => {
    const pick = cur.picks[i], done = pick !== undefined, O = opts(q);
    const ob = cur.order[i].map(o => {
      let cls = 'opt'; if (done) cls += o === q[4] ? ' ok' : o === pick ? ' bad' : ' dim';
      return '<button class="' + cls + '" data-act="crpick" data-i="' + i + '" data-o="' + o + '"><span lang="fr">' + esc(O[o]) + '</span></button>';
    }).join('');
    return '<section class="card crq-c" id="crq' + i + '"><small class="eyebrow">' + (i + 1) + ' · ' + bi(QT[q[0]] || QT.detail) + '</small>' +
      '<p class="crq-q" lang="fr">' + esc(q[1]) + '</p><span class="tr">' + esc(q[2]) + '</span><div class="opts">' + ob + '</div>' +
      (done ? '<p class="crq-why ' + (pick === q[4] ? 'ok' : 'bad') + '">' + (pick === q[4] ? '✓ ' : '✗ ') + esc(q[5]) + '</p>' : '') + '</section>';
  };
  const summary = c => {
    const n = c.q.length, r = c.q.filter((q, i) => cur.picks[i] === q[4]).length, p = r / n, miss = c.q.some((q, i) => cur.picks[i] !== q[4] && q[6] && FR.wordBy[q[6]]);
    return '<section class="card center crq-sum"><h3>' + tt('compr_score', { r, n }) + '</h3><p class="mute">' + tt(p >= 0.85 ? 'compr_great' : p >= 0.5 ? 'compr_ok' : 'compr_low') + '</p>' +
      (miss ? '<p class="small mute">' + tt('compr_words') + '</p>' : '') +
      '<div class="col"><button class="btn primary" data-act="cragain" data-id="' + c.id + '">' + tt('compr_again') + '</button><button class="btn" data-act="go" data-to="read/cr">' + tt('compr_more') + '</button></div></section>';
  };

  FR.crView = id => {
    const showEn = FR.readEn ? FR.readEn() : false;
    if (!id) return list();
    const c = crBy(id); if (!c) return list();
    if (!cur || cur.id !== c.id) start(c);
    const best = st()[c.id], L = c.lesson && FR.lessonBy[c.lesson], story = c.story && FR.STORIES.find(x => x.id === c.story);
    const P = c.s ? FR.findText('cr:' + c.id) : null;
    const backTo = L ? ['lesson/' + L.id, 'back'] : story ? ['read', 'reading'] : ['read/cr', 'compr_tab'];
    let h = '<button class="back" data-act="go" data-to="' + backTo[0] + '">← ' + tt(backTo[1]) + '</button>' +
      '<small class="eyebrow">' + (story ? story.icon + ' ' + bi(story.t) : bi(FR.CR_KINDS[c.kind] || ['Text', 'Texte'])) + ' · B1' + (best ? ' · ' + tt('compr_best', { p: Math.round(best.best * 100) }) : '') + '</small>' +
      '<h1 lang="fr">' + esc(c.t[0]) + '</h1><p class="mute">' + esc(c.t[1]) + '</p>' +
      (L ? '<p class="small mute">' + tt('compr_from', { t: bi(L.t) }) + '</p>' : '');
    if (P) h += FR.rdControls(P) + '<article class="passage' + (showEn ? ' en' : '') + '">' + FR.sentHtml(P) + '</article>';
    else if (story) h += '<div class="row"><label class="switch"><input type="checkbox" data-chg="showen"' + (showEn ? ' checked' : '') + '><span>' + tt('show_en') + '</span></label></div><p><button class="link" data-act="go" data-to="read/' + story.id + '~1">' + tt('compr_read_first') + '</button></p>';
    h += '<h2>' + tt('compr_qs') + '</h2><div class="crq' + (showEn ? ' en' : '') + '">' + c.q.map((q, i) => qHtml(c, q, i)).join('') + '</div>';
    if (cur.picks.filter(x => x !== undefined).length === c.q.length) h += summary(c);
    return h;
  };

  let kf = 'all';
  function list() {
    // Library texts first, then the shorter texts that belong to lessons.
    const lib = FR.CR.filter(c => !c.story && !c.lesson).concat(FR.CR.filter(c => !c.story && c.lesson)), sc = st();
    const kinds = Object.keys(FR.CR_KINDS).filter(k => lib.some(c => c.kind === k));
    const shown = lib.filter(c => kf === 'all' || c.kind === kf);
    return '<h1>' + tt('reading') + '</h1><p class="mute">' + tt('compr_sub') + '</p>' + FR.readTabs('c') +
      '<div class="chips scroll"><button class="chip' + (kf === 'all' ? ' on' : '') + '" data-act="crkind" data-v="all">' + tt('f_all') + '</button>' +
      kinds.map(k => '<button class="chip' + (kf === k ? ' on' : '') + '" data-act="crkind" data-v="' + k + '">' + bi(FR.CR_KINDS[k]) + '</button>').join('') + '</div>' +
      '<div class="stagger">' + shown.map(c => {
        const b = sc[c.id], L = c.lesson && FR.lessonBy[c.lesson];
        return '<button class="card passcard" data-act="go" data-to="read/cr:' + c.id + '"><small class="eyebrow">' + bi(FR.CR_KINDS[c.kind]) + ' · ' + tt('compr_n', { n: c.q.length }) + (b ? ' · ✓ ' + Math.round(b.best * 100) + '%' : '') + (L ? ' · ' + bi(L.t) : '') + '</small><h3 lang="fr">' + esc(c.t[0]) + '</h3><span class="mute">' + esc(c.t[1]) + '</span></button>';
      }).join('') + '</div>';
  }

  A.crkind = d => { kf = d.v; FR.refresh(); };
  A.cragain = d => { const c = crBy(d.id); if (c) start(c); FR.refresh(); FR.smooth.to(document.getElementById('crq0'), true); };
  A.crpick = d => {
    if (!cur) return;
    const c = crBy(cur.id), i = +d.i, o = +d.o; if (!c || cur.picks[i] !== undefined) return;
    const q = c.q[i], ok = o === q[4], s = S();
    cur.picks[i] = o;
    const tg = s.tags['S:reading'] || (s.tags['S:reading'] = { r: 0, w: 0 }); ok ? tg.r++ : tg.w++;
    if (!ok && q[6] && FR.wordBy[q[6]]) E.mark({ k: 'w:' + q[6], L: 'read', sk: 'reading' }, false);
    const n = c.q.length, all = cur.picks.filter(x => x !== undefined).length === n;
    if (all) {
      const r = c.q.filter((x, j) => cur.picks[j] === x[4]).length, prev = st()[c.id];
      st()[c.id] = { best: Math.max(prev ? prev.best : 0, r / n), t: Date.now() };
      E.reward(prev ? 5 : 10 + r * 4, { k: 'read', ti: [c.t[1], c.t[0]], r, n });
    }
    FR.save();
    // Only the answered question (and the score, at the end) is redrawn, so earlier answers don't animate again.
    const el = document.getElementById('crq' + i);
    if (!el) { FR.refresh(); return; }
    el.outerHTML = qHtml(c, q, i);
    const now = document.getElementById('crq' + i);
    if (now && FR.readEn && FR.readEn()) now.closest('.crq').classList.add('en');
    if (ok) FR.burst(document.querySelector('#crq' + i + ' .opt.ok'));
    if (all) {
      const r = c.q.filter((x, j) => cur.picks[j] === x[4]).length;
      document.querySelector('.crq').insertAdjacentHTML('afterend', summary(c));
      setTimeout(() => { FR.smooth.to(document.querySelector('.crq-sum'), true); if (r / n >= 0.85) FR.cheer(r / n, 0, c.t); }, 400);
    }
  };
})();
