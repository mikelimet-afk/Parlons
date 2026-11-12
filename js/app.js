// App shell: header, tabs, router, "in progress" banner, reminders.
(function () {
  const FR = window.FR, E = FR.engine, { tt, bi } = FR;
  const S = () => FR.state;
  // A different entrance animation per section.
  const ANIM = { home: 'zoom', learn: 'up', lesson: 'slide', session: 'slide', result: 'zoom', practice: 'up', gender: 'flip', dict: 'slide', rules: 'up', everyday: 'slideL', read: 'fade', progress: 'rise', coach: 'zoom', settings: 'up', exam: 'flip' };
  const TABS = [['home', '🏠', 'home'], ['learn', '🧭', 'lessons'], ['dict', '📚', 'tab_dict'], ['read', '📖', 'reading'], ['progress', '📈', 'progress']];

  function parse() {
    const p = location.hash.replace(/^#\/?/, '').split('/');
    let param = p.slice(1).join('/');
    try { param = decodeURIComponent(param); } catch (e) {}
    return [FR.views[p[0]] ? p[0] : 'home', param];
  }
  function banner(r, param) {
    const s = S(); let h = '';
    if (s.session && r !== 'session') h = '<button class="banner" data-act="go" data-to="session"><i></i><span>' + tt('in_progress') + ' · <b>' + bi(s.session.title) + '</b> · ' + (s.session.i + 1) + '/' + s.session.queue.length + '</span><u>' + tt('resume') + '</u></button>';
    else if (s.exam && !(r === 'exam' && param === 'run')) h = '<button class="banner" data-act="go" data-to="exam/run"><i></i><span>' + tt('exam_in_progress') + ' · <b>' + FR.EXAMS[s.exam.id].name + '</b></span><u>' + tt('resume') + '</u></button>';
    else if (s.rp && r !== 'everyday' && (FR.ROLEPLAYS.find(x => x.id === s.rp.id) || { turns: [] }).turns.length > s.rp.i) h = '<button class="banner" data-act="go" data-to="everyday"><i></i><span>' + tt('rp_in_progress') + '</span><u>' + tt('resume') + '</u></button>';
    document.getElementById('banner').innerHTML = h;
  }
  function render(fresh, anim) {
    const [r, param] = parse(), v = document.getElementById('view');
    document.body.dataset.r = r;
    v.innerHTML = FR.views[r](param, fresh);
    if (fresh || anim) { v.className = ''; void v.offsetWidth; v.className = 'enter a-' + (fresh ? ANIM[r] || 'up' : 'q'); }
    if (fresh) window.scrollTo(0, 0);
    banner(r, param);
    document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.to === r || (r === 'lesson' && b.dataset.to === 'learn')));
    if (FR.after[r]) FR.after[r](param, fresh);
  }
  FR.refresh = anim => render(false, anim);
  FR.go = to => { if (location.hash === '#/' + to) render(true); else location.hash = '#/' + to; };

  FR.shell = () => {
    document.getElementById('top').innerHTML = '<button class="brand" data-act="go" data-to="home">Parlons<span>&nbsp;!</span></button><div class="top-r">' +
      '<button class="icon-btn glance" data-act="glance" aria-label="today">◔ <small>' + tt('today') + '</small></button>' +
      '<button class="icon-btn langbtn" data-act="lang" aria-label="language">' + (FR.fr() ? 'EN' : 'FR') + '</button>' +
      '<button class="icon-btn" data-act="go" data-to="settings" aria-label="settings">⚙</button></div>';
    document.getElementById('tabs').innerHTML = TABS.map(x => '<button data-act="go" data-to="' + x[0] + '"><span>' + x[1] + '</span>' + tt(x[2]) + '</button>').join('');
  };
  FR.applySettings = () => {
    const st = S().settings;
    document.body.dataset.theme = st.theme;
    document.body.classList.toggle('calm', st.motion === 'calm');
    document.documentElement.lang = st.lang;
  };

  function remind() {
    const s = S(), r = s.settings.remind, td = FR.dayStr();
    if (!r || s.remindedDay === td || s.streak.last === td) return;
    const [h, m] = r.split(':').map(Number), n = new Date();
    if (n.getHours() * 60 + n.getMinutes() < h * 60 + m) return;
    s.remindedDay = td; FR.save();
    FR.toast('⏰ ' + tt('remind_msg'), 6000);
    if ('Notification' in window && Notification.permission === 'granted' && document.hidden) { try { new Notification('Parlons !', { body: FR.t('remind_msg') }); } catch (e) {} }
  }
  function tick() {
    const had = !!S().gate;
    E.checkStreak();
    if (!had && S().gate && ['home', 'learn'].includes(document.body.dataset.r)) FR.refresh();
    remind();
  }

  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('[data-act]');
    if (!el || el.getAttribute('aria-disabled')) return;
    const f = FR.act[el.dataset.act];
    if (f) f(el.dataset, el, e);
  });
  document.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset && el.dataset.chg && FR.chg[el.dataset.chg]) FR.chg[el.dataset.chg](el);
    if (el.dataset && el.dataset.set) { S().settings[el.dataset.set] = el.value; FR.save(); }
  });
  window.addEventListener('hashchange', () => { FR.closePop(); if (FR.stopReading) FR.stopReading(); render(true); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); else FR.save(); });

  FR.load();
  FR.applySettings();
  FR.shell();
  FR.initLongPress();
  E.checkStreak();
  render(true);
  setInterval(tick, 30000);
  setTimeout(remind, 1500);
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
