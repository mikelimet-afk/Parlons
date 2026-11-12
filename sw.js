// Offline support: try the network first (so updates arrive), fall back to the cached copy.
const CACHE = 'parlons-v5';
const FILES = ['./', 'index.html', 'css/app.css', 'icon.svg', 'manifest.webmanifest',
  'js/store.js', 'js/i18n.js', 'js/i18n-2.js', 'js/lang.js', 'js/engine.js', 'js/fx.js', 'js/views.js', 'js/exam.js', 'js/app.js',
  'js/data/dictionary.js', 'js/data/course.js', 'js/data/rules.js', 'js/data/everyday.js', 'js/data/passages.js', 'js/data/passages-2.js', 'js/data/course-2.js', 'js/data/stories-1.js', 'js/data/stories-2.js', 'js/data/phrases.js', 'js/data/basics-data.js', 'js/data/words-11.js', 'js/data/forms.js', 'js/data/words-12.js', 'js/basics.js', 'js/tips.js', 'js/keyboard.js', 'js/typing.js', 'js/master.js', 'js/data/words-1.js', 'js/data/words-2.js', 'js/data/words-3.js', 'js/data/words-4.js', 'js/data/words-5.js', 'js/data/words-6.js', 'js/data/words-7.js', 'js/data/words-8.js', 'js/data/words-9.js', 'js/data/words-10.js'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
