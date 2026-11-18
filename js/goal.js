window.FR = window.FR || {};
// Learning goal: just learning, TCF Canada or TEF Canada. Asked once; can be changed in Settings.
(function () {
  const FR = window.FR, A = FR.act, { esc, bi, tt } = FR, S = () => FR.state;
  Object.assign(FR.S, {
    goal_q: ['What brings you to French?', 'Pourquoi apprenez-vous le français ?'],
    goal_sub: ['This decides what your home screen puts first. You can change it any time in Settings.', 'Cela décide de ce que l’accueil met en avant. Vous pourrez le changer à tout moment dans les réglages.'],
    goal_learn: ['Just learning French', 'J’apprends le français, tout simplement'],
    goal_learn_d: ['Lessons, reading and practice, no exam.', 'Leçons, lecture et pratique, sans examen.'],
    goal_tcfca: ['TCF Canada', 'TCF Canada'],
    goal_tcfca_d: ['For immigration to Canada. Full mocks and an NCLC estimate for each skill.', 'Pour immigrer au Canada. Examens blancs complets et estimation NCLC par compétence.'],
    goal_tefca: ['TEF Canada', 'TEF Canada'],
    goal_tefca_d: ['For immigration to Canada. A full mock and an NCLC estimate for each skill.', 'Pour immigrer au Canada. Un examen blanc complet et une estimation NCLC par compétence.'],
    goal_date: ['Test date (optional)', 'Date du test (facultatif)'],
    goal_nclc: ['Target level', 'Niveau visé'],
    goal_save: ['Save', 'Enregistrer'],
    goal_card: ['Your goal', 'Votre objectif']
  });
  const goals = ['learn', 'tcfca', 'tefca'];
  FR.goalLabel = () => tt('goal_' + (S().settings.goal || 'learn'));
  A.goalsheet = () => {
    const st = S().settings, g = st.goal || 'learn';
    FR.sheet('<h3>' + tt('goal_q') + '</h3><p class="mute small">' + tt('goal_sub') + '</p><div class="col goal-opts">' +
      goals.map(k => '<label class="goal-opt' + (g === k ? ' on' : '') + '"><input type="radio" name="goal" value="' + k + '"' + (g === k ? ' checked' : '') + ' data-chg="goalpick"><span><b>' + tt('goal_' + k) + '</b><small class="mute">' + tt('goal_' + k + '_d') + '</small></span></label>').join('') + '</div>' +
      '<div id="goalx"' + (g === 'learn' ? ' hidden' : '') + '><label class="field"><span>' + tt('goal_date') + '</span><input type="date" id="gdate" class="search" value="' + esc(st.testDate || '') + '"></label>' +
      '<label class="field"><span>' + tt('goal_nclc') + '</span><select id="gnclc" class="search">' + [5, 6, 7, 8, 9, 10].map(n => '<option value="' + n + '"' + (+(st.nclc || 7) === n ? ' selected' : '') + '>NCLC ' + n + (n === 7 ? ' · ' + bi(['recommended', 'recommandé']) : '') + '</option>').join('') + '</select></label></div>' +
      '<button class="btn primary" data-act="goalsave">' + tt('goal_save') + '</button>');
  };
  FR.chg.goalpick = el => {
    document.querySelectorAll('.goal-opt').forEach(l => l.classList.toggle('on', l.contains(el)));
    const x = document.getElementById('goalx'); if (x) x.hidden = el.value === 'learn';
  };
  A.goalsave = () => {
    const st = S().settings, pick = document.querySelector('input[name=goal]:checked');
    st.goal = pick ? pick.value : 'learn';
    const d = document.getElementById('gdate'), n = document.getElementById('gnclc');
    if (st.goal !== 'learn') { st.testDate = d && d.value ? d.value : ''; st.nclc = n ? +n.value : 7; }
    S().goalAsked = 1; S().examPick = ''; FR.save(); FR.closeSheet(); FR.refresh(true);
  };
  // Ask once, shortly after the app opens (existing users included).
  // Waits until no other sheet (such as the daily reminder) is open, trying a few times.
  let tries = 0;
  const ask = () => {
    const s = S(); if (!s || s.goalAsked || s.settings.goal || (FR.master && FR.master.on)) return;
    const busy = document.querySelector('#layer .sheet') || /^#\/(session|typing|exam\/run|tcf\/run)/.test(location.hash);
    if (busy) { if (++tries < 8) setTimeout(ask, 3000); return; }
    s.goalAsked = 1; FR.save(); A.goalsheet();
  };
  setTimeout(ask, 2500);
})();
