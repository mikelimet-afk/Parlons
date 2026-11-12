// Offline support: try the network first (so updates arrive), fall back to the cached copy.
const CACHE = 'parlons-v1';
const FILES = ['./', 'index.html', 'css/app.css', 'icon.svg', 'manifest.webmanifest',
  'js/store.js', 'js/i18n.js', 'js/lang.js', 'js/engine.js', 'js/fx.js', 'js/views.js', 'js/exam.js', 'js/app.js',
  'js/data/dictionary.js', 'js/data/course.js', 'js/data/rules.js', 'js/data/everyday.js', 'js/data/passages.js'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
