window.FR = window.FR || {};
// Smooth scrolling (Lenis) plus scroll-linked touches: cards that ease in as they come into view,
// a reading progress bar, and a gentle parallax on the background. All of it is skipped when the
// system asks for reduced motion or the app's Motion setting is "calm".
(function () {
  const reduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const calm = () => reduce.matches || (FR.state && FR.state.settings && FR.state.settings.motion === 'calm');
  let lenis = null, raf = 0;

  // Let anything with its own scrollbar (sheets, chat panel, word lists, keyboard) scroll natively.
  const ownScroll = el => {
    if (!(el instanceof Element) || el === document.body || el === document.documentElement) return false;
    if (el.hasAttribute('data-lenis-prevent') || el.closest('.sheet, .pop, .kb, dialog')) return true;
    const cs = getComputedStyle(el);
    return (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) ||
           (/(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1);
  };

  function loop(t) { if (lenis) { lenis.raf(t); raf = requestAnimationFrame(loop); } }
  function start() {
    if (lenis || calm() || typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, prevent: ownScroll });
    lenis.on('scroll', onScroll);
    raf = requestAnimationFrame(loop);
  }
  function stop() { if (!lenis) return; cancelAnimationFrame(raf); lenis.destroy(); lenis = null; }
  FR.smooth = {
    get lenis() { return lenis; },
    // Follow the Motion setting (called again whenever settings change).
    sync() { calm() ? stop() : start(); document.documentElement.classList.toggle('motion-calm', calm()); },
    // Scroll to the top straight away (route changes).
    top() { if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0); },
    // Bring an element into view; `center` puts it mid-screen (reading playback).
    to(el, center) {
      if (!el) return;
      if (!lenis) { el.scrollIntoView({ block: center ? 'center' : 'nearest', behavior: calm() ? 'auto' : 'smooth' }); return; }
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (!center && r.top >= 70 && r.bottom <= vh - 90) return; // already visible
      const offset = center ? -(vh / 2 - r.height / 2) : -Math.max(80, vh - r.height - 110);
      lenis.scrollTo(el, { offset, duration: 0.9, easing: t => 1 - Math.pow(1 - t, 3) });
    }
  };

  // Reading progress bar along the top of passages and story pages.
  let bar = null;
  function onScroll() {
    const on = /^#\/read\/.+/.test(location.hash);
    if (!bar) { bar = document.createElement('div'); bar.id = 'readbar'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar); }
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (on && max > 40 ? Math.min(1, scrollY / max) : 0) + ')';
    bar.classList.toggle('on', on && max > 40);
    // Background drifts a little slower than the page.
    if (!calm()) document.documentElement.style.setProperty('--par', Math.min(scrollY, 2000) * -0.06 + 'px');
    showVisible();
  }
  // Backup for the observer: on every scroll, show any waiting card that has reached the screen.
  function showVisible() {
    const lim = innerHeight * 0.96;
    document.querySelectorAll('#view .rv:not(.in)').forEach(el => { if (el.getBoundingClientRect().top < lim) { el.classList.add('in'); if (io) io.unobserve(el); } });
  }
  addEventListener('scroll', () => { if (!lenis) onScroll(); }, { passive: true });

  // Cards ease up as they scroll into view. The first screen is shown at once so nothing flickers.
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }) : null;
  FR.smooth.reveal = root => {
    if (!io || calm()) return;
    const vh = innerHeight;
    (root || document).querySelectorAll('#view .card, #view .node, #view .story-card, #view .tip').forEach(el => {
      if (el.classList.contains('rv')) return;
      if (el.getBoundingClientRect().top < vh * 0.92) return; // already on screen
      el.classList.add('rv'); io.observe(el);
    });
  };

  if (reduce.addEventListener) reduce.addEventListener('change', () => FR.smooth.sync());
})();
