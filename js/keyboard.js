// In-app keyboard: QWERTY or AZERTY, a row of French accents, shift, numbers/punctuation, backspace and enter.
// When it is on, the phone's own keyboard is suppressed (inputmode="none") so the two don't fight.
(function () {
  const FR = window.FR, S = () => FR.state;
  const LAYOUT = {
    qwerty: ['qwertyuiop', 'asdfghjkl', '⇧zxcvbnm⌫'],
    azerty: ['azertyuiop', 'qsdfghjklm', '⇧wxcvbn\'⌫']
  };
  const SYM = ['1234567890', '-\'?!.,;:"', '⇧«»()…/@&⌫'];
  const ACC = ['é', 'è', 'ê', 'à', 'â', 'ç', 'ù', 'û', 'î', 'ï', 'ô', 'œ', 'ë'];
  let inp = null, onEnter = null, shift = false, sym = false, el = null;
  const enabled = () => { const k = S().settings.kb || 'auto'; return k === 'on' || (k === 'auto' && matchMedia('(pointer: coarse)').matches); };
  function render() {
    if (!el) return;
    const lay = S().settings.kbLayout || 'azerty', rows = sym ? SYM : LAYOUT[lay];
    const key = (c, cls) => { const lab = c === '⇧' ? (shift ? '⬆' : '⇧') : shift && c.length === 1 ? c.toUpperCase() : c; return '<button type="button" class="kk' + (cls ? ' ' + cls : '') + (c === '⇧' && shift ? ' on' : '') + '" data-k="' + FR.esc(c) + '">' + FR.esc(lab) + '</button>'; };
    el.innerHTML = '<div class="kb-top"><button type="button" class="kk lay" data-k="⇄">' + (lay === 'azerty' ? 'AZERTY' : 'QWERTY') + ' ⇄</button><span class="kb-hint">' + FR.t('kb_hint') + '</span><button type="button" class="kk lay" data-k="✕">⌄</button></div>' +
      '<div class="kb-row acc">' + ACC.map(c => key(c, 'a')).join('') + '</div>' +
      rows.map(r => '<div class="kb-row">' + [...r].map(c => key(c, c === '⇧' || c === '⌫' ? 'wide' : '')).join('') + '</div>').join('') +
      '<div class="kb-row">' + key(sym ? 'ABC' : '123', 'wide') + key(',') + '<button type="button" class="kk space" data-k=" ">' + (S().settings.kbLayout === 'qwerty' ? 'space' : 'espace') + '</button>' + key('.') + '<button type="button" class="kk wide go" data-k="⏎">⏎</button></div>';
  }
  function press(k) {
    if (!inp) return;
    if (k === '✕') { FR.kb.hide(true); return; }
    if (k === '⇄') { S().settings.kbLayout = (S().settings.kbLayout || 'azerty') === 'azerty' ? 'qwerty' : 'azerty'; FR.save(); render(); return; }
    if (k === '⇧') { shift = !shift; render(); return; }
    if (k === '123' || k === 'ABC') { sym = !sym; render(); return; }
    if (k === '⏎') { if (onEnter) onEnter(); return; }
    const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? s;
    if (k === '⌫') { if (s === e && s > 0) inp.setRangeText('', s - 1, s, 'end'); else inp.setRangeText('', s, e, 'end'); }
    else { inp.setRangeText(shift ? k.toUpperCase() : k, s, e, 'end'); if (shift) { shift = false; render(); } }
    inp.dispatchEvent(new Event('input', { bubbles: true }));
  }
  FR.kb = {
    active: () => !!(el && document.body.classList.contains('kb-open')),
    attach(input, enter) {
      inp = input; onEnter = enter;
      if (!enabled() || FR.kb.dismissed) { input.removeAttribute('inputmode'); FR.kb.hide(); return; }
      input.setAttribute('inputmode', 'none');
      if (!el) {
        el = document.createElement('div'); el.className = 'kb'; el.id = 'kb'; document.body.appendChild(el);
        // pointerdown + preventDefault keeps the focus (and caret) in the text field.
        el.addEventListener('pointerdown', ev => { const b = ev.target.closest('[data-k]'); ev.preventDefault(); if (b) { b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 120); press(b.dataset.k); } });
      }
      render(); document.body.classList.add('kb-open');
      input.addEventListener('focus', () => { if (!FR.kb.dismissed && enabled()) document.body.classList.add('kb-open'); });
      try { input.focus({ preventScroll: true }); } catch (e) {}
    },
    hide(byUser) { document.body.classList.remove('kb-open'); if (byUser && inp) { FR.kb.dismissed = true; inp.removeAttribute('inputmode'); inp.blur(); setTimeout(() => inp && inp.focus(), 50); } },
    show() { FR.kb.dismissed = false; if (inp) FR.kb.attach(inp, onEnter); }
  };
})();
