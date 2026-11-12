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
    if (e.confetti !== false) FR.confetti(e.big ? 220 : 110);
    const words = (e.words || []).map(w => '<div class="rw"><b lang="fr">' + FR.esc(w.fr) + '</b><span>' + FR.esc(w.en) + '</span></div>').join('');
    c.innerHTML = '<div class="cele"><div class="cele-card' + (e.big ? ' big' : '') + '"><div class="cele-i">' + e.icon + '</div><h2>' + FR.bi(e.title) + '</h2>' +
      (e.sub ? '<p>' + FR.bi(e.sub) + '</p>' : '') + (e.body ? '<p class="mute">' + FR.bi(e.body) + '</p>' : '') +
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
  FR.floatXp = (el, txt) => {
    if (calm() || !el) return;
    const r = el.getBoundingClientRect(), p = document.createElement('i');
    p.className = 'floatxp'; p.textContent = txt;
    p.style.cssText = 'left:' + (r.right - 40) + 'px;top:' + r.top + 'px';
    document.body.appendChild(p); setTimeout(() => p.remove(), 900);
  };
})();
