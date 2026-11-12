// Hidden "French Master Mode": hold the ⚙ button for 3 seconds. Unlocks every lesson in a sandbox — nothing is saved —
// and switches to the Napoleon theme. Hold it again for 3 seconds to go back to normal.
(function () {
  const FR = window.FR;
  FR.master = { on: false };
  // A cartoon of a general on a rearing white horse crossing snowy mountains (in the spirit of David's 1801 painting).
  const ART = '<svg class="nap-art" viewBox="0 0 400 420" aria-hidden="true">' +
    '<defs><linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c86b8"/><stop offset="1" stop-color="#e9dcc0"/></linearGradient></defs>' +
    '<rect width="400" height="420" fill="url(#nsky)"/>' +
    '<path d="M0 300 L70 190 L120 240 L190 140 L260 230 L320 170 L400 260 L400 420 L0 420Z" fill="#8c97ad"/>' +
    '<path d="M190 140 L215 175 L200 172 L188 186 L176 168 L165 176Z M320 170 L340 196 L326 192 L318 204 L306 190Z M70 190 L88 218 L75 214 L66 226 L55 212Z" fill="#fff"/>' +
    '<path d="M0 360 Q120 320 220 350 T400 330 L400 420 L0 420Z" fill="#b7a98a"/>' +
    '<g class="nap-horse">' +
      '<path d="M120 300 Q110 250 150 235 L235 230 Q265 232 268 262 Q270 292 240 300 L160 305 Q132 308 120 300Z" fill="#fbfaf6" stroke="#4a4030" stroke-width="3"/>' +
      '<path d="M236 236 Q250 190 268 160 Q276 146 292 150 L312 160 Q320 168 312 176 L296 178 Q284 196 276 232Z" fill="#fbfaf6" stroke="#4a4030" stroke-width="3"/>' +
      '<path d="M290 150 Q298 138 304 142 L300 156Z" fill="#fbfaf6" stroke="#4a4030" stroke-width="2"/>' +
      '<circle cx="300" cy="162" r="2.6" fill="#2a2a2a"/>' +
      '<path d="M262 160 Q246 176 240 206 Q232 186 246 166 Q252 156 262 160Z" fill="#c9b98f"/>' +
      '<path d="M122 290 Q88 300 70 336 Q96 318 128 306Z" fill="#c9b98f" stroke="#4a4030" stroke-width="2"/>' +
      '<path d="M150 300 L140 360 L152 362 L166 302Z M190 302 L198 362 L210 360 L204 300Z" fill="#fbfaf6" stroke="#4a4030" stroke-width="3"/>' +
      '<path d="M238 258 L282 214 L290 222 L250 268Z M228 266 L272 246 L276 256 L236 278Z" fill="#fbfaf6" stroke="#4a4030" stroke-width="3"/>' +
      '<path d="M138 358 h16 v8 h-16Z M196 358 h16 v8 h-16Z" fill="#3b2f20"/>' +
      '<path d="M160 236 Q196 222 228 236 L220 262 Q192 254 166 262Z" fill="#1d3a8a"/>' +
      '<path d="M162 240 L226 240" stroke="#c9a227" stroke-width="4"/>' +
    '</g>' +
    '<g class="nap-rider">' +
      '<path d="M176 236 Q150 170 120 150 Q160 140 196 186 Q230 140 262 120 Q236 170 214 236Z" fill="#b8202e"/>' +
      '<path d="M182 236 L178 190 Q190 168 206 168 Q220 172 220 192 L214 236Z" fill="#1d3a8a" stroke="#14275e" stroke-width="2"/>' +
      '<path d="M190 236 L186 262 L198 266 L204 236Z" fill="#f4efe2" stroke="#4a4030" stroke-width="2"/>' +
      '<path d="M186 262 L182 284 L198 286 L198 266Z" fill="#111"/>' +
      '<path d="M210 182 L248 120 L256 126 L218 190Z" fill="#1d3a8a" stroke="#14275e" stroke-width="2"/>' +
      '<circle cx="252" cy="120" r="7" fill="#f2d3b3"/>' +
      '<path d="M200 180 Q206 186 214 180" stroke="#c9a227" stroke-width="5" fill="none"/>' +
      '<circle cx="198" cy="152" r="16" fill="#f2d3b3"/>' +
      '<circle cx="204" cy="150" r="2" fill="#2a2a2a"/><path d="M200 160 Q205 163 209 159" stroke="#7a3b2e" stroke-width="2" fill="none"/>' +
      '<path d="M170 142 Q198 112 228 142 Q198 132 170 142Z" fill="#111"/>' +
      '<path d="M172 141 Q198 132 226 141" stroke="#c9a227" stroke-width="3" fill="none"/>' +
      '<circle cx="199" cy="134" r="4" fill="#1d3a8a" stroke="#fff" stroke-width="1.5"/>' +
    '</g>' +
    '<text x="200" y="404" text-anchor="middle" class="nap-cap">BONAPARTE · MDCCC</text></svg>';
  function enter() {
    FR.master.on = true; FR.master.save = FR.save; FR.save = () => {};
    document.body.classList.add('master');
    let bg = document.getElementById('napbg');
    if (!bg) { bg = document.createElement('div'); bg.id = 'napbg'; bg.innerHTML = ART; document.body.insertBefore(bg, document.body.firstChild); }
    FR.applySettings(); FR.shell(); FR.go('learn');
    FR.celebrate([{ icon: '🎖️', title: ['You are now in French Master Mode', 'Vous êtes maintenant en mode Maître du français'], sub: ['Every lesson and chapter is unlocked. Nothing you do now is saved — your real progress is safe.', 'Toutes les leçons sont débloquées. Rien n\'est enregistré : vos vrais progrès sont intacts.'], body: ['Hold ⚙ for 3 seconds again to leave.', 'Maintenez ⚙ 3 secondes pour quitter.'], big: true }]);
  }
  function leave() {
    FR.master.on = false; FR.save = FR.master.save || FR.save;
    document.body.classList.remove('master');
    const bg = document.getElementById('napbg'); if (bg) bg.remove();
    FR.load(); // throw away the sandbox and reload the real saved state
    FR.applySettings(); FR.shell(); FR.go('home'); FR.refresh(true);
    FR.toast('🔓 ' + FR.tt('master_off'), 4000);
  }
  // Long press on the settings button.
  let t = 0, swallow = false, btn = null;
  const cancel = () => { clearTimeout(t); if (btn) btn.classList.remove('charging'); btn = null; };
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest && e.target.closest('.icon-btn[data-to="settings"]'); if (!b) return;
    btn = b; b.classList.add('charging');
    t = setTimeout(() => { swallow = true; cancel(); if (navigator.vibrate) { try { navigator.vibrate([30, 60, 30]); } catch (er) {} } FR.master.on ? leave() : enter(); }, 3000);
  }, true);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => document.addEventListener(ev, e => { if (btn && (ev !== 'pointerleave' || e.target === btn)) cancel(); }, true));
  document.addEventListener('click', e => { if (swallow) { swallow = false; e.preventDefault(); e.stopPropagation(); } }, true);
})();
