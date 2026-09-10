const CACHE_NAME = 'vasconez-cache-v1';

// Recursos estáticos iniciales a guardar
const STATIC_ASSETS = [
  './',
  './index.html',
  './resume.html',
  './stylesheets/base.css',
  './js/download.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
  'https://unpkg.com/vue@3/dist/vue.global.prod.js'
];

// Instalar Service Worker y guardar la App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activar SW y limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Las peticiones POST (como /status) no se pueden guardar en la Cache API
  if (event.request.method !== 'GET') {
    return;
  }

  // Estrategia para la API (Network First -> Fallback a Cache)
  if (requestUrl.origin === 'https://api.vasconez.work') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Estrategia para recursos estáticos y navegación (Cache First -> Fallback a Red)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
