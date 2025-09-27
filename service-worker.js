const CACHE_NAME = 'mh-weight-loss-app-v1';
const urlsToCache = [
  'https://mohammedhussainaravalli-cloud.github.io/Food-weight-tracker-app/',
  'https://mohammedhussainaravalli-cloud.github.io/Food-weight-tracker-app/icons:/icon-192x192.png',
  'https://mohammedhussainaravalli-cloud.github.io/Food-weight-tracker-app//icons:/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/index.html');
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
