// Visual feedback: toasts, bottom sheets, celebration overlays, confetti and sparks.
(function () {
  const FR = window.FR;
  const calm = () => FR.state.settings.motion === 'calm';

  FR.toast = (html, ms = 2800) => {
    const d = document.createElement('div');
    d.className = 'toast'; d.innerHTML = html;
    document.getElementById('toasts').appendChild(d);
    setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 400); }, ms);
  };
  FR.sheet = html => { document.getElementById('layer').innerHTML = '<div class="scrim" data-act="closesheet"></div><div class="sheet"><div class="grab"></div>' + html + '</div>'; };
  FR.closeSheet = () => {
    const l = document.getElementById('layer');
    if (!l.firstChild) return;
    l.classList.add('closing');
    setTimeout(() => { l.innerHTML = ''; l.classList.remove('closing'); }, 200);
  };

  let queue = [];
  function next() {
    const c = document.getElementById('cele'), e = queue.shift();
    if (!e) { c.innerHTML = ''; return; }
    if (e.confetti !== false) FR.confetti(e.big ? 240 : 110);
    if (e.title && typeof e.title === 'string') setTimeout(() => FR.speak(e.title), 300);
    const words = (e.words || []).map(w => '<div class="rw"><b lang="fr">' + FR.esc(w.fr) + '</b><span>' + FR.esc(w.en) + '</span></div>').join('');
    c.innerHTML = '<div class="cele"><div class="cele-card' + (e.big ? ' big' : '') + '"><div class="cele-i">' + e.icon + '</div><h2>' + FR.bi(e.title) + '</h2>' +
      (e.sub ? '<p' + (e.subClass ? ' class="' + e.subClass + '"' : '') + '>' + FR.bi(e.sub) + '</p>' : '') + (e.pct != null ? '<div class="cele-pct" style="--p:' + e.pct + '"><b>' + e.pct + '%</b></div>' : '') + (e.body ? '<p class="mute">' + FR.bi(e.body) + '</p>' : '') +
      (words ? '<div class="rws">' + words + '</div>' : '') + '<button class="btn primary" data-act="celenext">' + FR.tt('continue') + '</button></div></div>';
  }
  FR.celebrate = list => { queue.push(...list); if (!document.querySelector('.cele')) next(); };
  FR.nextCele = next;

  FR.confetti = (n = 120) => {
    if (calm()) return;
    const cv = document.getElementById('confetti'), ctx = cv.getContext('2d');
    const W = cv.width = innerWidth, H = cv.height = innerHeight;
    const cs = getComputedStyle(document.body);
    const cols = ['--acc', '--acc2', '--ok', '--gold'].map(v => cs.getPropertyValue(v).trim() || '#888');
    const ps = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.5, y: H * 0.35, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 12 - 3, r: 4 + Math.random() * 5, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4 }));
    const t0 = performance.now();
    (function frame(t) {
      const el = t - t0;
      ctx.clearRect(0, 0, W, H);
      if (el > 3000) return;
      ps.forEach(p => {
        p.vy += 0.28; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - el / 3000); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore();
      });
      requestAnimationFrame(frame);
    })(t0);
  };

  FR.burst = el => {
    if (calm() || !el) return;
    const r = el.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('i');
      p.className = 'spark';
      p.style.cssText = 'left:' + (r.left + r.width / 2) + 'px;top:' + (r.top + r.height / 2) + 'px;--a:' + (i * 36 + Math.random() * 20) + 'deg;--d:' + (36 + Math.random() * 34) + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  };
  // End-of-exercise praise in French with an English subtitle; confetti scaled to the score.
  FR.cheer = (p, fast, title) => {
    const L = p >= 1 ? ['🏆', 'Parfait !', 'Perfect!'] : p >= 0.9 ? ['🌟', 'Excellent !', 'Excellent!'] : p >= 0.75 ? ['🎉', 'Bravo, beau travail !', 'Great job!'] :
      p >= 0.6 ? ['👍', 'Bien joué !', 'Well done!'] : p >= 0.4 ? ['💪', 'Pas mal, continue !', 'Not bad — keep going!'] : ['🌱', 'Courage, tu progresses !', 'Hang in there — you\'re improving!'];
    const quick = fast && p >= 0.75, fr = quick ? L[1] + ' C\'était rapide !' : L[1], en = quick ? L[2] + ' That was fast!' : L[2];
    FR.celebrate([{ icon: quick ? '⚡' : L[0], title: fr, sub: en, subClass: 'subtitle', body: title ? title : null, pct: p > 0 && p < 1 ? Math.round(p * 100) : null, confetti: p >= 0.4, big: p >= 0.9 }]);
  };
  // Answer sounds, generated on the device (no audio files): a rising chime for right, a soft low tone for wrong.
  let ac = null;
  FR.sfx = ok => {
    if (FR.state.settings.sound === 'off') return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      const t = ac.currentTime + 0.01;
      (ok ? [[659, 0], [988, 0.1]] : [[233, 0], [175, 0.13]]).forEach(([f, d]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + d);
        g.gain.exponentialRampToValueAtTime(ok ? 0.16 : 0.13, t + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d + (ok ? 0.28 : 0.24));
        o.connect(g); g.connect(ac.destination);
        o.start(t + d); o.stop(t + d + 0.32);
      });
    } catch (e) { /* no audio available */ }
  };
  FR.floatXp = (el, txt) => {
    if (calm() || !el) return;
    const r = el.getBoundingClientRect(), p = document.createElement('i');
    p.className = 'floatxp'; p.textContent = txt;
    p.style.cssText = 'left:' + (r.right - 40) + 'px;top:' + r.top + 'px';
    document.body.appendChild(p); setTimeout(() => p.remove(), 900);
  };
})();
