const CACHE_NAME = 'oceanjet-portdesk-v93-root-addon';
const ASSETS = ['./', './index.html', './styles.css', './data.js', './app.js', './manifest.webmanifest', './v92_safe_baggage_qa_addon.js'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html'))));
});
