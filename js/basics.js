// Basics: alphabet, accents, numbers (with a converter), telling the time (with an animated clock), common words, places.
(function () {
  const FR = window.FR, { esc, bi, tt } = FR, B = FR.BASICS;
  const V = FR.views, A = FR.act, AF = FR.after;
  const say = x => '<button class="mini" data-act="say" data-text="' + esc(x) + '" aria-label="listen">🔊</button>';
  const TABS = [['abc', 'b_abc'], ['acc', 'b_acc'], ['num', 'b_num'], ['time', 'b_time'], ['words', 'b_words'], ['places', 'b_places']];

  // ---------- numbers → French words ----------
  const U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const T = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
  function b100(n) {
    if (n < 20) return U[n];
    const t = Math.floor(n / 10), u = n % 10;
    if (t < 7) return T[t] + (u === 0 ? '' : u === 1 ? ' et un' : '-' + U[u]);
    if (t === 7) return 'soixante' + (u === 1 ? ' et onze' : '-' + U[10 + u]);
    if (t === 8) return 'quatre-vingt' + (u === 0 ? 's' : '-' + U[u]);
    return 'quatre-vingt-' + U[10 + u];
  }
  // "last" is false before "mille": cent and quatre-vingt then never take an s.
  function b1000(n, last) {
    const h = Math.floor(n / 100), r = n % 100;
    let s = h ? (h > 1 ? U[h] + ' ' : '') + 'cent' + (r === 0 && h > 1 ? 's' : '') : '';
    if (r) s += (s ? ' ' : '') + b100(r);
    if (!last) s = s.replace(/cents$/, 'cent').replace(/vingts$/, 'vingt');
    return s;
  }
  FR.numFr = (n, fem) => {
    if (n === 0) return 'zéro';
    const out = [];
    [[1e9, 'milliard'], [1e6, 'million'], [1e3, 'mille']].forEach(([v, name]) => {
      const q = Math.floor(n / v); n %= v; if (!q) return;
      out.push(name === 'mille' ? (q === 1 ? 'mille' : b1000(q, false) + ' mille') : b1000(q, true) + ' ' + name + (q > 1 ? 's' : ''));
    });
    if (n) out.push(b1000(n, true));
    let s = out.join(' ');
    if (fem) s = s.replace(/(^| |-)un$/, '$1une');
    return s;
  };
  // 1990 spelling reform: hyphens between all numerals (million and milliard are nouns, so they keep spaces).
  const reform = s => s.split(/ (?=millions?|milliards?)| (?<=millions?|milliards?) /).map(p => /^milli/.test(p) ? p : p.replace(/ /g, '-')).join(' ');
  // Decimals: leading zeros are read one by one, then the rest as a whole number (3.05 = trois virgule zéro cinq).
  function decParts(d) {
    if (!d) return [];
    const lead = d.match(/^0*/)[0].length, rest = d.slice(lead);
    return Array(lead).fill('zéro').concat(rest ? [FR.numFr(+rest)] : []);
  }
  const groupEn = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const groupFr = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  let numVal = '1200450';
  function numOut() {
    const [i, d = ''] = numVal.split('.');
    if (!i && !d) return '<p class="mute">' + tt('b_num_empty') + '</p>';
    const n = +(i || '0'), dp = decParts(d), words = FR.numFr(n) + (dp.length ? ' virgule ' + dp.join(' ') : ''), ref = reform(FR.numFr(n)) + (dp.length ? ' virgule ' + dp.map(reform).join(' ') : '');
    return '<div class="numfr" lang="fr">' + esc(words) + ' ' + say(words) + '</div>' +
      (ref !== words ? '<p class="small mute">' + tt('b_reform') + ' <span lang="fr">' + esc(ref) + '</span></p>' : '') +
      '<p class="small mute">' + tt('b_frformat') + ' <b>' + groupFr(i || '0') + (numVal.includes('.') ? ',' + d : '') + '</b></p>';
  }

  // ---------- telling the time ----------
  const H = h => FR.numFr(h, true);
  function timeFr(h, m) {
    const formal = h === 0 && m === 0 ? 'minuit' : h === 12 && m === 0 ? 'midi' : (h === 0 ? 'zéro' : H(h)) + ' heure' + (h > 1 ? 's' : '') + (m ? ' ' + FR.numFr(m) : '');
    const per = x => x === 0 || x === 12 ? '' : x < 12 ? ' du matin' : x < 18 ? ' de l\'après-midi' : ' du soir';
    const name = x => x === 0 ? 'minuit' : x === 12 ? 'midi' : H(x % 12) + ' heure' + (x % 12 > 1 ? 's' : '');
    const isMid = x => x === 0 || x === 12;
    let casual;
    if (m === 0) casual = name(h) + per(h);
    else if (m === 15) casual = name(h) + ' et quart' + per(h);
    else if (m === 30) casual = name(h) + (isMid(h) ? ' et demi' : ' et demie') + per(h);
    else if (m < 30) casual = name(h) + ' ' + FR.numFr(m) + per(h);
    else { const n = (h + 1) % 24; casual = name(n) + (m === 45 ? ' moins le quart' : ' moins ' + FR.numFr(60 - m)) + per(n); }
    return { formal: 'Il est ' + formal + '.', casual: 'Il est ' + casual + '.' };
  }
  const EN = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
  function timeEn(h, m) {
    const nm = x => x === 0 ? 'midnight' : x === 12 ? 'noon' : EN[x % 12], per = x => x === 0 || x === 12 ? '' : x < 12 ? ' in the morning' : x < 18 ? ' in the afternoon' : ' in the evening';
    const clock = (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? ' am' : ' pm');
    let c;
    if (m === 0) c = nm(h) + (h % 12 ? ' o\'clock' : '') + per(h);
    else if (m === 15) c = 'quarter past ' + nm(h) + per(h);
    else if (m === 30) c = 'half past ' + nm(h) + per(h);
    else if (m < 30) c = m + ' past ' + nm(h) + per(h);
    else { const n = (h + 1) % 24; c = (m === 45 ? 'quarter' : 60 - m) + ' to ' + nm(n) + per(n); }
    return { formal: 'It\'s ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' (24-hour, as on timetables)', casual: 'It\'s ' + clock + ' — ' + c };
  }
  function parseTime(s) {
    s = String(s).trim().toLowerCase().replace(/\s+/g, '');
    const mt = s.match(/^(\d{1,2})(?:[:h.](\d{1,2}))?(am|pm|a|p)?$/);
    if (!mt) return null;
    let h = +mt[1], m = +(mt[2] || 0); const ap = mt[3];
    if (ap) { if (h < 1 || h > 12) return null; h = (h % 12) + (ap[0] === 'p' ? 12 : 0); }
    return h > 23 || m > 59 ? null : [h, m];
  }
  const clk = { h: 15, m: 0, ha: 90, ma: 0 }; // hand angles keep growing so the hands always turn forward
  function clockSvg() {
    let t = '';
    for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 80 : 85; t += '<line x1="' + (100 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (100 - r1 * Math.cos(a)).toFixed(1) + '" x2="' + (100 + 90 * Math.sin(a)).toFixed(1) + '" y2="' + (100 - 90 * Math.cos(a)).toFixed(1) + '" class="' + (big ? 'tk big' : 'tk') + '"/>'; }
    for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; t += '<text x="' + (100 + 66 * Math.sin(a)).toFixed(1) + '" y="' + (100 - 66 * Math.cos(a) + 5).toFixed(1) + '" class="num">' + i + '</text>'; }
    return '<svg viewBox="0 0 200 200" class="clock-svg" role="img" aria-label="clock"><circle cx="100" cy="100" r="95" class="face"/>' + t +
      '<g id="hh" class="hand-g" style="transform:rotate(' + clk.ha + 'deg)"><line x1="100" y1="108" x2="100" y2="55" class="hand h"/></g>' +
      '<g id="mh" class="hand-g" style="transform:rotate(' + clk.ma + 'deg)"><line x1="100" y1="112" x2="100" y2="28" class="hand m"/></g><circle cx="100" cy="100" r="5" class="pin"/></svg>';
  }
  function timeText() {
    const f = timeFr(clk.h, clk.m), e = timeEn(clk.h, clk.m);
    return '<div class="treading"><small class="eyebrow">' + tt('b_formal') + '</small><p class="tfr" lang="fr">' + esc(f.formal) + ' ' + say(f.formal) + '</p><p class="small mute">' + esc(e.formal) + '</p></div>' +
      '<div class="treading"><small class="eyebrow">' + tt('b_casual') + '</small><p class="tfr" lang="fr">' + esc(f.casual) + ' ' + say(f.casual) + '</p><p class="small mute">' + esc(e.casual) + '</p></div>';
  }
  function setClock(h, m, speak) {
    const ma = m * 6, ha = (h % 12) * 30 + m * 0.5;
    clk.ma += ((ma - clk.ma) % 360 + 360) % 360;
    clk.ha += ((ha - clk.ha) % 360 + 360) % 360;
    clk.h = h; clk.m = m;
    const hh = document.getElementById('hh'), mh = document.getElementById('mh');
    if (hh) { hh.style.transform = 'rotate(' + clk.ha + 'deg)'; mh.style.transform = 'rotate(' + clk.ma + 'deg)'; }
    const out = document.getElementById('tout'); if (out) out.innerHTML = timeText();
    if (speak) setTimeout(() => FR.speak(timeFr(h, m).formal + ' ' + timeFr(h, m).casual), 900);
  }

  // ---------- view ----------
  let tab = 'abc';
  V.basics = p => {
    if (p && TABS.some(x => x[0] === p)) tab = p;
    let h = '<h1>' + tt('basics') + '</h1><p class="mute">' + tt('basics_sub') + '</p><div class="chips scroll">' + TABS.map(x => '<button class="chip' + (tab === x[0] ? ' on' : '') + '" data-act="btab" data-t="' + x[0] + '">' + tt(x[1]) + '</button>').join('') + '</div>';
    if (tab === 'abc') {
      h += '<p class="hint">' + tt('b_abc_d') + '</p><div class="abc stagger">' + B.alphabet.map(l => '<button class="abc-k" data-act="say" data-text="' + esc(l[1]) + '"><b>' + l[0] + '<i>' + l[0].toLowerCase() + '</i></b><span lang="fr">' + esc(l[1]) + '</span><small>' + esc(l[2]) + '</small></button>').join('') + '</div>' +
        '<section class="card"><h3>' + tt('b_abc_words') + '</h3><div class="wl">' + B.alphabet.map(l => '<div class="wl-r"><b>' + l[0] + '</b> <span lang="fr" class="ex-w">' + esc(l[3]) + '</span>' + say(l[3]) + '<span>' + esc(l[4]) + '</span></div>').join('') + '</div></section>';
    } else if (tab === 'acc') {
      h += '<p class="hint">' + tt('b_acc_d') + '</p><div class="stagger">' + B.accents.map(a => '<section class="card acc"><div class="acc-h"><b class="acc-c">' + a[0] + '</b><div><h3 lang="fr">' + esc(a[1]) + '</h3><p class="small mute">' + tt('b_sounds') + ' ' + esc(a[2]) + '</p></div></div><p>' + esc(a[3]) + '</p><div class="chips">' +
        a[4].split(';').map(x => { const [f, e] = x.split('='); return '<button class="chip" data-act="say" data-text="' + esc(f) + '"><span lang="fr">' + esc(f) + '</span> · <span class="mute">' + esc(e) + '</span></button>'; }).join('') + '</div></section>').join('') + '</div>' +
        '<section class="card"><h3>' + tt('b_typing') + '</h3><p>' + tt('b_typing_d') + '</p></section>';
    } else if (tab === 'num') {
      const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 30, 31, 40, 50, 60, 70, 71, 72, 80, 81, 90, 91, 99, 100, 101, 200, 201, 1000, 2000, 1000000];
      h += '<section class="card"><h3>' + tt('b_num_conv') + '</h3><input id="numin" class="search big-in" inputmode="decimal" autocomplete="off" value="' + groupEn(numVal.split('.')[0]) + (numVal.includes('.') ? '.' + numVal.split('.')[1] : '') + '" aria-label="number"><p class="hint">' + tt('b_num_hint') + '</p><div id="numout">' + numOut() + '</div></section>' +
        '<section class="card"><h3>' + tt('b_num_rules') + '</h3><ul class="tips"><li>' + tt('b_nr1') + '</li><li>' + tt('b_nr2') + '</li><li>' + tt('b_nr3') + '</li><li>' + tt('b_nr4') + '</li></ul></section>' +
        '<section class="card"><h3>' + tt('b_num_list') + '</h3><div class="numgrid">' + list.map(n => '<button class="numk" data-act="say" data-text="' + esc(FR.numFr(n)) + '"><b>' + groupEn(String(n)) + '</b><span lang="fr">' + esc(FR.numFr(n)) + '</span></button>').join('') + '</div></section>';
    } else if (tab === 'time') {
      h += '<section class="card center">' + clockSvg() + '<div id="tout">' + timeText() + '</div>' +
        '<form id="tform" class="row center-row"><input id="tin" class="search" placeholder="' + esc(FR.t('b_time_ph')) + '" autocomplete="off" aria-label="time"><button class="btn primary">' + tt('b_time_set') + '</button></form><p class="hint">' + tt('b_time_hint') + '</p></section>' +
        '<section class="card"><h3>' + tt('b_time_rules') + '</h3><ul class="tips"><li>' + tt('b_tr1') + '</li><li>' + tt('b_tr2') + '</li><li>' + tt('b_tr3') + '</li><li>' + tt('b_tr4') + '</li></ul></section>';
    } else if (tab === 'words') {
      h += B.words.map(g => '<section class="card"><h3>' + tt(g[0]) + '</h3><div class="wl">' + g[1].map(w => '<div class="wl-r"><b lang="fr">' + esc(w[0]) + '</b>' + say(w[0].replace(/…/g, '')) + '<span>' + esc(w[1]) + '</span></div>').join('') + '</div></section>').join('');
    } else {
      h += '<section class="card"><h3>' + tt('b_prep') + '</h3><ul class="tips"><li>' + tt('b_pr1') + '</li><li>' + tt('b_pr2') + '</li><li>' + tt('b_pr3') + '</li><li>' + tt('b_pr4') + '</li></ul></section>' +
        '<section class="card"><h3>' + tt('b_countries') + '</h3><div class="wl">' + B.countries.map(c => '<div class="wl-r col-r"><div><b lang="fr">' + esc(c[0]) + '</b>' + say(c[0]) + ' <span class="mute">' + esc(c[1]) + '</span></div><small><span lang="fr">' + esc(c[2]) + '</span> · <span lang="fr">' + esc(c[3]) + '</span></small></div>').join('') + '</div></section>' +
        '<section class="card"><h3>' + tt('b_continents') + '</h3><div class="chips">' + B.continents.map(c => '<button class="chip" data-act="say" data-text="' + esc(c[0]) + '"><span lang="fr">' + esc(c[0]) + '</span> · <span class="mute">' + esc(c[1]) + '</span></button>').join('') + '</div></section>' +
        '<section class="card"><h3>' + tt('b_cities') + '</h3><div class="wl">' + B.cities.map(c => '<div class="wl-r"><b lang="fr">' + esc(c[0]) + '</b>' + say(c[0]) + '<span>' + esc(c[1]) + ' · <span lang="fr">' + esc(c[2]) + '</span></span></div>').join('') + '</div></section>' +
        '<section class="card"><h3>' + tt('b_streets') + '</h3><div class="wl">' + B.streets.map(c => '<div class="wl-r"><b lang="fr">' + esc(c[0]) + '</b>' + say(c[0]) + '<span>' + esc(c[1]) + '</span></div>').join('') + '</div><p class="hint">' + tt('b_addr') + '</p></section>';
    }
    return h;
  };
  A.btab = d => { tab = d.t; FR.refresh(true); };
  AF.basics = () => {
    const ni = document.getElementById('numin');
    if (ni) {
      const fmt = () => {
        let v = ni.value.replace(/[^\d.]/g, '');
        const dot = v.indexOf('.');
        if (dot >= 0) v = v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, '').slice(0, 3);
        let [i, d] = v.split('.'); i = (i || '').replace(/^0+(?=\d)/, '').slice(0, 12);
        numVal = i + (d !== undefined ? '.' + d : '');
        ni.value = groupEn(i) + (d !== undefined ? '.' + d : '');
        document.getElementById('numout').innerHTML = numOut();
      };
      ni.addEventListener('input', fmt);
    }
    const tf = document.getElementById('tform');
    if (tf) tf.addEventListener('submit', e => {
      e.preventDefault();
      const v = parseTime(document.getElementById('tin').value);
      if (!v) { FR.toast(tt('b_time_bad')); return; }
      setClock(v[0], v[1], true);
    });
  };
})();
