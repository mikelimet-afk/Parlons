// Offline support: try the network first (so updates arrive), fall back to the cached copy.
const CACHE = 'parlons-v15';
const FILES = ['./', 'index.html', 'css/app.css', 'icon.svg', 'manifest.webmanifest',
  'js/store.js', 'js/i18n.js', 'js/i18n-2.js', 'js/lang.js', 'js/voice.js', 'js/engine.js', 'js/fx.js', 'js/views.js', 'js/review.js', 'js/exam.js', 'js/app.js', 'js/smooth.js', 'js/vendor/lenis.min.js', 'js/vendor/lenis.css', 'js/free-llm.js', 'js/ai.js',
  'js/data/dictionary.js', 'js/data/course.js', 'js/data/rules.js', 'js/data/everyday.js', 'js/data/passages.js', 'js/data/passages-2.js', 'js/data/course-2.js', 'js/data/stories-1.js', 'js/data/stories-2.js', 'js/data/phrases.js', 'js/data/expressions.js', 'js/data/basics-data.js', 'js/data/words-11.js', 'js/data/forms.js', 'js/data/words-12.js', 'js/basics.js', 'js/tips.js', 'js/keyboard.js', 'js/typing.js', 'js/master.js', 'js/classes.js','js/data/words-1.js', 'js/data/words-2.js', 'js/data/words-3.js', 'js/data/words-4.js', 'js/data/words-5.js', 'js/data/words-6.js', 'js/data/words-7.js', 'js/data/words-8.js', 'js/data/words-9.js', 'js/data/words-10.js', 'js/data/words-13.js'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Pages are stored without their ?query so share links and ?v= reloads don't pile up copies.
  const key = e.request.mode === 'navigate' ? new URL(e.request.url).pathname : e.request;
  const fromCache = () => caches.match(key, { ignoreSearch: e.request.mode === 'navigate' }).then(r => r || caches.match('index.html'));
  // Network first so updates arrive, but give up after 4 s on a weak connection and use the saved copy.
  const net = fetch(e.request, { cache: 'no-cache' }).then(r => {
    if (r.ok && r.type === 'basic') { const copy = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(key, copy))); }
    return r;
  });
  e.waitUntil(net.catch(() => {}));
  const slow = new Promise(res => setTimeout(res, 4000)).then(() => caches.match(key, { ignoreSearch: true })).then(r => r || net);
  e.respondWith(Promise.race([net, slow]).catch(fromCache));
});
