// Free AI tutor for Parlons (uses js/free-llm.js). Works with no key; better models can be added in AI settings.
(function () {
  const FR = window.FR, bi = x => x[FR.fr() ? 1 : 0]; // plain text (FR.bi returns HTML)
  const level = () => {
    const done = Object.keys((FR.state && FR.state.lessons) || {}).length;
    return done < 6 ? 'A1' : done < 12 ? 'A2' : 'early B1';
  };
  FreeLLM.init({
    app: 'parlons',
    title: 'Parlons · AI',
    lang: () => FR.fr() ? 'fr' : 'en',
    fab: false,
    tutor: () => 'You are "Prof", a warm, patient French teacher for an English-speaking adult learner at about ' + level() + ' level, aiming for B1 (TEF/TCF). ' +
      'Explain in clear English unless asked otherwise; write French examples in **bold** with an English translation. Correct the learner\'s French gently: show the fixed sentence, then the rule in one line. ' +
      'If the learner writes in French, reply first in simple French, then add a short English note. Keep answers short (under 150 words) unless asked for more.',
    practice: () => 'You write French exercises for an English-speaking learner at ' + level() + ' level (CEFR). Questions may be in English or French; options in French where the skill is French. Explanations in English, one sentence.',
    greeting: () => bi(['Bonjour ! I\'m your free AI French tutor. Ask about grammar, have me correct your French, or practise a conversation.', 'Bonjour ! Je suis votre tuteur IA gratuit. Posez une question de grammaire, faites corriger votre français ou entraînez-vous à la conversation.']),
    starters: () => [
      bi(['Explain passé composé vs imparfait', 'Explique passé composé et imparfait']),
      bi(['Correct my French: Je suis allé au magasin hier et je achète du pain.', 'Corrige : Je suis allé au magasin hier et je achète du pain.']),
      bi(['Let\'s role-play ordering at a café, in French', 'Jouons une scène au café, en français']),
      bi(['Give me a TEF-style speaking question', 'Donne-moi un sujet d\'oral type TEF'])
    ],
    topics: ['Articles le / la / les', 'Passé composé (être or avoir)', 'Futur proche', 'Food & restaurant vocabulary', 'Prepositions à / de / en', 'Imparfait', 'TEF reading: short notices'],
    onAnswer: ok => { if (FR.sfx) try { FR.sfx(ok); } catch (e) {} }
  });

  FR.act.ai = d => FreeLLM.open(d.tab || 'chat');
  // "Explain with AI" on the answer feedback of a lesson / practice question.
  FR.act.aiexplain = () => {
    const ss = FR.state.session; if (!ss || !ss.cur) return;
    const q = ss.queue[ss.i], cur = ss.cur, t = o => q.ol === 'k' ? FR.tt(o) : o;
    const d = { question: (FR.tt(q.lab) || '') + ': ' + q.term + (q.sub ? ' (' + q.sub + ')' : ''), note: q.why ? bi(q.why) : '' };
    if (q.type === 'mcq') { d.options = q.opts.map(t); d.correct = t(q.opts[q.a]); d.picked = t(q.opts[cur.pick]); }
    else { d.correct = q.answer; d.picked = q.type === 'build' ? ss.build.map(i => q.tiles[i]).join(' ') : cur.typed; }
    FreeLLM.explain(d);
  };
})();
